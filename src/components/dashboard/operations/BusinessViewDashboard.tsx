
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/SecureAuthContext';
import { ViewFilters } from './views/ViewFilters';
import { OperationsView } from './views/OperationsView';
import { FinanceView } from './views/FinanceView';
import { SkipperView } from './views/SkipperView';

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
      <ViewFilters
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
        boatFilter={boatFilter}
        setBoatFilter={setBoatFilter}
        onRefresh={fetchBusinessViews}
      />

      <Tabs defaultValue="operations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="zatara">Zatara</TabsTrigger>
          <TabsTrigger value="puravida">PuraVida</TabsTrigger>
        </TabsList>

        <TabsContent value="operations" className="space-y-4">
          <OperationsView data={operationsData} getStatusColor={getStatusColor} />
        </TabsContent>

        <TabsContent value="finance" className="space-y-4">
          <FinanceView data={financeData} getPaymentStatusColor={getPaymentStatusColor} />
        </TabsContent>

        <TabsContent value="zatara" className="space-y-4">
          <SkipperView 
            data={zataraData} 
            boatName="Zatara" 
            boatColor="blue" 
            getStatusColor={getStatusColor} 
          />
        </TabsContent>

        <TabsContent value="puravida" className="space-y-4">
          <SkipperView 
            data={puravidaData} 
            boatName="PuraVida" 
            boatColor="teal" 
            getStatusColor={getStatusColor} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
