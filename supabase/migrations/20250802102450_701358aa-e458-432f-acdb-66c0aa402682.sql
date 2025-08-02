-- Fix the sync status constraint and update the function
ALTER TABLE api_sync_status DROP CONSTRAINT IF EXISTS api_sync_status_sync_status_check;

-- Add the correct constraint to allow 'in_progress' status
ALTER TABLE api_sync_status ADD CONSTRAINT api_sync_status_sync_status_check 
CHECK (sync_status IN ('pending', 'in_progress', 'completed', 'failed', 'active'));

-- Now test the sync function
SELECT auto_migrate_andronautic_data();