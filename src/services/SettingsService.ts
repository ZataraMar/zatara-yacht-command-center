import { supabase } from '@/integrations/supabase/client';

export interface AdminSetting {
  setting_key: string;
  setting_value: string;
  setting_type: string;
  description: string;
  category: string;
  is_encrypted: boolean;
}

// Settings service for managing app configuration in Supabase
export class SettingsService {
  private static cache: Map<string, AdminSetting> = new Map();
  private static cacheExpiry: number = 0;
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  // Get a setting value from Supabase
  static async getSetting(key: string, defaultValue: string = ''): Promise<string> {
    try {
      // Check cache first
      if (this.isCacheValid() && this.cache.has(key)) {
        return this.cache.get(key)?.setting_value || defaultValue;
      }

      // Fetch from Supabase
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*')
        .eq('setting_key', key)
        .single();

      if (error) {
        console.error(`Error fetching setting ${key}:`, error);
        return defaultValue;
      }

      if (data) {
        this.cache.set(key, data);
        this.updateCacheExpiry();
        return data.setting_value;
      }

      return defaultValue;
    } catch (error) {
      console.error(`Failed to get setting ${key}:`, error);
      return defaultValue;
    }
  }

  // Get all settings
  static async getAllSettings(): Promise<AdminSetting[]> {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*')
        .order('category', { ascending: true })
        .order('setting_key', { ascending: true });

      if (error) throw error;
      
      // Update cache
      this.cache.clear();
      (data || []).forEach(setting => {
        this.cache.set(setting.setting_key, setting);
      });
      this.updateCacheExpiry();
      
      return data || [];
    } catch (error) {
      console.error('Error fetching settings:', error);
      return [];
    }
  }

  // Get multiple settings at once
  static async getSettings(keys: string[]): Promise<Record<string, string>> {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('setting_key, setting_value')
        .in('setting_key', keys);

      if (error) {
        console.error('Error fetching settings:', error);
        return {};
      }

      const result: Record<string, string> = {};
      data?.forEach(item => {
        result[item.setting_key] = item.setting_value;
      });

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
        .from('admin_settings')
        .update({
          setting_value: value,
          updated_at: new Date().toISOString(),
          updated_by: updatedBy || 'admin'
        })
        .eq('setting_key', key);

      if (error) {
        console.error(`Error updating setting ${key}:`, error);
        return false;
      }

      // Update cache if exists
      if (this.cache.has(key)) {
        const existing = this.cache.get(key)!;
        this.cache.set(key, { ...existing, setting_value: value });
      }
      
      return true;
    } catch (error) {
      console.error(`Failed to update setting ${key}:`, error);
      return false;
    }
  }

  // Get settings by category
  static async getSettingsByCategory(category: string): Promise<AdminSetting[]> {
    const allSettings = await this.getAllSettings();
    return allSettings.filter(setting => setting.category === category);
  }

  // Convenience methods for common settings
  static async getStripePublishableKey(): Promise<string> {
    return this.getSetting('stripe_publishable_key');
  }

  static async getStripeSecretKey(): Promise<string> {
    return this.getSetting('stripe_secret_key');
  }

  static async getEmailFromAddress(): Promise<string> {
    return this.getSetting('email_from_address', 'cruise@zatara.es');
  }

  static async getSendGridApiKey(): Promise<string> {
    return this.getSetting('sendgrid_api_key');
  }

  static async getN8nWebhookUrl(): Promise<string> {
    return this.getSetting('n8n_webhook_url');
  }

  static async getWhatsAppApiUrl(): Promise<string> {
    return this.getSetting('whatsapp_api_url');
  }

  static async getWhatsAppPhoneNumber(): Promise<string> {
    return this.getSetting('whatsapp_phone_number');
  }

  static async getCompanyInfo(): Promise<{
    name: string;
    email: string;
    phone: string;
  }> {
    const [name, email, phone] = await Promise.all([
      this.getSetting('company_name', 'Zatara Charters'),
      this.getSetting('company_email', 'cruise@zatara.es'),
      this.getSetting('company_phone', '+34 123 456 789')
    ]);

    return { name, email, phone };
  }

  static async getSystemSettings(): Promise<{
    timezone: string;
    currency: string;
    language: string;
  }> {
    const [timezone, currency, language] = await Promise.all([
      this.getSetting('timezone', 'Europe/Madrid'),
      this.getSetting('currency', 'EUR'),
      this.getSetting('language', 'en')
    ]);

    return { timezone, currency, language };
  }

  // Platform integration keys
  static async getAndronauticApiKey(): Promise<string> {
    return this.getSetting('andronautic_api_key');
  }

  static async getClickBoatApiKey(): Promise<string> {
    return this.getSetting('clickboat_api_key');
  }

  static async getAirbnbApiKey(): Promise<string> {
    return this.getSetting('airbnb_api_key');
  }

  static async getViatorApiKey(): Promise<string> {
    return this.getSetting('viator_api_key');
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
  STRIPE_PUBLISHABLE_KEY: 'stripe_publishable_key',
  STRIPE_SECRET_KEY: 'stripe_secret_key',
  
  // Email settings
  SENDGRID_API_KEY: 'sendgrid_api_key',
  EMAIL_FROM_ADDRESS: 'email_from_address',
  EMAIL_FROM_NAME: 'email_from_name',
  
  // WhatsApp settings
  WHATSAPP_API_URL: 'whatsapp_api_url',
  WHATSAPP_PHONE_NUMBER: 'whatsapp_phone_number',
  
  // N8N settings
  N8N_WEBHOOK_URL: 'n8n_webhook_url',
  N8N_API_KEY: 'n8n_api_key',
  
  // Business settings
  COMPANY_NAME: 'company_name',
  COMPANY_EMAIL: 'company_email',
  COMPANY_PHONE: 'company_phone',
  BOOKING_CONFIRMATION_TEMPLATE: 'booking_confirmation_template',
  
  // Platform integrations
  ANDRONAUTIC_API_KEY: 'andronautic_api_key',
  ANDRONAUTIC_BASE_URL: 'andronautic_base_url',
  CLICKBOAT_API_KEY: 'clickboat_api_key',
  AIRBNB_API_KEY: 'airbnb_api_key',
  VIATOR_API_KEY: 'viator_api_key',
  
  // System settings
  TIMEZONE: 'timezone',
  CURRENCY: 'currency',
  LANGUAGE: 'language',
  MAX_BOOKING_DAYS_ADVANCE: 'max_booking_days_advance',
} as const;

export default SettingsService;