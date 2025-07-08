import { supabase } from '@/integrations/supabase/client';

// Settings service for managing app configuration in Supabase
export class SettingsService {
  private static cache: Map<string, string> = new Map();
  private static cacheExpiry: number = 0;
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  // Get a setting value from Supabase
  static async getSetting(key: string): Promise<string | null> {
    try {
      // Check cache first
      if (this.isCacheValid() && this.cache.has(key)) {
        return this.cache.get(key) || null;
      }

      // Fetch from Supabase
      const { data, error } = await supabase
        .from('app_settings')
        .select('setting_value')
        .eq('setting_key', key)
        .eq('is_active', true)
        .single();

      if (error) {
        console.error(`Error fetching setting ${key}:`, error);
        return null;
      }

      if (data) {
        this.cache.set(key, data.setting_value);
        this.updateCacheExpiry();
        return data.setting_value;
      }

      return null;
    } catch (error) {
      console.error(`Failed to get setting ${key}:`, error);
      return null;
    }
  }

  // Get multiple settings at once
  static async getSettings(keys: string[]): Promise<Record<string, string>> {
    try {
      const { data, error } = await supabase
        .from('app_settings')
        .select('setting_key, setting_value')
        .in('setting_key', keys)
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching settings:', error);
        return {};
      }

      const result: Record<string, string> = {};
      data?.forEach(item => {
        result[item.setting_key] = item.setting_value;
        this.cache.set(item.setting_key, item.setting_value);
      });

      this.updateCacheExpiry();
      return result;
    } catch (error) {
      console.error('Failed to get settings:', error);
      return {};
    }
  }

  // Update a setting value
  static async updateSetting(key: string, value: string, updatedBy?: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('app_settings')
        .update({
          setting_value: value,
          updated_at: new Date().toISOString(),
          updated_by: updatedBy
        })
        .eq('setting_key', key);

      if (error) {
        console.error(`Error updating setting ${key}:`, error);
        return false;
      }

      // Update cache
      this.cache.set(key, value);
      return true;
    } catch (error) {
      console.error(`Failed to update setting ${key}:`, error);
      return false;
    }
  }

  // Create a new setting
  static async createSetting(
    key: string, 
    value: string, 
    category: string = 'general',
    description?: string
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('app_settings')
        .insert({
          setting_key: key,
          setting_value: value,
          setting_category: category,
          description: description,
          is_active: true
        });

      if (error) {
        console.error(`Error creating setting ${key}:`, error);
        return false;
      }

      // Update cache
      this.cache.set(key, value);
      return true;
    } catch (error) {
      console.error(`Failed to create setting ${key}:`, error);
      return false;
    }
  }

  // Get all settings by category
  static async getSettingsByCategory(category: string): Promise<Record<string, string>> {
    try {
      const { data, error } = await supabase
        .from('app_settings')
        .select('setting_key, setting_value')
        .eq('setting_category', category)
        .eq('is_active', true);

      if (error) {
        console.error(`Error fetching ${category} settings:`, error);
        return {};
      }

      const result: Record<string, string> = {};
      data?.forEach(item => {
        result[item.setting_key] = item.setting_value;
      });

      return result;
    } catch (error) {
      console.error(`Failed to get ${category} settings:`, error);
      return {};
    }
  }

  // Clear cache
  static clearCache(): void {
    this.cache.clear();
    this.cacheExpiry = 0;
  }

  // Check if cache is still valid
  private static isCacheValid(): boolean {
    return Date.now() < this.cacheExpiry;
  }

  // Update cache expiry time
  private static updateCacheExpiry(): void {
    this.cacheExpiry = Date.now() + this.CACHE_DURATION;
  }
}

// Predefined setting keys for type safety
export const SETTING_KEYS = {
  // Stripe settings
  STRIPE_PUBLISHABLE_KEY_TEST: 'stripe_publishable_key_test',
  STRIPE_SECRET_KEY_TEST: 'stripe_secret_key_test',
  STRIPE_PUBLISHABLE_KEY_LIVE: 'stripe_publishable_key_live',
  STRIPE_SECRET_KEY_LIVE: 'stripe_secret_key_live',
  STRIPE_WEBHOOK_SECRET: 'stripe_webhook_secret',
  
  // Payment settings
  PAYMENT_CURRENCY: 'payment_currency',
  PAYMENT_COUNTRY: 'payment_country',
  ENVIRONMENT_MODE: 'environment_mode',
  
  // Business settings
  BUSINESS_NAME: 'business_name',
  BUSINESS_EMAIL: 'business_email',
  WHATSAPP_NUMBER: 'whatsapp_number',
  BOOKING_CONFIRMATION_EMAIL: 'booking_confirmation_email',
  
  // N8N settings
  N8N_WEBHOOK_URL: 'n8n_webhook_url',
  N8N_API_KEY: 'n8n_api_key',
  
  // Email settings
  SMTP_HOST: 'smtp_host',
  SMTP_USER: 'smtp_user',
  SMTP_PASSWORD: 'smtp_password',
} as const;

export default SettingsService;