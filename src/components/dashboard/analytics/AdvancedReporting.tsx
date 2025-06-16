
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Download, 
  Filter,
  Target,
  Award,
  Users,
  DollarSign
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { supabase } from '@/integrations/supabase/client';

export const AdvancedReporting = () => {
  const [reportPeriod, setReportPeriod] = useState('ytd');
  const [loading, setLoading] = useState(false);

  const executiveKPIs = [
    { name: 'Revenue Growth', value: '+23.5%', target: '+20%', status: 'above' },
    { name: 'Profit Margin', value: '42.3%', target: '40%', status: 'above' },
    { name: 'Guest Satisfaction', value: '4.8/5', target: '4.5/5', status: 'above' },
    { name: 'Occupancy Rate', value: '78%', target: '75%', status: 'above' },
    { name: 'Repeat Customers', value: '34%', target: '30%', status: 'above' },
    { name: 'Cost per Charter', value: '€425', target: '€450', status: 'below' }
  ];

  const seasonalData = [
    { month: 'Jan', revenue: 45000, charters: 28, occupancy: 45 },
    { month: 'Feb', revenue: 38000, charters: 24, occupancy: 42 },
    { month: 'Mar', revenue: 52000, charters: 35, occupancy: 58 },
    { month: 'Apr', revenue: 68000, charters: 48, occupancy: 72 },
    { month: 'May', revenue: 89000, charters: 62, occupancy: 85 },
    { month: 'Jun', revenue: 125000, charters: 78, occupancy: 92 },
    { month: 'Jul', revenue: 145000, charters: 89, occupancy: 98 },
    { month: 'Aug', revenue: 142000, charters: 87, occupancy: 96 }
  ];

  const forecastData = [
    { month: 'Sep', actual: null, forecast: 135000, confidence: 85 },
    { month: 'Oct', actual: null, forecast: 89000, confidence: 78 },
    { month: 'Nov', actual: null, forecast: 45000, confidence: 72 },
    { month: 'Dec', actual: null, forecast: 32000, confidence: 68 }
  ];

  const boatPerformance = [
    { boat: 'Zatara', revenue: 285000, charters: 156, hours: 1248, efficiency: 92 },
    { boat: 'PuraVida', revenue: 218000, charters: 134, hours: 896, efficiency: 88 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'above':
        return 'text-green-600';
      case 'below':
        return 'text-red-600';
      case 'meeting':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'above':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'below':
        return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      default:
        return <Target className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zatara-navy">Advanced Analytics & Reporting</h2>
          <p className="text-zatara-blue">Executive dashboards and business intelligence</p>
        </div>
        <div className="flex space-x-2">
          <Select value={reportPeriod} onValueChange={setReportPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mtd">This Month</SelectItem>
              <SelectItem value="qtd">This Quarter</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="executive" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="executive">Executive Dashboard</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal Analysis</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="executive" className="space-y-6">
          {/* Executive KPIs */}
          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
              <CardDescription>Critical business metrics vs targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {executiveKPIs.map((kpi, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{kpi.name}</h4>
                      {getStatusIcon(kpi.status)}
                    </div>
                    <div className="space-y-1">
                      <p className={`text-xl font-bold ${getStatusColor(kpi.status)}`}>
                        {kpi.value}
                      </p>
                      <p className="text-xs text-gray-600">Target: {kpi.target}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Revenue Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend (2024)</CardTitle>
                <CardDescription>Monthly revenue performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={seasonalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`€${Number(value).toLocaleString()}`, 'Revenue']} />
                    <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Charter Volume</CardTitle>
                <CardDescription>Monthly charter count and occupancy</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={seasonalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="charters" fill="#16a34a" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Business Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">YTD Revenue</p>
                    <p className="text-2xl font-bold text-zatara-navy">€704K</p>
                    <p className="text-xs text-green-600">+23.5% vs 2023</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Charters</p>
                    <p className="text-2xl font-bold text-zatara-navy">441</p>
                    <p className="text-xs text-green-600">+18% vs 2023</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Charter Value</p>
                    <p className="text-2xl font-bold text-zatara-navy">€1,596</p>
                    <p className="text-xs text-green-600">+4.7% vs 2023</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Guest Satisfaction</p>
                    <p className="text-2xl font-bold text-zatara-navy">4.8</p>
                    <p className="text-xs text-green-600">+0.3 vs 2023</p>
                  </div>
                  <Award className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="seasonal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Seasonal Performance Analysis</CardTitle>
              <CardDescription>Understanding seasonal trends and patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={seasonalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="revenue" orientation="left" />
                  <YAxis yAxisId="occupancy" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="revenue" type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} name="Revenue (€)" />
                  <Line yAxisId="occupancy" type="monotone" dataKey="occupancy" stroke="#16a34a" strokeWidth={2} name="Occupancy %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Peak Season Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded">
                    <h4 className="font-medium text-green-900">High Season (Jun-Aug)</h4>
                    <p className="text-sm text-green-700">Average occupancy: 95.3%</p>
                    <p className="text-sm text-green-700">Revenue: €412K (58% of annual)</p>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                    <h4 className="font-medium text-blue-900">Shoulder Season (Apr-May, Sep-Oct)</h4>
                    <p className="text-sm text-blue-700">Average occupancy: 73.5%</p>
                    <p className="text-sm text-blue-700">Revenue: €224K (32% of annual)</p>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded">
                    <h4 className="font-medium text-gray-900">Low Season (Nov-Mar)</h4>
                    <p className="text-sm text-gray-700">Average occupancy: 45.7%</p>
                    <p className="text-sm text-gray-700">Revenue: €68K (10% of annual)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Boat Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {boatPerformance.map((boat, index) => (
                    <div key={index} className="p-4 border rounded">
                      <h4 className="font-medium mb-2">{boat.boat}</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Revenue</p>
                          <p className="font-bold">€{boat.revenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Charters</p>
                          <p className="font-bold">{boat.charters}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Operating Hours</p>
                          <p className="font-bold">{boat.hours}h</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Efficiency</p>
                          <p className="font-bold">{boat.efficiency}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Forecasting</CardTitle>
              <CardDescription>Predictive analytics for business planning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center text-gray-500 py-8">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Advanced forecasting models will be integrated here</p>
                  <p className="text-sm">Machine learning predictions based on historical data</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Operational Performance</CardTitle>
              <CardDescription>Detailed performance metrics and efficiency analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center text-gray-500 py-8">
                  <Award className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Performance analytics dashboard will be integrated here</p>
                  <p className="text-sm">Operational efficiency and productivity metrics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
              <CardDescription>Create custom reports and dashboards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center text-gray-500 py-8">
                  <Filter className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Custom report builder will be integrated here</p>
                  <p className="text-sm">Drag-and-drop report creation with filters and visualizations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
