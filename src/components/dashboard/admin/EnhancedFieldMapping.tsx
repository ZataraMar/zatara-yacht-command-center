import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  RefreshCw, 
  Database, 
  MapPin,
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  ArrowRight,
  TestTube,
  Download,
  Upload
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FieldMapping {
  id: number;
  andronautic_field: string;
  supabase_field: string;
  field_type: string;
  is_mapped: boolean;
  is_required: boolean;
  transformation_rule: string;
  default_value: string;
  notes: string;
}

interface LiveDataSample {
  field_name: string;
  sample_value: any;
  data_type: string;
  frequency: number;
}

export const EnhancedFieldMapping = () => {
  const [fieldMappings, setFieldMappings] = useState<FieldMapping[]>([]);
  const [liveData, setLiveData] = useState<LiveDataSample[]>([]);
  const [loading, setLoading] = useState(true);
  const [testResults, setTestResults] = useState<{ [key: string]: any }>({});
  const { toast } = useToast();

  useEffect(() => {
    loadFieldMappings();
    loadLiveDataSamples();
  }, []);

  const loadFieldMappings = async () => {
    try {
      const { data, error } = await supabase
        .from('andronautic_field_mappings')
        .select('*')
        .order('andronautic_field');

      if (error) throw error;
      setFieldMappings(data || []);
    } catch (error) {
      console.error('Error loading field mappings:', error);
      toast({
        title: "Error",
        description: "Failed to load field mappings",
        variant: "destructive",
      });
    }
  };

  const loadLiveDataSamples = async () => {
    try {
      setLoading(true);
      
      // Get live booking data samples
      const { data: bookings, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('data_source', 'andronautic')
        .limit(5);

      if (error) throw error;

      // Process the live data to create samples
      const samples: LiveDataSample[] = [];
      
      if (bookings && bookings.length > 0) {
        const sampleBooking = bookings[0];
        Object.entries(sampleBooking).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            samples.push({
              field_name: key,
              sample_value: value,
              data_type: typeof value,
              frequency: bookings.filter(b => b[key] !== null).length
            });
          }
        });
      }

      setLiveData(samples);
      
      toast({
        title: "Live Data Loaded",
        description: `Found ${samples.length} fields with sample data`,
      });
      
    } catch (error) {
      console.error('Error loading live data:', error);
      toast({
        title: "Error",
        description: "Failed to load live data samples",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const testMapping = async (mapping: FieldMapping) => {
    try {
      // Test the mapping with live data
      const testData = liveData.find(d => d.field_name === mapping.andronautic_field);
      
      let transformedValue = testData?.sample_value;
      
      // Apply transformation rule if it exists
      if (mapping.transformation_rule) {
        try {
          // Simple transformation rules
          if (mapping.transformation_rule.includes('UPPER')) {
            transformedValue = String(transformedValue).toUpperCase();
          } else if (mapping.transformation_rule.includes('LOWER')) {
            transformedValue = String(transformedValue).toLowerCase();
          } else if (mapping.transformation_rule.includes('NUMBER')) {
            transformedValue = Number(transformedValue);
          }
        } catch (error) {
          console.error('Transformation error:', error);
        }
      }

      setTestResults(prev => ({
        ...prev,
        [mapping.id]: {
          original: testData?.sample_value,
          transformed: transformedValue,
          success: true,
          type_match: typeof transformedValue === mapping.field_type
        }
      }));

      toast({
        title: "Test Complete",
        description: `Mapping test successful for ${mapping.andronautic_field}`,
      });

    } catch (error) {
      console.error('Test error:', error);
      setTestResults(prev => ({
        ...prev,
        [mapping.id]: {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }));
    }
  };

  const updateMapping = async (mappingId: number, updates: Partial<FieldMapping>) => {
    try {
      const { error } = await supabase
        .from('andronautic_field_mappings')
        .update(updates)
        .eq('id', mappingId);

      if (error) throw error;

      setFieldMappings(prev => 
        prev.map(m => m.id === mappingId ? { ...m, ...updates } : m)
      );

      toast({
        title: "Mapping Updated",
        description: "Field mapping has been updated successfully",
      });

    } catch (error) {
      console.error('Error updating mapping:', error);
      toast({
        title: "Error",
        description: "Failed to update mapping",
        variant: "destructive",
      });
    }
  };

  const triggerSync = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.rpc('auto_migrate_andronautic_data');
      
      if (error) throw error;

      toast({
        title: "Sync Complete",
        description: `Sync operation completed`,
      });

      // Reload data after sync
      await loadLiveDataSamples();
      
    } catch (error) {
      console.error('Sync error:', error);
      toast({
        title: "Sync Failed",
        description: "Failed to sync Andronautic data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const exportMappings = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      mappings: fieldMappings,
      live_data_samples: liveData,
      test_results: testResults
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `field-mappings-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zatara-blue mx-auto"></div>
          <p className="text-zatara-navy mt-4">Loading field mapping interface...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-zatara-navy">Enhanced Field Mapping</h1>
          <p className="text-gray-600">Live Andronautic data mapping with real-time testing</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportMappings} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={triggerSync} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Sync Data
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Fields</p>
                <p className="text-2xl font-bold text-zatara-blue">{fieldMappings.length}</p>
              </div>
              <Database className="w-8 h-8 text-zatara-blue" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Mapped Fields</p>
                <p className="text-2xl font-bold text-green-600">
                  {fieldMappings.filter(f => f.is_mapped).length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Live Data Fields</p>
                <p className="text-2xl font-bold text-zatara-blue">{liveData.length}</p>
              </div>
              <MapPin className="w-8 h-8 text-zatara-blue" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tests Passed</p>
                <p className="text-2xl font-bold text-green-600">
                  {Object.values(testResults).filter(r => r.success).length}
                </p>
              </div>
              <TestTube className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="mappings" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="mappings">Field Mappings</TabsTrigger>
          <TabsTrigger value="live-data">Live Data</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
        </TabsList>

        <TabsContent value="mappings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Andronautic Field Mappings</CardTitle>
              <CardDescription>Configure how Andronautic fields map to your database</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fieldMappings.map((mapping) => (
                  <div key={mapping.id} className="border rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                      <div>
                        <label className="text-sm font-medium">Andronautic Field</label>
                        <p className="font-mono text-sm bg-gray-100 p-2 rounded">
                          {mapping.andronautic_field}
                        </p>
                      </div>
                      
                      <ArrowRight className="w-6 h-6 text-gray-400 mx-auto" />
                      
                      <div>
                        <label className="text-sm font-medium">Supabase Field</label>
                        <Input
                          value={mapping.supabase_field || ''}
                          onChange={(e) => updateMapping(mapping.id, { supabase_field: e.target.value })}
                          placeholder="Enter target field"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Type</label>
                        <Select 
                          value={mapping.field_type} 
                          onValueChange={(value) => updateMapping(mapping.id, { field_type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="string">String</SelectItem>
                            <SelectItem value="number">Number</SelectItem>
                            <SelectItem value="boolean">Boolean</SelectItem>
                            <SelectItem value="date">Date</SelectItem>
                            <SelectItem value="time">Time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant={mapping.is_mapped ? "default" : "secondary"}>
                          {mapping.is_mapped ? "Mapped" : "Unmapped"}
                        </Badge>
                        <Button
                          size="sm"
                          onClick={() => testMapping(mapping)}
                          disabled={!mapping.is_mapped}
                        >
                          <TestTube className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {mapping.notes && (
                      <p className="text-sm text-gray-600 mt-2">{mapping.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="live-data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Andronautic Data Samples</CardTitle>
              <CardDescription>Real data from your Andronautic integration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {liveData.map((sample, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 p-3 border rounded">
                    <div>
                      <span className="font-medium">{sample.field_name}</span>
                    </div>
                    <div>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {JSON.stringify(sample.sample_value)}
                      </code>
                    </div>
                    <div>
                      <Badge variant="outline">{sample.data_type}</Badge>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">
                        {sample.frequency}/5 records
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mapping Test Results</CardTitle>
              <CardDescription>Test your field mappings with live data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(testResults).map(([mappingId, result]) => {
                  const mapping = fieldMappings.find(m => m.id === parseInt(mappingId));
                  return (
                    <div key={mappingId} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{mapping?.andronautic_field}</h4>
                        {result.success ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      
                      {result.success ? (
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Original:</span>
                            <code className="block bg-gray-100 p-2 rounded mt-1">
                              {JSON.stringify(result.original)}
                            </code>
                          </div>
                          <div>
                            <span className="font-medium">Transformed:</span>
                            <code className="block bg-gray-100 p-2 rounded mt-1">
                              {JSON.stringify(result.transformed)}
                            </code>
                          </div>
                        </div>
                      ) : (
                        <Alert>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>Test Failed</AlertTitle>
                          <AlertDescription>{result.error}</AlertDescription>
                        </Alert>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};