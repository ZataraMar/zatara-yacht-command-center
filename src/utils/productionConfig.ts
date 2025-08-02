// Production configuration for Zatara Yacht Command Center
export const PRODUCTION_CONFIG = {
  // Domain configuration
  PRODUCTION_DOMAIN: 'cruise.zatara.es',
  STAGING_DOMAIN: 'd7313886-9c5d-4953-8a7c-210a860cadae.lovableproject.com',
  
  // App Store configuration
  APP_STORE: {
    IOS_BUNDLE_ID: 'app.lovable.d73138869c5d49538a7c210a860cadae',
    ANDROID_PACKAGE_NAME: 'app.lovable.d73138869c5d49538a7c210a860cadae',
    APP_NAME: 'Zatara Yacht Command Center',
    APP_VERSION: '1.0.0',
    BUILD_NUMBER: '1'
  },
  
  // Performance configuration
  PERFORMANCE: {
    CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours
    OFFLINE_TIMEOUT: 5000, // 5 seconds
    MAX_RETRY_ATTEMPTS: 3,
    PRELOAD_ROUTES: ['/dashboard', '/dashboard/operations', '/dashboard/bookings'],
    CRITICAL_RESOURCES: [
      '/manifest.json',
      '/sw.js'
    ]
  },
  
  // Security configuration
  SECURITY: {
    CSP_POLICY: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co https://*.supabase.in",
    ALLOWED_ORIGINS: [
      'https://cruise.zatara.es',
      'https://d7313886-9c5d-4953-8a7c-210a860cadae.lovableproject.com'
    ]
  },
  
  // Feature flags for production
  FEATURES: {
    ANALYTICS_ENABLED: true,
    ERROR_REPORTING: true,
    PUSH_NOTIFICATIONS: true,
    OFFLINE_MODE: true,
    AUTO_SYNC: true,
    BACKGROUND_SYNC: true
  }
};

// Environment detection
export const isProduction = () => {
  return window.location.hostname === PRODUCTION_CONFIG.PRODUCTION_DOMAIN;
};

export const isDevelopment = () => {
  return window.location.hostname.includes('localhost') || 
         window.location.hostname.includes('127.0.0.1');
};

export const isStaging = () => {
  return window.location.hostname.includes('lovableproject.com');
};

// Get appropriate configuration based on environment
export const getEnvironmentConfig = () => {
  if (isProduction()) {
    return {
      environment: 'production',
      baseUrl: `https://${PRODUCTION_CONFIG.PRODUCTION_DOMAIN}`,
      debug: false,
      ...PRODUCTION_CONFIG
    };
  } else if (isStaging()) {
    return {
      environment: 'staging',
      baseUrl: `https://${PRODUCTION_CONFIG.STAGING_DOMAIN}`,
      debug: true,
      ...PRODUCTION_CONFIG
    };
  } else {
    return {
      environment: 'development',
      baseUrl: window.location.origin,
      debug: true,
      ...PRODUCTION_CONFIG
    };
  }
};