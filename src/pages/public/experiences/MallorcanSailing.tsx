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
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Booking Widget */}
      <section className="relative h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 flex items-center">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            {/* Hero Text */}
            <div className="text-white">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {t('hero.title')}
              </h1>
              <p className="text-xl lg:text-2xl mb-8 opacity-95">
                {t('hero.subtitle')}
              </p>
              
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">⛵</span>
                  <span>{t('hero.classic_llaut')}</span>
                </div>
                <div className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">🥘</span>
                  <span>{t('hero.local_tapas')}</span>
                </div>
                <div className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">🏊</span>
                  <span>{t('hero.swimming_stop')}</span>
                </div>
                <div className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">👨‍✈️</span>
                  <span>{t('hero.local_skipper')}</span>
                </div>
              </div>
            </div>

            {/* Booking Widget */}
            <div className="bg-white p-8 rounded-2xl shadow-2xl">
              {!showPayment ? (
                <>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-zatara-blue mb-2">{t('booking.title')}</h3>
                    <p className="text-gray-600">{t('booking.from_price')}</p>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    {/* Date & Time Selection */}
                    <div className="space-y-4">
                      {/* People Selector */}
                      <div className="border rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm">{t('booking.guests')}</div>
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

                      <AirbnbStyleCalendar
                        selectedDate={selectedDate}
                        onDateSelect={handleDateSelect}
                        className="mb-4"
                      />
                      
                      <TimeSlotSelector
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        onTimeSelect={handleTimeSelect}
                        onPriceUpdate={handlePriceUpdate}
                        currentPeople={currentPeople}
                        className="mb-4"
                      />
                    </div>

                    {/* Customer Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">{t('booking.your_name')}</Label>
                        <Input
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder={t('common.name_placeholder')}
                          required
                          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-zatara-blue outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">{t('booking.email')}</Label>
                        <Input
                          type="email"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          placeholder={t('common.email_placeholder')}
                          required
                          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-zatara-blue outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-700">{t('booking.phone')}</Label>
                      <Input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder={t('common.phone_placeholder')}
                        required
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-zatara-blue outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-700">{t('booking.special_requests')}</Label>
                      <Textarea
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder={t('booking.special_requests_placeholder')}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-zatara-blue outline-none"
                        rows={3}
                      />
                    </div>

                    <div className="bg-gray-50 p-5 rounded-xl text-center">
                      <div className="text-3xl font-bold text-zatara-blue mb-2">
                        {totalPrice > 0 ? `€${totalPrice}` : '€--'}
                      </div>
                      <div className="text-sm text-gray-600">{priceNote}</div>
                    </div>

                    <div
                      onClick={toggleUpgrade}
                      className={`border-2 p-4 rounded-xl cursor-pointer transition-all ${
                        hasUpgrade ? 'border-zatara-blue bg-blue-50' : 'border-gray-200 hover:border-zatara-blue'
                      }`}
                    >
                      <h4 className="font-semibold text-zatara-blue mb-2">{t('booking.premium_upgrade')}</h4>
                      <p className="text-sm text-gray-600">{t('booking.premium_upgrade_desc')}</p>
                    </div>

                    <Button
                      type="submit"
                      disabled={!selectedDate || !selectedTime || !customerName || !customerEmail || !customerPhone || isSubmitting}
                      className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-zatara-blue to-blue-600 hover:from-zatara-blue-dark hover:to-blue-700 text-white disabled:bg-gray-400"
                    >
                      {totalPrice > 0 ? `${t('booking.continue_payment')} - €${totalPrice}` : t('booking.fill_details')}
                    </Button>

                    <div className="flex justify-around text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <span>🛡️</span>
                        <span>{t('booking.fully_insured')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>↩️</span>
                        <span>{t('booking.free_cancellation')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>💳</span>
                        <span>{t('booking.secure_payment')}</span>
                      </div>
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
                      className="mb-4 text-zatara-blue hover:text-zatara-blue-dark"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Booking Details
                    </Button>
                    <h3 className="text-2xl font-bold text-zatara-blue mb-2">Secure Payment</h3>
                    <p className="text-gray-600">Complete your booking with secure payment</p>
                  </div>

                  {/* Booking Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-6 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date & Time:</span>
                      <span className="font-medium">{selectedDate ? selectedDate.toLocaleDateString() : ''} at {timeSlots[selectedTime as keyof typeof timeSlots]?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Guests:</span>
                      <span className="font-medium">{currentPeople} people</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Customer:</span>
                      <span className="font-medium">{customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booking Ref:</span>
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
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('included.title')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('included.subtitle')}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '👨‍✈️', title: t('included.professional_skipper'), desc: t('included.professional_skipper_desc') },
              { icon: '🥘', title: t('included.authentic_tapas'), desc: t('included.authentic_tapas_desc') },
              { icon: '🍹', title: t('included.drinks_fruit'), desc: t('included.drinks_fruit_desc') },
              { icon: '🏊', title: t('included.swimming'), desc: t('included.swimming_desc') },
              { icon: '⛵', title: t('included.sailing_instruction'), desc: t('included.sailing_instruction_desc') },
              { icon: '📷', title: t('included.memories'), desc: t('included.memories_desc') }
            ].map((item, index) => (
              <div key={index} className="flex gap-4 p-6 bg-gray-50 rounded-xl">
                <div className="text-4xl">{item.icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('reviews.title')}</h2>
            <p className="text-xl text-gray-600">{t('reviews.subtitle')}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { stars: '★★★★★', text: t('reviews.sarah'), author: '- Sarah K., UK' },
              { stars: '★★★★★', text: t('reviews.marcus'), author: '- Marcus L., Germany' },
              { stars: '★★★★★', text: t('reviews.emma'), author: '- Emma & Tom, Netherlands' }
            ].map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-yellow-400 text-xl mb-4">{review.stars}</div>
                <p className="text-gray-600 italic mb-4">{review.text}</p>
                <p className="font-semibold text-gray-900">{review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      
      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />
    </div>
  );
};

export default MallorcanSailing;