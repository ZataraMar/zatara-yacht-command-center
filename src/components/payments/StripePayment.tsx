import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard, Shield, Check, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { StripePaymentData, eurosToCents, formatPrice, StripeConfig, getStripeEnvironment } from '@/utils/stripe';

interface StripePaymentProps {
  bookingData: {
    bookingReference: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    bookingDate: string;
    timeSlot: string;
    timePeriodLabel: string;
    numberOfPeople: number;
    totalAmount: number;
    hasUpgrade: boolean;
    upgradeAmount: number;
    specialRequests?: string;
  };
  onPaymentSuccess: () => void;
  onPaymentCancel: () => void;
  disabled?: boolean;
}

export const StripePayment: React.FC<StripePaymentProps> = ({
  bookingData,
  onPaymentSuccess,
  onPaymentCancel,
  disabled = false
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [stripeConfigured, setStripeConfigured] = useState(false);
  const [debugLog, setDebugLog] = useState<string[]>([]);
  const { toast } = useToast();

  const addDebugLog = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const emoji = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    const logMessage = `${timestamp} ${emoji} ${message}`;
    console.log(logMessage);
    setDebugLog(prev => [...prev, logMessage]);
  };

  const copyDebugLog = async () => {
    try {
      await navigator.clipboard.writeText(debugLog.join('\n'));
      toast({ title: "Debug log copied!", variant: "default" });
    } catch (err) {
      toast({ title: "Copy failed", variant: "destructive" });
    }
  };

  // Robust redirect function for long Stripe URLs
  const redirectToStripe = (url: string) => {
    addDebugLog(`Attempting redirect to: ${url.substring(0, 100)}... (${url.length} chars)`);
    
    try {
      // Method 1: Try window.location.href
      window.location.href = url;
      addDebugLog('Redirect method: window.location.href', 'success');
    } catch (error) {
      addDebugLog('window.location.href failed, trying window.open', 'error');
      
      try {
        // Method 2: Try window.open as fallback
        const popup = window.open(url, '_self');
        if (popup) {
          addDebugLog('Redirect method: window.open success', 'success');
        } else {
          addDebugLog('window.open failed, trying form submission', 'error');
          
          // Method 3: Form submission as last resort
          const form = document.createElement('form');
          form.method = 'GET';
          form.action = url;
          form.target = '_self';
          form.style.display = 'none';
          document.body.appendChild(form);
          form.submit();
          document.body.removeChild(form);
          addDebugLog('Redirect method: form submission', 'success');
        }
      } catch (openError) {
        addDebugLog(`All redirect methods failed: ${openError}`, 'error');
        throw new Error('Could not redirect to Stripe checkout. Please try again or contact support.');
      }
    }
  };

  useEffect(() => {
    const checkStripe = async () => {
      try {
        const isConfigured = await StripeConfig.isConfigured();
        setStripeConfigured(isConfigured);
        addDebugLog(`Stripe: ${isConfigured ? 'LIVE configured' : 'Not configured'}`, isConfigured ? 'success' : 'error');
      } catch (error) {
        addDebugLog(`Stripe config error: ${error}`, 'error');
        setStripeConfigured(false);
      }
    };
    checkStripe();
  }, []);

  const handlePayment = async () => {
    setIsProcessing(true);
    setDebugLog([]);

    try {
      addDebugLog('=== PAYMENT STARTED ===');
      addDebugLog(`Reference: ${bookingData.bookingReference}`);
      addDebugLog(`Amount: €${bookingData.totalAmount}`);

      // 1. Save booking with correct values
      const bookingRecord = {
        experience_id: '58b151d4-57e5-4d2c-8883-4d9968cc4c0f',
        booking_reference: bookingData.bookingReference,
        booking_date: bookingData.bookingDate,
        time_slot: bookingData.timeSlot,
        time_period: bookingData.timePeriodLabel,
        number_of_people: bookingData.numberOfPeople,
        customer_name: bookingData.customerName,
        customer_email: bookingData.customerEmail,
        customer_phone: bookingData.customerPhone,
        special_requests: bookingData.specialRequests || null,
        price_per_person: 99,
        total_amount: bookingData.totalAmount,
        currency: 'EUR',
        source: 'mallorcan_sailing_stripe',
        status: 'pending',
        payment_status: 'pending'
      };

      addDebugLog('Saving booking...');
      const { data: savedBooking, error: bookingError } = await supabase
        .from('landing_page_bookings')
        .insert([bookingRecord])
        .select()
        .single();

      if (bookingError) {
        addDebugLog(`Booking error: ${bookingError.message}`, 'error');
        throw new Error('Failed to save booking: ' + bookingError.message);
      }

      addDebugLog(`Booking saved: ${savedBooking.id}`, 'success');

      // 2. Create Stripe checkout
      if (stripeConfigured) {
        addDebugLog('Getting Stripe config...');
        const config = await StripeConfig.getConfig();
        
        if (!config.publishableKey) {
          throw new Error('Stripe publishable key not found');
        }

        addDebugLog('Creating Stripe checkout via Edge Function...');
        
        // Get auth session
        const { data: { session } } = await supabase.auth.getSession();
        
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };

        if (session?.access_token) {
          headers['Authorization'] = `Bearer ${session.access_token}`;
        }

        const stripePaymentData: StripePaymentData = {
          amount: eurosToCents(bookingData.totalAmount),
          currency: 'EUR',
          description: `Mallorcan Sailing Experience - ${bookingData.timePeriodLabel} for ${bookingData.numberOfPeople} people`,
          customerEmail: bookingData.customerEmail,
          customerName: bookingData.customerName,
          bookingReference: bookingData.bookingReference,
          metadata: {
            experience: 'mallorcan-sailing',
            bookingDate: bookingData.bookingDate,
            timeSlot: bookingData.timeSlot,
            numberOfPeople: bookingData.numberOfPeople.toString(),
            upgradeIncluded: bookingData.hasUpgrade.toString(),
            bookingId: bookingData.bookingReference
          }
        };

        const requestData = {
          payment_data: stripePaymentData,
          success_url: `${window.location.origin}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: window.location.href,
          customer_email: stripePaymentData.customerEmail,
        };

        addDebugLog(`Calling Edge Function...`);

        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-stripe-checkout`, {
          method: 'POST',
          headers,
          body: JSON.stringify(requestData),
        });

        addDebugLog(`Edge Function response: ${response.status}`);

        if (!response.ok) {
          const errorText = await response.text();
          addDebugLog(`Edge Function error: ${errorText}`, 'error');
          throw new Error(`Failed to create checkout: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        addDebugLog(`Checkout session: ${data.session_id}`, 'success');

        if (data?.url) {
          addDebugLog(`Received Stripe URL, redirecting...`, 'success');
          
          // Simple direct redirect to Stripe
          window.location.href = data.url;
          
        } else {
          throw new Error('No checkout URL received');
        }

      } else {
        // Simulation mode - this should NOT call onPaymentSuccess
        addDebugLog('SIMULATION MODE - No real payment configured', 'info');
        
        toast({
          title: "Stripe Not Configured",
          description: "Please configure Stripe in Admin Settings to enable real payments.",
          variant: "destructive"
        });
        
        // Do NOT call onPaymentSuccess in simulation mode
        // The user should be redirected to Stripe, not see the success modal
      }

    } catch (error) {
      addDebugLog(`PAYMENT FAILED: ${error}`, 'error');
      
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Debug Log */}
      {debugLog.length > 0 && (
        <div className="bg-gray-50 border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-sm">Debug Log:</h4>
            <Button
              onClick={copyDebugLog}
              variant="outline"
              size="sm"
              className="h-6 px-2 text-xs"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </Button>
          </div>
          <div className="text-xs font-mono space-y-1 max-h-40 overflow-y-auto">
            {debugLog.map((log, i) => (
              <div key={i} className="text-gray-700">{log}</div>
            ))}
          </div>
        </div>
      )}

      {/* Payment Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-zatara-blue" />
          Payment Summary
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-700">Experience for {bookingData.numberOfPeople} people</span>
            <span className="font-medium">{formatPrice(bookingData.totalAmount - bookingData.upgradeAmount)}</span>
          </div>
          
          {bookingData.hasUpgrade && (
            <div className="flex justify-between">
              <span className="text-gray-700">Premium Catering Upgrade</span>
              <span className="font-medium">{formatPrice(bookingData.upgradeAmount)}</span>
            </div>
          )}
          
          <div className="border-t border-blue-200 pt-3">
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount</span>
              <span className="text-zatara-blue">{formatPrice(bookingData.totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-600">
        <div className="flex items-center justify-center gap-1">
          <Shield className="h-4 w-4 text-green-600" />
          <span>Secure Payment</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <Check className="h-4 w-4 text-green-600" />
          <span>SSL Encrypted</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <Check className="h-4 w-4 text-green-600" />
          <span>PCI Compliant</span>
        </div>
      </div>

      {/* Payment Button */}
      <div className="space-y-3">
        <Button
          onClick={handlePayment}
          disabled={disabled || isProcessing}
          className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white disabled:bg-gray-400"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {stripeConfigured ? 'Redirecting to Stripe...' : 'Processing Payment...'}
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-5 w-5" />
              Pay {formatPrice(bookingData.totalAmount)} - Secure Checkout
            </>
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onPaymentCancel}
          disabled={isProcessing}
          className="w-full"
        >
          Cancel and Return to Booking
        </Button>
      </div>

      {/* Payment Info */}
      <div className="text-xs text-gray-500 text-center">
        {stripeConfigured ? (
          <>
            <p>Payments are processed securely through Stripe.</p>
            <p>You will be redirected to Stripe's secure checkout page.</p>
          </>
        ) : (
          <>
            <p>Demo mode active - no real payments will be processed.</p>
            <p>Configure Stripe in Admin Settings to enable real payments.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default StripePayment;