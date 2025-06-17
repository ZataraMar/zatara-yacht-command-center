
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface HealthCheck {
  component: string;
  status: string;
  details: string;
  last_updated: string;
}

interface HealthChecksSectionProps {
  healthChecks: HealthCheck[];
}

export const HealthChecksSection = ({ healthChecks }: HealthChecksSectionProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'action_required':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Activity className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'action_required':
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5" />
          <span>System Health Checks</span>
        </CardTitle>
        <CardDescription>
          Automated monitoring of critical system components
        </CardDescription>
      </CardHeader>
      <CardContent>
        {healthChecks.length > 0 ? (
          <div className="space-y-4">
            {healthChecks.map((check, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(check.status)}
                    <div>
                      <h3 className="font-medium capitalize">
                        {check.component.replace('_', ' ')}
                      </h3>
                      <p className="text-sm text-gray-600">{check.details}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(check.status)}>
                      {check.status}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {new Date(check.last_updated).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <Activity className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No health check data available</p>
            <p className="text-sm">System monitoring may not be configured</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
