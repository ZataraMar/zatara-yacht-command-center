
import React, { useState } from 'react';
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
  const [selectedCharterId, setSelectedCharterId] = useState<string | null>(null);
  
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
    const isCurrentlySelected = selectedCharterId === charter.locator;
    
    if (isCurrentlySelected) {
      // If already selected, deselect it
      setSelectedCharterId(null);
      if (onCharterSelect) {
        onCharterSelect(null);
      }
    } else {
      // Select the new charter
      setSelectedCharterId(charter.locator);
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
    }
  };

  const handleToolsClick = (e: React.MouseEvent, charter: BusinessViewRow) => {
    e.stopPropagation();
    handleCharterClick(charter);
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
        <div className="grid gap-3">
          {filteredAndSortedData.map((charter) => {
            const isSelected = selectedCharterId === charter.locator;
            
            return (
              <Card 
                key={charter.locator} 
                className={`border-l-4 border-zatara-blue transition-all duration-200 ${
                  onCharterSelect ? 'cursor-pointer hover:shadow-lg hover:bg-gray-50' : ''
                } ${isSelected ? 'bg-blue-50 shadow-lg ring-2 ring-zatara-blue/20' : ''}`}
                onClick={() => handleCharterClick(charter)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Anchor className="h-4 w-4 text-zatara-blue" />
                      <span className="font-semibold text-sm">{charter.boat} - {charter.locator}</span>
                      <Badge className={getStatusColor(charter.status)}>
                        {charter.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Euro className="h-3 w-3 text-green-600" />
                        <span className="text-sm font-bold">€{charter.charter_total?.toLocaleString() || '0'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3 text-blue-600" />
                        <span className="text-xs">{charter.total_guests}</span>
                      </div>
                      {onCharterSelect && (
                        <Button 
                          variant={isSelected ? "default" : "outline"} 
                          size="sm" 
                          className="h-7 px-2"
                          onClick={(e) => handleToolsClick(e, charter)}
                        >
                          <MessageCircle className="h-3 w-3 mr-1" />
                          {isSelected ? 'Hide Tools' : 'Tools'}
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                    <span className="font-medium">{charter.guest_name}</span>
                    <span>{new Date(charter.charter_date).toLocaleDateString('en-GB')}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        <Clock className="h-3 w-3" />
                        <span className="font-medium">Schedule</span>
                      </div>
                      <div className="text-gray-600">{charter.start_time} - {charter.end_time}</div>
                      <div className="flex items-center space-x-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        <span className="text-gray-600">{charter.booking_source}</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="font-medium mb-1">Operations</div>
                      <div className="space-y-1">
                        {charter.crew_required && <div className="text-gray-600">👥 {charter.crew_required}</div>}
                        {charter.equipment_required && <div className="text-gray-600">🏄 {charter.equipment_required}</div>}
                        <div className="flex space-x-1">
                          <Badge 
                            variant={charter.pre_departure_checks ? "default" : "secondary"} 
                            className="text-xs px-1 py-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle pre-departure check toggle
                            }}
                          >
                            {charter.pre_departure_checks ? "✓" : "⏳"}
                          </Badge>
                          <Badge 
                            variant={charter.cleared_for_departure ? "default" : "destructive"} 
                            className="text-xs px-1 py-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle clearance toggle
                            }}
                          >
                            {charter.cleared_for_departure ? "✓" : "❌"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="font-medium mb-1">Details</div>
                      <div className="space-y-1">
                        {charter.fnb_details && <div className="text-gray-600">🍽️ {charter.fnb_details}</div>}
                        {charter.charter_notes && (
                          <div className="bg-yellow-50 p-1 rounded text-xs border-l-2 border-yellow-400">
                            📝 {charter.charter_notes.substring(0, 30)}...
                          </div>
                        )}
                        {charter.outstanding_amount > 0 && (
                          <div className="bg-red-50 p-1 rounded text-xs border-l-2 border-red-400">
                            💰 €{charter.outstanding_amount}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
