
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Euro, MessageCircle } from 'lucide-react';
import { FinanceViewRow } from '../types/businessViewTypes';

interface FinanceViewProps {
  data: FinanceViewRow[];
  getPaymentStatusColor: (status: string) => string;
  onCharterSelect?: (charter: any) => void;
}

export const FinanceView: React.FC<FinanceViewProps> = ({ data, getPaymentStatusColor, onCharterSelect }) => {
  const handleCharterClick = (charter: FinanceViewRow) => {
    if (onCharterSelect) {
      // Transform to expected format for tools
      const transformedCharter = {
        locator: charter.locator,
        guest_name: charter.guest_full_name,
        boat: charter.boat,
        charter_date: charter.charter_date,
        start_time: '09:00', // Default since not in finance view
        total_guests: 6, // Default since not in finance view
        charter_total: charter.charter_total
      };
      onCharterSelect(transformedCharter);
    }
  };

  return (
    <div className="grid gap-4">
      {data.map((charter) => (
        <Card 
          key={charter.locator} 
          className={`border-l-4 border-green-500 transition-all duration-200 ${
            onCharterSelect ? 'cursor-pointer hover:shadow-lg hover:bg-gray-50' : ''
          }`}
          onClick={() => handleCharterClick(charter)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Euro className="h-5 w-5 text-green-600" />
                <span>{charter.boat} - {charter.locator}</span>
                <Badge className={getPaymentStatusColor(charter.payment_status)}>
                  {charter.payment_status}
                </Badge>
              </CardTitle>
              <div className="text-right">
                <div className="text-lg font-bold">€{charter.charter_total}</div>
                <div className="text-sm text-gray-600">
                  Paid: €{charter.total_paid} | Due: €{charter.balance_due}
                </div>
                {onCharterSelect && (
                  <Button variant="outline" size="sm" className="mt-1">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Tools
                  </Button>
                )}
              </div>
            </div>
            <CardDescription>
              {charter.guest_full_name} • {new Date(charter.charter_date).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium">Payments Received</div>
                <div className="text-green-600">€{charter.payments_received}</div>
              </div>
              <div>
                <div className="font-medium">Outstanding</div>
                <div className="text-red-600">€{charter.outstanding_amount}</div>
              </div>
              <div>
                <div className="font-medium">Source</div>
                <div>{charter.booking_source}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
