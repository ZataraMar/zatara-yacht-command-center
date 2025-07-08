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
      <div className={cn("bg-muted/30 rounded-xl p-8 text-center", className)}>
        <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground font-medium">Select a date to see available times</p>
        <p className="text-sm text-muted-foreground/70 mt-1">Choose your preferred sailing date first</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-1">
          {format(selectedDate, 'EEEE, MMMM d')}
        </h3>
        <p className="text-sm text-muted-foreground">Select a time</p>
      </div>

      <div className="space-y-3">
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
                "w-full p-4 rounded-xl border text-left transition-all duration-200",
                // Default state
                "border-border hover:border-foreground/20 hover:bg-muted/30",
                // Selected state
                isSelected && "border-foreground bg-foreground/5",
                // Booked state
                isBooked && "border-muted bg-muted/50 opacity-60 cursor-not-allowed",
                // Loading state
                loading && "opacity-50 cursor-wait"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className={cn(
                      "font-medium text-sm",
                      isBooked && "text-muted-foreground"
                    )}>
                      {slot.value} - {slot.label}
                    </h4>
                  </div>
                  
                  <p className={cn(
                    "text-xs text-muted-foreground",
                    isBooked && "text-muted-foreground/60"
                  )}>
                    {slot.description} • Up to 12 guests
                  </p>
                </div>

                <div className="text-right ml-4">
                  {isBooked ? (
                    <div className="text-muted-foreground text-sm">
                      Unavailable
                    </div>
                  ) : (
                    <div className="font-semibold">
                      €{price}
                    </div>
                  )}
                  {!isBooked && (
                    <div className="text-xs text-muted-foreground">
                      per group
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-foreground/20"></div>
          <span className="ml-2 text-sm text-muted-foreground">Checking availability...</span>
        </div>
      )}
    </div>
  );
};