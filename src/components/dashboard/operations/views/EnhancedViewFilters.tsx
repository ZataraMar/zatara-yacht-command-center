import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { RefreshCw, X, Filter, Calendar, Ship, Users, MapPin } from 'lucide-react';
import { MultiSelect } from '@/components/ui/multi-select';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { DateRange } from 'react-day-picker';

interface EnhancedViewFiltersProps {
  timeFilter: string;
  setTimeFilter: (value: string) => void;
  boatFilter: string;
  setBoatFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  viewMode: string;
  setViewMode: (value: string) => void;
  availableViews: Array<{ view_name: string; display_name: string }>;
  onRefresh: () => void;
  loading: boolean;
  resultCount: number;
  dateRange?: DateRange;
  setDateRange?: (range: DateRange | undefined) => void;
  selectedSources?: string[];
  setSelectedSources?: (sources: string[]) => void;
  selectedStatuses?: string[];
  setSelectedStatuses?: (statuses: string[]) => void;
  selectedBoats?: string[];
  setSelectedBoats?: (boats: string[]) => void;
}

export const EnhancedViewFilters: React.FC<EnhancedViewFiltersProps> = ({
  timeFilter,
  setTimeFilter,
  boatFilter,
  setBoatFilter,
  statusFilter,
  setStatusFilter,
  viewMode,
  setViewMode,
  availableViews,
  onRefresh,
  loading,
  resultCount,
  dateRange,
  setDateRange,
  selectedSources = [],
  setSelectedSources,
  selectedStatuses = [],
  setSelectedStatuses,
  selectedBoats = [],
  setSelectedBoats
}) => {
  const timeOptions = [
    { label: 'Today', value: '0', icon: Calendar },
    { label: 'Next 7 days', value: '7', icon: Calendar },
    { label: 'Next 14 days', value: '14', icon: Calendar },
    { label: 'Next 30 days', value: '30', icon: Calendar },
    { label: 'Next 60 days', value: '60', icon: Calendar },
    { label: 'Next 90 days', value: '90', icon: Calendar },
    { label: 'This Year', value: 'year', icon: Calendar },
    { label: 'All Time', value: 'all', icon: Calendar },
    { label: 'Custom Range', value: 'custom', icon: Calendar }
  ];

  const boatOptions = [
    { label: 'All Boats', value: 'all', icon: Ship },
    { label: 'Zatara Only', value: 'zatara_only', icon: Ship },
    { label: 'PuraVida Only', value: 'puravida_only', icon: Ship },
    { label: 'Zatara & PuraVida', value: 'zatara_puravida', icon: Ship }
  ];

  const statusOptions = [
    { label: 'All Active', value: 'active', icon: Users },
    { label: 'Confirmed Only', value: 'confirmed', icon: Users },
    { label: 'Booked/Confirmed', value: 'booked_prebooked', icon: Users },
    { label: 'Pending/Options', value: 'option_request', icon: Users },
    { label: 'Cancelled', value: 'cancelled', icon: Users },
    { label: 'All Statuses', value: 'all', icon: Users }
  ];

  const sourceOptions = [
    { label: 'Andronautic', value: 'andronautic' },
    { label: 'ClickBoat', value: 'clickboat' },
    { label: 'Airbnb', value: 'airbnb' },
    { label: 'Direct', value: 'direct' },
    { label: 'Viator', value: 'viator' },
    { label: 'GetYourGuide', value: 'getyourguide' },
    { label: 'Samboat', value: 'samboat' }
  ];

  const multiSelectStatusOptions = [
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Booked', value: 'booked' },
    { label: 'Prebooked', value: 'prebooked' },
    { label: 'Option', value: 'option' },
    { label: 'Request', value: 'request' },
    { label: 'Pending', value: 'pending' },
    { label: 'Cancelled', value: 'cancelled' }
  ];

  const multiSelectBoatOptions = [
    { label: 'Zatara', value: 'zatara' },
    { label: 'PuraVida', value: 'puravida' }
  ];

  const clearAllFilters = () => {
    setTimeFilter('14');
    setBoatFilter('all');
    setStatusFilter('active');
    setDateRange?.(undefined);
    setSelectedSources?.([]);
    setSelectedStatuses?.([]);
    setSelectedBoats?.([]);
  };

  const hasActiveFilters = 
    timeFilter !== '14' || 
    boatFilter !== 'all' || 
    statusFilter !== 'active' ||
    dateRange ||
    selectedSources.length > 0 ||
    selectedStatuses.length > 0 ||
    selectedBoats.length > 0;

  return (
    <Card className="border-2 border-zatara-blue/20">
      <CardHeader className="bg-gradient-to-r from-zatara-blue/5 to-blue-50">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-zatara-blue/10 rounded-lg">
              <Filter className="h-5 w-5 text-zatara-blue" />
            </div>
            <div>
              <span className="text-zatara-navy">Advanced Filters & Controls</span>
              <p className="text-sm text-zatara-blue font-normal mt-1">
                Comprehensive filtering for precise data analysis
              </p>
            </div>
          </CardTitle>
          <div className="flex items-center space-x-3">
            <div className="text-right text-sm">
              <div className="font-semibold text-zatara-navy">{resultCount.toLocaleString()}</div>
              <div className="text-zatara-blue">results found</div>
            </div>
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearAllFilters} className="border-red-200 text-red-600 hover:bg-red-50">
                <X className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
            <Button 
              onClick={onRefresh} 
              disabled={loading}
              size="sm"
              className="bg-zatara-blue hover:bg-zatara-navy"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Primary Controls Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="view-select" className="text-sm font-semibold text-zatara-navy flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              View Mode
            </Label>
            <select
              id="view-select"
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-zatara-blue focus:ring-2 focus:ring-zatara-blue/20 transition-all"
            >
              {availableViews.map((view) => (
                <option key={view.view_name} value={view.view_name}>
                  {view.display_name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time-filter" className="text-sm font-semibold text-zatara-navy flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Time Range
            </Label>
            <select
              id="time-filter"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-zatara-blue focus:ring-2 focus:ring-zatara-blue/20 transition-all"
            >
              {timeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="boat-filter" className="text-sm font-semibold text-zatara-navy flex items-center">
              <Ship className="h-4 w-4 mr-2" />
              Fleet Filter
            </Label>
            <select
              id="boat-filter"
              value={boatFilter}
              onChange={(e) => setBoatFilter(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-zatara-blue focus:ring-2 focus:ring-zatara-blue/20 transition-all"
            >
              {boatOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status-filter" className="text-sm font-semibold text-zatara-navy flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Status Filter
            </Label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-zatara-blue focus:ring-2 focus:ring-zatara-blue/20 transition-all"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Advanced Multi-Select Filters */}
        <div className="border-t pt-4">
          <Label className="text-sm font-semibold text-zatara-navy mb-3 block">Advanced Multi-Select Filters</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-xs text-gray-600">Custom Date Range</Label>
              {setDateRange && (
                <DateRangePicker
                  date={dateRange}
                  onDateChange={setDateRange}
                  placeholder="Select dates"
                  className="w-full"
                />
              )}
            </div>

            {setSelectedBoats && (
              <div className="space-y-2">
                <Label className="text-xs text-gray-600">Specific Boats</Label>
                <MultiSelect
                  options={multiSelectBoatOptions}
                  selected={selectedBoats}
                  onChange={setSelectedBoats}
                  placeholder="Select boats"
                />
              </div>
            )}

            {setSelectedSources && (
              <div className="space-y-2">
                <Label className="text-xs text-gray-600">Booking Sources</Label>
                <MultiSelect
                  options={sourceOptions}
                  selected={selectedSources}
                  onChange={setSelectedSources}
                  placeholder="Select sources"
                />
              </div>
            )}

            {setSelectedStatuses && (
              <div className="space-y-2">
                <Label className="text-xs text-gray-600">Detailed Statuses</Label>
                <MultiSelect
                  options={multiSelectStatusOptions}
                  selected={selectedStatuses}
                  onChange={setSelectedStatuses}
                  placeholder="Select statuses"
                />
              </div>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="border-t pt-4 bg-gray-50 -mx-6 px-6 py-4 rounded-b-lg">
            <Label className="text-sm font-semibold text-zatara-navy mb-3 block">Active Filters:</Label>
            <div className="flex flex-wrap gap-2">
              {timeFilter !== '14' && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                  Time: {timeOptions.find(o => o.value === timeFilter)?.label}
                </Badge>
              )}
              {boatFilter !== 'all' && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                  Fleet: {boatOptions.find(o => o.value === boatFilter)?.label}
                </Badge>
              )}
              {statusFilter !== 'active' && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">
                  Status: {statusOptions.find(o => o.value === statusFilter)?.label}
                </Badge>
              )}
              {dateRange && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">
                  Custom Date Range
                </Badge>
              )}
              {selectedSources.map(source => (
                <Badge key={source} variant="secondary" className="bg-cyan-100 text-cyan-800 border-cyan-200">
                  Source: {source}
                </Badge>
              ))}
              {selectedStatuses.map(status => (
                <Badge key={status} variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  Status: {status}
                </Badge>
              ))}
              {selectedBoats.map(boat => (
                <Badge key={boat} variant="secondary" className="bg-teal-100 text-teal-800 border-teal-200">
                  Boat: {boat}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
