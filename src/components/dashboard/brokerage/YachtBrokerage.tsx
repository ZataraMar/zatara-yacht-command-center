import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Crown, 
  Eye, 
  Euro, 
  Calendar, 
  MapPin, 
  Ruler, 
  Users, 
  Camera,
  Heart,
  Share2,
  Plus,
  TrendingUp
} from 'lucide-react';

export const YachtBrokerage = () => {
  const [activeTab, setActiveTab] = useState('listings');

  const yachtListings = [
    {
      id: 'YS-001',
      name: 'Mallorcan Dream',
      type: 'Classic Llaut',
      year: 2018,
      length: 12.5,
      price: 185000,
      status: 'Active',
      location: 'Palma, Mallorca',
      viewCount: 234,
      inquiries: 12,
      images: 8,
      description: 'Beautiful traditional Mallorcan Llaut, perfect for charter business or private use'
    },
    {
      id: 'YS-002',
      name: 'Mediterranean Princess',
      type: 'Motor Yacht',
      year: 2020,
      length: 15.8,
      price: 320000,
      status: 'Under Offer',
      location: 'Puerto Portals',
      viewCount: 189,
      inquiries: 8,
      images: 15,
      description: 'Modern luxury motor yacht with premium amenities and excellent charter history'
    }
  ];

  const prospects = [
    {
      id: 1,
      name: 'Henrik & Emma Larsson',
      email: 'henrik.larsson@email.com',
      phone: '+46 70 123 4567',
      location: 'Stockholm, Sweden',
      interestedIn: 'Classic Llaut 10-14m',
      budget: '150,000 - 200,000',
      status: 'Hot Lead',
      lastContact: '2024-07-10',
      notes: 'Looking for charter-ready boat in Mallorca'
    },
    {
      id: 2,
      name: 'Marina Investment Group',
      email: 'investments@marinagroup.com',
      phone: '+33 1 23 45 67 89',
      location: 'Monaco',
      interestedIn: 'Multiple vessels',
      budget: '500,000+',
      status: 'Qualified',
      lastContact: '2024-07-08',
      notes: 'Corporate buyer looking for charter fleet expansion'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500 text-white';
      case 'Under Offer': return 'bg-[#CCCC33] text-black';
      case 'Sold': return 'bg-[#D4AF37] text-black';
      case 'Withdrawn': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getLeadStatusColor = (status: string) => {
    switch (status) {
      case 'Hot Lead': return 'bg-red-500 text-white';
      case 'Qualified': return 'bg-[#00A3E4] text-white';
      case 'Interested': return 'bg-[#CCCC33] text-black';
      case 'Cold': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#D4AF37]" style={{ fontFamily: 'Cosmoball, cursive' }}>
            Yacht Brokerage
          </h2>
          <p className="text-gray-600 mt-1" style={{ fontFamily: 'Tw Cen MT, sans-serif' }}>
            BOATS FOR SALE MANAGEMENT
          </p>
        </div>
        <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-black">
          <Plus className="mr-2 h-4 w-4" />
          ADD NEW LISTING
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-[#D4AF37]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Listings</p>
                <p className="text-2xl font-bold text-[#D4AF37]">8</p>
              </div>
              <Crown className="h-8 w-8 text-[#D4AF37]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#00A3E4]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Inquiries</p>
                <p className="text-2xl font-bold text-[#00A3E4]">47</p>
              </div>
              <Heart className="h-8 w-8 text-[#00A3E4]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sales This Year</p>
                <p className="text-2xl font-bold text-green-500">3</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#CCCC33]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-[#CCCC33]">€2.1M</p>
              </div>
              <Euro className="h-8 w-8 text-[#CCCC33]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="listings">Yacht Listings</TabsTrigger>
          <TabsTrigger value="prospects">Buyer Prospects</TabsTrigger>
        </TabsList>

        <TabsContent value="listings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Cosmoball, cursive' }}>Current Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {yachtListings.map((yacht) => (
                  <div key={yacht.id} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-xl font-semibold text-[#D4AF37]" style={{ fontFamily: 'Cosmoball, cursive' }}>
                            {yacht.name}
                          </h4>
                          <Badge className={getStatusColor(yacht.status)}>{yacht.status}</Badge>
                          <Badge variant="outline" className="text-[#00A3E4] border-[#00A3E4]">
                            {yacht.id}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{yacht.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-1" />
                            {yacht.year}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Ruler className="h-4 w-4 mr-1" />
                            {yacht.length}m
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            {yacht.location}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Camera className="h-4 w-4 mr-1" />
                            {yacht.images} photos
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-6">
                        <p className="text-2xl font-bold text-[#D4AF37]" style={{ fontFamily: 'Cosmoball, cursive' }}>
                          €{yacht.price.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">{yacht.type}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex space-x-6 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {yacht.viewCount} views
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          {yacht.inquiries} inquiries
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-1 h-4 w-4" />
                          VIEW LISTING
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="mr-1 h-4 w-4" />
                          SHARE
                        </Button>
                        <Button size="sm" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black">
                          EDIT LISTING
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prospects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Cosmoball, cursive' }}>Buyer Prospects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {prospects.map((prospect) => (
                  <div key={prospect.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-semibold text-[#00A3E4]" style={{ fontFamily: 'Cosmoball, cursive' }}>
                          {prospect.name}
                        </h4>
                        <Badge className={getLeadStatusColor(prospect.status)}>{prospect.status}</Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#D4AF37]">€{prospect.budget}</p>
                        <p className="text-xs text-gray-500">Budget Range</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {prospect.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          Last contact: {prospect.lastContact}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-600">
                          <strong>Interested in:</strong> {prospect.interestedIn}
                        </p>
                      </div>
                    </div>
                    
                    {prospect.notes && (
                      <div className="p-2 bg-gray-50 rounded text-sm text-gray-600 mb-3">
                        <strong>Notes:</strong> {prospect.notes}
                      </div>
                    )}
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">CONTACT</Button>
                      <Button size="sm" className="bg-[#00A3E4] hover:bg-[#0085B8] text-white">
                        SEND LISTINGS
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