
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Settings, Plus } from 'lucide-react';
import { DashboardField } from '../DashboardBuilder';

interface FieldMapperProps {
  selectedFields: DashboardField[];
  onFieldsUpdate: (fields: DashboardField[]) => void;
}

export const FieldMapper: React.FC<FieldMapperProps> = ({ selectedFields, onFieldsUpdate }) => {
  const [mappings, setMappings] = useState<Record<string, any>>({});

  const handleFieldMapping = (fieldId: string, mapping: any) => {
    setMappings(prev => ({
      ...prev,
      [fieldId]: mapping
    }));
  };

  const addCalculatedField = () => {
    const newField: DashboardField = {
      id: `calculated.${Date.now()}`,
      name: 'new_calculated_field',
      type: 'number',
      table: 'calculated',
      description: 'User-defined calculated field',
      isUserGenerated: true
    };
    onFieldsUpdate([...selectedFields, newField]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Field Mapping & Transformation
          </CardTitle>
          <CardDescription>
            Configure how fields are processed, transformed, and displayed in your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {selectedFields.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No fields selected for mapping</p>
                <p className="text-xs">Go to Field Discovery to select fields first</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Field Configurations</h3>
                  <Button onClick={addCalculatedField} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Calculated Field
                  </Button>
                </div>

                <div className="space-y-4">
                  {selectedFields.map((field, index) => (
                    <div key={field.id} className="border rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Source Field</Label>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{field.table}</Badge>
                            <ArrowRight className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">{field.name}</span>
                          </div>
                          <div className="text-xs text-gray-600">
                            Type: {field.type} | {field.isUserGenerated ? 'Calculated' : 'Database'}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`display-${field.id}`}>Display Name</Label>
                          <Input
                            id={`display-${field.id}`}
                            defaultValue={field.name.replace(/_/g, ' ')}
                            placeholder="Display name"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`format-${field.id}`}>Format Type</Label>
                          <Select defaultValue={field.type}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="string">Text</SelectItem>
                              <SelectItem value="number">Number</SelectItem>
                              <SelectItem value="currency">Currency (€)</SelectItem>
                              <SelectItem value="percentage">Percentage</SelectItem>
                              <SelectItem value="date">Date</SelectItem>
                              <SelectItem value="datetime">Date & Time</SelectItem>
                              <SelectItem value="boolean">Yes/No</SelectItem>
                              <SelectItem value="badge">Status Badge</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {field.isUserGenerated && (
                        <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                          <Label className="text-sm font-medium text-purple-900">Calculation Formula</Label>
                          <Input
                            className="mt-1"
                            placeholder="e.g., (charter_total - total_costs) / charter_total * 100"
                            defaultValue={field.id.includes('profit_margin') ? '(charter_total - total_costs) / charter_total * 100' : ''}
                          />
                          <p className="text-xs text-purple-700 mt-1">
                            Use field names from your selected fields. Basic math operators supported.
                          </p>
                        </div>
                      )}

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Aggregation Method</Label>
                          <Select defaultValue="none">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">No Aggregation</SelectItem>
                              <SelectItem value="sum">Sum</SelectItem>
                              <SelectItem value="average">Average</SelectItem>
                              <SelectItem value="count">Count</SelectItem>
                              <SelectItem value="min">Minimum</SelectItem>
                              <SelectItem value="max">Maximum</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Sort Order</Label>
                          <Select defaultValue="none">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">No Sorting</SelectItem>
                              <SelectItem value="asc">Ascending</SelectItem>
                              <SelectItem value="desc">Descending</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {index < selectedFields.length - 1 && <Separator className="mt-6" />}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
