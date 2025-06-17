
export interface ComprehensiveBooking {
  id: number;
  locator: string;
  start_date: string;
  end_date: string;
  boat: string;
  booking_source: string;
  guest_first_name: string;
  guest_surname: string;
  guest_full_name: string;
  guest_phone?: string;
  guest_email?: string;
  nationality?: string;
  charter_total: number;
  paid_amount: number;
  outstanding_amount: number;
  booking_status: string;
  total_guests: number;
  booking_notes?: string;
  created_at: string;
  updated_at: string;
  data_period: string;
  booking_year: number;
  booking_month: number;
  booking_date: string;
}

export interface BookingFilters {
  startDate?: string;
  endDate?: string;
  boats?: string[];
  sources?: string[];
  statuses?: string[];
  years?: number[];
  limit?: number;
}
