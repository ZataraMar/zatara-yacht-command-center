
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Phone, MapPin, Euro, Anchor, AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/SecureAuthContext';

interface BusinessViewRow {
  locator: string;
  charter_date: string;
  guest_name: string;
  booking_source: string;
  start_time: string;
  end_time: string;
  boat: string;
  status: string;
  charter_total: number;
  fnb_details: string;
  crew_required: string;
  equipment_required: string;
  charter_notes: string;
  pre_departure_checks: boolean;
  cleared_for_departure: boolean;
  gps_coordinates: string;
  total_guests: number;
  paid_amount: number;
  outstanding_amount: number;
}

interface FinanceViewRow {
  locator: string;
  charter_date: string;
  guest_full_name: string;
  boat: string;
  booking_source: string;
  charter_total: number;
  outstanding_amount: number;
  payments_received: number;
  total_paid: number;
  balance_due: number;
  payment_status: string;
}

interface SkipperViewRow {
  locator: string;
  charter_date: string;
  guest_full_name: string;
  guest_phone: string;
  start_time: string;
  end_time: string;
  total_guests: number;
  booking_status: string;
  charter_notes: string;
  fnb_details: string;
  equipment_required: string;
  pre_departure_checks: boolean;
  cleared_for_departure: boolean;
  gps_coordinates: string;
}

export const BusinessViewDashboard = () => {
  const { profile } = useAuth();
  const [operationsData, setOperationsData] = useState<BusinessViewRow[]>([]);
  const [financeData, setFinanceData] = useState<FinanceViewRow[]>([]);
  const [zataraData, setZataraData] = useState<SkipperViewRow[]>([]);
  const [puravidaData, setPuravidaData] = useState<SkipperViewRow[]>([]);
  const [availableViews, setAvailableViews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('14');
  const [boatFilter, setBoatFilter] = useState('all');

  const fetchBusinessViews = async () => {
    try {
      setLoading(true);
      
      // Get available views for current user role
      const { data: views } = await supabase.rpc('get_available_views', {
        user_role: profile?.role || 'operations'
      });
      setAvailableViews(views || []);

      // Fetch operations view using dynamic filtering
      const { data: operationsResult } = await supabase.rpc('get_business_view', {
        view_name: 'operations',
        time_forward: parseInt(timeFilter),
        boat_filter: boatFilter,
        status_filter: 'booked_prebooked',
        user_role: profile?.role || 'operations'
      });

      // Direct queries for specific business views
      const [financeResult, zataraResult, puravidaResult] = await Promise.all([
        supabase.from('business_view_finance').select('*').order('charter_date'),
        supabase.from('business_view_zatara_skipper').select('*').order('charter_date'),
        supabase.from('business_view_puravida_skipper').select('*').order('charter_date')
      ]);

      setOperationsData(operationsResult || []);
      setFinanceData(financeResult.data || []);
      setZataraData(zataraResult.data || []);
      setPuravidaData(puravidaResult.data || []);

    } catch (error) {
      console.error('Error fetching business views:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessViews();
  }, [profile?.role, timeFilter, boatFilter]);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'bg-green-500 text-white';
      case 'pending': return 'bg-yellow-500 text-white';
      case 'cancelled': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'outstanding': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
      {/* Filters */}
      <div className="flex items-center space-x-4 bg-white p-4 rounded-lg border">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Time Range:</label>
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 days</SelectItem>
              <SelectItem value="14">14 days</SelectItem>
              <SelectItem value="30">30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Boats:</label>
          <Select value={boatFilter} onValueChange={setBoatFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Boats</SelectItem>
              <SelectItem value="zatara_only">Zatara Only</SelectItem>
              <SelectItem value="puravida_only">PuraVida Only</SelectItem>
              <SelectItem value="zatara_puravida">Both Boats</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={fetchBusinessViews} variant="outline" size="sm">
          Refresh Data
        </Button>
      </div>

      <Tabs defaultValue="operations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="zatara">Zatara</TabsTrigger>
          <TabsTrigger value="puravida">PuraVida</TabsTrigger>
        </TabsList>

        <TabsContent value="operations" className="space-y-4">
          <div className="grid gap-4">
            {operationsData.map((charter) => (
              <Card key={charter.locator} className="border-l-4 border-zatara-blue">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Anchor className="h-5 w-5 text-zatara-blue" />
                      <span>{charter.boat} - {charter.locator}</span>
                      <Badge className={getStatusColor(charter.status)}>
                        {charter.status}
                      </Badge>
                    </CardTitle>
                    <div className="text-right">
                      <div className="text-lg font-bold">€{charter.charter_total}</div>
                    </div>
                  </div>
                  <CardDescription>
                    {charter.guest_name} • {new Date(charter.charter_date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-zatara-navy">Schedule</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3" />
                        <span>{charter.start_time} - {charter.end_time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-3 w-3" />
                        <span>{charter.booking_source}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-zatara-navy">Operations</h4>
                    <div className="text-sm space-y-1">
                      {charter.crew_required && <div>👥 {charter.crew_required}</div>}
                      {charter.equipment_required && <div>🏄 {charter.equipment_required}</div>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-zatara-navy">F&B & Notes</h4>
                    <div className="text-sm space-y-1">
                      {charter.fnb_details && <div>🍽️ {charter.fnb_details}</div>}
                      {charter.charter_notes && <div>📝 {charter.charter_notes}</div>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="finance" className="space-y-4">
          <div className="grid gap-4">
            {financeData.map((charter) => (
              <Card key={charter.locator} className="border-l-4 border-green-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Euro className="h-5 w-5 text-green-600" />
                      <span>{charter.boat} - {charter.locator}</span>
                      <Badge className={getPaymentStatusColor(charter.payment_status)}>
                        {charter.payment_status}
                      </Badge>
                    </CardTitle>
                    <div className="text-right">
                      <div className="text-lg font-bold">€{charter.charter_total}</div>
                      <div className="text-sm text-gray-600">
                        Paid: €{charter.total_paid} | Due: €{charter.balance_due}
                      </div>
                    </div>
                  </div>
                  <CardDescription>
                    {charter.guest_full_name} • {new Date(charter.charter_date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Payments Received</div>
                      <div className="text-green-600">€{charter.payments_received}</div>
                    </div>
                    <div>
                      <div className="font-medium">Outstanding</div>
                      <div className="text-red-600">€{charter.outstanding_amount}</div>
                    </div>
                    <div>
                      <div className="font-medium">Source</div>
                      <div>{charter.booking_source}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="zatara" className="space-y-4">
          <div className="grid gap-4">
            {zataraData.map((charter) => (
              <Card key={charter.locator} className="border-l-4 border-blue-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Anchor className="h-5 w-5 text-blue-600" />
                      <span>Zatara - {charter.locator}</span>
                      <Badge className={getStatusColor(charter.booking_status)}>
                        {charter.booking_status}
                      </Badge>
                    </CardTitle>
                    <div className="flex space-x-2">
                      {charter.pre_departure_checks ? 
                        <CheckCircle2 className="h-5 w-5 text-green-500" /> : 
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      }
                      {charter.cleared_for_departure ? 
                        <CheckCircle2 className="h-5 w-5 text-green-500" /> : 
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      }
                    </div>
                  </div>
                  <CardDescription>
                    {charter.guest_full_name} • {new Date(charter.charter_date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3" />
                      <span>{charter.start_time} - {charter.end_time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-3 w-3" />
                      <span>{charter.total_guests} guests</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-3 w-3" />
                      <span>{charter.guest_phone}</span>
                    </div>
                  </div>
                  {charter.fnb_details && (
                    <div className="bg-blue-50 p-2 rounded text-sm">
                      <strong>F&B:</strong> {charter.fnb_details}
                    </div>
                  )}
                  {charter.charter_notes && (
                    <div className="bg-gray-50 p-2 rounded text-sm">
                      <strong>Notes:</strong> {charter.charter_notes}
                    </div>
                  )}
                  {charter.gps_coordinates && (
                    <div className="text-xs text-gray-600">
                      GPS: {charter.gps_coordinates}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="puravida" className="space-y-4">
          <div className="grid gap-4">
            {puravidaData.map((charter) => (
              <Card key={charter.locator} className="border-l-4 border-teal-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Anchor className="h-5 w-5 text-teal-600" />
                      <span>PuraVida - {charter.locator}</span>
                      <Badge className={getStatusColor(charter.booking_status)}>
                        {charter.booking_status}
                      </Badge>
                    </CardTitle>
                    <div className="flex space-x-2">
                      {charter.pre_departure_checks ? 
                        <CheckCircle2 className="h-5 w-5 text-green-500" /> : 
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      }
                      {charter.cleared_for_departure ? 
                        <CheckCircle2 className="h-5 w-5 text-green-500" /> : 
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      }
                    </div>
                  </div>
                  <CardDescription>
                    {charter.guest_full_name} • {new Date(charter.charter_date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3" />
                      <span>{charter.start_time} - {charter.end_time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-3 w-3" />
                      <span>{charter.total_guests} guests</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-3 w-3" />
                      <span>{charter.guest_phone}</span>
                    </div>
                  </div>
                  {charter.fnb_details && (
                    <div className="bg-teal-50 p-2 rounded text-sm">
                      <strong>F&B:</strong> {charter.fnb_details}
                    </div>
                  )}
                  {charter.charter_notes && (
                    <div className="bg-gray-50 p-2 rounded text-sm">
                      <strong>Notes:</strong> {charter.charter_notes}
                    </div>
                  )}
                  {charter.gps_coordinates && (
                    <div className="text-xs text-gray-600">
                      GPS: {charter.gps_coordinates}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
