
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Clock, AlertCircle, User, Phone, Calendar, MapPin, FileCheck, CreditCard } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ReconciliationItem {
  id: number;
  locator: string;
  guest_name: string;
  boat: string;
  charter_date: string;
  total_guests: number;
  charter_total: number;
  guest_phone: string;
  preparation_status: string;
  
  // Preparation checklist
  initial_contact_sent: boolean;
  contract_sent: boolean;
  contract_signed: boolean;
  paperwork_prepared: boolean;
  skipper_assigned: string;
  
  // Payment verification
  deposit_paid: boolean;
  deposit_amount: number;
  final_payment_paid: boolean;
  final_payment_amount: number;
  payment_method: string;
  payment_verification_complete: boolean;
  
  // Pre-departure
  pre_departure_contact_made: boolean;
  documentation_verified: boolean;
  cleared_for_departure: boolean;
  cleared_by: string;
  cleared_timestamp: string;
  
  // Post-charter
  departure_confirmed: boolean;
  charter_completed: boolean;
  return_inspection_complete: boolean;
  fuel_usage_recorded: boolean;
  issues_reported: string;
  final_reconciliation_complete: boolean;
}

export const CharterReconciliation = () => {
  const [reconciliations, setReconciliations] = useState<ReconciliationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('today');

  useEffect(() => {
    fetchReconciliations();
  }, []);

  const fetchReconciliations = async () => {
    try {
      const { data, error } = await supabase
        .from('charter_reconciliation')
        .select('*')
        .order('charter_date', { ascending: true });

      if (error) throw error;
      setReconciliations(data || []);
    } catch (error) {
      console.error('Error fetching reconciliations:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateReconciliation = async (id: number, updates: Partial<ReconciliationItem>) => {
    try {
      const { error } = await supabase
        .from('charter_reconciliation')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      setReconciliations(prev => 
        prev.map(item => 
          item.id === id ? { ...item, ...updates } : item
        )
      );

      toast({
        title: "Updated",
        description: "Reconciliation item updated successfully.",
      });
    } catch (error) {
      console.error('Error updating reconciliation:', error);
      toast({
        title: "Error",
        description: "Failed to update reconciliation item.",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'issues': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCompletionPercentage = (item: ReconciliationItem) => {
    const checklistItems = [
      item.initial_contact_sent,
      item.contract_sent,
      item.contract_signed,
      item.paperwork_prepared,
      !!item.skipper_assigned,
      item.deposit_paid,
      item.final_payment_paid,
      item.payment_verification_complete,
      item.pre_departure_contact_made,
      item.documentation_verified,
      item.cleared_for_departure
    ];
    
    const completed = checklistItems.filter(Boolean).length;
    return Math.round((completed / checklistItems.length) * 100);
  };

  const ReconciliationCard = ({ item }: { item: ReconciliationItem }) => {
    const completionPercentage = getCompletionPercentage(item);
    const isToday = new Date(item.charter_date).toDateString() === new Date().toDateString();
    
    return (
      <Card className={`${isToday ? 'border-blue-500 border-2' : 'border-gray-200'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center space-x-2">
              <span>{item.guest_name}</span>
              <Badge className={getStatusColor(item.preparation_status)}>
                {item.preparation_status}
              </Badge>
            </CardTitle>
            <div className="text-right">
              <div className="text-sm font-medium">{completionPercentage}% Complete</div>
              <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
          <CardDescription className="space-y-1">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(item.charter_date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{item.boat}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{item.total_guests} guests</span>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <Phone className="h-4 w-4" />
              <span>{item.guest_phone}</span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Preparation Checklist */}
          <div>
            <h4 className="font-medium mb-3 flex items-center space-x-2">
              <FileCheck className="h-4 w-4" />
              <span>Preparation Checklist</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <label className="flex items-center space-x-2">
                <Checkbox 
                  checked={item.initial_contact_sent}
                  onCheckedChange={(checked) => 
                    updateReconciliation(item.id, { initial_contact_sent: checked as boolean })
                  }
                />
                <span>Initial contact sent</span>
              </label>
              <label className="flex items-center space-x-2">
                <Checkbox 
                  checked={item.contract_sent}
                  onCheckedChange={(checked) => 
                    updateReconciliation(item.id, { contract_sent: checked as boolean })
                  }
                />
                <span>Contract sent</span>
              </label>
              <label className="flex items-center space-x-2">
                <Checkbox 
                  checked={item.contract_signed}
                  onCheckedChange={(checked) => 
                    updateReconciliation(item.id, { contract_signed: checked as boolean })
                  }
                />
                <span>Contract signed</span>
              </label>
              <label className="flex items-center space-x-2">
                <Checkbox 
                  checked={item.paperwork_prepared}
                  onCheckedChange={(checked) => 
                    updateReconciliation(item.id, { paperwork_prepared: checked as boolean })
                  }
                />
                <span>Paperwork prepared</span>
              </label>
            </div>
          </div>

          {/* Payment Status */}
          <div>
            <h4 className="font-medium mb-3 flex items-center space-x-2">
              <CreditCard className="h-4 w-4" />
              <span>Payment Status</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <label className="flex items-center space-x-2">
                <Checkbox 
                  checked={item.deposit_paid}
                  onCheckedChange={(checked) => 
                    updateReconciliation(item.id, { deposit_paid: checked as boolean })
                  }
                />
                <span>Deposit paid (€{item.deposit_amount})</span>
              </label>
              <label className="flex items-center space-x-2">
                <Checkbox 
                  checked={item.final_payment_paid}
                  onCheckedChange={(checked) => 
                    updateReconciliation(item.id, { final_payment_paid: checked as boolean })
                  }
                />
                <span>Final payment (€{item.final_payment_amount})</span>
              </label>
              <label className="flex items-center space-x-2">
                <Checkbox 
                  checked={item.payment_verification_complete}
                  onCheckedChange={(checked) => 
                    updateReconciliation(item.id, { payment_verification_complete: checked as boolean })
                  }
                />
                <span>Payment verified</span>
              </label>
            </div>
          </div>

          {/* Pre-Departure */}
          <div>
            <h4 className="font-medium mb-3 flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Pre-Departure</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <label className="flex items-center space-x-2">
                <Checkbox 
                  checked={item.pre_departure_contact_made}
                  onCheckedChange={(checked) => 
                    updateReconciliation(item.id, { pre_departure_contact_made: checked as boolean })
                  }
                />
                <span>Contact made</span>
              </label>
              <label className="flex items-center space-x-2">
                <Checkbox 
                  checked={item.documentation_verified}
                  onCheckedChange={(checked) => 
                    updateReconciliation(item.id, { documentation_verified: checked as boolean })
                  }
                />
                <span>Documents verified</span>
              </label>
              <label className="flex items-center space-x-2">
                <Checkbox 
                  checked={item.cleared_for_departure}
                  onCheckedChange={(checked) => 
                    updateReconciliation(item.id, { 
                      cleared_for_departure: checked as boolean,
                      cleared_timestamp: checked ? new Date().toISOString() : null,
                      cleared_by: checked ? 'Current User' : null
                    })
                  }
                />
                <span className="font-medium">Cleared for departure</span>
              </label>
            </div>
            
            {item.cleared_for_departure && (
              <div className="mt-2 p-2 bg-green-50 rounded border border-green-200">
                <p className="text-sm text-green-700">
                  ✅ Cleared by {item.cleared_by} at {new Date(item.cleared_timestamp).toLocaleString()}
                </p>
              </div>
            )}
          </div>

          <div className="flex space-x-2 pt-2">
            <Button size="sm" variant="outline" className="flex-1">
              <Phone className="h-3 w-3 mr-1" />
              Call Guest
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const filterReconciliations = (filter: string) => {
    const today = new Date().toDateString();
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString();
    
    switch (filter) {
      case 'today':
        return reconciliations.filter(item => 
          new Date(item.charter_date).toDateString() === today
        );
      case 'tomorrow':
        return reconciliations.filter(item => 
          new Date(item.charter_date).toDateString() === tomorrow
        );
      case 'upcoming':
        return reconciliations.filter(item => 
          new Date(item.charter_date) > new Date() && 
          new Date(item.charter_date).toDateString() !== today &&
          new Date(item.charter_date).toDateString() !== tomorrow
        );
      case 'pending':
        return reconciliations.filter(item => 
          item.preparation_status === 'pending' || 
          getCompletionPercentage(item) < 100
        );
      default:
        return reconciliations;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-full">
          <CheckCircle className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zatara-navy">Charter Reconciliation</h2>
          <p className="text-sm text-zatara-blue">Pre-departure checklist and charter preparation</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="today">Today ({filterReconciliations('today').length})</TabsTrigger>
          <TabsTrigger value="tomorrow">Tomorrow ({filterReconciliations('tomorrow').length})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({filterReconciliations('upcoming').length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({filterReconciliations('pending').length})</TabsTrigger>
        </TabsList>

        {['today', 'tomorrow', 'upcoming', 'pending'].map(filter => (
          <TabsContent key={filter} value={filter} className="space-y-4">
            {filterReconciliations(filter).length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No charters found for this category</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {filterReconciliations(filter).map((item) => (
                  <ReconciliationCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
