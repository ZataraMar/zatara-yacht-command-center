import SettingsService, { SETTING_KEYS } from '@/services/SettingsService';

// Stripe Configuration for Zatara Charter Payments
// Now reads from Supabase settings instead of environment variables
export class StripeConfig {
  private static settings: Record<string, string> = {};
  private static initialized = false;

  // Initialize Stripe configuration from Supabase
  static async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      this.settings = await SettingsService.getSettings([
        SETTING_KEYS.STRIPE_PUBLISHABLE_KEY_TEST,
        SETTING_KEYS.STRIPE_SECRET_KEY_TEST,
        SETTING_KEYS.STRIPE_PUBLISHABLE_KEY_LIVE,
        SETTING_KEYS.STRIPE_SECRET_KEY_LIVE,
        SETTING_KEYS.STRIPE_WEBHOOK_SECRET,
        SETTING_KEYS.PAYMENT_CURRENCY,
        SETTING_KEYS.PAYMENT_COUNTRY,
        SETTING_KEYS.ENVIRONMENT_MODE,
      ]);

      this.initialized = true;
      console.log('Stripe configuration loaded from Supabase');
    } catch (error) {
      console.error('Failed to initialize Stripe configuration:', error);
      // Fallback to environment variables if Supabase fails
      this.settings = {
        [SETTING_KEYS.STRIPE_PUBLISHABLE_KEY_TEST]: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
        [SETTING_KEYS.STRIPE_SECRET_KEY_TEST]: import.meta.env.VITE_STRIPE_SECRET_KEY || '',
        [SETTING_KEYS.PAYMENT_CURRENCY]: 'EUR',
        [SETTING_KEYS.PAYMENT_COUNTRY]: 'ES',
        [SETTING_KEYS.ENVIRONMENT_MODE]: 'test',
      };
    }
  }

  // Get current configuration
  static async getConfig() {
    await this.initialize();
    
    const isLive = this.settings[SETTING_KEYS.ENVIRONMENT_MODE] === 'live';
    
    return {
      publishableKey: isLive 
        ? this.settings[SETTING_KEYS.STRIPE_PUBLISHABLE_KEY_LIVE]
        : this.settings[SETTING_KEYS.STRIPE_PUBLISHABLE_KEY_TEST],
      secretKey: isLive 
        ? this.settings[SETTING_KEYS.STRIPE_SECRET_KEY_LIVE]
        : this.settings[SETTING_KEYS.STRIPE_SECRET_KEY_TEST],
      webhookSecret: this.settings[SETTING_KEYS.STRIPE_WEBHOOK_SECRET],
      currency: this.settings[SETTING_KEYS.PAYMENT_CURRENCY] || 'EUR',
      country: this.settings[SETTING_KEYS.PAYMENT_COUNTRY] || 'ES',
      mode: this.settings[SETTING_KEYS.ENVIRONMENT_MODE] || 'test',
      isLive,
    };
  }

  // Check if Stripe is properly configured
  static async isConfigured(): Promise<boolean> {
    const config = await this.getConfig();
    return !!(config.publishableKey && config.secretKey);
  }

  // Force refresh settings from Supabase
  static async refresh(): Promise<void> {
    this.initialized = false;
    SettingsService.clearCache();
    await this.initialize();
  }
}

// Stripe payment session data structure
export interface StripePaymentData {
  amount: number; // in cents (€891 = 89100)
  currency: string;
  description: string;
  customerEmail: string;
  customerName: string;
  bookingReference: string;
  metadata: {
    experience: string;
    bookingDate: string;
    timeSlot: string;
    numberOfPeople: string;
    upgradeIncluded: string;
    bookingId: string;
  };
}

// Payment status types
export type PaymentStatus = 'pending' | 'processing' | 'succeeded' | 'failed' | 'canceled';

// Stripe checkout session configuration
export const createCheckoutSessionData = async (
  paymentData: StripePaymentData,
  successUrl: string,
  cancelUrl: string
) => {
  const config = await StripeConfig.getConfig();
  
  return {
    payment_method_types: ['card'],
    mode: 'payment' as const,
    amount: paymentData.amount,
    currency: paymentData.currency,
    description: paymentData.description,
    customer_email: paymentData.customerEmail,
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: paymentData.metadata,
    // Automatic tax calculation for Spain
    automatic_tax: {
      enabled: true,
    },
    // Invoice creation for business records
    invoice_creation: {
      enabled: true,
      invoice_data: {
        description: paymentData.description,
        metadata: paymentData.metadata,
      },
    },
  };
};

// Utility functions for amount conversion
export const eurosToCents = (euros: number): number => Math.round(euros * 100);
export const centsToEuros = (cents: number): number => cents / 100;

// Format price for display
export const formatPrice = (amount: number, currency: string = 'EUR'): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Get current environment info
export const getStripeEnvironment = async () => {
  const config = await StripeConfig.getConfig();
  const isConfigured = await StripeConfig.isConfigured();
  
  return {
    mode: config.mode,
    isConfigured,
    publishableKeyExists: !!config.publishableKey,
    environment: config.mode,
    country: config.country,
    currency: config.currency,
  };
};

export default StripeConfig;