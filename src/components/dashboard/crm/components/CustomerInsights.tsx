
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, TrendingUp, Calendar, Phone, Mail, Users } from 'lucide-react';

interface Customer {
  customer_segment?: string;
  phone_primary?: string;
  total_bookings?: number;
  email_primary?: string;
  last_booking_date?: string;
  total_spent?: number;
  preferred_boat?: string;
  booking_frequency?: string;
  average_party_size?: number;
  cancellation_rate?: number;
}

interface CustomerInsightsProps {
  customer: Customer;
}

export const CustomerInsights = ({ customer }: CustomerInsightsProps) => {
  const getSegmentColor = (segment?: string) => {
    switch (segment?.toLowerCase()) {
      case 'vip': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'frequent': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'new': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    if ((customer.total_bookings || 0) >= 5) {
      recommendations.push({
        type: 'loyalty',
        title: 'Loyalty Program Eligible',
        description: 'Offer repeat customer discounts or exclusive experiences',
        priority: 'high',
        color: 'bg-blue-50 border-l-blue-400 text-blue-800'
      });
    }
    
    if (customer.customer_segment === 'VIP') {
      recommendations.push({
        type: 'vip',
        title: 'VIP Treatment Required',
        description: 'Ensure premium service, personal attention, and priority handling',
        priority: 'critical',
        color: 'bg-purple-50 border-l-purple-400 text-purple-800'
      });
    }
    
    if (!customer.email_primary) {
      recommendations.push({
        type: 'contact',
        title: 'Missing Email Contact',
        description: 'Collect email address for improved communication and marketing',
        priority: 'medium',
        color: 'bg-yellow-50 border-l-yellow-400 text-yellow-800'
      });
    }
    
    if ((customer.cancellation_rate || 0) > 0.2) {
      recommendations.push({
        type: 'retention',
        title: 'High Cancellation Risk',
        description: 'Consider flexible booking policies or proactive communication',
        priority: 'medium',
        color: 'bg-red-50 border-l-red-400 text-red-800'
      });
    }

    if ((customer.total_spent || 0) > 5000) {
      recommendations.push({
        type: 'upsell',
        title: 'High Value Customer',
        description: 'Offer premium packages, overnight charters, or exclusive experiences',
        priority: 'high',
        color: 'bg-green-50 border-l-green-400 text-green-800'
      });
    }

    return recommendations;
  };

  const recommendations = getRecommendations();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-zatara-blue" />
            <span>Customer Profile & Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-600">Customer Segment</div>
              <Badge className={getSegmentColor(customer.customer_segment)}>
                {customer.customer_segment || 'Standard'}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-600">Total Bookings</div>
              <div className="text-lg font-semibold text-zatara-navy">
                {customer.total_bookings || 0}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h4 className="font-medium mb-2 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                Booking Patterns
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Frequency:</span>
                  <span className="ml-2 font-medium">{customer.booking_frequency || 'Occasional'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Avg Party Size:</span>
                  <span className="ml-2 font-medium">{customer.average_party_size || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 flex items-center">
                <Users className="h-4 w-4 mr-2 text-green-500" />
                Preferences
              </h4>
              <div className="text-sm space-y-1">
                <div>
                  <span className="text-gray-600">Preferred Boat:</span>
                  <span className="ml-2 font-medium">{customer.preferred_boat || 'No preference'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Total Spent:</span>
                  <span className="ml-2 font-medium">€{(customer.total_spent || 0).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Communication Preferences</h4>
              <div className="flex space-x-2">
                {customer.phone_primary && (
                  <Badge variant="outline" className="text-xs">
                    <Phone className="h-3 w-3 mr-1" />
                    WhatsApp/Phone
                  </Badge>
                )}
                {customer.email_primary && (
                  <Badge variant="outline" className="text-xs">
                    <Mail className="h-3 w-3 mr-1" />
                    Email
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span>Recommendations & Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recommendations.length > 0 ? (
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${rec.color}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{rec.title}</p>
                      <p className="text-xs mt-1 opacity-80">{rec.description}</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        rec.priority === 'critical' ? 'border-red-300 text-red-700' :
                        rec.priority === 'high' ? 'border-orange-300 text-orange-700' :
                        'border-gray-300 text-gray-700'
                      }`}
                    >
                      {rec.priority}
                    </Badge>
                  </div>
                </div>
              ))}
              
              <div className="mt-4 pt-4 border-t">
                <Button className="w-full bg-zatara-blue hover:bg-zatara-navy">
                  Create Action Plan
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">
                No specific recommendations available yet.
              </p>
              <p className="text-gray-400 text-xs mt-2">
                More insights will appear as customer data grows.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
