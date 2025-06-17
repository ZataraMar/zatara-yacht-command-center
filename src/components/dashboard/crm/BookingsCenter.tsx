
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Calendar, Users, Euro, BarChart3, Download, X } from 'lucide-react';
import { useComprehensiveBookings } from '@/hooks/useComprehensiveBookings';
import { getBookingStatusColor } from './utils/badgeUtils';
import { MultiSelect } from '@/components/ui/multi-select';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { DateRange } from 'react-day-picker';

export const BookingsCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedBoats, setSelectedBoats] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [activeView, setActiveView] = useState('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // Build filter object for the hook
  const filters = useMemo(() => ({
    startDate: dateRange?.from?.toISOString(),
    endDate: dateRange?.to?.toISOString(),
    boats: selectedBoats.length > 0 ? selectedBoats : undefined,
    sources: selectedSources.length > 0 ? selectedSources : undefined,
    statuses: selectedStatuses.length > 0 ? selectedStatuses : undefined,
    years: selectedYears.length > 0 ? selectedYears.map(y => parseInt(y)) : undefined,
    limit: 1000
  }), [dateRange, selectedBoats, selectedSources, selectedStatuses, selectedYears]);

  const { bookings, loading, error, refetch } = useComprehensiveBookings();

  // Apply filters when they change
  React.useEffect(() => {
    refetch(filters);
  }, [filters, refetch]);

  // Get unique values for filter options
  const filterOptions = useMemo(() => {
    if (!bookings.length) return { years: [], boats: [], sources: [], statuses: [] };

    return {
      years: [...new Set(bookings.map(b => b.booking_year))].sort((a, b) => b - a),
      boats: [...new Set(bookings.map(b => b.boat))].filter(Boolean),
      sources: [...new Set(bookings.map(b => b.booking_source))].filter(Boolean),
      statuses: [...new Set(bookings.map(b => b.booking_status))].filter(Boolean)
    };
  }, [bookings]);

  // Filter bookings based on current filters (for search and view)
  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      const matchesSearch = !searchTerm || 
        booking.guest_full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.locator?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.guest_phone?.includes(searchTerm) ||
        booking.guest_email?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesView = activeView === 'all' || 
        (activeView === 'historical' && booking.data_period.includes('historical')) ||
        (activeView === 'current' && booking.data_period === 'current');
      
      return matchesSearch && matchesView;
    });
  }, [bookings, searchTerm, activeView]);

  // Calculate summary statistics
  const stats = useMemo(() => {
    const filtered = filteredBookings;
    return {
      totalBookings: filtered.length,
      totalRevenue: filtered.reduce((sum, b) => sum + (b.charter_total || 0), 0),
      totalGuests: filtered.reduce((sum, b) => sum + (b.total_guests || 0), 0),
      uniqueCustomers: new Set(filtered.map(b => b.guest_full_name?.toLowerCase())).size
    };
  }, [filteredBookings]);

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedYears([]);
    setSelectedBoats([]);
    setSelectedSources([]);
    setSelectedStatuses([]);
    setDateRange(undefined);
    refetch();
  };

  // Check if any filters are active
  const hasActiveFilters = searchTerm || selectedYears.length > 0 || selectedBoats.length > 0 || 
    selectedSources.length > 0 || selectedStatuses.length > 0 || dateRange;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading comprehensive bookings data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-600 mb-4">Error loading bookings data</div>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zatara-navy">Comprehensive Bookings Center</h1>
          <p className="text-zatara-blue">Complete booking history from 2022 onwards with advanced filtering</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => refetch()}>
            <Search className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-zatara-navy">{stats.totalBookings.toLocaleString()}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-zatara-navy">€{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <Euro className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Guests</p>
                <p className="text-2xl font-bold text-zatara-navy">{stats.totalGuests.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unique Customers</p>
                <p className="text-2xl font-bold text-zatara-navy">{stats.uniqueCustomers.toLocaleString()}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="current">Current (2024+)</TabsTrigger>
          <TabsTrigger value="historical">Historical (2022-2023)</TabsTrigger>
        </TabsList>

        <TabsContent value={activeView} className="space-y-6">
          {/* Enhanced Filters */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Advanced Filters</span>
                </CardTitle>
                {hasActiveFilters && (
                  <Button variant="outline" size="sm" onClick={clearAllFilters}>
                    <X className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                {/* Date Range */}
                <DateRangePicker
                  date={dateRange}
                  onDateChange={setDateRange}
                  placeholder="Select date range"
                />

                {/* Multi-select filters */}
                <MultiSelect
                  options={filterOptions.years.map(year => ({ label: year.toString(), value: year.toString() }))}
                  selected={selectedYears}
                  onChange={setSelectedYears}
                  placeholder="Select years"
                />

                <MultiSelect
                  options={filterOptions.boats.map(boat => ({ label: boat, value: boat }))}
                  selected={selectedBoats}
                  onChange={setSelectedBoats}
                  placeholder="Select boats"
                />

                <MultiSelect
                  options={filterOptions.sources.map(source => ({ label: source, value: source }))}
                  selected={selectedSources}
                  onChange={setSelectedSources}
                  placeholder="Select sources"
                />

                <MultiSelect
                  options={filterOptions.statuses.map(status => ({ label: status, value: status }))}
                  selected={selectedStatuses}
                  onChange={setSelectedStatuses}
                  placeholder="Select statuses"
                />
              </div>

              {/* Active filters display */}
              {hasActiveFilters && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {searchTerm && (
                    <Badge variant="secondary">
                      Search: {searchTerm}
                      <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => setSearchTerm('')} />
                    </Badge>
                  )}
                  {dateRange && (
                    <Badge variant="secondary">
                      Date Range
                      <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => setDateRange(undefined)} />
                    </Badge>
                  )}
                  {selectedYears.map(year => (
                    <Badge key={year} variant="secondary">
                      Year: {year}
                      <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => 
                        setSelectedYears(selectedYears.filter(y => y !== year))
                      } />
                    </Badge>
                  ))}
                  {selectedBoats.map(boat => (
                    <Badge key={boat} variant="secondary">
                      Boat: {boat}
                      <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => 
                        setSelectedBoats(selectedBoats.filter(b => b !== boat))
                      } />
                    </Badge>
                  ))}
                  {selectedSources.map(source => (
                    <Badge key={source} variant="secondary">
                      Source: {source}
                      <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => 
                        setSelectedSources(selectedSources.filter(s => s !== source))
                      } />
                    </Badge>
                  ))}
                  {selectedStatuses.map(status => (
                    <Badge key={status} variant="secondary">
                      Status: {status}
                      <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => 
                        setSelectedStatuses(selectedStatuses.filter(s => s !== status))
                      } />
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bookings Table */}
          <Card>
            <CardHeader>
              <CardTitle>Bookings ({filteredBookings.length})</CardTitle>
              <CardDescription>
                Showing {filteredBookings.length} of {bookings.length} total bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <div key={`${booking.data_period}-${booking.id}`} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h4 className="font-medium">{booking.guest_full_name || 'Unknown Guest'}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>{booking.locator}</span>
                            <span>•</span>
                            <span>{new Date(booking.start_date).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{booking.boat}</span>
                            <span>•</span>
                            <span>{booking.booking_source}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge className={getBookingStatusColor(booking.booking_status)}>
                            {booking.booking_status}
                          </Badge>
                          <Badge variant="outline">
                            {booking.data_period.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          {booking.total_guests} guests • €{(booking.charter_total || 0).toLocaleString()}
                        </div>
                        {booking.outstanding_amount > 0 && (
                          <div className="text-sm text-red-600">
                            Outstanding: €{booking.outstanding_amount.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {filteredBookings.length === 0 && (
                  <div className="text-center p-8">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-600">No bookings found matching your criteria</p>
                    <p className="text-sm text-gray-500 mt-2">Try adjusting your filters or search terms</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
