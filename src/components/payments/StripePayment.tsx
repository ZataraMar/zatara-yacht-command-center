import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard, Shield, Check, AlertTriangle } from 'lucide-react';
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
  const { toast } = useToast();

  useEffect(() => {
    // Check Stripe configuration on component mount
    const checkStripeConfig = async () => {
      try {
        const isConfigured = await StripeConfig.isConfigured();
        const environment = await getStripeEnvironment();
        
        setStripeConfigured(isConfigured);
        setStripeEnvironment(environment);
        
        if (!isConfigured) {
          console.warn('Stripe not configured - using simulation mode');
        } else {
          console.log('✅ Stripe configured for live payments');
        }
      } catch (error) {
        console.error('Error checking Stripe configuration:', error);
        setStripeConfigured(false);
      }
    };

    checkStripeConfig();
  }, []);

  const createStripeCheckout = async (stripePaymentData: StripePaymentData) => {
    try {
      console.log('🚀 Starting Stripe checkout creation...');
      
      // Get the current session for authentication
      const { data: { session } } = await supabase.auth.getSession();
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      // Add auth headers if we have a session
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
      }

      console.log('📡 Calling Stripe checkout function...');

      // Call the Edge Function with proper authentication
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-stripe-checkout`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          payment_data: stripePaymentData,
          success_url: `${window.location.origin}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: window.location.href,
          customer_email: stripePaymentData.customerEmail,
        }),
      });

      console.log('📦 Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Checkout API error:', errorText);
        throw new Error(`Failed to create checkout session: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ Checkout session created:', data);

      if (data?.url) {
        console.log('🔄 Redirecting to Stripe checkout:', data.url);
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received from Stripe');
      }
    } catch (error) {
      console.error('💥 Error creating Stripe checkout session:', error);
      throw error;
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      console.log('🎯 Starting payment process...');

      // First, save the booking with payment_pending status
      const bookingRecord = {
        experience_id: 'mallorcan-sailing',
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
        status: 'payment_pending',
        payment_status: 'pending'
      };

      console.log('💾 Saving booking to database...');

      // Save booking to database first
      const { data: savedBooking, error: bookingError } = await supabase
        .from('landing_page_bookings')
        .insert([bookingRecord])
        .select()
        .single();

      if (bookingError) {
        console.error('❌ Booking save error:', bookingError);
        throw new Error('Failed to save booking: ' + bookingError.message);
      }

      console.log('✅ Booking saved:', savedBooking);

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

      if (stripeConfigured) {
        // Create real Stripe checkout session and redirect
        await createStripeCheckout(stripePaymentData);
        // Note: This will redirect the user to Stripe, so execution stops here
      } else {
        // Simulation mode fallback
        console.log('🧪 Simulation Mode - Stripe Payment Data:', stripePaymentData);
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

        toast({
          title: "Payment Successful! (Simulation)",
          description: `Your Mallorcan sailing experience is confirmed for ${bookingData.bookingDate}`,
          variant: "default"
        });

        onPaymentSuccess();
      }

    } catch (error) {
      console.error('💥 Payment error:', error);
      
      // Update booking status to failed
      await supabase
        .from('landing_page_bookings')
        .update({
          status: 'payment_failed',
          payment_status: 'failed'
        })
        .eq('booking_reference', bookingData.bookingReference);

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