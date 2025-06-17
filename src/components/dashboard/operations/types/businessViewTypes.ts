
export interface BusinessViewRow {
  locator: string;
  charter_date: string;
  guest_name: string;
  booking_source: string;
  start_time: string;
  end_time: string;
  boat: string;
  status: string;
  charter_total: number;
  fnb_details: string;
  crew_required: string;
  equipment_required: string;
  charter_notes: string;
  pre_departure_checks: boolean;
  cleared_for_departure: boolean;
  gps_coordinates: string;
  total_guests: number;
  paid_amount: number;
  outstanding_amount: number;
}

export interface FinanceViewRow {
  locator: string;
  charter_date: string;
  guest_full_name: string;
  boat: string;
  booking_source: string;
  charter_total: number;
  outstanding_amount: number;
  payments_received: number;
  total_paid: number;
  balance_due: number;
  payment_status: string;
}

export interface SkipperViewRow {
  locator: string;
  charter_date: string;
  guest_full_name: string;
  guest_phone: string;
  start_time: string;
  end_time: string;
  total_guests: number;
  booking_status: string;
  charter_notes: string;
  fnb_details: string;
  equipment_required: string;
  pre_departure_checks: boolean;
  cleared_for_departure: boolean;
  gps_coordinates: string;
  boat: string;
}
