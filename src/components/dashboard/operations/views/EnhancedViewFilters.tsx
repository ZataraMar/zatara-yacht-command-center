import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RefreshCw, X, Filter, Calendar as CalendarIcon, Ship, Users, MapPin, Plus, Minus } from 'lucide-react';
import { MultiSelect } from '@/components/ui/multi-select';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

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
  selectedDate?: Date;
  setSelectedDate?: (date: Date | undefined) => void;
  daysForward?: number;
  setDaysForward?: (days: number) => void;
  daysBackward?: number;
  setDaysBackward?: (days: number) => void;
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
  setSelectedBoats,
  selectedDate = new Date(),
  setSelectedDate,
  daysForward = 0,
  setDaysForward,
  daysBackward = 0,
  setDaysBackward
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
    setSelectedDate?.(new Date());
    setDaysForward?.(0);
    setDaysBackward?.(0);
  };

  const hasActiveFilters = 
    timeFilter !== '14' || 
    boatFilter !== 'all' || 
    statusFilter !== 'active' ||
    dateRange ||
    selectedSources.length > 0 ||
    selectedStatuses.length > 0 ||
    selectedBoats.length > 0 ||
    daysForward > 0 ||
    daysBackward > 0 ||
    (selectedDate && selectedDate.toDateString() !== new Date().toDateString());

  return (
    <Card className="border-2 border-zatara-blue/20">
      <CardHeader className="bg-gradient-to-r from-zatara-blue/5 to-blue-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[200px] justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                  size="sm"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
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
        <div className="grid grid-cols-4 gap-2">
          <div>
            <select
              id="view-select"
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-zatara-blue focus:ring-2 focus:ring-zatara-blue/20 transition-all"
            >
              {availableViews.map((view) => (
                <option key={view.view_name} value={view.view_name}>
                  {view.display_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDaysBackward?.(Math.max(0, daysBackward - 1))}
              className="p-1 h-8 w-8"
              title="Decrease days backward"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDaysBackward?.(daysBackward + 1)}
              className="p-1 h-8 w-8"
              title="Increase days backward"
            >
              <Plus className="h-3 w-3" />
            </Button>
            <div className="text-center min-w-[60px] text-sm">
              <div className="text-xs text-gray-500">-{daysBackward} | +{daysForward}</div>
              <div className="text-xs text-gray-400">days</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDaysForward?.(Math.max(0, daysForward - 1))}
              className="p-1 h-8 w-8"
              title="Decrease days forward"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDaysForward?.(daysForward + 1)}
              className="p-1 h-8 w-8"
              title="Increase days forward"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <div>
            <select
              id="boat-filter"
              value={boatFilter}
              onChange={(e) => setBoatFilter(e.target.value)}
              className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-zatara-blue focus:ring-2 focus:ring-zatara-blue/20 transition-all"
            >
              {boatOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-zatara-blue focus:ring-2 focus:ring-zatara-blue/20 transition-all"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>


        {/* Active Filters Display */}
      </CardContent>
    </Card>
  );
};
