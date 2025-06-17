
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Filter } from 'lucide-react';

interface EnhancedViewFiltersProps {
  timeFilter: string;
  setTimeFilter: (value: string) => void;
  boatFilter: string;
  setBoatFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  viewMode: string;
  setViewMode: (value: string) => void;
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
  onRefresh,
  loading = false,
  resultCount = 0
}) => {
  const timeOptions = [
    { value: '7', label: '7 days' },
    { value: '14', label: '14 days' },
    { value: '30', label: '30 days' },
    { value: '60', label: '60 days' }
  ];

  const boatOptions = [
    { value: 'all', label: 'All Boats' },
    { value: 'zatara_only', label: 'Zatara Only' },
    { value: 'puravida_only', label: 'PuraVida Only' },
    { value: 'zatara_puravida', label: 'Both Boats' }
  ];

  const statusOptions = [
    { value: 'booked_prebooked', label: 'Booked/Prebooked' },
    { value: 'option_request', label: 'Option Request' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'all', label: 'All Status' }
  ];

  const viewModes = [
    { value: 'operations', label: '🔧 Operations' },
    { value: 'finance', label: '💰 Finance' },
    { value: 'zatara', label: '⛵ Zatara' },
    { value: 'puravida', label: '🚤 PuraVida' }
  ];

  const getActiveFiltersCount = () => {
    let count = 0;
    if (timeFilter !== '14') count++;
    if (boatFilter !== 'all') count++;
    if (statusFilter !== 'booked_prebooked') count++;
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
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-32">
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
          {viewModes.map(mode => (
            <Button
              key={mode.value}
              onClick={() => setViewMode(mode.value)}
              variant={viewMode === mode.value ? "default" : "outline"}
              size="sm"
              className="text-sm"
            >
              {mode.label}
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
