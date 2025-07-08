
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { 
  Package, 
  Shield, 
  Cloud, 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Thermometer,
  Wind,
  Waves,
  FileText,
  Plus,
  Edit
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { formatTime } from '@/utils/formatters';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  min_quantity: number;
  location: string;
  last_checked: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

interface SafetyItem {
  id: string;
  item: string;
  category: string;
  checked: boolean;
  last_inspection: string;
  expires_at: string;
  notes: string;
}

interface WeatherData {
  temperature: number;
  wind_speed: number;
  wind_direction: string;
  wave_height: number;
  visibility: string;
  conditions: string;
  timestamp: string;
}

export const OperationalExcellence = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'Life Jackets',
      category: 'Safety',
      quantity: 24,
      min_quantity: 20,
      location: 'Storage A',
      last_checked: '2024-06-15',
      status: 'in_stock'
    },
    {
      id: '2',
      name: 'First Aid Kit',
      category: 'Safety',
      quantity: 2,
      min_quantity: 3,
      location: 'Bridge',
      last_checked: '2024-06-14',
      status: 'low_stock'
    },
    {
      id: '3',
      name: 'Fire Extinguishers',
      category: 'Safety',
      quantity: 0,
      min_quantity: 4,
      location: 'Various',
      last_checked: '2024-06-10',
      status: 'out_of_stock'
    }
  ]);

  const [safetyChecklist, setSafetyChecklist] = useState<SafetyItem[]>([
    {
      id: '1',
      item: 'Engine Oil Check',
      category: 'Mechanical',
      checked: true,
      last_inspection: '2024-06-15',
      expires_at: '2024-06-22',
      notes: 'Oil level normal'
    },
    {
      id: '2',
      item: 'Life Jacket Count',
      category: 'Safety',
      checked: false,
      last_inspection: '2024-06-14',
      expires_at: '2024-06-16',
      notes: ''
    }
  ]);

  const [weather, setWeather] = useState<WeatherData>({
    temperature: 28,
    wind_speed: 12,
    wind_direction: 'NE',
    wave_height: 0.8,
    visibility: 'Good',
    conditions: 'Partly Cloudy',
    timestamp: new Date().toISOString()
  });

  const [loading, setLoading] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock':
        return 'bg-green-500';
      case 'low_stock':
        return 'bg-yellow-500';
      case 'out_of_stock':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_stock':
        return <CheckCircle className="h-4 w-4" />;
      case 'low_stock':
        return <AlertTriangle className="h-4 w-4" />;
      case 'out_of_stock':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const updateSafetyItem = (id: string, checked: boolean) => {
    setSafetyChecklist(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, checked, last_inspection: new Date().toISOString().split('T')[0] }
          : item
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zatara-navy">Operational Excellence</h2>
          <p className="text-zatara-blue">Safety, inventory, and operational management</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Check
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inventory Items</p>
                <p className="text-2xl font-bold text-zatara-navy">{inventory.length}</p>
                <p className="text-xs text-red-600">
                  {inventory.filter(item => item.status === 'low_stock' || item.status === 'out_of_stock').length} need attention
                </p>
              </div>
              <Package className="h-8 w-8 text-zatara-blue" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Safety Checks</p>
                <p className="text-2xl font-bold text-zatara-navy">
                  {safetyChecklist.filter(item => item.checked).length}/{safetyChecklist.length}
                </p>
                <p className="text-xs text-green-600">Complete today</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Weather</p>
                <p className="text-2xl font-bold text-zatara-navy">{weather.temperature}°C</p>
                <p className="text-xs text-blue-600">{weather.conditions}</p>
              </div>
              <Cloud className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Incidents</p>
                <p className="text-2xl font-bold text-green-600">0</p>
                <p className="text-xs text-green-600">Today</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="safety">Safety Checks</TabsTrigger>
          <TabsTrigger value="weather">Weather & Routes</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>Track equipment and supplies across the fleet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventory.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-100 rounded">
                        <Package className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.category} • {item.location}</p>
                        <p className="text-xs text-gray-500">Last checked: {item.last_checked}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">{item.quantity}</p>
                        <p className="text-xs text-gray-500">Min: {item.min_quantity}</p>
                      </div>
                      <Badge className={`${getStatusColor(item.status)} text-white`}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(item.status)}
                          <span className="capitalize">{item.status.replace('_', ' ')}</span>
                        </div>
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="safety" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Safety Checklist</CardTitle>
              <CardDescription>Daily safety inspections and compliance checks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {safetyChecklist.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={(checked) => updateSafetyItem(item.id, checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{item.item}</h4>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Last inspection: {item.last_inspection} • Expires: {item.expires_at}
                      </p>
                      {item.notes && (
                        <p className="text-sm text-gray-500 mt-2">{item.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weather" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Weather Conditions</CardTitle>
                <CardDescription>Real-time weather data for safe operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Thermometer className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="text-sm font-medium">Temperature</p>
                        <p className="text-lg font-bold">{weather.temperature}°C</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Wind className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">Wind</p>
                        <p className="text-lg font-bold">{weather.wind_speed} km/h {weather.wind_direction}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Waves className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Wave Height</p>
                        <p className="text-lg font-bold">{weather.wave_height}m</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Cloud className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">Visibility</p>
                        <p className="text-lg font-bold">{weather.visibility}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Current Conditions</p>
                  <p className="text-lg font-bold text-blue-900">{weather.conditions}</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Last updated: {formatTime(weather.timestamp)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Route Planning</CardTitle>
                <CardDescription>Optimal routes based on weather and conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center text-gray-500 py-8">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Route planning system will be integrated here</p>
                    <p className="text-sm">GPS integration and weather-optimized routing</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="incidents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Incident Reporting</CardTitle>
              <CardDescription>Document and track safety incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center text-gray-500 py-8">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No incidents reported today</p>
                  <p className="text-sm">Incident reporting and tracking system</p>
                  <Button className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Report Incident
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance & Documentation</CardTitle>
              <CardDescription>Regulatory compliance and certificate management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center text-gray-500 py-8">
                  <Shield className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Compliance tracking system will be integrated here</p>
                  <p className="text-sm">Certificates, licenses, and regulatory documentation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
