import React from 'react';
import { useAuth } from '@/contexts/SecureAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface EnhancedAccessControlProps {
  children: React.ReactNode;
  pagePath: string;
  pageName?: string;
  permissionType?: 'read' | 'write' | 'admin';
  fallbackMessage?: string;
}

export const EnhancedAccessControl: React.FC<EnhancedAccessControlProps> = ({ 
  children, 
  pagePath,
  pageName = '',
  permissionType = 'read',
  fallbackMessage = "You don't have permission to access this page." 
}) => {
  const { profile, loading } = useAuth();
  const [hasAccess, setHasAccess] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const checkPageAccess = async () => {
      if (!profile?.role) {
        setHasAccess(false);
        return;
      }

      try {
        // Call the has_page_permission function
        const { data, error } = await supabase.rpc('has_page_permission', {
          user_role: profile.role,
          page_path: pagePath,
          permission_type: permissionType
        });

        if (error) {
          console.error('Error checking page permission:', error);
          // Fallback to existing role-based system on error
          const fallbackAccess = ['owner', 'management', 'staff', 'skippers', 'boat_owners'].includes(profile.role);
          setHasAccess(fallbackAccess);
          return;
        }

        setHasAccess(data);
      } catch (error) {
        console.error('Error in page permission check:', error);
        setHasAccess(false);
      }
    };

    if (profile) {
      checkPageAccess();
    }
  }, [profile, pagePath, permissionType]);

  if (loading || hasAccess === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Checking access permissions...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-destructive">Access Denied</CardTitle>
            <CardDescription className="text-center">
              {fallbackMessage}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Current role: <span className="font-medium">{profile?.role || 'Unknown'}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Page: <span className="font-medium">{pageName || pagePath}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Required permission: <span className="font-medium">{permissionType}</span>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};