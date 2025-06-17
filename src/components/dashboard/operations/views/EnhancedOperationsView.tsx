
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Anchor, Clock, MapPin, MessageCircle, Euro, Users } from 'lucide-react';
import { BusinessViewRow } from '../types/businessViewTypes';
import { SearchAndFilter } from './SearchAndFilter';
import { useSearchAndSort } from '@/hooks/useSearchAndSort';

interface EnhancedOperationsViewProps {
  data: BusinessViewRow[];
  getStatusColor: (status: string) => string;
  onCharterSelect?: (charter: any) => void;
}

export const EnhancedOperationsView: React.FC<EnhancedOperationsViewProps> = ({ 
  data, 
  getStatusColor, 
  onCharterSelect 
}) => {
  const {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    filteredAndSortedData,
    clearSearch
  } = useSearchAndSort({
    data,
    searchFields: ['guest_name', 'locator', 'boat', 'booking_source'],
    defaultSortBy: 'charter_date'
  });

  const handleCharterClick = (charter: BusinessViewRow) => {
    if (onCharterSelect) {
      const transformedCharter = {
        locator: charter.locator,
        guest_name: charter.guest_name,
        boat: charter.boat,
        charter_date: charter.charter_date,
        start_time: charter.start_time,
        total_guests: charter.total_guests,
        charter_total: charter.charter_total
      };
      onCharterSelect(transformedCharter);
    }
  };

  return (
    <div className="space-y-4">
      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        onClearSearch={clearSearch}
      />
      
      {filteredAndSortedData.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">
              {searchTerm ? 'No charters match your search criteria.' : 'No charters found.'}
            </p>
            {searchTerm && (
              <Button variant="outline" onClick={clearSearch} className="mt-2">
                Clear search
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredAndSortedData.map((charter) => (
            <Card 
              key={charter.locator} 
              className={`border-l-4 border-zatara-blue transition-all duration-200 ${
                onCharterSelect ? 'cursor-pointer hover:shadow-lg hover:bg-gray-50' : ''
              }`}
              onClick={() => handleCharterClick(charter)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Anchor className="h-5 w-5 text-zatara-blue" />
                    <span>{charter.boat} - {charter.locator}</span>
                    <Badge className={getStatusColor(charter.status)}>
                      {charter.status}
                    </Badge>
                  </CardTitle>
                  <div className="text-right flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Euro className="h-4 w-4 text-green-600" />
                      <span className="text-lg font-bold">€{charter.charter_total?.toLocaleString() || '0'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{charter.total_guests}</span>
                    </div>
                    {onCharterSelect && (
                      <Button variant="outline" size="sm" className="ml-2">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Tools
                      </Button>
                    )}
                  </div>
                </div>
                <CardDescription className="flex items-center justify-between">
                  <span>{charter.guest_name}</span>
                  <span className="text-sm font-medium">
                    {new Date(charter.charter_date).toLocaleDateString('en-GB')}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-zatara-navy">Schedule</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3" />
                      <span>{charter.start_time} - {charter.end_time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-3 w-3" />
                      <span>{charter.booking_source}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-zatara-navy">Operations</h4>
                  <div className="text-sm space-y-1">
                    {charter.crew_required && <div>👥 {charter.crew_required}</div>}
                    {charter.equipment_required && <div>🏄 {charter.equipment_required}</div>}
                    <div className="flex space-x-2">
                      <Badge variant={charter.pre_departure_checks ? "default" : "secondary"} className="text-xs">
                        {charter.pre_departure_checks ? "✓ Pre-checks" : "Pending checks"}
                      </Badge>
                      <Badge variant={charter.cleared_for_departure ? "default" : "destructive"} className="text-xs">
                        {charter.cleared_for_departure ? "✓ Cleared" : "Not cleared"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-zatara-navy">Details</h4>
                  <div className="text-sm space-y-1">
                    {charter.fnb_details && <div>🍽️ {charter.fnb_details}</div>}
                    {charter.charter_notes && (
                      <div className="bg-yellow-50 p-2 rounded text-xs border-l-2 border-yellow-400">
                        📝 {charter.charter_notes}
                      </div>
                    )}
                    {charter.outstanding_amount > 0 && (
                      <div className="bg-red-50 p-2 rounded text-xs border-l-2 border-red-400">
                        💰 Outstanding: €{charter.outstanding_amount}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
