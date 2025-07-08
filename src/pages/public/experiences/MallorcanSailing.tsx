import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/public/Navigation';
import { Footer } from '@/components/public/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SuccessModal } from '@/components/charter/SuccessModal';
import { AirbnbStyleCalendar } from '@/components/calendar/AirbnbStyleCalendar';
import { TimeSlotSelector } from '@/components/calendar/TimeSlotSelector';
import StripePayment from '@/components/payments/StripePayment';
import { useTranslation } from '@/contexts/TranslationContext';

const MallorcanSailing = () => {
  const [currentPeople, setCurrentPeople] = useState(2);
  const [hasUpgrade, setHasUpgrade] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedDateString, setSelectedDateString] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [currentPrice, setCurrentPrice] = useState(0);
  
  const { toast } = useToast();
  const { t } = useTranslation();

  const timeSlots = {
    'morning': { min: 499, label: 'Morning 8:30-12:00', value: '08:30' },
    'afternoon': { min: 699, label: 'Afternoon 1:30-17:00', value: '13:30' },
    'sunset': { min: 599, label: 'Sunset 17:30-21:00', value: '17:30' }
  };

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];

  const changePeople = (delta: number) => {
    setCurrentPeople(Math.max(1, Math.min(12, currentPeople + delta)));
  };

  const toggleUpgrade = () => {
    setHasUpgrade(!hasUpgrade);
  };

  const calculatePrice = () => {
    if (!selectedTime || currentPrice === 0) return { total: currentPrice || 0, note: 'Select date and time' };

    const upgradePrice = hasUpgrade ? currentPeople * 20 : 0;
    const totalPrice = currentPrice + upgradePrice;

    let priceNote = `${currentPeople} ${currentPeople === 1 ? 'person' : 'people'}`;
    
    if (hasUpgrade) {
      priceNote += ` + €${upgradePrice} upgrade`;
    }

    return { total: totalPrice, note: priceNote, base: currentPrice, upgrade: upgradePrice };
  };

  const { total: totalPrice, note: priceNote, base: baseAmount, upgrade: upgradeAmount } = calculatePrice();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedDateString(date.toISOString().split('T')[0]);
  };

  const handleTimeSelect = (timeSlot: string) => {
    setSelectedTime(timeSlot);
  };

  const handlePriceUpdate = (price: number) => {
    setCurrentPrice(price);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !customerName || !customerEmail || !customerPhone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Generate booking reference and proceed to payment
    const reference = `MS-${Date.now()}`;
    setBookingReference(reference);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    console.log("handlePaymentSuccess called - this should only happen after successful Stripe payment");
    // Reset form
    setSelectedDate(undefined);
    setSelectedDateString('');
    setSelectedTime('');
    setCurrentPeople(2);
    setHasUpgrade(false);
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setSpecialRequests('');
    setShowPayment(false);
    setShowSuccessModal(true);
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
    setBookingReference('');
  };

  const resetForm = () => {
    setSelectedDate(undefined);
    setSelectedDateString('');
    setSelectedTime('');
    setCurrentPeople(2);
    setHasUpgrade(false);
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setSpecialRequests('');
    setShowPayment(false);
    setBookingReference('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Image Gallery Header */}
      <section className="relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px] md:h-[480px] p-6">
          <div className="md:col-span-2">
            <img 
              src="/api/placeholder/800/600" 
              alt="Mallorcan sailing experience" 
              className="w-full h-full object-cover rounded-l-xl"
            />
          </div>
          <div className="grid grid-rows-2 gap-2">
            <img 
              src="/api/placeholder/400/300" 
              alt="Traditional Llaut boat" 
              className="w-full h-full object-cover"
            />
            <img 
              src="/api/placeholder/400/300" 
              alt="Sailing in Mallorca" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-rows-2 gap-2">
            <img 
              src="/api/placeholder/400/300" 
              alt="Local tapas on board" 
              className="w-full h-full object-cover rounded-tr-xl"
            />
            <img 
              src="/api/placeholder/400/300" 
              alt="Swimming stop" 
              className="w-full h-full object-cover rounded-br-xl"
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Header */}
            <div className="border-b border-border pb-6">
              <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
                {t('hero.title')}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {t('hero.subtitle')}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-full">
                  <span className="text-lg">⛵</span>
                  <span>{t('hero.classic_llaut')}</span>
                </div>
                <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-full">
                  <span className="text-lg">🥘</span>
                  <span>{t('hero.local_tapas')}</span>
                </div>
                <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-full">
                  <span className="text-lg">🏊</span>
                  <span>{t('hero.swimming_stop')}</span>
                </div>
                <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-full">
                  <span className="text-lg">👨‍✈️</span>
                  <span>{t('hero.local_skipper')}</span>
                </div>
              </div>
            </div>

            {/* What You'll Do */}
            <div className="border-b border-border pb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">What you'll do</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  Experience the authentic charm of Mallorca aboard a traditional Llaut, a local fishing boat that has sailed these waters for generations. Your local skipper will guide you through the island's most beautiful coastline while sharing stories of maritime tradition and local culture.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  We'll anchor at secluded coves where you can swim in crystal-clear waters, snorkel among Mediterranean marine life, and enjoy a selection of authentic Mallorcan tapas paired with local wines and fresh fruit.
                </p>
              </div>
            </div>

            {/* What's Included */}
            <div className="border-b border-border pb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">{t('included.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: '👨‍✈️', title: t('included.professional_skipper'), desc: t('included.professional_skipper_desc') },
                  { icon: '🥘', title: t('included.authentic_tapas'), desc: t('included.authentic_tapas_desc') },
                  { icon: '🍹', title: t('included.drinks_fruit'), desc: t('included.drinks_fruit_desc') },
                  { icon: '🏊', title: t('included.swimming'), desc: t('included.swimming_desc') },
                  { icon: '⛵', title: t('included.sailing_instruction'), desc: t('included.sailing_instruction_desc') },
                  { icon: '📷', title: t('included.memories'), desc: t('included.memories_desc') }
                ].map((item, index) => (
                  <div key={index} className="flex gap-3 p-4 rounded-lg border border-border">
                    <div className="text-2xl flex-shrink-0">{item.icon}</div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-semibold text-foreground">Reviews</h2>
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                  <span className="text-sm text-muted-foreground">5.0 · 127 reviews</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { stars: 5, text: t('reviews.sarah'), author: 'Sarah K.', location: 'United Kingdom' },
                  { stars: 5, text: t('reviews.marcus'), author: 'Marcus L.', location: 'Germany' },
                  { stars: 5, text: t('reviews.emma'), author: 'Emma & Tom', location: 'Netherlands' },
                  { stars: 5, text: "Incredible day on the water! Captain was so knowledgeable about the area.", author: 'James M.', location: 'Australia' }
                ].map((review, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{review.author}</div>
                        <div className="text-xs text-muted-foreground">{review.location}</div>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 text-sm mb-2">
                      {'★'.repeat(review.stars)}
                    </div>
                    <p className="text-muted-foreground text-sm">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="border border-border rounded-xl p-6 shadow-lg bg-card">
                {!showPayment ? (
                  <>
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-2xl font-semibold text-foreground">
                          {totalPrice > 0 ? `€${totalPrice}` : 'From €499'}
                        </span>
                        <span className="text-muted-foreground text-sm">per person</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex text-yellow-400">
                          {'★'.repeat(5)}
                        </div>
                        <span className="text-muted-foreground">5.0 (127 reviews)</span>
                      </div>
                    </div>

                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                      
                      {/* Date Selection */}
                      <div className="border border-border rounded-lg p-4">
                        <Label className="text-sm font-medium text-foreground mb-2 block">Select Date</Label>
                        <AirbnbStyleCalendar
                          selectedDate={selectedDate}
                          onDateSelect={handleDateSelect}
                          className="border-0 shadow-none"
                        />
                      </div>

                      {/* Time Selection */}
                      <TimeSlotSelector
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        onTimeSelect={handleTimeSelect}
                        onPriceUpdate={handlePriceUpdate}
                        currentPeople={currentPeople}
                        className="border border-border rounded-lg"
                      />

                      {/* Guests */}
                      <div className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-sm font-medium text-foreground">{t('booking.guests')}</Label>
                            <div className="text-xs text-muted-foreground">{t('booking.add_children')}</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => changePeople(-1)}
                              className="w-8 h-8 rounded-full p-0"
                              disabled={currentPeople <= 1}
                            >
                              -
                            </Button>
                            <span className="font-medium min-w-8 text-center">{currentPeople}</span>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => changePeople(1)}
                              className="w-8 h-8 rounded-full p-0"
                              disabled={currentPeople >= 12}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="space-y-3">
                        <div>
                          <Input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder={t('common.name_placeholder')}
                            required
                            className="w-full"
                          />
                        </div>
                        <div>
                          <Input
                            type="email"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            placeholder={t('common.email_placeholder')}
                            required
                            className="w-full"
                          />
                        </div>
                        <div>
                          <Input
                            type="tel"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            placeholder={t('common.phone_placeholder')}
                            required
                            className="w-full"
                          />
                        </div>
                        <div>
                          <Textarea
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                            placeholder={t('booking.special_requests_placeholder')}
                            className="w-full"
                            rows={3}
                          />
                        </div>
                      </div>

                      {/* Premium Upgrade */}
                      <div
                        onClick={toggleUpgrade}
                        className={`border-2 p-4 rounded-lg cursor-pointer transition-all ${
                          hasUpgrade ? 'border-primary bg-primary/5' : 'border-border hover:border-primary'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-foreground mb-1">{t('booking.premium_upgrade')}</h4>
                            <p className="text-xs text-muted-foreground">{t('booking.premium_upgrade_desc')}</p>
                          </div>
                          <div className="text-sm font-medium text-foreground">+€{currentPeople * 20}</div>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={!selectedDate || !selectedTime || !customerName || !customerEmail || !customerPhone || isSubmitting}
                        className="w-full h-12 text-base font-medium"
                      >
                        {totalPrice > 0 ? `${t('booking.continue_payment')} - €${totalPrice}` : t('booking.fill_details')}
                      </Button>

                      <div className="text-center text-xs text-muted-foreground">
                        {t('booking.secure_payment')} • {t('booking.free_cancellation')}
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    {/* Payment Step */}
                    <div className="text-center mb-6">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handlePaymentCancel}
                        className="mb-4"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Booking Details
                      </Button>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Secure Payment</h3>
                      <p className="text-muted-foreground text-sm">Complete your booking with secure payment</p>
                    </div>

                    {/* Booking Summary */}
                    <div className="bg-muted p-4 rounded-lg mb-6 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date & Time:</span>
                        <span className="font-medium">{selectedDate ? selectedDate.toLocaleDateString() : ''} at {timeSlots[selectedTime as keyof typeof timeSlots]?.label}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Guests:</span>
                        <span className="font-medium">{currentPeople} people</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Customer:</span>
                        <span className="font-medium">{customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Booking Ref:</span>
                        <span className="font-medium font-mono">{bookingReference}</span>
                      </div>
                    </div>

                    <StripePayment
                      bookingData={{
                        bookingReference,
                        customerName,
                        customerEmail,
                        customerPhone,
                        bookingDate: selectedDateString,
                        timeSlot: timeSlots[selectedTime as keyof typeof timeSlots]?.value || '',
                        timePeriodLabel: timeSlots[selectedTime as keyof typeof timeSlots]?.label || '',
                        numberOfPeople: currentPeople,
                        totalAmount: totalPrice,
                        hasUpgrade,
                        upgradeAmount,
                        specialRequests
                      }}
                      onPaymentSuccess={handlePaymentSuccess}
                      onPaymentCancel={handlePaymentCancel}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />
    </div>
  );
};

export default MallorcanSailing;