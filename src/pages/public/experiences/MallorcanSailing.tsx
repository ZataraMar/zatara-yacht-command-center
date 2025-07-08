import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/public/Navigation';
import { Footer } from '@/components/public/Footer';
import { Button } from '@/components/ui/button';

const MallorcanSailing = () => {
  const [currentPeople, setCurrentPeople] = useState(2);
  const [hasUpgrade, setHasUpgrade] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const timeSlots = {
    'morning': { min: 499, label: 'Morning 8:30-12:00' },
    'afternoon': { min: 699, label: 'Afternoon 1:30-17:00' },
    'sunset': { min: 599, label: 'Sunset 17:30-21:00' }
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
    if (!selectedTime) return { total: 0, note: 'Select date and time' };

    const basePrice = currentPeople * 99;
    const minimumPrice = timeSlots[selectedTime as keyof typeof timeSlots].min;
    const upgradePrice = hasUpgrade ? currentPeople * 20 : 0;
    
    const totalBase = Math.max(basePrice, minimumPrice);
    const totalPrice = totalBase + upgradePrice;

    let priceNote = '';
    if (basePrice >= minimumPrice) {
      priceNote = `€99 per person (${currentPeople} people)`;
    } else {
      priceNote = `€${minimumPrice} minimum for ${timeSlots[selectedTime as keyof typeof timeSlots].label}`;
    }
    
    if (hasUpgrade) {
      priceNote += ` + €${upgradePrice} upgrade`;
    }

    return { total: totalPrice, note: priceNote };
  };

  const { total: totalPrice, note: priceNote } = calculatePrice();

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      date: selectedDate,
      time: selectedTime,
      people: currentPeople,
      upgrade: hasUpgrade,
      experience: 'mallorcan-sailing'
    };

    // Here we would integrate with Stripe and Supabase
    console.log('Booking data:', formData);
    
    // Simulate booking process
    alert('Redirecting to secure payment...\n\nIn the real implementation, this would:\n1. Check availability in real-time\n2. Create booking in Supabase\n3. Process payment with Stripe\n4. Send confirmation email\n5. Update Google Calendar');
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
                Authentic Mallorcan Sailing Experience
              </h1>
              <p className="text-xl lg:text-2xl mb-8 opacity-95">
                Sail on a traditional llaut with local tapas & wine in turquoise waters
              </p>
              
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">⛵</span>
                  <span>Classic Llaut</span>
                </div>
                <div className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">🥘</span>
                  <span>Local Tapas</span>
                </div>
                <div className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">🏊</span>
                  <span>Swimming Stop</span>
                </div>
                <div className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">👨‍✈️</span>
                  <span>Local Skipper</span>
                </div>
              </div>
            </div>

            {/* Booking Widget */}
            <div className="bg-white p-8 rounded-2xl shadow-2xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-zatara-blue mb-2">Book Your Experience</h3>
                <p className="text-gray-600">From €99 per person</p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={today}
                      required
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-zatara-blue outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Time</label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      required
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-zatara-blue outline-none"
                    >
                      <option value="">Select time</option>
                      <option value="morning">Morning 8:30-12:00</option>
                      <option value="afternoon">Afternoon 1:30-17:00</option>
                      <option value="sunset">Sunset 17:30-21:00</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">People</label>
                    <div className="flex items-center justify-center gap-3">
                      <Button
                        type="button"
                        onClick={() => changePeople(-1)}
                        className="w-10 h-10 rounded-full bg-zatara-blue hover:bg-zatara-blue-dark text-white p-0"
                      >
                        -
                      </Button>
                      <span className="text-xl font-semibold min-w-8 text-center">{currentPeople}</span>
                      <Button
                        type="button"
                        onClick={() => changePeople(1)}
                        className="w-10 h-10 rounded-full bg-zatara-blue hover:bg-zatara-blue-dark text-white p-0"
                      >
                        +
                      </Button>
                    </div>
                  </div>
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
                  <h4 className="font-semibold text-zatara-blue mb-2">Premium Catering Upgrade</h4>
                  <p className="text-sm text-gray-600">Enhanced tapas selection with premium local specialties (+€20 per person)</p>
                </div>

                <Button
                  type="submit"
                  disabled={!selectedDate || !selectedTime}
                  className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-zatara-blue to-blue-600 hover:from-zatara-blue-dark hover:to-blue-700 text-white disabled:bg-gray-400"
                >
                  {totalPrice > 0 ? `Book Now - €${totalPrice}` : 'Select Date & Time'}
                </Button>

                <div className="flex justify-around text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <span>🛡️</span>
                    <span>Fully Insured</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>↩️</span>
                    <span>Free Cancellation</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>💳</span>
                    <span>Secure Payment</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What's Included in Your Experience</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need for an authentic Mallorcan sailing adventure</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '👨‍✈️', title: 'Professional Local Skipper', desc: 'Experienced captain who knows the best spots and can teach you sailing basics' },
              { icon: '🥘', title: 'Authentic Local Tapas', desc: 'Traditional Mallorcan tapas prepared with local ingredients and regional wine' },
              { icon: '🍹', title: 'Drinks & Fresh Fruit', desc: 'Selection of beverages, local wine, and seasonal fresh fruit from Mallorca' },
              { icon: '🏊', title: 'Swimming in Turquoise Waters', desc: 'Stop at a beautiful secluded cala with crystal clear Mediterranean waters' },
              { icon: '⛵', title: 'Sailing Instruction', desc: 'Learn to sail a traditional llaut or simply relax while we handle everything' },
              { icon: '📷', title: 'Unforgettable Memories', desc: 'Create lasting memories sailing across the beautiful Bay of Palma' }
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Guests Say</h2>
            <p className="text-xl text-gray-600">Join hundreds of happy guests who've experienced authentic Mallorca</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { stars: '★★★★★', text: 'Amazing experience! The traditional boat, local food, and swimming spot were perfect. Our skipper was fantastic and taught us so much about Mallorca.', author: '- Sarah K., UK' },
              { stars: '★★★★★', text: 'Exactly what we wanted - authentic, relaxed, and beautiful. The tapas were incredible and the cala was like paradise. Highly recommend!', author: '- Marcus L., Germany' },
              { stars: '★★★★★', text: 'Best way to see Mallorca from the water. The sunset trip was magical and our kids loved learning to sail the traditional boat.', author: '- Emma & Tom, Netherlands' }
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
    </div>
  );
};

export default MallorcanSailing;