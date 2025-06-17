
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Euro } from 'lucide-react';

interface FinanceViewRow {
  locator: string;
  charter_date: string;
  guest_full_name: string;
  boat: string;
  booking_source: string;
  charter_total: number;
  outstanding_amount: number;
  payments_received: number;
  total_paid: number;
  balance_due: number;
  payment_status: string;
}

interface FinanceViewProps {
  data: FinanceViewRow[];
  getPaymentStatusColor: (status: string) => string;
}

export const FinanceView: React.FC<FinanceViewProps> = ({ data, getPaymentStatusColor }) => {
  return (
    <div className="grid gap-4">
      {data.map((charter) => (
        <Card key={charter.locator} className="border-l-4 border-green-500">
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
