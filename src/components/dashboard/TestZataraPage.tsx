
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TestZataraPage = () => {
  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard/landing-pages">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Landing Pages
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-zatara-navy">Test Zatara Booking</h1>
            <p className="text-zatara-blue mt-2">Testing the embedded booking system</p>
          </div>
        </div>
        <Globe className="h-8 w-8 text-zatara-blue" />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Iframe Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-zatara-navy">Booking System Preview</CardTitle>
              <CardDescription>
                Live preview of the Zatara booking iframe integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg">
                <iframe 
                  id="ifboat" 
                  src="https://boatcharter.zatara.es/es/boats/booking/75212/?iframe=True" 
                  height="750" 
                  width="100%" 
                  frameBorder="0"
                  className="rounded-md border border-gray-200"
                  title="Zatara Booking System"
                >
                  <p>Your browser does not support iframes. Please visit our booking page directly.</p>
                </iframe>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Test Information Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-zatara-blue">Test Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status:</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Source URL:</span>
                  <span className="text-zatara-blue font-mono text-xs">boatcharter.zatara.es</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Boat ID:</span>
                  <span className="text-zatara-blue">75212</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Language:</span>
                  <span className="text-zatara-blue">Spanish (ES)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-zatara-blue">Test Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Iframe loading correctly
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Responsive design working
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  Booking functionality test
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  Mobile compatibility check
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                  CORS and security verification
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-zatara-blue">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white"
                onClick={() => window.open('https://boatcharter.zatara.es/es/boats/booking/75212/', '_blank')}
              >
                Open Direct Link
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.location.reload()}
              >
                Refresh Test
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
