
import React from 'react';
import { useAuth } from '@/contexts/SecureAuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, AlertTriangle } from 'lucide-react';

export const SecurityTest = () => {
  const { user, profile, loading } = useAuth();

  const securityChecks = [
    {
      name: 'Authentication Status',
      status: user ? 'pass' : 'fail',
      description: user ? 'User is authenticated' : 'User not authenticated',
    },
    {
      name: 'Profile Data',
      status: profile ? 'pass' : 'fail',
      description: profile ? `Profile loaded for ${profile.role}` : 'No profile data',
    },
    {
      name: 'Role Assignment',
      status: profile?.role ? 'pass' : 'warn',
      description: profile?.role ? `Role: ${profile.role}` : 'No role assigned',
    },
    {
      name: 'Session Loading',
      status: !loading ? 'pass' : 'warn',
      description: !loading ? 'Session loaded' : 'Session still loading',
    },
  ];

  if (loading) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <CardTitle>Security Status</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Loading security status...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-blue-600" />
          <CardTitle>Security Status</CardTitle>
        </div>
        <CardDescription>Current authentication and authorization status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {securityChecks.map((check, index) => (
          <div key={index} className="flex items-center justify-between p-2 border rounded">
            <div className="flex items-center space-x-2">
              {check.status === 'pass' && <CheckCircle className="h-4 w-4 text-green-600" />}
              {check.status === 'warn' && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
              {check.status === 'fail' && <AlertTriangle className="h-4 w-4 text-red-600" />}
              <span className="font-medium">{check.name}</span>
            </div>
            <Badge variant={check.status === 'pass' ? 'default' : check.status === 'warn' ? 'secondary' : 'destructive'}>
              {check.status}
            </Badge>
          </div>
        ))}
        
        <div className="mt-4 p-3 bg-gray-50 rounded">
          <h4 className="font-medium mb-2">Current User Details:</h4>
          <p className="text-sm text-gray-600">
            <strong>Email:</strong> {user?.email || 'Not available'}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Name:</strong> {profile?.first_name} {profile?.last_name || 'Not available'}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Role:</strong> {profile?.role || 'No role assigned'}
          </p>
          <p className="text-sm text-gray-600">
            <strong>User ID:</strong> {user?.id || 'Not available'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
