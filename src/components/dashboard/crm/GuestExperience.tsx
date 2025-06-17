
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Calendar, Users, Heart, Utensils } from 'lucide-react';
import { useRealTimeBookings } from '@/hooks/useRealTimeBookings';

interface Guest {
  id: number;
  full_name: string;
  first_name: string;
  last_name: string;
  email_primary: string;
  phone_primary: string;
  total_bookings: number;
  total_spent: number;
  customer_lifetime_value: number;
  last_booking_date: string;
  customer_segment: string;
  preferred_boat?: string;
  average_review_rating?: number;
  special_requirements?: string[];
  dietary_restrictions?: string[];
  vip_status?: boolean;
}

export const GuestExperience = () => {
  const { bookings, loading, error } = useRealTimeBookings();

  // Transform booking data into guest data
  const transformBookingToGuest = (booking: any): Guest => {
    return {
      id: booking.id,
      full_name: `${booking.guest_first_name || ''} ${booking.guest_surname || ''}`.trim(),
      first_name: booking.guest_first_name || '',
      last_name: booking.guest_surname || '',
      email_primary: booking.guest_email || '',
      phone_primary: booking.guest_phone || '',
      total_bookings: 1,
      total_spent: booking.charter_total || 0,
      customer_lifetime_value: booking.charter_total || 0,
      last_booking_date: booking.start_date || '',
      customer_segment: 'standard',
      preferred_boat: booking.boat || '',
      average_review_rating: 4.5,
      special_requirements: [],
      dietary_restrictions: [],
      vip_status: false
    };
  };

  const guests = bookings.map(transformBookingToGuest);

  const getSegmentColor = (segment: string) => {
    switch (segment?.toLowerCase()) {
      case 'vip': return 'bg-yellow-500 text-white';
      case 'premium': return 'bg-purple-500 text-white';
      case 'loyal': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const GuestCard = ({ guest }: { guest: Guest }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{guest.full_name}</CardTitle>
          <Badge className={getSegmentColor(guest.customer_segment)}>
            {guest.customer_segment}
          </Badge>
        </div>
        <CardDescription>
          {guest.email_primary} • {guest.phone_primary}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            <span>{guest.total_bookings} booking{guest.total_bookings !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-green-600" />
            <span>€{guest.total_spent.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-purple-600" />
            <span>{guest.preferred_boat || 'No preference'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-yellow-600" />
            <span>{guest.average_review_rating || 'N/A'}/5</span>
          </div>
        </div>

        {guest.special_requirements && guest.special_requirements.length > 0 && (
          <div className="pt-2 border-t">
            <p className="text-xs text-gray-500 mb-1">Special Requirements:</p>
            <div className="flex flex-wrap gap-1">
              {guest.special_requirements.map((req, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {req}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {guest.dietary_restrictions && guest.dietary_restrictions.length > 0 && (
          <div className="pt-2 border-t">
            <p className="text-xs text-gray-500 mb-1">Dietary Restrictions:</p>
            <div className="flex flex-wrap gap-1">
              {guest.dietary_restrictions.map((diet, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  <Utensils className="h-3 w-3 mr-1" />
                  {diet}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {guest.vip_status && (
          <div className="pt-2 border-t">
            <Badge className="bg-yellow-500 text-white">
              <Heart className="h-3 w-3 mr-1" />
              VIP Guest
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );

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
        <p className="text-gray-600">{error}</p>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guests.length > 0 ? (
          guests.map((guest) => (
            <GuestCard key={guest.id} guest={guest} />
          ))
        ) : (
          <div className="col-span-full text-center p-8">
            <p className="text-gray-600">No guest data available</p>
            <p className="text-sm text-gray-500 mt-2">Guest profiles will appear here once booking data is available</p>
          </div>
        )}
      </div>
    </div>
  );
};
