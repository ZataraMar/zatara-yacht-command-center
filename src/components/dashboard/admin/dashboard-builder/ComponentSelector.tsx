
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, BarChart3, PieChart, LineChart, Filter, Search, Calendar, Users, Euro, TrendingUp } from 'lucide-react';
import { DashboardField, DashboardComponent, DashboardConfig } from '../DashboardBuilder';

interface ComponentSelectorProps {
  selectedFields: DashboardField[];
  dashboardConfig: DashboardConfig;
  onComponentAdd: (component: DashboardComponent) => void;
  onConfigUpdate: (config: DashboardConfig) => void;
}

const componentTypes = [
  {
    type: 'table',
    icon: Table,
    name: 'Data Table',
    description: 'Display data in rows and columns with sorting and filtering',
    color: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    type: 'card',
    icon: Users,
    name: 'Metric Card',
    description: 'Show key metrics with values and trends',
    color: 'bg-green-50 text-green-700 border-green-200'
  },
  {
    type: 'chart',
    icon: BarChart3,
    name: 'Chart/Graph',
    description: 'Visualize data with various chart types',
    color: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  {
    type: 'filter',
    icon: Filter,
    name: 'Filter Panel',
    description: 'Add filters and controls to your dashboard',
    color: 'bg-orange-50 text-orange-700 border-orange-200'
  },
  {
    type: 'search',
    icon: Search,
    name: 'Search Box',
    description: 'Global search functionality',
    color: 'bg-gray-50 text-gray-700 border-gray-200'
  }
];

export const ComponentSelector: React.FC<ComponentSelectorProps> = ({
  selectedFields,
  dashboardConfig,
  onComponentAdd,
  onConfigUpdate
}) => {
  const [selectedComponent, setSelectedComponent] = useState<string>('');
  const [componentConfig, setComponentConfig] = useState<any>({});

  const handleComponentSelect = (type: string) => {
    setSelectedComponent(type);
    setComponentConfig({
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      fields: [],
      configuration: {}
    });
  };

  const handleAddComponent = () => {
    if (!selectedComponent) return;

    const component: DashboardComponent = {
      id: `${selectedComponent}-${Date.now()}`,
      type: selectedComponent as any,
      title: componentConfig.title,
      fields: componentConfig.fields || [],
      configuration: componentConfig.configuration || {}
    };

    onComponentAdd(component);
    setSelectedComponent('');
    setComponentConfig({});
  };

  const addFieldToComponent = (field: DashboardField) => {
    setComponentConfig(prev => ({
      ...prev,
      fields: [...(prev.fields || []), field]
    }));
  };

  const removeFieldFromComponent = (fieldId: string) => {
    setComponentConfig(prev => ({
      ...prev,
      fields: (prev.fields || []).filter((f: DashboardField) => f.id !== fieldId)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Component Types</CardTitle>
            <CardDescription>Choose the type of component to add to your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {componentTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <div
                    key={type.type}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedComponent === type.type
                        ? 'border-zatara-blue bg-zatara-blue/5'
                        : 'border-gray-200 hover:border-zatara-blue/50'
                    }`}
                    onClick={() => handleComponentSelect(type.type)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${type.color}`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{type.name}</h3>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Component Configuration</CardTitle>
            <CardDescription>Configure the selected component</CardDescription>
          </CardHeader>
          <CardContent>
            {!selectedComponent ? (
              <div className="text-center text-gray-500 py-8">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Select a component type to configure</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="component-title">Component Title</Label>
                  <Input
                    id="component-title"
                    value={componentConfig.title || ''}
                    onChange={(e) => setComponentConfig(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter component title"
                  />
                </div>

                {selectedComponent === 'chart' && (
                  <div className="space-y-2">
                    <Label>Chart Type</Label>
                    <Select onValueChange={(value) => setComponentConfig(prev => ({ 
                      ...prev, 
                      configuration: { ...prev.configuration, chartType: value }
                    }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select chart type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bar">Bar Chart</SelectItem>
                        <SelectItem value="line">Line Chart</SelectItem>
                        <SelectItem value="pie">Pie Chart</SelectItem>
                        <SelectItem value="area">Area Chart</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Component Fields</Label>
                  <div className="border rounded-lg p-3 max-h-40 overflow-y-auto">
                    {(componentConfig.fields || []).length === 0 ? (
                      <p className="text-sm text-gray-500">No fields selected</p>
                    ) : (
                      <div className="space-y-1">
                        {(componentConfig.fields || []).map((field: DashboardField) => (
                          <div key={field.id} className="flex items-center justify-between text-sm">
                            <span>{field.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFieldFromComponent(field.id)}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Available Fields</Label>
                  <div className="border rounded-lg p-3 max-h-32 overflow-y-auto">
                    {selectedFields.filter(field => 
                      !(componentConfig.fields || []).some((f: DashboardField) => f.id === field.id)
                    ).map(field => (
                      <div
                        key={field.id}
                        className="flex items-center justify-between text-sm p-1 hover:bg-gray-50 rounded cursor-pointer"
                        onClick={() => addFieldToComponent(field)}
                      >
                        <span>{field.name}</span>
                        <Badge variant="outline" className="text-xs">{field.type}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={handleAddComponent}
                  className="w-full"
                  disabled={!componentConfig.title || (componentConfig.fields || []).length === 0}
                >
                  Add Component to Dashboard
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dashboard Components</CardTitle>
          <CardDescription>Components currently configured for your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          {dashboardConfig.components.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <BarChart3 className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No components added yet</p>
              <p className="text-xs">Add components above to build your dashboard</p>
            </div>
          ) : (
            <div className="space-y-3">
              {dashboardConfig.components.map((component, index) => (
                <div key={component.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{component.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{component.type}</Badge>
                        <Badge variant="secondary">{component.fields.length} fields</Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Configure
                    </Button>
                  </div>
                  {component.fields.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {component.fields.map(field => (
                        <Badge key={field.id} variant="outline" className="text-xs">
                          {field.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
