
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RefreshCw, X, Filter } from 'lucide-react';
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
    { label: 'Today', value: '0' },
    { label: 'Next 7 days', value: '7' },
    { label: 'Next 14 days', value: '14' },
    { label: 'Next 30 days', value: '30' },
    { label: 'Custom Range', value: 'custom' }
  ];

  const boatOptions = [
    { label: 'All Boats', value: 'all' },
    { label: 'Zatara Only', value: 'zatara_only' },
    { label: 'PuraVida Only', value: 'puravida_only' },
    { label: 'Zatara & PuraVida', value: 'zatara_puravida' }
  ];

  const statusOptions = [
    { label: 'Booked/Confirmed', value: 'booked_prebooked' },
    { label: 'Option/Request', value: 'option_request' },
    { label: 'Cancelled', value: 'cancelled' },
    { label: 'All Statuses', value: 'all' }
  ];

  const sourceOptions = [
    { label: 'Andronautic', value: 'andronautic' },
    { label: 'ClickBoat', value: 'clickboat' },
    { label: 'Airbnb', value: 'airbnb' },
    { label: 'Direct', value: 'direct' },
    { label: 'Viator', value: 'viator' },
    { label: 'GetYourGuide', value: 'getyourguide' }
  ];

  const multiSelectStatusOptions = [
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Booked', value: 'booked' },
    { label: 'Prebooked', value: 'prebooked' },
    { label: 'Option', value: 'option' },
    { label: 'Request', value: 'request' },
    { label: 'Cancelled', value: 'cancelled' }
  ];

  const multiSelectBoatOptions = [
    { label: 'Zatara', value: 'zatara' },
    { label: 'PuraVida', value: 'puravida' }
  ];

  const clearAllFilters = () => {
    setTimeFilter('14');
    setBoatFilter('all');
    setStatusFilter('booked_prebooked');
    setDateRange?.(undefined);
    setSelectedSources?.([]);
    setSelectedStatuses?.([]);
    setSelectedBoats?.([]);
  };

  const hasActiveFilters = 
    timeFilter !== '14' || 
    boatFilter !== 'all' || 
    statusFilter !== 'booked_prebooked' ||
    dateRange ||
    selectedSources.length > 0 ||
    selectedStatuses.length > 0 ||
    selectedBoats.length > 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Advanced Filters</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearAllFilters}>
                <X className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
            <Button 
              onClick={onRefresh} 
              disabled={loading}
              size="sm"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Showing {resultCount} results</span>
          {hasActiveFilters && <Badge variant="secondary">Filtered</Badge>}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* View Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="view-select">View Mode</Label>
            <select
              id="view-select"
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {availableViews.map((view) => (
                <option key={view.view_name} value={view.view_name}>
                  {view.display_name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time-filter">Time Range</Label>
            <select
              id="time-filter"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {timeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Date Range</Label>
            {setDateRange && (
              <DateRangePicker
                date={dateRange}
                onDateChange={setDateRange}
                placeholder="Select date range"
              />
            )}
          </div>
        </div>

        {/* Legacy Filters (for compatibility) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="boat-filter">Boat Filter (Legacy)</Label>
            <select
              id="boat-filter"
              value={boatFilter}
              onChange={(e) => setBoatFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {boatOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status-filter">Status Filter (Legacy)</Label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Enhanced Multi-Select Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {setSelectedBoats && (
            <div className="space-y-2">
              <Label>Boats (Multi-Select)</Label>
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
              <Label>Booking Sources</Label>
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
              <Label>Booking Statuses</Label>
              <MultiSelect
                options={multiSelectStatusOptions}
                selected={selectedStatuses}
                onChange={setSelectedStatuses}
                placeholder="Select statuses"
              />
            </div>
          )}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="border-t pt-4">
            <Label className="text-sm font-medium">Active Filters:</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {timeFilter !== '14' && (
                <Badge variant="secondary">
                  Time: {timeOptions.find(o => o.value === timeFilter)?.label}
                </Badge>
              )}
              {boatFilter !== 'all' && (
                <Badge variant="secondary">
                  Boat: {boatOptions.find(o => o.value === boatFilter)?.label}
                </Badge>
              )}
              {statusFilter !== 'booked_prebooked' && (
                <Badge variant="secondary">
                  Status: {statusOptions.find(o => o.value === statusFilter)?.label}
                </Badge>
              )}
              {dateRange && (
                <Badge variant="secondary">
                  Custom Date Range
                </Badge>
              )}
              {selectedSources.map(source => (
                <Badge key={source} variant="secondary">
                  Source: {source}
                </Badge>
              ))}
              {selectedStatuses.map(status => (
                <Badge key={status} variant="secondary">
                  Status: {status}
                </Badge>
              ))}
              {selectedBoats.map(boat => (
                <Badge key={boat} variant="secondary">
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
