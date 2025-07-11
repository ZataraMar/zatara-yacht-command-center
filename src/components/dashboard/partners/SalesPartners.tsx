import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Handshake, 
  TrendingUp, 
  Users, 
  DollarSign, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Target,
  Award,
  Plus,
  Building2
} from 'lucide-react';

export const SalesPartners = () => {
  const [activeTab, setActiveTab] = useState('partners');

  const partners = [
    {
      id: 1,
      name: 'Mediterranean Charter Co.',
      type: 'Charter Broker',
      location: 'Barcelona, Spain',
      contact: 'Maria Rodriguez',
      email: 'maria@medcharter.com',
      phone: '+34 93 123 4567',
      commissionRate: 15,
      totalBookings: 23,
      totalRevenue: 45600,
      status: 'Active',
      territory: 'Spain & France',
      joinDate: '2023-02-15'
    },
    {
      id: 2,
      name: 'Nordic Yacht Experiences',
      type: 'Sales Agent',
      location: 'Stockholm, Sweden',
      contact: 'Erik Lindqvist',
      email: 'erik@nordicyacht.se',
      phone: '+46 8 123 4567',
      commissionRate: 12,
      totalBookings: 18,
      totalRevenue: 38200,
      status: 'Active',
      territory: 'Scandinavia',
      joinDate: '2023-05-10'
    }
  ];

  const internalTeam = [
    {
      id: 1,
      name: 'Jules Whiteway',
      role: 'Owner & Sales Director',
      email: 'cruise@zatara.es',
      phone: '+34 971 XXX XXX',
      totalSales: 156000,
      bookingsThisMonth: 12,
      target: 180000,
      performance: 87
    },
    {
      id: 2,
      name: 'Jo Martinez',
      role: 'Sales & Operations',
      email: 'jo@zatara.es',
      phone: '+34 971 XXX XXX',
      totalSales: 89500,
      bookingsThisMonth: 8,
      target: 120000,
      performance: 75
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500 text-white';
      case 'Inactive': return 'bg-red-500 text-white';
      case 'Pending': return 'bg-[#CCCC33] text-black';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-500';
    if (performance >= 75) return 'text-[#CCCC33]';
    if (performance >= 60) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#00A3E4]" style={{ fontFamily: 'Cosmoball, cursive' }}>
            Sales Partners & Team
          </h2>
          <p className="text-gray-600 mt-1" style={{ fontFamily: 'Tw Cen MT, sans-serif' }}>
            PARTNER & BROKER MANAGEMENT
          </p>
        </div>
        <Button className="bg-[#00A3E4] hover:bg-[#0085B8] text-white">
          <Plus className="mr-2 h-4 w-4" />
          ADD NEW PARTNER
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-[#00A3E4]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Partners</p>
                <p className="text-2xl font-bold text-[#00A3E4]">12</p>
              </div>
              <Handshake className="h-8 w-8 text-[#00A3E4]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#CCCC33]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Partner Revenue</p>
                <p className="text-2xl font-bold text-[#CCCC33]">€127K</p>
              </div>
              <DollarSign className="h-8 w-8 text-[#CCCC33]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#D4AF37]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Commissions Paid</p>
                <p className="text-2xl font-bold text-[#D4AF37]">€18.2K</p>
              </div>
              <Award className="h-8 w-8 text-[#D4AF37]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Partner Bookings</p>
                <p className="text-2xl font-bold text-green-500">67</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="partners">External Partners</TabsTrigger>
          <TabsTrigger value="internal">Internal Sales Team</TabsTrigger>
        </TabsList>

        <TabsContent value="partners" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Cosmoball, cursive' }}>Partner Network</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {partners.map((partner) => (
                  <div key={partner.id} className="p-6 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-xl font-semibold text-[#00A3E4]" style={{ fontFamily: 'Cosmoball, cursive' }}>
                            {partner.name}
                          </h4>
                          <Badge className={getStatusColor(partner.status)}>{partner.status}</Badge>
                          <Badge variant="outline" className="text-[#CCCC33] border-[#CCCC33]">
                            {partner.type}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <div className="flex items-center mb-1">
                              <Users className="h-4 w-4 mr-1" />
                              {partner.contact}
                            </div>
                            <div className="flex items-center mb-1">
                              <Mail className="h-4 w-4 mr-1" />
                              {partner.email}
                            </div>
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-1" />
                              {partner.phone}
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center mb-1">
                              <MapPin className="h-4 w-4 mr-1" />
                              {partner.location}
                            </div>
                            <div className="flex items-center mb-1">
                              <Target className="h-4 w-4 mr-1" />
                              Territory: {partner.territory}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Joined: {partner.joinDate}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-6">
                        <p className="text-2xl font-bold text-[#D4AF37]" style={{ fontFamily: 'Cosmoball, cursive' }}>
                          {partner.commissionRate}%
                        </p>
                        <p className="text-sm text-gray-500">Commission Rate</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#00A3E4]">{partner.totalBookings}</p>
                        <p className="text-sm text-gray-600">Total Bookings</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#CCCC33]">€{partner.totalRevenue.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Total Revenue</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#D4AF37]">€{Math.round(partner.totalRevenue * partner.commissionRate / 100).toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Commission Earned</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button variant="outline" size="sm">VIEW PERFORMANCE</Button>
                      <Button variant="outline" size="sm">CONTACT</Button>
                      <Button size="sm" className="bg-[#00A3E4] hover:bg-[#0085B8] text-white">
                        MANAGE PARTNERSHIP
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="internal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Cosmoball, cursive' }}>Zatara Sales Team</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {internalTeam.map((member) => (
                  <div key={member.id} className="p-6 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-xl font-semibold text-[#00A3E4]" style={{ fontFamily: 'Cosmoball, cursive' }}>
                            {member.name}
                          </h4>
                          <Badge className="bg-[#CCCC33] text-black">{member.role}</Badge>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-1" />
                            {member.email}
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            {member.phone}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-6">
                        <p className={`text-2xl font-bold ${getPerformanceColor(member.performance)}`} style={{ fontFamily: 'Cosmoball, cursive' }}>
                          {member.performance}%
                        </p>
                        <p className="text-sm text-gray-500">Performance</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#00A3E4]">{member.bookingsThisMonth}</p>
                        <p className="text-sm text-gray-600">Bookings This Month</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#CCCC33]">€{member.totalSales.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Total Sales YTD</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#D4AF37]">€{member.target.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Annual Target</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-500">€{Math.round((member.target * member.performance / 100) - member.totalSales).toLocaleString()}</p>
                        <p className="text-sm text-gray-600">To Target</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button variant="outline" size="sm">VIEW ACTIVITY</Button>
                      <Button size="sm" className="bg-[#00A3E4] hover:bg-[#0085B8] text-white">
                        PERFORMANCE REVIEW
                      </Button>
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