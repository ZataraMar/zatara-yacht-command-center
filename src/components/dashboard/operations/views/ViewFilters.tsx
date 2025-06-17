
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ViewFiltersProps {
  timeFilter: string;
  setTimeFilter: (value: string) => void;
  boatFilter: string;
  setBoatFilter: (value: string) => void;
  onRefresh: () => void;
}

export const ViewFilters: React.FC<ViewFiltersProps> = ({
  timeFilter,
  setTimeFilter,
  boatFilter,
  setBoatFilter,
  onRefresh
}) => {
  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg border">
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium">Time Range:</label>
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">7 days</SelectItem>
            <SelectItem value="14">14 days</SelectItem>
            <SelectItem value="30">30 days</SelectItem>
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
            <SelectItem value="all">All Boats</SelectItem>
            <SelectItem value="zatara_only">Zatara Only</SelectItem>
            <SelectItem value="puravida_only">PuraVida Only</SelectItem>
            <SelectItem value="zatara_puravida">Both Boats</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={onRefresh} variant="outline" size="sm">
        Refresh Data
      </Button>
    </div>
  );
};
