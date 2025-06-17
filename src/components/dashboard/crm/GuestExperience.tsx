
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Calendar, Users, Heart, Utensils, MessageSquare, Phone, Mail } from 'lucide-react';
import { useCustomerData } from '@/hooks/useCustomerData';

const getSegmentColor = (segment: string) => {
  switch (segment?.toLowerCase()) {
    case 'vip': return 'bg-yellow-500 text-white';
    case 'premium': return 'bg-purple-500 text-white';
    case 'loyal': return 'bg-blue-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

const CustomerCard = ({ customer }: { customer: any }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg">{customer.full_name || 'Unknown Guest'}</CardTitle>
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
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-blue-600" />
          <span>{customer.total_bookings || 0} booking{(customer.total_bookings || 0) !== 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4 text-green-600" />
          <span>€{(customer.total_spent || 0).toLocaleString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-purple-600" />
          <span>{customer.preferred_boat || 'No preference'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="h-4 w-4 text-yellow-600" />
          <span>{customer.average_review_rating || 'N/A'}/5</span>
        </div>
      </div>

      {customer.special_requirements && customer.special_requirements.length > 0 && (
        <div className="pt-2 border-t">
          <p className="text-xs text-gray-500 mb-1">Special Requirements:</p>
          <div className="flex flex-wrap gap-1">
            {customer.special_requirements.map((req: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {req}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {customer.dietary_restrictions && customer.dietary_restrictions.length > 0 && (
        <div className="pt-2 border-t">
          <p className="text-xs text-gray-500 mb-1">Dietary Restrictions:</p>
          <div className="flex flex-wrap gap-1">
            {customer.dietary_restrictions.map((diet: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                <Utensils className="h-3 w-3 mr-1" />
                {diet}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {customer.vip_status && (
        <div className="pt-2 border-t">
          <Badge className="bg-yellow-500 text-white">
            <Heart className="h-3 w-3 mr-1" />
            VIP Guest
          </Badge>
        </div>
      )}

      <div className="pt-2 border-t flex space-x-2">
        <Button size="sm" variant="outline" className="flex-1">
          <MessageSquare className="h-3 w-3 mr-1" />
          WhatsApp
        </Button>
        <Button size="sm" variant="outline" className="flex-1">
          <Phone className="h-3 w-3 mr-1" />
          Call
        </Button>
      </div>
    </CardContent>
  </Card>
);

export const GuestExperience = () => {
  const { customers, loading, error, refetch } = useCustomerData();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading guest experiences...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-600 mb-4">Error loading guest data</div>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={refetch}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zatara-navy">Guest Experience</h1>
          <p className="text-zatara-blue">Enhance customer relationships and service quality</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={refetch} variant="outline">
            Refresh Data
          </Button>
          <Button>
            <MessageSquare className="h-4 w-4 mr-2" />
            Message All Guests
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers && customers.length > 0 ? (
          customers.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))
        ) : (
          <div className="col-span-full text-center p-8">
            <p className="text-gray-600">No customer data available</p>
            <p className="text-sm text-gray-500 mt-2">
              Customer profiles will appear here once booking data is properly synced
            </p>
            <Button onClick={refetch} className="mt-4">
              Sync Customer Data
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
