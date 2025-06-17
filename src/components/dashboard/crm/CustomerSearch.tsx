
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Calendar, DollarSign, MapPin } from 'lucide-react';
import { useCustomerData } from '@/hooks/useCustomerData';

export const CustomerSearch = () => {
  const { customers, loading } = useCustomerData();
  const [searchCriteria, setSearchCriteria] = useState({
    name: '',
    email: '',
    phone: '',
    minSpent: '',
    maxSpent: '',
    minBookings: '',
    nationality: '',
    preferredBoat: '',
    segment: 'all',
    lastBookingDays: '',
  });

  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = () => {
    if (!customers) return;

    const results = customers.filter(customer => {
      const matchesName = !searchCriteria.name || 
        customer.full_name?.toLowerCase().includes(searchCriteria.name.toLowerCase());
      
      const matchesEmail = !searchCriteria.email || 
        customer.email_primary?.toLowerCase().includes(searchCriteria.email.toLowerCase());
      
      const matchesPhone = !searchCriteria.phone || 
        customer.phone_primary?.includes(searchCriteria.phone);
      
      const matchesMinSpent = !searchCriteria.minSpent || 
        (customer.total_spent || 0) >= parseFloat(searchCriteria.minSpent);
      
      const matchesMaxSpent = !searchCriteria.maxSpent || 
        (customer.total_spent || 0) <= parseFloat(searchCriteria.maxSpent);
      
      const matchesMinBookings = !searchCriteria.minBookings || 
        (customer.total_bookings || 0) >= parseInt(searchCriteria.minBookings);
      
      const matchesSegment = searchCriteria.segment === 'all' || 
        customer.customer_segment === searchCriteria.segment;
      
      const matchesNationality = !searchCriteria.nationality || 
        customer.nationality?.toLowerCase().includes(searchCriteria.nationality.toLowerCase());
      
      const matchesBoat = !searchCriteria.preferredBoat || 
        customer.preferred_boat?.toLowerCase().includes(searchCriteria.preferredBoat.toLowerCase());

      return matchesName && matchesEmail && matchesPhone && matchesMinSpent && 
             matchesMaxSpent && matchesMinBookings && matchesSegment && 
             matchesNationality && matchesBoat;
    });

    setSearchResults(results);
  };

  const clearFilters = () => {
    setSearchCriteria({
      name: '',
      email: '',
      phone: '',
      minSpent: '',
      maxSpent: '',
      minBookings: '',
      nationality: '',
      preferredBoat: '',
      segment: 'all',
      lastBookingDays: '',
    });
    setSearchResults([]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Advanced Customer Search</span>
          </CardTitle>
          <CardDescription>
            Search and filter customers using multiple criteria
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div>
            <h4 className="font-medium mb-3">Basic Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Customer name..."
                value={searchCriteria.name}
                onChange={(e) => setSearchCriteria(prev => ({ ...prev, name: e.target.value }))}
              />
              <Input
                placeholder="Email address..."
                value={searchCriteria.email}
                onChange={(e) => setSearchCriteria(prev => ({ ...prev, email: e.target.value }))}
              />
              <Input
                placeholder="Phone number..."
                value={searchCriteria.phone}
                onChange={(e) => setSearchCriteria(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
          </div>

          {/* Financial Criteria */}
          <div>
            <h4 className="font-medium mb-3">Financial Criteria</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Min amount spent (€)"
                type="number"
                value={searchCriteria.minSpent}
                onChange={(e) => setSearchCriteria(prev => ({ ...prev, minSpent: e.target.value }))}
              />
              <Input
                placeholder="Max amount spent (€)"
                type="number"
                value={searchCriteria.maxSpent}
                onChange={(e) => setSearchCriteria(prev => ({ ...prev, maxSpent: e.target.value }))}
              />
              <Input
                placeholder="Min bookings count"
                type="number"
                value={searchCriteria.minBookings}
                onChange={(e) => setSearchCriteria(prev => ({ ...prev, minBookings: e.target.value }))}
              />
            </div>
          </div>

          {/* Preferences */}
          <div>
            <h4 className="font-medium mb-3">Preferences & Demographics</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select 
                value={searchCriteria.segment} 
                onValueChange={(value) => setSearchCriteria(prev => ({ ...prev, segment: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Customer Segment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Segments</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="loyal">Loyal</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Nationality..."
                value={searchCriteria.nationality}
                onChange={(e) => setSearchCriteria(prev => ({ ...prev, nationality: e.target.value }))}
              />
              <Input
                placeholder="Preferred boat..."
                value={searchCriteria.preferredBoat}
                onChange={(e) => setSearchCriteria(prev => ({ ...prev, preferredBoat: e.target.value }))}
              />
              <Input
                placeholder="Last booking (days ago)"
                type="number"
                value={searchCriteria.lastBookingDays}
                onChange={(e) => setSearchCriteria(prev => ({ ...prev, lastBookingDays: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <Button onClick={handleSearch} disabled={loading}>
              <Search className="h-4 w-4 mr-2" />
              Search Customers
            </Button>
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results ({searchResults.length} customers found)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResults.map((customer) => (
                <div key={customer.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h4 className="font-medium">{customer.full_name}</h4>
                          <p className="text-sm text-gray-600">
                            {customer.email_primary} • {customer.phone_primary}
                          </p>
                        </div>
                        <Badge className={getSegmentColor(customer.customer_segment)}>
                          {customer.customer_segment || 'Standard'}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-6 mt-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>€{(customer.total_spent || 0).toLocaleString()} spent</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{customer.total_bookings || 0} bookings</span>
                        </div>
                        {customer.nationality && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{customer.nationality}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button size="sm">View Profile</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
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
