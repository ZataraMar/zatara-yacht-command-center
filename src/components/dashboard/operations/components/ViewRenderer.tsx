
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { EnhancedOperationsView } from '../views/EnhancedOperationsView';
import { FinanceView } from '../views/FinanceView';
import { SkipperView } from '../views/SkipperView';
import { BusinessViewRow, FinanceViewRow, SkipperViewRow } from '../types/businessViewTypes';
import { getStatusColor, getPaymentStatusColor } from '../utils/statusColors';

interface ViewRendererProps {
  viewMode: string;
  transformedData: BusinessViewRow[];
  financeData: FinanceViewRow[];
  skipperData: SkipperViewRow[];
  loading: boolean;
  error: string | null;
  onCharterSelect: (charter: any) => void;
}

export const ViewRenderer: React.FC<ViewRendererProps> = ({
  viewMode,
  transformedData,
  financeData,
  skipperData,
  loading,
  error,
  onCharterSelect
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!transformedData.length) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">No charters found for the selected filters.</p>
          <p className="text-sm text-gray-400 mt-2">
            Try adjusting your time range or boat filters to see more results.
          </p>
        </CardContent>
      </Card>
    );
  }

  switch (viewMode) {
    case 'operations':
      return (
        <EnhancedOperationsView 
          data={transformedData} 
          getStatusColor={getStatusColor}
          onCharterSelect={onCharterSelect}
        />
      );
    case 'finance':
      return (
        <FinanceView 
          data={financeData} 
          getPaymentStatusColor={getPaymentStatusColor}
          onCharterSelect={onCharterSelect}
        />
      );
    case 'zatara':
      return (
        <SkipperView 
          data={skipperData.filter(d => d.boat?.toLowerCase().includes('zatara'))} 
          boatName="Zatara" 
          boatColor="blue" 
          getStatusColor={getStatusColor}
          onCharterSelect={onCharterSelect}
        />
      );
    case 'puravida':
      return (
        <SkipperView 
          data={skipperData.filter(d => 
            d.boat?.toLowerCase().includes('puravida') || 
            d.boat?.toLowerCase().includes('pura vida')
          )} 
          boatName="PuraVida" 
          boatColor="teal" 
          getStatusColor={getStatusColor}
          onCharterSelect={onCharterSelect}
        />
      );
    default:
      return <div>View not implemented</div>;
  }
};
