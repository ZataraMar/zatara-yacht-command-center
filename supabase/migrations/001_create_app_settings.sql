-- Create settings table for storing API keys and configuration
-- This allows admin management through the portal instead of environment variables

CREATE TABLE IF NOT EXISTS app_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_category VARCHAR(50) NOT NULL DEFAULT 'general',
    setting_value TEXT NOT NULL,
    description TEXT,
    is_encrypted BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_app_settings_key ON app_settings(setting_key);
CREATE INDEX IF NOT EXISTS idx_app_settings_category ON app_settings(setting_category);

-- Enable RLS (Row Level Security)
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access only
CREATE POLICY "Admin full access to settings" ON app_settings
    FOR ALL USING (auth.role() = 'admin' OR auth.jwt() ->> 'role' = 'admin');

-- Create policy for app read access to active settings
CREATE POLICY "App read access to active settings" ON app_settings
    FOR SELECT USING (is_active = true);

-- Create function to get setting value
CREATE OR REPLACE FUNCTION get_setting(key_name VARCHAR)
RETURNS TEXT AS $$
DECLARE
    result TEXT;
BEGIN
    SELECT setting_value INTO result
    FROM app_settings
    WHERE setting_key = key_name AND is_active = true;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to update setting value
CREATE OR REPLACE FUNCTION update_setting(key_name VARCHAR, new_value TEXT, updated_by_user VARCHAR DEFAULT NULL)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE app_settings 
    SET setting_value = new_value, 
        updated_at = NOW(),
        updated_by = updated_by_user
    WHERE setting_key = key_name;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;