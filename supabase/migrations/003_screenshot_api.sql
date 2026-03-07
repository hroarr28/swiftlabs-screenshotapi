-- Screenshot API Tables and Functions
-- Migration: 003_screenshot_api.sql

-- 1. Add screenshot-specific columns to subscriptions table
ALTER TABLE subscriptions 
ADD COLUMN IF NOT EXISTS screenshots_included INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS screenshots_used INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS overage_rate DECIMAL(10, 6) DEFAULT 0;

-- 2. Create API keys table
CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  key_hash TEXT NOT NULL UNIQUE,
  key_prefix TEXT NOT NULL, -- First 8 chars for display (e.g., "sk_live_")
  name TEXT, -- Optional name for the key
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  revoked_at TIMESTAMPTZ,
  
  CONSTRAINT api_keys_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Index for fast key lookups
CREATE INDEX IF NOT EXISTS idx_api_keys_key_hash ON api_keys(key_hash);
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON api_keys(user_id);

-- 3. Create screenshot_usage table
CREATE TABLE IF NOT EXISTS screenshot_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  api_key_id UUID REFERENCES api_keys(id) ON DELETE SET NULL,
  url TEXT NOT NULL,
  format TEXT NOT NULL, -- 'png', 'jpeg', 'pdf'
  viewport_width INTEGER,
  viewport_height INTEGER,
  full_page BOOLEAN DEFAULT false,
  file_size INTEGER, -- bytes
  duration_ms INTEGER, -- how long the screenshot took
  created_at TIMESTAMPTZ DEFAULT now(),
  
  CONSTRAINT screenshot_usage_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Indexes for analytics and usage queries
CREATE INDEX IF NOT EXISTS idx_screenshot_usage_user_id ON screenshot_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_screenshot_usage_created_at ON screenshot_usage(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_screenshot_usage_user_created ON screenshot_usage(user_id, created_at DESC);

-- 4. RLS Policies for api_keys
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Users can view their own API keys
CREATE POLICY "Users can view their own API keys"
  ON api_keys FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can create their own API keys
CREATE POLICY "Users can create their own API keys"
  ON api_keys FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can revoke their own API keys
CREATE POLICY "Users can update their own API keys"
  ON api_keys FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own API keys
CREATE POLICY "Users can delete their own API keys"
  ON api_keys FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- 5. RLS Policies for screenshot_usage
ALTER TABLE screenshot_usage ENABLE ROW LEVEL SECURITY;

-- Users can view their own usage
CREATE POLICY "Users can view their own usage"
  ON screenshot_usage FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Service role can insert usage records (API will use service role)
CREATE POLICY "Service role can insert usage"
  ON screenshot_usage FOR INSERT
  TO service_role
  WITH CHECK (true);

-- 6. Function to increment screenshot usage
CREATE OR REPLACE FUNCTION increment_screenshot_usage(
  p_user_id UUID
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE subscriptions
  SET screenshots_used = screenshots_used + 1,
      updated_at = now()
  WHERE user_id = p_user_id;
END;
$$;

-- 7. Function to check if user has available screenshots
CREATE OR REPLACE FUNCTION has_available_screenshots(
  p_user_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_included INTEGER;
  v_used INTEGER;
  v_tier TEXT;
BEGIN
  -- Get current subscription details
  SELECT 
    screenshots_included,
    screenshots_used,
    tier
  INTO v_included, v_used, v_tier
  FROM subscriptions
  WHERE user_id = p_user_id;
  
  -- If no subscription found, return false
  IF NOT FOUND THEN
    RETURN false;
  END IF;
  
  -- Pro tier has unlimited (we'll set included to a very high number)
  -- Free tier gets 100/month
  -- Starter tier gets included amount
  
  -- Check if under limit
  RETURN v_used < v_included;
END;
$$;

-- 8. Function to reset monthly usage (call via cron)
CREATE OR REPLACE FUNCTION reset_monthly_screenshot_usage()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE subscriptions
  SET screenshots_used = 0,
      updated_at = now()
  WHERE tier IN ('free', 'starter', 'pro');
  
  -- Log the reset
  RAISE NOTICE 'Screenshot usage reset for all subscriptions at %', now();
END;
$$;

-- 9. Create default subscription for new users
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO subscriptions (
    user_id,
    tier,
    status,
    screenshots_included,
    screenshots_used,
    overage_rate,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    'free',
    'active',
    100, -- 100 screenshots/month on free tier
    0,
    0, -- No overage on free tier
    now(),
    now()
  );
  
  RETURN NEW;
END;
$$;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- 10. Update existing subscriptions with default values
UPDATE subscriptions
SET 
  screenshots_included = CASE 
    WHEN tier = 'free' THEN 100
    WHEN tier = 'starter' THEN 20000
    WHEN tier = 'pro' THEN 100000
    ELSE 0
  END,
  screenshots_used = 0,
  overage_rate = CASE
    WHEN tier = 'free' THEN 0
    WHEN tier = 'starter' THEN 0.001
    WHEN tier = 'pro' THEN 0.0005
    ELSE 0
  END
WHERE screenshots_included IS NULL;

COMMENT ON TABLE api_keys IS 'API keys for programmatic access to Screenshot API';
COMMENT ON TABLE screenshot_usage IS 'Usage tracking for screenshots taken via API';
COMMENT ON FUNCTION increment_screenshot_usage IS 'Increments screenshot usage counter for a user';
COMMENT ON FUNCTION has_available_screenshots IS 'Checks if user has available screenshots in their quota';
COMMENT ON FUNCTION reset_monthly_screenshot_usage IS 'Resets monthly usage counters (run via cron on 1st of each month)';
