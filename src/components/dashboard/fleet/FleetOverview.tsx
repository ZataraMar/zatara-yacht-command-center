
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Anchor, Calendar, Wrench, Users, DollarSign, MapPin, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { SchedulingDialog } from './SchedulingDialog';
import { MaintenanceDialog } from './MaintenanceDialog';

interface FleetData {
  id: string;
  name: string;
  type: string;
  capacity: number;
  status: 'available' | 'in_use' | 'maintenance' | 'unavailable';
  location: string;
  nextCharter: string | null;
  maintenanceStatus: 'good' | 'due' | 'overdue';
  revenue: number;
  utilization: number;
  image: string;
}

export const FleetOverview = () => {
  // Real fleet data
  const fleetData: FleetData[] = [
    {
      id: 'zatara',
      name: 'Zatara',
      type: 'Luxury Charter Yacht',
      capacity: 8,
      status: 'available',
      location: 'Port Adriano, Mallorca',
      nextCharter: '2024-12-20',
      maintenanceStatus: 'good',
      revenue: 45000,
      utilization: 78,
      image: '/lovable-uploads/c2ba532a-b378-4225-bbe6-7b4846e018fd.png'
    },
    {
      id: 'puravida',
      name: 'PuraVida',
      type: 'Day Charter Boat',
      capacity: 6,
      status: 'in_use',
      location: 'Palma Bay, Mallorca',
      nextCharter: '2024-12-19',
      maintenanceStatus: 'due',
      revenue: 28000,
      utilization: 65,
      image: '/lovable-uploads/83fe3d22-8bf7-47d2-9462-1954772ef062.png'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'in_use': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMaintenanceColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'due': return 'text-yellow-600';
      case 'overdue': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getMaintenanceIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="h-4 w-4" />;
      case 'due': return <Clock className="h-4 w-4" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4" />;
      default: return <Wrench className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zatara-navy">Fleet Management</h2>
          <p className="text-zatara-blue">Monitor and manage your yacht fleet operations</p>
        </div>
        <Button>
          <Anchor className="h-4 w-4 mr-2" />
          Add Vessel
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Fleet Overview</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Fleet Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Vessels</p>
                    <p className="text-2xl font-bold text-zatara-navy">{fleetData.length}</p>
                  </div>
                  <Anchor className="h-8 w-8 text-zatara-blue" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Available</p>
                    <p className="text-2xl font-bold text-green-600">
                      {fleetData.filter(boat => boat.status === 'available').length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">In Charter</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {fleetData.filter(boat => boat.status === 'in_use').length}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Maintenance</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {fleetData.filter(boat => boat.maintenanceStatus !== 'good').length}
                    </p>
                  </div>
                  <Wrench className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Individual Fleet Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {fleetData.map((boat) => (
              <Card key={boat.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img 
                    src={boat.image} 
                    alt={boat.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={getStatusColor(boat.status)}>
                      {boat.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{boat.name}</CardTitle>
                    <div className={`flex items-center space-x-1 ${getMaintenanceColor(boat.maintenanceStatus)}`}>
                      {getMaintenanceIcon(boat.maintenanceStatus)}
                      <span className="text-sm font-medium capitalize">{boat.maintenanceStatus}</span>
                    </div>
                  </div>
                  <CardDescription>{boat.type}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>Capacity: {boat.capacity}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="truncate">{boat.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      <span>€{boat.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{boat.utilization}% utilized</span>
                    </div>
                  </div>

                  {boat.nextCharter && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">
                        Next charter: {boat.nextCharter}
                      </p>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <SchedulingDialog boatName={boat.name}>
                      <Button size="sm" className="flex-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        Schedule
                      </Button>
                    </SchedulingDialog>
                    
                    <MaintenanceDialog boatName={boat.name}>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Wrench className="h-4 w-4 mr-1" />
                        Maintenance
                      </Button>
                    </MaintenanceDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {fleetData.map((boat) => (
              <Card key={boat.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{boat.name}</span>
                    <div className={`flex items-center space-x-1 ${getMaintenanceColor(boat.maintenanceStatus)}`}>
                      {getMaintenanceIcon(boat.maintenanceStatus)}
                      <span className="text-sm font-medium capitalize">{boat.maintenanceStatus}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MaintenanceDialog boatName={boat.name}>
                    <Button className="w-full">
                      <Wrench className="h-4 w-4 mr-2" />
                      View Maintenance
                    </Button>
                  </MaintenanceDialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Fleet Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fleetData.map((boat) => (
                    <div key={boat.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{boat.name}</span>
                        <span>{boat.utilization}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-zatara-blue h-2 rounded-full transition-all duration-300"
                          style={{ width: `${boat.utilization}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fleetData.map((boat) => (
                    <div key={boat.id} className="flex justify-between items-center">
                      <span className="font-medium">{boat.name}</span>
                      <span className="text-lg font-bold text-zatara-navy">
                        €{boat.revenue.toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center font-bold">
                      <span>Total Fleet Revenue</span>
                      <span className="text-xl text-zatara-navy">
                        €{fleetData.reduce((sum, boat) => sum + boat.revenue, 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
