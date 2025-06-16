
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Anchor, 
  Calendar, 
  Wrench, 
  Fuel, 
  MapPin, 
  Users, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Settings
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface FleetData {
  boat_name: string;
  status: 'active' | 'maintenance' | 'out_of_service';
  location: string;
  capacity: number;
  last_charter: string;
  next_maintenance: string;
  fuel_level: number;
  hours_today: number;
  revenue_mtd: number;
}

export const FleetOverview = () => {
  const [fleetData, setFleetData] = useState<FleetData[]>([
    {
      boat_name: 'Zatara',
      status: 'active',
      location: 'Port Adriano',
      capacity: 8,
      last_charter: '2024-06-15',
      next_maintenance: '2024-06-25',
      fuel_level: 85,
      hours_today: 6,
      revenue_mtd: 15750
    },
    {
      boat_name: 'PuraVida',
      status: 'active',
      location: 'Port Adriano',
      capacity: 6,
      last_charter: '2024-06-14',
      next_maintenance: '2024-06-30',
      fuel_level: 92,
      hours_today: 4,
      revenue_mtd: 12300
    }
  ]);

  const [todaysCharters, setTodaysCharters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFleetData();
  }, []);

  const fetchFleetData = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data: charters } = await supabase
        .from('bookings')
        .select('*')
        .gte('start_date', today)
        .lt('start_date', today + 'T23:59:59');

      setTodaysCharters(charters || []);
    } catch (error) {
      console.error('Error fetching fleet data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'maintenance':
        return 'bg-yellow-500';
      case 'out_of_service':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'maintenance':
        return <Wrench className="h-4 w-4" />;
      case 'out_of_service':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

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
          <h2 className="text-2xl font-bold text-zatara-navy">Fleet Management</h2>
          <p className="text-zatara-blue">Real-time fleet status and performance</p>
        </div>
        <Button>
          <Anchor className="h-4 w-4 mr-2" />
          Add New Boat
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Boats</p>
                <p className="text-2xl font-bold text-zatara-navy">
                  {fleetData.filter(boat => boat.status === 'active').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Anchor className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Hours Today</p>
                <p className="text-2xl font-bold text-zatara-navy">
                  {fleetData.reduce((sum, boat) => sum + boat.hours_today, 0)}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue MTD</p>
                <p className="text-2xl font-bold text-zatara-navy">
                  €{fleetData.reduce((sum, boat) => sum + boat.revenue_mtd, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Maintenance Due</p>
                <p className="text-2xl font-bold text-red-600">2</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <Wrench className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {fleetData.map((boat) => (
          <Card key={boat.boat_name} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Anchor className="h-5 w-5 text-zatara-blue" />
                  <span>{boat.boat_name}</span>
                </CardTitle>
                <Badge className={`${getStatusColor(boat.status)} text-white`}>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(boat.status)}
                    <span className="capitalize">{boat.status}</span>
                  </div>
                </Badge>
              </div>
              <CardDescription>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{boat.location}</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Capacity</span>
                        <span className="text-sm font-medium">{boat.capacity} guests</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Hours Today</span>
                        <span className="text-sm font-medium">{boat.hours_today}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Fuel Level</span>
                        <span className="text-sm font-medium">{boat.fuel_level}%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Revenue MTD</span>
                        <span className="text-sm font-medium">€{boat.revenue_mtd.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Last Charter</span>
                        <span className="text-sm font-medium">{boat.last_charter}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${boat.fuel_level > 50 ? 'bg-green-500' : boat.fuel_level > 25 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${boat.fuel_level}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="schedule" className="space-y-4">
                  <div className="text-sm text-gray-600">
                    <p>Today's charters: {todaysCharters.filter((charter: any) => charter.boat === boat.boat_name).length}</p>
                    <p>This week: 12 charters scheduled</p>
                    <p>Next available: Tomorrow 14:00</p>
                  </div>
                </TabsContent>

                <TabsContent value="maintenance" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Next Service</span>
                      <span className="text-sm font-medium">{boat.next_maintenance}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Engine Hours</span>
                      <span className="text-sm font-medium">1,247h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Last Inspection</span>
                      <span className="text-sm font-medium">2024-06-01</span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-4 flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Wrench className="h-4 w-4 mr-2" />
                  Maintenance
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
