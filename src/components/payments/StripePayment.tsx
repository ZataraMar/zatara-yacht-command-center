import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard, Shield, Check, AlertTriangle, Copy } from 'lucide-react';
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
  const [stripeEnvironment, setStripeEnvironment] = useState<any>(null);
  const [debugLog, setDebugLog] = useState<string[]>([]);
  const { toast } = useToast();

  // Debug logging function
  const addDebugLog = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const emoji = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    const logMessage = `${timestamp} ${emoji} ${message}`;
    console.log(logMessage);
    setDebugLog(prev => [...prev, logMessage]);
  };

  // Copy debug log to clipboard
  const copyDebugLog = async () => {
    const logText = debugLog.join('\n');
    try {
      await navigator.clipboard.writeText(logText);
      toast({
        title: "Debug log copied!",
        description: "The debug log has been copied to your clipboard.",
        variant: "default"
      });
    } catch (err) {
      console.error('Failed to copy log:', err);
      toast({
        title: "Copy failed",
        description: "Could not copy debug log to clipboard.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    // Check Stripe configuration on component mount
    const checkStripeConfig = async () => {
      try {
        addDebugLog('Checking Stripe configuration...');
        const isConfigured = await StripeConfig.isConfigured();
        const environment = await getStripeEnvironment();
        
        setStripeConfigured(isConfigured);
        setStripeEnvironment(environment);
        
        if (!isConfigured) {
          addDebugLog('Stripe not configured - using simulation mode', 'error');
        } else {
          addDebugLog(`Stripe configured for ${environment.mode} payments`, 'success');
        }
      } catch (error) {
        addDebugLog(`Error checking Stripe configuration: ${error}`, 'error');
        setStripeConfigured(false);
      }
    };

    checkStripeConfig();
  }, []);

  const createStripeCheckout = async (stripePaymentData: StripePaymentData) => {
    try {
      addDebugLog('Starting Stripe checkout creation...');
      
      // Get the current session for authentication
      const { data: { session } } = await supabase.auth.getSession();
      addDebugLog(`Auth session: ${session ? 'Found' : 'None'}`);
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      // Add auth headers if we have a session
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
        addDebugLog('Added auth headers');
      }

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-stripe-checkout`;
      addDebugLog(`Calling API: ${apiUrl}`);

      const requestData = {
        payment_data: stripePaymentData,
        success_url: `${window.location.origin}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: window.location.href,
        customer_email: stripePaymentData.customerEmail,
      };
      
      addDebugLog(`Request data: ${JSON.stringify(requestData, null, 2)}`);

      // Call the Edge Function with proper authentication
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestData),
      });

      addDebugLog(`Response status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorText = await response.text();
        addDebugLog(`API Error Response: ${errorText}`, 'error');
        throw new Error(`Failed to create checkout session: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      addDebugLog(`Checkout session created: ${JSON.stringify(data)}`, 'success');

      if (data?.url) {
        addDebugLog(`Redirecting to Stripe: ${data.url}`, 'success');
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received from Stripe');
      }
    } catch (error) {
      addDebugLog(`Stripe checkout error: ${error}`, 'error');
      throw error;
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setDebugLog([]); // Clear previous logs

    try {
      addDebugLog('=== PAYMENT PROCESS STARTED ===');
      addDebugLog(`Booking Reference: ${bookingData.bookingReference}`);
      addDebugLog(`Amount: €${bookingData.totalAmount}`);
      addDebugLog(`Customer: ${bookingData.customerEmail}`);

      // Use the correct experience UUID from database
      const MALLORCAN_EXPERIENCE_ID = '58b151d4-57e5-4d2c-8883-4d9968cc4c0f';

      const bookingRecord = {
        experience_id: MALLORCAN_EXPERIENCE_ID,
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
        status: 'pending', // Fixed: Use valid status value
        payment_status: 'pending' // This is valid according to constraint
      };

      addDebugLog('Saving booking to database...', 'info');
      addDebugLog(`Booking record: ${JSON.stringify(bookingRecord, null, 2)}`);

      // Check current user session first
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      addDebugLog(`Current session: ${session ? `User ${session.user.email}` : 'Anonymous'}`);
      
      if (sessionError) {
        addDebugLog(`Session error: ${JSON.stringify(sessionError)}`, 'error');
      }

      // Save booking to database
      const { data: savedBooking, error: bookingError } = await supabase
        .from('landing_page_bookings')
        .insert([bookingRecord])
        .select()
        .single();

      if (bookingError) {
        addDebugLog(`Booking save error: ${JSON.stringify(bookingError)}`, 'error');
        throw new Error('Failed to save booking: ' + bookingError.message);
      }

      addDebugLog(`Booking saved successfully: ${savedBooking.id}`, 'success');

      // Prepare Stripe payment data
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

      addDebugLog(`Stripe payment data prepared (amount: €${bookingData.totalAmount} = ${stripePaymentData.amount} cents)`);

      if (stripeConfigured) {
        addDebugLog('Creating REAL Stripe checkout session...');
        // Create real Stripe checkout session and redirect
        await createStripeCheckout(stripePaymentData);
        // Note: This will redirect the user to Stripe, so execution stops here
      } else {
        addDebugLog('Using SIMULATION mode...');
        // Simulation mode fallback
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate successful payment
        await supabase
          .from('landing_page_bookings')
          .update({
            status: 'confirmed',
            payment_status: 'paid',
            payment_confirmed_at: new Date().toISOString()
          })
          .eq('booking_reference', bookingData.bookingReference);

        addDebugLog('Simulation payment completed', 'success');

        toast({
          title: "Payment Successful! (Simulation)",
          description: `Your Mallorcan sailing experience is confirmed for ${bookingData.bookingDate}`,
          variant: "default"
        });

        onPaymentSuccess();
      }

    } catch (error) {
      addDebugLog(`=== PAYMENT FAILED ===`, 'error');
      addDebugLog(`Error: ${error instanceof Error ? error.message : String(error)}`, 'error');
      
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Debug Log Section (only show if there are logs) */}
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