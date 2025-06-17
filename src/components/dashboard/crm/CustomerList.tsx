
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, MessageSquare, Phone, Mail, Eye } from 'lucide-react';
import { useCustomerData } from '@/hooks/useCustomerData';

export const CustomerList = () => {
  const { customers, loading, error, refetch } = useCustomerData();
  const [searchTerm, setSearchTerm] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('lifetime_value');

  const filteredCustomers = customers?.filter(customer => {
    const matchesSearch = !searchTerm || 
      customer.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email_primary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone_primary?.includes(searchTerm);
    
    const matchesSegment = segmentFilter === 'all' || customer.customer_segment === segmentFilter;
    
    return matchesSearch && matchesSegment;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'lifetime_value':
        return (b.customer_lifetime_value || 0) - (a.customer_lifetime_value || 0);
      case 'total_bookings':
        return (b.total_bookings || 0) - (a.total_bookings || 0);
      case 'last_booking':
        return new Date(b.last_booking_date || 0).getTime() - new Date(a.last_booking_date || 0).getTime();
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading customers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-600 mb-4">Error loading customers</div>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={refetch}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Customer Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={segmentFilter} onValueChange={setSegmentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Segments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Segments</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="loyal">Loyal</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lifetime_value">Lifetime Value</SelectItem>
                <SelectItem value="total_bookings">Total Bookings</SelectItem>
                <SelectItem value="last_booking">Last Booking</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={refetch} variant="outline">
              Refresh Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers && filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <Card key={customer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{customer.full_name || 'Unknown Customer'}</CardTitle>
                  <Badge className={getSegmentColor(customer.customer_segment)}>
                    {customer.customer_segment || 'Standard'}
                  </Badge>
                </div>
                <CardDescription>
                  {customer.email_primary && <span>{customer.email_primary}</span>}
                  {customer.email_primary && customer.phone_primary && <span> • </span>}
                  {customer.phone_primary && <span>{customer.phone_primary}</span>}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Bookings:</span>
                    <div className="font-medium">{customer.total_bookings || 0}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Total Spent:</span>
                    <div className="font-medium">€{(customer.total_spent || 0).toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">LTV:</span>
                    <div className="font-medium">€{(customer.customer_lifetime_value || 0).toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Last Booking:</span>
                    <div className="font-medium">
                      {customer.last_booking_date 
                        ? new Date(customer.last_booking_date).toLocaleDateString()
                        : 'Never'
                      }
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2 border-t">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Phone className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center p-8">
            <p className="text-gray-600">No customers found matching your criteria</p>
            <Button onClick={refetch} className="mt-4">
              Sync Customer Data
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const getSegmentColor = (segment: string) => {
  switch (segment?.toLowerCase()) {
    case 'vip': return 'bg-yellow-500 text-white';
    case 'premium': return 'bg-purple-500 text-white';
    case 'loyal': return 'bg-blue-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};
