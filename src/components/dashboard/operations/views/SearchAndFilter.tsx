
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, X, Calendar, Ship, Filter } from 'lucide-react';

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (value: 'asc' | 'desc') => void;
  onClearSearch: () => void;
  statusFilter?: string;
  setStatusFilter?: (value: string) => void;
  boatFilter?: string;
  setBoatFilter?: (value: string) => void;
  sourceFilter?: string;
  setSourceFilter?: (value: string) => void;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  onClearSearch,
  statusFilter,
  setStatusFilter,
  boatFilter,
  setBoatFilter,
  sourceFilter,
  setSourceFilter
}) => {
  const sortOptions = [
    { value: 'charter_date', label: 'Charter Date' },
    { value: 'guest_name', label: 'Guest Name' },
    { value: 'boat', label: 'Boat' },
    { value: 'charter_total', label: 'Charter Value' },
    { value: 'booking_source', label: 'Booking Source' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'booked', label: 'Booked' },
    { value: 'prebooked', label: 'Prebooked' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'option', label: 'Option Request' }
  ];

  const boatOptions = [
    { value: 'all', label: 'All Boats' },
    { value: 'zatara', label: 'Zatara' },
    { value: 'puravida', label: 'PuraVida' },
    { value: 'other', label: 'Other Boats' }
  ];

  const sourceOptions = [
    { value: 'all', label: 'All Sources' },
    { value: 'andronautic', label: 'Andronautic' },
    { value: 'airbnb', label: 'Airbnb' },
    { value: 'clickboat', label: 'ClickBoat' },
    { value: 'viator', label: 'Viator' },
    { value: 'direct', label: 'Direct Booking' }
  ];

  const hasActiveFilters = statusFilter !== 'all' || boatFilter !== 'all' || sourceFilter !== 'all' || searchTerm;

  return (
    <div className="bg-white p-4 rounded-lg border space-y-4">
      {/* Search and Sort Row */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2 flex-1 min-w-64">
          <Search className="h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search by guest name, locator, or boat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          {searchTerm && (
            <Button variant="ghost" size="sm" onClick={onClearSearch}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Sort by:</label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              {sortOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t">
          <span className="text-sm font-medium text-gray-600">Active filters:</span>
          {searchTerm && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Search: {searchTerm}
            </Badge>
          )}
          {statusFilter && statusFilter !== 'all' && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Status: {statusOptions.find(o => o.value === statusFilter)?.label}
            </Badge>
          )}
          {boatFilter && boatFilter !== 'all' && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              Boat: {boatOptions.find(o => o.value === boatFilter)?.label}
            </Badge>
          )}
          {sourceFilter && sourceFilter !== 'all' && (
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              Source: {sourceOptions.find(o => o.value === sourceFilter)?.label}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
