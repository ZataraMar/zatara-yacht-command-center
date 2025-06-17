
import { supabase } from '@/integrations/supabase/client';

export const syncCustomersFromBookings = async () => {
  try {
    console.log('Starting customer sync from bookings...');
    
    // Call the migration function that exists in your database
    const { data, error } = await supabase.rpc('migrate_bookings_to_customers');
    
    if (error) {
      throw error;
    }
    
    console.log('Customer sync completed. Migrated:', data, 'customers');
    return { success: true, migratedCount: data };
    
  } catch (error) {
    console.error('Error syncing customers:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const markAndronauticDataAsReal = async () => {
  try {
    console.log('Marking Andronautic data as real...');
    
    const { data, error } = await supabase.rpc('mark_andronautic_data_as_real');
    
    if (error) {
      throw error;
    }
    
    console.log('Marked', data, 'records as real data');
    return { success: true, updatedCount: data };
    
  } catch (error) {
    console.error('Error marking data as real:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const autoMigrateAndronauticData = async () => {
  try {
    console.log('Running auto migration for Andronautic data...');
    
    const { data, error } = await supabase.rpc('auto_migrate_andronautic_data');
    
    if (error) {
      throw error;
    }
    
    console.log('Auto migration completed:', data);
    return { success: true, result: data };
    
  } catch (error) {
    console.error('Error in auto migration:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};
