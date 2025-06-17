
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ManualInputData {
  boat_paid?: number;
  extras_paid?: number;
  extras_outstanding?: number;
  cash_payment?: number;
  card_payment?: number;
  cleared_for_departure?: boolean;
  pre_departure_checks?: boolean;
  charter_notes?: string;
  contract_signed?: boolean;
  gps_coordinates?: string;
  fnb_details?: string;
  crew_required?: string;
  fuel_needs?: string;
  equipment_required?: string;
  urgent_notes?: string;
}

interface ManualInputFormProps {
  charter: {
    locator: string;
    guest_name: string;
    boat: string;
    charter_date: string;
    charter_total: number;
    outstanding_amount?: number;
    paid_amount?: number;
  };
  initialData?: ManualInputData;
  onSave?: (data: ManualInputData) => void;
}

export const ManualInputForm: React.FC<ManualInputFormProps> = ({ 
  charter, 
  initialData = {},
  onSave 
}) => {
  const [formData, setFormData] = useState<ManualInputData>(initialData);
  const [loading, setSaving] = useState(false);

  const handleInputChange = (field: keyof ManualInputData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Update operations table
      const { error: opsError } = await supabase
        .from('operations')
        .upsert({
          locator: charter.locator,
          cleared_for_departure: formData.cleared_for_departure || false,
          pre_departure_checks: formData.pre_departure_checks || false,
          charter_notes: formData.charter_notes || '',
          gps_coordinates: formData.gps_coordinates || '',
          catering_details: formData.fnb_details || '',
          fuel_route: formData.fuel_needs || '',
          water_toys: formData.equipment_required || '',
          other_extras: formData.urgent_notes || ''
        });

      // Update bookings table for financial data
      const { error: bookingError } = await supabase
        .from('bookings')
        .update({
          paid_amount: formData.boat_paid || 0,
          cash_payment: formData.cash_payment || 0,
          card_payment: formData.card_payment || 0,
          contract_signed: formData.contract_signed || false
        })
        .eq('locator', charter.locator);

      if (opsError || bookingError) {
        throw opsError || bookingError;
      }

      toast({
        title: "Success",
        description: "Charter details updated successfully",
      });

      if (onSave) {
        onSave(formData);
      }
    } catch (error) {
      console.error('Error saving charter data:', error);
      toast({
        title: "Error",
        description: "Failed to save charter details. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const getStatusBadge = () => {
    if (formData.cleared_for_departure) {
      return <Badge className="bg-green-500 text-white">Cleared for Departure</Badge>;
    } else if (formData.pre_departure_checks) {
      return <Badge className="bg-yellow-500 text-white">Pre-checks Complete</Badge>;
    } else {
      return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">
              Manual Input - {charter.boat}
            </CardTitle>
            <CardDescription>
              {charter.guest_name} • {charter.locator} • {new Date(charter.charter_date).toLocaleDateString()}
            </CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Financial Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center space-x-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span>💰 Financial Tracking (Green Zone)</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Boat Payment Received</label>
              <Input
                type="number"
                value={formData.boat_paid || ''}
                onChange={(e) => handleInputChange('boat_paid', parseFloat(e.target.value) || 0)}
                placeholder="€0.00"
              />
              <div className="text-xs text-gray-500">
                Total: €{charter.charter_total}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Cash Payment</label>
              <Input
                type="number"
                value={formData.cash_payment || ''}
                onChange={(e) => handleInputChange('cash_payment', parseFloat(e.target.value) || 0)}
                placeholder="€0.00"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Card Payment</label>
              <Input
                type="number"
                value={formData.card_payment || ''}
                onChange={(e) => handleInputChange('card_payment', parseFloat(e.target.value) || 0)}
                placeholder="€0.00"
              />
            </div>
          </div>
        </div>

        {/* Operational Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center space-x-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span>🔧 Operational Status (Green Zone)</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <label className="text-sm font-medium">Pre-departure Checks</label>
                <p className="text-xs text-gray-500">Safety brief and equipment verification</p>
              </div>
              <Switch
                checked={formData.pre_departure_checks || false}
                onCheckedChange={(checked) => handleInputChange('pre_departure_checks', checked)}
              />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <label className="text-sm font-medium">Cleared for Departure</label>
                <p className="text-xs text-gray-500">Final clearance authorization</p>
              </div>
              <Switch
                checked={formData.cleared_for_departure || false}
                onCheckedChange={(checked) => handleInputChange('cleared_for_departure', checked)}
              />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <label className="text-sm font-medium">Contract Signed</label>
                <p className="text-xs text-gray-500">Legal documentation complete</p>
              </div>
              <Switch
                checked={formData.contract_signed || false}
                onCheckedChange={(checked) => handleInputChange('contract_signed', checked)}
              />
            </div>
          </div>
        </div>

        {/* Operational Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center space-x-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span>📝 Operational Details (Green Zone)</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Charter Notes</label>
              <Textarea
                value={formData.charter_notes || ''}
                onChange={(e) => handleInputChange('charter_notes', e.target.value)}
                placeholder="Special instructions, celebrations, requirements..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">F&B Details</label>
              <Textarea
                value={formData.fnb_details || ''}
                onChange={(e) => handleInputChange('fnb_details', e.target.value)}
                placeholder="Catering requirements, dietary restrictions..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Equipment Required</label>
              <Input
                value={formData.equipment_required || ''}
                onChange={(e) => handleInputChange('equipment_required', e.target.value)}
                placeholder="Water toys, snorkeling gear, etc."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">GPS Coordinates</label>
              <Input
                value={formData.gps_coordinates || ''}
                onChange={(e) => handleInputChange('gps_coordinates', e.target.value)}
                placeholder="39.5696° N, 2.6502° E"
              />
            </div>
          </div>
        </div>

        {/* Urgent Notes */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span>🚨 Urgent Notes</span>
            </label>
            <Textarea
              value={formData.urgent_notes || ''}
              onChange={(e) => handleInputChange('urgent_notes', e.target.value)}
              placeholder="Important reminders, special deliveries, time-sensitive information..."
              className="border-red-200 focus:border-red-500"
              rows={2}
            />
          </div>
        </div>

        <Button 
          onClick={handleSave} 
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            'Saving...'
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Charter Details
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
