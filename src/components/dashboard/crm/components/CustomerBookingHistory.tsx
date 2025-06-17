
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { History, Calendar } from 'lucide-react';

interface CustomerHistory {
  id: number;
  customer_id: number;
  booking_locator: string;
  booking_date: string;
  boat_used: string;
  guests_count: number;
  total_value: number;
  booking_source: string;
  seasonal_period: string;
  repeat_booking: boolean;
}

interface CustomerBookingHistoryProps {
  customerHistory: CustomerHistory[];
}

export const CustomerBookingHistory = ({ customerHistory }: CustomerBookingHistoryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <History className="h-5 w-5" />
          <span>Booking History</span>
        </CardTitle>
        <CardDescription>
          Complete history of customer charter bookings
        </CardDescription>
      </CardHeader>
      <CardContent>
        {customerHistory.length > 0 ? (
          <div className="space-y-4">
            {customerHistory.map((booking, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-zatara-blue rounded-full flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">{booking.booking_locator}</h4>
                      <p className="text-sm text-gray-600">
                        {booking.boat_used} • {booking.guests_count} guests • {booking.seasonal_period}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(booking.booking_date).toLocaleDateString()} • {booking.booking_source}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">€{booking.total_value.toLocaleString()}</p>
                    {booking.repeat_booking && (
                      <Badge className="bg-blue-100 text-blue-800 text-xs">Repeat</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <History className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No booking history found</p>
            <p className="text-sm">This customer may be new or have incomplete data</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
