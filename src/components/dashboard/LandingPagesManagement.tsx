
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Eye, Settings, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LandingPagesManagement = () => {
  const navigate = useNavigate();

  const handleViewTestPage = () => {
    navigate('/dashboard/test-zatara');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-zatara-navy">Landing Pages</h2>
          <p className="text-zatara-blue mt-2">Manage your booking and marketing landing pages</p>
        </div>
        <Button className="bg-zatara-blue hover:bg-zatara-blue-dark text-white">
          <Plus className="h-4 w-4 mr-2" />
          New Landing Page
        </Button>
      </div>

      {/* Existing Landing Pages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Test Zatara Page */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Globe className="h-8 w-8 text-zatara-blue" />
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleViewTestPage}
                  className="border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardTitle className="text-zatara-navy">Test Zatara Booking</CardTitle>
            <CardDescription>
              Testing iframe integration for the Zatara booking system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">URL:</span>
                <span className="text-zatara-blue font-mono">/dashboard/test-zatara</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status:</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Type:</span>
                <span className="text-zatara-blue">Booking Test</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Placeholder for future landing pages */}
        <Card className="border-dashed border-2 border-gray-300 bg-gray-50">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Globe className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-center mb-4">Create your next landing page</p>
            <Button variant="outline" className="border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Landing Page
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Landing Page Analytics */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-zatara-navy">Landing Page Performance</CardTitle>
            <CardDescription>Overview of your landing pages performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-zatara-blue">1</div>
                <div className="text-sm text-gray-500">Active Pages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-zatara-blue">-</div>
                <div className="text-sm text-gray-500">Total Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-zatara-blue">-</div>
                <div className="text-sm text-gray-500">Conversions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-zatara-blue">-</div>
                <div className="text-sm text-gray-500">Conversion Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
