
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Ship, Calendar, Users } from 'lucide-react';

interface FilterPresetsProps {
  onApplyPreset: (preset: FilterPreset) => void;
  currentFilters: any;
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
}

const presets: FilterPreset[] = [
  {
    name: 'Today\'s Charters',
    description: 'All charters happening today',
    icon: Clock,
    filters: {
      timeFilter: '0',
      statusFilter: 'active'
    }
  },
  {
    name: 'This Week',
    description: 'Next 7 days overview',
    icon: Calendar,
    filters: {
      timeFilter: '7',
      statusFilter: 'active'
    }
  },
  {
    name: 'Zatara Focus',
    description: 'Zatara boat only',
    icon: Ship,
    filters: {
      boatFilter: 'zatara_only',
      statusFilter: 'active'
    }
  },
  {
    name: 'PuraVida Focus',
    description: 'PuraVida boat only',
    icon: Ship,
    filters: {
      boatFilter: 'puravida_only',
      statusFilter: 'active'
    }
  },
  {
    name: 'Pending Actions',
    description: 'Bookings needing attention',
    icon: Users,
    filters: {
      statusFilter: 'option_request',
      timeFilter: '30'
    }
  }
];

export const FilterPresets: React.FC<FilterPresetsProps> = ({
  onApplyPreset,
  currentFilters
}) => {
  const isPresetActive = (preset: FilterPreset) => {
    return Object.entries(preset.filters).every(([key, value]) => 
      currentFilters[key] === value
    );
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
          
          return (
            <Button
              key={preset.name}
              onClick={() => onApplyPreset(preset)}
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
                    {isActive && (
                      <Badge variant="secondary" className="text-xs ml-1">
                        Active
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs opacity-70 block">
                    {preset.description}
                  </span>
                </div>
              </div>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};
