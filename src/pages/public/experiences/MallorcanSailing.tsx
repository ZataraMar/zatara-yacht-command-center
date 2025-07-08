import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/public/Navigation';
import { Footer } from '@/components/public/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SuccessModal } from '@/components/charter/SuccessModal';
import { AirbnbStyleCalendar } from '@/components/calendar/AirbnbStyleCalendar';
import { TimeSlotSelector } from '@/components/calendar/TimeSlotSelector';
import StripePayment from '@/components/payments/StripePayment';
import { useTranslation } from '@/contexts/TranslationContext';
import GoogleMap from '@/components/maps/GoogleMap';
import { GoogleReviews } from '@/components/reviews/GoogleReviews';
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
  const [showBookingReview, setShowBookingReview] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [currentPrice, setCurrentPrice] = useState(0);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const {
    toast
  } = useToast();
  const {
    t
  } = useTranslation();

  // Google Maps API key
  const GOOGLE_MAPS_API_KEY = 'AIzaSyChMkFLGf2_7hD5sScSpzChajwq1nH1IoU';

  // Naviera Balear marina coordinates
  const mapCenter = {
    lat: 39.567,
    lng: 2.633
  };
  const pickupLocation = {
    lat: 39.567,
    lng: 2.633
  };
  const mapMarkers = [{
    position: pickupLocation,
    title: 'Marina Naviera Balear - Meeting Point',
    description: 'Professional marina in Palma de Mallorca. Detailed meeting instructions will be sent after booking.'
  }];
  const sailingRoute = [{
    lat: 39.5696,
    lng: 2.6502
  },
  // Port de Palma
  {
    lat: 39.5650,
    lng: 2.6300
  },
  // Cala Major
  {
    lat: 39.5580,
    lng: 2.6100
  },
  // Swimming cove
  {
    lat: 39.5696,
    lng: 2.6502
  } // Return to port
  ];
  const timeSlots = {
    'morning': {
      min: 499,
      label: 'Morning 8:30-12:00',
      value: '08:30'
    },
    'afternoon': {
      min: 699,
      label: 'Afternoon 1:30-17:00',
      value: '13:30'
    },
    'sunset': {
      min: 599,
      label: 'Sunset 17:30-21:00',
      value: '17:30'
    }
  };

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  const getNext4Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 4; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date,
        dayName: date.toLocaleDateString('en-US', {
          weekday: 'short'
        }),
        dayMonth: date.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short'
        })
      });
    }
    return days;
  };
  const changePeople = (delta: number) => {
    setCurrentPeople(Math.max(1, Math.min(12, currentPeople + delta)));
  };
  const toggleUpgrade = () => {
    setHasUpgrade(!hasUpgrade);
  };
  const calculatePrice = () => {
    if (!selectedTime || currentPrice === 0) return {
      total: currentPrice || 0,
      note: 'Select date and time'
    };
    const upgradePrice = hasUpgrade ? currentPeople * 20 : 0;
    const totalPrice = currentPrice + upgradePrice;
    let priceNote = `${currentPeople} ${currentPeople === 1 ? 'person' : 'people'}`;
    if (hasUpgrade) {
      priceNote += ` + €${upgradePrice} upgrade`;
    }
    return {
      total: totalPrice,
      note: priceNote,
      base: currentPrice,
      upgrade: upgradePrice
    };
  };
  const {
    total: totalPrice,
    note: priceNote,
    base: baseAmount,
    upgrade: upgradeAmount
  } = calculatePrice();
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedDateString(date.toISOString().split('T')[0]);
    setShowCalendarModal(false);
  };
  const handleTimeSelect = (timeSlot: string) => {
    setSelectedTime(timeSlot);
  };
  const handlePriceUpdate = (price: number) => {
    setCurrentPrice(price);
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
    setShowBookingReview(false);
    setShowSuccessModal(true);
  };
  const handlePaymentCancel = () => {
    setShowPayment(false);
    setShowBookingReview(true);
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
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
            {t('hero.title')}
          </h1>
          <p className="text-base text-muted-foreground mb-4">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-wrap gap-2 text-xs mb-4">
            <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full">
              <span>Traditional Llaut Boat</span>
            </div>
            <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full">
              <span>Authentic Tapas</span>
            </div>
            <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full">
              <span>Swimming & Snorkeling</span>
            </div>
            <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full">
              <span>Local Skipper</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex text-yellow-400">
              {'★'.repeat(5)}
            </div>
            <a href="https://maps.app.goo.gl/GLPe8ViYEppZbe299" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors underline">
              See all Google reviews
            </a>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">Palma, Mallorca</span>
          </div>
        </div>


        {/* Date Selection Section - Top Priority */}
        {!selectedDate && !showPayment && <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Choose your date</h2>
            
            {/* Next 4 Available Dates */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {getNext4Days().map((dateInfo, index) => <button key={index} onClick={() => {
            setSelectedDate(dateInfo.date);
            setSelectedDateString(dateInfo.date.toISOString().split('T')[0]);
          }} className="p-3 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left">
                  <div className="text-xs text-muted-foreground">{dateInfo.dayName}</div>
                  <div className="font-medium text-foreground">{dateInfo.dayMonth}</div>
                  <div className="text-xs text-muted-foreground mt-1">From €499</div>
                </button>)}
            </div>

            {/* Show All Dates Button */}
            <Button variant="outline" size="sm" onClick={() => setShowCalendarModal(true)} className="w-full md:w-auto">
              Show all dates
            </Button>
          </div>}

        {/* Booking Confirmation Layout - After Date Selected */}
        {selectedDate && !showPayment && <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Side - Booking Steps */}
            <div className="lg:col-span-2 space-y-4">
              
              {/* Back to Dates */}
              <Button variant="ghost" onClick={() => {
            setSelectedDate(undefined);
            setSelectedDateString('');
            setSelectedTime('');
            setShowBookingReview(false);
          }} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to dates
              </Button>

              {/* Step 1: Choose Time */}
              <div className="border border-border rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                    1
                  </div>
                  <h3 className="text-base font-semibold">Choose your time</h3>
                  <div className="text-xs text-muted-foreground">
                    {selectedDate?.toLocaleDateString('en-US', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long'
                })}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {Object.entries(timeSlots).map(([key, slot]) => <button key={key} onClick={() => {
                setSelectedTime(key);
                handlePriceUpdate(slot.min);
              }} className={`p-2 border rounded text-left transition-all ${selectedTime === key ? 'border-primary bg-primary/5' : 'border-border hover:border-primary'}`}>
                      <div className="font-medium text-sm">{slot.label}</div>
                      <div className="text-xs text-muted-foreground">€{slot.min}</div>
                    </button>)}
                </div>
              </div>

              {/* Step 2: Choose Guests */}
              {selectedTime && <div className="border border-border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                        2
                      </div>
                      <div>
                        <h3 className="text-base font-semibold">Guests</h3>
                        <div className="text-xs text-muted-foreground">Ages 2+, max 12</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button type="button" variant="outline" size="sm" onClick={() => changePeople(-1)} className="w-6 h-6 rounded-full p-0" disabled={currentPeople <= 1}>
                        -
                      </Button>
                      <span className="font-semibold text-sm min-w-4 text-center">{currentPeople}</span>
                      <Button type="button" variant="outline" size="sm" onClick={() => changePeople(1)} className="w-6 h-6 rounded-full p-0" disabled={currentPeople >= 12}>
                        +
                      </Button>
                    </div>
                  </div>
                </div>}

              {/* Continue Button */}
              {selectedTime && <Button onClick={() => {
            const reference = `MS-${Date.now()}`;
            setBookingReference(reference);
            setShowPayment(true);
          }} className="w-full h-10 text-sm font-medium">
                  Continue to payment
                </Button>}
            </div>

            {/* Right Side - Booking Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 border border-border rounded-lg p-4 bg-card">
                <div className="flex gap-3 mb-4">
                  <img src="https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=100&h=80&fit=crop" alt="Mallorcan sailing" className="w-16 h-12 object-cover rounded-lg" />
                  <div>
                    <h4 className="font-medium text-foreground text-sm">Mallorcan Sailing Experience</h4>
                    <div className="flex text-yellow-400 text-xs">
                      {'★'.repeat(5)}
                    </div>
                    <a href="https://maps.app.goo.gl/GLPe8ViYEppZbe299" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors underline">
                      View reviews
                    </a>
                  </div>
                </div>

                <div className="border-b border-border pb-3 mb-3">
                  <div className="text-xs font-medium text-foreground mb-1">Free cancellation</div>
                  <div className="text-xs text-muted-foreground">
                    Cancel before 24 hours for a full refund
                  </div>
                </div>


                {totalPrice > 0 && <div className="border-t border-border pt-3 mt-3">
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>€{currentPrice} x {currentPeople} guests</span>
                        <span>€{currentPrice * currentPeople}</span>
                      </div>
                      {hasUpgrade && <div className="flex justify-between">
                          <span>Premium upgrade</span>
                          <span>€{currentPeople * 20}</span>
                        </div>}
                      <div className="border-t border-border pt-1 flex justify-between font-medium text-sm">
                        <span>Total</span>
                        <span>€{totalPrice}</span>
                      </div>
                    </div>
                  </div>}
              </div>
            </div>
          </div>}

        {/* Payment Step */}
        {showPayment && <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <Button type="button" variant="ghost" onClick={handlePaymentCancel} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Booking Details
              </Button>
              <h3 className="text-xl font-semibold text-foreground mb-2">Secure Payment</h3>
              <p className="text-muted-foreground text-sm">Complete your booking with secure payment</p>
            </div>

            {/* Guest Information Form */}
            <div className="border border-border rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <h3 className="text-xl font-semibold">Guest information</h3>
              </div>
              
              <div className="space-y-4">
                <Input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Full name *" required className="w-full" />
                <Input type="email" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} placeholder="Email address *" required className="w-full" />
                <Input type="tel" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} placeholder="Phone number *" required className="w-full" />
                <Textarea value={specialRequests} onChange={e => setSpecialRequests(e.target.value)} placeholder="Special requests (optional)" className="w-full" rows={3} />
              </div>
            </div>

            {/* Booking Summary for Payment */}
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
                <span className="font-medium">{customerName || 'Please enter your name above'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Booking Ref:</span>
                <span className="font-medium font-mono">{bookingReference}</span>
              </div>
            </div>

            <StripePayment bookingData={{
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
        }} onPaymentSuccess={handlePaymentSuccess} onPaymentCancel={handlePaymentCancel} />
          </div>}

        {/* Original Content - Only Show When No Date Selected and Not in Payment */}
        {!selectedDate && !showPayment && <>
            {/* Image Gallery - Compact */}
            <div className="relative mb-8">
              <div className="grid grid-cols-2 gap-2 h-[400px] w-1/2">
                {/* Left images stack */}
                <div className="space-y-2">
                  <img src="https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&h=400&fit=crop" alt="Mallorcan coastline" className="w-full h-[195px] object-cover rounded-l-xl" />
                  <img src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop" alt="Swimming in crystal waters" className="w-full h-[195px] object-cover rounded-bl-xl" />
                </div>
                
                {/* Right images stack */}
                <div className="space-y-2">
                  <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop" alt="Traditional tapas on boat" className="w-full h-[195px] object-cover rounded-tr-xl" />
                  <div className="relative">
                    <img src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=400&fit=crop" alt="Sunset sailing in Mallorca" className="w-full h-[195px] object-cover rounded-br-xl" />
                    <div className="absolute inset-0 bg-black/20 rounded-br-xl flex items-center justify-center">
                      <span className="text-white font-medium text-sm">+5 photos</span>
                    </div>
                  </div>
                </div>
              </div>
              
              
            </div>

            {/* Quick Info Icons - Airbnb Style */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <button className="flex flex-col items-center p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all">
                <svg className="w-6 h-6 mb-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">3.5 hours</span>
                <span className="text-xs text-muted-foreground">Duration</span>
              </button>
              
              <button className="flex flex-col items-center p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all">
                <svg className="w-6 h-6 mb-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-medium">Port Palma</span>
                <span className="text-xs text-muted-foreground">Meeting point</span>
              </button>
              
              <button className="flex flex-col items-center p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all">
                <svg className="w-6 h-6 mb-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
                <span className="text-sm font-medium">12 max</span>
                <span className="text-xs text-muted-foreground">Group size</span>
              </button>
              
              <button className="flex flex-col items-center p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all">
                <svg className="w-6 h-6 mb-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">Free cancel</span>
                <span className="text-xs text-muted-foreground">24h notice</span>
              </button>
            </div>

            {/* What You'll Do */}
            <div className="border-b border-border pb-8 mb-8">
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

            {/* Where you'll be */}
            <div className="border-b border-border pb-8 mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Where you'll be</h2>
              
              {/* Pickup Location */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-foreground mb-3">Pickup Location</h3>
                <div className="mb-4">
                  <GoogleMap apiKey={GOOGLE_MAPS_API_KEY} center={mapCenter} zoom={15} markers={mapMarkers} className="w-full h-40 rounded-lg border border-border" />
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Port de Palma</strong> - Marina area near the Cathedral
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Easy access by car, taxi, or public transport. Detailed meeting point coordinates will be sent after booking.
                  </p>
                </div>
              </div>

              {/* Sailing Route */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">Sailing Route</h3>
                <div className="mb-4">
                  <GoogleMap apiKey={GOOGLE_MAPS_API_KEY} center={mapCenter} zoom={12} polyline={sailingRoute} markers={[{
                position: sailingRoute[0],
                title: 'Start: Port de Palma'
              }, {
                position: sailingRoute[1],
                title: 'Cala Major'
              }, {
                position: sailingRoute[2],
                title: 'Swimming Cove'
              }]} className="w-full h-64 rounded-lg border border-border" />
                </div>
                <h4 className="font-medium text-foreground mb-3">Itinerary</h4>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">1</div>
                    <div>
                      <h4 className="font-medium text-foreground">Departure from Port de Palma</h4>
                      <p className="text-sm text-muted-foreground">Meet your skipper and receive safety briefing</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">2</div>
                    <div>
                      <h4 className="font-medium text-foreground">Sail to Cala Major</h4>
                      <p className="text-sm text-muted-foreground">Traditional sailing techniques demonstration</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">3</div>
                    <div>
                      <h4 className="font-medium text-foreground">Swimming & Snorkeling Stop</h4>
                      <p className="text-sm text-muted-foreground">Crystal-clear waters of a secluded cove</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">4</div>
                    <div>
                      <h4 className="font-medium text-foreground">Tapas & Wine Tasting</h4>
                      <p className="text-sm text-muted-foreground">Authentic Mallorcan appetizers and local wines</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">5</div>
                    <div>
                      <h4 className="font-medium text-foreground">Return to Port</h4>
                      <p className="text-sm text-muted-foreground">Relaxing sail back with sunset views (evening trips)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="border-b border-border pb-8 mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">{t('included.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[{
              title: 'Professional Skipper',
              desc: 'Experienced local captain with intimate knowledge of Mallorca\'s coastline'
            }, {
              title: 'Authentic Tapas',
              desc: 'Selection of traditional Mallorcan appetizers and local specialties'
            }, {
              title: 'Drinks & Fresh Fruit',
              desc: 'Local wines, soft drinks, water, and seasonal Mediterranean fruit'
            }, {
              title: 'Swimming & Snorkeling',
              desc: 'Equipment provided for exploring secluded coves and crystal-clear waters'
            }, {
              title: 'Sailing Instruction',
              desc: 'Learn traditional sailing techniques on an authentic Llaut boat'
            }, {
              title: 'Unforgettable Memories',
              desc: 'Photo opportunities and stories of maritime heritage'
            }].map((item, index) => <div key={index} className="flex gap-3 p-4 rounded-lg border border-border">
                    <div>
                      <h4 className="font-medium text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>)}
              </div>
            </div>

            {/* Google Reviews */}
            <GoogleReviews placeId="109872317444958228757" maxReviews={6} className="mb-8" />
          </>}
      </div>

      {/* Calendar Modal */}
      <Dialog open={showCalendarModal} onOpenChange={setShowCalendarModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Select your date and time</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <AirbnbStyleCalendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />
            </div>
            <div>
              <TimeSlotSelector selectedTime={selectedTime} onTimeSelect={handleTimeSelect} onPriceUpdate={handlePriceUpdate} currentPeople={currentPeople} />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Customer Reviews Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What Our Guests Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Real reviews from real guests who experienced the magic of Mallorcan sailing
            </p>
          </div>
          
          <GoogleReviews placeId="109872317444958228757" maxReviews={6} className="max-w-4xl mx-auto" />
          
          <div className="text-center mt-8">
            <a href="https://maps.app.goo.gl/GLPe8ViYEppZbe299" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              View All Reviews on Google
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
      
      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
    </div>;
};
export default MallorcanSailing;