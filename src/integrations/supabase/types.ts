export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          boat: string | null
          booking_notes: string | null
          booking_source: string | null
          booking_status: string | null
          card_payment: number | null
          cash_payment: number | null
          charter_total: number | null
          children_details: string | null
          contract_signed: boolean | null
          created_at: string | null
          deposit_amount: number | null
          end_date: string | null
          extras_total: number | null
          guest_email: string | null
          guest_first_name: string | null
          guest_phone: string | null
          guest_surname: string | null
          health_allergies: string | null
          id: number
          locator: string
          nationality: string | null
          outstanding_amount: number | null
          paid_amount: number | null
          raw_data: Json | null
          reason_for_booking: string | null
          service_total: number | null
          start_date: string | null
          total_guests: number | null
          updated_at: string | null
        }
        Insert: {
          boat?: string | null
          booking_notes?: string | null
          booking_source?: string | null
          booking_status?: string | null
          card_payment?: number | null
          cash_payment?: number | null
          charter_total?: number | null
          children_details?: string | null
          contract_signed?: boolean | null
          created_at?: string | null
          deposit_amount?: number | null
          end_date?: string | null
          extras_total?: number | null
          guest_email?: string | null
          guest_first_name?: string | null
          guest_phone?: string | null
          guest_surname?: string | null
          health_allergies?: string | null
          id?: number
          locator: string
          nationality?: string | null
          outstanding_amount?: number | null
          paid_amount?: number | null
          raw_data?: Json | null
          reason_for_booking?: string | null
          service_total?: number | null
          start_date?: string | null
          total_guests?: number | null
          updated_at?: string | null
        }
        Update: {
          boat?: string | null
          booking_notes?: string | null
          booking_source?: string | null
          booking_status?: string | null
          card_payment?: number | null
          cash_payment?: number | null
          charter_total?: number | null
          children_details?: string | null
          contract_signed?: boolean | null
          created_at?: string | null
          deposit_amount?: number | null
          end_date?: string | null
          extras_total?: number | null
          guest_email?: string | null
          guest_first_name?: string | null
          guest_phone?: string | null
          guest_surname?: string | null
          health_allergies?: string | null
          id?: number
          locator?: string
          nationality?: string | null
          outstanding_amount?: number | null
          paid_amount?: number | null
          raw_data?: Json | null
          reason_for_booking?: string | null
          service_total?: number | null
          start_date?: string | null
          total_guests?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      business_analytics: {
        Row: {
          avg_charter_value: number | null
          boat_name: string | null
          booking_source: string | null
          charter_count: number | null
          confidence_level: number | null
          conversion_rate: number | null
          created_at: string | null
          forecast_value: number | null
          growth_rate: number | null
          id: number
          metric_type: string | null
          notes: string | null
          period_month: number | null
          period_year: number | null
          repeat_customer_rate: number | null
          seasonal_trend: string | null
          total_charter_hours: number | null
          total_guests: number | null
          total_revenue: number | null
          updated_at: string | null
        }
        Insert: {
          avg_charter_value?: number | null
          boat_name?: string | null
          booking_source?: string | null
          charter_count?: number | null
          confidence_level?: number | null
          conversion_rate?: number | null
          created_at?: string | null
          forecast_value?: number | null
          growth_rate?: number | null
          id?: number
          metric_type?: string | null
          notes?: string | null
          period_month?: number | null
          period_year?: number | null
          repeat_customer_rate?: number | null
          seasonal_trend?: string | null
          total_charter_hours?: number | null
          total_guests?: number | null
          total_revenue?: number | null
          updated_at?: string | null
        }
        Update: {
          avg_charter_value?: number | null
          boat_name?: string | null
          booking_source?: string | null
          charter_count?: number | null
          confidence_level?: number | null
          conversion_rate?: number | null
          created_at?: string | null
          forecast_value?: number | null
          growth_rate?: number | null
          id?: number
          metric_type?: string | null
          notes?: string | null
          period_month?: number | null
          period_year?: number | null
          repeat_customer_rate?: number | null
          seasonal_trend?: string | null
          total_charter_hours?: number | null
          total_guests?: number | null
          total_revenue?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      business_forecasting: {
        Row: {
          average_charter_hours: number | null
          average_guests_per_charter: number | null
          base_pricing_4hr: number | null
          base_pricing_7hr: number | null
          base_pricing_overnight: number | null
          boat_name: string | null
          charter_count_forecast: number | null
          charter_revenue_forecast: number | null
          charter_slots_available: number | null
          confidence_level: number | null
          created_at: string | null
          crew_costs_forecast: number | null
          extras_revenue_forecast: number | null
          food_costs_forecast: number | null
          forecast_month: number | null
          forecast_scenario: string | null
          forecast_year: number
          fuel_costs_forecast: number | null
          full_day_charter_ratio: number | null
          gross_profit_forecast: number | null
          growth_rate_forecast: number | null
          half_day_charter_ratio: number | null
          id: number
          maintenance_costs_forecast: number | null
          net_profit_forecast: number | null
          notes: string | null
          occupancy_rate_forecast: number | null
          pricing_ratio: number | null
          profit_margin_forecast: number | null
          seasonal_pricing_multiplier: number | null
          seasonal_trend: string | null
          total_costs_forecast: number | null
          total_revenue_forecast: number | null
          updated_at: string | null
        }
        Insert: {
          average_charter_hours?: number | null
          average_guests_per_charter?: number | null
          base_pricing_4hr?: number | null
          base_pricing_7hr?: number | null
          base_pricing_overnight?: number | null
          boat_name?: string | null
          charter_count_forecast?: number | null
          charter_revenue_forecast?: number | null
          charter_slots_available?: number | null
          confidence_level?: number | null
          created_at?: string | null
          crew_costs_forecast?: number | null
          extras_revenue_forecast?: number | null
          food_costs_forecast?: number | null
          forecast_month?: number | null
          forecast_scenario?: string | null
          forecast_year: number
          fuel_costs_forecast?: number | null
          full_day_charter_ratio?: number | null
          gross_profit_forecast?: number | null
          growth_rate_forecast?: number | null
          half_day_charter_ratio?: number | null
          id?: number
          maintenance_costs_forecast?: number | null
          net_profit_forecast?: number | null
          notes?: string | null
          occupancy_rate_forecast?: number | null
          pricing_ratio?: number | null
          profit_margin_forecast?: number | null
          seasonal_pricing_multiplier?: number | null
          seasonal_trend?: string | null
          total_costs_forecast?: number | null
          total_revenue_forecast?: number | null
          updated_at?: string | null
        }
        Update: {
          average_charter_hours?: number | null
          average_guests_per_charter?: number | null
          base_pricing_4hr?: number | null
          base_pricing_7hr?: number | null
          base_pricing_overnight?: number | null
          boat_name?: string | null
          charter_count_forecast?: number | null
          charter_revenue_forecast?: number | null
          charter_slots_available?: number | null
          confidence_level?: number | null
          created_at?: string | null
          crew_costs_forecast?: number | null
          extras_revenue_forecast?: number | null
          food_costs_forecast?: number | null
          forecast_month?: number | null
          forecast_scenario?: string | null
          forecast_year?: number
          fuel_costs_forecast?: number | null
          full_day_charter_ratio?: number | null
          gross_profit_forecast?: number | null
          growth_rate_forecast?: number | null
          half_day_charter_ratio?: number | null
          id?: number
          maintenance_costs_forecast?: number | null
          net_profit_forecast?: number | null
          notes?: string | null
          occupancy_rate_forecast?: number | null
          pricing_ratio?: number | null
          profit_margin_forecast?: number | null
          seasonal_pricing_multiplier?: number | null
          seasonal_trend?: string | null
          total_costs_forecast?: number | null
          total_revenue_forecast?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      business_targets: {
        Row: {
          average_charter_value_target: number | null
          boat_name: string | null
          charter_count_target: number | null
          charter_revenue_target: number | null
          cost_ratio_target: number | null
          created_at: string | null
          extras_revenue_target: number | null
          gross_profit_target: number | null
          guest_satisfaction_target: number | null
          id: number
          net_profit_target: number | null
          new_customer_acquisition_target: number | null
          occupancy_rate_target: number | null
          platform_diversification_target: number | null
          profit_margin_target: number | null
          repeat_customer_rate_target: number | null
          target_description: string | null
          target_month: number | null
          target_period: string
          target_quarter: number | null
          target_year: number
          total_costs_target: number | null
          total_revenue_target: number | null
          updated_at: string | null
        }
        Insert: {
          average_charter_value_target?: number | null
          boat_name?: string | null
          charter_count_target?: number | null
          charter_revenue_target?: number | null
          cost_ratio_target?: number | null
          created_at?: string | null
          extras_revenue_target?: number | null
          gross_profit_target?: number | null
          guest_satisfaction_target?: number | null
          id?: number
          net_profit_target?: number | null
          new_customer_acquisition_target?: number | null
          occupancy_rate_target?: number | null
          platform_diversification_target?: number | null
          profit_margin_target?: number | null
          repeat_customer_rate_target?: number | null
          target_description?: string | null
          target_month?: number | null
          target_period: string
          target_quarter?: number | null
          target_year: number
          total_costs_target?: number | null
          total_revenue_target?: number | null
          updated_at?: string | null
        }
        Update: {
          average_charter_value_target?: number | null
          boat_name?: string | null
          charter_count_target?: number | null
          charter_revenue_target?: number | null
          cost_ratio_target?: number | null
          created_at?: string | null
          extras_revenue_target?: number | null
          gross_profit_target?: number | null
          guest_satisfaction_target?: number | null
          id?: number
          net_profit_target?: number | null
          new_customer_acquisition_target?: number | null
          occupancy_rate_target?: number | null
          platform_diversification_target?: number | null
          profit_margin_target?: number | null
          repeat_customer_rate_target?: number | null
          target_description?: string | null
          target_month?: number | null
          target_period?: string
          target_quarter?: number | null
          target_year?: number
          total_costs_target?: number | null
          total_revenue_target?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      charter_checklist: {
        Row: {
          checked: boolean | null
          checked_at: string | null
          checked_by: string | null
          checklist_type: string
          id: number
          item_description: string
          locator: string | null
          notes: string | null
        }
        Insert: {
          checked?: boolean | null
          checked_at?: string | null
          checked_by?: string | null
          checklist_type: string
          id?: number
          item_description: string
          locator?: string | null
          notes?: string | null
        }
        Update: {
          checked?: boolean | null
          checked_at?: string | null
          checked_by?: string | null
          checklist_type?: string
          id?: number
          item_description?: string
          locator?: string | null
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "charter_checklist_locator_fkey"
            columns: ["locator"]
            isOneToOne: false
            referencedRelation: "charter_reconciliation"
            referencedColumns: ["locator"]
          },
        ]
      }
      charter_messages: {
        Row: {
          id: number
          locator: string | null
          message_content: string
          message_type: string
          recipient: string
          response_received: boolean | null
          sent_at: string | null
        }
        Insert: {
          id?: number
          locator?: string | null
          message_content: string
          message_type: string
          recipient: string
          response_received?: boolean | null
          sent_at?: string | null
        }
        Update: {
          id?: number
          locator?: string | null
          message_content?: string
          message_type?: string
          recipient?: string
          response_received?: boolean | null
          sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "charter_messages_locator_fkey"
            columns: ["locator"]
            isOneToOne: false
            referencedRelation: "charter_reconciliation"
            referencedColumns: ["locator"]
          },
        ]
      }
      charter_reconciliation: {
        Row: {
          boat: string
          charter_completed: boolean | null
          charter_date: string
          charter_total: number | null
          cleared_by: string | null
          cleared_for_departure: boolean | null
          cleared_timestamp: string | null
          contract_sent: boolean | null
          contract_signed: boolean | null
          created_at: string | null
          departure_confirmed: boolean | null
          deposit_amount: number | null
          deposit_paid: boolean | null
          documentation_verified: boolean | null
          final_payment_amount: number | null
          final_payment_paid: boolean | null
          final_reconciliation_complete: boolean | null
          fuel_usage_recorded: boolean | null
          guest_name: string
          guest_phone: string | null
          id: number
          initial_contact_sent: boolean | null
          issues_reported: string | null
          locator: string
          paperwork_prepared: boolean | null
          payment_method: string | null
          payment_verification_complete: boolean | null
          pre_departure_contact_made: boolean | null
          preparation_status: string | null
          return_inspection_complete: boolean | null
          skipper_assigned: string | null
          total_guests: number | null
          updated_at: string | null
        }
        Insert: {
          boat: string
          charter_completed?: boolean | null
          charter_date: string
          charter_total?: number | null
          cleared_by?: string | null
          cleared_for_departure?: boolean | null
          cleared_timestamp?: string | null
          contract_sent?: boolean | null
          contract_signed?: boolean | null
          created_at?: string | null
          departure_confirmed?: boolean | null
          deposit_amount?: number | null
          deposit_paid?: boolean | null
          documentation_verified?: boolean | null
          final_payment_amount?: number | null
          final_payment_paid?: boolean | null
          final_reconciliation_complete?: boolean | null
          fuel_usage_recorded?: boolean | null
          guest_name: string
          guest_phone?: string | null
          id?: number
          initial_contact_sent?: boolean | null
          issues_reported?: string | null
          locator: string
          paperwork_prepared?: boolean | null
          payment_method?: string | null
          payment_verification_complete?: boolean | null
          pre_departure_contact_made?: boolean | null
          preparation_status?: string | null
          return_inspection_complete?: boolean | null
          skipper_assigned?: string | null
          total_guests?: number | null
          updated_at?: string | null
        }
        Update: {
          boat?: string
          charter_completed?: boolean | null
          charter_date?: string
          charter_total?: number | null
          cleared_by?: string | null
          cleared_for_departure?: boolean | null
          cleared_timestamp?: string | null
          contract_sent?: boolean | null
          contract_signed?: boolean | null
          created_at?: string | null
          departure_confirmed?: boolean | null
          deposit_amount?: number | null
          deposit_paid?: boolean | null
          documentation_verified?: boolean | null
          final_payment_amount?: number | null
          final_payment_paid?: boolean | null
          final_reconciliation_complete?: boolean | null
          fuel_usage_recorded?: boolean | null
          guest_name?: string
          guest_phone?: string | null
          id?: number
          initial_contact_sent?: boolean | null
          issues_reported?: string | null
          locator?: string
          paperwork_prepared?: boolean | null
          payment_method?: string | null
          payment_verification_complete?: boolean | null
          pre_departure_contact_made?: boolean | null
          preparation_status?: string | null
          return_inspection_complete?: boolean | null
          skipper_assigned?: string | null
          total_guests?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      charters_2022: {
        Row: {
          airbnb_commission: number | null
          airbnb_gross_amount: number | null
          airbnb_net_less_commission: number | null
          airbnb_payout: number | null
          boat_cost: number | null
          booking_source: string | null
          charter_date: string | null
          charter_days: number | null
          charter_total_net: number | null
          clickboat_bank_tx_date: string | null
          clickboat_charter_date: string | null
          clickboat_commission: number | null
          clickboat_days: number | null
          clickboat_gross_amount: number | null
          clickboat_net_less_commission: number | null
          clickboat_payout: number | null
          clickboat_ref: string | null
          created_at: string | null
          crew_cost: number | null
          customer_name: string | null
          direct_hire_gross: number | null
          direct_hire_net: number | null
          food_cost: number | null
          fuel_cost: number | null
          id: number
          notes: string | null
          pax: number | null
          samboat_commission_no_vat: number | null
          samboat_gross_amount: number | null
          samboat_net_less_commission: number | null
          samboat_payout_less_vat: number | null
          sumup_amount: number | null
          sumup_description: string | null
          sumup_payment_date: string | null
          total_net_commission: number | null
          updated_at: string | null
          viator_commission: number | null
          viator_gross_amount: number | null
          viator_net_less_commission: number | null
          viator_payout: number | null
        }
        Insert: {
          airbnb_commission?: number | null
          airbnb_gross_amount?: number | null
          airbnb_net_less_commission?: number | null
          airbnb_payout?: number | null
          boat_cost?: number | null
          booking_source?: string | null
          charter_date?: string | null
          charter_days?: number | null
          charter_total_net?: number | null
          clickboat_bank_tx_date?: string | null
          clickboat_charter_date?: string | null
          clickboat_commission?: number | null
          clickboat_days?: number | null
          clickboat_gross_amount?: number | null
          clickboat_net_less_commission?: number | null
          clickboat_payout?: number | null
          clickboat_ref?: string | null
          created_at?: string | null
          crew_cost?: number | null
          customer_name?: string | null
          direct_hire_gross?: number | null
          direct_hire_net?: number | null
          food_cost?: number | null
          fuel_cost?: number | null
          id?: number
          notes?: string | null
          pax?: number | null
          samboat_commission_no_vat?: number | null
          samboat_gross_amount?: number | null
          samboat_net_less_commission?: number | null
          samboat_payout_less_vat?: number | null
          sumup_amount?: number | null
          sumup_description?: string | null
          sumup_payment_date?: string | null
          total_net_commission?: number | null
          updated_at?: string | null
          viator_commission?: number | null
          viator_gross_amount?: number | null
          viator_net_less_commission?: number | null
          viator_payout?: number | null
        }
        Update: {
          airbnb_commission?: number | null
          airbnb_gross_amount?: number | null
          airbnb_net_less_commission?: number | null
          airbnb_payout?: number | null
          boat_cost?: number | null
          booking_source?: string | null
          charter_date?: string | null
          charter_days?: number | null
          charter_total_net?: number | null
          clickboat_bank_tx_date?: string | null
          clickboat_charter_date?: string | null
          clickboat_commission?: number | null
          clickboat_days?: number | null
          clickboat_gross_amount?: number | null
          clickboat_net_less_commission?: number | null
          clickboat_payout?: number | null
          clickboat_ref?: string | null
          created_at?: string | null
          crew_cost?: number | null
          customer_name?: string | null
          direct_hire_gross?: number | null
          direct_hire_net?: number | null
          food_cost?: number | null
          fuel_cost?: number | null
          id?: number
          notes?: string | null
          pax?: number | null
          samboat_commission_no_vat?: number | null
          samboat_gross_amount?: number | null
          samboat_net_less_commission?: number | null
          samboat_payout_less_vat?: number | null
          sumup_amount?: number | null
          sumup_description?: string | null
          sumup_payment_date?: string | null
          total_net_commission?: number | null
          updated_at?: string | null
          viator_commission?: number | null
          viator_gross_amount?: number | null
          viator_net_less_commission?: number | null
          viator_payout?: number | null
        }
        Relationships: []
      }
      charters_2023: {
        Row: {
          airbnb_commission: number | null
          airbnb_gross_amount: number | null
          airbnb_net_less_commission: number | null
          airbnb_payout: number | null
          boat_cost: number | null
          booking_source: string | null
          charter_date: string | null
          charter_days: number | null
          charter_total_net: number | null
          clickboat_bank_tx_date: string | null
          clickboat_charter_date: string | null
          clickboat_commission: number | null
          clickboat_days: number | null
          clickboat_gross_amount: number | null
          clickboat_net_less_commission: number | null
          clickboat_payout: number | null
          clickboat_ref: string | null
          created_at: string | null
          crew_cost: number | null
          customer_name: string | null
          direct_hire_gross: number | null
          direct_hire_net: number | null
          food_cost: number | null
          fuel_cost: number | null
          id: number
          notes: string | null
          pax: number | null
          samboat_commission_no_vat: number | null
          samboat_gross_amount: number | null
          samboat_net_less_commission: number | null
          samboat_payout_less_vat: number | null
          sumup_amount: number | null
          sumup_description: string | null
          sumup_payment_date: string | null
          total_net_commission: number | null
          viator_commission: number | null
          viator_gross_amount: number | null
          viator_net_less_commission: number | null
          viator_payout: number | null
        }
        Insert: {
          airbnb_commission?: number | null
          airbnb_gross_amount?: number | null
          airbnb_net_less_commission?: number | null
          airbnb_payout?: number | null
          boat_cost?: number | null
          booking_source?: string | null
          charter_date?: string | null
          charter_days?: number | null
          charter_total_net?: number | null
          clickboat_bank_tx_date?: string | null
          clickboat_charter_date?: string | null
          clickboat_commission?: number | null
          clickboat_days?: number | null
          clickboat_gross_amount?: number | null
          clickboat_net_less_commission?: number | null
          clickboat_payout?: number | null
          clickboat_ref?: string | null
          created_at?: string | null
          crew_cost?: number | null
          customer_name?: string | null
          direct_hire_gross?: number | null
          direct_hire_net?: number | null
          food_cost?: number | null
          fuel_cost?: number | null
          id?: number
          notes?: string | null
          pax?: number | null
          samboat_commission_no_vat?: number | null
          samboat_gross_amount?: number | null
          samboat_net_less_commission?: number | null
          samboat_payout_less_vat?: number | null
          sumup_amount?: number | null
          sumup_description?: string | null
          sumup_payment_date?: string | null
          total_net_commission?: number | null
          viator_commission?: number | null
          viator_gross_amount?: number | null
          viator_net_less_commission?: number | null
          viator_payout?: number | null
        }
        Update: {
          airbnb_commission?: number | null
          airbnb_gross_amount?: number | null
          airbnb_net_less_commission?: number | null
          airbnb_payout?: number | null
          boat_cost?: number | null
          booking_source?: string | null
          charter_date?: string | null
          charter_days?: number | null
          charter_total_net?: number | null
          clickboat_bank_tx_date?: string | null
          clickboat_charter_date?: string | null
          clickboat_commission?: number | null
          clickboat_days?: number | null
          clickboat_gross_amount?: number | null
          clickboat_net_less_commission?: number | null
          clickboat_payout?: number | null
          clickboat_ref?: string | null
          created_at?: string | null
          crew_cost?: number | null
          customer_name?: string | null
          direct_hire_gross?: number | null
          direct_hire_net?: number | null
          food_cost?: number | null
          fuel_cost?: number | null
          id?: number
          notes?: string | null
          pax?: number | null
          samboat_commission_no_vat?: number | null
          samboat_gross_amount?: number | null
          samboat_net_less_commission?: number | null
          samboat_payout_less_vat?: number | null
          sumup_amount?: number | null
          sumup_description?: string | null
          sumup_payment_date?: string | null
          total_net_commission?: number | null
          viator_commission?: number | null
          viator_gross_amount?: number | null
          viator_net_less_commission?: number | null
          viator_payout?: number | null
        }
        Relationships: []
      }
      customer_communications: {
        Row: {
          booking_id: number | null
          charter_overview_sent: boolean | null
          client_messaging_status: string | null
          created_at: string | null
          custom_message: string | null
          id: number
          locator: string | null
          message_template_used: string | null
          sent_at: string | null
          updated_at: string | null
          whatsapp_message_sent: boolean | null
        }
        Insert: {
          booking_id?: number | null
          charter_overview_sent?: boolean | null
          client_messaging_status?: string | null
          created_at?: string | null
          custom_message?: string | null
          id?: number
          locator?: string | null
          message_template_used?: string | null
          sent_at?: string | null
          updated_at?: string | null
          whatsapp_message_sent?: boolean | null
        }
        Update: {
          booking_id?: number | null
          charter_overview_sent?: boolean | null
          client_messaging_status?: string | null
          created_at?: string | null
          custom_message?: string | null
          id?: number
          locator?: string | null
          message_template_used?: string | null
          sent_at?: string | null
          updated_at?: string | null
          whatsapp_message_sent?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_communications_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_communications_locator_fkey"
            columns: ["locator"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["locator"]
          },
        ]
      }
      historical_charters: {
        Row: {
          boat: string | null
          booking_source: string | null
          booking_status: string | null
          charter_date: string | null
          charter_notes: string | null
          charter_total: number | null
          cleared_for_departure: boolean | null
          contract_signed: boolean | null
          created_at: string | null
          duration_hours: number | null
          end_time: string | null
          extras_total: number | null
          guest_name: string | null
          guest_phone: string | null
          guest_surname: string | null
          id: number
          locator: string | null
          outstanding_amount: number | null
          paid_amount: number | null
          payment_status: string | null
          pre_departure_checks: boolean | null
          skipper_assigned: string | null
          start_time: string | null
          total_guests: number | null
          total_revenue: number | null
          updated_at: string | null
          weather_conditions: string | null
          year: number
        }
        Insert: {
          boat?: string | null
          booking_source?: string | null
          booking_status?: string | null
          charter_date?: string | null
          charter_notes?: string | null
          charter_total?: number | null
          cleared_for_departure?: boolean | null
          contract_signed?: boolean | null
          created_at?: string | null
          duration_hours?: number | null
          end_time?: string | null
          extras_total?: number | null
          guest_name?: string | null
          guest_phone?: string | null
          guest_surname?: string | null
          id?: number
          locator?: string | null
          outstanding_amount?: number | null
          paid_amount?: number | null
          payment_status?: string | null
          pre_departure_checks?: boolean | null
          skipper_assigned?: string | null
          start_time?: string | null
          total_guests?: number | null
          total_revenue?: number | null
          updated_at?: string | null
          weather_conditions?: string | null
          year: number
        }
        Update: {
          boat?: string | null
          booking_source?: string | null
          booking_status?: string | null
          charter_date?: string | null
          charter_notes?: string | null
          charter_total?: number | null
          cleared_for_departure?: boolean | null
          contract_signed?: boolean | null
          created_at?: string | null
          duration_hours?: number | null
          end_time?: string | null
          extras_total?: number | null
          guest_name?: string | null
          guest_phone?: string | null
          guest_surname?: string | null
          id?: number
          locator?: string | null
          outstanding_amount?: number | null
          paid_amount?: number | null
          payment_status?: string | null
          pre_departure_checks?: boolean | null
          skipper_assigned?: string | null
          start_time?: string | null
          total_guests?: number | null
          total_revenue?: number | null
          updated_at?: string | null
          weather_conditions?: string | null
          year?: number
        }
        Relationships: []
      }
      operations: {
        Row: {
          booking_id: number | null
          catering_details: string | null
          charter_notes: string | null
          cleared_for_departure: boolean | null
          created_at: string | null
          extra_staff_count: number | null
          fuel_route: string | null
          gps_coordinates: string | null
          id: number
          locator: string | null
          meeting_point: string | null
          other_extras: string | null
          pre_departure_checks: boolean | null
          restaurant_booking: string | null
          skipper_name: string | null
          skipper_phone: string | null
          updated_at: string | null
          water_toys: string | null
        }
        Insert: {
          booking_id?: number | null
          catering_details?: string | null
          charter_notes?: string | null
          cleared_for_departure?: boolean | null
          created_at?: string | null
          extra_staff_count?: number | null
          fuel_route?: string | null
          gps_coordinates?: string | null
          id?: number
          locator?: string | null
          meeting_point?: string | null
          other_extras?: string | null
          pre_departure_checks?: boolean | null
          restaurant_booking?: string | null
          skipper_name?: string | null
          skipper_phone?: string | null
          updated_at?: string | null
          water_toys?: string | null
        }
        Update: {
          booking_id?: number | null
          catering_details?: string | null
          charter_notes?: string | null
          cleared_for_departure?: boolean | null
          created_at?: string | null
          extra_staff_count?: number | null
          fuel_route?: string | null
          gps_coordinates?: string | null
          id?: number
          locator?: string | null
          meeting_point?: string | null
          other_extras?: string | null
          pre_departure_checks?: boolean | null
          restaurant_booking?: string | null
          skipper_name?: string | null
          skipper_phone?: string | null
          updated_at?: string | null
          water_toys?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "operations_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "operations_locator_fkey"
            columns: ["locator"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["locator"]
          },
        ]
      }
      profiles: {
        Row: {
          active: boolean | null
          boat_access: string[] | null
          certifications: string[] | null
          company: string | null
          created_at: string | null
          email: string | null
          emergency_contact: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          boat_access?: string[] | null
          certifications?: string[] | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          emergency_contact?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          boat_access?: string[] | null
          certifications?: string[] | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          emergency_contact?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      raw_bookings: {
        Row: {
          andronautic_data: Json
          id: number
          imported_at: string | null
        }
        Insert: {
          andronautic_data: Json
          id?: number
          imported_at?: string | null
        }
        Update: {
          andronautic_data?: Json
          id?: number
          imported_at?: string | null
        }
        Relationships: []
      }
      raw_invoices: {
        Row: {
          andronautic_data: Json
          id: number
          imported_at: string | null
        }
        Insert: {
          andronautic_data: Json
          id?: number
          imported_at?: string | null
        }
        Update: {
          andronautic_data?: Json
          id?: number
          imported_at?: string | null
        }
        Relationships: []
      }
      seasonal_performance: {
        Row: {
          actual_average_charter_value: number | null
          actual_charter_count: number | null
          actual_charter_hours: number | null
          actual_charter_revenue: number | null
          actual_crew_costs: number | null
          actual_extras_revenue: number | null
          actual_food_costs: number | null
          actual_fuel_costs: number | null
          actual_gross_profit: number | null
          actual_maintenance_costs: number | null
          actual_net_profit: number | null
          actual_occupancy_rate: number | null
          actual_profit_margin: number | null
          actual_total_costs: number | null
          actual_total_guests: number | null
          actual_total_revenue: number | null
          boat_name: string | null
          cost_variance_amount: number | null
          created_at: string | null
          id: number
          notes: string | null
          occupancy_variance_percent: number | null
          performance_month: number | null
          performance_rating: string | null
          performance_year: number
          repeat_customer_percentage: number | null
          revenue_variance_amount: number | null
          revenue_variance_percent: number | null
          seasonal_factor: number | null
          updated_at: string | null
        }
        Insert: {
          actual_average_charter_value?: number | null
          actual_charter_count?: number | null
          actual_charter_hours?: number | null
          actual_charter_revenue?: number | null
          actual_crew_costs?: number | null
          actual_extras_revenue?: number | null
          actual_food_costs?: number | null
          actual_fuel_costs?: number | null
          actual_gross_profit?: number | null
          actual_maintenance_costs?: number | null
          actual_net_profit?: number | null
          actual_occupancy_rate?: number | null
          actual_profit_margin?: number | null
          actual_total_costs?: number | null
          actual_total_guests?: number | null
          actual_total_revenue?: number | null
          boat_name?: string | null
          cost_variance_amount?: number | null
          created_at?: string | null
          id?: number
          notes?: string | null
          occupancy_variance_percent?: number | null
          performance_month?: number | null
          performance_rating?: string | null
          performance_year: number
          repeat_customer_percentage?: number | null
          revenue_variance_amount?: number | null
          revenue_variance_percent?: number | null
          seasonal_factor?: number | null
          updated_at?: string | null
        }
        Update: {
          actual_average_charter_value?: number | null
          actual_charter_count?: number | null
          actual_charter_hours?: number | null
          actual_charter_revenue?: number | null
          actual_crew_costs?: number | null
          actual_extras_revenue?: number | null
          actual_food_costs?: number | null
          actual_fuel_costs?: number | null
          actual_gross_profit?: number | null
          actual_maintenance_costs?: number | null
          actual_net_profit?: number | null
          actual_occupancy_rate?: number | null
          actual_profit_margin?: number | null
          actual_total_costs?: number | null
          actual_total_guests?: number | null
          actual_total_revenue?: number | null
          boat_name?: string | null
          cost_variance_amount?: number | null
          created_at?: string | null
          id?: number
          notes?: string | null
          occupancy_variance_percent?: number | null
          performance_month?: number | null
          performance_rating?: string | null
          performance_year?: number
          repeat_customer_percentage?: number | null
          revenue_variance_amount?: number | null
          revenue_variance_percent?: number | null
          seasonal_factor?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      zatara_2023_charters: {
        Row: {
          boat: string | null
          booking_source: string | null
          catering_type: string | null
          charter_count: number | null
          charter_date: string | null
          charter_days: number | null
          charter_total: number | null
          created_at: string | null
          crew_costs: number | null
          customer_name: string | null
          extras_details: string | null
          five_star_review: boolean | null
          food_costs: number | null
          fuel_costs: number | null
          id: number
          invoice_number: string | null
          kids: number | null
          net_revenue: number | null
          notes: string | null
          payments_received: number | null
          port_payment: number | null
          total_pax: number | null
        }
        Insert: {
          boat?: string | null
          booking_source?: string | null
          catering_type?: string | null
          charter_count?: number | null
          charter_date?: string | null
          charter_days?: number | null
          charter_total?: number | null
          created_at?: string | null
          crew_costs?: number | null
          customer_name?: string | null
          extras_details?: string | null
          five_star_review?: boolean | null
          food_costs?: number | null
          fuel_costs?: number | null
          id?: number
          invoice_number?: string | null
          kids?: number | null
          net_revenue?: number | null
          notes?: string | null
          payments_received?: number | null
          port_payment?: number | null
          total_pax?: number | null
        }
        Update: {
          boat?: string | null
          booking_source?: string | null
          catering_type?: string | null
          charter_count?: number | null
          charter_date?: string | null
          charter_days?: number | null
          charter_total?: number | null
          created_at?: string | null
          crew_costs?: number | null
          customer_name?: string | null
          extras_details?: string | null
          five_star_review?: boolean | null
          food_costs?: number | null
          fuel_costs?: number | null
          id?: number
          invoice_number?: string | null
          kids?: number | null
          net_revenue?: number | null
          notes?: string | null
          payments_received?: number | null
          port_payment?: number | null
          total_pax?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      charter_data: {
        Row: {
          boat: string | null
          charter_date: string | null
          guest_name: string | null
          locator: string | null
          status: string | null
        }
        Relationships: []
      }
      operations_data: {
        Row: {
          boat: string | null
          charter_datetime: string | null
          guest_name: string | null
          locator: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      bytea_to_text: {
        Args: { data: string }
        Returns: string
      }
      http: {
        Args: { request: Database["public"]["CompositeTypes"]["http_request"] }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_delete: {
        Args:
          | { uri: string }
          | { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_get: {
        Args: { uri: string } | { uri: string; data: Json }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_head: {
        Args: { uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_header: {
        Args: { field: string; value: string }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
      }
      http_list_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_post: {
        Args:
          | { uri: string; content: string; content_type: string }
          | { uri: string; data: Json }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_put: {
        Args: { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      http_set_curlopt: {
        Args: { curlopt: string; value: string }
        Returns: boolean
      }
      text_to_bytea: {
        Args: { data: string }
        Returns: string
      }
      urlencode: {
        Args: { data: Json } | { string: string } | { string: string }
        Returns: string
      }
    }
    Enums: {
      user_role:
        | "staff"
        | "skippers"
        | "management"
        | "owners"
        | "casual_staff"
        | "charter_brokers"
        | "boat_owners"
        | "charter_clients"
        | "boat_club_clients"
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown | null
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: [
        "staff",
        "skippers",
        "management",
        "owners",
        "casual_staff",
        "charter_brokers",
        "boat_owners",
        "charter_clients",
        "boat_club_clients",
      ],
    },
  },
} as const
