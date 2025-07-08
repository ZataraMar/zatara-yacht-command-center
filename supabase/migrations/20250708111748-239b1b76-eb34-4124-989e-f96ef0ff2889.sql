-- Insert date and time formatting settings into admin_settings
INSERT INTO admin_settings (setting_key, setting_value, setting_type, category, description) VALUES
('date_format_locale', 'en-GB', 'text', 'formatting', 'Date format locale (en-GB for DD/MM/YYYY, en-US for MM/DD/YYYY)'),
('time_format_style', '24h', 'text', 'formatting', 'Time format style (24h or 12h)'),
('timezone', 'Europe/Madrid', 'text', 'formatting', 'Default timezone for date/time display'),
('currency_decimals_internal', 'false', 'boolean', 'formatting', 'Show decimals in currency for internal operations'),
('currency_decimals_client', 'true', 'boolean', 'formatting', 'Show decimals in currency for client communications and invoicing'),
('remove_seconds_display', 'true', 'boolean', 'formatting', 'Remove seconds from all time displays across the system')
ON CONFLICT (setting_key) DO UPDATE SET
  setting_value = EXCLUDED.setting_value,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  updated_at = NOW();