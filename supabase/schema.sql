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
  challenger_score integer,
  opponent_score integer,
  status text check (status in ('pending', 'completed', 'declined')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table challenges enable row level security;

create policy "Users can view challenges they are involved in."
  on challenges for select
  using ( auth.uid() = challenger_id or auth.uid() = opponent_id );
