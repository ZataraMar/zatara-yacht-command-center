
export interface StaffMember {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
  certifications: string[];
  boat_access: string[];
  emergency_contact: string;
  active: boolean;
  last_shift: string;
  hours_this_week: number;
}

export interface StaffOverviewMetrics {
  totalStaff: number;
  activeSkippers: number;
  onDutyToday: number;
  avgHoursPerWeek: number;
}
