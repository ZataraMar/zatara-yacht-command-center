import React from 'react';
import { EnhancedAccessControl } from '@/components/auth/EnhancedAccessControl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Users } from 'lucide-react';

const AccessControlDemo = () => {
  return (
    <EnhancedAccessControl 
      pagePath="/demo/access-control" 
      pageName="Access Control Demo"
      permissionType="read"
      fallbackMessage="This demo page requires special access permissions."
    >
      <div className="container mx-auto p-6 space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">🎉 Access Granted!</h1>
          <p className="text-xl text-muted-foreground">
            You have successfully accessed this protected page using the Enhanced Access Control system.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                Page-Level Protection
              </CardTitle>
              <CardDescription>
                This page is protected by the new granular access control system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Page Path:</span>
                  <Badge variant="outline">/demo/access-control</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Permission Type:</span>
                  <Badge variant="outline">read</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Protection Status:</span>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-blue-500" />
                Role-Based Access
              </CardTitle>
              <CardDescription>
                Your current role grants you access to this protected content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The system checked your role against the page permissions and granted access.
                This works alongside the existing role-based system for maximum flexibility.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                Management Interface
              </CardTitle>
              <CardDescription>
                Permissions can be managed through the Access Control Matrix
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Owners and management can use the visual matrix to grant or revoke access
                to specific pages for different user roles.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>
              The Enhanced Access Control system provides granular page-level permissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-2">Database-Driven Permissions</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Page-specific access control</li>
                  <li>• Role-based permission matrix</li>
                  <li>• Read/Write/Admin permission levels</li>
                  <li>• Audit trail for all changes</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Management Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Visual permission matrix</li>
                  <li>• One-click access toggles</li>
                  <li>• Permission templates</li>
                  <li>• Bulk operations support</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </EnhancedAccessControl>
  );
};

export default AccessControlDemo;