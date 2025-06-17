
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle2, Database, XCircle } from 'lucide-react';
import { useDataAudit } from '@/hooks/useDataAudit';

export const DataAuditReport = () => {
  const { auditResults, loading } = useDataAudit();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue"></div>
      </div>
    );
  }

  const tablesWithData = auditResults.filter(r => r.hasData);
  const emptyTables = auditResults.filter(r => !r.hasData);
  const tablesWithIssues = auditResults.filter(r => r.issues.length > 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{tablesWithData.length}</p>
                <p className="text-sm text-gray-600">Tables with Data</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <XCircle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{emptyTables.length}</p>
                <p className="text-sm text-gray-600">Empty Tables</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{tablesWithIssues.length}</p>
                <p className="text-sm text-gray-600">Tables with Issues</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Database Table Analysis</span>
          </CardTitle>
          <CardDescription>Current state of data tables and identified issues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {auditResults.map((result) => (
              <div key={result.table} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{result.table}</h3>
                  <div className="flex items-center space-x-2">
                    <Badge variant={result.hasData ? "default" : "destructive"}>
                      {result.recordCount} records
                    </Badge>
                    {result.hasData ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </div>
                
                {result.issues.length > 0 && (
                  <div className="mb-2">
                    <p className="text-sm font-medium text-red-600 mb-1">Issues:</p>
                    <ul className="text-sm text-red-600 space-y-1">
                      {result.issues.map((issue, index) => (
                        <li key={index}>• {issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {result.sampleRecord && (
                  <div>
                    <p className="text-sm font-medium mb-1">Sample Record:</p>
                    <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                      {JSON.stringify(result.sampleRecord, null, 2).substring(0, 200)}...
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Mapping Questions</CardTitle>
          <CardDescription>Help map your real data to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-zatara-navy mb-2">Booking Data Mapping</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Where do your current bookings come from? (Andronautic, ClickBoat, Airbnb, etc.)</li>
                <li>• What's the structure of your booking reference numbers (locators)?</li>
                <li>• How are payment amounts currently tracked?</li>
                <li>• What guest information do you typically collect?</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-zatara-navy mb-2">Financial Data Mapping</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• How do you track charter costs (fuel, food, crew, boat maintenance)?</li>
                <li>• What are your typical commission rates per platform?</li>
                <li>• How do you handle outstanding payments and deposits?</li>
                <li>• What's your current revenue tracking method?</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-zatara-navy mb-2">Operations Data Mapping</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• How do you currently track pre-departure checks?</li>
                <li>• What operational data needs to be captured per charter?</li>
                <li>• How do you manage crew assignments and scheduling?</li>
                <li>• What customer communication workflows do you use?</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
