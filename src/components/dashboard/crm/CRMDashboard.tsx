
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, UserPlus, Search, BarChart3, MessageSquare, Calendar } from 'lucide-react';
import { CustomerList } from './CustomerList';
import { CustomerProfileView } from './CustomerProfileView';
import { CustomerSearch } from './CustomerSearch';
import { CustomerAnalytics } from './CustomerAnalytics';
import { CommunicationCenter } from './CommunicationCenter';
import { BookingsCenter } from './BookingsCenter';

export const CRMDashboard = () => {
  const [activeTab, setActiveTab] = useState('customers');
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zatara-navy">Customer Relationship Management</h1>
          <p className="text-zatara-blue">Manage customer relationships and analyze booking history</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
          <Button>
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Campaign
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="customers" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Customers</span>
          </TabsTrigger>
          <TabsTrigger value="bookings" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Bookings</span>
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <span>Search</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="communications" className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Communications</span>
          </TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="mt-6">
          <CustomerList />
        </TabsContent>

        <TabsContent value="bookings" className="mt-6">
          <BookingsCenter />
        </TabsContent>

        <TabsContent value="search" className="mt-6">
          <CustomerSearch />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <CustomerAnalytics />
        </TabsContent>

        <TabsContent value="communications" className="mt-6">
          <CommunicationCenter />
        </TabsContent>

        <TabsContent value="profile" className="mt-6">
          <CustomerProfileView />
        </TabsContent>
      </Tabs>
    </div>
  );
};
