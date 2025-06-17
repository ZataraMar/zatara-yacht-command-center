
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Code2, Download, Copy, FileText, Zap } from 'lucide-react';
import { DashboardConfig, DashboardField } from '../DashboardBuilder';

interface CodeGeneratorProps {
  dashboardConfig: DashboardConfig;
  selectedFields: DashboardField[];
}

export const CodeGenerator: React.FC<CodeGeneratorProps> = ({
  dashboardConfig,
  selectedFields
}) => {
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [hookCode, setHookCode] = useState<string>('');
  const [typeDefinitions, setTypeDefinitions] = useState<string>('');

  const generateDashboardCode = () => {
    const componentName = dashboardConfig.name.replace(/\s+/g, '');
    
    const code = `import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useComprehensiveBookings } from '@/hooks/useComprehensiveBookings';

export const ${componentName}Dashboard = () => {
  const { bookings, loading } = useComprehensiveBookings();

  // Transform data for dashboard components
  const dashboardData = useMemo(() => {
    if (!bookings || bookings.length === 0) return [];
    
    return bookings.map(booking => ({
${selectedFields.map(field => 
  `      ${field.name}: booking.${field.name.replace('calculated.', '')},`
).join('\n')}
    }));
  }, [bookings]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zatara-navy">${dashboardConfig.name}</h1>
          <p className="text-zatara-blue">${dashboardConfig.description}</p>
        </div>
      </div>

      <div className="${getLayoutClasses(dashboardConfig.layout)}">
${dashboardConfig.components.map(component => generateComponentCode(component)).join('\n\n')}
      </div>
    </div>
  );
};`;

    setGeneratedCode(code);
  };

  const generateHookCode = () => {
    const hook = `import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface DashboardData {
${selectedFields.map(field => 
  `  ${field.name}: ${getTypeScriptType(field.type)};`
).join('\n')}
}

export const use${dashboardConfig.name.replace(/\s+/g, '')}Data = () => {
  const [data, setData] = useState<DashboardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Base query - adjust table name as needed
      const { data: rawData, error } = await supabase
        .from('bookings')
        .select('*');

      if (error) throw error;

      // Transform and calculate fields
      const transformedData = rawData?.map(item => ({
${selectedFields.map(field => {
  if (field.isUserGenerated) {
    return `        ${field.name}: calculateField('${field.name}', item), // User-defined calculation`;
  }
  return `        ${field.name}: item.${field.name},`;
}).join('\n')}
      })) || [];

      setData(transformedData);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};

// Helper function for calculated fields
const calculateField = (fieldName: string, data: any) => {
  switch (fieldName) {
${selectedFields.filter(f => f.isUserGenerated).map(field => 
  `    case '${field.name}':
      // Add your calculation logic here
      return 0; // Placeholder`
).join('\n')}
    default:
      return null;
  }
};`;

    setHookCode(hook);
  };

  const generateTypeDefinitions = () => {
    const types = `// Generated TypeScript types for ${dashboardConfig.name}

export interface ${dashboardConfig.name.replace(/\s+/g, '')}Data {
${selectedFields.map(field => 
  `  ${field.name}: ${getTypeScriptType(field.type)};`
).join('\n')}
}

export interface DashboardFilters {
${selectedFields.filter(f => f.type === 'string').map(field => 
  `  ${field.name}?: string[];`
).join('\n')}
${selectedFields.filter(f => f.type === 'number').map(field => 
  `  ${field.name}_min?: number;
  ${field.name}_max?: number;`
).join('\n')}
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface ComponentConfig {
  id: string;
  type: 'table' | 'card' | 'chart' | 'filter';
  title: string;
  fields: string[];
  visible: boolean;
}`;

    setTypeDefinitions(types);
  };

  const getLayoutClasses = (layout: string) => {
    switch (layout) {
      case 'single-column': return 'grid grid-cols-1 gap-6';
      case 'two-column': return 'grid grid-cols-1 lg:grid-cols-2 gap-6';
      case 'three-column': return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      default: return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };

  const generateComponentCode = (component: any) => {
    switch (component.type) {
      case 'table':
        return `        <Card>
          <CardHeader>
            <CardTitle>${component.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
${component.fields.map((field: DashboardField) => 
  `                  <TableHead>${field.name.replace(/_/g, ' ')}</TableHead>`
).join('\n')}
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardData.slice(0, 10).map((item, index) => (
                  <TableRow key={index}>
${component.fields.map((field: DashboardField) => 
  `                    <TableCell>{formatValue(item.${field.name}, '${field.type}')}</TableCell>`
).join('\n')}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>`;

      case 'card':
        return `        <Card>
          <CardHeader>
            <CardTitle>${component.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
${component.fields.map((field: DashboardField) => 
  `              <div className="text-center">
                <p className="text-2xl font-bold text-zatara-navy">
                  {formatValue(calculateMetric(dashboardData, '${field.name}'), '${field.type}')}
                </p>
                <p className="text-sm text-gray-600">${field.name.replace(/_/g, ' ')}</p>
              </div>`
).join('\n')}
            </div>
          </CardContent>
        </Card>`;

      default:
        return `        <Card>
          <CardHeader>
            <CardTitle>${component.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Component type: ${component.type}</p>
          </CardContent>
        </Card>`;
    }
  };

  const getTypeScriptType = (fieldType: string) => {
    switch (fieldType) {
      case 'number':
      case 'currency':
      case 'percentage':
        return 'number';
      case 'boolean':
        return 'boolean';
      case 'date':
      case 'datetime':
        return 'string';
      default:
        return 'string';
    }
  };

  const handleGenerate = () => {
    generateDashboardCode();
    generateHookCode();
    generateTypeDefinitions();
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            Code Generation
          </CardTitle>
          <CardDescription>
            Generate React components and TypeScript code for your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button onClick={handleGenerate} className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Generate Code
            </Button>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{dashboardConfig.components.length} components</Badge>
              <Badge variant="outline">{selectedFields.length} fields</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {generatedCode && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Files</CardTitle>
            <CardDescription>
              Copy these files into your Lovable project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="component" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="component">Component</TabsTrigger>
                <TabsTrigger value="hook">Hook</TabsTrigger>
                <TabsTrigger value="types">Types</TabsTrigger>
              </TabsList>

              <TabsContent value="component">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Dashboard Component</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(generatedCode)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <ScrollArea className="h-[400px] w-full border rounded-lg">
                    <pre className="p-4 text-sm">
                      <code>{generatedCode}</code>
                    </pre>
                  </ScrollArea>
                </div>
              </TabsContent>

              <TabsContent value="hook">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Data Hook</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(hookCode)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <ScrollArea className="h-[400px] w-full border rounded-lg">
                    <pre className="p-4 text-sm">
                      <code>{hookCode}</code>
                    </pre>
                  </ScrollArea>
                </div>
              </TabsContent>

              <TabsContent value="types">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Type Definitions</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(typeDefinitions)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <ScrollArea className="h-[400px] w-full border rounded-lg">
                    <pre className="p-4 text-sm">
                      <code>{typeDefinitions}</code>
                    </pre>
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Implementation Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">1. Create the Component File</p>
                <p className="text-gray-600">
                  Save the component code as <code>src/components/dashboard/{dashboardConfig.name.replace(/\s+/g, '')}Dashboard.tsx</code>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">2. Create the Hook File</p>
                <p className="text-gray-600">
                  Save the hook code as <code>src/hooks/use{dashboardConfig.name.replace(/\s+/g, '')}Data.ts</code>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">3. Add Types</p>
                <p className="text-gray-600">
                  Add the type definitions to your types file or create a new one
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">4. Add to Routes</p>
                <p className="text-gray-600">
                  Add the new dashboard to your routing configuration and navigation
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
