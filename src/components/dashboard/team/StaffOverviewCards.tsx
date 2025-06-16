
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Award, Clock, Calendar } from 'lucide-react';
import { StaffOverviewMetrics } from '@/types/staff';

interface StaffOverviewCardsProps {
  metrics: StaffOverviewMetrics;
}

export const StaffOverviewCards: React.FC<StaffOverviewCardsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Staff</p>
              <p className="text-2xl font-bold text-zatara-navy">{metrics.totalStaff}</p>
            </div>
            <Users className="h-8 w-8 text-zatara-blue" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Skippers</p>
              <p className="text-2xl font-bold text-zatara-navy">{metrics.activeSkippers}</p>
            </div>
            <Award className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">On Duty Today</p>
              <p className="text-2xl font-bold text-zatara-navy">{metrics.onDutyToday}</p>
            </div>
            <Clock className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Hours/Week</p>
              <p className="text-2xl font-bold text-zatara-navy">{metrics.avgHoursPerWeek}</p>
            </div>
            <Calendar className="h-8 w-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
