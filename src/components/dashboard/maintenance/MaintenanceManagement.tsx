import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wrench, 
  Calendar, 
  Users, 
  Package, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Phone,
  MapPin,
  DollarSign,
  Plus
} from 'lucide-react';

export const MaintenanceManagement = () => {
  const [activeTab, setActiveTab] = useState('work-orders');

  const workOrders = [
    {
      id: 'WO-2024-001',
      boat: 'Zatara',
      type: 'Engine Service',
      priority: 'High',
      status: 'In Progress',
      assignedTo: 'Tom - Marine Mechanic',
      scheduledDate: '2024-07-15',
      estimatedCost: 850,
      description: 'Annual engine service and oil change'
    },
    {
      id: 'WO-2024-002',
      boat: 'PuraVida',
      type: 'Hull Cleaning',
      priority: 'Medium',
      status: 'Scheduled',
      assignedTo: 'Jason - Technical',
      scheduledDate: '2024-07-18',
      estimatedCost: 420,
      description: 'Deep hull cleaning and antifouling inspection'
    }
  ];

  const suppliers = [
    {
      id: 1,
      name: 'Palma Marine Services',
      speciality: 'Engine & Mechanical',
      contact: '+34 971 234 567',
      email: 'info@palmamarine.es',
      location: 'Palma, Mallorca',
      rating: 4.8,
      lastUsed: '2024-06-10'
    },
    {
      id: 2,
      name: 'Mediterranean Yacht Care',
      speciality: 'Hull & Exterior',
      contact: '+34 971 345 678',
      email: 'service@medyachtcare.com',
      location: 'Puerto Portals',
      rating: 4.6,
      lastUsed: '2024-05-22'
    }
  ];

  const mechanics = [
    {
      id: 1,
      name: 'Tom Rodriguez',
      type: 'External Contractor',
      speciality: 'Engine Specialist',
      phone: '+34 666 123 456',
      hourlyRate: 45,
      availability: 'Available',
      nextBooking: '2024-07-15'
    },
    {
      id: 2,
      name: 'Jason Miller',
      type: 'External Contractor',
      speciality: 'Technical Systems',
      phone: '+34 666 789 012',
      hourlyRate: 40,
      availability: 'Busy until 2024-07-20',
      nextBooking: '2024-07-18'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-[#CCCC33]';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-[#00A3E4] text-white';
      case 'Scheduled': return 'bg-[#CCCC33] text-black';
      case 'Completed': return 'bg-green-500 text-white';
      case 'Cancelled': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#00A3E4]" style={{ fontFamily: 'Cosmoball, cursive' }}>
            Maintenance & Works
          </h2>
          <p className="text-gray-600 mt-1" style={{ fontFamily: 'Tw Cen MT, sans-serif' }}>
            FLEET MAINTENANCE MANAGEMENT
          </p>
        </div>
        <Button className="bg-[#00A3E4] hover:bg-[#0085B8] text-white">
          <Plus className="mr-2 h-4 w-4" />
          NEW WORK ORDER
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Urgent Work Orders</p>
                <p className="text-2xl font-bold text-red-500">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#00A3E4]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-[#00A3E4]">5</p>
              </div>
              <Clock className="h-8 w-8 text-[#00A3E4]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed This Month</p>
                <p className="text-2xl font-bold text-green-500">12</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#D4AF37]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Cost This Month</p>
                <p className="text-2xl font-bold text-[#D4AF37]">€4,250</p>
              </div>
              <DollarSign className="h-8 w-8 text-[#D4AF37]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="work-orders">Work Orders</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="mechanics">Mechanics</TabsTrigger>
        </TabsList>

        <TabsContent value="work-orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Cosmoball, cursive' }}>Active Work Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workOrders.map((order) => (
                  <div key={order.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-[#00A3E4] text-white">{order.id}</Badge>
                        <Badge className={getPriorityColor(order.priority)}>{order.priority}</Badge>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#D4AF37]">€{order.estimatedCost}</p>
                        <p className="text-xs text-gray-500">Estimated Cost</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-semibold text-[#00A3E4]" style={{ fontFamily: 'Cosmoball, cursive' }}>
                          {order.type} - {order.boat}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{order.description}</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <Users className="h-4 w-4 mr-1" />
                          {order.assignedTo}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          {order.scheduledDate}
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">VIEW DETAILS</Button>
                        <Button size="sm" className="bg-[#00A3E4] hover:bg-[#0085B8] text-white">
                          UPDATE STATUS
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Cosmoball, cursive' }}>Preferred Suppliers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suppliers.map((supplier) => (
                  <div key={supplier.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#00A3E4]" style={{ fontFamily: 'Cosmoball, cursive' }}>
                          {supplier.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">{supplier.speciality}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            {supplier.contact}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {supplier.location}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Rating</p>
                          <p className="font-semibold text-[#D4AF37]">⭐ {supplier.rating}</p>
                        </div>
                        
                        <Button variant="outline" size="sm" className="border-[#00A3E4] text-[#00A3E4] hover:bg-[#00A3E4] hover:text-white">
                          REQUEST QUOTE
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mechanics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Cosmoball, cursive' }}>Mechanics & Contractors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mechanics.map((mechanic) => (
                  <div key={mechanic.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-[#00A3E4]" style={{ fontFamily: 'Cosmoball, cursive' }}>
                            {mechanic.name}
                          </h4>
                          <Badge className="bg-[#CCCC33] text-black">{mechanic.type}</Badge>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">{mechanic.speciality}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            {mechanic.phone}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            €{mechanic.hourlyRate}/hour
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Status</p>
                          <p className={`font-semibold ${
                            mechanic.availability === 'Available' ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {mechanic.availability}
                          </p>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-[#00A3E4] text-[#00A3E4] hover:bg-[#00A3E4] hover:text-white"
                          disabled={mechanic.availability !== 'Available'}
                        >
                          ASSIGN WORK
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};