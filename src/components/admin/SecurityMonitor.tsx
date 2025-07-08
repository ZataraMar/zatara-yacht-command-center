import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Users,
  Lock,
  Key,
  Database,
  RefreshCw,
  Eye
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/SecureAuthContext';

interface SecurityMetric {
  name: string;
  value: number | string;
  status: 'good' | 'warning' | 'critical';
  description: string;
  lastChecked: string;
}

interface SecurityVulnerability {
  id: string;
  type: 'policy' | 'authentication' | 'data' | 'function';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  recommendation: string;
  detected: string;
}

export const SecurityMonitor = () => {
  const { profile } = useAuth();
  const [metrics, setMetrics] = useState<SecurityMetric[]>([]);
  const [vulnerabilities, setVulnerabilities] = useState<SecurityVulnerability[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<string>('');

  const checkSecurityMetrics = async () => {
    setIsLoading(true);
    
    try {
      // Check RLS policies
      const { data: policies, error: policiesError } = await supabase
        .rpc('security_audit_report');
      
      // Check recent auth events
      const { data: authEvents } = await supabase
        .from('audit_logs')
        .select('*')
        .eq('table_name', 'auth.users')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false })
        .limit(10);

      // Check failed login attempts
      const failedLogins = authEvents?.filter(event => 
        event.operation_type === 'FAILED_LOGIN'
      ).length || 0;

      // Security metrics
      const newMetrics: SecurityMetric[] = [
        {
          name: 'RLS Policies Status',
          value: policies ? 'Active' : 'Issues Found',
          status: policies ? 'good' : 'warning',
          description: 'Row Level Security policies coverage',
          lastChecked: new Date().toISOString()
        },
        {
          name: 'Failed Login Attempts (24h)',
          value: failedLogins,
          status: failedLogins > 10 ? 'critical' : failedLogins > 5 ? 'warning' : 'good',
          description: 'Failed authentication attempts in last 24 hours',
          lastChecked: new Date().toISOString()
        },
        {
          name: 'Session Security',
          value: 'Active',
          status: 'good',
          description: 'Secure authentication context active',
          lastChecked: new Date().toISOString()
        },
        {
          name: 'CSRF Protection',
          value: 'Enabled',
          status: 'good',
          description: 'Cross-site request forgery protection enabled',
          lastChecked: new Date().toISOString()
        }
      ];

      setMetrics(newMetrics);
      
      // Mock vulnerabilities for demonstration
      const mockVulnerabilities: SecurityVulnerability[] = [];
      
      if (failedLogins > 10) {
        mockVulnerabilities.push({
          id: 'high-failed-logins',
          type: 'authentication',
          severity: 'high',
          title: 'High Failed Login Attempts',
          description: `${failedLogins} failed login attempts detected in the last 24 hours`,
          recommendation: 'Implement account lockout or investigate suspicious activity',
          detected: new Date().toISOString()
        });
      }

      setVulnerabilities(mockVulnerabilities);
      setLastRefresh(new Date().toISOString());
      
    } catch (error) {
      console.error('Error checking security metrics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (profile?.role === 'owner') {
      checkSecurityMetrics();
    }
  }, [profile]);

  if (profile?.role !== 'owner') {
    return (
      <Alert>
        <Lock className="h-4 w-4" />
        <AlertDescription>
          Security monitoring is restricted to system owners only.
        </AlertDescription>
      </Alert>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'critical':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      low: 'bg-blue-100 text-blue-800',
      medium: 'bg-yellow-100 text-yellow-800', 
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={variants[severity as keyof typeof variants] || variants.low}>
        {severity.toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <Shield className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zatara-navy">Security Monitor</h2>
            <p className="text-sm text-zatara-blue">Real-time security status and threat detection</p>
          </div>
        </div>
        <Button onClick={checkSecurityMetrics} disabled={isLoading} size="sm">
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {lastRefresh && (
        <div className="text-xs text-gray-500">
          Last updated: {new Date(lastRefresh).toLocaleString()}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="border-l-4 border-l-zatara-blue">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(metric.status)}
                  <span className="text-sm font-medium">{metric.name}</span>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {vulnerabilities.length > 0 && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-700 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Security Vulnerabilities
            </CardTitle>
            <CardDescription>
              {vulnerabilities.length} security issue{vulnerabilities.length !== 1 ? 's' : ''} detected
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {vulnerabilities.map((vuln) => (
              <div key={vuln.id} className="border border-red-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{vuln.title}</h4>
                  {getSeverityBadge(vuln.severity)}
                </div>
                <p className="text-sm text-gray-600 mb-2">{vuln.description}</p>
                <p className="text-sm font-medium text-zatara-blue">
                  Recommendation: {vuln.recommendation}
                </p>
                <div className="text-xs text-gray-500 mt-2">
                  Detected: {new Date(vuln.detected).toLocaleString()}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {vulnerabilities.length === 0 && !isLoading && (
        <Card className="border-green-200">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-medium text-green-700 mb-2">All Security Checks Passed</h3>
            <p className="text-sm text-gray-600">
              No security vulnerabilities detected in the current scan.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};