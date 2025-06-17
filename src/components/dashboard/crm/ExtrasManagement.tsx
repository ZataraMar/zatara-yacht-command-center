
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Package,
  Calendar,
  Utensils,
  Waves
} from 'lucide-react';
import { useComprehensiveBookings } from '@/hooks/useComprehensiveBookings';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { DateRange } from 'react-day-picker';

export const ExtrasManagement = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  
  const { bookings, loading } = useComprehensiveBookings();

  // Filter bookings for upcoming charters with potential extras
  const upcomingBookings = useMemo(() => {
    const now = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(now.getDate() + 30);

    return bookings.filter(booking => {
      const charterDate = new Date(booking.start_date);
      const matchesDate = charterDate >= now && charterDate <= thirtyDaysFromNow;
      
      const matchesSearch = !searchTerm || 
        booking.guest_full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.locator?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDateRange = !dateRange?.from || 
        (charterDate >= dateRange.from && 
         (!dateRange.to || charterDate <= dateRange.to));

      return matchesDate && matchesSearch && matchesDateRange;
    }).sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
  }, [bookings, searchTerm, dateRange]);

  // Categorize bookings by days until charter
  const extrasCategories = useMemo(() => {
    const now = new Date();
    
    return {
      urgent: upcomingBookings.filter(b => {
        const days = Math.ceil((new Date(b.start_date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return days <= 3;
      }),
      soon: upcomingBookings.filter(b => {
        const days = Math.ceil((new Date(b.start_date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return days > 3 && days <= 7;
      }),
      upcoming: upcomingBookings.filter(b => {
        const days = Math.ceil((new Date(b.start_date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return days > 7;
      })
    };
  }, [upcomingBookings]);

  const getDaysUntilCharter = (startDate: string) => {
    const now = new Date();
    const charter = new Date(startDate);
    return Math.ceil((charter.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getUrgencyColor = (days: number) => {
    if (days <= 3) return 'bg-red-500 text-white';
    if (days <= 7) return 'bg-yellow-500 text-white';
    return 'bg-blue-500 text-white';
  };

  const mockExtras = [
    { category: 'F&B', items: ['Champagne', 'Catering', 'BBQ Setup', 'Wine Selection'] },
    { category: 'Equipment', items: ['Water Toys', 'Snorkeling Gear', 'Fishing Equipment', 'SUP Boards'] },
    { category: 'Services', items: ['Photographer', 'DJ/Music', 'Decorations', 'Transfers'] }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading extras data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zatara-navy">Extras Management</h1>
          <p className="text-zatara-blue">Track and order extras in advance for upcoming charters</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Urgent Orders</p>
                <p className="text-2xl font-bold text-red-600">{extrasCategories.urgent.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-yellow-600">{extrasCategories.soon.length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-blue-600">{extrasCategories.upcoming.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Charters</p>
                <p className="text-2xl font-bold text-zatara-navy">{upcomingBookings.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-zatara-blue" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Search by guest name or locator..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <DateRangePicker
              date={dateRange}
              onDateChange={setDateRange}
              placeholder="Filter by charter date"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="timeline" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timeline">Order Timeline</TabsTrigger>
          <TabsTrigger value="urgent">Urgent (≤3 days)</TabsTrigger>
          <TabsTrigger value="categories">By Category</TabsTrigger>
          <TabsTrigger value="suppliers">Supplier Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline">
          <div className="space-y-4">
            {upcomingBookings.map((booking) => {
              const daysUntil = getDaysUntilCharter(booking.start_date);
              return (
                <Card key={booking.id} className="border-l-4 border-zatara-blue">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-lg">{booking.guest_full_name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>{booking.locator}</span>
                          <span>•</span>
                          <span>{new Date(booking.start_date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{booking.boat}</span>
                          <span>•</span>
                          <span>{booking.total_guests} guests</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getUrgencyColor(daysUntil)}>
                          {daysUntil} days until charter
                        </Badge>
                        <div className="mt-2 space-x-2">
                          <Button size="sm" variant="outline">
                            <Utensils className="h-3 w-3 mr-1" />
                            F&B
                          </Button>
                          <Button size="sm" variant="outline">
                            <Waves className="h-3 w-3 mr-1" />
                            Equipment
                          </Button>
                          <Button size="sm" variant="outline">
                            <Package className="h-3 w-3 mr-1" />
                            Services
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {booking.booking_notes && (
                      <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                        <p className="text-sm text-yellow-800">
                          <strong>Notes:</strong> {booking.booking_notes}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="urgent">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span>Urgent Orders (3 days or less)</span>
              </CardTitle>
              <CardDescription>
                These charters need immediate attention for extras ordering
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {extrasCategories.urgent.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4 bg-red-50 border-red-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-red-900">{booking.guest_full_name}</h4>
                        <div className="text-sm text-red-700">
                          {booking.locator} • {new Date(booking.start_date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="destructive">
                          {getDaysUntilCharter(booking.start_date)} days
                        </Badge>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          Order Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockExtras.map((category) => (
              <Card key={category.category}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {category.category === 'F&B' && <Utensils className="h-5 w-5" />}
                    {category.category === 'Equipment' && <Waves className="h-5 w-5" />}
                    {category.category === 'Services' && <Package className="h-5 w-5" />}
                    <span>{category.category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.items.map((item) => (
                      <div key={item} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">{item}</span>
                        <Button size="sm" variant="outline">
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="suppliers">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Order Summary</CardTitle>
              <CardDescription>
                Consolidated orders by supplier for efficient ordering
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-lg mb-2">Mallorca Catering Co.</h4>
                  <div className="text-sm text-gray-600">
                    Next 7 days: 5 orders • Total value: €2,450
                  </div>
                  <Button size="sm" className="mt-2">
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Place Bulk Order
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-lg mb-2">Palma Water Sports</h4>
                  <div className="text-sm text-gray-600">
                    Next 7 days: 3 orders • Equipment delivery needed
                  </div>
                  <Button size="sm" className="mt-2">
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Request Quote
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
