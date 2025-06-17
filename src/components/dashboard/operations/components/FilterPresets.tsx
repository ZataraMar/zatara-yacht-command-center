
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Ship, Calendar, Users, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FilterPresetsProps {
  onApplyPreset: (preset: FilterPreset) => void;
  currentFilters: any;
  bookingData?: any[];
}

interface FilterPreset {
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  filters: {
    timeFilter?: string;
    boatFilter?: string;
    statusFilter?: string;
    viewMode?: string;
  };
  dataSource?: string;
}

const presets: FilterPreset[] = [
  {
    name: 'Today\'s Charters',
    description: 'All charters happening today',
    icon: Clock,
    filters: {
      timeFilter: '0',
      statusFilter: 'active'
    },
    dataSource: 'real-time-bookings'
  },
  {
    name: 'This Week',
    description: 'Next 7 days overview',
    icon: Calendar,
    filters: {
      timeFilter: '7',
      statusFilter: 'active'
    },
    dataSource: 'weekly-forecast'
  },
  {
    name: 'Zatara Focus',
    description: 'Zatara boat only',
    icon: Ship,
    filters: {
      boatFilter: 'zatara_only',
      statusFilter: 'active'
    },
    dataSource: 'zatara-operations'
  },
  {
    name: 'PuraVida Focus',
    description: 'PuraVida boat only',
    icon: Ship,
    filters: {
      boatFilter: 'puravida_only',
      statusFilter: 'active'
    },
    dataSource: 'puravida-operations'
  },
  {
    name: 'Pending Actions',
    description: 'Bookings needing attention',
    icon: Users,
    filters: {
      statusFilter: 'option_request',
      timeFilter: '30'
    },
    dataSource: 'pending-operations'
  },
  {
    name: 'Performance View',
    description: 'Analytics and trends',
    icon: TrendingUp,
    filters: {
      viewMode: 'analytics',
      timeFilter: '30'
    },
    dataSource: 'business-analytics'
  }
];

export const FilterPresets: React.FC<FilterPresetsProps> = ({
  onApplyPreset,
  currentFilters,
  bookingData = []
}) => {
  const { toast } = useToast();

  const isPresetActive = (preset: FilterPreset) => {
    return Object.entries(preset.filters).every(([key, value]) => 
      currentFilters[key] === value
    );
  };

  const getFilteredDataCount = (preset: FilterPreset) => {
    // Calculate how many records match this filter
    let count = bookingData.length;
    
    if (preset.filters.boatFilter === 'zatara_only') {
      count = bookingData.filter(b => b.boat?.toLowerCase().includes('zatara')).length;
    } else if (preset.filters.boatFilter === 'puravida_only') {
      count = bookingData.filter(b => 
        b.boat?.toLowerCase().includes('puravida') || 
        b.boat?.toLowerCase().includes('pura vida')
      ).length;
    }
    
    return count;
  };

  const handlePresetClick = (preset: FilterPreset) => {
    const dataCount = getFilteredDataCount(preset);
    
    toast({
      title: `${preset.name} Applied`,
      description: `Showing ${dataCount} records from ${preset.dataSource}`,
    });
    
    onApplyPreset(preset);
  };

  const handleDataSourceDrillDown = (preset: FilterPreset) => {
    // Navigate to detailed view of data source
    const dataCount = getFilteredDataCount(preset);
    
    toast({
      title: "Data Source Details",
      description: `${preset.dataSource}: ${dataCount} records available`,
    });
    
    // Open detailed data view
    console.log(`Drilling down into ${preset.dataSource}:`, {
      preset,
      filteredData: bookingData.filter(b => {
        if (preset.filters.boatFilter === 'zatara_only') {
          return b.boat?.toLowerCase().includes('zatara');
        } else if (preset.filters.boatFilter === 'puravida_only') {
          return b.boat?.toLowerCase().includes('puravida') || 
                 b.boat?.toLowerCase().includes('pura vida');
        }
        return true;
      })
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Quick Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {presets.map((preset) => {
          const Icon = preset.icon;
          const isActive = isPresetActive(preset);
          const dataCount = getFilteredDataCount(preset);
          
          return (
            <div key={preset.name} className="space-y-1">
              <Button
                onClick={() => handlePresetClick(preset)}
                variant={isActive ? "default" : "outline"}
                size="sm"
                className="w-full justify-start text-left h-auto p-3"
              >
                <div className="flex items-start space-x-2 w-full">
                  <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium truncate">
                        {preset.name}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Badge variant="secondary" className="text-xs">
                          {dataCount}
                        </Badge>
                        {isActive && (
                          <Badge variant="default" className="text-xs">
                            Active
                          </Badge>
                        )}
                      </div>
                    </div>
                    <span className="text-xs opacity-70 block">
                      {preset.description}
                    </span>
                  </div>
                </div>
              </Button>
              
              {dataCount > 0 && (
                <Button
                  onClick={() => handleDataSourceDrillDown(preset)}
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs text-blue-600 hover:text-blue-800"
                >
                  View {preset.dataSource} details →
                </Button>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
