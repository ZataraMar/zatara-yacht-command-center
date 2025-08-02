import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/SecureAuthContext';

export const usePagePermissions = (pagePath: string, permissionType: 'read' | 'write' | 'admin' = 'read') => {
  const { profile } = useAuth();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPermission = async () => {
      if (!profile?.role) {
        setHasAccess(false);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.rpc('has_page_permission', {
          user_role: profile.role,
          page_path: pagePath,
          permission_type: permissionType
        });

        if (error) {
          console.error('Error checking permission:', error);
          // Fallback to existing role system
          const fallbackAccess = ['owner', 'management', 'staff', 'skippers', 'boat_owners'].includes(profile.role);
          setHasAccess(fallbackAccess);
        } else {
          setHasAccess(data);
        }
      } catch (error) {
        console.error('Permission check error:', error);
        setHasAccess(false);
      } finally {
        setLoading(false);
      }
    };

    checkPermission();
  }, [profile?.role, pagePath, permissionType]);

  return { hasAccess, loading };
};