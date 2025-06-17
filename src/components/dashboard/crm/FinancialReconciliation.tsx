
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Euro, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  CreditCard,
  Banknote,
  TrendingUp
} from 'lucide-react';
import { useComprehensiveBookings } from '@/hooks/useComprehensiveBookings';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { DateRange } from 'react-day-picker';

export const FinancialReconciliation = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  
  const { bookings, loading, error } = useComprehensiveBookings();

  // Filter bookings based on search and date range
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = !searchTerm || 
      booking.guest_full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.locator?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = !dateRange?.from || 
      (new Date(booking.start_date) >= dateRange.from && 
       (!dateRange.to || new Date(booking.start_date) <= dateRange.to));

    return matchesSearch && matchesDate;
  });

  // Calculate financial metrics
  const outstandingBookings = filteredBookings.filter(b => b.outstanding_amount > 0);
  const totalOutstanding = outstandingBookings.reduce((sum, b) => sum + b.outstanding_amount, 0);
  const unsignedContracts = filteredBookings.filter(b => b.booking_status === 'confirmed' && !b.contract_signed);
  const upcomingPayments = filteredBookings.filter(b => {
    const charterDate = new Date(b.start_date);
    const daysToCharter = Math.ceil((charterDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return daysToCharter <= 7 && daysToCharter >= 0 && b.outstanding_amount > 0;
  });

  const getPaymentStatusColor = (booking: any) => {
    if (booking.outstanding_amount === 0) return 'bg-green-500 text-white';
    const daysToCharter = Math.ceil((new Date(booking.start_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (daysToCharter <= 3) return 'bg-red-500 text-white';
    if (daysToCharter <= 7) return 'bg-yellow-500 text-white';
    return 'bg-blue-500 text-white';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading financial data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zatara-navy">Financial Reconciliation</h1>
          <p className="text-zatara-blue">Track outstanding payments, contracts, and financial reconciliation</p>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Outstanding</p>
                <p className="text-2xl font-bold text-red-600">€{totalOutstanding.toLocaleString()}</p>
              </div>
              <Euro className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue Payments</p>
                <p className="text-2xl font-bold text-red-600">{outstandingBookings.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Payments</p>
                <p className="text-2xl font-bold text-yellow-600">{upcomingPayments.length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unsigned Contracts</p>
                <p className="text-2xl font-bold text-orange-600">{unsignedContracts.length}</p>
              </div>
              <FileText className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Search by guest name or locator..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <DateRangePicker
              date={dateRange}
              onDateChange={setDateRange}
              placeholder="Filter by charter date"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="outstanding" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="outstanding">Outstanding Payments</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming (7 days)</TabsTrigger>
          <TabsTrigger value="contracts">Contract Status</TabsTrigger>
          <TabsTrigger value="reconciliation">Daily Reconciliation</TabsTrigger>
        </TabsList>

        <TabsContent value="outstanding">
          <Card>
            <CardHeader>
              <CardTitle>Outstanding Payments ({outstandingBookings.length})</CardTitle>
              <CardDescription>
                Total outstanding: €{totalOutstanding.toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {outstandingBookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{booking.guest_full_name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>{booking.locator}</span>
                          <span>•</span>
                          <span>{new Date(booking.start_date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{booking.boat}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getPaymentStatusColor(booking)}>
                          €{booking.outstanding_amount.toLocaleString()} due
                        </Badge>
                        <div className="text-sm text-gray-600 mt-1">
                          Total: €{booking.charter_total.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Payments (Next 7 Days)</CardTitle>
              <CardDescription>
                Charters requiring payment before departure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingPayments.map((booking) => {
                  const daysToCharter = Math.ceil((new Date(booking.start_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  return (
                    <div key={booking.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{booking.guest_full_name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>{booking.locator}</span>
                            <span>•</span>
                            <span>In {daysToCharter} days</span>
                            <span>•</span>
                            <span>{booking.boat}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={daysToCharter <= 3 ? "destructive" : "secondary"}>
                            €{booking.outstanding_amount.toLocaleString()} due
                          </Badge>
                          <Button size="sm" className="ml-2">
                            Contact Guest
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts">
          <Card>
            <CardHeader>
              <CardTitle>Contract Status</CardTitle>
              <CardDescription>
                Track contract signing status for confirmed bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredBookings
                  .filter(b => b.booking_status === 'confirmed')
                  .map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{booking.guest_full_name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>{booking.locator}</span>
                            <span>•</span>
                            <span>{new Date(booking.start_date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={booking.contract_signed ? "default" : "destructive"}>
                            {booking.contract_signed ? (
                              <>
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Signed
                              </>
                            ) : (
                              <>
                                <FileText className="h-3 w-3 mr-1" />
                                Unsigned
                              </>
                            )}
                          </Badge>
                          {!booking.contract_signed && (
                            <Button size="sm">Send Contract</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reconciliation">
          <Card>
            <CardHeader>
              <CardTitle>Daily Reconciliation</CardTitle>
              <CardDescription>
                Track payment reconciliation for departure clearance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredBookings
                  .filter(b => {
                    const charterDate = new Date(b.start_date);
                    const today = new Date();
                    return charterDate.toDateString() === today.toDateString();
                  })
                  .map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{booking.guest_full_name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>{booking.locator}</span>
                            <span>•</span>
                            <span>Today's Charter</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-right mr-4">
                            <div className="text-sm">
                              <CreditCard className="inline h-3 w-3 mr-1" />
                              Card: €{(booking.paid_amount || 0).toLocaleString()}
                            </div>
                            <div className="text-sm">
                              <Banknote className="inline h-3 w-3 mr-1" />
                              Cash: €{(booking.cash_payment || 0).toLocaleString()}
                            </div>
                          </div>
                          <Badge variant={booking.outstanding_amount === 0 ? "default" : "destructive"}>
                            {booking.outstanding_amount === 0 ? "Reconciled" : "Pending"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
