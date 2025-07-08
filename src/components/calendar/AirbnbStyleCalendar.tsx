import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isBefore, startOfDay, getDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

interface CalendarProps {
  selectedDate?: Date;
  onDateSelect: (date: Date) => void;
  className?: string;
}

interface BookedDate {
  date: string;
  timeSlots: string[];
  price?: number;
}

export const AirbnbStyleCalendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  className
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookedDates, setBookedDates] = useState<BookedDate[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch booked dates from database
  useEffect(() => {
    const fetchBookedDates = async () => {
      setLoading(true);
      try {
        const startDate = startOfMonth(subMonths(currentMonth, 1));
        const endDate = endOfMonth(addMonths(currentMonth, 2));
        
        const { data: bookings, error } = await supabase
          .from('bookings')
          .select('start_date, end_date, booking_status')
          .gte('start_date', startDate.toISOString())
          .lte('end_date', endDate.toISOString())
          .in('booking_status', ['Confirmed', 'Booked', 'Prebooked', 'confirmed', 'booked', 'prebooked']);

        if (error) throw error;

        // Process bookings into booked dates
        const processedDates: BookedDate[] = [];
        bookings?.forEach(booking => {
          if (booking.start_date) {
            const bookingDate = new Date(booking.start_date);
            const dateStr = format(bookingDate, 'yyyy-MM-dd');
            const timeSlot = format(bookingDate, 'HH:mm');
            
            const existingDate = processedDates.find(d => d.date === dateStr);
            if (existingDate) {
              existingDate.timeSlots.push(timeSlot);
            } else {
              processedDates.push({
                date: dateStr,
                timeSlots: [timeSlot],
                price: Math.floor(Math.random() * 200) + 400 // Demo pricing
              });
            }
          }
        });

        setBookedDates(processedDates);
      } catch (error) {
        console.error('Error fetching booked dates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedDates();
  }, [currentMonth]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get the starting day of the week (Sunday = 0)
  const startingDayOfWeek = monthStart.getDay();
  const emptyCells = Array.from({ length: startingDayOfWeek }, (_, i) => i);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => 
      direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1)
    );
  };

  const isDateBooked = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const bookedDate = bookedDates.find(d => d.date === dateStr);
    return bookedDate && bookedDate.timeSlots.length >= 3; // Fully booked if 3+ time slots
  };

  const isDatePartiallyBooked = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const bookedDate = bookedDates.find(d => d.date === dateStr);
    return bookedDate && bookedDate.timeSlots.length > 0 && bookedDate.timeSlots.length < 3;
  };

  const getDatePrice = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const bookedDate = bookedDates.find(d => d.date === dateStr);
    return bookedDate?.price;
  };

  const isPastDate = (date: Date) => isBefore(date, startOfDay(new Date()));
  const isSelectedDate = (date: Date) => selectedDate && isSameDay(date, selectedDate);

  return (
    <div className={cn("bg-white rounded-2xl border border-border overflow-hidden", className)}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-muted rounded-full transition-colors duration-200"
          disabled={loading}
        >
          <ChevronLeft className="h-4 w-4 text-muted-foreground" />
        </button>
        
        <h2 className="text-base font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-muted rounded-full transition-colors duration-200"
          disabled={loading}
        >
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      <div className="p-6">
        {/* Day Headers */}
        <div className="grid grid-cols-7 mb-2">
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => (
            <div key={index} className="text-center text-xs font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for the beginning of the month */}
          {emptyCells.map(i => (
            <div key={`empty-${i}`} className="h-11" />
          ))}
          
          {/* Actual days */}
          {days.map(day => {
            const isBooked = isDateBooked(day);
            const isPartiallyBooked = isDatePartiallyBooked(day);
            const isPast = isPastDate(day);
            const isSelected = isSelectedDate(day);
            const isTodayDate = isToday(day);

            return (
              <button
                key={day.toISOString()}
                onClick={() => !isPast && !isBooked && onDateSelect(day)}
                disabled={isPast || isBooked || loading}
                className={cn(
                  "relative h-11 w-11 mx-auto flex items-center justify-center text-sm rounded-full transition-all duration-200",
                  // Base styles
                  "hover:bg-muted",
                  // Past dates
                  isPast && "text-muted-foreground cursor-not-allowed opacity-50",
                  // Available dates
                  !isPast && !isBooked && !isSelected && "text-foreground hover:bg-muted",
                  // Selected date
                  isSelected && "bg-foreground text-background font-medium",
                  // Today
                  isTodayDate && !isSelected && "font-semibold text-foreground",
                  // Booked dates
                  isBooked && "text-muted-foreground cursor-not-allowed line-through opacity-50",
                  // Partially booked
                  isPartiallyBooked && "text-orange-600"
                )}
              >
                {format(day, 'd')}
                
                {/* Availability indicator */}
                {isPartiallyBooked && !isSelected && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};