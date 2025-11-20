-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  avatar_url text,
  xp integer default 0,
  current_hearts integer default 5,
  highest_streak integer default 0,
  is_premium boolean default false,

  constraint username_length check (char_length(username) >= 3)
);

-- Add referral code
alter table profiles add column referral_code text unique;

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, avatar_url, xp, current_hearts, highest_streak, is_premium, referral_code)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    0,
    5,
    0,
    false,
    upper(substring(md5(random()::text) from 1 for 6)) -- Generate random 6-char code
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Friendships table
create table friendships (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  friend_id uuid references profiles(id) not null,
  status text check (status in ('pending', 'accepted', 'blocked')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()),
  
  unique(user_id, friend_id)
);

alter table friendships enable row level security;

create policy "Users can view their own friendships."
  on friendships for select
  using ( auth.uid() = user_id or auth.uid() = friend_id );

-- Challenges table for async multiplayer
create table challenges (
  id uuid default uuid_generate_v4() primary key,
  challenger_id uuid references profiles(id) not null,
  opponent_id uuid references profiles(id) not null,
  quiz_id text not null, -- ID of the quiz being played
  quiz_seed integer, -- Ensure same questions
  challenger_score integer,
  opponent_score integer,
  winner_id uuid references profiles(id),
  status text check (status in ('pending', 'completed', 'declined')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table challenges enable row level security;

  using ( auth.uid() = challenger_id or auth.uid() = opponent_id );

-- User Progress table
create table user_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  quiz_id text not null,
  score integer not null,
  completed_at timestamp with time zone default timezone('utc'::text, now())
);

alter table user_progress enable row level security;

create policy "Users can view their own progress."
  on user_progress for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own progress."
  on user_progress for insert
  with check ( auth.uid() = user_id );

-- RPC: Redeem Referral Code
create or replace function redeem_code(code text)
returns json as $$
declare
  referrer_id uuid;
  referrer_hearts int;
begin
  -- Find referrer
  select id, current_hearts into referrer_id, referrer_hearts
  from profiles
  where referral_code = upper(code);

  if referrer_id is null then
    return '{"success": false, "message": "Invalid code"}'::json;
  end if;

  if referrer_id = auth.uid() then
    return '{"success": false, "message": "Cannot redeem your own code"}'::json;
  end if;

  -- Update Referrer (Bonus Heart)
  update profiles
  set current_hearts = least(5, current_hearts + 1)
  where id = referrer_id;

  -- Update User (Bonus XP)
  update profiles
  set xp = xp + 100
  where id = auth.uid();

  return '{"success": true, "message": "Code redeemed! +100 XP"}'::json;
end;
$$ language plpgsql security definer;

-- RPC: Decrement Hearts
create or replace function decrement_hearts()
returns void as $$
begin
  update profiles
  set current_hearts = greatest(0, current_hearts - 1)
  where id = auth.uid();
end;
$$ language plpgsql security definer;
