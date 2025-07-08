/**
 * Centralized formatting utilities for dates, times, and currency
 * Removes seconds from all time displays and handles decimal precision for money
 */

// Get formatting settings from admin_settings (defaults if not available)
const getFormatSettings = () => {
  // These would be loaded from admin settings in a real implementation
  // For now, using defaults
  return {
    dateFormat: 'en-GB', // DD/MM/YYYY
    timeFormat: '24h', // 24h or 12h
    timezone: 'Europe/Madrid', // Mallorca timezone
    currencyDecimals: false, // No decimals for internal use
    clientCurrencyDecimals: true // Decimals for client communications
  };
};

/**
 * Format date without time
 */
export const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return '?';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return '?';
  
  const settings = getFormatSettings();
  return dateObj.toLocaleDateString(settings.dateFormat, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

/**
 * Format time without seconds
 */
export const formatTime = (date: string | Date | null | undefined): string => {
  if (!date) return '?';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return '?';
  
  const settings = getFormatSettings();
  return dateObj.toLocaleTimeString(settings.dateFormat, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: settings.timeFormat === '12h'
  });
};

/**
 * Format date and time without seconds
 */
export const formatDateTime = (date: string | Date | null | undefined): string => {
  if (!date) return '?';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return '?';
  
  const settings = getFormatSettings();
  return dateObj.toLocaleDateString(settings.dateFormat, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: settings.timeFormat === '12h'
  });
};

/**
 * Format currency amounts
 * @param amount - The amount to format
 * @param context - 'internal' (no decimals) or 'client' (with decimals)
 */
export const formatCurrency = (
  amount: number | string | null | undefined, 
  context: 'internal' | 'client' = 'internal'
): string => {
  if (amount === null || amount === undefined || amount === '') return '€0';
  
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(numAmount)) return '€0';
  
  const settings = getFormatSettings();
  const useDecimals = context === 'client' ? settings.clientCurrencyDecimals : settings.currencyDecimals;
  
  return `€${numAmount.toLocaleString('en-GB', {
    minimumFractionDigits: useDecimals ? 2 : 0,
    maximumFractionDigits: useDecimals ? 2 : 0
  })}`;
};

/**
 * Format large numbers for display (K, M notation)
 */
export const formatLargeNumber = (amount: number | string | null | undefined): string => {
  if (amount === null || amount === undefined || amount === '') return '0';
  
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(numAmount)) return '0';
  
  if (numAmount >= 1000000) {
    return `${(numAmount / 1000000).toFixed(1)}M`;
  } else if (numAmount >= 1000) {
    return `${(numAmount / 1000).toFixed(1)}K`;
  }
  
  return numAmount.toLocaleString();
};

/**
 * Format currency with K/M notation for large amounts
 */
export const formatCurrencyCompact = (
  amount: number | string | null | undefined,
  context: 'internal' | 'client' = 'internal'
): string => {
  if (amount === null || amount === undefined || amount === '') return '€0';
  
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(numAmount)) return '€0';
  
  if (numAmount >= 10000) {
    return `€${formatLargeNumber(numAmount)}`;
  }
  
  return formatCurrency(numAmount, context);
};

/**
 * Format duration in hours without decimals
 */
export const formatDuration = (hours: number | string | null | undefined): string => {
  if (hours === null || hours === undefined || hours === '') return '?';
  
  const numHours = typeof hours === 'string' ? parseFloat(hours) : hours;
  if (isNaN(numHours)) return '?';
  
  const wholeHours = Math.floor(numHours);
  const minutes = Math.round((numHours - wholeHours) * 60);
  
  if (minutes === 0) {
    return `${wholeHours}h`;
  } else {
    return `${wholeHours}h ${minutes}m`;
  }
};