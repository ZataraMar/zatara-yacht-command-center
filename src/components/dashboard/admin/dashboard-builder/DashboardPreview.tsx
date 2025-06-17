
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Eye, Table as TableIcon, BarChart3, Filter, Search, Users } from 'lucide-react';
import { DashboardConfig, DashboardField } from '../DashboardBuilder';

interface DashboardPreviewProps {
  dashboardConfig: DashboardConfig;
  availableFields: DashboardField[];
}

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({
  dashboardConfig,
  availableFields
}) => {
  const getComponentIcon = (type: string) => {
    switch (type) {
      case 'table': return TableIcon;
      case 'chart': return BarChart3;
      case 'card': return Users;
      case 'filter': return Filter;
      case 'search': return Search;
      default: return TableIcon;
    }
  };

  const renderPreviewComponent = (component: any) => {
    const IconComponent = getComponentIcon(component.type);

    switch (component.type) {
      case 'table':
        return (
          <Card key={component.id} className="w-full">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <TableIcon className="h-5 w-5" />
                {component.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    {component.fields.slice(0, 4).map((field: DashboardField) => (
                      <TableHead key={field.id}>{field.name.replace(/_/g, ' ')}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3].map(row => (
                    <TableRow key={row}>
                      {component.fields.slice(0, 4).map((field: DashboardField) => (
                        <TableCell key={field.id}>
                          {field.type === 'number' ? '€1,234' : 
                           field.type === 'date' ? '2024-06-17' : 
                           `Sample ${field.name}`}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );

      case 'card':
        return (
          <Card key={component.id}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5" />
                {component.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {component.fields.slice(0, 4).map((field: DashboardField) => (
                  <div key={field.id} className="text-center">
                    <p className="text-2xl font-bold text-zatara-navy">
                      {field.type === 'number' ? '1,234' : field.type === 'currency' ? '€12.5K' : '42'}
                    </p>
                    <p className="text-sm text-gray-600">{field.name.replace(/_/g, ' ')}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'chart':
        const sampleData = [
          { name: 'Jan', value: 400 },
          { name: 'Feb', value: 300 },
          { name: 'Mar', value: 600 },
          { name: 'Apr', value: 800 },
          { name: 'May', value: 500 }
        ];

        return (
          <Card key={component.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                {component.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={sampleData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#1E40AF" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        );

      case 'filter':
        return (
          <Card key={component.id}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Filter className="h-5 w-5" />
                {component.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {component.fields.slice(0, 4).map((field: DashboardField) => (
                  <div key={field.id} className="space-y-1">
                    <label className="text-sm font-medium">{field.name.replace(/_/g, ' ')}</label>
                    <div className="h-8 bg-gray-100 rounded border flex items-center px-2 text-sm text-gray-500">
                      Select {field.name}...
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      default:
        return (
          <Card key={component.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconComponent className="h-5 w-5" />
                {component.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Preview for {component.type} component</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Dashboard Preview
          </CardTitle>
          <CardDescription>
            Preview of how your dashboard will look with the configured components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-zatara-blue/5 rounded-lg border border-zatara-blue/20">
              <div>
                <h2 className="text-xl font-bold text-zatara-navy">{dashboardConfig.name}</h2>
                <p className="text-zatara-blue">{dashboardConfig.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{dashboardConfig.layout}</Badge>
                <Badge variant="outline">{dashboardConfig.theme} theme</Badge>
                <Badge variant="secondary">{dashboardConfig.components.length} components</Badge>
              </div>
            </div>

            {dashboardConfig.components.length === 0 ? (
              <div className="text-center text-gray-500 py-12 border-2 border-dashed border-gray-200 rounded-lg">
                <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No Components Yet</h3>
                <p className="text-sm">Add components in the Components tab to see your dashboard preview</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                dashboardConfig.layout === 'single-column' ? 'grid-cols-1' :
                dashboardConfig.layout === 'two-column' ? 'grid-cols-1 lg:grid-cols-2' :
                dashboardConfig.layout === 'three-column' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {dashboardConfig.components.map(renderPreviewComponent)}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview Notes</CardTitle>
          <CardDescription>Information about this preview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>• This is a mockup preview with sample data</p>
            <p>• Actual dashboard will use real data from your selected fields</p>
            <p>• Layout and styling will match your Zatara theme</p>
            <p>• Interactive features (filtering, sorting) will be fully functional</p>
            <p>• Mobile responsive design will be automatically applied</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
