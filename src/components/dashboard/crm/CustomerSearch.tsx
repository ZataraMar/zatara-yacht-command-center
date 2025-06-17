
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, User, Phone, Mail, Calendar } from 'lucide-react';
import { useCustomerData } from '@/hooks/useCustomerData';

export const CustomerSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { customers, loading } = useCustomerData();

  const handleSearch = () => {
    if (!searchQuery.trim() || !customers) {
      setSearchResults([]);
      return;
    }

    const results = customers.filter(customer => 
      customer.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email_primary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone_primary?.includes(searchQuery) ||
      customer.customer_key?.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 10); // Limit to 10 results

    setSearchResults(results);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Customer Search</span>
          </CardTitle>
          <CardDescription>Search for customers by name, email, phone, or customer ID</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, phone, or customer ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch} disabled={loading}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>Found {searchResults.length} customer(s)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResults.map((customer) => (
                <div key={customer.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-zatara-blue rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">{customer.full_name || 'Unknown Customer'}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          {customer.email_primary && (
                            <div className="flex items-center space-x-1">
                              <Mail className="h-3 w-3" />
                              <span>{customer.email_primary}</span>
                            </div>
                          )}
                          {customer.phone_primary && (
                            <div className="flex items-center space-x-1">
                              <Phone className="h-3 w-3" />
                              <span>{customer.phone_primary}</span>
                            </div>
                          )}
                          {customer.last_booking_date && (
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>Last: {new Date(customer.last_booking_date).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge className="bg-blue-500 text-white">
                          {customer.customer_segment || 'Standard'}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        {customer.total_bookings || 0} bookings • €{(customer.customer_lifetime_value || 0).toLocaleString()} LTV
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {searchQuery && searchResults.length === 0 && !loading && (
        <Card>
          <CardContent className="text-center p-8">
            <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600">No customers found matching "{searchQuery}"</p>
            <p className="text-sm text-gray-500 mt-2">Try searching with different keywords</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
