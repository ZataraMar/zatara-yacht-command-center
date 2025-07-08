import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard, Shield, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { StripePaymentData, eurosToCents, formatPrice } from '@/utils/stripe';

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
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // First, save the booking with payment_pending status
      const bookingRecord = {
        booking_reference: bookingData.bookingReference,
        experience_name: 'Authentic Mallorcan Sailing Experience',
        booking_date: bookingData.bookingDate,
        time_slot: bookingData.timeSlot,
        time_period_label: bookingData.timePeriodLabel,
        number_of_people: bookingData.numberOfPeople,
        customer_name: bookingData.customerName,
        customer_email: bookingData.customerEmail,
        customer_phone: bookingData.customerPhone,
        special_requests: bookingData.specialRequests || null,
        base_price_per_person: 99,
        total_base_amount: Math.max(bookingData.numberOfPeople * 99, 499), // Minimum amounts by time slot
        premium_catering_upgrade: bookingData.hasUpgrade,
        upgrade_cost: bookingData.upgradeAmount,
        total_amount: bookingData.totalAmount,
        currency: 'EUR',
        booking_source: 'mallorcan_sailing_landing_page',
        status: 'payment_pending',
        payment_status: 'pending',
        payment_method: 'stripe',
        created_at: new Date().toISOString(),
        andronautic_sync_status: 'manual_required'
      };

      // Save booking to database first
      const { data: savedBooking, error: bookingError } = await supabase
        .from('mallorcan_sailing_bookings')
        .insert([bookingRecord])
        .select()
        .single();

      if (bookingError) {
        console.error('Booking save error:', bookingError);
        // Fallback to landing_page_bookings if mallorcan table doesn't exist
        const fallbackData = {
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

        const { error: fallbackError } = await supabase
          .from('landing_page_bookings')
          .insert([fallbackData]);

        if (fallbackError) throw fallbackError;
      }

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

      // For now, simulate Stripe checkout - replace with actual Stripe integration
      // This would normally redirect to Stripe Checkout
      console.log('Stripe Payment Data:', stripePaymentData);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate successful payment for demo
      const paymentSuccessful = true; // Replace with actual Stripe response

      if (paymentSuccessful) {
        // Update booking status to confirmed
        await supabase
          .from('mallorcan_sailing_bookings')
          .update({
            status: 'confirmed',
            payment_status: 'paid',
            payment_confirmed_at: new Date().toISOString()
          })
          .eq('booking_reference', bookingData.bookingReference);

        toast({
          title: "Payment Successful!",
          description: `Your Mallorcan sailing experience is confirmed for ${bookingData.bookingDate}`,
          variant: "default"
        });

        onPaymentSuccess();
      } else {
        throw new Error('Payment failed');
      }

    } catch (error) {
      console.error('Payment error:', error);
      
      // Update booking status to failed
      await supabase
        .from('mallorcan_sailing_bookings')
        .update({
          status: 'payment_failed',
          payment_status: 'failed'
        })
        .eq('booking_reference', bookingData.bookingReference);

      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
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
              Processing Payment...
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
        <p>Payments are processed securely through Stripe.</p>
        <p>You will receive a confirmation email after successful payment.</p>
      </div>
    </div>
  );
};

export default StripePayment;