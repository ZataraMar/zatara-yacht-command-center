export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_content: {
        Row: {
          cancellation_policy_text: string | null
          cancellation_policy_title: string | null
          created_at: string | null
          experience_id: string
          gallery_images: Json | null
          hero_cta_text: string | null
          hero_subtitle: string | null
          hero_title: string | null
          id: string
          important_info_text: string | null
          important_info_title: string | null
          includes_list: Json | null
          includes_title: string | null
          is_active: boolean | null
          meeting_point_address: string | null
          meeting_point_coordinates: unknown | null
          meeting_point_description: string | null
          meeting_point_title: string | null
          meta_description: string | null
          meta_title: string | null
          overview_description: string | null
          overview_title: string | null
          trust_signals: Json | null
          updated_at: string | null
          video_url: string | null
          weather_policy_text: string | null
          weather_policy_title: string | null
        }
        Insert: {
          cancellation_policy_text?: string | null
          cancellation_policy_title?: string | null
          created_at?: string | null
          experience_id: string
          gallery_images?: Json | null
          hero_cta_text?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: string
          important_info_text?: string | null
          important_info_title?: string | null
          includes_list?: Json | null
          includes_title?: string | null
          is_active?: boolean | null
          meeting_point_address?: string | null
          meeting_point_coordinates?: unknown | null
          meeting_point_description?: string | null
          meeting_point_title?: string | null
          meta_description?: string | null
          meta_title?: string | null
          overview_description?: string | null
          overview_title?: string | null
          trust_signals?: Json | null
          updated_at?: string | null
          video_url?: string | null
          weather_policy_text?: string | null
          weather_policy_title?: string | null
        }
        Update: {
          cancellation_policy_text?: string | null
          cancellation_policy_title?: string | null
          created_at?: string | null
          experience_id?: string
          gallery_images?: Json | null
          hero_cta_text?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: string
          important_info_text?: string | null
          important_info_title?: string | null
          includes_list?: Json | null
          includes_title?: string | null
          is_active?: boolean | null
          meeting_point_address?: string | null
          meeting_point_coordinates?: unknown | null
          meeting_point_description?: string | null
          meeting_point_title?: string | null
          meta_description?: string | null
          meta_title?: string | null
          overview_description?: string | null
          overview_title?: string | null
          trust_signals?: Json | null
          updated_at?: string | null
          video_url?: string | null
          weather_policy_text?: string | null
          weather_policy_title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_content_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_settings: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: number
          is_encrypted: boolean | null
          setting_key: string
          setting_type: string | null
          setting_value: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: number
          is_encrypted?: boolean | null
          setting_key: string
          setting_type?: string | null
          setting_value?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: number
          is_encrypted?: boolean | null
          setting_key?: string
          setting_type?: string | null
          setting_value?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      agency_profiles: {
        Row: {
          account_manager: string | null
          agency_name: string
          agency_type: string | null
          auto_renewal: boolean | null
          avg_booking_value: number | null
          business_registration: string | null
          commission_percentage: number | null
          commission_type: string | null
          company_address: string | null
          contract_end_date: string | null
          contract_start_date: string | null
          conversion_rate: number | null
          created_at: string | null
          guest_demographic: string | null
          id: number
          minimum_booking_value: number | null
          onboarding_notes: string | null
          operational_notes: string | null
          payment_terms: string | null
          preferred_boats: string | null
          primary_contact_email: string | null
          primary_contact_name: string | null
          primary_contact_phone: string | null
          relationship_status: string | null
          seasonal_focus: string | null
          secondary_contact_email: string | null
          secondary_contact_name: string | null
          total_bookings_ytd: number | null
          total_revenue_ytd: number | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          account_manager?: string | null
          agency_name: string
          agency_type?: string | null
          auto_renewal?: boolean | null
          avg_booking_value?: number | null
          business_registration?: string | null
          commission_percentage?: number | null
          commission_type?: string | null
          company_address?: string | null
          contract_end_date?: string | null
          contract_start_date?: string | null
          conversion_rate?: number | null
          created_at?: string | null
          guest_demographic?: string | null
          id?: number
          minimum_booking_value?: number | null
          onboarding_notes?: string | null
          operational_notes?: string | null
          payment_terms?: string | null
          preferred_boats?: string | null
          primary_contact_email?: string | null
          primary_contact_name?: string | null
          primary_contact_phone?: string | null
          relationship_status?: string | null
          seasonal_focus?: string | null
          secondary_contact_email?: string | null
          secondary_contact_name?: string | null
          total_bookings_ytd?: number | null
          total_revenue_ytd?: number | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          account_manager?: string | null
          agency_name?: string
          agency_type?: string | null
          auto_renewal?: boolean | null
          avg_booking_value?: number | null
          business_registration?: string | null
          commission_percentage?: number | null
          commission_type?: string | null
          company_address?: string | null
          contract_end_date?: string | null
          contract_start_date?: string | null
          conversion_rate?: number | null
          created_at?: string | null
          guest_demographic?: string | null
          id?: number
          minimum_booking_value?: number | null
          onboarding_notes?: string | null
          operational_notes?: string | null
          payment_terms?: string | null
          preferred_boats?: string | null
          primary_contact_email?: string | null
          primary_contact_name?: string | null
          primary_contact_phone?: string | null
          relationship_status?: string | null
          seasonal_focus?: string | null
          secondary_contact_email?: string | null
          secondary_contact_name?: string | null
          total_bookings_ytd?: number | null
          total_revenue_ytd?: number | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      ai_conversation_history: {
        Row: {
          ai_response: string | null
          business_context: Json | null
          conversation_topic: string | null
          created_at: string | null
          created_files: string[] | null
          id: string
          message_type: string | null
          persona_id: string | null
          project_context: string | null
          relevant_tables: string[] | null
          session_id: string | null
          tags: string[] | null
          user_message: string | null
        }
        Insert: {
          ai_response?: string | null
          business_context?: Json | null
          conversation_topic?: string | null
          created_at?: string | null
          created_files?: string[] | null
          id?: string
          message_type?: string | null
          persona_id?: string | null
          project_context?: string | null
          relevant_tables?: string[] | null
          session_id?: string | null
          tags?: string[] | null
          user_message?: string | null
        }
        Update: {
          ai_response?: string | null
          business_context?: Json | null
          conversation_topic?: string | null
          created_at?: string | null
          created_files?: string[] | null
          id?: string
          message_type?: string | null
          persona_id?: string | null
          project_context?: string | null
          relevant_tables?: string[] | null
          session_id?: string | null
          tags?: string[] | null
          user_message?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_conversation_history_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "ai_personas"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_personas: {
        Row: {
          active: boolean | null
          avatar_color: string | null
          created_at: string | null
          description: string | null
          display_name: string
          expertise_areas: string[] | null
          id: string
          key_metrics: Json | null
          persona_name: string
          relevant_tables: string[] | null
          system_prompt: string
        }
        Insert: {
          active?: boolean | null
          avatar_color?: string | null
          created_at?: string | null
          description?: string | null
          display_name: string
          expertise_areas?: string[] | null
          id?: string
          key_metrics?: Json | null
          persona_name: string
          relevant_tables?: string[] | null
          system_prompt: string
        }
        Update: {
          active?: boolean | null
          avatar_color?: string | null
          created_at?: string | null
          description?: string | null
          display_name?: string
          expertise_areas?: string[] | null
          id?: string
          key_metrics?: Json | null
          persona_name?: string
          relevant_tables?: string[] | null
          system_prompt?: string
        }
        Relationships: []
      }
      andronautic_field_mappings: {
        Row: {
          andronautic_field: string
          created_at: string | null
          default_value: string | null
          field_type: string | null
          id: number
          is_mapped: boolean | null
          is_required: boolean | null
          notes: string | null
          supabase_field: string | null
          transformation_rule: string | null
          updated_at: string | null
        }
        Insert: {
          andronautic_field: string
          created_at?: string | null
          default_value?: string | null
          field_type?: string | null
          id?: number
          is_mapped?: boolean | null
          is_required?: boolean | null
          notes?: string | null
          supabase_field?: string | null
          transformation_rule?: string | null
          updated_at?: string | null
        }
        Update: {
          andronautic_field?: string
          created_at?: string | null
          default_value?: string | null
          field_type?: string | null
          id?: number
          is_mapped?: boolean | null
          is_required?: boolean | null
          notes?: string | null
          supabase_field?: string | null
          transformation_rule?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
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
      auth_tokens: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          token: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          token: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          token?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "auth_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
      boat_assignments: {
        Row: {
          additional_costs: number | null
          assigned_by: string | null
          assigned_date: string | null
          assignment_type: string | null
          boat_id: number | null
          booking_locator: string
          confirmed_date: string | null
          created_at: string | null
          crew_assigned: string[] | null
          estimated_costs: Json | null
          fuel_estimate: number | null
          id: number
          owner_notified: boolean | null
          owner_payout: number | null
          partner_commission: number | null
          partner_notified: boolean | null
          preparation_status: string | null
          skipper_assigned: string | null
          updated_at: string | null
          zatara_commission: number | null
        }
        Insert: {
          additional_costs?: number | null
          assigned_by?: string | null
          assigned_date?: string | null
          assignment_type?: string | null
          boat_id?: number | null
          booking_locator: string
          confirmed_date?: string | null
          created_at?: string | null
          crew_assigned?: string[] | null
          estimated_costs?: Json | null
          fuel_estimate?: number | null
          id?: number
          owner_notified?: boolean | null
          owner_payout?: number | null
          partner_commission?: number | null
          partner_notified?: boolean | null
          preparation_status?: string | null
          skipper_assigned?: string | null
          updated_at?: string | null
          zatara_commission?: number | null
        }
        Update: {
          additional_costs?: number | null
          assigned_by?: string | null
          assigned_date?: string | null
          assignment_type?: string | null
          boat_id?: number | null
          booking_locator?: string
          confirmed_date?: string | null
          created_at?: string | null
          crew_assigned?: string[] | null
          estimated_costs?: Json | null
          fuel_estimate?: number | null
          id?: number
          owner_notified?: boolean | null
          owner_payout?: number | null
          partner_commission?: number | null
          partner_notified?: boolean | null
          preparation_status?: string | null
          skipper_assigned?: string | null
          updated_at?: string | null
          zatara_commission?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "boat_assignments_boat_id_fkey"
            columns: ["boat_id"]
            isOneToOne: false
            referencedRelation: "boat_registry"
            referencedColumns: ["id"]
          },
        ]
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
      boat_registry: {
        Row: {
          advance_booking_days: number | null
          available_extras: string[] | null
          blocked_dates: Json | null
          boat_category: string | null
          boat_name: string
          boat_type: string
          cancellation_policy: string | null
          cleaning_fee: number | null
          cost_structure: string | null
          created_at: string | null
          crew_required: number | null
          daily_rate_base: number | null
          deposit_amount: number | null
          equipment_included: string[] | null
          external_calendar_url: string | null
          fuel_consumption_per_hour: number | null
          home_port: string | null
          hourly_rate_base: number | null
          id: number
          insurance_expiry: string | null
          insurance_provider: string | null
          last_charter_date: string | null
          length_meters: number | null
          license_requirements: string[] | null
          maintenance_due_date: string | null
          make_model: string | null
          management_contract_end: string | null
          management_contract_start: string | null
          max_passengers: number | null
          maximum_charter_hours: number | null
          minimum_charter_hours: number | null
          owner_commission_percentage: number | null
          owner_contact: string | null
          owner_name: string | null
          ownership_status: string | null
          partner_booking_system: string | null
          partner_commission_percentage: number | null
          partner_company: string | null
          registration_number: string | null
          seasonal_availability: Json | null
          special_features: string[] | null
          survey_due_date: string | null
          sync_with_andronautic: boolean | null
          total_charters: number | null
          total_revenue: number | null
          updated_at: string | null
          weekly_rate_base: number | null
          year_built: number | null
          zatara_commission_percentage: number | null
        }
        Insert: {
          advance_booking_days?: number | null
          available_extras?: string[] | null
          blocked_dates?: Json | null
          boat_category?: string | null
          boat_name: string
          boat_type: string
          cancellation_policy?: string | null
          cleaning_fee?: number | null
          cost_structure?: string | null
          created_at?: string | null
          crew_required?: number | null
          daily_rate_base?: number | null
          deposit_amount?: number | null
          equipment_included?: string[] | null
          external_calendar_url?: string | null
          fuel_consumption_per_hour?: number | null
          home_port?: string | null
          hourly_rate_base?: number | null
          id?: number
          insurance_expiry?: string | null
          insurance_provider?: string | null
          last_charter_date?: string | null
          length_meters?: number | null
          license_requirements?: string[] | null
          maintenance_due_date?: string | null
          make_model?: string | null
          management_contract_end?: string | null
          management_contract_start?: string | null
          max_passengers?: number | null
          maximum_charter_hours?: number | null
          minimum_charter_hours?: number | null
          owner_commission_percentage?: number | null
          owner_contact?: string | null
          owner_name?: string | null
          ownership_status?: string | null
          partner_booking_system?: string | null
          partner_commission_percentage?: number | null
          partner_company?: string | null
          registration_number?: string | null
          seasonal_availability?: Json | null
          special_features?: string[] | null
          survey_due_date?: string | null
          sync_with_andronautic?: boolean | null
          total_charters?: number | null
          total_revenue?: number | null
          updated_at?: string | null
          weekly_rate_base?: number | null
          year_built?: number | null
          zatara_commission_percentage?: number | null
        }
        Update: {
          advance_booking_days?: number | null
          available_extras?: string[] | null
          blocked_dates?: Json | null
          boat_category?: string | null
          boat_name?: string
          boat_type?: string
          cancellation_policy?: string | null
          cleaning_fee?: number | null
          cost_structure?: string | null
          created_at?: string | null
          crew_required?: number | null
          daily_rate_base?: number | null
          deposit_amount?: number | null
          equipment_included?: string[] | null
          external_calendar_url?: string | null
          fuel_consumption_per_hour?: number | null
          home_port?: string | null
          hourly_rate_base?: number | null
          id?: number
          insurance_expiry?: string | null
          insurance_provider?: string | null
          last_charter_date?: string | null
          length_meters?: number | null
          license_requirements?: string[] | null
          maintenance_due_date?: string | null
          make_model?: string | null
          management_contract_end?: string | null
          management_contract_start?: string | null
          max_passengers?: number | null
          maximum_charter_hours?: number | null
          minimum_charter_hours?: number | null
          owner_commission_percentage?: number | null
          owner_contact?: string | null
          owner_name?: string | null
          ownership_status?: string | null
          partner_booking_system?: string | null
          partner_commission_percentage?: number | null
          partner_company?: string | null
          registration_number?: string | null
          seasonal_availability?: Json | null
          special_features?: string[] | null
          survey_due_date?: string | null
          sync_with_andronautic?: boolean | null
          total_charters?: number | null
          total_revenue?: number | null
          updated_at?: string | null
          weekly_rate_base?: number | null
          year_built?: number | null
          zatara_commission_percentage?: number | null
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
          assigned_salesman: string | null
          boat: string | null
          booking_notes: string | null
          booking_sequence: string | null
          booking_source: string | null
          booking_status: string | null
          booking_user: string | null
          cancellation_reason: string | null
          card_payment: number | null
          cash_payment: number | null
          charter_days: number | null
          charter_total: number | null
          children_details: string | null
          confirmation_date: string | null
          confirmation_sent: boolean | null
          contract_prepared_date: string | null
          contract_ready: boolean | null
          contract_signed: boolean | null
          contract_signed_date: string | null
          created_at: string | null
          data_source: string | null
          deposit_amount: number | null
          deposit_charges: number | null
          deposit_refund_amount: number | null
          deposit_returned: boolean | null
          dropoff_location: string | null
          duration_hours: number | null
          end_date: string | null
          end_time: string | null
          extras_net: number | null
          extras_tax: number | null
          extras_total: number | null
          fuel_liters: number | null
          fuel_price: number | null
          guest_email: string | null
          guest_first_name: string | null
          guest_phone: string | null
          guest_surname: string | null
          health_allergies: string | null
          id: number
          is_last_minute: boolean | null
          locator: string
          nationality: string | null
          outstanding_amount: number | null
          paid_amount: number | null
          payment_method: string | null
          pickup_location: string | null
          platform_commission: number | null
          raw_data: Json | null
          reason_for_booking: string | null
          reconfirmation_date: string | null
          service_net: number | null
          service_tax: number | null
          service_total: number | null
          start_date: string | null
          start_time: string | null
          total_guests: number | null
          updated_at: string | null
        }
        Insert: {
          assigned_salesman?: string | null
          boat?: string | null
          booking_notes?: string | null
          booking_sequence?: string | null
          booking_source?: string | null
          booking_status?: string | null
          booking_user?: string | null
          cancellation_reason?: string | null
          card_payment?: number | null
          cash_payment?: number | null
          charter_days?: number | null
          charter_total?: number | null
          children_details?: string | null
          confirmation_date?: string | null
          confirmation_sent?: boolean | null
          contract_prepared_date?: string | null
          contract_ready?: boolean | null
          contract_signed?: boolean | null
          contract_signed_date?: string | null
          created_at?: string | null
          data_source?: string | null
          deposit_amount?: number | null
          deposit_charges?: number | null
          deposit_refund_amount?: number | null
          deposit_returned?: boolean | null
          dropoff_location?: string | null
          duration_hours?: number | null
          end_date?: string | null
          end_time?: string | null
          extras_net?: number | null
          extras_tax?: number | null
          extras_total?: number | null
          fuel_liters?: number | null
          fuel_price?: number | null
          guest_email?: string | null
          guest_first_name?: string | null
          guest_phone?: string | null
          guest_surname?: string | null
          health_allergies?: string | null
          id?: number
          is_last_minute?: boolean | null
          locator: string
          nationality?: string | null
          outstanding_amount?: number | null
          paid_amount?: number | null
          payment_method?: string | null
          pickup_location?: string | null
          platform_commission?: number | null
          raw_data?: Json | null
          reason_for_booking?: string | null
          reconfirmation_date?: string | null
          service_net?: number | null
          service_tax?: number | null
          service_total?: number | null
          start_date?: string | null
          start_time?: string | null
          total_guests?: number | null
          updated_at?: string | null
        }
        Update: {
          assigned_salesman?: string | null
          boat?: string | null
          booking_notes?: string | null
          booking_sequence?: string | null
          booking_source?: string | null
          booking_status?: string | null
          booking_user?: string | null
          cancellation_reason?: string | null
          card_payment?: number | null
          cash_payment?: number | null
          charter_days?: number | null
          charter_total?: number | null
          children_details?: string | null
          confirmation_date?: string | null
          confirmation_sent?: boolean | null
          contract_prepared_date?: string | null
          contract_ready?: boolean | null
          contract_signed?: boolean | null
          contract_signed_date?: string | null
          created_at?: string | null
          data_source?: string | null
          deposit_amount?: number | null
          deposit_charges?: number | null
          deposit_refund_amount?: number | null
          deposit_returned?: boolean | null
          dropoff_location?: string | null
          duration_hours?: number | null
          end_date?: string | null
          end_time?: string | null
          extras_net?: number | null
          extras_tax?: number | null
          extras_total?: number | null
          fuel_liters?: number | null
          fuel_price?: number | null
          guest_email?: string | null
          guest_first_name?: string | null
          guest_phone?: string | null
          guest_surname?: string | null
          health_allergies?: string | null
          id?: number
          is_last_minute?: boolean | null
          locator?: string
          nationality?: string | null
          outstanding_amount?: number | null
          paid_amount?: number | null
          payment_method?: string | null
          pickup_location?: string | null
          platform_commission?: number | null
          raw_data?: Json | null
          reason_for_booking?: string | null
          reconfirmation_date?: string | null
          service_net?: number | null
          service_tax?: number | null
          service_total?: number | null
          start_date?: string | null
          start_time?: string | null
          total_guests?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      brand_assets: {
        Row: {
          asset_type: string
          created_at: string
          description: string | null
          file_path: string
          file_size: number | null
          file_url: string | null
          id: string
          mime_type: string | null
          name: string
          updated_at: string
          usage_context: string | null
        }
        Insert: {
          asset_type: string
          created_at?: string
          description?: string | null
          file_path: string
          file_size?: number | null
          file_url?: string | null
          id?: string
          mime_type?: string | null
          name: string
          updated_at?: string
          usage_context?: string | null
        }
        Update: {
          asset_type?: string
          created_at?: string
          description?: string | null
          file_path?: string
          file_size?: number | null
          file_url?: string | null
          id?: string
          mime_type?: string | null
          name?: string
          updated_at?: string
          usage_context?: string | null
        }
        Relationships: []
      }
      brand_guidelines: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
          usage_notes: string | null
          value: Json
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
          usage_notes?: string | null
          value: Json
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
          usage_notes?: string | null
          value?: Json
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
      client_budgets: {
        Row: {
          alert_sent: boolean | null
          alert_threshold_percent: number | null
          allocated_amount_eur: number
          approval_required_over_budget: boolean | null
          auto_renewal: boolean | null
          boat_id: number | null
          budget_category: string | null
          budget_period_end: string
          budget_period_start: string
          budget_status: string | null
          budget_type: string | null
          created_at: string | null
          customer_id: number
          id: number
          notes: string | null
          remaining_amount_eur: number | null
          spent_amount_eur: number | null
          updated_at: string | null
        }
        Insert: {
          alert_sent?: boolean | null
          alert_threshold_percent?: number | null
          allocated_amount_eur: number
          approval_required_over_budget?: boolean | null
          auto_renewal?: boolean | null
          boat_id?: number | null
          budget_category?: string | null
          budget_period_end: string
          budget_period_start: string
          budget_status?: string | null
          budget_type?: string | null
          created_at?: string | null
          customer_id: number
          id?: number
          notes?: string | null
          remaining_amount_eur?: number | null
          spent_amount_eur?: number | null
          updated_at?: string | null
        }
        Update: {
          alert_sent?: boolean | null
          alert_threshold_percent?: number | null
          allocated_amount_eur?: number
          approval_required_over_budget?: boolean | null
          auto_renewal?: boolean | null
          boat_id?: number | null
          budget_category?: string | null
          budget_period_end?: string
          budget_period_start?: string
          budget_status?: string | null
          budget_type?: string | null
          created_at?: string | null
          customer_id?: number
          id?: number
          notes?: string | null
          remaining_amount_eur?: number | null
          spent_amount_eur?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_budgets_boat_id_fkey"
            columns: ["boat_id"]
            isOneToOne: false
            referencedRelation: "boat_registry"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_budgets_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_360_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_budgets_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_service_usage"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "client_budgets_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      commission_tracking: {
        Row: {
          agency_name: string
          agency_representative: string | null
          approved_by: string | null
          booking_id: number | null
          booking_locator: string
          booking_source: string | null
          calculated_by: string | null
          commission_amount: number | null
          commission_due_date: string | null
          commission_notes: string | null
          commission_paid_date: string | null
          commission_percentage: number | null
          commission_status: string | null
          commission_type: string | null
          created_at: string | null
          gross_booking_value: number
          id: number
          net_booking_value: number | null
          payment_method: string | null
          payment_reference: string | null
          platform_statement_ref: string | null
          reconciled: boolean | null
          reconciled_by: string | null
          reconciled_date: string | null
          updated_at: string | null
        }
        Insert: {
          agency_name: string
          agency_representative?: string | null
          approved_by?: string | null
          booking_id?: number | null
          booking_locator: string
          booking_source?: string | null
          calculated_by?: string | null
          commission_amount?: number | null
          commission_due_date?: string | null
          commission_notes?: string | null
          commission_paid_date?: string | null
          commission_percentage?: number | null
          commission_status?: string | null
          commission_type?: string | null
          created_at?: string | null
          gross_booking_value: number
          id?: number
          net_booking_value?: number | null
          payment_method?: string | null
          payment_reference?: string | null
          platform_statement_ref?: string | null
          reconciled?: boolean | null
          reconciled_by?: string | null
          reconciled_date?: string | null
          updated_at?: string | null
        }
        Update: {
          agency_name?: string
          agency_representative?: string | null
          approved_by?: string | null
          booking_id?: number | null
          booking_locator?: string
          booking_source?: string | null
          calculated_by?: string | null
          commission_amount?: number | null
          commission_due_date?: string | null
          commission_notes?: string | null
          commission_paid_date?: string | null
          commission_percentage?: number | null
          commission_status?: string | null
          commission_type?: string | null
          created_at?: string | null
          gross_booking_value?: number
          id?: number
          net_booking_value?: number | null
          payment_method?: string | null
          payment_reference?: string | null
          platform_statement_ref?: string | null
          reconciled?: boolean | null
          reconciled_by?: string | null
          reconciled_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commission_tracking_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      commission_transactions: {
        Row: {
          base_amount_eur: number
          commission_amount_eur: number
          commission_rate: number
          created_at: string | null
          id: number
          notes: string | null
          payee_name: string
          payee_type: string | null
          payment_date: string | null
          payment_method: string | null
          payment_reference: string | null
          payment_status: string | null
          reference_id: number | null
          total_commission_eur: number
          transaction_date: string | null
          transaction_type: string | null
          updated_at: string | null
          vat_amount_eur: number | null
          vat_applicable: boolean | null
        }
        Insert: {
          base_amount_eur: number
          commission_amount_eur: number
          commission_rate: number
          created_at?: string | null
          id?: number
          notes?: string | null
          payee_name: string
          payee_type?: string | null
          payment_date?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          payment_status?: string | null
          reference_id?: number | null
          total_commission_eur: number
          transaction_date?: string | null
          transaction_type?: string | null
          updated_at?: string | null
          vat_amount_eur?: number | null
          vat_applicable?: boolean | null
        }
        Update: {
          base_amount_eur?: number
          commission_amount_eur?: number
          commission_rate?: number
          created_at?: string | null
          id?: number
          notes?: string | null
          payee_name?: string
          payee_type?: string | null
          payment_date?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          payment_status?: string | null
          reference_id?: number | null
          total_commission_eur?: number
          transaction_date?: string | null
          transaction_type?: string | null
          updated_at?: string | null
          vat_amount_eur?: number | null
          vat_applicable?: boolean | null
        }
        Relationships: []
      }
      communication_templates: {
        Row: {
          active: boolean | null
          auto_send: boolean | null
          communication_channel: string | null
          created_at: string | null
          created_by: string | null
          id: number
          language_code: string | null
          last_used: string | null
          message_content: string
          requires_approval: boolean | null
          subject_line: string | null
          template_name: string
          template_type: string
          times_used: number | null
          trigger_event: string | null
          updated_at: string | null
          variables_used: string | null
        }
        Insert: {
          active?: boolean | null
          auto_send?: boolean | null
          communication_channel?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: number
          language_code?: string | null
          last_used?: string | null
          message_content: string
          requires_approval?: boolean | null
          subject_line?: string | null
          template_name: string
          template_type: string
          times_used?: number | null
          trigger_event?: string | null
          updated_at?: string | null
          variables_used?: string | null
        }
        Update: {
          active?: boolean | null
          auto_send?: boolean | null
          communication_channel?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: number
          language_code?: string | null
          last_used?: string | null
          message_content?: string
          requires_approval?: boolean | null
          subject_line?: string | null
          template_name?: string
          template_type?: string
          times_used?: number | null
          trigger_event?: string | null
          updated_at?: string | null
          variables_used?: string | null
        }
        Relationships: []
      }
      communications: {
        Row: {
          author: string
          created_at: string | null
          id: string
          message: string
          task_id: string
          type: string | null
        }
        Insert: {
          author: string
          created_at?: string | null
          id?: string
          message: string
          task_id: string
          type?: string | null
        }
        Update: {
          author?: string
          created_at?: string | null
          id?: string
          message?: string
          task_id?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "communications_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
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
          attachments: string | null
          booking_id: number | null
          charter_overview_sent: boolean | null
          client_messaging_status: string | null
          communication_channel: string | null
          communication_type: string | null
          created_at: string | null
          custom_message: string | null
          data_source: string | null
          follow_up_date: string | null
          follow_up_required: boolean | null
          id: number
          locator: string | null
          message_template_used: string | null
          priority_level: string | null
          recipient_type: string | null
          resolved: boolean | null
          response_required: boolean | null
          sender_name: string | null
          sent_at: string | null
          tags: string | null
          updated_at: string | null
          whatsapp_message_sent: boolean | null
        }
        Insert: {
          attachments?: string | null
          booking_id?: number | null
          charter_overview_sent?: boolean | null
          client_messaging_status?: string | null
          communication_channel?: string | null
          communication_type?: string | null
          created_at?: string | null
          custom_message?: string | null
          data_source?: string | null
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: number
          locator?: string | null
          message_template_used?: string | null
          priority_level?: string | null
          recipient_type?: string | null
          resolved?: boolean | null
          response_required?: boolean | null
          sender_name?: string | null
          sent_at?: string | null
          tags?: string | null
          updated_at?: string | null
          whatsapp_message_sent?: boolean | null
        }
        Update: {
          attachments?: string | null
          booking_id?: number | null
          charter_overview_sent?: boolean | null
          client_messaging_status?: string | null
          communication_channel?: string | null
          communication_type?: string | null
          created_at?: string | null
          custom_message?: string | null
          data_source?: string | null
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: number
          locator?: string | null
          message_template_used?: string | null
          priority_level?: string | null
          recipient_type?: string | null
          resolved?: boolean | null
          response_required?: boolean | null
          sender_name?: string | null
          sent_at?: string | null
          tags?: string | null
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
            referencedRelation: "bookings_management_dashboard"
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
          {
            foreignKeyName: "customer_communications_locator_fkey"
            columns: ["locator"]
            isOneToOne: false
            referencedRelation: "calendar_availability"
            referencedColumns: ["locator"]
          },
          {
            foreignKeyName: "customer_communications_locator_fkey"
            columns: ["locator"]
            isOneToOne: false
            referencedRelation: "operations_dashboard"
            referencedColumns: ["locator"]
          },
          {
            foreignKeyName: "customer_communications_locator_fkey"
            columns: ["locator"]
            isOneToOne: false
            referencedRelation: "purser_dashboard"
            referencedColumns: ["locator"]
          },
          {
            foreignKeyName: "customer_communications_locator_fkey"
            columns: ["locator"]
            isOneToOne: false
            referencedRelation: "skipper_dashboard"
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
            referencedRelation: "customer_360_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_communications_log_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_service_usage"
            referencedColumns: ["customer_id"]
          },
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
            referencedRelation: "customer_360_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_history_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_service_usage"
            referencedColumns: ["customer_id"]
          },
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
            referencedRelation: "customer_360_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_preferences_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_service_usage"
            referencedColumns: ["customer_id"]
          },
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
            referencedRelation: "customer_360_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_reviews_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_service_usage"
            referencedColumns: ["customer_id"]
          },
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
          data_source: string | null
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
          data_source?: string | null
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
          data_source?: string | null
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
      enhanced_boat_availability: {
        Row: {
          afternoon_available: boolean | null
          availability_date: string
          availability_type: string | null
          blocked_reason: string | null
          boat_id: number | null
          created_at: string | null
          daily_rate: number | null
          evening_available: boolean | null
          full_day_available: boolean | null
          hourly_rate: number | null
          id: number
          maximum_passengers: number | null
          minimum_charter_hours: number | null
          morning_available: boolean | null
          owner_approval_required: boolean | null
          partner_approval_required: boolean | null
          peak_season_multiplier: number | null
          requires_advance_booking: boolean | null
          updated_at: string | null
          weather_dependent: boolean | null
        }
        Insert: {
          afternoon_available?: boolean | null
          availability_date: string
          availability_type?: string | null
          blocked_reason?: string | null
          boat_id?: number | null
          created_at?: string | null
          daily_rate?: number | null
          evening_available?: boolean | null
          full_day_available?: boolean | null
          hourly_rate?: number | null
          id?: number
          maximum_passengers?: number | null
          minimum_charter_hours?: number | null
          morning_available?: boolean | null
          owner_approval_required?: boolean | null
          partner_approval_required?: boolean | null
          peak_season_multiplier?: number | null
          requires_advance_booking?: boolean | null
          updated_at?: string | null
          weather_dependent?: boolean | null
        }
        Update: {
          afternoon_available?: boolean | null
          availability_date?: string
          availability_type?: string | null
          blocked_reason?: string | null
          boat_id?: number | null
          created_at?: string | null
          daily_rate?: number | null
          evening_available?: boolean | null
          full_day_available?: boolean | null
          hourly_rate?: number | null
          id?: number
          maximum_passengers?: number | null
          minimum_charter_hours?: number | null
          morning_available?: boolean | null
          owner_approval_required?: boolean | null
          partner_approval_required?: boolean | null
          peak_season_multiplier?: number | null
          requires_advance_booking?: boolean | null
          updated_at?: string | null
          weather_dependent?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "enhanced_boat_availability_boat_id_fkey"
            columns: ["boat_id"]
            isOneToOne: false
            referencedRelation: "boat_registry"
            referencedColumns: ["id"]
          },
        ]
      }
      experiences: {
        Row: {
          cancellation_policy: string | null
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          features: Json | null
          gallery_images: Json | null
          hero_image_url: string | null
          id: string
          includes: Json | null
          is_active: boolean | null
          max_capacity: number | null
          meeting_point: string | null
          name: string
          pricing: Json
          short_description: string | null
          slug: string
          time_slots: Json
          updated_at: string | null
          weather_policy: string | null
        }
        Insert: {
          cancellation_policy?: string | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          features?: Json | null
          gallery_images?: Json | null
          hero_image_url?: string | null
          id?: string
          includes?: Json | null
          is_active?: boolean | null
          max_capacity?: number | null
          meeting_point?: string | null
          name: string
          pricing?: Json
          short_description?: string | null
          slug: string
          time_slots?: Json
          updated_at?: string | null
          weather_policy?: string | null
        }
        Update: {
          cancellation_policy?: string | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          features?: Json | null
          gallery_images?: Json | null
          hero_image_url?: string | null
          id?: string
          includes?: Json | null
          is_active?: boolean | null
          max_capacity?: number | null
          meeting_point?: string | null
          name?: string
          pricing?: Json
          short_description?: string | null
          slug?: string
          time_slots?: Json
          updated_at?: string | null
          weather_policy?: string | null
        }
        Relationships: []
      }
      guardiennage_schedules: {
        Row: {
          actual_duration_hours: number | null
          assigned_crew: string | null
          boat_id: number | null
          checklist_template: Json | null
          completion_notes: string | null
          contract_id: number | null
          created_at: string | null
          crew_contact: string | null
          estimated_duration_hours: number | null
          id: number
          issues_found: string | null
          next_visit_date: string | null
          owner_notified: boolean | null
          photo_urls: string[] | null
          photos_taken: number | null
          scheduled_date: string
          scheduled_time: string | null
          security_status: string | null
          updated_at: string | null
          visit_status: string | null
          visit_type: string | null
          weather_conditions: string | null
        }
        Insert: {
          actual_duration_hours?: number | null
          assigned_crew?: string | null
          boat_id?: number | null
          checklist_template?: Json | null
          completion_notes?: string | null
          contract_id?: number | null
          created_at?: string | null
          crew_contact?: string | null
          estimated_duration_hours?: number | null
          id?: number
          issues_found?: string | null
          next_visit_date?: string | null
          owner_notified?: boolean | null
          photo_urls?: string[] | null
          photos_taken?: number | null
          scheduled_date: string
          scheduled_time?: string | null
          security_status?: string | null
          updated_at?: string | null
          visit_status?: string | null
          visit_type?: string | null
          weather_conditions?: string | null
        }
        Update: {
          actual_duration_hours?: number | null
          assigned_crew?: string | null
          boat_id?: number | null
          checklist_template?: Json | null
          completion_notes?: string | null
          contract_id?: number | null
          created_at?: string | null
          crew_contact?: string | null
          estimated_duration_hours?: number | null
          id?: number
          issues_found?: string | null
          next_visit_date?: string | null
          owner_notified?: boolean | null
          photo_urls?: string[] | null
          photos_taken?: number | null
          scheduled_date?: string
          scheduled_time?: string | null
          security_status?: string | null
          updated_at?: string | null
          visit_status?: string | null
          visit_type?: string | null
          weather_conditions?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guardiennage_schedules_boat_id_fkey"
            columns: ["boat_id"]
            isOneToOne: false
            referencedRelation: "boat_registry"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guardiennage_schedules_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "service_contracts"
            referencedColumns: ["id"]
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
      internal_communications: {
        Row: {
          acknowledged_at: string | null
          created_at: string | null
          delivered_at: string | null
          id: number
          message_content: string
          message_type: string | null
          priority_level: string | null
          read_at: string | null
          recipient: string | null
          recipient_group: string | null
          related_boat: string | null
          related_date: string | null
          related_locator: string | null
          requires_acknowledgment: boolean | null
          sender: string
          subject: string | null
          urgent: boolean | null
        }
        Insert: {
          acknowledged_at?: string | null
          created_at?: string | null
          delivered_at?: string | null
          id?: number
          message_content: string
          message_type?: string | null
          priority_level?: string | null
          read_at?: string | null
          recipient?: string | null
          recipient_group?: string | null
          related_boat?: string | null
          related_date?: string | null
          related_locator?: string | null
          requires_acknowledgment?: boolean | null
          sender: string
          subject?: string | null
          urgent?: boolean | null
        }
        Update: {
          acknowledged_at?: string | null
          created_at?: string | null
          delivered_at?: string | null
          id?: number
          message_content?: string
          message_type?: string | null
          priority_level?: string | null
          read_at?: string | null
          recipient?: string | null
          recipient_group?: string | null
          related_boat?: string | null
          related_date?: string | null
          related_locator?: string | null
          requires_acknowledgment?: boolean | null
          sender?: string
          subject?: string | null
          urgent?: boolean | null
        }
        Relationships: []
      }
      invoice_line_items: {
        Row: {
          booking_id: number | null
          created_at: string | null
          id: number
          invoice_id: number
          line_description: string
          line_subtotal_eur: number
          line_tax_amount_eur: number | null
          line_tax_rate: number | null
          line_total_eur: number
          maintenance_request_id: number | null
          margin_eur: number | null
          margin_percent: number | null
          provider_cost_eur: number | null
          provider_id: number | null
          quantity: number | null
          service_category: string | null
          service_date: string | null
          service_request_id: number | null
          unit_price_eur: number
          unit_type: string | null
          updated_at: string | null
          yacht_sale_id: number | null
        }
        Insert: {
          booking_id?: number | null
          created_at?: string | null
          id?: number
          invoice_id: number
          line_description: string
          line_subtotal_eur: number
          line_tax_amount_eur?: number | null
          line_tax_rate?: number | null
          line_total_eur: number
          maintenance_request_id?: number | null
          margin_eur?: number | null
          margin_percent?: number | null
          provider_cost_eur?: number | null
          provider_id?: number | null
          quantity?: number | null
          service_category?: string | null
          service_date?: string | null
          service_request_id?: number | null
          unit_price_eur: number
          unit_type?: string | null
          updated_at?: string | null
          yacht_sale_id?: number | null
        }
        Update: {
          booking_id?: number | null
          created_at?: string | null
          id?: number
          invoice_id?: number
          line_description?: string
          line_subtotal_eur?: number
          line_tax_amount_eur?: number | null
          line_tax_rate?: number | null
          line_total_eur?: number
          maintenance_request_id?: number | null
          margin_eur?: number | null
          margin_percent?: number | null
          provider_cost_eur?: number | null
          provider_id?: number | null
          quantity?: number | null
          service_category?: string | null
          service_date?: string | null
          service_request_id?: number | null
          unit_price_eur?: number
          unit_type?: string | null
          updated_at?: string | null
          yacht_sale_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_line_items_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_line_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "service_invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_line_items_maintenance_request_id_fkey"
            columns: ["maintenance_request_id"]
            isOneToOne: false
            referencedRelation: "maintenance_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_line_items_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "service_providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_line_items_service_category_fkey"
            columns: ["service_category"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["category_name"]
          },
          {
            foreignKeyName: "invoice_line_items_service_category_fkey"
            columns: ["service_category"]
            isOneToOne: false
            referencedRelation: "service_performance_by_category"
            referencedColumns: ["category_name"]
          },
          {
            foreignKeyName: "invoice_line_items_service_request_id_fkey"
            columns: ["service_request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_line_items_yacht_sale_id_fkey"
            columns: ["yacht_sale_id"]
            isOneToOne: false
            referencedRelation: "yacht_inventory"
            referencedColumns: ["id"]
          },
        ]
      }
      landing_page_bookings: {
        Row: {
          booking_date: string
          booking_reference: string
          created_at: string | null
          currency: string | null
          customer_email: string
          customer_name: string
          customer_phone: string | null
          experience_id: string
          id: string
          number_of_people: number
          payment_reference: string | null
          payment_status: string | null
          price_per_person: number
          source: string | null
          special_requests: string | null
          status: string | null
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          time_period: string
          time_slot: string
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          booking_date: string
          booking_reference: string
          created_at?: string | null
          currency?: string | null
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          experience_id: string
          id?: string
          number_of_people: number
          payment_reference?: string | null
          payment_status?: string | null
          price_per_person: number
          source?: string | null
          special_requests?: string | null
          status?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          time_period: string
          time_slot: string
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          booking_date?: string
          booking_reference?: string
          created_at?: string | null
          currency?: string | null
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          experience_id?: string
          id?: string
          number_of_people?: number
          payment_reference?: string | null
          payment_status?: string | null
          price_per_person?: number
          source?: string | null
          special_requests?: string | null
          status?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          time_period?: string
          time_slot?: string
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "landing_page_bookings_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      landing_page_conversions: {
        Row: {
          booking_locator: string | null
          conversion_type: string | null
          conversion_value: number | null
          converted_at: string | null
          id: string
          landing_page_id: string | null
          referrer: string | null
          session_id: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          visitor_ip: unknown | null
        }
        Insert: {
          booking_locator?: string | null
          conversion_type?: string | null
          conversion_value?: number | null
          converted_at?: string | null
          id?: string
          landing_page_id?: string | null
          referrer?: string | null
          session_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visitor_ip?: unknown | null
        }
        Update: {
          booking_locator?: string | null
          conversion_type?: string | null
          conversion_value?: number | null
          converted_at?: string | null
          id?: string
          landing_page_id?: string | null
          referrer?: string | null
          session_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visitor_ip?: unknown | null
        }
        Relationships: [
          {
            foreignKeyName: "landing_page_conversions_landing_page_id_fkey"
            columns: ["landing_page_id"]
            isOneToOne: false
            referencedRelation: "landing_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      landing_page_images: {
        Row: {
          created_at: string | null
          display_order: number | null
          id: string
          image_alt: string | null
          image_caption: string | null
          image_type: string | null
          image_url: string
          landing_page_id: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_alt?: string | null
          image_caption?: string | null
          image_type?: string | null
          image_url: string
          landing_page_id?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_alt?: string | null
          image_caption?: string | null
          image_type?: string | null
          image_url?: string
          landing_page_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "landing_page_images_landing_page_id_fkey"
            columns: ["landing_page_id"]
            isOneToOne: false
            referencedRelation: "landing_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      landing_page_views: {
        Row: {
          id: string
          landing_page_id: string | null
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          viewed_at: string | null
          visitor_ip: unknown | null
        }
        Insert: {
          id?: string
          landing_page_id?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          viewed_at?: string | null
          visitor_ip?: unknown | null
        }
        Update: {
          id?: string
          landing_page_id?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          viewed_at?: string | null
          visitor_ip?: unknown | null
        }
        Relationships: [
          {
            foreignKeyName: "landing_page_views_landing_page_id_fkey"
            columns: ["landing_page_id"]
            isOneToOne: false
            referencedRelation: "landing_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      landing_pages: {
        Row: {
          boat_description: string | null
          boat_image_url: string | null
          boat_name: string | null
          booking_iframe_height: number | null
          booking_iframe_url: string | null
          booking_iframe_width: number | null
          conversion_count: number | null
          created_at: string | null
          created_by: string | null
          hero_image_url: string | null
          hero_subtitle: string | null
          hero_title: string | null
          id: string
          includes_catering: boolean | null
          includes_jetskis: boolean | null
          includes_other: string | null
          includes_paddleboards: boolean | null
          includes_snorkeling: boolean | null
          is_hidden: boolean | null
          main_content: string | null
          meta_description: string | null
          meta_keywords: string | null
          og_image_url: string | null
          package_description: string | null
          package_name: string | null
          slug: string
          special_offer_text: string | null
          status: string | null
          title: string
          updated_at: string | null
          updated_by: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          view_count: number | null
        }
        Insert: {
          boat_description?: string | null
          boat_image_url?: string | null
          boat_name?: string | null
          booking_iframe_height?: number | null
          booking_iframe_url?: string | null
          booking_iframe_width?: number | null
          conversion_count?: number | null
          created_at?: string | null
          created_by?: string | null
          hero_image_url?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: string
          includes_catering?: boolean | null
          includes_jetskis?: boolean | null
          includes_other?: string | null
          includes_paddleboards?: boolean | null
          includes_snorkeling?: boolean | null
          is_hidden?: boolean | null
          main_content?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          og_image_url?: string | null
          package_description?: string | null
          package_name?: string | null
          slug: string
          special_offer_text?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          updated_by?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          view_count?: number | null
        }
        Update: {
          boat_description?: string | null
          boat_image_url?: string | null
          boat_name?: string | null
          booking_iframe_height?: number | null
          booking_iframe_url?: string | null
          booking_iframe_width?: number | null
          conversion_count?: number | null
          created_at?: string | null
          created_by?: string | null
          hero_image_url?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: string
          includes_catering?: boolean | null
          includes_jetskis?: boolean | null
          includes_other?: string | null
          includes_paddleboards?: boolean | null
          includes_snorkeling?: boolean | null
          is_hidden?: boolean | null
          main_content?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          og_image_url?: string | null
          package_description?: string | null
          package_name?: string | null
          slug?: string
          special_offer_text?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          updated_by?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      maintenance_requests: {
        Row: {
          actual_completion: string | null
          approved_budget: number | null
          assigned_vendor: string | null
          boat_id: number
          category: string | null
          completion_deadline: string | null
          created_at: string | null
          customer_id: number | null
          customer_satisfaction: number | null
          description: string
          estimated_cost: number | null
          id: number
          invoice_reference: string | null
          labor_cost: number | null
          labor_hours: number | null
          notes: string | null
          parts_cost: number | null
          parts_required: string[] | null
          photos_after: string[] | null
          photos_before: string[] | null
          priority_level: number | null
          reported_by: string | null
          reported_date: string | null
          request_status: string | null
          request_type: string | null
          start_date: string | null
          target_completion: string | null
          total_cost: number | null
          updated_at: string | null
          vendor_contact: string | null
          warranty_period_months: number | null
          work_description: string | null
        }
        Insert: {
          actual_completion?: string | null
          approved_budget?: number | null
          assigned_vendor?: string | null
          boat_id: number
          category?: string | null
          completion_deadline?: string | null
          created_at?: string | null
          customer_id?: number | null
          customer_satisfaction?: number | null
          description: string
          estimated_cost?: number | null
          id?: number
          invoice_reference?: string | null
          labor_cost?: number | null
          labor_hours?: number | null
          notes?: string | null
          parts_cost?: number | null
          parts_required?: string[] | null
          photos_after?: string[] | null
          photos_before?: string[] | null
          priority_level?: number | null
          reported_by?: string | null
          reported_date?: string | null
          request_status?: string | null
          request_type?: string | null
          start_date?: string | null
          target_completion?: string | null
          total_cost?: number | null
          updated_at?: string | null
          vendor_contact?: string | null
          warranty_period_months?: number | null
          work_description?: string | null
        }
        Update: {
          actual_completion?: string | null
          approved_budget?: number | null
          assigned_vendor?: string | null
          boat_id?: number
          category?: string | null
          completion_deadline?: string | null
          created_at?: string | null
          customer_id?: number | null
          customer_satisfaction?: number | null
          description?: string
          estimated_cost?: number | null
          id?: number
          invoice_reference?: string | null
          labor_cost?: number | null
          labor_hours?: number | null
          notes?: string | null
          parts_cost?: number | null
          parts_required?: string[] | null
          photos_after?: string[] | null
          photos_before?: string[] | null
          priority_level?: number | null
          reported_by?: string | null
          reported_date?: string | null
          request_status?: string | null
          request_type?: string | null
          start_date?: string | null
          target_completion?: string | null
          total_cost?: number | null
          updated_at?: string | null
          vendor_contact?: string | null
          warranty_period_months?: number | null
          work_description?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_requests_boat_id_fkey"
            columns: ["boat_id"]
            isOneToOne: false
            referencedRelation: "boat_registry"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_360_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_service_usage"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "maintenance_requests_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
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
      media: {
        Row: {
          author: string
          created_at: string | null
          id: string
          mime_type: string | null
          name: string
          size_bytes: number | null
          task_id: string
          type: string
          url: string
        }
        Insert: {
          author: string
          created_at?: string | null
          id?: string
          mime_type?: string | null
          name: string
          size_bytes?: number | null
          task_id: string
          type: string
          url: string
        }
        Update: {
          author?: string
          created_at?: string | null
          id?: string
          mime_type?: string | null
          name?: string
          size_bytes?: number | null
          task_id?: string
          type?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
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
          contract_prepared_date: string | null
          contract_ready: boolean | null
          created_at: string | null
          data_source: string | null
          deposit_status: string | null
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
          contract_prepared_date?: string | null
          contract_ready?: boolean | null
          created_at?: string | null
          data_source?: string | null
          deposit_status?: string | null
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
          contract_prepared_date?: string | null
          contract_ready?: boolean | null
          created_at?: string | null
          data_source?: string | null
          deposit_status?: string | null
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
            referencedRelation: "bookings_management_dashboard"
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
          {
            foreignKeyName: "operations_locator_fkey"
            columns: ["locator"]
            isOneToOne: false
            referencedRelation: "calendar_availability"
            referencedColumns: ["locator"]
          },
          {
            foreignKeyName: "operations_locator_fkey"
            columns: ["locator"]
            isOneToOne: false
            referencedRelation: "operations_dashboard"
            referencedColumns: ["locator"]
          },
          {
            foreignKeyName: "operations_locator_fkey"
            columns: ["locator"]
            isOneToOne: false
            referencedRelation: "purser_dashboard"
            referencedColumns: ["locator"]
          },
          {
            foreignKeyName: "operations_locator_fkey"
            columns: ["locator"]
            isOneToOne: false
            referencedRelation: "skipper_dashboard"
            referencedColumns: ["locator"]
          },
        ]
      }
      partner_companies: {
        Row: {
          address: string | null
          api_endpoint: string | null
          auto_renew: boolean | null
          average_booking_value: number | null
          boats_provided: number | null
          booking_system_integration: boolean | null
          booking_volume_annual: number | null
          calendar_sync_enabled: boolean | null
          company_name: string
          contact_person: string | null
          contract_end_date: string | null
          contract_start_date: string | null
          created_at: string | null
          currency_preference: string | null
          customer_satisfaction_score: number | null
          default_commission_rate: number | null
          email: string | null
          id: number
          insurance_coverage: string | null
          partnership_status: string | null
          partnership_type: string
          payment_terms: string | null
          phone: string | null
          quality_rating: number | null
          termination_notice_days: number | null
          total_revenue_generated: number | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          api_endpoint?: string | null
          auto_renew?: boolean | null
          average_booking_value?: number | null
          boats_provided?: number | null
          booking_system_integration?: boolean | null
          booking_volume_annual?: number | null
          calendar_sync_enabled?: boolean | null
          company_name: string
          contact_person?: string | null
          contract_end_date?: string | null
          contract_start_date?: string | null
          created_at?: string | null
          currency_preference?: string | null
          customer_satisfaction_score?: number | null
          default_commission_rate?: number | null
          email?: string | null
          id?: number
          insurance_coverage?: string | null
          partnership_status?: string | null
          partnership_type: string
          payment_terms?: string | null
          phone?: string | null
          quality_rating?: number | null
          termination_notice_days?: number | null
          total_revenue_generated?: number | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          api_endpoint?: string | null
          auto_renew?: boolean | null
          average_booking_value?: number | null
          boats_provided?: number | null
          booking_system_integration?: boolean | null
          booking_volume_annual?: number | null
          calendar_sync_enabled?: boolean | null
          company_name?: string
          contact_person?: string | null
          contract_end_date?: string | null
          contract_start_date?: string | null
          created_at?: string | null
          currency_preference?: string | null
          customer_satisfaction_score?: number | null
          default_commission_rate?: number | null
          email?: string | null
          id?: number
          insurance_coverage?: string | null
          partnership_status?: string | null
          partnership_type?: string
          payment_terms?: string | null
          phone?: string | null
          quality_rating?: number | null
          termination_notice_days?: number | null
          total_revenue_generated?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      people: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          name: string
          phone: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
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
      project_artifacts: {
        Row: {
          artifact_content: string | null
          artifact_name: string
          artifact_type: string
          content_type: string | null
          created_date: string | null
          description: string | null
          github_path: string | null
          id: string
          is_latest_version: boolean | null
          lovable_url: string | null
          project_category: string | null
          version_number: number | null
        }
        Insert: {
          artifact_content?: string | null
          artifact_name: string
          artifact_type: string
          content_type?: string | null
          created_date?: string | null
          description?: string | null
          github_path?: string | null
          id?: string
          is_latest_version?: boolean | null
          lovable_url?: string | null
          project_category?: string | null
          version_number?: number | null
        }
        Update: {
          artifact_content?: string | null
          artifact_name?: string
          artifact_type?: string
          content_type?: string | null
          created_date?: string | null
          description?: string | null
          github_path?: string | null
          id?: string
          is_latest_version?: boolean | null
          lovable_url?: string | null
          project_category?: string | null
          version_number?: number | null
        }
        Relationships: []
      }
      project_assets: {
        Row: {
          asset_type: string
          chat_session: string | null
          description: string | null
          file_size: number | null
          filename: string
          id: string
          mime_type: string | null
          project_category: string
          storage_url: string | null
          upload_date: string | null
        }
        Insert: {
          asset_type: string
          chat_session?: string | null
          description?: string | null
          file_size?: number | null
          filename: string
          id?: string
          mime_type?: string | null
          project_category: string
          storage_url?: string | null
          upload_date?: string | null
        }
        Update: {
          asset_type?: string
          chat_session?: string | null
          description?: string | null
          file_size?: number | null
          filename?: string
          id?: string
          mime_type?: string | null
          project_category?: string
          storage_url?: string | null
          upload_date?: string | null
        }
        Relationships: []
      }
      project_contexts: {
        Row: {
          active_integrations: string[] | null
          business_objectives: Json | null
          current_status: string | null
          id: string
          key_decisions: Json | null
          last_updated: string | null
          project_name: string
          technical_requirements: Json | null
        }
        Insert: {
          active_integrations?: string[] | null
          business_objectives?: Json | null
          current_status?: string | null
          id?: string
          key_decisions?: Json | null
          last_updated?: string | null
          project_name: string
          technical_requirements?: Json | null
        }
        Update: {
          active_integrations?: string[] | null
          business_objectives?: Json | null
          current_status?: string | null
          id?: string
          key_decisions?: Json | null
          last_updated?: string | null
          project_name?: string
          technical_requirements?: Json | null
        }
        Relationships: []
      }
      project_tasks: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          created_at: string | null
          deliverables: Json | null
          dependencies: string[] | null
          estimated_time_hours: number | null
          id: string
          notes: string | null
          priority: string | null
          project_name: string
          task_description: string | null
          task_status: string | null
          task_title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          deliverables?: Json | null
          dependencies?: string[] | null
          estimated_time_hours?: number | null
          id?: string
          notes?: string | null
          priority?: string | null
          project_name?: string
          task_description?: string | null
          task_status?: string | null
          task_title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          deliverables?: Json | null
          dependencies?: string[] | null
          estimated_time_hours?: number | null
          id?: string
          notes?: string | null
          priority?: string | null
          project_name?: string
          task_description?: string | null
          task_status?: string | null
          task_title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      raw_bookings: {
        Row: {
          andronautic_data: Json
          id: number
          imported_at: string | null
          processed_at: string | null
        }
        Insert: {
          andronautic_data: Json
          id?: number
          imported_at?: string | null
          processed_at?: string | null
        }
        Update: {
          andronautic_data?: Json
          id?: number
          imported_at?: string | null
          processed_at?: string | null
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
      sales_leads: {
        Row: {
          assigned_broker: string | null
          budget_range_max: number | null
          budget_range_min: number | null
          contact_email: string | null
          contact_name: string
          contact_nationality: string | null
          contact_phone: string | null
          conversion_probability: number | null
          created_at: string | null
          first_contact_date: string | null
          id: number
          intended_use: string | null
          interested_in_yacht_id: number | null
          last_contact_date: string | null
          lead_score: number | null
          lead_source: string | null
          lead_status: string | null
          next_followup_date: string | null
          notes: string | null
          preferred_length_max: number | null
          preferred_length_min: number | null
          priority_level: number | null
          timeline: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_broker?: string | null
          budget_range_max?: number | null
          budget_range_min?: number | null
          contact_email?: string | null
          contact_name: string
          contact_nationality?: string | null
          contact_phone?: string | null
          conversion_probability?: number | null
          created_at?: string | null
          first_contact_date?: string | null
          id?: number
          intended_use?: string | null
          interested_in_yacht_id?: number | null
          last_contact_date?: string | null
          lead_score?: number | null
          lead_source?: string | null
          lead_status?: string | null
          next_followup_date?: string | null
          notes?: string | null
          preferred_length_max?: number | null
          preferred_length_min?: number | null
          priority_level?: number | null
          timeline?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_broker?: string | null
          budget_range_max?: number | null
          budget_range_min?: number | null
          contact_email?: string | null
          contact_name?: string
          contact_nationality?: string | null
          contact_phone?: string | null
          conversion_probability?: number | null
          created_at?: string | null
          first_contact_date?: string | null
          id?: number
          intended_use?: string | null
          interested_in_yacht_id?: number | null
          last_contact_date?: string | null
          lead_score?: number | null
          lead_source?: string | null
          lead_status?: string | null
          next_followup_date?: string | null
          notes?: string | null
          preferred_length_max?: number | null
          preferred_length_min?: number | null
          priority_level?: number | null
          timeline?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_leads_interested_in_yacht_id_fkey"
            columns: ["interested_in_yacht_id"]
            isOneToOne: false
            referencedRelation: "yacht_inventory"
            referencedColumns: ["id"]
          },
        ]
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
      security_audit_history: {
        Row: {
          audit_date: string | null
          audit_details: Json | null
          high_severity_issues: number | null
          id: number
          medium_severity_issues: number | null
          resolved_since_last_audit: number | null
          total_issues: number | null
        }
        Insert: {
          audit_date?: string | null
          audit_details?: Json | null
          high_severity_issues?: number | null
          id?: number
          medium_severity_issues?: number | null
          resolved_since_last_audit?: number | null
          total_issues?: number | null
        }
        Update: {
          audit_date?: string | null
          audit_details?: Json | null
          high_severity_issues?: number | null
          id?: number
          medium_severity_issues?: number | null
          resolved_since_last_audit?: number | null
          total_issues?: number | null
        }
        Relationships: []
      }
      service_assignments: {
        Row: {
          acceptance_timestamp: string | null
          assigned_by: string | null
          assigned_role: string | null
          assigned_to: string
          assignment_accepted: boolean | null
          assignment_date: string | null
          assignment_type: string | null
          available_from: string | null
          available_until: string | null
          bonus_earned: number | null
          completed_work: string | null
          created_at: string | null
          flat_fee: number | null
          hourly_rate: number | null
          hours_worked: number | null
          id: number
          language_requirements: string[] | null
          quality_rating: number | null
          required_certifications: string[] | null
          required_experience_years: number | null
          service_request_id: number | null
          started_work: string | null
          travel_compensation: number | null
          travel_time_minutes: number | null
          updated_at: string | null
        }
        Insert: {
          acceptance_timestamp?: string | null
          assigned_by?: string | null
          assigned_role?: string | null
          assigned_to: string
          assignment_accepted?: boolean | null
          assignment_date?: string | null
          assignment_type?: string | null
          available_from?: string | null
          available_until?: string | null
          bonus_earned?: number | null
          completed_work?: string | null
          created_at?: string | null
          flat_fee?: number | null
          hourly_rate?: number | null
          hours_worked?: number | null
          id?: number
          language_requirements?: string[] | null
          quality_rating?: number | null
          required_certifications?: string[] | null
          required_experience_years?: number | null
          service_request_id?: number | null
          started_work?: string | null
          travel_compensation?: number | null
          travel_time_minutes?: number | null
          updated_at?: string | null
        }
        Update: {
          acceptance_timestamp?: string | null
          assigned_by?: string | null
          assigned_role?: string | null
          assigned_to?: string
          assignment_accepted?: boolean | null
          assignment_date?: string | null
          assignment_type?: string | null
          available_from?: string | null
          available_until?: string | null
          bonus_earned?: number | null
          completed_work?: string | null
          created_at?: string | null
          flat_fee?: number | null
          hourly_rate?: number | null
          hours_worked?: number | null
          id?: number
          language_requirements?: string[] | null
          quality_rating?: number | null
          required_certifications?: string[] | null
          required_experience_years?: number | null
          service_request_id?: number | null
          started_work?: string | null
          travel_compensation?: number | null
          travel_time_minutes?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_assignments_service_request_id_fkey"
            columns: ["service_request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      service_categories: {
        Row: {
          active: boolean | null
          advance_booking_hours: number | null
          category_description: string | null
          category_icon: string | null
          category_name: string
          created_at: string | null
          emergency_service: boolean | null
          estimated_duration_hours: number | null
          id: number
          pricing_model: string | null
          recurring_service: boolean | null
          requires_boat_access: boolean | null
          requires_scheduling: boolean | null
          requires_specialist: boolean | null
          seasonal_service: boolean | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          advance_booking_hours?: number | null
          category_description?: string | null
          category_icon?: string | null
          category_name: string
          created_at?: string | null
          emergency_service?: boolean | null
          estimated_duration_hours?: number | null
          id?: number
          pricing_model?: string | null
          recurring_service?: boolean | null
          requires_boat_access?: boolean | null
          requires_scheduling?: boolean | null
          requires_specialist?: boolean | null
          seasonal_service?: boolean | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          advance_booking_hours?: number | null
          category_description?: string | null
          category_icon?: string | null
          category_name?: string
          created_at?: string | null
          emergency_service?: boolean | null
          estimated_duration_hours?: number | null
          id?: number
          pricing_model?: string | null
          recurring_service?: boolean | null
          requires_boat_access?: boolean | null
          requires_scheduling?: boolean | null
          requires_specialist?: boolean | null
          seasonal_service?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      service_contracts: {
        Row: {
          additional_travel_charges: boolean | null
          annual_fee: number | null
          auto_renew: boolean | null
          billing_contact: string | null
          boat_access_instructions: string | null
          boat_id: number | null
          contract_number: string
          contract_status: string | null
          contract_type: string
          created_at: string | null
          customer_id: number | null
          customer_satisfaction_score: number | null
          detailed_logs: boolean | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_response_time_hours: number | null
          end_date: string | null
          id: number
          last_service_date: string | null
          late_payment_fee: number | null
          monthly_fee: number | null
          next_scheduled_service: string | null
          payment_due_day: number | null
          payment_frequency: string | null
          penalty_clauses: string | null
          performance_metrics: Json | null
          photo_reporting: boolean | null
          primary_contact_name: string | null
          primary_contact_phone: string | null
          renewal_period_months: number | null
          reporting_frequency: string | null
          response_time_hours: number | null
          security_codes: string | null
          service_area: string | null
          service_frequency: Json | null
          service_level_agreement: string | null
          services_completed: number | null
          services_included: string[] | null
          setup_fee: number | null
          start_date: string
          termination_notice_days: number | null
          total_value: number | null
          updated_at: string | null
        }
        Insert: {
          additional_travel_charges?: boolean | null
          annual_fee?: number | null
          auto_renew?: boolean | null
          billing_contact?: string | null
          boat_access_instructions?: string | null
          boat_id?: number | null
          contract_number: string
          contract_status?: string | null
          contract_type: string
          created_at?: string | null
          customer_id?: number | null
          customer_satisfaction_score?: number | null
          detailed_logs?: boolean | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_response_time_hours?: number | null
          end_date?: string | null
          id?: number
          last_service_date?: string | null
          late_payment_fee?: number | null
          monthly_fee?: number | null
          next_scheduled_service?: string | null
          payment_due_day?: number | null
          payment_frequency?: string | null
          penalty_clauses?: string | null
          performance_metrics?: Json | null
          photo_reporting?: boolean | null
          primary_contact_name?: string | null
          primary_contact_phone?: string | null
          renewal_period_months?: number | null
          reporting_frequency?: string | null
          response_time_hours?: number | null
          security_codes?: string | null
          service_area?: string | null
          service_frequency?: Json | null
          service_level_agreement?: string | null
          services_completed?: number | null
          services_included?: string[] | null
          setup_fee?: number | null
          start_date: string
          termination_notice_days?: number | null
          total_value?: number | null
          updated_at?: string | null
        }
        Update: {
          additional_travel_charges?: boolean | null
          annual_fee?: number | null
          auto_renew?: boolean | null
          billing_contact?: string | null
          boat_access_instructions?: string | null
          boat_id?: number | null
          contract_number?: string
          contract_status?: string | null
          contract_type?: string
          created_at?: string | null
          customer_id?: number | null
          customer_satisfaction_score?: number | null
          detailed_logs?: boolean | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_response_time_hours?: number | null
          end_date?: string | null
          id?: number
          last_service_date?: string | null
          late_payment_fee?: number | null
          monthly_fee?: number | null
          next_scheduled_service?: string | null
          payment_due_day?: number | null
          payment_frequency?: string | null
          penalty_clauses?: string | null
          performance_metrics?: Json | null
          photo_reporting?: boolean | null
          primary_contact_name?: string | null
          primary_contact_phone?: string | null
          renewal_period_months?: number | null
          reporting_frequency?: string | null
          response_time_hours?: number | null
          security_codes?: string | null
          service_area?: string | null
          service_frequency?: Json | null
          service_level_agreement?: string | null
          services_completed?: number | null
          services_included?: string[] | null
          setup_fee?: number | null
          start_date?: string
          termination_notice_days?: number | null
          total_value?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_contracts_boat_id_fkey"
            columns: ["boat_id"]
            isOneToOne: false
            referencedRelation: "boat_registry"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_contracts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_360_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_contracts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_service_usage"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "service_contracts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      service_invoices: {
        Row: {
          created_at: string | null
          currency: string | null
          customer_id: number
          discount_amount_eur: number | null
          discount_percent: number | null
          due_date: string | null
          exchange_rate: number | null
          id: number
          invoice_date: string | null
          invoice_number: string
          invoice_status: string | null
          invoice_type: string | null
          late_fee_eur: number | null
          notes: string | null
          outstanding_amount_eur: number | null
          paid_amount_eur: number | null
          payment_date: string | null
          payment_method: string | null
          payment_reference: string | null
          service_period_end: string | null
          service_period_start: string | null
          subtotal_eur: number | null
          tax_amount_eur: number | null
          tax_rate: number | null
          total_amount_eur: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          currency?: string | null
          customer_id: number
          discount_amount_eur?: number | null
          discount_percent?: number | null
          due_date?: string | null
          exchange_rate?: number | null
          id?: number
          invoice_date?: string | null
          invoice_number: string
          invoice_status?: string | null
          invoice_type?: string | null
          late_fee_eur?: number | null
          notes?: string | null
          outstanding_amount_eur?: number | null
          paid_amount_eur?: number | null
          payment_date?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          service_period_end?: string | null
          service_period_start?: string | null
          subtotal_eur?: number | null
          tax_amount_eur?: number | null
          tax_rate?: number | null
          total_amount_eur: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          currency?: string | null
          customer_id?: number
          discount_amount_eur?: number | null
          discount_percent?: number | null
          due_date?: string | null
          exchange_rate?: number | null
          id?: number
          invoice_date?: string | null
          invoice_number?: string
          invoice_status?: string | null
          invoice_type?: string | null
          late_fee_eur?: number | null
          notes?: string | null
          outstanding_amount_eur?: number | null
          paid_amount_eur?: number | null
          payment_date?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          service_period_end?: string | null
          service_period_start?: string | null
          subtotal_eur?: number | null
          tax_amount_eur?: number | null
          tax_rate?: number | null
          total_amount_eur?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_360_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_service_usage"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "service_invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      service_offerings: {
        Row: {
          active: boolean | null
          base_price: number | null
          boat_type_restrictions: string[] | null
          category_id: number | null
          consumables_included: string[] | null
          created_at: string | null
          crew_required: number | null
          currency: string | null
          detailed_scope: string | null
          duration_hours: number | null
          equipment_required: string[] | null
          id: number
          insurance_coverage: boolean | null
          maximum_charge: number | null
          minimum_charge: number | null
          quality_guarantee: boolean | null
          seasonal_pricing: Json | null
          service_code: string | null
          service_description: string | null
          service_level: string | null
          service_name: string
          size_restrictions: Json | null
          travel_surcharge_per_km: number | null
          updated_at: string | null
          volume_discounts: Json | null
        }
        Insert: {
          active?: boolean | null
          base_price?: number | null
          boat_type_restrictions?: string[] | null
          category_id?: number | null
          consumables_included?: string[] | null
          created_at?: string | null
          crew_required?: number | null
          currency?: string | null
          detailed_scope?: string | null
          duration_hours?: number | null
          equipment_required?: string[] | null
          id?: number
          insurance_coverage?: boolean | null
          maximum_charge?: number | null
          minimum_charge?: number | null
          quality_guarantee?: boolean | null
          seasonal_pricing?: Json | null
          service_code?: string | null
          service_description?: string | null
          service_level?: string | null
          service_name: string
          size_restrictions?: Json | null
          travel_surcharge_per_km?: number | null
          updated_at?: string | null
          volume_discounts?: Json | null
        }
        Update: {
          active?: boolean | null
          base_price?: number | null
          boat_type_restrictions?: string[] | null
          category_id?: number | null
          consumables_included?: string[] | null
          created_at?: string | null
          crew_required?: number | null
          currency?: string | null
          detailed_scope?: string | null
          duration_hours?: number | null
          equipment_required?: string[] | null
          id?: number
          insurance_coverage?: boolean | null
          maximum_charge?: number | null
          minimum_charge?: number | null
          quality_guarantee?: boolean | null
          seasonal_pricing?: Json | null
          service_code?: string | null
          service_description?: string | null
          service_level?: string | null
          service_name?: string
          size_restrictions?: Json | null
          travel_surcharge_per_km?: number | null
          updated_at?: string | null
          volume_discounts?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "service_offerings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      service_providers: {
        Row: {
          active: boolean | null
          address: string | null
          availability_hours: string | null
          call_out_fee: number | null
          certifications: string[] | null
          contact_person: string | null
          created_at: string | null
          email: string | null
          emergency_available: boolean | null
          hourly_rate: number | null
          id: number
          insurance_valid_until: string | null
          jobs_completed: number | null
          languages_spoken: string[] | null
          last_job_date: string | null
          location: string | null
          minimum_charge: number | null
          notes: string | null
          operating_radius_km: number | null
          payment_terms_days: number | null
          phone: string | null
          preferred_vendor: boolean | null
          provider_name: string
          provider_type: string | null
          rating_average: number | null
          rating_count: number | null
          service_categories: string[]
          specializations: string[] | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          address?: string | null
          availability_hours?: string | null
          call_out_fee?: number | null
          certifications?: string[] | null
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          emergency_available?: boolean | null
          hourly_rate?: number | null
          id?: number
          insurance_valid_until?: string | null
          jobs_completed?: number | null
          languages_spoken?: string[] | null
          last_job_date?: string | null
          location?: string | null
          minimum_charge?: number | null
          notes?: string | null
          operating_radius_km?: number | null
          payment_terms_days?: number | null
          phone?: string | null
          preferred_vendor?: boolean | null
          provider_name: string
          provider_type?: string | null
          rating_average?: number | null
          rating_count?: number | null
          service_categories: string[]
          specializations?: string[] | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          address?: string | null
          availability_hours?: string | null
          call_out_fee?: number | null
          certifications?: string[] | null
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          emergency_available?: boolean | null
          hourly_rate?: number | null
          id?: number
          insurance_valid_until?: string | null
          jobs_completed?: number | null
          languages_spoken?: string[] | null
          last_job_date?: string | null
          location?: string | null
          minimum_charge?: number | null
          notes?: string | null
          operating_radius_km?: number | null
          payment_terms_days?: number | null
          phone?: string | null
          preferred_vendor?: boolean | null
          provider_name?: string
          provider_type?: string | null
          rating_average?: number | null
          rating_count?: number | null
          service_categories?: string[]
          specializations?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      service_requests: {
        Row: {
          access_instructions: string | null
          actual_duration_hours: number | null
          actual_price: number | null
          additional_charges: number | null
          approved_price: number | null
          assigned_team: string[] | null
          assigned_vendor_id: number | null
          boat_id: number | null
          boat_location_coordinates: string | null
          completion_notes: string | null
          completion_status: string | null
          contract_id: number | null
          created_at: string | null
          customer_feedback: string | null
          customer_id: number | null
          customer_rating: number | null
          discount_applied: number | null
          documentation_provided: boolean | null
          environmental_considerations: string | null
          equipment_assigned: string[] | null
          estimated_duration_hours: number | null
          follow_up_date: string | null
          follow_up_required: boolean | null
          id: number
          next_recommended_service: string | null
          photos_taken: number | null
          priority_level: number | null
          quoted_price: number | null
          request_number: string
          request_status: string | null
          request_type: string | null
          requested_date: string | null
          requested_time_end: string | null
          requested_time_start: string | null
          safety_requirements: string | null
          scheduled_date: string | null
          scheduled_time_end: string | null
          scheduled_time_start: string | null
          service_description: string | null
          service_location: string | null
          service_offering_id: number | null
          special_requirements: string | null
          specialist_required: boolean | null
          tax_amount: number | null
          team_leader: string | null
          travel_distance_km: number | null
          travel_required: boolean | null
          updated_at: string | null
          warranty_period_days: number | null
        }
        Insert: {
          access_instructions?: string | null
          actual_duration_hours?: number | null
          actual_price?: number | null
          additional_charges?: number | null
          approved_price?: number | null
          assigned_team?: string[] | null
          assigned_vendor_id?: number | null
          boat_id?: number | null
          boat_location_coordinates?: string | null
          completion_notes?: string | null
          completion_status?: string | null
          contract_id?: number | null
          created_at?: string | null
          customer_feedback?: string | null
          customer_id?: number | null
          customer_rating?: number | null
          discount_applied?: number | null
          documentation_provided?: boolean | null
          environmental_considerations?: string | null
          equipment_assigned?: string[] | null
          estimated_duration_hours?: number | null
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: number
          next_recommended_service?: string | null
          photos_taken?: number | null
          priority_level?: number | null
          quoted_price?: number | null
          request_number: string
          request_status?: string | null
          request_type?: string | null
          requested_date?: string | null
          requested_time_end?: string | null
          requested_time_start?: string | null
          safety_requirements?: string | null
          scheduled_date?: string | null
          scheduled_time_end?: string | null
          scheduled_time_start?: string | null
          service_description?: string | null
          service_location?: string | null
          service_offering_id?: number | null
          special_requirements?: string | null
          specialist_required?: boolean | null
          tax_amount?: number | null
          team_leader?: string | null
          travel_distance_km?: number | null
          travel_required?: boolean | null
          updated_at?: string | null
          warranty_period_days?: number | null
        }
        Update: {
          access_instructions?: string | null
          actual_duration_hours?: number | null
          actual_price?: number | null
          additional_charges?: number | null
          approved_price?: number | null
          assigned_team?: string[] | null
          assigned_vendor_id?: number | null
          boat_id?: number | null
          boat_location_coordinates?: string | null
          completion_notes?: string | null
          completion_status?: string | null
          contract_id?: number | null
          created_at?: string | null
          customer_feedback?: string | null
          customer_id?: number | null
          customer_rating?: number | null
          discount_applied?: number | null
          documentation_provided?: boolean | null
          environmental_considerations?: string | null
          equipment_assigned?: string[] | null
          estimated_duration_hours?: number | null
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: number
          next_recommended_service?: string | null
          photos_taken?: number | null
          priority_level?: number | null
          quoted_price?: number | null
          request_number?: string
          request_status?: string | null
          request_type?: string | null
          requested_date?: string | null
          requested_time_end?: string | null
          requested_time_start?: string | null
          safety_requirements?: string | null
          scheduled_date?: string | null
          scheduled_time_end?: string | null
          scheduled_time_start?: string | null
          service_description?: string | null
          service_location?: string | null
          service_offering_id?: number | null
          special_requirements?: string | null
          specialist_required?: boolean | null
          tax_amount?: number | null
          team_leader?: string | null
          travel_distance_km?: number | null
          travel_required?: boolean | null
          updated_at?: string | null
          warranty_period_days?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "service_requests_boat_id_fkey"
            columns: ["boat_id"]
            isOneToOne: false
            referencedRelation: "boat_registry"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "service_contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_360_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_service_usage"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "service_requests_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_service_offering_id_fkey"
            columns: ["service_offering_id"]
            isOneToOne: false
            referencedRelation: "service_offerings"
            referencedColumns: ["id"]
          },
        ]
      }
      service_reviews: {
        Row: {
          communication_rating: number | null
          created_at: string | null
          customer_id: number | null
          guardiennage_schedule_id: number | null
          id: number
          maintenance_request_id: number | null
          overall_rating: number | null
          provider_id: number
          quality_rating: number | null
          response_from_provider: string | null
          review_date: string | null
          review_text: string | null
          reviewer_name: string | null
          service_request_id: number | null
          timeliness_rating: number | null
          updated_at: string | null
          value_rating: number | null
          would_recommend: boolean | null
        }
        Insert: {
          communication_rating?: number | null
          created_at?: string | null
          customer_id?: number | null
          guardiennage_schedule_id?: number | null
          id?: number
          maintenance_request_id?: number | null
          overall_rating?: number | null
          provider_id: number
          quality_rating?: number | null
          response_from_provider?: string | null
          review_date?: string | null
          review_text?: string | null
          reviewer_name?: string | null
          service_request_id?: number | null
          timeliness_rating?: number | null
          updated_at?: string | null
          value_rating?: number | null
          would_recommend?: boolean | null
        }
        Update: {
          communication_rating?: number | null
          created_at?: string | null
          customer_id?: number | null
          guardiennage_schedule_id?: number | null
          id?: number
          maintenance_request_id?: number | null
          overall_rating?: number | null
          provider_id?: number
          quality_rating?: number | null
          response_from_provider?: string | null
          review_date?: string | null
          review_text?: string | null
          reviewer_name?: string | null
          service_request_id?: number | null
          timeliness_rating?: number | null
          updated_at?: string | null
          value_rating?: number | null
          would_recommend?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "service_reviews_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_360_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_reviews_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_service_usage"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "service_reviews_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_reviews_guardiennage_schedule_id_fkey"
            columns: ["guardiennage_schedule_id"]
            isOneToOne: false
            referencedRelation: "guardiennage_schedules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_reviews_maintenance_request_id_fkey"
            columns: ["maintenance_request_id"]
            isOneToOne: false
            referencedRelation: "maintenance_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_reviews_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "service_providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_reviews_service_request_id_fkey"
            columns: ["service_request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      session_problems: {
        Row: {
          attempted_solution: string | null
          claude_response_type: string | null
          error_message: string | null
          id: number
          impact_level: string | null
          lessons_learned: string | null
          mcp_server_involved: string | null
          problem_description: string
          problem_type: string
          protocol_updates_needed: string | null
          resolution_notes: string | null
          resolution_status: string | null
          session_date: string | null
          user_request: string | null
        }
        Insert: {
          attempted_solution?: string | null
          claude_response_type?: string | null
          error_message?: string | null
          id?: number
          impact_level?: string | null
          lessons_learned?: string | null
          mcp_server_involved?: string | null
          problem_description: string
          problem_type: string
          protocol_updates_needed?: string | null
          resolution_notes?: string | null
          resolution_status?: string | null
          session_date?: string | null
          user_request?: string | null
        }
        Update: {
          attempted_solution?: string | null
          claude_response_type?: string | null
          error_message?: string | null
          id?: number
          impact_level?: string | null
          lessons_learned?: string | null
          mcp_server_involved?: string | null
          problem_description?: string
          problem_type?: string
          protocol_updates_needed?: string | null
          resolution_notes?: string | null
          resolution_status?: string | null
          session_date?: string | null
          user_request?: string | null
        }
        Relationships: []
      }
      stripe_checkout_sessions: {
        Row: {
          amount: number
          booking_reference: string
          completed_at: string | null
          created_at: string | null
          currency: string
          customer_email: string
          id: string
          metadata: Json | null
          payment_intent_id: string | null
          session_id: string
          status: string | null
        }
        Insert: {
          amount: number
          booking_reference: string
          completed_at?: string | null
          created_at?: string | null
          currency: string
          customer_email: string
          id?: string
          metadata?: Json | null
          payment_intent_id?: string | null
          session_id: string
          status?: string | null
        }
        Update: {
          amount?: number
          booking_reference?: string
          completed_at?: string | null
          created_at?: string | null
          currency?: string
          customer_email?: string
          id?: string
          metadata?: Json | null
          payment_intent_id?: string | null
          session_id?: string
          status?: string | null
        }
        Relationships: []
      }
      subtasks: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          id: string
          notes: string | null
          status: string
          task_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          status: string
          task_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          status?: string
          task_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subtasks_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
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
      tasks: {
        Row: {
          assigned_to: string | null
          boat: string
          calendar_event_id: string | null
          calendar_type: string | null
          category: string
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          notes: string | null
          priority: string
          scheduled_date: string | null
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          boat: string
          calendar_event_id?: string | null
          calendar_type?: string | null
          category?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          notes?: string | null
          priority: string
          scheduled_date?: string | null
          status: string
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          boat?: string
          calendar_event_id?: string | null
          calendar_type?: string | null
          category?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          notes?: string | null
          priority?: string
          scheduled_date?: string | null
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      unavailabilities: {
        Row: {
          all_day: boolean | null
          boat_name: string
          created_at: string | null
          created_by: string | null
          end_date: string
          end_time: string | null
          id: number
          notes: string | null
          priority_level: number | null
          reason: string
          reason_type: string | null
          recurring: boolean | null
          recurring_pattern: string | null
          recurring_until: string | null
          start_date: string
          start_time: string | null
          updated_at: string | null
        }
        Insert: {
          all_day?: boolean | null
          boat_name: string
          created_at?: string | null
          created_by?: string | null
          end_date: string
          end_time?: string | null
          id?: number
          notes?: string | null
          priority_level?: number | null
          reason?: string
          reason_type?: string | null
          recurring?: boolean | null
          recurring_pattern?: string | null
          recurring_until?: string | null
          start_date: string
          start_time?: string | null
          updated_at?: string | null
        }
        Update: {
          all_day?: boolean | null
          boat_name?: string
          created_at?: string | null
          created_by?: string | null
          end_date?: string
          end_time?: string | null
          id?: number
          notes?: string | null
          priority_level?: number | null
          reason?: string
          reason_type?: string | null
          recurring?: boolean | null
          recurring_pattern?: string | null
          recurring_until?: string | null
          start_date?: string
          start_time?: string | null
          updated_at?: string | null
        }
        Relationships: []
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
      users: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          password_hash: string | null
          role: string
          updated_at: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          password_hash?: string | null
          role: string
          updated_at?: string | null
          username: string
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          password_hash?: string | null
          role?: string
          updated_at?: string | null
          username?: string
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
      yacht_inventory: {
        Row: {
          active: boolean | null
          beam_meters: number | null
          broker_assigned: string | null
          commission_rate: number | null
          condition_rating: number | null
          created_at: string | null
          current_location: string | null
          draft_meters: number | null
          engine_hp: number | null
          engine_type: string | null
          fuel_capacity_liters: number | null
          id: number
          inquiry_count: number | null
          key_features: string[] | null
          length_meters: number | null
          listing_date: string | null
          listing_status: string | null
          listing_type: string | null
          make_model: string | null
          marketing_description: string | null
          owner_contact: string | null
          owner_location: string | null
          photos_count: number | null
          price_eur: number | null
          survey_date: string | null
          survey_report_url: string | null
          target_sale_date: string | null
          updated_at: string | null
          viewing_count: number | null
          water_capacity_liters: number | null
          yacht_name: string
          year_built: number | null
        }
        Insert: {
          active?: boolean | null
          beam_meters?: number | null
          broker_assigned?: string | null
          commission_rate?: number | null
          condition_rating?: number | null
          created_at?: string | null
          current_location?: string | null
          draft_meters?: number | null
          engine_hp?: number | null
          engine_type?: string | null
          fuel_capacity_liters?: number | null
          id?: number
          inquiry_count?: number | null
          key_features?: string[] | null
          length_meters?: number | null
          listing_date?: string | null
          listing_status?: string | null
          listing_type?: string | null
          make_model?: string | null
          marketing_description?: string | null
          owner_contact?: string | null
          owner_location?: string | null
          photos_count?: number | null
          price_eur?: number | null
          survey_date?: string | null
          survey_report_url?: string | null
          target_sale_date?: string | null
          updated_at?: string | null
          viewing_count?: number | null
          water_capacity_liters?: number | null
          yacht_name: string
          year_built?: number | null
        }
        Update: {
          active?: boolean | null
          beam_meters?: number | null
          broker_assigned?: string | null
          commission_rate?: number | null
          condition_rating?: number | null
          created_at?: string | null
          current_location?: string | null
          draft_meters?: number | null
          engine_hp?: number | null
          engine_type?: string | null
          fuel_capacity_liters?: number | null
          id?: number
          inquiry_count?: number | null
          key_features?: string[] | null
          length_meters?: number | null
          listing_date?: string | null
          listing_status?: string | null
          listing_type?: string | null
          make_model?: string | null
          marketing_description?: string | null
          owner_contact?: string | null
          owner_location?: string | null
          photos_count?: number | null
          price_eur?: number | null
          survey_date?: string | null
          survey_report_url?: string | null
          target_sale_date?: string | null
          updated_at?: string | null
          viewing_count?: number | null
          water_capacity_liters?: number | null
          yacht_name?: string
          year_built?: number | null
        }
        Relationships: []
      }
      yacht_viewings: {
        Row: {
          attendees_count: number | null
          broker_assigned: string | null
          created_at: string | null
          duration_hours: number | null
          follow_up_required: boolean | null
          id: number
          interest_level: number | null
          lead_id: number | null
          offer_potential: boolean | null
          preparation_notes: string | null
          updated_at: string | null
          viewer_contact: string | null
          viewer_name: string
          viewing_date: string
          viewing_feedback: string | null
          viewing_status: string | null
          viewing_time: string
          viewing_type: string | null
          yacht_id: number
        }
        Insert: {
          attendees_count?: number | null
          broker_assigned?: string | null
          created_at?: string | null
          duration_hours?: number | null
          follow_up_required?: boolean | null
          id?: number
          interest_level?: number | null
          lead_id?: number | null
          offer_potential?: boolean | null
          preparation_notes?: string | null
          updated_at?: string | null
          viewer_contact?: string | null
          viewer_name: string
          viewing_date: string
          viewing_feedback?: string | null
          viewing_status?: string | null
          viewing_time: string
          viewing_type?: string | null
          yacht_id: number
        }
        Update: {
          attendees_count?: number | null
          broker_assigned?: string | null
          created_at?: string | null
          duration_hours?: number | null
          follow_up_required?: boolean | null
          id?: number
          interest_level?: number | null
          lead_id?: number | null
          offer_potential?: boolean | null
          preparation_notes?: string | null
          updated_at?: string | null
          viewer_contact?: string | null
          viewer_name?: string
          viewing_date?: string
          viewing_feedback?: string | null
          viewing_status?: string | null
          viewing_time?: string
          viewing_type?: string | null
          yacht_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "yacht_viewings_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "sales_leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "yacht_viewings_yacht_id_fkey"
            columns: ["yacht_id"]
            isOneToOne: false
            referencedRelation: "yacht_inventory"
            referencedColumns: ["id"]
          },
        ]
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
      admin_control_panel: {
        Row: {
          active_count: number | null
          component: string | null
          description: string | null
          total_count: number | null
        }
        Relationships: []
      }
      admin_field_mappings: {
        Row: {
          andronautic_field: string | null
          created_at: string | null
          default_value: string | null
          field_type: string | null
          id: number | null
          is_mapped: boolean | null
          mapping_status: string | null
          supabase_field: string | null
          transformation_rule: string | null
          updated_at: string | null
        }
        Insert: {
          andronautic_field?: string | null
          created_at?: string | null
          default_value?: string | null
          field_type?: string | null
          id?: number | null
          is_mapped?: boolean | null
          mapping_status?: never
          supabase_field?: string | null
          transformation_rule?: string | null
          updated_at?: string | null
        }
        Update: {
          andronautic_field?: string | null
          created_at?: string | null
          default_value?: string | null
          field_type?: string | null
          id?: number | null
          is_mapped?: boolean | null
          mapping_status?: never
          supabase_field?: string | null
          transformation_rule?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      agency_performance_dashboard: {
        Row: {
          account_manager: string | null
          agency_name: string | null
          agency_type: string | null
          avg_booking_value_2024: number | null
          booking_growth: number | null
          bookings_2024: number | null
          commission_paid_2024: number | null
          commission_percentage: number | null
          primary_contact_name: string | null
          relationship_status: string | null
          revenue_2024: number | null
          revenue_growth: number | null
        }
        Relationships: []
      }
      boat_performance_dashboard: {
        Row: {
          available_slots: number | null
          avg_booking_value: number | null
          avg_guests_per_charter: number | null
          boat_name: string | null
          booked_slots: number | null
          maintenance_events: number | null
          profit_margin_percentage: number | null
          revenue_per_hour: number | null
          total_bookings: number | null
          total_charter_hours: number | null
          total_guests_served: number | null
          total_maintenance_cost: number | null
          total_maintenance_hours: number | null
          total_revenue: number | null
          utilization_category: string | null
          utilization_percentage: number | null
        }
        Relationships: []
      }
      bookings_management_dashboard: {
        Row: {
          boat: string | null
          booking_source: string | null
          booking_status: string | null
          charter_date: string | null
          charter_overview_sent: boolean | null
          charter_total: number | null
          client_messaging_status: string | null
          contract_signed: boolean | null
          guest_email: string | null
          guest_name: string | null
          guest_phone: string | null
          locator: string | null
          outstanding_amount: number | null
          paid_amount: number | null
          preparation_status: string | null
          total_guests: number | null
        }
        Relationships: []
      }
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
      calendar_availability: {
        Row: {
          availability_date: string | null
          boat_name: string | null
          guest_name: string | null
          locator: string | null
          reason: string | null
          reason_type: string | null
          status: string | null
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
      communication_dashboard: {
        Row: {
          booking_source: string | null
          charter_date: string | null
          communication_channel: string | null
          communication_type: string | null
          days_until_charter: unknown | null
          follow_up_date: string | null
          follow_up_required: boolean | null
          guest_name: string | null
          locator: string | null
          priority_level: string | null
          resolved: boolean | null
          sender_name: string | null
          sent_at: string | null
        }
        Relationships: [
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
            referencedRelation: "bookings_management_dashboard"
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
          {
            foreignKeyName: "customer_communications_locator_fkey"
            columns: ["locator"]
            isOneToOne: false
            referencedRelation: "calendar_availability"
            referencedColumns: ["locator"]
          },
          {
            foreignKeyName: "customer_communications_locator_fkey"
            columns: ["locator"]
            isOneToOne: false
            referencedRelation: "operations_dashboard"
            referencedColumns: ["locator"]
          },
          {
            foreignKeyName: "customer_communications_locator_fkey"
            columns: ["locator"]
            isOneToOne: false
            referencedRelation: "purser_dashboard"
            referencedColumns: ["locator"]
          },
          {
            foreignKeyName: "customer_communications_locator_fkey"
            columns: ["locator"]
            isOneToOne: false
            referencedRelation: "skipper_dashboard"
            referencedColumns: ["locator"]
          },
        ]
      }
      complete_field_mapping_status: {
        Row: {
          category: string | null
          field_name: string | null
          implementation_status: string | null
          mapping_status: string | null
          priority_order: number | null
          supabase_field: string | null
        }
        Relationships: []
      }
      crew_efficiency_metrics: {
        Row: {
          avg_charter_duration_hours: number | null
          avg_customer_rating: number | null
          avg_guests_per_charter: number | null
          boat_specializations: string | null
          crew_name: string | null
          hourly_rate: number | null
          performance_category: string | null
          performance_rating: number | null
          positive_review_percentage: number | null
          reliability_score: number | null
          revenue_per_charter: number | null
          total_charters: number | null
          total_customer_reviews: number | null
          total_revenue_generated: number | null
        }
        Relationships: []
      }
      current_tasks: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          estimated_time_hours: number | null
          id: string | null
          priority: string | null
          sort_order: number | null
          task_description: string | null
          task_status: string | null
          task_title: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          estimated_time_hours?: number | null
          id?: string | null
          priority?: string | null
          sort_order?: never
          task_description?: string | null
          task_status?: string | null
          task_title?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          estimated_time_hours?: number | null
          id?: string | null
          priority?: string | null
          sort_order?: never
          task_description?: string | null
          task_status?: string | null
          task_title?: string | null
        }
        Relationships: []
      }
      customer_360_view: {
        Row: {
          acquisition_date: string | null
          acquisition_source: string | null
          activity_status: string | null
          average_booking_value: number | null
          average_review_rating: number | null
          avg_satisfaction_score: number | null
          customer_key: string | null
          customer_lifetime_value: number | null
          customer_segment: string | null
          customer_status: string | null
          dietary_restrictions: string[] | null
          email_primary: string | null
          favorite_boat: string | null
          full_name: string | null
          id: number | null
          last_booking_date: string | null
          last_contact_date: string | null
          last_contact_method: string | null
          latest_review_date: string | null
          nationality: string | null
          phone_primary: string | null
          preferred_season: string | null
          special_requirements: string[] | null
          total_bookings: number | null
          total_charter_hours: number | null
          total_charters: number | null
          total_reviews_given: number | null
          total_spent: number | null
        }
        Relationships: []
      }
      customer_service_usage: {
        Row: {
          active_contracts: number | null
          avg_service_rating: number | null
          customer_id: number | null
          customer_type: string | null
          full_name: string | null
          last_service_date: string | null
          monthly_contract_value: number | null
          phone_primary: string | null
          services_used: string[] | null
          total_service_requests: number | null
          total_service_spending: number | null
        }
        Relationships: []
      }
      data_audit_summary: {
        Row: {
          data_source: string | null
          earliest_record: string | null
          latest_record: string | null
          record_count: number | null
          table_name: string | null
        }
        Relationships: []
      }
      financial_overview_extended: {
        Row: {
          avg_booking_value: number | null
          avg_payment_days: number | null
          booking_source: string | null
          bookings_count: number | null
          charter_revenue: number | null
          charter_revenue_percentage: number | null
          extras_revenue: number | null
          extras_revenue_percentage: number | null
          fully_paid_bookings: number | null
          gross_profit: number | null
          gross_profit_margin: number | null
          maintenance_costs: number | null
          payment_completion_rate: number | null
          revenue_month: string | null
          service_revenue: number | null
          total_outstanding: number | null
          total_paid: number | null
          total_revenue: number | null
        }
        Relationships: []
      }
      fleet_overview: {
        Row: {
          available_days_30: number | null
          avg_charter_value: number | null
          boat_name: string | null
          boat_type: string | null
          insurance_expiry: string | null
          last_charter_date: string | null
          maintenance_due_date: string | null
          max_passengers: number | null
          owner_commission_percentage: number | null
          ownership_status: string | null
          partner_company: string | null
          total_charters: number | null
          total_revenue: number | null
          zatara_commission_percentage: number | null
        }
        Relationships: []
      }
      operations_dashboard: {
        Row: {
          boat: string | null
          booking_status: string | null
          catering_details: string | null
          charter_date: string | null
          charter_notes: string | null
          charter_overview_sent: boolean | null
          cleared_for_departure: boolean | null
          guest_name: string | null
          locator: string | null
          operational_status: string | null
          pre_departure_checks: boolean | null
          skipper_name: string | null
          start_time: string | null
          total_guests: number | null
          water_toys: string | null
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
      predictive_analytics_view: {
        Row: {
          avg_growth_rate: number | null
          avg_guests: number | null
          bookings_count: number | null
          month_over_month_growth: number | null
          monthly_revenue: number | null
          seasonal_avg_value: number | null
          seasonal_category: string | null
          seasonal_volatility: number | null
          three_month_moving_avg: number | null
          trend_direction: string | null
          trend_month: string | null
        }
        Relationships: []
      }
      purser_dashboard: {
        Row: {
          boat: string | null
          booking_source: string | null
          card_payment: number | null
          cash_payment: number | null
          charter_date: string | null
          charter_total: number | null
          deposit_amount: number | null
          extras_total: number | null
          guest_name: string | null
          locator: string | null
          outstanding_amount: number | null
          paid_amount: number | null
          payment_percentage: number | null
          payment_status: string | null
        }
        Insert: {
          boat?: string | null
          booking_source?: string | null
          card_payment?: number | null
          cash_payment?: number | null
          charter_date?: never
          charter_total?: number | null
          deposit_amount?: number | null
          extras_total?: number | null
          guest_name?: never
          locator?: string | null
          outstanding_amount?: number | null
          paid_amount?: number | null
          payment_percentage?: never
          payment_status?: never
        }
        Update: {
          boat?: string | null
          booking_source?: string | null
          card_payment?: number | null
          cash_payment?: number | null
          charter_date?: never
          charter_total?: number | null
          deposit_amount?: number | null
          extras_total?: number | null
          guest_name?: never
          locator?: string | null
          outstanding_amount?: number | null
          paid_amount?: number | null
          payment_percentage?: never
          payment_status?: never
        }
        Relationships: []
      }
      security_dashboard: {
        Row: {
          critical_issues: number | null
          medium_issues: number | null
          section: string | null
          status: string | null
          total_issues: number | null
        }
        Relationships: []
      }
      service_dashboard: {
        Row: {
          active_contracts: number | null
          avg_satisfaction_30d: number | null
          emergency_responses_week: number | null
          monthly_service_revenue: number | null
          pending_requests: number | null
          todays_services: number | null
        }
        Relationships: []
      }
      service_performance_by_category: {
        Row: {
          avg_duration: number | null
          avg_price: number | null
          avg_rating: number | null
          category_description: string | null
          category_name: string | null
          completed_requests: number | null
          completion_rate_percent: number | null
          total_requests: number | null
          total_revenue: number | null
        }
        Relationships: []
      }
      skipper_dashboard: {
        Row: {
          boat: string | null
          booking_status: string | null
          catering_details: string | null
          charter_date: string | null
          charter_notes: string | null
          cleared_for_departure: boolean | null
          end_time: string | null
          guest_name: string | null
          guest_phone: string | null
          locator: string | null
          meeting_point: string | null
          pre_departure_checks: boolean | null
          skipper_name: string | null
          start_time: string | null
          time_category: string | null
          total_guests: number | null
          water_toys: string | null
        }
        Relationships: []
      }
      sync_monitoring_dashboard: {
        Row: {
          bookings_imported_24h: number | null
          bookings_processed_24h: number | null
          consecutive_failures: number | null
          error_count: number | null
          health_status: string | null
          last_successful_sync: string | null
          minutes_since_last_sync: number | null
          next_sync_due: string | null
          platform_name: string | null
          records_synced_last_run: number | null
          sync_status: string | null
          sync_type: string | null
          total_records_synced: number | null
        }
        Insert: {
          bookings_imported_24h?: never
          bookings_processed_24h?: never
          consecutive_failures?: number | null
          error_count?: number | null
          health_status?: never
          last_successful_sync?: string | null
          minutes_since_last_sync?: never
          next_sync_due?: never
          platform_name?: string | null
          records_synced_last_run?: number | null
          sync_status?: string | null
          sync_type?: string | null
          total_records_synced?: number | null
        }
        Update: {
          bookings_imported_24h?: never
          bookings_processed_24h?: never
          consecutive_failures?: number | null
          error_count?: number | null
          health_status?: never
          last_successful_sync?: string | null
          minutes_since_last_sync?: never
          next_sync_due?: never
          platform_name?: string | null
          records_synced_last_run?: number | null
          sync_status?: string | null
          sync_type?: string | null
          total_records_synced?: number | null
        }
        Relationships: []
      }
      system_performance_monitor: {
        Row: {
          description: string | null
          metric: string | null
          value: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      add_boat_to_fleet: {
        Args: {
          p_boat_name: string
          p_boat_type: string
          p_max_passengers?: number
          p_partner_company?: string
          p_owner_commission?: number
        }
        Returns: number
      }
      assign_optimal_crew: {
        Args: {
          booking_locator_param: string
          charter_date_param: string
          start_time_param: string
          end_time_param: string
          boat_name_param: string
        }
        Returns: string
      }
      auto_migrate_andronautic_data: {
        Args: Record<PropertyKey, never>
        Returns: {
          bookings_migrated: number
          customers_created: number
          operations_created: number
        }[]
      }
      calculate_customer_lifetime_value: {
        Args: { customer_id_param: number }
        Returns: number
      }
      calculate_lead_score: {
        Args: {
          p_budget_min: number
          p_budget_max: number
          p_timeline: string
          p_contact_quality?: number
          p_viewing_count?: number
        }
        Returns: number
      }
      calculate_seasonal_forecast: {
        Args: {
          forecast_year: number
          season_name: string
          boat_name_param?: string
        }
        Returns: number
      }
      check_availability: {
        Args: {
          p_boat_name: string
          p_start_date: string
          p_end_date: string
          p_exclude_locator?: string
        }
        Returns: Json
      }
      cleanup_old_data: {
        Args: { days_to_keep?: number }
        Returns: {
          table_cleaned: string
          records_removed: number
        }[]
      }
      create_guardiennage_contract: {
        Args: {
          p_customer_id: number
          p_boat_id: number
          p_monthly_fee: number
          p_start_date: string
          p_services_included?: string[]
        }
        Returns: string
      }
      create_secure_function: {
        Args: {
          function_name: string
          function_body: string
          function_args?: string
          return_type?: string
        }
        Returns: undefined
      }
      create_service_request: {
        Args: {
          p_customer_id: number
          p_boat_id: number
          p_service_offering_id: number
          p_requested_date: string
          p_special_requirements?: string
        }
        Returns: string
      }
      default_staff_access: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      detect_booking_conflicts: {
        Args: {
          boat_name_param: string
          start_time_param: string
          end_time_param: string
          booking_locator_param?: string
        }
        Returns: {
          conflict_id: number
          conflict_type: string
          conflicting_locator: string
          conflict_description: string
        }[]
      }
      generate_performance_report: {
        Args: { report_period?: string; boat_filter?: string }
        Returns: {
          metric_name: string
          current_value: number
          target_value: number
          variance_percentage: number
          trend_direction: string
        }[]
      }
      generate_whatsapp_message: {
        Args: { charter_locator: string; template_name_param: string }
        Returns: string
      }
      get_available_boats: {
        Args: { charter_date: string; charter_hours?: number }
        Returns: {
          boat_id: number
          boat_name: string
          boat_type: string
          max_passengers: number
          hourly_rate: number
          daily_rate: number
          owner_approval_required: boolean
        }[]
      }
      get_available_services: {
        Args: { p_boat_id: number; p_service_date?: string }
        Returns: {
          service_id: number
          service_name: string
          service_description: string
          base_price: number
          duration_hours: number
          category_name: string
          requires_specialist: boolean
        }[]
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
      get_next_tasks: {
        Args: { limit_count?: number }
        Returns: {
          task_id: string
          title: string
          description: string
          priority: string
          estimated_hours: number
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
      get_persona_context: {
        Args: { p_persona_name: string; p_limit?: number }
        Returns: {
          persona_info: Json
          recent_conversations: Json
          relevant_metrics: Json
        }[]
      }
      get_relevant_context: {
        Args: { p_project?: string; p_limit?: number }
        Returns: {
          conversation_id: string
          project: string
          user_msg: string
          ai_response: string
          context_data: Json
          relevance_date: string
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
      identify_test_data: {
        Args: Record<PropertyKey, never>
        Returns: {
          table_name: string
          record_id: string
          confidence_score: number
          indicators: string[]
        }[]
      }
      is_management_or_owner: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_staff_or_higher: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      mark_andronautic_data_as_real: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      mark_as_test_data: {
        Args: { confidence_threshold?: number }
        Returns: number
      }
      migrate_bookings_to_customers: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      remove_test_data: {
        Args: Record<PropertyKey, never>
        Returns: {
          table_cleaned: string
          records_removed: number
        }[]
      }
      run_daily_security_audit: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      security_audit_report: {
        Args: Record<PropertyKey, never>
        Returns: {
          issue_type: string
          table_name: string
          severity: string
          recommendation: string
        }[]
      }
      sync_booking_availability: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      sync_health_check: {
        Args: Record<PropertyKey, never>
        Returns: {
          component: string
          status: string
          details: string
          action_required: boolean
        }[]
      }
      system_health_check: {
        Args: Record<PropertyKey, never>
        Returns: {
          component: string
          status: string
          details: string
          last_updated: string
        }[]
      }
      trigger_manual_sync: {
        Args: Record<PropertyKey, never>
        Returns: {
          sync_result: string
          details: string
        }[]
      }
      weekly_security_summary: {
        Args: Record<PropertyKey, never>
        Returns: {
          metric: string
          current_value: string
          week_ago_value: string
          trend: string
        }[]
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
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
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
