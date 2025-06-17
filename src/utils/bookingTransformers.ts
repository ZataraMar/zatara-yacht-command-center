import { ComprehensiveBooking } from '@/types/booking';

export const transformCurrentBooking = (booking: any): ComprehensiveBooking => ({
  id: booking.id,
  locator: booking.locator || '',
  start_date: booking.start_date,
  end_date: booking.end_date || booking.start_date,
  boat: booking.boat || '',
  booking_source: booking.booking_source || '',
  guest_first_name: booking.guest_first_name || '',
  guest_surname: booking.guest_surname || '',
  guest_full_name: `${booking.guest_first_name || ''} ${booking.guest_surname || ''}`.trim(),
  guest_phone: booking.guest_phone,
  guest_email: booking.guest_email,
  nationality: booking.nationality,
  charter_total: booking.charter_total || 0,
  paid_amount: booking.paid_amount || 0,
  outstanding_amount: booking.outstanding_amount || 0,
  cash_payment: booking.cash_payment || 0,
  card_payment: booking.card_payment || 0,
  contract_signed: booking.contract_signed || false,
  booking_status: booking.booking_status || '',
  total_guests: booking.total_guests || 0,
  booking_notes: booking.booking_notes,
  created_at: booking.created_at,
  updated_at: booking.updated_at,
  data_period: 'current',
  booking_year: new Date(booking.start_date).getFullYear(),
  booking_month: new Date(booking.start_date).getMonth() + 1,
  booking_date: booking.start_date.split('T')[0]
});

// Parse zatara_2023_charters date format "Sat 8/4" to proper date
const parseZataraDate = (dateStr: string, year: number): string => {
  if (!dateStr) return `${year}-01-01`;
  
  try {
    // Handle format like "Sat 8/4" or "8/4"
    const parts = dateStr.trim().split(' ');
    const datePart = parts.length > 1 ? parts[1] : parts[0];
    
    if (datePart.includes('/')) {
      const [month, day] = datePart.split('/');
      const monthNum = parseInt(month, 10);
      const dayNum = parseInt(day, 10);
      
      if (monthNum >= 1 && monthNum <= 12 && dayNum >= 1 && dayNum <= 31) {
        return `${year}-${monthNum.toString().padStart(2, '0')}-${dayNum.toString().padStart(2, '0')}`;
      }
    }
    
    // Fallback to January 1st if parsing fails
    return `${year}-01-01`;
  } catch (error) {
    console.warn(`Failed to parse date: ${dateStr}`, error);
    return `${year}-01-01`;
  }
};

export const transformHistoricalBooking = (charter: any, year: number): ComprehensiveBooking => {
  // Handle different schemas for different years
  if (year === 2023) {
    // zatara_2023_charters schema
    const charterDate = parseZataraDate(charter.charter_date, year);
    
    return {
      id: year * 1000000 + charter.id,
      locator: charter.clickboat_ref || `ZATARA${year}-${charter.id}`,
      start_date: new Date(charterDate).toISOString(),
      end_date: new Date(new Date(charterDate).getTime() + 8 * 60 * 60 * 1000).toISOString(), // 8 hour default
      boat: 'Zatara',
      booking_source: charter.booking_source || `historical_${year}`,
      guest_first_name: charter.customer_name?.split(' ')[0] || '',
      guest_surname: charter.customer_name?.split(' ').slice(1).join(' ') || '',
      guest_full_name: charter.customer_name || '',
      guest_phone: undefined,
      guest_email: undefined,
      nationality: undefined,
      charter_total: charter.charter_total_net || charter.direct_hire_gross || charter.clickboat_gross_amount || charter.airbnb_gross_amount || 0,
      paid_amount: charter.charter_total_net || charter.direct_hire_net || charter.clickboat_payout || charter.airbnb_payout || 0,
      outstanding_amount: 0,
      cash_payment: 0,
      card_payment: 0,
      contract_signed: true,
      booking_status: 'completed',
      total_guests: charter.pax || 0,
      booking_notes: charter.notes,
      created_at: charter.created_at || new Date(charterDate).toISOString(),
      updated_at: charter.created_at || new Date(charterDate).toISOString(),
      data_period: `${year}_historical`,
      booking_year: year,
      booking_month: new Date(charterDate).getMonth() + 1,
      booking_date: charterDate
    };
  } else {
    // charters_2022 schema (unchanged)
    return {
      id: year * 1000000 + charter.id,
      locator: charter.clickboat_ref || `HIST${year}-${charter.id}`,
      start_date: new Date(charter.charter_date).toISOString(),
      end_date: new Date(new Date(charter.charter_date).getTime() + (charter.charter_days || 1) * 24 * 60 * 60 * 1000).toISOString(),
      boat: 'Zatara',
      booking_source: charter.booking_source || `historical_${year}`,
      guest_first_name: charter.customer_name?.split(' ')[0] || '',
      guest_surname: charter.customer_name?.split(' ').slice(1).join(' ') || '',
      guest_full_name: charter.customer_name || '',
      guest_phone: undefined,
      guest_email: undefined,
      nationality: undefined,
      charter_total: charter.charter_total_net || charter.direct_hire_gross || charter.clickboat_gross_amount || charter.airbnb_gross_amount || 0,
      paid_amount: charter.charter_total_net || charter.direct_hire_net || charter.clickboat_payout || charter.airbnb_payout || 0,
      outstanding_amount: 0,
      cash_payment: 0,
      card_payment: 0,
      contract_signed: true,
      booking_status: 'completed',
      total_guests: charter.pax || 0,
      booking_notes: charter.notes,
      created_at: charter.created_at || new Date(charter.charter_date).toISOString(),
      updated_at: charter.created_at || new Date(charter.charter_date).toISOString(),
      data_period: `${year}_historical`,
      booking_year: year,
      booking_month: new Date(charter.charter_date).getMonth() + 1,
      booking_date: charter.charter_date
    };
  }
};
