
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Database, Table, BarChart3, PieChart, LineChart, Calendar, Filter, Search, Plus, Trash2, Eye, Code2 } from 'lucide-react';
import { useDataAudit } from '@/hooks/useDataAudit';
import { FieldMapper } from './dashboard-builder/FieldMapper';
import { ComponentSelector } from './dashboard-builder/ComponentSelector';
import { DashboardPreview } from './dashboard-builder/DashboardPreview';
import { CodeGenerator } from './dashboard-builder/CodeGenerator';

export interface DashboardField {
  id: string;
  name: string;
  type: string;
  table: string;
  description?: string;
  sample?: any;
  isUserGenerated?: boolean;
}

export interface DashboardComponent {
  id: string;
  type: 'table' | 'card' | 'chart' | 'filter' | 'search';
  title: string;
  fields: DashboardField[];
  configuration: Record<string, any>;
}

export interface DashboardConfig {
  id: string;
  name: string;
  description: string;
  components: DashboardComponent[];
  layout: 'single-column' | 'two-column' | 'three-column' | 'grid';
  theme: 'zatara' | 'minimal' | 'dark';
}

export const DashboardBuilder = () => {
  const { auditResults, loading } = useDataAudit();
  const [activeTab, setActiveTab] = useState('fields');
  const [selectedFields, setSelectedFields] = useState<DashboardField[]>([]);
  const [dashboardConfig, setDashboardConfig] = useState<DashboardConfig>({
    id: 'dashboard-1',
    name: 'New Dashboard',
    description: 'Custom dashboard configuration',
    components: [],
    layout: 'two-column',
    theme: 'zatara'
  });

  // Extract all available fields from audit results
  const availableFields = useMemo(() => {
    const fields: DashboardField[] = [];
    
    auditResults.forEach(result => {
      if (result.sampleRecord) {
        Object.keys(result.sampleRecord).forEach(key => {
          const value = result.sampleRecord[key];
          fields.push({
            id: `${result.table}.${key}`,
            name: key,
            type: typeof value,
            table: result.table,
            sample: value,
            description: `Field from ${result.table} table`,
            isUserGenerated: false
          });
        });
      }
    });

    // Add some common user-generated fields
    const userFields: DashboardField[] = [
      {
        id: 'calculated.profit_margin',
        name: 'profit_margin',
        type: 'number',
        table: 'calculated',
        description: 'Calculated profit margin percentage',
        isUserGenerated: true
      },
      {
        id: 'calculated.booking_value_category',
        name: 'booking_value_category',
        type: 'string',
        table: 'calculated',
        description: 'Categorized booking value (Low/Medium/High)',
        isUserGenerated: true
      },
      {
        id: 'calculated.seasonal_period',
        name: 'seasonal_period',
        type: 'string',
        table: 'calculated',
        description: 'Seasonal period classification',
        isUserGenerated: true
      }
    ];

    return [...fields, ...userFields];
  }, [auditResults]);

  // Group fields by table
  const fieldsByTable = useMemo(() => {
    const grouped: Record<string, DashboardField[]> = {};
    availableFields.forEach(field => {
      if (!grouped[field.table]) {
        grouped[field.table] = [];
      }
      grouped[field.table].push(field);
    });
    return grouped;
  }, [availableFields]);

  const handleFieldSelect = (field: DashboardField) => {
    setSelectedFields(prev => {
      const exists = prev.find(f => f.id === field.id);
      if (exists) {
        return prev.filter(f => f.id !== field.id);
      }
      return [...prev, field];
    });
  };

  const handleComponentAdd = (component: DashboardComponent) => {
    setDashboardConfig(prev => ({
      ...prev,
      components: [...prev.components, component]
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading dashboard builder...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zatara-navy">Dashboard Builder</h1>
          <p className="text-zatara-blue">Create custom dashboards with complete field mapping control</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            {availableFields.length} fields available
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {selectedFields.length} selected
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="fields" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Field Discovery
          </TabsTrigger>
          <TabsTrigger value="mapping" className="flex items-center gap-2">
            <Table className="h-4 w-4" />
            Field Mapping
          </TabsTrigger>
          <TabsTrigger value="components" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Components
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="generate" className="flex items-center gap-2">
            <Code2 className="h-4 w-4" />
            Generate
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fields">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Available Fields
                  </CardTitle>
                  <CardDescription>
                    Discover and explore all available data fields from your tables
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px]">
                    <div className="space-y-6">
                      {Object.entries(fieldsByTable).map(([tableName, fields]) => (
                        <div key={tableName}>
                          <div className="flex items-center gap-2 mb-3">
                            <h3 className="font-semibold text-zatara-navy">{tableName}</h3>
                            <Badge variant="secondary">{fields.length} fields</Badge>
                            {fields.some(f => f.isUserGenerated) && (
                              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                                User Generated
                              </Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-1 gap-2">
                            {fields.map(field => (
                              <div
                                key={field.id}
                                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                                  selectedFields.find(f => f.id === field.id)
                                    ? 'border-zatara-blue bg-zatara-blue/5'
                                    : 'border-gray-200 hover:border-zatara-blue/50'
                                }`}
                                onClick={() => handleFieldSelect(field)}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="font-medium">{field.name}</span>
                                    <Badge variant="outline" className="ml-2 text-xs">
                                      {field.type}
                                    </Badge>
                                    {field.isUserGenerated && (
                                      <Badge variant="outline" className="ml-1 text-xs bg-purple-50 text-purple-700">
                                        Calculated
                                      </Badge>
                                    )}
                                  </div>
                                  {selectedFields.find(f => f.id === field.id) && (
                                    <Plus className="h-4 w-4 text-zatara-blue" />
                                  )}
                                </div>
                                {field.description && (
                                  <p className="text-xs text-gray-600 mt-1">{field.description}</p>
                                )}
                                {field.sample !== undefined && (
                                  <div className="mt-2">
                                    <span className="text-xs text-gray-500">Sample: </span>
                                    <code className="text-xs bg-gray-100 px-1 rounded">
                                      {String(field.sample).substring(0, 50)}
                                      {String(field.sample).length > 50 ? '...' : ''}
                                    </code>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          {tableName !== Object.keys(fieldsByTable).slice(-1)[0] && (
                            <Separator className="mt-4" />
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Selected Fields</CardTitle>
                  <CardDescription>
                    Fields you've selected for your dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px]">
                    {selectedFields.length === 0 ? (
                      <div className="text-center text-gray-500 py-8">
                        <Database className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No fields selected yet</p>
                        <p className="text-xs">Click on fields to add them</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {selectedFields.map((field, index) => (
                          <div
                            key={field.id}
                            className="p-2 border rounded-lg bg-zatara-blue/5 border-zatara-blue/20"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="font-medium text-sm">{field.name}</span>
                                <div className="flex items-center gap-1 mt-1">
                                  <Badge variant="outline" className="text-xs">
                                    {field.table}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {field.type}
                                  </Badge>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleFieldSelect(field)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mapping">
          <FieldMapper 
            selectedFields={selectedFields}
            onFieldsUpdate={setSelectedFields}
          />
        </TabsContent>

        <TabsContent value="components">
          <ComponentSelector
            selectedFields={selectedFields}
            dashboardConfig={dashboardConfig}
            onComponentAdd={handleComponentAdd}
            onConfigUpdate={setDashboardConfig}
          />
        </TabsContent>

        <TabsContent value="preview">
          <DashboardPreview
            dashboardConfig={dashboardConfig}
            availableFields={availableFields}
          />
        </TabsContent>

        <TabsContent value="generate">
          <CodeGenerator
            dashboardConfig={dashboardConfig}
            selectedFields={selectedFields}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
