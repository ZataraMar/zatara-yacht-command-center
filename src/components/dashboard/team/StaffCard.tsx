
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Mail, Phone, Clock, Calendar } from 'lucide-react';
import { StaffMember } from '@/types/staff';
import { getRoleColor, getInitials } from '@/utils/staffUtils';

interface StaffCardProps {
  member: StaffMember;
}

export const StaffCard: React.FC<StaffCardProps> = ({ member }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
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
  );
};
