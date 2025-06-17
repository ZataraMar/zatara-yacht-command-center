
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Filter, Calendar } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';

interface EnhancedViewFiltersProps {
  timeFilter: string;
  setTimeFilter: (value: string) => void;
  boatFilter: string;
  setBoatFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  viewMode: string;
  setViewMode: (value: string) => void;
  availableViews: any[];
  onRefresh: () => void;
  loading?: boolean;
  resultCount?: number;
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
  loading = false,
  resultCount = 0
}) => {
  const [customDateRange, setCustomDateRange] = useState<Date | undefined>(undefined);
  const [showCustomDate, setShowCustomDate] = useState(false);

  const timeOptions = [
    { value: '1', label: 'Today Only' },
    { value: '3', label: '3 days (±1 day)' },
    { value: '7', label: '7 days (±3 days)' },
    { value: '14', label: '14 days (±7 days)' },
    { value: '30', label: '30 days (±15 days)' },
    { value: '60', label: '60 days (±30 days)' },
    { value: 'custom', label: 'Custom Date' }
  ];

  const boatOptions = [
    { value: 'all', label: 'All Boats' },
    { value: 'zatara_only', label: 'Zatara Only' },
    { value: 'puravida_only', label: 'PuraVida Only' },
    { value: 'zatara_puravida', label: 'Both Boats' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'booked_prebooked', label: 'Booked/Confirmed' },
    { value: 'option_request', label: 'Option/Request' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const handleTimeFilterChange = (value: string) => {
    if (value === 'custom') {
      setShowCustomDate(true);
    } else {
      setShowCustomDate(false);
      setTimeFilter(value);
    }
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (timeFilter !== '14') count++;
    if (boatFilter !== 'all') count++;
    if (statusFilter !== 'all') count++;
    return count;
  };

  return (
    <div className="space-y-4">
      {/* Main Filters */}
      <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <label className="text-sm font-medium text-gray-700">Filters:</label>
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Time Range:</label>
          <Select value={timeFilter} onValueChange={handleTimeFilterChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {showCustomDate && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-40 justify-start text-left font-normal">
                  <Calendar className="mr-2 h-4 w-4" />
                  {customDateRange ? format(customDateRange, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={customDateRange}
                  onSelect={(date) => {
                    setCustomDateRange(date);
                    if (date) {
                      // Convert selected date to a custom filter range
                      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
                      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                      const today = new Date();
                      const daysDiff = Math.ceil((monthEnd.getTime() - monthStart.getTime()) / (1000 * 3600 * 24));
                      setTimeFilter(daysDiff.toString());
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Boats:</label>
          <Select value={boatFilter} onValueChange={setBoatFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {boatOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Status:</label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={onRefresh} 
          variant="outline" 
          size="sm"
          disabled={loading}
          className="ml-auto"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* View Mode Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {availableViews.map(view => (
            <Button
              key={view.view_name}
              onClick={() => setViewMode(view.view_name)}
              variant={viewMode === view.view_name ? "default" : "outline"}
              size="sm"
              className="text-sm"
            >
              {view.display_name}
            </Button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          {getActiveFiltersCount() > 0 && (
            <Badge variant="secondary">
              {getActiveFiltersCount()} active filter{getActiveFiltersCount() !== 1 ? 's' : ''}
            </Badge>
          )}
          <Badge variant="outline">
            {resultCount} result{resultCount !== 1 ? 's' : ''}
          </Badge>
        </div>
      </div>
    </div>
  );
};
