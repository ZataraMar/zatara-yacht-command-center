import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Anchor, 
  Crown, 
  Building2, 
  UserCheck, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react';

export const MultiRoleCRM = () => {
  const [selectedRole, setSelectedRole] = useState('charter_clients');

  const customerRoles = [
    { id: 'charter_clients', name: 'Charter Clients', icon: Anchor, color: 'bg-[#00A3E4]', count: 156 },
    { id: 'boat_club', name: 'Boat Club Members', icon: Users, color: 'bg-[#CCCC33]', count: 42 },
    { id: 'yacht_buyers', name: 'Yacht Buyers', icon: Crown, color: 'bg-[#D4AF37]', count: 23 },
    { id: 'brokers', name: 'Brokers & Partners', icon: Building2, color: 'bg-[#66D9EF]', count: 18 },
  ];

  const mockCustomers = [
    {
      id: 1,
      name: 'Sarah & Michael Thompson',
      email: 'sarah.thompson@email.com',
      phone: '+44 7700 900123',
      location: 'London, UK',
      role: 'charter_clients',
      lastBooking: '2024-06-15',
      totalSpent: 3450,
      status: 'VIP',
      notes: 'Prefers Zatara for family charters'
    },
    {
      id: 2,
      name: 'Marina Club Mallorca',
      email: 'contact@marinaclub.es',
      phone: '+34 971 123 456',
      location: 'Palma, Mallorca',
      role: 'boat_club',
      memberSince: '2023-03-01',
      tier: 'Premium',
      status: 'Active',
      notes: 'Corporate membership for yacht management'
    }
  ];

  const currentCustomers = mockCustomers.filter(c => c.role === selectedRole);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#00A3E4]" style={{ fontFamily: 'Cosmoball, cursive' }}>
            Multi-Role CRM
          </h2>
          <p className="text-gray-600 mt-1" style={{ fontFamily: 'Tw Cen MT, sans-serif' }}>
            MANAGE ALL CUSTOMER RELATIONSHIPS
          </p>
        </div>
        <Button className="bg-[#00A3E4] hover:bg-[#0085B8] text-white">
          <UserCheck className="mr-2 h-4 w-4" />
          ADD NEW CUSTOMER
        </Button>
      </div>

      {/* Role Filter Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {customerRoles.map((role) => (
          <Card 
            key={role.id}
            className={`cursor-pointer transition-all duration-200 border-2 ${
              selectedRole === role.id 
                ? 'border-[#00A3E4] bg-[#00A3E4] bg-opacity-10' 
                : 'border-gray-200 hover:border-[#00A3E4] hover:bg-gray-50'
            }`}
            onClick={() => setSelectedRole(role.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${role.color} text-white`}>
                    <role.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ fontFamily: 'Tw Cen MT, sans-serif' }}>
                      {role.name}
                    </p>
                    <p className="text-xs text-gray-500">{role.count} active</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Customer List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span style={{ fontFamily: 'Cosmoball, cursive' }}>
              {customerRoles.find(r => r.id === selectedRole)?.name}
            </span>
            <Badge variant="outline" className="text-[#00A3E4] border-[#00A3E4]">
              {currentCustomers.length} customers
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentCustomers.map((customer) => (
              <div key={customer.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h4 className="font-semibold text-lg text-[#00A3E4]" style={{ fontFamily: 'Cosmoball, cursive' }}>
                          {customer.name}
                        </h4>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-1" />
                            {customer.email}
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            {customer.phone}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {customer.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {customer.totalSpent && (
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Total Spent</p>
                        <p className="font-semibold text-[#D4AF37]">€{customer.totalSpent}</p>
                      </div>
                    )}
                    
                    <Badge 
                      className={`${
                        customer.status === 'VIP' ? 'bg-[#D4AF37] text-black' :
                        customer.status === 'Active' ? 'bg-[#00A3E4] text-white' :
                        'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {customer.status}
                    </Badge>
                    
                    <Button variant="outline" size="sm" className="border-[#00A3E4] text-[#00A3E4] hover:bg-[#00A3E4] hover:text-white">
                      VIEW PROFILE
                    </Button>
                  </div>
                </div>
                
                {customer.notes && (
                  <div className="mt-3 p-2 bg-gray-50 rounded text-sm text-gray-600">
                    <strong>Notes:</strong> {customer.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};