// Stripe Configuration for Zatara Charter Payments
// This handles payment processing for experience bookings

export const STRIPE_CONFIG = {
  // Get keys from environment variables (set in .env.local)
  publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_test_key_here',
  secretKey: import.meta.env.VITE_STRIPE_SECRET_KEY || 'sk_test_your_secret_key_here',
  currency: 'EUR',
  country: 'ES', // Spain for Mallorca operations
  mode: import.meta.env.VITE_NODE_ENV === 'production' ? 'live' : 'test',
};

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
export const createCheckoutSessionData = (
  paymentData: StripePaymentData,
  successUrl: string,
  cancelUrl: string
) => ({
  payment_method_types: ['card'],
  mode: 'payment',
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
});

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

// Check if Stripe is properly configured
export const isStripeConfigured = (): boolean => {
  const hasPublishableKey = STRIPE_CONFIG.publishableKey && 
    !STRIPE_CONFIG.publishableKey.includes('your_test_key_here');
  const hasSecretKey = STRIPE_CONFIG.secretKey && 
    !STRIPE_CONFIG.secretKey.includes('your_secret_key_here');
  
  return hasPublishableKey && hasSecretKey;
};

// Get current environment info
export const getStripeEnvironment = () => ({
  mode: STRIPE_CONFIG.mode,
  isConfigured: isStripeConfigured(),
  publishableKeyExists: !!STRIPE_CONFIG.publishableKey,
  environment: import.meta.env.VITE_NODE_ENV || 'development'
});

export default STRIPE_CONFIG;