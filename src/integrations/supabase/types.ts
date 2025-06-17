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
      api_sync_status: {
        Row: {
          api_credentials_valid: boolean | null
          api_endpoint: string | null
          average_sync_duration: number | null
          consecutive_failures: number | null
          created_at: string | null
          data_freshness_hours: number | null
          error_count: number | null
          id: number
          last_error_message: string | null
          last_successful_sync: string | null
          last_sync_timestamp: string | null
          max_consecutive_failures: number | null
          next_scheduled_sync: string | null
          platform_name: string
          rate_limit_remaining: number | null
          rate_limit_reset: string | null
          records_synced_last_run: number | null
          sync_duration_seconds: number | null
          sync_frequency_minutes: number | null
          sync_priority: number | null
          sync_status: string | null
          sync_type: string
          total_records_synced: number | null
          updated_at: string | null
        }
        Insert: {
          api_credentials_valid?: boolean | null
          api_endpoint?: string | null
          average_sync_duration?: number | null
          consecutive_failures?: number | null
          created_at?: string | null
          data_freshness_hours?: number | null
          error_count?: number | null
          id?: number
          last_error_message?: string | null
          last_successful_sync?: string | null
          last_sync_timestamp?: string | null
          max_consecutive_failures?: number | null
          next_scheduled_sync?: string | null
          platform_name: string
          rate_limit_remaining?: number | null
          rate_limit_reset?: string | null
          records_synced_last_run?: number | null
          sync_duration_seconds?: number | null
          sync_frequency_minutes?: number | null
          sync_priority?: number | null
          sync_status?: string | null
          sync_type: string
          total_records_synced?: number | null
          updated_at?: string | null
        }
        Update: {
          api_credentials_valid?: boolean | null
          api_endpoint?: string | null
          average_sync_duration?: number | null
          consecutive_failures?: number | null
          created_at?: string | null
          data_freshness_hours?: number | null
          error_count?: number | null
          id?: number
          last_error_message?: string | null
          last_successful_sync?: string | null
          last_sync_timestamp?: string | null
          max_consecutive_failures?: number | null
          next_scheduled_sync?: string | null
          platform_name?: string
          rate_limit_remaining?: number | null
          rate_limit_reset?: string | null
          records_synced_last_run?: number | null
          sync_duration_seconds?: number | null
          sync_frequency_minutes?: number | null
          sync_priority?: number | null
          sync_status?: string | null
          sync_type?: string
          total_records_synced?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          approval_required: boolean | null
          approved_by: string | null
          automated_change: boolean | null
          business_context: string | null
          business_impact_score: number | null
          change_batch_id: string | null
          change_category: string | null
          change_reason: string | null
          change_size_bytes: number | null
          compliance_relevant: boolean | null
          created_at: string | null
          data_sensitivity: string | null
          external_reference: string | null
          field_changes: Json | null
          id: number
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          operation_type: string
          performance_impact_ms: number | null
          record_id: string
          retention_period_days: number | null
          risk_level: string | null
          rollback_possible: boolean | null
          rollback_sql: string | null
          session_id: string | null
          system_process: string | null
          table_name: string
          user_agent: string | null
          user_id: string | null
          user_role: string | null
          validation_status: string | null
        }
        Insert: {
          approval_required?: boolean | null
          approved_by?: string | null
          automated_change?: boolean | null
          business_context?: string | null
          business_impact_score?: number | null
          change_batch_id?: string | null
          change_category?: string | null
          change_reason?: string | null
          change_size_bytes?: number | null
          compliance_relevant?: boolean | null
          created_at?: string | null
          data_sensitivity?: string | null
          external_reference?: string | null
          field_changes?: Json | null
          id?: number
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          operation_type: string
          performance_impact_ms?: number | null
          record_id: string
          retention_period_days?: number | null
          risk_level?: string | null
          rollback_possible?: boolean | null
          rollback_sql?: string | null
          session_id?: string | null
          system_process?: string | null
          table_name: string
          user_agent?: string | null
          user_id?: string | null
          user_role?: string | null
          validation_status?: string | null
        }
        Update: {
          approval_required?: boolean | null
          approved_by?: string | null
          automated_change?: boolean | null
          business_context?: string | null
          business_impact_score?: number | null
          change_batch_id?: string | null
          change_category?: string | null
          change_reason?: string | null
          change_size_bytes?: number | null
          compliance_relevant?: boolean | null
          created_at?: string | null
          data_sensitivity?: string | null
          external_reference?: string | null
          field_changes?: Json | null
          id?: number
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          operation_type?: string
          performance_impact_ms?: number | null
          record_id?: string
          retention_period_days?: number | null
          risk_level?: string | null
          rollback_possible?: boolean | null
          rollback_sql?: string | null
          session_id?: string | null
          system_process?: string | null
          table_name?: string
          user_agent?: string | null
          user_id?: string | null
          user_role?: string | null
          validation_status?: string | null
        }
        Relationships: []
      }
      automated_triggers: {
        Row: {
          action_parameters: Json
          action_type: string
          applies_to_boats: string[] | null
          applies_to_booking_sources: string[] | null
          average_execution_time: number | null
          business_hours_only: boolean | null
          created_at: string | null
          created_by: string | null
          delay_minutes: number | null
          error_count: number | null
          execution_count: number | null
          id: number
          last_error_message: string | null
          last_executed: string | null
          last_modified_by: string | null
          priority_level: number | null
          success_rate: number | null
          test_mode: boolean | null
          trigger_conditions: Json
          trigger_description: string | null
          trigger_name: string
          trigger_status: string | null
          trigger_type: string
          updated_at: string | null
        }
        Insert: {
          action_parameters: Json
          action_type: string
          applies_to_boats?: string[] | null
          applies_to_booking_sources?: string[] | null
          average_execution_time?: number | null
          business_hours_only?: boolean | null
          created_at?: string | null
          created_by?: string | null
          delay_minutes?: number | null
          error_count?: number | null
          execution_count?: number | null
          id?: number
          last_error_message?: string | null
          last_executed?: string | null
          last_modified_by?: string | null
          priority_level?: number | null
          success_rate?: number | null
          test_mode?: boolean | null
          trigger_conditions: Json
          trigger_description?: string | null
          trigger_name: string
          trigger_status?: string | null
          trigger_type: string
          updated_at?: string | null
        }
        Update: {
          action_parameters?: Json
          action_type?: string
          applies_to_boats?: string[] | null
          applies_to_booking_sources?: string[] | null
          average_execution_time?: number | null
          business_hours_only?: boolean | null
          created_at?: string | null
          created_by?: string | null
          delay_minutes?: number | null
          error_count?: number | null
          execution_count?: number | null
          id?: number
          last_error_message?: string | null
          last_executed?: string | null
          last_modified_by?: string | null
          priority_level?: number | null
          success_rate?: number | null
          test_mode?: boolean | null
          trigger_conditions?: Json
          trigger_description?: string | null
          trigger_name?: string
          trigger_status?: string | null
          trigger_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      boat_availability: {
        Row: {
          availability_date: string
          availability_status: string | null
          base_price: number | null
          boat_name: string
          booking_locator: string | null
          booking_platform: string | null
          cancellation_deadline_hours: number | null
          capacity_guests: number | null
          created_at: string | null
          current_price: number | null
          id: number
          maximum_duration_hours: number | null
          minimum_duration_hours: number | null
          minimum_notice_hours: number | null
          peak_season_multiplier: number | null
          pricing_notes: string | null
          recurring_pattern: string | null
          seasonal_availability: boolean | null
          skipper_required: boolean | null
          slot_type: string | null
          special_requirements: string | null
          time_slot_end: string
          time_slot_start: string
          updated_at: string | null
          weather_dependent: boolean | null
        }
        Insert: {
          availability_date: string
          availability_status?: string | null
          base_price?: number | null
          boat_name: string
          booking_locator?: string | null
          booking_platform?: string | null
          cancellation_deadline_hours?: number | null
          capacity_guests?: number | null
          created_at?: string | null
          current_price?: number | null
          id?: number
          maximum_duration_hours?: number | null
          minimum_duration_hours?: number | null
          minimum_notice_hours?: number | null
          peak_season_multiplier?: number | null
          pricing_notes?: string | null
          recurring_pattern?: string | null
          seasonal_availability?: boolean | null
          skipper_required?: boolean | null
          slot_type?: string | null
          special_requirements?: string | null
          time_slot_end: string
          time_slot_start: string
          updated_at?: string | null
          weather_dependent?: boolean | null
        }
        Update: {
          availability_date?: string
          availability_status?: string | null
          base_price?: number | null
          boat_name?: string
          booking_locator?: string | null
          booking_platform?: string | null
          cancellation_deadline_hours?: number | null
          capacity_guests?: number | null
          created_at?: string | null
          current_price?: number | null
          id?: number
          maximum_duration_hours?: number | null
          minimum_duration_hours?: number | null
          minimum_notice_hours?: number | null
          peak_season_multiplier?: number | null
          pricing_notes?: string | null
          recurring_pattern?: string | null
          seasonal_availability?: boolean | null
          skipper_required?: boolean | null
          slot_type?: string | null
          special_requirements?: string | null
          time_slot_end?: string
          time_slot_start?: string
          updated_at?: string | null
          weather_dependent?: boolean | null
        }
        Relationships: []
      }
      booking_conflicts: {
        Row: {
          auto_resolution_possible: boolean | null
          boat_affected: string | null
          business_impact: number | null
          conflict_date: string
          conflict_description: string | null
          conflict_severity: string | null
          conflict_time_end: string | null
          conflict_time_start: string | null
          conflict_type: string
          conflicting_booking_locator: string | null
          created_at: string | null
          customer_impact_score: number | null
          detected_by: string | null
          detection_timestamp: string | null
          escalated_to: string | null
          escalation_level: number | null
          follow_up_required: boolean | null
          id: number
          manual_intervention_required: boolean | null
          primary_booking_locator: string | null
          resolution_method: string | null
          resolution_notes: string | null
          resolution_status: string | null
          resolved_at: string | null
          resolved_by: string | null
          updated_at: string | null
        }
        Insert: {
          auto_resolution_possible?: boolean | null
          boat_affected?: string | null
          business_impact?: number | null
          conflict_date: string
          conflict_description?: string | null
          conflict_severity?: string | null
          conflict_time_end?: string | null
          conflict_time_start?: string | null
          conflict_type: string
          conflicting_booking_locator?: string | null
          created_at?: string | null
          customer_impact_score?: number | null
          detected_by?: string | null
          detection_timestamp?: string | null
          escalated_to?: string | null
          escalation_level?: number | null
          follow_up_required?: boolean | null
          id?: number
          manual_intervention_required?: boolean | null
          primary_booking_locator?: string | null
          resolution_method?: string | null
          resolution_notes?: string | null
          resolution_status?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          updated_at?: string | null
        }
        Update: {
          auto_resolution_possible?: boolean | null
          boat_affected?: string | null
          business_impact?: number | null
          conflict_date?: string
          conflict_description?: string | null
          conflict_severity?: string | null
          conflict_time_end?: string | null
          conflict_time_start?: string | null
          conflict_type?: string
          conflicting_booking_locator?: string | null
          created_at?: string | null
          customer_impact_score?: number | null
          detected_by?: string | null
          detection_timestamp?: string | null
          escalated_to?: string | null
          escalation_level?: number | null
          follow_up_required?: boolean | null
          id?: number
          manual_intervention_required?: boolean | null
          primary_booking_locator?: string | null
          resolution_method?: string | null
          resolution_notes?: string | null
          resolution_status?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
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
      calendar_sync: {
        Row: {
          active: boolean | null
          auto_create_events: boolean | null
          auto_update_events: boolean | null
          boat_filter: string | null
          calendar_id: string
          calendar_name: string | null
          calendar_owner: string | null
          calendar_permissions: string | null
          calendar_type: string
          color_coding_rules: Json | null
          conflict_resolution: string | null
          created_at: string | null
          event_description_template: string | null
          event_title_template: string | null
          event_type_filter: string[] | null
          id: number
          include_guest_details: boolean | null
          include_payment_status: boolean | null
          last_error_message: string | null
          last_sync_timestamp: string | null
          notification_settings: Json | null
          sync_direction: string | null
          sync_errors_count: number | null
          sync_frequency_minutes: number | null
          sync_status: string | null
          sync_token: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          auto_create_events?: boolean | null
          auto_update_events?: boolean | null
          boat_filter?: string | null
          calendar_id: string
          calendar_name?: string | null
          calendar_owner?: string | null
          calendar_permissions?: string | null
          calendar_type: string
          color_coding_rules?: Json | null
          conflict_resolution?: string | null
          created_at?: string | null
          event_description_template?: string | null
          event_title_template?: string | null
          event_type_filter?: string[] | null
          id?: number
          include_guest_details?: boolean | null
          include_payment_status?: boolean | null
          last_error_message?: string | null
          last_sync_timestamp?: string | null
          notification_settings?: Json | null
          sync_direction?: string | null
          sync_errors_count?: number | null
          sync_frequency_minutes?: number | null
          sync_status?: string | null
          sync_token?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          auto_create_events?: boolean | null
          auto_update_events?: boolean | null
          boat_filter?: string | null
          calendar_id?: string
          calendar_name?: string | null
          calendar_owner?: string | null
          calendar_permissions?: string | null
          calendar_type?: string
          color_coding_rules?: Json | null
          conflict_resolution?: string | null
          created_at?: string | null
          event_description_template?: string | null
          event_title_template?: string | null
          event_type_filter?: string[] | null
          id?: number
          include_guest_details?: boolean | null
          include_payment_status?: boolean | null
          last_error_message?: string | null
          last_sync_timestamp?: string | null
          notification_settings?: Json | null
          sync_direction?: string | null
          sync_errors_count?: number | null
          sync_frequency_minutes?: number | null
          sync_status?: string | null
          sync_token?: string | null
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
      checklist_instances: {
        Row: {
          assigned_to: string | null
          boat_name: string | null
          booking_locator: string | null
          checklist_results: Json | null
          checklist_status: string | null
          completed_by: string | null
          completion_date: string | null
          completion_notes: string | null
          corrective_actions: string[] | null
          created_at: string | null
          critical_items_passed: number | null
          environmental_factors: string | null
          equipment_used: string[] | null
          follow_up_items: string[] | null
          follow_up_required: boolean | null
          id: number
          instance_name: string | null
          issues_identified: string[] | null
          items_failed: number | null
          items_na: number | null
          items_passed: number | null
          overall_score: number | null
          photos_attached: number | null
          quality_rating: number | null
          review_notes: string | null
          review_status: string | null
          reviewer: string | null
          signatures_collected: boolean | null
          started_at: string | null
          template_id: number | null
          time_pressure_factors: string | null
          total_items_count: number | null
          updated_at: string | null
          weather_conditions: string | null
        }
        Insert: {
          assigned_to?: string | null
          boat_name?: string | null
          booking_locator?: string | null
          checklist_results?: Json | null
          checklist_status?: string | null
          completed_by?: string | null
          completion_date?: string | null
          completion_notes?: string | null
          corrective_actions?: string[] | null
          created_at?: string | null
          critical_items_passed?: number | null
          environmental_factors?: string | null
          equipment_used?: string[] | null
          follow_up_items?: string[] | null
          follow_up_required?: boolean | null
          id?: number
          instance_name?: string | null
          issues_identified?: string[] | null
          items_failed?: number | null
          items_na?: number | null
          items_passed?: number | null
          overall_score?: number | null
          photos_attached?: number | null
          quality_rating?: number | null
          review_notes?: string | null
          review_status?: string | null
          reviewer?: string | null
          signatures_collected?: boolean | null
          started_at?: string | null
          template_id?: number | null
          time_pressure_factors?: string | null
          total_items_count?: number | null
          updated_at?: string | null
          weather_conditions?: string | null
        }
        Update: {
          assigned_to?: string | null
          boat_name?: string | null
          booking_locator?: string | null
          checklist_results?: Json | null
          checklist_status?: string | null
          completed_by?: string | null
          completion_date?: string | null
          completion_notes?: string | null
          corrective_actions?: string[] | null
          created_at?: string | null
          critical_items_passed?: number | null
          environmental_factors?: string | null
          equipment_used?: string[] | null
          follow_up_items?: string[] | null
          follow_up_required?: boolean | null
          id?: number
          instance_name?: string | null
          issues_identified?: string[] | null
          items_failed?: number | null
          items_na?: number | null
          items_passed?: number | null
          overall_score?: number | null
          photos_attached?: number | null
          quality_rating?: number | null
          review_notes?: string | null
          review_status?: string | null
          reviewer?: string | null
          signatures_collected?: boolean | null
          started_at?: string | null
          template_id?: number | null
          time_pressure_factors?: string | null
          total_items_count?: number | null
          updated_at?: string | null
          weather_conditions?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "checklist_instances_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "checklist_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      checklist_templates: {
        Row: {
          applicable_boats: string[] | null
          approved_by: string | null
          checklist_category: string
          checklist_items: Json
          created_at: string | null
          created_by: string | null
          critical_items_count: number | null
          escalation_rules: Json | null
          estimated_completion_minutes: number | null
          failure_protocols: string | null
          id: number
          insurance_requirement: boolean | null
          last_review_date: string | null
          next_review_date: string | null
          quality_standards: string | null
          regulatory_requirement: boolean | null
          required_role: string | null
          requires_photo_evidence: number | null
          requires_signatures: boolean | null
          seasonal_variations: Json | null
          template_description: string | null
          template_name: string
          template_status: string | null
          template_version: string | null
          updated_at: string | null
          usage_statistics: Json | null
          weather_dependent_items: Json | null
        }
        Insert: {
          applicable_boats?: string[] | null
          approved_by?: string | null
          checklist_category: string
          checklist_items: Json
          created_at?: string | null
          created_by?: string | null
          critical_items_count?: number | null
          escalation_rules?: Json | null
          estimated_completion_minutes?: number | null
          failure_protocols?: string | null
          id?: number
          insurance_requirement?: boolean | null
          last_review_date?: string | null
          next_review_date?: string | null
          quality_standards?: string | null
          regulatory_requirement?: boolean | null
          required_role?: string | null
          requires_photo_evidence?: number | null
          requires_signatures?: boolean | null
          seasonal_variations?: Json | null
          template_description?: string | null
          template_name: string
          template_status?: string | null
          template_version?: string | null
          updated_at?: string | null
          usage_statistics?: Json | null
          weather_dependent_items?: Json | null
        }
        Update: {
          applicable_boats?: string[] | null
          approved_by?: string | null
          checklist_category?: string
          checklist_items?: Json
          created_at?: string | null
          created_by?: string | null
          critical_items_count?: number | null
          escalation_rules?: Json | null
          estimated_completion_minutes?: number | null
          failure_protocols?: string | null
          id?: number
          insurance_requirement?: boolean | null
          last_review_date?: string | null
          next_review_date?: string | null
          quality_standards?: string | null
          regulatory_requirement?: boolean | null
          required_role?: string | null
          requires_photo_evidence?: number | null
          requires_signatures?: boolean | null
          seasonal_variations?: Json | null
          template_description?: string | null
          template_name?: string
          template_status?: string | null
          template_version?: string | null
          updated_at?: string | null
          usage_statistics?: Json | null
          weather_dependent_items?: Json | null
        }
        Relationships: []
      }
      comparative_analytics: {
        Row: {
          absolute_difference: number | null
          analysis_category: string
          analysis_date: string
          analysis_name: string
          analysis_reliability_score: number | null
          analysis_type: string
          analyst: string | null
          benchmark_comparison: number | null
          business_impact_analysis: string | null
          comparison_period_1: string
          comparison_period_2: string
          competitive_insights: string | null
          contributing_factors: string[] | null
          correlation_factors: Json | null
          created_at: string | null
          data_normalization_method: string | null
          data_quality_score: number | null
          difference_significance: string | null
          external_influences: string[] | null
          forecast_implications: string | null
          id: number
          industry_context: string | null
          metric_analyzed: string
          outliers_removed: number | null
          percentage_difference: number | null
          performance_ranking: number | null
          recommended_actions: string[] | null
          review_status: string | null
          reviewed_by: string | null
          risk_factors: string[] | null
          sample_size_1: number | null
          sample_size_2: number | null
          seasonal_adjustments_applied: boolean | null
          statistical_confidence: number | null
          strategic_implications: string[] | null
          success_metrics: string[] | null
          trend_interpretation: string | null
          updated_at: string | null
          value_period_1: number | null
          value_period_2: number | null
          variance_analysis: Json | null
        }
        Insert: {
          absolute_difference?: number | null
          analysis_category: string
          analysis_date: string
          analysis_name: string
          analysis_reliability_score?: number | null
          analysis_type: string
          analyst?: string | null
          benchmark_comparison?: number | null
          business_impact_analysis?: string | null
          comparison_period_1: string
          comparison_period_2: string
          competitive_insights?: string | null
          contributing_factors?: string[] | null
          correlation_factors?: Json | null
          created_at?: string | null
          data_normalization_method?: string | null
          data_quality_score?: number | null
          difference_significance?: string | null
          external_influences?: string[] | null
          forecast_implications?: string | null
          id?: number
          industry_context?: string | null
          metric_analyzed: string
          outliers_removed?: number | null
          percentage_difference?: number | null
          performance_ranking?: number | null
          recommended_actions?: string[] | null
          review_status?: string | null
          reviewed_by?: string | null
          risk_factors?: string[] | null
          sample_size_1?: number | null
          sample_size_2?: number | null
          seasonal_adjustments_applied?: boolean | null
          statistical_confidence?: number | null
          strategic_implications?: string[] | null
          success_metrics?: string[] | null
          trend_interpretation?: string | null
          updated_at?: string | null
          value_period_1?: number | null
          value_period_2?: number | null
          variance_analysis?: Json | null
        }
        Update: {
          absolute_difference?: number | null
          analysis_category?: string
          analysis_date?: string
          analysis_name?: string
          analysis_reliability_score?: number | null
          analysis_type?: string
          analyst?: string | null
          benchmark_comparison?: number | null
          business_impact_analysis?: string | null
          comparison_period_1?: string
          comparison_period_2?: string
          competitive_insights?: string | null
          contributing_factors?: string[] | null
          correlation_factors?: Json | null
          created_at?: string | null
          data_normalization_method?: string | null
          data_quality_score?: number | null
          difference_significance?: string | null
          external_influences?: string[] | null
          forecast_implications?: string | null
          id?: number
          industry_context?: string | null
          metric_analyzed?: string
          outliers_removed?: number | null
          percentage_difference?: number | null
          performance_ranking?: number | null
          recommended_actions?: string[] | null
          review_status?: string | null
          reviewed_by?: string | null
          risk_factors?: string[] | null
          sample_size_1?: number | null
          sample_size_2?: number | null
          seasonal_adjustments_applied?: boolean | null
          statistical_confidence?: number | null
          strategic_implications?: string[] | null
          success_metrics?: string[] | null
          trend_interpretation?: string | null
          updated_at?: string | null
          value_period_1?: number | null
          value_period_2?: number | null
          variance_analysis?: Json | null
        }
        Relationships: []
      }
      crew_scheduling: {
        Row: {
          active_status: boolean | null
          assigned_boat: string | null
          assigned_booking_locator: string | null
          availability_date: string
          availability_status: string | null
          boat_specializations: string[] | null
          certification_expiry: string | null
          certification_level: string | null
          contract_type: string | null
          created_at: string | null
          crew_member_name: string
          crew_role: string | null
          customer_feedback_score: number | null
          email: string | null
          emergency_contact: string | null
          experience_years: number | null
          hourly_rate: number | null
          id: number
          languages_spoken: string[] | null
          last_training_date: string | null
          medical_restrictions: string | null
          minimum_hours: number | null
          notes: string | null
          overtime_rate: number | null
          performance_rating: number | null
          phone_number: string | null
          preferred_charter_types: string[] | null
          reliability_score: number | null
          time_slot_end: string
          time_slot_start: string
          travel_distance_km: number | null
          updated_at: string | null
        }
        Insert: {
          active_status?: boolean | null
          assigned_boat?: string | null
          assigned_booking_locator?: string | null
          availability_date: string
          availability_status?: string | null
          boat_specializations?: string[] | null
          certification_expiry?: string | null
          certification_level?: string | null
          contract_type?: string | null
          created_at?: string | null
          crew_member_name: string
          crew_role?: string | null
          customer_feedback_score?: number | null
          email?: string | null
          emergency_contact?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: number
          languages_spoken?: string[] | null
          last_training_date?: string | null
          medical_restrictions?: string | null
          minimum_hours?: number | null
          notes?: string | null
          overtime_rate?: number | null
          performance_rating?: number | null
          phone_number?: string | null
          preferred_charter_types?: string[] | null
          reliability_score?: number | null
          time_slot_end: string
          time_slot_start: string
          travel_distance_km?: number | null
          updated_at?: string | null
        }
        Update: {
          active_status?: boolean | null
          assigned_boat?: string | null
          assigned_booking_locator?: string | null
          availability_date?: string
          availability_status?: string | null
          boat_specializations?: string[] | null
          certification_expiry?: string | null
          certification_level?: string | null
          contract_type?: string | null
          created_at?: string | null
          crew_member_name?: string
          crew_role?: string | null
          customer_feedback_score?: number | null
          email?: string | null
          emergency_contact?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: number
          languages_spoken?: string[] | null
          last_training_date?: string | null
          medical_restrictions?: string | null
          minimum_hours?: number | null
          notes?: string | null
          overtime_rate?: number | null
          performance_rating?: number | null
          phone_number?: string | null
          preferred_charter_types?: string[] | null
          reliability_score?: number | null
          time_slot_end?: string
          time_slot_start?: string
          travel_distance_km?: number | null
          updated_at?: string | null
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
          {
            foreignKeyName: "customer_communications_locator_fkey"
            columns: ["locator"]
            isOneToOne: false
            referencedRelation: "business_view_finance"
            referencedColumns: ["locator"]
          },
          {
            foreignKeyName: "customer_communications_locator_fkey"
            columns: ["locator"]
            isOneToOne: false
            referencedRelation: "business_view_operations"
            referencedColumns: ["locator"]
          },
          {
            foreignKeyName: "customer_communications_locator_fkey"
            columns: ["locator"]
            isOneToOne: false
            referencedRelation: "business_view_puravida_skipper"
            referencedColumns: ["locator"]
          },
          {
            foreignKeyName: "customer_communications_locator_fkey"
            columns: ["locator"]
            isOneToOne: false
            referencedRelation: "business_view_zatara_skipper"
            referencedColumns: ["locator"]
          },
        ]
      }
      customer_communications_log: {
        Row: {
          attachments: Json | null
          automated: boolean | null
          booking_locator: string | null
          communication_status: string | null
          communication_type: string
          created_at: string | null
          customer_id: number | null
          direction: string
          follow_up_date: string | null
          follow_up_required: boolean | null
          id: number
          message_content: string | null
          priority_level: number | null
          recipient: string | null
          related_inquiry: string | null
          response_time_minutes: number | null
          sender: string | null
          subject: string | null
          tags: string[] | null
          template_used: string | null
          updated_at: string | null
        }
        Insert: {
          attachments?: Json | null
          automated?: boolean | null
          booking_locator?: string | null
          communication_status?: string | null
          communication_type: string
          created_at?: string | null
          customer_id?: number | null
          direction: string
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: number
          message_content?: string | null
          priority_level?: number | null
          recipient?: string | null
          related_inquiry?: string | null
          response_time_minutes?: number | null
          sender?: string | null
          subject?: string | null
          tags?: string[] | null
          template_used?: string | null
          updated_at?: string | null
        }
        Update: {
          attachments?: Json | null
          automated?: boolean | null
          booking_locator?: string | null
          communication_status?: string | null
          communication_type?: string
          created_at?: string | null
          customer_id?: number | null
          direction?: string
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: number
          message_content?: string | null
          priority_level?: number | null
          recipient?: string | null
          related_inquiry?: string | null
          response_time_minutes?: number | null
          sender?: string | null
          subject?: string | null
          tags?: string[] | null
          template_used?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_communications_log_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_history: {
        Row: {
          boat_used: string | null
          booking_date: string | null
          booking_locator: string | null
          booking_source: string | null
          booking_status: string | null
          booking_value: number | null
          cancellation_reason: string | null
          charter_duration_hours: number | null
          created_at: string | null
          customer_id: number | null
          customer_satisfaction_score: number | null
          days_since_last_booking: number | null
          extras_value: number | null
          guests_count: number | null
          id: number
          payment_method: string | null
          repeat_booking: boolean | null
          revenue_impact: number | null
          seasonal_period: string | null
          total_value: number | null
          updated_at: string | null
        }
        Insert: {
          boat_used?: string | null
          booking_date?: string | null
          booking_locator?: string | null
          booking_source?: string | null
          booking_status?: string | null
          booking_value?: number | null
          cancellation_reason?: string | null
          charter_duration_hours?: number | null
          created_at?: string | null
          customer_id?: number | null
          customer_satisfaction_score?: number | null
          days_since_last_booking?: number | null
          extras_value?: number | null
          guests_count?: number | null
          id?: number
          payment_method?: string | null
          repeat_booking?: boolean | null
          revenue_impact?: number | null
          seasonal_period?: string | null
          total_value?: number | null
          updated_at?: string | null
        }
        Update: {
          boat_used?: string | null
          booking_date?: string | null
          booking_locator?: string | null
          booking_source?: string | null
          booking_status?: string | null
          booking_value?: number | null
          cancellation_reason?: string | null
          charter_duration_hours?: number | null
          created_at?: string | null
          customer_id?: number | null
          customer_satisfaction_score?: number | null
          days_since_last_booking?: number | null
          extras_value?: number | null
          guests_count?: number | null
          id?: number
          payment_method?: string | null
          repeat_booking?: boolean | null
          revenue_impact?: number | null
          seasonal_period?: string | null
          total_value?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_history_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_preferences: {
        Row: {
          active: boolean | null
          created_at: string | null
          customer_id: number | null
          id: number
          importance_level: number | null
          preference_category: string | null
          preference_notes: string | null
          preference_type: string
          preference_value: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          customer_id?: number | null
          id?: number
          importance_level?: number | null
          preference_category?: string | null
          preference_notes?: string | null
          preference_type: string
          preference_value?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          customer_id?: number | null
          id?: number
          importance_level?: number | null
          preference_category?: string | null
          preference_notes?: string | null
          preference_type?: string
          preference_value?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_preferences_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_reviews: {
        Row: {
          boat_rating: number | null
          booking_locator: string | null
          catering_rating: number | null
          created_at: string | null
          crew_rating: number | null
          customer_id: number | null
          featured_review: boolean | null
          id: number
          improvement_suggestions: string | null
          likely_to_return: number | null
          overall_rating: number | null
          photos_received: number | null
          photos_shared_permission: boolean | null
          public_visible: boolean | null
          recommend_to_others: boolean | null
          response_sent: boolean | null
          response_text: string | null
          review_highlights: string[] | null
          review_platform: string | null
          review_sentiment: string | null
          review_text: string | null
          review_title: string | null
          updated_at: string | null
          value_rating: number | null
        }
        Insert: {
          boat_rating?: number | null
          booking_locator?: string | null
          catering_rating?: number | null
          created_at?: string | null
          crew_rating?: number | null
          customer_id?: number | null
          featured_review?: boolean | null
          id?: number
          improvement_suggestions?: string | null
          likely_to_return?: number | null
          overall_rating?: number | null
          photos_received?: number | null
          photos_shared_permission?: boolean | null
          public_visible?: boolean | null
          recommend_to_others?: boolean | null
          response_sent?: boolean | null
          response_text?: string | null
          review_highlights?: string[] | null
          review_platform?: string | null
          review_sentiment?: string | null
          review_text?: string | null
          review_title?: string | null
          updated_at?: string | null
          value_rating?: number | null
        }
        Update: {
          boat_rating?: number | null
          booking_locator?: string | null
          catering_rating?: number | null
          created_at?: string | null
          crew_rating?: number | null
          customer_id?: number | null
          featured_review?: boolean | null
          id?: number
          improvement_suggestions?: string | null
          likely_to_return?: number | null
          overall_rating?: number | null
          photos_received?: number | null
          photos_shared_permission?: boolean | null
          public_visible?: boolean | null
          recommend_to_others?: boolean | null
          response_sent?: boolean | null
          response_text?: string | null
          review_highlights?: string[] | null
          review_platform?: string | null
          review_sentiment?: string | null
          review_text?: string | null
          review_title?: string | null
          updated_at?: string | null
          value_rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_reviews_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          acquisition_date: string | null
          acquisition_source: string | null
          average_booking_value: number | null
          created_at: string | null
          customer_key: string
          customer_lifetime_value: number | null
          customer_status: string | null
          email_primary: string | null
          email_secondary: string | null
          first_name: string | null
          full_name: string | null
          id: number
          language_preference: string | null
          last_booking_date: string | null
          last_name: string | null
          nationality: string | null
          notes: string | null
          phone_primary: string | null
          phone_secondary: string | null
          preferred_contact_method: string | null
          risk_score: number | null
          total_bookings: number | null
          total_spent: number | null
          updated_at: string | null
        }
        Insert: {
          acquisition_date?: string | null
          acquisition_source?: string | null
          average_booking_value?: number | null
          created_at?: string | null
          customer_key: string
          customer_lifetime_value?: number | null
          customer_status?: string | null
          email_primary?: string | null
          email_secondary?: string | null
          first_name?: string | null
          full_name?: string | null
          id?: number
          language_preference?: string | null
          last_booking_date?: string | null
          last_name?: string | null
          nationality?: string | null
          notes?: string | null
          phone_primary?: string | null
          phone_secondary?: string | null
          preferred_contact_method?: string | null
          risk_score?: number | null
          total_bookings?: number | null
          total_spent?: number | null
          updated_at?: string | null
        }
        Update: {
          acquisition_date?: string | null
          acquisition_source?: string | null
          average_booking_value?: number | null
          created_at?: string | null
          customer_key?: string
          customer_lifetime_value?: number | null
          customer_status?: string | null
          email_primary?: string | null
          email_secondary?: string | null
          first_name?: string | null
          full_name?: string | null
          id?: number
          language_preference?: string | null
          last_booking_date?: string | null
          last_name?: string | null
          nationality?: string | null
          notes?: string | null
          phone_primary?: string | null
          phone_secondary?: string | null
          preferred_contact_method?: string | null
          risk_score?: number | null
          total_bookings?: number | null
          total_spent?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      data_import_logs: {
        Row: {
          completed_at: string | null
          created_at: string | null
          data_date_range: Json | null
          data_validation_errors: number | null
          error_details: Json | null
          id: number
          import_file_size: number | null
          import_session_id: string
          import_status: string | null
          import_summary: Json | null
          import_trigger: string | null
          import_type: string
          imported_by: string | null
          platform_source: string
          processing_time_seconds: number | null
          records_attempted: number | null
          records_created: number | null
          records_duplicate: number | null
          records_failed: number | null
          records_successful: number | null
          records_updated: number | null
          rollback_info: Json | null
          rollback_possible: boolean | null
          validation_warnings: Json | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          data_date_range?: Json | null
          data_validation_errors?: number | null
          error_details?: Json | null
          id?: number
          import_file_size?: number | null
          import_session_id: string
          import_status?: string | null
          import_summary?: Json | null
          import_trigger?: string | null
          import_type: string
          imported_by?: string | null
          platform_source: string
          processing_time_seconds?: number | null
          records_attempted?: number | null
          records_created?: number | null
          records_duplicate?: number | null
          records_failed?: number | null
          records_successful?: number | null
          records_updated?: number | null
          rollback_info?: Json | null
          rollback_possible?: boolean | null
          validation_warnings?: Json | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          data_date_range?: Json | null
          data_validation_errors?: number | null
          error_details?: Json | null
          id?: number
          import_file_size?: number | null
          import_session_id?: string
          import_status?: string | null
          import_summary?: Json | null
          import_trigger?: string | null
          import_type?: string
          imported_by?: string | null
          platform_source?: string
          processing_time_seconds?: number | null
          records_attempted?: number | null
          records_created?: number | null
          records_duplicate?: number | null
          records_failed?: number | null
          records_successful?: number | null
          records_updated?: number | null
          rollback_info?: Json | null
          rollback_possible?: boolean | null
          validation_warnings?: Json | null
        }
        Relationships: []
      }
      data_integrity_checks: {
        Row: {
          auto_fix_enabled: boolean | null
          business_impact: string | null
          check_description: string | null
          check_name: string
          check_reliability_score: number | null
          check_results: Json | null
          check_schedule: string | null
          check_scope: string
          check_sql: string | null
          check_status: string | null
          check_type: string
          created_at: string | null
          created_by: string | null
          critical_issues: number | null
          data_quality_score: number | null
          escalation_required: boolean | null
          execution_duration_seconds: number | null
          expected_result_type: string | null
          false_positives: number | null
          fix_recommendations: string[] | null
          id: number
          info_issues: number | null
          issues_auto_fixed: number | null
          issues_details: Json | null
          issues_found: number | null
          last_execution: string | null
          manual_review_required: boolean | null
          next_execution: string | null
          notification_sent: boolean | null
          outstanding_issues: number | null
          performance_impact_score: number | null
          records_checked: number | null
          resolved_issues: number | null
          threshold_values: Json | null
          trend_analysis: Json | null
          updated_at: string | null
          warning_issues: number | null
        }
        Insert: {
          auto_fix_enabled?: boolean | null
          business_impact?: string | null
          check_description?: string | null
          check_name: string
          check_reliability_score?: number | null
          check_results?: Json | null
          check_schedule?: string | null
          check_scope: string
          check_sql?: string | null
          check_status?: string | null
          check_type: string
          created_at?: string | null
          created_by?: string | null
          critical_issues?: number | null
          data_quality_score?: number | null
          escalation_required?: boolean | null
          execution_duration_seconds?: number | null
          expected_result_type?: string | null
          false_positives?: number | null
          fix_recommendations?: string[] | null
          id?: number
          info_issues?: number | null
          issues_auto_fixed?: number | null
          issues_details?: Json | null
          issues_found?: number | null
          last_execution?: string | null
          manual_review_required?: boolean | null
          next_execution?: string | null
          notification_sent?: boolean | null
          outstanding_issues?: number | null
          performance_impact_score?: number | null
          records_checked?: number | null
          resolved_issues?: number | null
          threshold_values?: Json | null
          trend_analysis?: Json | null
          updated_at?: string | null
          warning_issues?: number | null
        }
        Update: {
          auto_fix_enabled?: boolean | null
          business_impact?: string | null
          check_description?: string | null
          check_name?: string
          check_reliability_score?: number | null
          check_results?: Json | null
          check_schedule?: string | null
          check_scope?: string
          check_sql?: string | null
          check_status?: string | null
          check_type?: string
          created_at?: string | null
          created_by?: string | null
          critical_issues?: number | null
          data_quality_score?: number | null
          escalation_required?: boolean | null
          execution_duration_seconds?: number | null
          expected_result_type?: string | null
          false_positives?: number | null
          fix_recommendations?: string[] | null
          id?: number
          info_issues?: number | null
          issues_auto_fixed?: number | null
          issues_details?: Json | null
          issues_found?: number | null
          last_execution?: string | null
          manual_review_required?: boolean | null
          next_execution?: string | null
          notification_sent?: boolean | null
          outstanding_issues?: number | null
          performance_impact_score?: number | null
          records_checked?: number | null
          resolved_issues?: number | null
          threshold_values?: Json | null
          trend_analysis?: Json | null
          updated_at?: string | null
          warning_issues?: number | null
        }
        Relationships: []
      }
      data_validation_rules: {
        Row: {
          active: boolean | null
          applies_to_platforms: string[] | null
          auto_fix_function: string | null
          auto_fix_possible: boolean | null
          business_impact: string | null
          created_at: string | null
          error_message: string | null
          error_severity: string | null
          field_name: string
          id: number
          rule_name: string
          rule_priority: number | null
          table_name: string
          updated_at: string | null
          validation_rule: Json
          validation_type: string
        }
        Insert: {
          active?: boolean | null
          applies_to_platforms?: string[] | null
          auto_fix_function?: string | null
          auto_fix_possible?: boolean | null
          business_impact?: string | null
          created_at?: string | null
          error_message?: string | null
          error_severity?: string | null
          field_name: string
          id?: number
          rule_name: string
          rule_priority?: number | null
          table_name: string
          updated_at?: string | null
          validation_rule: Json
          validation_type: string
        }
        Update: {
          active?: boolean | null
          applies_to_platforms?: string[] | null
          auto_fix_function?: string | null
          auto_fix_possible?: boolean | null
          business_impact?: string | null
          created_at?: string | null
          error_message?: string | null
          error_severity?: string | null
          field_name?: string
          id?: number
          rule_name?: string
          rule_priority?: number | null
          table_name?: string
          updated_at?: string | null
          validation_rule?: Json
          validation_type?: string
        }
        Relationships: []
      }
      duplicate_detection: {
        Row: {
          auto_resolved: boolean | null
          business_impact: string | null
          confidence_score: number | null
          created_at: string | null
          detection_algorithm: string | null
          detection_status: string | null
          detection_type: string
          duplicate_platform: string | null
          duplicate_record_id: number | null
          duplicate_record_key: string | null
          id: number
          matching_criteria: Json | null
          primary_platform: string | null
          primary_record_id: number | null
          primary_record_key: string | null
          resolution_action: string | null
          resolution_notes: string | null
          resolved_at: string | null
          resolved_by: string | null
          review_required: boolean | null
        }
        Insert: {
          auto_resolved?: boolean | null
          business_impact?: string | null
          confidence_score?: number | null
          created_at?: string | null
          detection_algorithm?: string | null
          detection_status?: string | null
          detection_type: string
          duplicate_platform?: string | null
          duplicate_record_id?: number | null
          duplicate_record_key?: string | null
          id?: number
          matching_criteria?: Json | null
          primary_platform?: string | null
          primary_record_id?: number | null
          primary_record_key?: string | null
          resolution_action?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          review_required?: boolean | null
        }
        Update: {
          auto_resolved?: boolean | null
          business_impact?: string | null
          confidence_score?: number | null
          created_at?: string | null
          detection_algorithm?: string | null
          detection_status?: string | null
          detection_type?: string
          duplicate_platform?: string | null
          duplicate_record_id?: number | null
          duplicate_record_key?: string | null
          id?: number
          matching_criteria?: Json | null
          primary_platform?: string | null
          primary_record_id?: number | null
          primary_record_key?: string | null
          resolution_action?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          review_required?: boolean | null
        }
        Relationships: []
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
      maintenance_schedule: {
        Row: {
          actual_cost: number | null
          actual_end_date: string | null
          actual_start_date: string | null
          affects_bookings: boolean | null
          approved_by: string | null
          boat_name: string
          boat_operational: boolean | null
          completion_notes: string | null
          compliance_requirement: boolean | null
          created_at: string | null
          created_by: string | null
          description: string
          documentation_complete: boolean | null
          estimated_cost: number | null
          follow_up_date: string | null
          follow_up_required: boolean | null
          id: number
          insurance_claim: boolean | null
          labor_hours_actual: number | null
          labor_hours_estimated: number | null
          maintenance_category: string | null
          maintenance_status: string | null
          maintenance_type: string
          parts_cost: number | null
          parts_required: string[] | null
          priority_level: number | null
          quality_check_passed: boolean | null
          regulatory_deadline: string | null
          scheduled_end_date: string
          scheduled_end_time: string | null
          scheduled_start_date: string
          scheduled_start_time: string | null
          service_provider: string | null
          technician_assigned: string | null
          updated_at: string | null
          warranty_work: boolean | null
        }
        Insert: {
          actual_cost?: number | null
          actual_end_date?: string | null
          actual_start_date?: string | null
          affects_bookings?: boolean | null
          approved_by?: string | null
          boat_name: string
          boat_operational?: boolean | null
          completion_notes?: string | null
          compliance_requirement?: boolean | null
          created_at?: string | null
          created_by?: string | null
          description: string
          documentation_complete?: boolean | null
          estimated_cost?: number | null
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: number
          insurance_claim?: boolean | null
          labor_hours_actual?: number | null
          labor_hours_estimated?: number | null
          maintenance_category?: string | null
          maintenance_status?: string | null
          maintenance_type: string
          parts_cost?: number | null
          parts_required?: string[] | null
          priority_level?: number | null
          quality_check_passed?: boolean | null
          regulatory_deadline?: string | null
          scheduled_end_date: string
          scheduled_end_time?: string | null
          scheduled_start_date: string
          scheduled_start_time?: string | null
          service_provider?: string | null
          technician_assigned?: string | null
          updated_at?: string | null
          warranty_work?: boolean | null
        }
        Update: {
          actual_cost?: number | null
          actual_end_date?: string | null
          actual_start_date?: string | null
          affects_bookings?: boolean | null
          approved_by?: string | null
          boat_name?: string
          boat_operational?: boolean | null
          completion_notes?: string | null
          compliance_requirement?: boolean | null
          created_at?: string | null
          created_by?: string | null
          description?: string
          documentation_complete?: boolean | null
          estimated_cost?: number | null
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: number
          insurance_claim?: boolean | null
          labor_hours_actual?: number | null
          labor_hours_estimated?: number | null
          maintenance_category?: string | null
          maintenance_status?: string | null
          maintenance_type?: string
          parts_cost?: number | null
          parts_required?: string[] | null
          priority_level?: number | null
          quality_check_passed?: boolean | null
          regulatory_deadline?: string | null
          scheduled_end_date?: string
          scheduled_end_time?: string | null
          scheduled_start_date?: string
          scheduled_start_time?: string | null
          service_provider?: string | null
          technician_assigned?: string | null
          updated_at?: string | null
          warranty_work?: boolean | null
        }
        Relationships: []
      }
      message_field_mapping: {
        Row: {
          column_name: string
          created_at: string | null
          data_type: string | null
          display_name: string | null
          field_name: string
          id: number
          is_required: boolean | null
          table_source: string
        }
        Insert: {
          column_name: string
          created_at?: string | null
          data_type?: string | null
          display_name?: string | null
          field_name: string
          id?: number
          is_required?: boolean | null
          table_source: string
        }
        Update: {
          column_name?: string
          created_at?: string | null
          data_type?: string | null
          display_name?: string | null
          field_name?: string
          id?: number
          is_required?: boolean | null
          table_source?: string
        }
        Relationships: []
      }
      notification_queue: {
        Row: {
          attachment_paths: string[] | null
          business_hours_only: boolean | null
          confirmation_required: boolean | null
          cost: number | null
          created_at: string | null
          delivered_at: string | null
          delivery_method_preference: string | null
          delivery_status_details: Json | null
          error_details: string | null
          expiry_time: string | null
          id: number
          max_retries: number | null
          message_content: string
          notification_status: string | null
          notification_type: string
          personalization_data: Json | null
          priority_level: number | null
          read_at: string | null
          recipient: string
          recipient_type: string | null
          related_booking_locator: string | null
          related_task_id: number | null
          related_workflow_id: string | null
          response_content: string | null
          response_received: boolean | null
          retry_count: number | null
          scheduled_send_time: string | null
          sent_at: string | null
          subject: string | null
          template_used: string | null
          tracking_enabled: boolean | null
          trigger_source: string | null
          updated_at: string | null
        }
        Insert: {
          attachment_paths?: string[] | null
          business_hours_only?: boolean | null
          confirmation_required?: boolean | null
          cost?: number | null
          created_at?: string | null
          delivered_at?: string | null
          delivery_method_preference?: string | null
          delivery_status_details?: Json | null
          error_details?: string | null
          expiry_time?: string | null
          id?: number
          max_retries?: number | null
          message_content: string
          notification_status?: string | null
          notification_type: string
          personalization_data?: Json | null
          priority_level?: number | null
          read_at?: string | null
          recipient: string
          recipient_type?: string | null
          related_booking_locator?: string | null
          related_task_id?: number | null
          related_workflow_id?: string | null
          response_content?: string | null
          response_received?: boolean | null
          retry_count?: number | null
          scheduled_send_time?: string | null
          sent_at?: string | null
          subject?: string | null
          template_used?: string | null
          tracking_enabled?: boolean | null
          trigger_source?: string | null
          updated_at?: string | null
        }
        Update: {
          attachment_paths?: string[] | null
          business_hours_only?: boolean | null
          confirmation_required?: boolean | null
          cost?: number | null
          created_at?: string | null
          delivered_at?: string | null
          delivery_method_preference?: string | null
          delivery_status_details?: Json | null
          error_details?: string | null
          expiry_time?: string | null
          id?: number
          max_retries?: number | null
          message_content?: string
          notification_status?: string | null
          notification_type?: string
          personalization_data?: Json | null
          priority_level?: number | null
          read_at?: string | null
          recipient?: string
          recipient_type?: string | null
          related_booking_locator?: string | null
          related_task_id?: number | null
          related_workflow_id?: string | null
          response_content?: string | null
          response_received?: boolean | null
          retry_count?: number | null
          scheduled_send_time?: string | null
          sent_at?: string | null
          subject?: string | null
          template_used?: string | null
          tracking_enabled?: boolean | null
          trigger_source?: string | null
          updated_at?: string | null
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
          {
            foreignKeyName: "operations_locator_fkey"
            columns: ["locator"]
            isOneToOne: false
            referencedRelation: "business_view_finance"
            referencedColumns: ["locator"]
          },
          {
            foreignKeyName: "operations_locator_fkey"
            columns: ["locator"]
            isOneToOne: false
            referencedRelation: "business_view_operations"
            referencedColumns: ["locator"]
          },
          {
            foreignKeyName: "operations_locator_fkey"
            columns: ["locator"]
            isOneToOne: false
            referencedRelation: "business_view_puravida_skipper"
            referencedColumns: ["locator"]
          },
          {
            foreignKeyName: "operations_locator_fkey"
            columns: ["locator"]
            isOneToOne: false
            referencedRelation: "business_view_zatara_skipper"
            referencedColumns: ["locator"]
          },
        ]
      }
      performance_metrics: {
        Row: {
          action_items: string[] | null
          automated_calculation: boolean | null
          benchmark_comparison: number | null
          boat_filter: string | null
          booking_source_filter: string | null
          business_context: string | null
          calculation_frequency: string | null
          calculation_notes: string | null
          competitive_position: string | null
          confidence_level: number | null
          created_at: string | null
          data_quality_issues: string[] | null
          data_sources: string[] | null
          external_factors: string[] | null
          id: number
          improvement_recommendations: string[] | null
          last_calculated: string | null
          measurement_date: string
          measurement_period: string
          metric_calculation_method: string | null
          metric_category: string
          metric_name: string
          metric_status: string | null
          metric_type: string
          metric_value: number
          next_calculation: string | null
          performance_rating: string | null
          previous_period_value: number | null
          quality_score: number | null
          responsible_team: string | null
          seasonality_factor: number | null
          statistical_significance: boolean | null
          target_value: number | null
          trend_direction: string | null
          updated_at: string | null
          variance_amount: number | null
          variance_percentage: number | null
        }
        Insert: {
          action_items?: string[] | null
          automated_calculation?: boolean | null
          benchmark_comparison?: number | null
          boat_filter?: string | null
          booking_source_filter?: string | null
          business_context?: string | null
          calculation_frequency?: string | null
          calculation_notes?: string | null
          competitive_position?: string | null
          confidence_level?: number | null
          created_at?: string | null
          data_quality_issues?: string[] | null
          data_sources?: string[] | null
          external_factors?: string[] | null
          id?: number
          improvement_recommendations?: string[] | null
          last_calculated?: string | null
          measurement_date: string
          measurement_period: string
          metric_calculation_method?: string | null
          metric_category: string
          metric_name: string
          metric_status?: string | null
          metric_type: string
          metric_value: number
          next_calculation?: string | null
          performance_rating?: string | null
          previous_period_value?: number | null
          quality_score?: number | null
          responsible_team?: string | null
          seasonality_factor?: number | null
          statistical_significance?: boolean | null
          target_value?: number | null
          trend_direction?: string | null
          updated_at?: string | null
          variance_amount?: number | null
          variance_percentage?: number | null
        }
        Update: {
          action_items?: string[] | null
          automated_calculation?: boolean | null
          benchmark_comparison?: number | null
          boat_filter?: string | null
          booking_source_filter?: string | null
          business_context?: string | null
          calculation_frequency?: string | null
          calculation_notes?: string | null
          competitive_position?: string | null
          confidence_level?: number | null
          created_at?: string | null
          data_quality_issues?: string[] | null
          data_sources?: string[] | null
          external_factors?: string[] | null
          id?: number
          improvement_recommendations?: string[] | null
          last_calculated?: string | null
          measurement_date?: string
          measurement_period?: string
          metric_calculation_method?: string | null
          metric_category?: string
          metric_name?: string
          metric_status?: string | null
          metric_type?: string
          metric_value?: number
          next_calculation?: string | null
          performance_rating?: string | null
          previous_period_value?: number | null
          quality_score?: number | null
          responsible_team?: string | null
          seasonality_factor?: number | null
          statistical_significance?: boolean | null
          target_value?: number | null
          trend_direction?: string | null
          updated_at?: string | null
          variance_amount?: number | null
          variance_percentage?: number | null
        }
        Relationships: []
      }
      platform_mappings: {
        Row: {
          active: boolean | null
          created_at: string | null
          data_format: string | null
          default_value: string | null
          example_source_value: string | null
          example_target_value: string | null
          field_mapping_type: string | null
          id: number
          last_tested_at: string | null
          mapping_notes: string | null
          mapping_priority: number | null
          platform_field_name: string
          platform_field_type: string | null
          platform_name: string
          required_field: boolean | null
          test_status: string | null
          transformation_function: string | null
          updated_at: string | null
          validation_rules: Json | null
          zatara_field_name: string
          zatara_table_name: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          data_format?: string | null
          default_value?: string | null
          example_source_value?: string | null
          example_target_value?: string | null
          field_mapping_type?: string | null
          id?: number
          last_tested_at?: string | null
          mapping_notes?: string | null
          mapping_priority?: number | null
          platform_field_name: string
          platform_field_type?: string | null
          platform_name: string
          required_field?: boolean | null
          test_status?: string | null
          transformation_function?: string | null
          updated_at?: string | null
          validation_rules?: Json | null
          zatara_field_name: string
          zatara_table_name: string
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          data_format?: string | null
          default_value?: string | null
          example_source_value?: string | null
          example_target_value?: string | null
          field_mapping_type?: string | null
          id?: number
          last_tested_at?: string | null
          mapping_notes?: string | null
          mapping_priority?: number | null
          platform_field_name?: string
          platform_field_type?: string | null
          platform_name?: string
          required_field?: boolean | null
          test_status?: string | null
          transformation_function?: string | null
          updated_at?: string | null
          validation_rules?: Json | null
          zatara_field_name?: string
          zatara_table_name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          active: boolean | null
          boat_access: string[] | null
          certifications: string[] | null
          company: string | null
          contact_preferences: string | null
          created_at: string | null
          email: string | null
          emergency_contact: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          phone_number: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
          whatsapp_enabled: boolean
        }
        Insert: {
          active?: boolean | null
          boat_access?: string[] | null
          certifications?: string[] | null
          company?: string | null
          contact_preferences?: string | null
          created_at?: string | null
          email?: string | null
          emergency_contact?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          phone_number?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
          whatsapp_enabled?: boolean
        }
        Update: {
          active?: boolean | null
          boat_access?: string[] | null
          certifications?: string[] | null
          company?: string | null
          contact_preferences?: string | null
          created_at?: string | null
          email?: string | null
          emergency_contact?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          phone_number?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
          whatsapp_enabled?: boolean
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
      system_backups: {
        Row: {
          auto_delete: boolean | null
          backup_cost: number | null
          backup_description: string | null
          backup_duration_seconds: number | null
          backup_format: string | null
          backup_location: string | null
          backup_name: string
          backup_schedule: string | null
          backup_scope: string
          backup_size_bytes: number | null
          backup_status: string | null
          backup_triggered_by: string | null
          backup_type: string
          backup_version: string | null
          business_continuity_critical: boolean | null
          checksum: string | null
          completed_at: string | null
          compliance_backup: boolean | null
          compressed_size_bytes: number | null
          compression_ratio: number | null
          created_at: string | null
          created_by: string | null
          data_date_range: Json | null
          database_version: string | null
          encryption_enabled: boolean | null
          encryption_key_id: string | null
          error_details: string | null
          expiry_date: string | null
          id: number
          last_restore_test: string | null
          offsite_copy_created: boolean | null
          offsite_location: string | null
          records_count: number | null
          recovery_point_objective_minutes: number | null
          recovery_time_objective_minutes: number | null
          restoration_tested: boolean | null
          restore_test_status: string | null
          retention_period_days: number | null
          scheduled_backup: boolean | null
          storage_provider: string | null
          tables_excluded: string[] | null
          tables_included: string[] | null
          verification_date: string | null
          verification_status: string | null
        }
        Insert: {
          auto_delete?: boolean | null
          backup_cost?: number | null
          backup_description?: string | null
          backup_duration_seconds?: number | null
          backup_format?: string | null
          backup_location?: string | null
          backup_name: string
          backup_schedule?: string | null
          backup_scope: string
          backup_size_bytes?: number | null
          backup_status?: string | null
          backup_triggered_by?: string | null
          backup_type: string
          backup_version?: string | null
          business_continuity_critical?: boolean | null
          checksum?: string | null
          completed_at?: string | null
          compliance_backup?: boolean | null
          compressed_size_bytes?: number | null
          compression_ratio?: number | null
          created_at?: string | null
          created_by?: string | null
          data_date_range?: Json | null
          database_version?: string | null
          encryption_enabled?: boolean | null
          encryption_key_id?: string | null
          error_details?: string | null
          expiry_date?: string | null
          id?: number
          last_restore_test?: string | null
          offsite_copy_created?: boolean | null
          offsite_location?: string | null
          records_count?: number | null
          recovery_point_objective_minutes?: number | null
          recovery_time_objective_minutes?: number | null
          restoration_tested?: boolean | null
          restore_test_status?: string | null
          retention_period_days?: number | null
          scheduled_backup?: boolean | null
          storage_provider?: string | null
          tables_excluded?: string[] | null
          tables_included?: string[] | null
          verification_date?: string | null
          verification_status?: string | null
        }
        Update: {
          auto_delete?: boolean | null
          backup_cost?: number | null
          backup_description?: string | null
          backup_duration_seconds?: number | null
          backup_format?: string | null
          backup_location?: string | null
          backup_name?: string
          backup_schedule?: string | null
          backup_scope?: string
          backup_size_bytes?: number | null
          backup_status?: string | null
          backup_triggered_by?: string | null
          backup_type?: string
          backup_version?: string | null
          business_continuity_critical?: boolean | null
          checksum?: string | null
          completed_at?: string | null
          compliance_backup?: boolean | null
          compressed_size_bytes?: number | null
          compression_ratio?: number | null
          created_at?: string | null
          created_by?: string | null
          data_date_range?: Json | null
          database_version?: string | null
          encryption_enabled?: boolean | null
          encryption_key_id?: string | null
          error_details?: string | null
          expiry_date?: string | null
          id?: number
          last_restore_test?: string | null
          offsite_copy_created?: boolean | null
          offsite_location?: string | null
          records_count?: number | null
          recovery_point_objective_minutes?: number | null
          recovery_time_objective_minutes?: number | null
          restoration_tested?: boolean | null
          restore_test_status?: string | null
          retention_period_days?: number | null
          scheduled_backup?: boolean | null
          storage_provider?: string | null
          tables_excluded?: string[] | null
          tables_included?: string[] | null
          verification_date?: string | null
          verification_status?: string | null
        }
        Relationships: []
      }
      task_assignments: {
        Row: {
          actual_duration_minutes: number | null
          assigned_by: string | null
          assigned_to: string
          automation_possible: boolean | null
          blocking_issues: string | null
          boat_involved: string | null
          booking_locator: string | null
          completed_at: string | null
          completion_notes: string | null
          completion_requirements: string | null
          created_at: string | null
          customer_facing: boolean | null
          dependencies: string[] | null
          dependent_tasks: string[] | null
          due_date: string
          escalated: boolean | null
          escalation_reason: string | null
          estimated_duration_minutes: number | null
          id: number
          location: string | null
          quality_criteria: string | null
          quality_score: number | null
          recurrence_pattern: string | null
          recurring: boolean | null
          reminder_count: number | null
          reminder_sent: boolean | null
          resources_needed: string[] | null
          started_at: string | null
          task_description: string | null
          task_name: string
          task_priority: number | null
          task_status: string | null
          task_type: string | null
          template_id: number | null
          updated_at: string | null
          workflow_instance_id: string | null
        }
        Insert: {
          actual_duration_minutes?: number | null
          assigned_by?: string | null
          assigned_to: string
          automation_possible?: boolean | null
          blocking_issues?: string | null
          boat_involved?: string | null
          booking_locator?: string | null
          completed_at?: string | null
          completion_notes?: string | null
          completion_requirements?: string | null
          created_at?: string | null
          customer_facing?: boolean | null
          dependencies?: string[] | null
          dependent_tasks?: string[] | null
          due_date: string
          escalated?: boolean | null
          escalation_reason?: string | null
          estimated_duration_minutes?: number | null
          id?: number
          location?: string | null
          quality_criteria?: string | null
          quality_score?: number | null
          recurrence_pattern?: string | null
          recurring?: boolean | null
          reminder_count?: number | null
          reminder_sent?: boolean | null
          resources_needed?: string[] | null
          started_at?: string | null
          task_description?: string | null
          task_name: string
          task_priority?: number | null
          task_status?: string | null
          task_type?: string | null
          template_id?: number | null
          updated_at?: string | null
          workflow_instance_id?: string | null
        }
        Update: {
          actual_duration_minutes?: number | null
          assigned_by?: string | null
          assigned_to?: string
          automation_possible?: boolean | null
          blocking_issues?: string | null
          boat_involved?: string | null
          booking_locator?: string | null
          completed_at?: string | null
          completion_notes?: string | null
          completion_requirements?: string | null
          created_at?: string | null
          customer_facing?: boolean | null
          dependencies?: string[] | null
          dependent_tasks?: string[] | null
          due_date?: string
          escalated?: boolean | null
          escalation_reason?: string | null
          estimated_duration_minutes?: number | null
          id?: number
          location?: string | null
          quality_criteria?: string | null
          quality_score?: number | null
          recurrence_pattern?: string | null
          recurring?: boolean | null
          reminder_count?: number | null
          reminder_sent?: boolean | null
          resources_needed?: string[] | null
          started_at?: string | null
          task_description?: string | null
          task_name?: string
          task_priority?: number | null
          task_status?: string | null
          task_type?: string | null
          template_id?: number | null
          updated_at?: string | null
          workflow_instance_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "task_assignments_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "workflow_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      user_activity_logs: {
        Row: {
          access_method: string | null
          activity_category: string | null
          activity_description: string | null
          activity_type: string
          api_endpoint: string | null
          authentication_method: string | null
          browser: string | null
          business_justification: string | null
          compliance_log: boolean | null
          concurrent_sessions: number | null
          created_at: string | null
          data_sensitivity_accessed: string | null
          data_volume_accessed: number | null
          device_type: string | null
          duration_seconds: number | null
          error_code: string | null
          export_format: string | null
          failure_reason: string | null
          features_used: string[] | null
          filters_applied: Json | null
          id: number
          ip_address: unknown | null
          location_city: string | null
          location_country: string | null
          operating_system: string | null
          referrer_url: string | null
          request_size_bytes: number | null
          resource_accessed: string | null
          resource_id: string | null
          response_size_bytes: number | null
          retention_period_days: number | null
          search_terms: string[] | null
          security_risk_score: number | null
          session_duration_total_seconds: number | null
          session_id: string | null
          success: boolean | null
          unusual_activity: boolean | null
          user_agent: string | null
          user_id: string
          user_role: string | null
          username: string | null
        }
        Insert: {
          access_method?: string | null
          activity_category?: string | null
          activity_description?: string | null
          activity_type: string
          api_endpoint?: string | null
          authentication_method?: string | null
          browser?: string | null
          business_justification?: string | null
          compliance_log?: boolean | null
          concurrent_sessions?: number | null
          created_at?: string | null
          data_sensitivity_accessed?: string | null
          data_volume_accessed?: number | null
          device_type?: string | null
          duration_seconds?: number | null
          error_code?: string | null
          export_format?: string | null
          failure_reason?: string | null
          features_used?: string[] | null
          filters_applied?: Json | null
          id?: number
          ip_address?: unknown | null
          location_city?: string | null
          location_country?: string | null
          operating_system?: string | null
          referrer_url?: string | null
          request_size_bytes?: number | null
          resource_accessed?: string | null
          resource_id?: string | null
          response_size_bytes?: number | null
          retention_period_days?: number | null
          search_terms?: string[] | null
          security_risk_score?: number | null
          session_duration_total_seconds?: number | null
          session_id?: string | null
          success?: boolean | null
          unusual_activity?: boolean | null
          user_agent?: string | null
          user_id: string
          user_role?: string | null
          username?: string | null
        }
        Update: {
          access_method?: string | null
          activity_category?: string | null
          activity_description?: string | null
          activity_type?: string
          api_endpoint?: string | null
          authentication_method?: string | null
          browser?: string | null
          business_justification?: string | null
          compliance_log?: boolean | null
          concurrent_sessions?: number | null
          created_at?: string | null
          data_sensitivity_accessed?: string | null
          data_volume_accessed?: number | null
          device_type?: string | null
          duration_seconds?: number | null
          error_code?: string | null
          export_format?: string | null
          failure_reason?: string | null
          features_used?: string[] | null
          filters_applied?: Json | null
          id?: number
          ip_address?: unknown | null
          location_city?: string | null
          location_country?: string | null
          operating_system?: string | null
          referrer_url?: string | null
          request_size_bytes?: number | null
          resource_accessed?: string | null
          resource_id?: string | null
          response_size_bytes?: number | null
          retention_period_days?: number | null
          search_terms?: string[] | null
          security_risk_score?: number | null
          session_duration_total_seconds?: number | null
          session_id?: string | null
          success?: boolean | null
          unusual_activity?: boolean | null
          user_agent?: string | null
          user_id?: string
          user_role?: string | null
          username?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          boat_access: string[] | null
          created_at: string | null
          id: number
          permissions: Json | null
          role_name: string
          user_id: string | null
        }
        Insert: {
          boat_access?: string[] | null
          created_at?: string | null
          id?: number
          permissions?: Json | null
          role_name: string
          user_id?: string | null
        }
        Update: {
          boat_access?: string[] | null
          created_at?: string | null
          id?: number
          permissions?: Json | null
          role_name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      view_configurations: {
        Row: {
          boat_filter: string | null
          columns_included: string[] | null
          created_at: string | null
          default_filters: Json | null
          description: string | null
          display_name: string | null
          id: number
          is_active: boolean | null
          sort_order: number | null
          time_filter: string | null
          user_roles: string[] | null
          view_name: string
          view_type: string
        }
        Insert: {
          boat_filter?: string | null
          columns_included?: string[] | null
          created_at?: string | null
          default_filters?: Json | null
          description?: string | null
          display_name?: string | null
          id?: number
          is_active?: boolean | null
          sort_order?: number | null
          time_filter?: string | null
          user_roles?: string[] | null
          view_name: string
          view_type: string
        }
        Update: {
          boat_filter?: string | null
          columns_included?: string[] | null
          created_at?: string | null
          default_filters?: Json | null
          description?: string | null
          display_name?: string | null
          id?: number
          is_active?: boolean | null
          sort_order?: number | null
          time_filter?: string | null
          user_roles?: string[] | null
          view_name?: string
          view_type?: string
        }
        Relationships: []
      }
      whatsapp_templates: {
        Row: {
          created_at: string | null
          id: number
          is_active: boolean | null
          message_content: string
          template_name: string
          template_type: string | null
          variables: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_active?: boolean | null
          message_content: string
          template_name: string
          template_type?: string | null
          variables?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: number
          is_active?: boolean | null
          message_content?: string
          template_name?: string
          template_type?: string | null
          variables?: Json | null
        }
        Relationships: []
      }
      workflow_templates: {
        Row: {
          applies_to_boats: string[] | null
          applies_to_booking_types: string[] | null
          approval_required: boolean | null
          approval_roles: string[] | null
          automation_level: string | null
          average_completion_time: number | null
          business_impact: string | null
          compliance_required: boolean | null
          created_at: string | null
          created_by: string | null
          description: string | null
          escalation_rules: Json | null
          estimated_duration_minutes: number | null
          failure_conditions: string | null
          id: number
          last_modified_by: string | null
          priority_level: number | null
          quality_checkpoints: number | null
          required_roles: string[] | null
          seasonal_applicability: string[] | null
          success_criteria: string | null
          success_rate: number | null
          template_name: string
          template_status: string | null
          template_version: string | null
          trigger_conditions: Json | null
          updated_at: string | null
          usage_count: number | null
          workflow_type: string
        }
        Insert: {
          applies_to_boats?: string[] | null
          applies_to_booking_types?: string[] | null
          approval_required?: boolean | null
          approval_roles?: string[] | null
          automation_level?: string | null
          average_completion_time?: number | null
          business_impact?: string | null
          compliance_required?: boolean | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          escalation_rules?: Json | null
          estimated_duration_minutes?: number | null
          failure_conditions?: string | null
          id?: number
          last_modified_by?: string | null
          priority_level?: number | null
          quality_checkpoints?: number | null
          required_roles?: string[] | null
          seasonal_applicability?: string[] | null
          success_criteria?: string | null
          success_rate?: number | null
          template_name: string
          template_status?: string | null
          template_version?: string | null
          trigger_conditions?: Json | null
          updated_at?: string | null
          usage_count?: number | null
          workflow_type: string
        }
        Update: {
          applies_to_boats?: string[] | null
          applies_to_booking_types?: string[] | null
          approval_required?: boolean | null
          approval_roles?: string[] | null
          automation_level?: string | null
          average_completion_time?: number | null
          business_impact?: string | null
          compliance_required?: boolean | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          escalation_rules?: Json | null
          estimated_duration_minutes?: number | null
          failure_conditions?: string | null
          id?: number
          last_modified_by?: string | null
          priority_level?: number | null
          quality_checkpoints?: number | null
          required_roles?: string[] | null
          seasonal_applicability?: string[] | null
          success_criteria?: string | null
          success_rate?: number | null
          template_name?: string
          template_status?: string | null
          template_version?: string | null
          trigger_conditions?: Json | null
          updated_at?: string | null
          usage_count?: number | null
          workflow_type?: string
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
      business_view_finance: {
        Row: {
          balance_due: number | null
          boat: string | null
          booking_source: string | null
          charter_date: string | null
          charter_total: number | null
          guest_full_name: string | null
          locator: string | null
          outstanding_amount: number | null
          payment_status: string | null
          payments_received: number | null
          total_paid: number | null
        }
        Insert: {
          balance_due?: never
          boat?: string | null
          booking_source?: string | null
          charter_date?: never
          charter_total?: number | null
          guest_full_name?: never
          locator?: string | null
          outstanding_amount?: number | null
          payment_status?: never
          payments_received?: never
          total_paid?: number | null
        }
        Update: {
          balance_due?: never
          boat?: string | null
          booking_source?: string | null
          charter_date?: never
          charter_total?: number | null
          guest_full_name?: never
          locator?: string | null
          outstanding_amount?: number | null
          payment_status?: never
          payments_received?: never
          total_paid?: number | null
        }
        Relationships: []
      }
      business_view_operations: {
        Row: {
          boat: string | null
          booking_source: string | null
          booking_status: string | null
          charter_date: string | null
          charter_total: number | null
          cleaning: string | null
          crew: string | null
          end_time: string | null
          equipment: string | null
          extras_categories: string | null
          extras_total: number | null
          fnb_items: string | null
          fuel: string | null
          guest_full_name: string | null
          locator: string | null
          start_time: string | null
          supplier_needs: string | null
        }
        Relationships: []
      }
      business_view_puravida_skipper: {
        Row: {
          booking_status: string | null
          charter_date: string | null
          charter_notes: string | null
          cleared_for_departure: boolean | null
          end_time: string | null
          equipment_required: string | null
          fnb_details: string | null
          gps_coordinates: string | null
          guest_full_name: string | null
          guest_phone: string | null
          locator: string | null
          pre_departure_checks: boolean | null
          start_time: string | null
          total_guests: number | null
        }
        Relationships: []
      }
      business_view_zatara_skipper: {
        Row: {
          booking_status: string | null
          charter_date: string | null
          charter_notes: string | null
          cleared_for_departure: boolean | null
          end_time: string | null
          equipment_required: string | null
          fnb_details: string | null
          gps_coordinates: string | null
          guest_full_name: string | null
          guest_phone: string | null
          locator: string | null
          pre_departure_checks: boolean | null
          start_time: string | null
          total_guests: number | null
        }
        Relationships: []
      }
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
      generate_whatsapp_message: {
        Args: { charter_locator: string; template_name_param: string }
        Returns: string
      }
      get_available_views: {
        Args: { user_role?: string }
        Returns: {
          view_name: string
          display_name: string
          view_type: string
          description: string
        }[]
      }
      get_business_view: {
        Args: {
          view_name?: string
          time_forward?: number
          time_backward?: number
          boat_filter?: string
          status_filter?: string
          user_role?: string
        }
        Returns: {
          locator: string
          charter_date: string
          guest_name: string
          booking_source: string
          start_time: string
          end_time: string
          boat: string
          status: string
          charter_total: number
          fnb_details: string
          crew_required: string
          equipment_required: string
          charter_notes: string
          pre_departure_checks: boolean
          cleared_for_departure: boolean
          gps_coordinates: string
          total_guests: number
          paid_amount: number
          outstanding_amount: number
        }[]
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_filter_options: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_message_field_mappings: {
        Args: Record<PropertyKey, never>
        Returns: {
          field_name: string
          table_source: string
          column_name: string
          display_name: string
          data_type: string
          is_required: boolean
        }[]
      }
      get_operations_input_view: {
        Args: { input_mode?: string; user_role?: string }
        Returns: {
          locator: string
          charter_date_link: string
          guest_first_name: string
          start_time: string
          end_time: string
          duration_hours: number
          boat: string
          booking_source: string
          charter_total: number
          paid_amount: number
          outstanding_amount: number
          cash_payment: number
          card_payment: number
          cleared_for_departure: boolean
          pre_departure_checks: boolean
          charter_notes: string
          contract_signed: boolean
          client_messaging_status: string
          charter_overview_sent: boolean
          gps_coordinates: string
          fnb_details: string
          crew_required: string
          fuel_needs: string
          cleaning_status: string
          equipment_required: string
          supplier_orders: string
          next_48hrs_prep: string
          urgent_notes: string
        }[]
      }
      get_whatsapp_templates: {
        Args: { filter_type?: string }
        Returns: {
          template_name: string
          template_type: string
          message_content: string
          variables: Json
        }[]
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
      is_management_or_owner: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_staff_or_higher: {
        Args: Record<PropertyKey, never>
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
        | "owner"
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
        "owner",
        "casual_staff",
        "charter_brokers",
        "boat_owners",
        "charter_clients",
        "boat_club_clients",
      ],
    },
  },
} as const
