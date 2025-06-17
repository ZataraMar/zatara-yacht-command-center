
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Ship, 
  Clock, 
  Users, 
  Euro, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  AlertCircle,
  Save,
  RefreshCw
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface OperationsInputProps {
  charter: {
    locator: string;
    guest_name: string;
    boat: string;
    charter_date: string;
    start_time: string;
    total_guests: number;
    charter_total: number;
  };
  onSave?: () => void;
}

export const EnhancedOperationsInput: React.FC<OperationsInputProps> = ({ charter, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [operationsData, setOperationsData] = useState({
    pre_departure_checks: false,
    cleared_for_departure: false,
    charter_notes: '',
    catering_details: '',
    water_toys: '',
    gps_coordinates: '',
    meeting_point: '',
    skipper_name: '',
    fuel_route: '',
    other_extras: '',
    extra_staff_count: 0
  });

  const [customerComms, setCustomerComms] = useState({
    client_messaging_status: 'pending',
    charter_overview_sent: false,
    whatsapp_sent: false,
    confirmation_sent: false
  });

  const handleOperationsUpdate = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('operations')
        .upsert({
          locator: charter.locator,
          ...operationsData
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Operations data updated successfully",
      });

      onSave?.();
    } catch (error) {
      console.error('Error updating operations:', error);
      toast({
        title: "Error",
        description: "Failed to update operations data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCommunicationsUpdate = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('customer_communications')
        .upsert({
          locator: charter.locator,
          ...customerComms
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Communication status updated successfully",
      });

      onSave?.();
    } catch (error) {
      console.error('Error updating communications:', error);
      toast({
        title: "Error",
        description: "Failed to update communication status",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Ship className="h-5 w-5 text-zatara-blue" />
          <span>Operations Input - {charter.locator}</span>
        </CardTitle>
        <CardDescription>
          Enhanced operations management for {charter.guest_name} on {charter.boat}
        </CardDescription>
        
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline" className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{new Date(charter.charter_date).toLocaleDateString()}</span>
          </Badge>
          <Badge variant="outline" className="flex items-center space-x-1">
            <Users className="h-3 w-3" />
            <span>{charter.total_guests} guests</span>
          </Badge>
          <Badge variant="outline" className="flex items-center space-x-1">
            <Euro className="h-3 w-3" />
            <span>€{charter.charter_total}</span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="operations" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="operations">Operations</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
            <TabsTrigger value="logistics">Logistics</TabsTrigger>
          </TabsList>

          <TabsContent value="operations" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pre-departure Status */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Pre-departure Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Pre-departure checks completed</label>
                    <Switch
                      checked={operationsData.pre_departure_checks}
                      onCheckedChange={(checked) => 
                        setOperationsData(prev => ({ ...prev, pre_departure_checks: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Cleared for departure</label>
                    <Switch
                      checked={operationsData.cleared_for_departure}
                      onCheckedChange={(checked) => 
                        setOperationsData(prev => ({ ...prev, cleared_for_departure: checked }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Crew & Logistics */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Crew & Logistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Skipper assigned</label>
                    <Input
                      value={operationsData.skipper_name}
                      onChange={(e) => 
                        setOperationsData(prev => ({ ...prev, skipper_name: e.target.value }))
                      }
                      placeholder="Enter skipper name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Extra staff count</label>
                    <Input
                      type="number"
                      value={operationsData.extra_staff_count}
                      onChange={(e) => 
                        setOperationsData(prev => ({ ...prev, extra_staff_count: parseInt(e.target.value) || 0 }))
                      }
                      min="0"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Separator />

            {/* Charter Notes */}
            <div>
              <label className="text-sm font-medium">Charter Notes</label>
              <Textarea
                value={operationsData.charter_notes}
                onChange={(e) => 
                  setOperationsData(prev => ({ ...prev, charter_notes: e.target.value }))
                }
                placeholder="Important notes about this charter..."
                rows={3}
              />
            </div>

            <Button onClick={handleOperationsUpdate} disabled={loading} className="w-full">
              {loading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              Save Operations Data
            </Button>
          </TabsContent>

          <TabsContent value="communications" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Communication Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Confirmation sent</label>
                    <Switch
                      checked={customerComms.confirmation_sent}
                      onCheckedChange={(checked) => 
                        setCustomerComms(prev => ({ ...prev, confirmation_sent: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Charter overview sent</label>
                    <Switch
                      checked={customerComms.charter_overview_sent}
                      onCheckedChange={(checked) => 
                        setCustomerComms(prev => ({ ...prev, charter_overview_sent: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">WhatsApp contact made</label>
                    <Switch
                      checked={customerComms.whatsapp_sent}
                      onCheckedChange={(checked) => 
                        setCustomerComms(prev => ({ ...prev, whatsapp_sent: checked }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Communication Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Phone className="h-3 w-3 mr-2" />
                    Call Customer
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <MapPin className="h-3 w-3 mr-2" />
                    Send GPS Coordinates
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Button onClick={handleCommunicationsUpdate} disabled={loading} className="w-full">
              {loading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              Update Communication Status
            </Button>
          </TabsContent>

          <TabsContent value="logistics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">F&B Details</label>
                <Textarea
                  value={operationsData.catering_details}
                  onChange={(e) => 
                    setOperationsData(prev => ({ ...prev, catering_details: e.target.value }))
                  }
                  placeholder="Catering requirements..."
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Water Toys & Equipment</label>
                <Textarea
                  value={operationsData.water_toys}
                  onChange={(e) => 
                    setOperationsData(prev => ({ ...prev, water_toys: e.target.value }))
                  }
                  placeholder="Requested equipment..."
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium">GPS Coordinates</label>
                <Input
                  value={operationsData.gps_coordinates}
                  onChange={(e) => 
                    setOperationsData(prev => ({ ...prev, gps_coordinates: e.target.value }))
                  }
                  placeholder="Meeting point coordinates"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Meeting Point</label>
                <Input
                  value={operationsData.meeting_point}
                  onChange={(e) => 
                    setOperationsData(prev => ({ ...prev, meeting_point: e.target.value }))
                  }
                  placeholder="Specific meeting location"
                />
              </div>
            </div>

            <Button onClick={handleOperationsUpdate} disabled={loading} className="w-full">
              {loading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              Save Logistics Data
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
