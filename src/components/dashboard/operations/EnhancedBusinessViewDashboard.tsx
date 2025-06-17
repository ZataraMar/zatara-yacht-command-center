import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, BarChart3, Users, DollarSign } from 'lucide-react';
import { EnhancedViewFilters } from './views/EnhancedViewFilters';
import { OperationsView } from './views/OperationsView';
import { FinanceView } from './views/FinanceView';
import { SkipperView } from './views/SkipperView';
import { WhatsAppGenerator } from '../communications/WhatsAppGenerator';
import { EnhancedOperationsInput } from './views/EnhancedOperationsInput';
import { useRealTimeBookings } from '@/hooks/useRealTimeBookings';
import { getStatusColor, getPaymentStatusColor } from './utils/statusColors';
import { BusinessViewRow, FinanceViewRow, SkipperViewRow } from './types/businessViewTypes';

export const EnhancedBusinessViewDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('14');
  const [boatFilter, setBoatFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('operations');
  const [selectedCharter, setSelectedCharter] = useState<any>(null);

  const { bookings, loading, error, refetch } = useRealTimeBookings();

  console.log('Raw bookings data:', bookings?.slice(0, 3)); // Debug log

  // Filter bookings based on current filters
  const filteredBookings = React.useMemo(() => {
    if (!bookings) return [];

    console.log('Starting filter with bookings:', bookings.length);

    let filtered = [...bookings];

    // Apply time filter - more flexible date range with backwards/forwards capability
    const daysRange = parseInt(timeFilter);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let startDate: Date;
    let endDate: Date;
    
    if (daysRange === 1) {
      // Today only
      startDate = new Date(today);
      endDate = new Date(today);
      endDate.setDate(today.getDate() + 1);
    } else {
      // Range that includes past and future
      startDate = new Date(today);
      startDate.setDate(today.getDate() - Math.floor(daysRange / 2));
      
      endDate = new Date(today);
      endDate.setDate(today.getDate() + Math.ceil(daysRange / 2));
    }
    
    filtered = filtered.filter(booking => {
      if (!booking.start_date) return false;
      const bookingDate = new Date(booking.start_date);
      bookingDate.setHours(0, 0, 0, 0);
      return bookingDate >= startDate && bookingDate <= endDate;
    });

    console.log('After time filter:', filtered.length);

    // Apply boat filter
    if (boatFilter !== 'all') {
      switch (boatFilter) {
        case 'zatara_only':
          filtered = filtered.filter(b => b.boat?.toLowerCase().includes('zatara'));
          break;
        case 'puravida_only':
          filtered = filtered.filter(b => b.boat?.toLowerCase().includes('puravida') || b.boat?.toLowerCase().includes('pura vida'));
          break;
        case 'zatara_puravida':
          filtered = filtered.filter(b => 
            b.boat?.toLowerCase().includes('zatara') || 
            b.boat?.toLowerCase().includes('puravida') || 
            b.boat?.toLowerCase().includes('pura vida')
          );
          break;
      }
    }

    console.log('After boat filter:', filtered.length);

    // Apply status filter - improved status mapping
    if (statusFilter !== 'all') {
      switch (statusFilter) {
        case 'booked_prebooked':
          filtered = filtered.filter(b => {
            const status = b.booking_status?.toLowerCase() || '';
            return ['confirmed', 'booked', 'prebooked', 'confirmed', 'active'].includes(status) ||
                   status.includes('confirm') || status.includes('book') || status.includes('active');
          });
          break;
        case 'option_request':
          filtered = filtered.filter(b => {
            const status = b.booking_status?.toLowerCase() || '';
            return status.includes('option') || status.includes('request') || status.includes('pending');
          });
          break;
        case 'cancelled':
          filtered = filtered.filter(b => {
            const status = b.booking_status?.toLowerCase() || '';
            return status.includes('cancel') || status.includes('declined');
          });
          break;
      }
    }

    console.log('After status filter:', filtered.length);
    console.log('Final filtered bookings:', filtered.map(b => ({
      locator: b.locator,
      status: b.booking_status,
      boat: b.boat,
      guest: `${b.guest_first_name} ${b.guest_surname}`,
      date: b.start_date
    })));

    return filtered;
  }, [bookings, timeFilter, boatFilter, statusFilter]);

  // Transform bookings to operations view format
  const transformedData: BusinessViewRow[] = React.useMemo(() => {
    return filteredBookings.map(booking => ({
      locator: booking.locator,
      charter_date: booking.start_date ? new Date(booking.start_date).toISOString().split('T')[0] : '',
      guest_name: `${booking.guest_first_name || ''} ${booking.guest_surname || ''}`.trim(),
      booking_source: booking.booking_source || '',
      start_time: booking.start_date ? new Date(booking.start_date).toTimeString().split(' ')[0] : '',
      end_time: booking.end_date ? new Date(booking.end_date).toTimeString().split(' ')[0] : '',
      boat: booking.boat || '',
      status: booking.booking_status || '',
      charter_total: booking.charter_total || 0,
      fnb_details: '',
      crew_required: 'Standard crew',
      equipment_required: '',
      charter_notes: booking.booking_notes || '',
      pre_departure_checks: false,
      cleared_for_departure: false,
      gps_coordinates: '',
      total_guests: booking.total_guests || 1,
      paid_amount: booking.paid_amount || 0,
      outstanding_amount: booking.outstanding_amount || 0
    }));
  }, [filteredBookings]);

  // Transform bookings to finance view format
  const financeData: FinanceViewRow[] = React.useMemo(() => {
    return filteredBookings.map(booking => ({
      locator: booking.locator,
      charter_date: booking.start_date ? new Date(booking.start_date).toISOString().split('T')[0] : '',
      guest_full_name: `${booking.guest_first_name || ''} ${booking.guest_surname || ''}`.trim(),
      boat: booking.boat || '',
      booking_source: booking.booking_source || '',
      charter_total: booking.charter_total || 0,
      outstanding_amount: booking.outstanding_amount || 0,
      payments_received: booking.paid_amount || 0,
      total_paid: booking.paid_amount || 0,
      balance_due: booking.outstanding_amount || 0,
      payment_status: booking.outstanding_amount > 0 ? 'partial' : 'paid'
    }));
  }, [filteredBookings]);

  // Transform bookings to skipper view format
  const skipperData: SkipperViewRow[] = React.useMemo(() => {
    return filteredBookings.map(booking => ({
      locator: booking.locator,
      charter_date: booking.start_date ? new Date(booking.start_date).toISOString().split('T')[0] : '',
      guest_full_name: `${booking.guest_first_name || ''} ${booking.guest_surname || ''}`.trim(),
      guest_phone: booking.guest_phone || '',
      start_time: booking.start_date ? new Date(booking.start_date).toTimeString().split(' ')[0] : '',
      end_time: booking.end_date ? new Date(booking.end_date).toTimeString().split(' ')[0] : '',
      total_guests: booking.total_guests || 1,
      booking_status: booking.booking_status || '',
      charter_notes: booking.booking_notes || '',
      fnb_details: '',
      equipment_required: '',
      pre_departure_checks: false,
      cleared_for_departure: false,
      gps_coordinates: '',
      boat: booking.boat || ''
    }));
  }, [filteredBookings]);

  const availableViews = [
    { 
      view_name: 'operations', 
      display_name: '🔧 Operations', 
      view_type: 'operations',
      description: 'Operations management' 
    },
    { 
      view_name: 'finance', 
      display_name: '💰 Finance', 
      view_type: 'finance',
      description: 'Financial tracking' 
    },
    { 
      view_name: 'zatara', 
      display_name: '⛵ Zatara', 
      view_type: 'skipper',
      description: 'Zatara operations' 
    },
    { 
      view_name: 'puravida', 
      display_name: '🚤 PuraVida', 
      view_type: 'skipper',
      description: 'PuraVida operations' 
    }
  ];

  const getViewTitle = () => {
    const view = availableViews.find(v => v.view_name === viewMode);
    return view?.display_name || '📊 Business Dashboard';
  };

  const getViewDescription = () => {
    const view = availableViews.find(v => v.view_name === viewMode);
    return view?.description || 'Charter business intelligence';
  };

  const renderMetrics = () => {
    if (!transformedData.length) return null;

    const totalRevenue = transformedData.reduce((sum, item) => sum + (item.charter_total || 0), 0);
    const totalCharters = transformedData.length;
    const avgCharterValue = totalRevenue / totalCharters;

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Charters</p>
                <p className="text-2xl font-bold text-zatara-navy">{totalCharters}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-zatara-navy">€{totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Charter Value</p>
                <p className="text-2xl font-bold text-zatara-navy">€{avgCharterValue.toFixed(0)}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderViewContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue"></div>
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      );
    }

    if (!transformedData.length) {
      return (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No charters found for the selected filters.</p>
            <p className="text-sm text-gray-400 mt-2">
              Try adjusting your time range or boat filters to see more results.
            </p>
          </CardContent>
        </Card>
      );
    }

    switch (viewMode) {
      case 'operations':
        return (
          <OperationsView 
            data={transformedData} 
            getStatusColor={getStatusColor}
            onCharterSelect={setSelectedCharter}
          />
        );
      case 'finance':
        return (
          <FinanceView 
            data={financeData} 
            getPaymentStatusColor={getPaymentStatusColor}
            onCharterSelect={setSelectedCharter}
          />
        );
      case 'zatara':
        return (
          <SkipperView 
            data={skipperData.filter(d => d.boat?.toLowerCase().includes('zatara'))} 
            boatName="Zatara" 
            boatColor="blue" 
            getStatusColor={getStatusColor}
            onCharterSelect={setSelectedCharter}
          />
        );
      case 'puravida':
        return (
          <SkipperView 
            data={skipperData.filter(d => 
              d.boat?.toLowerCase().includes('puravida') || 
              d.boat?.toLowerCase().includes('pura vida')
            )} 
            boatName="PuraVida" 
            boatColor="teal" 
            getStatusColor={getStatusColor}
            onCharterSelect={setSelectedCharter}
          />
        );
      default:
        return <div>View not implemented</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zatara-navy">{getViewTitle()}</h1>
          <p className="text-zatara-blue">{getViewDescription()}</p>
        </div>
      </div>

      <EnhancedViewFilters
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
        boatFilter={boatFilter}
        setBoatFilter={setBoatFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
        availableViews={availableViews}
        onRefresh={refetch}
        loading={loading}
        resultCount={transformedData.length}
      />

      {renderMetrics()}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          {renderViewContent()}
        </div>
        
        <div className="space-y-6">
          {selectedCharter && (
            <>
              <WhatsAppGenerator charter={selectedCharter} />
              <EnhancedOperationsInput 
                charter={selectedCharter}
                onSave={() => refetch()}
              />
            </>
          )}
          
          {!selectedCharter && (
            <Card>
              <CardHeader>
                <CardTitle>Charter Tools</CardTitle>
                <CardDescription>
                  Select a charter from the list to access enhanced management tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 text-center py-8">
                  Click on any charter to get started with WhatsApp generator and operations input
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
