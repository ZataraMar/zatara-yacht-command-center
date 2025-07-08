import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Clock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

interface TimeSlot {
  id: string;
  label: string;
  value: string;
  minPrice: number;
  duration: string;
  description: string;
  available: boolean;
}

interface TimeSlotSelectorProps {
  selectedDate?: Date;
  selectedTime: string;
  onTimeSelect: (timeSlot: string) => void;
  onPriceUpdate: (price: number) => void;
  currentPeople: number;
  className?: string;
}

export const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  selectedDate,
  selectedTime,
  onTimeSelect,
  onPriceUpdate,
  currentPeople,
  className
}) => {
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const timeSlots: TimeSlot[] = [
    {
      id: 'morning',
      label: 'Morning Sailing',
      value: '08:30',
      minPrice: 499,
      duration: '3.5 hours',
      description: 'Perfect for early birds • Calm waters • Light breakfast',
      available: true
    },
    {
      id: 'afternoon',
      label: 'Afternoon Adventure',
      value: '13:30',
      duration: '3.5 hours',
      minPrice: 699,
      description: 'Peak experience • Full lunch • Swimming time',
      available: true
    },
    {
      id: 'sunset',
      label: 'Sunset Romance',
      value: '17:30',
      duration: '3.5 hours',
      minPrice: 599,
      description: 'Magic hour • Tapas & wine • Unforgettable views',
      available: true
    }
  ];

  // Check availability for selected date
  useEffect(() => {
    if (!selectedDate) return;

    const checkAvailability = async () => {
      setLoading(true);
      try {
        const dateStr = format(selectedDate, 'yyyy-MM-dd');
        
        const { data: bookings, error } = await supabase
          .from('bookings')
          .select('start_date, booking_status')
          .gte('start_date', `${dateStr}T00:00:00`)
          .lt('start_date', `${dateStr}T23:59:59`)
          .in('booking_status', ['Confirmed', 'Booked', 'Prebooked', 'confirmed', 'booked', 'prebooked']);

        if (error) throw error;

        const bookedTimes = bookings?.map(booking => {
          const bookingTime = new Date(booking.start_date);
          return format(bookingTime, 'HH:mm');
        }) || [];

        setBookedSlots(bookedTimes);
      } catch (error) {
        console.error('Error checking availability:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAvailability();
  }, [selectedDate]);

  const calculatePrice = (slot: TimeSlot) => {
    const basePrice = currentPeople * 99;
    const minimumPrice = slot.minPrice;
    return Math.max(basePrice, minimumPrice);
  };

  const isSlotBooked = (slotValue: string) => {
    return bookedSlots.includes(slotValue);
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    if (!selectedDate || isSlotBooked(slot.value) || loading) return;
    
    onTimeSelect(slot.id);
    onPriceUpdate(calculatePrice(slot));
  };

  if (!selectedDate) {
    return (
      <div className={cn("bg-gray-50 rounded-lg p-6 text-center", className)}>
        <Clock className="h-8 w-8 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-500 font-medium">Select a date to see available times</p>
        <p className="text-sm text-gray-400 mt-1">Choose your preferred sailing date first</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Available times for {format(selectedDate, 'EEEE, MMMM d')}
        </h3>
      </div>

      <div className="grid gap-3">
        {timeSlots.map(slot => {
          const isBooked = isSlotBooked(slot.value);
          const isSelected = selectedTime === slot.id;
          const price = calculatePrice(slot);

          return (
            <button
              key={slot.id}
              onClick={() => handleSlotSelect(slot)}
              disabled={isBooked || loading}
              className={cn(
                "w-full p-4 rounded-xl border-2 text-left transition-all duration-200 group",
                // Default state
                "border-gray-200 hover:border-blue-300 hover:shadow-md",
                // Selected state
                isSelected && "border-blue-500 bg-blue-50 shadow-md",
                // Booked state
                isBooked && "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed",
                // Loading state
                loading && "opacity-50 cursor-wait"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className={cn(
                      "font-semibold text-base",
                      isSelected ? "text-blue-700" : "text-gray-900",
                      isBooked && "text-gray-500"
                    )}>
                      {slot.label}
                    </h4>
                    <span className={cn(
                      "text-sm px-2 py-1 rounded-full",
                      isSelected ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
                    )}>
                      {slot.duration}
                    </span>
                  </div>
                  
                  <p className={cn(
                    "text-sm mb-3",
                    isSelected ? "text-blue-600" : "text-gray-600",
                    isBooked && "text-gray-400"
                  )}>
                    {slot.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Starts {slot.value}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>Up to 12 guests</span>
                    </div>
                  </div>
                </div>

                <div className="text-right ml-4">
                  {isBooked ? (
                    <div className="text-gray-500 font-medium">
                      Unavailable
                    </div>
                  ) : (
                    <div className={cn(
                      "font-bold text-lg",
                      isSelected ? "text-blue-700" : "text-gray-900"
                    )}>
                      €{price}
                    </div>
                  )}
                  {!isBooked && (
                    <div className="text-xs text-gray-500 mt-1">
                      {currentPeople} {currentPeople === 1 ? 'person' : 'people'}
                    </div>
                  )}
                </div>
              </div>

              {isSelected && (
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <div className="flex items-center justify-between text-sm text-blue-700">
                    <span>✓ Selected time slot</span>
                    <span>Continue to complete booking</span>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            Checking availability...
          </div>
        </div>
      )}
    </div>
  );
};