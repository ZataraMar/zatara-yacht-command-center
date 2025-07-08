import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isBefore, isAfter, startOfDay } from 'date-fns';
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
    <div className={cn("bg-white rounded-xl border border-gray-200 p-6 shadow-lg", className)}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          disabled={loading}
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        
        <h2 className="text-lg font-semibold text-gray-900">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          disabled={loading}
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for the beginning of the month */}
        {emptyCells.map(i => (
          <div key={`empty-${i}`} className="h-12" />
        ))}
        
        {/* Actual days */}
        {days.map(day => {
          const isBooked = isDateBooked(day);
          const isPartiallyBooked = isDatePartiallyBooked(day);
          const isPast = isPastDate(day);
          const isSelected = isSelectedDate(day);
          const isTodayDate = isToday(day);
          const price = getDatePrice(day);

          return (
            <button
              key={day.toISOString()}
              onClick={() => !isPast && !isBooked && onDateSelect(day)}
              disabled={isPast || isBooked || loading}
              className={cn(
                "relative h-12 flex flex-col items-center justify-center text-sm rounded-lg transition-all duration-200 group",
                // Base styles
                "hover:bg-gray-50 hover:scale-105",
                // Past dates
                isPast && "text-gray-300 cursor-not-allowed",
                // Available dates
                !isPast && !isBooked && !isSelected && "text-gray-900 hover:bg-blue-50 hover:text-blue-600",
                // Selected date
                isSelected && "bg-black text-white shadow-md",
                // Today
                isTodayDate && !isSelected && "ring-2 ring-blue-500 ring-opacity-50",
                // Booked dates
                isBooked && "bg-gray-100 text-gray-400 cursor-not-allowed line-through",
                // Partially booked
                isPartiallyBooked && "bg-yellow-50 text-yellow-800"
              )}
            >
              <span className={cn(
                "font-medium",
                isSelected && "text-white",
                isTodayDate && !isSelected && "font-bold"
              )}>
                {format(day, 'd')}
              </span>
              
              {/* Price display */}
              {price && !isPast && !isBooked && (
                <span className={cn(
                  "text-xs font-medium mt-0.5",
                  isSelected ? "text-white" : "text-gray-600"
                )}>
                  €{price}
                </span>
              )}

              {/* Availability indicator */}
              {isPartiallyBooked && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full" />
              )}
              
              {/* Loading overlay */}
              {loading && (
                <div className="absolute inset-0 bg-gray-100 bg-opacity-50 rounded-lg animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-black rounded"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-50 border border-yellow-200 rounded"></div>
          <span>Limited availability</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-100 rounded"></div>
          <span>Unavailable</span>
        </div>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-xl">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
};