
import { BusinessViewRow, FinanceViewRow, SkipperViewRow } from '../types/businessViewTypes';

interface RawBooking {
  locator: string;
  start_date: string;
  end_date: string;
  boat: string;
  booking_source: string;
  guest_first_name: string;
  guest_surname: string;
  guest_phone: string;
  charter_total: number;
  booking_status: string;
  total_guests: number;
  paid_amount: number;
  outstanding_amount: number;
  booking_notes: string;
}

export const transformToBusinessView = (bookings: RawBooking[]): BusinessViewRow[] => {
  return bookings.map(booking => ({
    locator: booking.locator,
    charter_date: booking.start_date ? new Date(booking.start_date).toISOString().split('T')[0] : '',
    guest_name: `${booking.guest_first_name || ''} ${booking.guest_surname || ''}`.trim(),
    booking_source: booking.booking_source || '',
    start_time: booking.start_date ? new Date(booking.start_date).toTimeString().split(' ')[0] : '',
    end_time: booking.end_date ? new Date(booking.end_date).toTimeString().split(' ')[0] : '',
    boat: booking.boat || '',
    status: booking.booking_status || '',
    charter_total: booking.charter_total || 0,
    fnb_details: '',
    crew_required: 'Standard crew',
    equipment_required: '',
    charter_notes: booking.booking_notes || '',
    pre_departure_checks: false,
    cleared_for_departure: false,
    gps_coordinates: '',
    total_guests: booking.total_guests || 1,
    paid_amount: booking.paid_amount || 0,
    outstanding_amount: booking.outstanding_amount || 0
  }));
};

export const transformToFinanceView = (bookings: RawBooking[]): FinanceViewRow[] => {
  return bookings.map(booking => ({
    locator: booking.locator,
    charter_date: booking.start_date ? new Date(booking.start_date).toISOString().split('T')[0] : '',
    guest_full_name: `${booking.guest_first_name || ''} ${booking.guest_surname || ''}`.trim(),
    boat: booking.boat || '',
    booking_source: booking.booking_source || '',
    charter_total: booking.charter_total || 0,
    outstanding_amount: booking.outstanding_amount || 0,
    payments_received: booking.paid_amount || 0,
    total_paid: booking.paid_amount || 0,
    balance_due: booking.outstanding_amount || 0,
    payment_status: booking.outstanding_amount > 0 ? 'partial' : 'paid'
  }));
};

export const transformToSkipperView = (bookings: RawBooking[]): SkipperViewRow[] => {
  return bookings.map(booking => ({
    locator: booking.locator,
    charter_date: booking.start_date ? new Date(booking.start_date).toISOString().split('T')[0] : '',
    guest_full_name: `${booking.guest_first_name || ''} ${booking.guest_surname || ''}`.trim(),
    guest_phone: booking.guest_phone || '',
    start_time: booking.start_date ? new Date(booking.start_date).toTimeString().split(' ')[0] : '',
    end_time: booking.end_date ? new Date(booking.end_date).toTimeString().split(' ')[0] : '',
    total_guests: booking.total_guests || 1,
    booking_status: booking.booking_status || '',
    charter_notes: booking.booking_notes || '',
    fnb_details: '',
    equipment_required: '',
    pre_departure_checks: false,
    cleared_for_departure: false,
    gps_coordinates: '',
    boat: booking.boat || ''
  }));
};
