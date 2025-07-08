import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { SuccessModal } from './SuccessModal';

interface ExperienceData {
  basePrice: number;
  duration: number;
  boat: string;
}

const experienceData: Record<string, ExperienceData> = {
  'zatara-classic': { basePrice: 150, duration: 8, boat: 'Zatara' },
  'puravida-adventure': { basePrice: 120, duration: 6, boat: 'PuraVida' },
  'sunset-cruise': { basePrice: 95, duration: 3, boat: 'Zatara' },
  'full-day-mallorca': { basePrice: 180, duration: 10, boat: 'Zatara' }
};

export const BookingWidget = () => {
  const [formData, setFormData] = useState({
    experience: '',
    bookingDate: '',
    guestCount: '',
    startTime: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    specialRequests: ''
  });
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [showPrice, setShowPrice] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('booking-date') as HTMLInputElement;
    if (dateInput) {
      dateInput.min = today;
    }
  }, []);

  useEffect(() => {
    if (formData.experience && formData.guestCount) {
      const experience = experienceData[formData.experience];
      const totalPrice = experience.basePrice * parseInt(formData.guestCount);
      setEstimatedPrice(totalPrice);
      setShowPrice(true);
    } else {
      setShowPrice(false);
    }
  }, [formData.experience, formData.guestCount]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const experience = experienceData[formData.experience];
      const submissionData = {
        experience_id: formData.experience, // Map to experience_id
        booking_reference: `LP-${Date.now()}`, // Generate booking reference
        booking_date: formData.bookingDate,
        time_slot: formData.startTime,
        time_period: formData.startTime,
        number_of_people: parseInt(formData.guestCount),
        customer_name: formData.customerName,
        customer_email: formData.customerEmail,
        customer_phone: formData.customerPhone,
        special_requests: formData.specialRequests,
        price_per_person: experience.basePrice,
        total_amount: estimatedPrice,
        currency: 'EUR',
        source: 'landing_page',
        status: 'inquiry',
        payment_status: 'pending'
      };

      const { error } = await supabase
        .from('landing_page_bookings')
        .insert([submissionData]);

      if (error) throw error;

      setShowSuccessModal(true);
      setFormData({
        experience: '',
        bookingDate: '',
        guestCount: '',
        startTime: '',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        specialRequests: ''
      });
      setShowPrice(false);

    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your booking request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="booking" className="py-16 bg-zatara-cream">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-8 text-zatara-navy">Book Your Perfect Charter</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="experience">Experience</Label>
                  <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your experience..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zatara-classic">Zatara Classic Day Charter (8h)</SelectItem>
                      <SelectItem value="puravida-adventure">PuraVida Adventure (6h)</SelectItem>
                      <SelectItem value="sunset-cruise">Sunset Cruise (3h)</SelectItem>
                      <SelectItem value="full-day-mallorca">Full Day Mallorca Explorer (10h)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="booking-date">Preferred Date</Label>
                  <Input
                    id="booking-date"
                    type="date"
                    value={formData.bookingDate}
                    onChange={(e) => handleInputChange('bookingDate', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="guest-count">Number of Guests</Label>
                  <Select value={formData.guestCount} onValueChange={(value) => handleInputChange('guestCount', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select guests..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 guests</SelectItem>
                      <SelectItem value="4">4 guests</SelectItem>
                      <SelectItem value="6">6 guests</SelectItem>
                      <SelectItem value="8">8 guests</SelectItem>
                      <SelectItem value="10">10 guests</SelectItem>
                      <SelectItem value="12">12 guests (max)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="start-time">Preferred Time</Label>
                  <Select value={formData.startTime} onValueChange={(value) => handleInputChange('startTime', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose time..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">Morning (9:00 AM)</SelectItem>
                      <SelectItem value="10:00">Mid-Morning (10:00 AM)</SelectItem>
                      <SelectItem value="11:00">Late Morning (11:00 AM)</SelectItem>
                      <SelectItem value="14:00">Afternoon (2:00 PM)</SelectItem>
                      <SelectItem value="17:00">Sunset (5:00 PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="customer-name">Your Name</Label>
                  <Input
                    id="customer-name"
                    placeholder="Full name"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="customer-email">Email</Label>
                  <Input
                    id="customer-email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.customerEmail}
                    onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="customer-phone">Phone (with country code)</Label>
                <Input
                  id="customer-phone"
                  type="tel"
                  placeholder="+34 123 456 789"
                  value={formData.customerPhone}
                  onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="special-requests">Special Requests (optional)</Label>
                <Textarea
                  id="special-requests"
                  rows={3}
                  placeholder="Any special occasions, dietary requirements, or requests..."
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                />
              </div>
              
              {showPrice && (
                <div className="bg-zatara-blue-light p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Estimated Total:</span>
                    <span className="text-2xl font-bold text-zatara-blue">€{estimatedPrice}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">*Final price confirmed upon availability check</p>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-zatara-blue hover:bg-zatara-blue-dark text-white py-4 text-lg font-semibold transition transform hover:scale-105"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Check Availability & Get Quote'
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />
    </>
  );
};