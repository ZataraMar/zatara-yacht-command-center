
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Zatara Mar Dashboard</h1>
              <p className="text-gray-600">Management Platform</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.email}
              </span>
              <Button onClick={signOut} variant="outline">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Charters</CardTitle>
              <CardDescription>Active bookings and operations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-gray-600">charters scheduled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fleet Status</CardTitle>
              <CardDescription>Boat availability and maintenance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">8/10</p>
              <p className="text-sm text-gray-600">boats available</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue This Month</CardTitle>
              <CardDescription>Financial performance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">€45,280</p>
              <p className="text-sm text-green-600">+12% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="h-20 flex-col">
                  <span className="text-lg mb-1">📅</span>
                  <span>View Bookings</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <span className="text-lg mb-1">⚓</span>
                  <span>Fleet Management</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <span className="text-lg mb-1">👥</span>
                  <span>Team Schedule</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <span className="text-lg mb-1">📊</span>
                  <span>Reports</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
