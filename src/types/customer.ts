
export interface Customer {
  id: number;
  customer_key: string;
  full_name: string;
  first_name: string;
  last_name: string;
  phone_primary: string;
  email_primary: string;
  customer_status: string;
  total_bookings: number;
  total_spent: number;
  customer_lifetime_value: number;
  customer_segment: string;
  activity_status: string;
  last_booking_date: string;
  created_at: string;
  updated_at: string;
  // Additional fields from customer_360_view
  acquisition_source?: string;
  acquisition_date?: string;
  average_booking_value?: number;
  average_review_rating?: number;
  avg_satisfaction_score?: number;
  preferred_boat?: string;
  preferred_time_slot?: string;
  communication_preference?: string;
  nationality?: string;
  special_requirements?: string;
  vip_status?: boolean;
  referral_source?: string;
  marketing_consent?: boolean;
  data_source?: string;
  // Additional optional fields for completeness
  dietary_restrictions?: string;
  favorite_boat?: string;
  last_contact_date?: string;
  last_contact_method?: string;
  latest_review_date?: string;
  preferred_season?: string;
  total_charter_hours?: number;
  total_charters?: number;
  total_reviews_given?: number;
}

export interface CustomerHistory {
  id: number;
  customer_id: number;
  booking_locator: string;
  booking_date: string;
  boat_used: string;
  guests_count: number;
  total_value: number;
  booking_source: string;
  seasonal_period: string;
  repeat_booking: boolean;
}

export interface DatabaseCustomer {
  id: number;
  customer_key: string;
  full_name: string;
  first_name: string;
  last_name: string;
  phone_primary: string;
  email_primary: string;
  customer_status?: string;
  total_bookings: number;
  total_spent: number;
  customer_lifetime_value: number;
  created_at: string;
  updated_at: string;
}
