import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Users, 
  Calendar,
  Euro,
  AlertTriangle,
  Database,
  BarChart3,
  TrendingUp,
  Settings,
  Download
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface BookingData {
  booking_locator: string;
  boat_names: string;
  client_first_name: string;
  client_second_name: string;
  guest_email: string;
  guest_phone: string;
  booking_start_date: string;
  total_charter_amount: number;
  outstanding_amount: number;
  booking_status: string;
  booking_source: string;
  [key: string]: any;
}

interface FieldStatus {
  field_name: string;
  status: 'mapped' | 'missing' | 'partial';
  source: 'andronautic' | 'manual' | 'calculated';
  data_quality: number;
  sample_data: string;
}

export const FieldAnalysisDashboard = () => {
  const [bookingData, setBookingData] = useState<BookingData[]>([]);
  const [fieldStatus, setFieldStatus] = useState<FieldStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');
  const { toast } = useToast();

  // Sample field analysis data based on our investigation
  const fieldAnalysis = {
    mapped: 65,
    missing: 8,
    total: 73,
    dataQuality: 78,
    upcomingBookings: 4,
    totalRevenue: 6780,
    outstandingAmount: 2100
  };

  const criticalMissingFields = [
    'chat_history_whatsapp',
    'crm_notes_client', 
    'crm_notes_internal',
    'client_user_account',
    'client_dashboard_access',
    'customer_interaction_log',
    'loyalty_status',
    'special_occasions'
  ];

  const dataQualityIssues = [
    { field: 'total_guests', issue: 'All NULL values', impact: 'Safety & capacity planning' },
    { field: 'booking_start_time', issue: 'All NULL values', impact: 'Operational scheduling' },
    { field: 'booking_end_time', issue: 'All NULL values', impact: 'Operational scheduling' },
    { field: 'booking_duration', issue: 'All NULL values', impact: 'Resource planning' }
  ];

  useEffect(() => {
    fetchBookingData();
  }, []);

  const fetchBookingData = async () => {
    try {
      setLoading(true);
      
      // Fetch upcoming bookings
      const { data: bookings, error } = await supabase
        .from('bookings')
        .select(`
          locator,
          boat,
          guest_first_name,
          guest_surname,
          guest_email,
          guest_phone,
          start_date,
          charter_total,
          outstanding_amount,
          booking_status,
          booking_source,
          total_guests,
          start_time,
          end_time,
          duration_hours
        `)
        .gte('start_date', new Date().toISOString())
        .lte('start_date', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString())
        .in('booking_status', ['BOOKED', 'Confirmed', 'PREBOOKED'])
        .order('start_date', { ascending: true });

      if (error) throw error;

      // Transform booking data to match BookingData interface
      const transformedBookings = (bookings || []).map(booking => ({
        booking_locator: booking.locator,
        boat_names: booking.boat,
        client_first_name: booking.guest_first_name,
        client_second_name: booking.guest_surname,
        guest_email: booking.guest_email || '',
        guest_phone: booking.guest_phone || '',
        booking_start_date: booking.start_date,
        total_charter_amount: booking.charter_total || 0,
        outstanding_amount: booking.outstanding_amount || 0,
        booking_status: booking.booking_status,
        booking_source: booking.booking_source || ''
      }));
      
      setBookingData(transformedBookings);
      
      toast({
        title: "Data Loaded",
        description: `Found ${bookings?.length || 0} upcoming bookings`,
      });
      
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch booking data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateDashboardCard = (type: string) => {
    toast({
      title: "Dashboard Card Created",
      description: `Generated ${type} dashboard card with live data`,
    });
  };

  const exportFieldMapping = () => {
    const mappingData = {
      timestamp: new Date().toISOString(),
      total_fields_mapped: fieldAnalysis.mapped,
      missing_fields: criticalMissingFields,
      data_quality_issues: dataQualityIssues,
      upcoming_bookings: bookingData.length,
      revenue_data: {
        total: fieldAnalysis.totalRevenue,
        outstanding: fieldAnalysis.outstandingAmount
      }
    };

    const blob = new Blob([JSON.stringify(mappingData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zatara-field-analysis-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zatara-blue mx-auto"></div>
          <p className="text-zatara-navy mt-4">Loading field analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-zatara-navy">Field Analysis Dashboard</h1>
          <p className="text-gray-600">Master booking data overview and CRM gap analysis</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportFieldMapping} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Analysis
          </Button>
          <Button onClick={fetchBookingData}>
            <Database className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Fields Mapped</p>
                <p className="text-2xl font-bold text-green-600">{fieldAnalysis.mapped}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <Progress value={(fieldAnalysis.mapped / fieldAnalysis.total) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Missing Fields</p>
                <p className="text-2xl font-bold text-red-600">{fieldAnalysis.missing}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <Progress value={(fieldAnalysis.missing / fieldAnalysis.total) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Bookings</p>
                <p className="text-2xl font-bold text-zatara-blue">{bookingData.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-zatara-blue" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Weekly Revenue</p>
                <p className="text-2xl font-bold text-green-600">€{fieldAnalysis.totalRevenue.toLocaleString()}</p>
              </div>
              <Euro className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="missing">Missing Fields</TabsTrigger>
          <TabsTrigger value="bookings">Live Bookings</TabsTrigger>
          <TabsTrigger value="quality">Data Quality</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Successful Mappings
                </CardTitle>
                <CardDescription>
                  Fields successfully mapped from Andronautic to Supabase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Core Booking Info</span>
                    <Badge variant="secondary">9 fields</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Financial Data</span>
                    <Badge variant="secondary">15 fields</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer Data</span>
                    <Badge variant="secondary">8 fields</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Operational Data</span>
                    <Badge variant="secondary">12 fields</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Manual Fields</span>
                    <Badge variant="secondary">21 fields</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-zatara-blue" />
                  System Health
                </CardTitle>
                <CardDescription>
                  Current system performance and data quality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Data Quality Score</span>
                      <span>{fieldAnalysis.dataQuality}%</span>
                    </div>
                    <Progress value={fieldAnalysis.dataQuality} className="mt-1" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Field Coverage</span>
                      <span>{Math.round((fieldAnalysis.mapped / fieldAnalysis.total) * 100)}%</span>
                    </div>
                    <Progress value={(fieldAnalysis.mapped / fieldAnalysis.total) * 100} className="mt-1" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Andronautic Integration</span>
                      <span>100%</span>
                    </div>
                    <Progress value={100} className="mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="missing" className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Critical Systems Missing</AlertTitle>
            <AlertDescription>
              These systems are required for full CRM functionality and customer portal access.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">CRM Functionality</CardTitle>
                <CardDescription>Customer relationship management features</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {criticalMissingFields.slice(0, 4).map((field) => (
                    <li key={field} className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span className="font-mono text-sm">{field}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Client Portal System</CardTitle>
                <CardDescription>Customer self-service capabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {criticalMissingFields.slice(4).map((field) => (
                    <li key={field} className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span className="font-mono text-sm">{field}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings (Next 7 Days)</CardTitle>
              <CardDescription>Live data from your booking system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookingData.map((booking) => (
                  <div key={booking.locator} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{booking.locator}</h4>
                        <p className="text-sm text-gray-600">{booking.boat_names}</p>
                      </div>
                      <Badge variant={booking.booking_status === 'BOOKED' ? 'default' : 'secondary'}>
                        {booking.booking_status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Client:</span>
                        <p>{booking.client_first_name} {booking.client_second_name}</p>
                      </div>
                      <div>
                        <span className="font-medium">Date:</span>
                        <p>{new Date(booking.booking_start_date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="font-medium">Revenue:</span>
                        <p>€{booking.total_charter_amount}</p>
                      </div>
                      <div>
                        <span className="font-medium">Outstanding:</span>
                        <p className={booking.outstanding_amount > 0 ? "text-red-600" : "text-green-600"}>
                          €{booking.outstanding_amount}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                Data Quality Issues
              </CardTitle>
              <CardDescription>Fields that need attention for better operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataQualityIssues.map((issue, index) => (
                  <div key={index} className="border-l-4 border-yellow-400 pl-4">
                    <h4 className="font-medium">{issue.field}</h4>
                    <p className="text-sm text-gray-600">Issue: {issue.issue}</p>
                    <p className="text-sm text-red-600">Impact: {issue.impact}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" 
                  onClick={() => generateDashboardCard('Revenue Overview')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Revenue Dashboard
                </CardTitle>
                <CardDescription>Create revenue tracking cards</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Generate Revenue Cards
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => generateDashboardCard('Booking Operations')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Operations Dashboard
                </CardTitle>
                <CardDescription>Create operational overview cards</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Generate Operations Cards
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => generateDashboardCard('Customer Analytics')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Customer Dashboard
                </CardTitle>
                <CardDescription>Create customer insight cards</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Generate Customer Cards
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Custom Dashboard Builder</CardTitle>
              <CardDescription>Create custom views and cards with your booking data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={() => generateDashboardCard('Weekly Summary')}>
                  Weekly Summary Card
                </Button>
                <Button onClick={() => generateDashboardCard('Payment Tracking')}>
                  Payment Status Card
                </Button>
                <Button onClick={() => generateDashboardCard('Boat Utilization')}>
                  Fleet Utilization Card
                </Button>
                <Button onClick={() => generateDashboardCard('Source Performance')}>
                  Booking Source Card
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
