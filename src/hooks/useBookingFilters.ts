
import React from 'react';

interface BookingFiltersResult {
  filteredBookings: any[];
  availableViews: any[];
}

export const useBookingFilters = (
  bookings: any[],
  timeFilter: string,
  boatFilter: string,
  statusFilter: string
): BookingFiltersResult => {
  const filteredBookings = React.useMemo(() => {
    if (!bookings) return [];

    console.log('Starting filter with bookings:', bookings.length);

    let filtered = [...bookings];

    // Apply time filter - more flexible date range with backwards/forwards capability
    const daysRange = parseInt(timeFilter);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let startDate: Date;
    let endDate: Date;
    
    if (daysRange === 1) {
      // Today only
      startDate = new Date(today);
      endDate = new Date(today);
      endDate.setDate(today.getDate() + 1);
    } else {
      // Range that includes past and future
      startDate = new Date(today);
      startDate.setDate(today.getDate() - Math.floor(daysRange / 2));
      
      endDate = new Date(today);
      endDate.setDate(today.getDate() + Math.ceil(daysRange / 2));
    }
    
    filtered = filtered.filter(booking => {
      if (!booking.start_date) return false;
      const bookingDate = new Date(booking.start_date);
      bookingDate.setHours(0, 0, 0, 0);
      return bookingDate >= startDate && bookingDate <= endDate;
    });

    console.log('After time filter:', filtered.length);

    // Apply boat filter
    if (boatFilter !== 'all') {
      switch (boatFilter) {
        case 'zatara_only':
          filtered = filtered.filter(b => b.boat?.toLowerCase().includes('zatara'));
          break;
        case 'puravida_only':
          filtered = filtered.filter(b => b.boat?.toLowerCase().includes('puravida') || b.boat?.toLowerCase().includes('pura vida'));
          break;
        case 'zatara_puravida':
          filtered = filtered.filter(b => 
            b.boat?.toLowerCase().includes('zatara') || 
            b.boat?.toLowerCase().includes('puravida') || 
            b.boat?.toLowerCase().includes('pura vida')
          );
          break;
      }
    }

    console.log('After boat filter:', filtered.length);

    // Apply status filter - improved status mapping
    if (statusFilter !== 'all') {
      switch (statusFilter) {
        case 'booked_prebooked':
          filtered = filtered.filter(b => {
            const status = b.booking_status?.toLowerCase() || '';
            return ['confirmed', 'booked', 'prebooked', 'confirmed', 'active'].includes(status) ||
                   status.includes('confirm') || status.includes('book') || status.includes('active');
          });
          break;
        case 'option_request':
          filtered = filtered.filter(b => {
            const status = b.booking_status?.toLowerCase() || '';
            return status.includes('option') || status.includes('request') || status.includes('pending');
          });
          break;
        case 'cancelled':
          filtered = filtered.filter(b => {
            const status = b.booking_status?.toLowerCase() || '';
            return status.includes('cancel') || status.includes('declined');
          });
          break;
      }
    }

    console.log('After status filter:', filtered.length);

    return filtered;
  }, [bookings, timeFilter, boatFilter, statusFilter]);

  const availableViews = [
    { 
      view_name: 'operations', 
      display_name: '🔧 Operations', 
      view_type: 'operations',
      description: 'Operations management' 
    },
    { 
      view_name: 'finance', 
      display_name: '💰 Finance', 
      view_type: 'finance',
      description: 'Financial tracking' 
    },
    { 
      view_name: 'zatara', 
      display_name: '⛵ Zatara', 
      view_type: 'skipper',
      description: 'Zatara operations' 
    },
    { 
      view_name: 'puravida', 
      display_name: '🚤 PuraVida', 
      view_type: 'skipper',
      description: 'PuraVida operations' 
    }
  ];

  return {
    filteredBookings,
    availableViews
  };
};
