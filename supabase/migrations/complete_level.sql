-- Add status column to user_progress if it doesn't exist
ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS status text DEFAULT 'unlocked';

-- Create or replace the complete_level function
CREATE OR REPLACE FUNCTION complete_level(
  p_user_id UUID,
  p_level_id TEXT,
  p_score INT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_xp_reward INT;
  v_current_day INT;
  v_next_level_id TEXT;
  v_next_day INT;
  v_current_score INT;
BEGIN
  -- 1. Get level details (XP reward and day number)
  SELECT xp_reward, day_number INTO v_xp_reward, v_current_day
  FROM levels
  WHERE id = p_level_id;

  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'message', 'Level not found');
  END IF;

  -- 2. Update or Insert user_progress for the current level
  -- Check if row exists to determine if we need to award XP (only for first completion?)
  -- For now, we'll assume XP is awarded on first completion or every time? 
  -- Usually gamification gives XP once or diminished. 
  -- The prompt says "Update Current... XP Reward: Add XP". 
  -- We'll assume we always update score, but maybe only award XP if not previously completed?
  -- Let's check if it was already completed.
  
  IF EXISTS (SELECT 1 FROM user_progress WHERE user_id = p_user_id AND quiz_id = p_level_id AND status = 'completed') THEN
    -- Already completed, just update score if higher
    UPDATE user_progress
    SET 
      score = GREATEST(score, p_score),
      completed_at = NOW()
    WHERE user_id = p_user_id AND quiz_id = p_level_id;
    
    -- No new XP if already completed (standard logic, can be changed if requested)
    v_xp_reward := 0;
  ELSE
    -- First time completion or upgrading from 'unlocked'
    INSERT INTO user_progress (user_id, quiz_id, score, status, completed_at)
    VALUES (p_user_id, p_level_id, p_score, 'completed', NOW())
    ON CONFLICT (user_id, quiz_id) DO UPDATE
    SET 
      status = 'completed',
      score = GREATEST(user_progress.score, EXCLUDED.score),
      completed_at = NOW();
      
    -- Award XP
    UPDATE profiles
    SET xp = COALESCE(xp, 0) + v_xp_reward
    WHERE id = p_user_id;
  END IF;

  -- 3. Unlock Next Level
  v_next_day := v_current_day + 1;
  
  SELECT id INTO v_next_level_id
  FROM levels
  WHERE day_number = v_next_day
  LIMIT 1;

  IF v_next_level_id IS NOT NULL THEN
    -- Insert next level as unlocked if not exists
    INSERT INTO user_progress (user_id, quiz_id, score, status)
    VALUES (p_user_id, v_next_level_id, 0, 'unlocked')
    ON CONFLICT (user_id, quiz_id) DO NOTHING;
  END IF;

  RETURN json_build_object(
    'success', true,
    'xp_awarded', v_xp_reward,
    'next_level_id', v_next_level_id
  );
END;
$$;
