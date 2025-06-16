
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  Star, 
  Heart, 
  MessageCircle, 
  Calendar, 
  Mail,
  Phone,
  MapPin,
  Gift,
  Search,
  Plus,
  Filter
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Guest {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  nationality: string;
  total_charters: number;
  total_spent: number;
  last_charter: string;
  favorite_boat: string;
  satisfaction_rating: number;
  special_requests: string[];
  dietary_requirements: string;
  vip_status: boolean;
}

export const GuestExperience = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const { data: bookings, error } = await supabase
        .from('bookings')
        .select('*')
        .not('guest_email', 'is', null);

      if (error) throw error;

      // Process bookings into guest profiles
      const guestMap = new Map();
      
      bookings?.forEach(booking => {
        const key = booking.guest_email;
        if (!guestMap.has(key)) {
          guestMap.set(key, {
            id: key,
            first_name: booking.guest_first_name || 'Unknown',
            last_name: booking.guest_surname || '',
            email: booking.guest_email,
            phone: booking.guest_phone || '',
            nationality: booking.nationality || '',
            total_charters: 0,
            total_spent: 0,
            last_charter: '',
            favorite_boat: '',
            satisfaction_rating: 4.5,
            special_requests: [],
            dietary_requirements: booking.health_allergies || '',
            vip_status: false
          });
        }

        const guest = guestMap.get(key);
        guest.total_charters += 1;
        guest.total_spent += booking.charter_total || 0;
        
        if (!guest.last_charter || booking.start_date > guest.last_charter) {
          guest.last_charter = booking.start_date;
          guest.favorite_boat = booking.boat;
        }

        if (guest.total_spent > 10000) {
          guest.vip_status = true;
        }
      });

      setGuests(Array.from(guestMap.values()));
    } catch (error) {
      console.error('Error fetching guests:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredGuests = guests.filter(guest =>
    `${guest.first_name} ${guest.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  const getVIPBadge = (guest: Guest) => {
    if (guest.vip_status) {
      return <Badge className="bg-gold-500 text-white">VIP</Badge>;
    }
    if (guest.total_charters >= 3) {
      return <Badge className="bg-blue-500 text-white">Loyal</Badge>;
    }
    return <Badge variant="outline">Regular</Badge>;
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zatara-navy">Guest Experience & CRM</h2>
          <p className="text-zatara-blue">Manage guest relationships and experiences</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Guest
        </Button>
      </div>

      {/* CRM Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Guests</p>
                <p className="text-2xl font-bold text-zatara-navy">{guests.length}</p>
              </div>
              <Users className="h-8 w-8 text-zatara-blue" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">VIP Guests</p>
                <p className="text-2xl font-bold text-zatara-navy">
                  {guests.filter(g => g.vip_status).length}
                </p>
              </div>
              <Star className="h-8 w-8 text-gold-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Repeat Guests</p>
                <p className="text-2xl font-bold text-zatara-navy">
                  {guests.filter(g => g.total_charters > 1).length}
                </p>
              </div>
              <Heart className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Satisfaction</p>
                <p className="text-2xl font-bold text-zatara-navy">4.8</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="guests" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="guests">Guest Directory</TabsTrigger>
          <TabsTrigger value="feedback">Feedback & Reviews</TabsTrigger>
          <TabsTrigger value="loyalty">Loyalty Program</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
        </TabsList>

        <TabsContent value="guests" className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search guests by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Guest Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuests.map((guest) => (
              <Card key={guest.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedGuest(guest)}>
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarFallback>
                        {getInitials(guest.first_name, guest.last_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">
                        {guest.first_name} {guest.last_name}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        {getVIPBadge(guest)}
                        <Badge variant="outline" className="text-xs">
                          {guest.total_charters} charter{guest.total_charters !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="truncate">{guest.email}</span>
                    </div>
                    {guest.phone && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{guest.phone}</span>
                      </div>
                    )}
                    {guest.nationality && (
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{guest.nationality}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm font-medium">Total Spent:</span>
                      <span className="text-sm font-bold text-green-600">
                        {formatCurrency(guest.total_spent)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Last Charter:</span>
                      <span className="text-sm">
                        {guest.last_charter ? new Date(guest.last_charter).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 pt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= guest.satisfaction_rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">
                        {guest.satisfaction_rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Guest Feedback & Reviews</CardTitle>
              <CardDescription>Customer satisfaction and review management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center text-gray-500 py-8">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Feedback collection system will be integrated here</p>
                  <p className="text-sm">Connect with review platforms and feedback forms</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loyalty" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Loyalty Program</CardTitle>
              <CardDescription>Reward repeat customers and build loyalty</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center text-gray-500 py-8">
                  <Gift className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Loyalty program management will be integrated here</p>
                  <p className="text-sm">Points, rewards, and special offers for repeat guests</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Guest Communications</CardTitle>
              <CardDescription>Manage communications and marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center text-gray-500 py-8">
                  <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Communication management system will be integrated here</p>
                  <p className="text-sm">Email campaigns, newsletters, and personalized messaging</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Guest Detail Modal would go here */}
      {selectedGuest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold">
                  {selectedGuest.first_name} {selectedGuest.last_name}
                </h3>
                <div className="flex items-center space-x-2 mt-2">
                  {getVIPBadge(selectedGuest)}
                </div>
              </div>
              <Button variant="outline" onClick={() => setSelectedGuest(null)}>
                Close
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-sm text-gray-600">{selectedGuest.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <p className="text-sm text-gray-600">{selectedGuest.phone || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Nationality</label>
                  <p className="text-sm text-gray-600">{selectedGuest.nationality || 'Not specified'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Total Charters</label>
                  <p className="text-sm text-gray-600">{selectedGuest.total_charters}</p>
                </div>
              </div>
              
              {selectedGuest.dietary_requirements && (
                <div>
                  <label className="text-sm font-medium">Dietary Requirements</label>
                  <p className="text-sm text-gray-600">{selectedGuest.dietary_requirements}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
