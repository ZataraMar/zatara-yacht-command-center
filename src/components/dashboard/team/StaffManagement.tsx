
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarInitials } from '@/components/ui/avatar';
import { 
  Users, 
  Phone, 
  Mail, 
  Calendar, 
  Award, 
  Clock,
  MapPin,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/SecureAuthContext';

interface StaffMember {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
  certifications: string[];
  boat_access: string[];
  emergency_contact: string;
  active: boolean;
  last_shift: string;
  hours_this_week: number;
}

export const StaffManagement = () => {
  const { profile } = useAuth();
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('active', true);

      if (error) throw error;

      // Mock additional data for demonstration
      const enrichedStaff = data?.map(member => ({
        ...member,
        last_shift: '2024-06-15',
        hours_this_week: Math.floor(Math.random() * 40) + 10,
        certifications: member.certifications || [],
        boat_access: member.boat_access || []
      })) || [];

      setStaff(enrichedStaff);
    } catch (error) {
      console.error('Error fetching staff:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStaff = staff.filter(member => {
    const matchesSearch = `${member.first_name} ${member.last_name}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'management':
        return 'bg-purple-500';
      case 'owners':
        return 'bg-gold-500';
      case 'skippers':
        return 'bg-blue-500';
      case 'staff':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
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
          <h2 className="text-2xl font-bold text-zatara-navy">Staff Management</h2>
          <p className="text-zatara-blue">Manage team members and assignments</p>
        </div>
        {(profile?.role === 'management' || profile?.role === 'owners') && (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Staff Member
          </Button>
        )}
      </div>

      {/* Staff Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Staff</p>
                <p className="text-2xl font-bold text-zatara-navy">{staff.length}</p>
              </div>
              <Users className="h-8 w-8 text-zatara-blue" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Skippers</p>
                <p className="text-2xl font-bold text-zatara-navy">
                  {staff.filter(s => s.role === 'skippers').length}
                </p>
              </div>
              <Award className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">On Duty Today</p>
                <p className="text-2xl font-bold text-zatara-navy">6</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Hours/Week</p>
                <p className="text-2xl font-bold text-zatara-navy">32</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search staff members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="all">All Roles</option>
          <option value="management">Management</option>
          <option value="skippers">Skippers</option>
          <option value="staff">Staff</option>
          <option value="owners">Owners</option>
        </select>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarFallback>
                    {getInitials(member.first_name, member.last_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">
                    {member.first_name} {member.last_name}
                  </CardTitle>
                  <Badge className={`${getRoleColor(member.role)} text-white mt-1`}>
                    {member.role.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  <TabsTrigger value="certs">Certs</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{member.phone || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{member.hours_this_week}h this week</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="schedule" className="space-y-3">
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Shift</span>
                      <span>{member.last_shift}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Next Shift</span>
                      <span>Tomorrow 09:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status</span>
                      <Badge variant="outline" className="text-green-600">Available</Badge>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="certs" className="space-y-3">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Certifications:</p>
                    {member.certifications.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {member.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No certifications on file</p>
                    )}
                    
                    <p className="text-sm font-medium mt-3">Boat Access:</p>
                    {member.boat_access.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {member.boat_access.map((boat, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-blue-50">
                            {boat}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No boat access assigned</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-4 flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
