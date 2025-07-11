import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Crown, 
  Star, 
  Calendar, 
  DollarSign, 
  Ship, 
  Clock, 
  Mail, 
  Phone,
  MapPin,
  TrendingUp,
  AlertCircle,
  Plus
} from 'lucide-react';

export const BoatClubManagement = () => {
  const [activeTab, setActiveTab] = useState('members');

  const memberTiers = [
    { id: 'premium', name: 'Premium', color: 'bg-[#D4AF37]', count: 8, price: 2500 },
    { id: 'standard', name: 'Standard', color: 'bg-[#00A3E4]', count: 15, price: 1800 },
    { id: 'basic', name: 'Basic', color: 'bg-[#CCCC33]', count: 12, price: 1200 }
  ];

  const members = [
    {
      id: 1,
      name: 'Alexander & Sofia Petrov',
      email: 'alex.petrov@email.com',
      phone: '+41 79 123 4567',
      location: 'Zurich, Switzerland',
      tier: 'premium',
      joinDate: '2023-01-15',
      membershipExpiry: '2024-12-31',
      totalBookings: 18,
      hoursUsed: 145,
      hoursAllowed: 200,
      outstandingBalance: 0,
      status: 'Active',
      preferredBoat: 'Zatara',
      notes: 'Prefers morning charters, excellent member'
    },
    {
      id: 2,
      name: 'Marina Investment Ltd',
      email: 'contact@marinainvest.com',
      phone: '+33 1 23 45 67 89',
      location: 'Monaco',
      tier: 'premium',
      joinDate: '2023-03-01',
      membershipExpiry: '2024-12-31',
      totalBookings: 24,
      hoursUsed: 180,
      hoursAllowed: 200,
      outstandingBalance: 1250,
      status: 'Active',
      preferredBoat: 'Any',
      notes: 'Corporate membership for client entertainment'
    }
  ];

  const boatAllocation = [
    {
      boat: 'Zatara',
      totalHours: 320,
      memberHours: 280,
      charterHours: 40,
      utilization: 87,
      nextAvailable: '2024-07-16'
    },
    {
      boat: 'PuraVida',
      totalHours: 240,
      memberHours: 190,
      charterHours: 50,
      utilization: 79,
      nextAvailable: '2024-07-14'
    }
  ];

  const getTierInfo = (tierId: string) => {
    return memberTiers.find(tier => tier.id === tierId) || memberTiers[1];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500 text-white';
      case 'Expired': return 'bg-red-500 text-white';
      case 'Suspended': return 'bg-orange-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'text-red-500';
    if (utilization >= 75) return 'text-orange-500';
    if (utilization >= 50) return 'text-[#CCCC33]';
    return 'text-green-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#00A3E4]" style={{ fontFamily: 'Cosmoball, cursive' }}>
            Boat Club Management
          </h2>
          <p className="text-gray-600 mt-1" style={{ fontFamily: 'Tw Cen MT, sans-serif' }}>
            MEMBERSHIP & ALLOCATION MANAGEMENT
          </p>
        </div>
        <Button className="bg-[#00A3E4] hover:bg-[#0085B8] text-white">
          <Plus className="mr-2 h-4 w-4" />
          ADD NEW MEMBER
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-[#00A3E4]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="text-2xl font-bold text-[#00A3E4]">35</p>
              </div>
              <Users className="h-8 w-8 text-[#00A3E4]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#CCCC33]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-[#CCCC33]">€58K</p>
              </div>
              <DollarSign className="h-8 w-8 text-[#CCCC33]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#D4AF37]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Outstanding Balances</p>
                <p className="text-2xl font-bold text-[#D4AF37]">€3.2K</p>
              </div>
              <AlertCircle className="h-8 w-8 text-[#D4AF37]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Fleet Utilization</p>
                <p className="text-2xl font-bold text-green-500">83%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Membership Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {memberTiers.map((tier) => (
          <Card key={tier.id} className={`border-l-4 ${tier.color.replace('bg-', 'border-l-')}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg" style={{ fontFamily: 'Cosmoball, cursive' }}>
                  {tier.name} Tier
                </h3>
                <Crown className={`h-6 w-6 ${tier.color.replace('bg-', 'text-')}`} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{tier.count}</p>
                  <p className="text-sm text-gray-600">Members</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-[#D4AF37]">€{tier.price}</p>
                  <p className="text-xs text-gray-500">per month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="allocation">Boat Allocation</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Cosmoball, cursive' }}>Club Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {members.map((member) => {
                  const tierInfo = getTierInfo(member.tier);
                  const usagePercentage = (member.hoursUsed / member.hoursAllowed) * 100;
                  
                  return (
                    <div key={member.id} className="p-6 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-xl font-semibold text-[#00A3E4]" style={{ fontFamily: 'Cosmoball, cursive' }}>
                              {member.name}
                            </h4>
                            <Badge className={`${tierInfo.color} text-white`}>{tierInfo.name}</Badge>
                            <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                            <div>
                              <div className="flex items-center mb-1">
                                <Mail className="h-4 w-4 mr-1" />
                                {member.email}
                              </div>
                              <div className="flex items-center mb-1">
                                <Phone className="h-4 w-4 mr-1" />
                                {member.phone}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {member.location}
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex items-center mb-1">
                                <Calendar className="h-4 w-4 mr-1" />
                                Member since: {member.joinDate}
                              </div>
                              <div className="flex items-center mb-1">
                                <Clock className="h-4 w-4 mr-1" />
                                Expires: {member.membershipExpiry}
                              </div>
                              <div className="flex items-center">
                                <Ship className="h-4 w-4 mr-1" />
                                Prefers: {member.preferredBoat}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {member.outstandingBalance > 0 && (
                          <div className="text-right ml-6">
                            <p className="text-lg font-bold text-red-500">€{member.outstandingBalance}</p>
                            <p className="text-sm text-gray-500">Outstanding</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg mb-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-[#00A3E4]">{member.totalBookings}</p>
                          <p className="text-sm text-gray-600">Total Bookings</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-[#CCCC33]">{member.hoursUsed}h</p>
                          <p className="text-sm text-gray-600">Hours Used</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-600">{member.hoursAllowed}h</p>
                          <p className="text-sm text-gray-600">Hours Allowed</p>
                        </div>
                        <div className="text-center">
                          <p className={`text-2xl font-bold ${usagePercentage > 80 ? 'text-red-500' : 'text-green-500'}`}>
                            {Math.round(usagePercentage)}%
                          </p>
                          <p className="text-sm text-gray-600">Usage Rate</p>
                        </div>
                      </div>
                      
                      {member.notes && (
                        <div className="p-3 bg-blue-50 rounded text-sm text-gray-700 mb-4">
                          <strong>Notes:</strong> {member.notes}
                        </div>
                      )}
                      
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">VIEW BOOKINGS</Button>
                        <Button variant="outline" size="sm">SEND INVOICE</Button>
                        <Button size="sm" className="bg-[#00A3E4] hover:bg-[#0085B8] text-white">
                          MANAGE MEMBERSHIP
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Cosmoball, cursive' }}>Boat Allocation & Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {boatAllocation.map((boat, index) => (
                  <div key={index} className="p-6 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-semibold text-[#00A3E4]" style={{ fontFamily: 'Cosmoball, cursive' }}>
                        {boat.boat}
                      </h4>
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${getUtilizationColor(boat.utilization)}`}>
                          {boat.utilization}%
                        </p>
                        <p className="text-sm text-gray-500">Utilization</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#00A3E4]">{boat.totalHours}h</p>
                        <p className="text-sm text-gray-600">Total Hours</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#CCCC33]">{boat.memberHours}h</p>
                        <p className="text-sm text-gray-600">Member Hours</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#D4AF37]">{boat.charterHours}h</p>
                        <p className="text-sm text-gray-600">Charter Hours</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-500">{boat.nextAvailable}</p>
                        <p className="text-sm text-gray-600">Next Available</p>
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