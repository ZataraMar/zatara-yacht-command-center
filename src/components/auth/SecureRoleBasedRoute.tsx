
import React from 'react';
import { useAuth } from '@/contexts/SecureAuthContext';
import { hasRole } from '@/utils/authSecurity';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle } from 'lucide-react';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallbackMessage?: string;
}

export const SecureRoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ 
  children, 
  allowedRoles, 
  fallbackMessage = "You don't have permission to access this area." 
}) => {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <Shield className="h-4 w-4 text-gray-600" />
            <p className="text-gray-600">Verifying permissions...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!hasRole(profile?.role || null, allowedRoles)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <CardTitle className="text-center text-red-600">Access Denied</CardTitle>
            </div>
            <CardDescription className="text-center">
              {fallbackMessage}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="bg-red-50 p-3 rounded mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Current role: <span className="font-medium">{profile?.role || 'Unknown'}</span>
              </p>
              <p className="text-sm text-gray-600">
                Required roles: <span className="font-medium">{allowedRoles.join(', ')}</span>
              </p>
            </div>
            <p className="text-xs text-gray-500">
              Contact your administrator if you believe this is an error.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};
