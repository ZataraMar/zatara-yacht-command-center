
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, Users } from 'lucide-react';

interface SchedulingDialogProps {
  boatName: string;
  children: React.ReactNode;
}

export const SchedulingDialog = ({ boatName, children }: SchedulingDialogProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Mock upcoming bookings
  const upcomingBookings = [
    { time: '09:00', duration: '4h', guests: 6, status: 'confirmed' },
    { time: '14:00', duration: '6h', guests: 8, status: 'pending' },
  ];

  const availableSlots = [
    { time: '08:00', duration: '4h', available: true },
    { time: '10:00', duration: '6h', available: false },
    { time: '14:00', duration: '4h', available: true },
    { time: '18:00', duration: '3h', available: true },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5" />
            <span>Schedule Charter - {boatName}</span>
          </DialogTitle>
          <DialogDescription>
            View and manage charter scheduling for {boatName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Calendar Selection */}
          <div>
            <h3 className="text-lg font-medium mb-4">Select Date</h3>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>
          
          {/* Schedule View */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-4">
                Schedule for {date?.toLocaleDateString()}
              </h3>
              
              {/* Current Bookings */}
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle className="text-sm">Current Bookings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {upcomingBookings.map((booking, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium">{booking.time}</span>
                        <span className="text-sm text-gray-600">({booking.duration})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span className="text-xs">{booking.guests}</span>
                        </div>
                        <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              {/* Available Slots */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Available Slots</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {availableSlots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSlot(slot.time)}
                      disabled={!slot.available}
                      className={`w-full p-2 rounded text-left transition-colors ${
                        slot.available
                          ? selectedSlot === slot.time
                            ? 'bg-zatara-blue text-white'
                            : 'bg-green-50 hover:bg-green-100'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{slot.time}</span>
                        <span className="text-sm">({slot.duration})</span>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                className="flex-1" 
                disabled={!selectedSlot}
              >
                Book Slot
              </Button>
              <Button variant="outline" className="flex-1">
                Block Time
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
