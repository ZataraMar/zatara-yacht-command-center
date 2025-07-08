import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface SecretStatus {
  name: string;
  configured: boolean;
  required: boolean;
  description: string;
  status: string;
}

interface HealthCheckResponse {
  status: string;
  timestamp: string;
  secrets: SecretStatus[];
  summary: {
    total: number;
    configured: number;
    missing: number;
    missingRequired: number;
  };
}

export const HealthCheck: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [healthData, setHealthData] = useState<HealthCheckResponse | null>(null);
  const { toast } = useToast();

  const runHealthCheck = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('health-check');
      
      if (error) {
        throw new Error(error.message);
      }

      setHealthData(data);
      
      if (data.status === 'healthy') {
        toast({
          title: "Health Check Passed ✅",
          description: "All required secrets are configured correctly!",
          variant: "default"
        });
      } else {
        toast({
          title: "Health Check Failed ❌", 
          description: `${data.summary.missingRequired} required secrets are missing`,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Health check failed:', error);
      toast({
        title: "Health Check Error",
        description: error instanceof Error ? error.message : "Failed to run health check",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (configured: boolean, required: boolean) => {
    if (configured) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (required) return <XCircle className="h-4 w-4 text-red-600" />;
    return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
  };

  const getStatusBadge = (configured: boolean, required: boolean) => {
    if (configured) return <Badge variant="default" className="bg-green-100 text-green-800">Configured</Badge>;
    if (required) return <Badge variant="destructive">Missing (Required)</Badge>;
    return <Badge variant="secondary">Missing (Optional)</Badge>;
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          System Health Check
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Button
            onClick={runHealthCheck}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Checking...' : 'Run Health Check'}
          </Button>
          {healthData && (
            <div className="text-sm text-muted-foreground">
              Last check: {new Date(healthData.timestamp).toLocaleString()}
            </div>
          )}
        </div>

        {healthData && (
          <>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-muted">
              <div className="text-sm">
                <strong>Overall Status:</strong> 
                <span className={`ml-2 font-semibold ${
                  healthData.status === 'healthy' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {healthData.status === 'healthy' ? '✅ Healthy' : '❌ Unhealthy'}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {healthData.summary.configured}/{healthData.summary.total} secrets configured
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Secret Configuration Status:</h4>
              {healthData.secrets.map((secret) => (
                <div
                  key={secret.name}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(secret.configured, secret.required)}
                    <div>
                      <div className="font-medium text-sm">{secret.name}</div>
                      <div className="text-xs text-muted-foreground">{secret.description}</div>
                    </div>
                  </div>
                  {getStatusBadge(secret.configured, secret.required)}
                </div>
              ))}
            </div>

            {healthData.summary.missingRequired > 0 && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-sm text-red-800">
                  <strong>Action Required:</strong> {healthData.summary.missingRequired} required secret(s) missing.
                  Configure them in Supabase Edge Functions settings.
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default HealthCheck;