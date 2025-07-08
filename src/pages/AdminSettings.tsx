import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  Loader2, Save, RefreshCw, Eye, EyeOff, AlertTriangle, CheckCircle, 
  Play, Database, MapPin, Search, FileText, Settings, Users
} from 'lucide-react';
import SettingsService, { SETTING_KEYS } from '@/services/SettingsService';
import { StripeConfig, getStripeEnvironment } from '@/utils/stripe';
import { supabase } from '@/integrations/supabase/client';

interface SettingGroup {
  [key: string]: string;
}

interface AndronauticData {
  id: number;
  andronautic_data: any;
  imported_at: string;
  processed_at?: string;
}

interface ProcessingResult {
  locator: string;
  status: 'success' | 'error';
  action?: 'created' | 'updated';
  error?: string;
}

interface FieldMapping {
  id: number;
  andronautic_field: string;
  supabase_field: string | null;
  field_type: string;
  is_mapped: boolean;
  is_required: boolean;
  default_value: string | null;
  transformation_rule: string | null;
  notes: string | null;
}

interface FieldAnalysis {
  andronautic_field: string;
  sample_values: string[];
  data_type: string;
  frequency: number;
  suggested_mapping: string | null;
}

export const AdminSettings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSecrets, setShowSecrets] = useState(false);
  const [stripeEnvironment, setStripeEnvironment] = useState<any>(null);
  
  const [paymentSettings, setPaymentSettings] = useState<SettingGroup>({});
  const [businessSettings, setBusinessSettings] = useState<SettingGroup>({});
  const [communicationSettings, setCommunicationSettings] = useState<SettingGroup>({});
  
  // Andronautic Integration State
  const [isProcessing, setIsProcessing] = useState(false);
  const [rawData, setRawData] = useState<AndronauticData[]>([]);
  const [processingResults, setProcessingResults] = useState<ProcessingResult[]>([]);
  const [showRawData, setShowRawData] = useState(false);
  
  // Field Mapping State
  const [fieldMappings, setFieldMappings] = useState<FieldMapping[]>([]);
  const [fieldAnalysis, setFieldAnalysis] = useState<FieldAnalysis[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [mappingFilter, setMappingFilter] = useState<'all' | 'mapped' | 'unmapped' | 'manual'>('all');
  
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
    loadAndronauticData();
    loadFieldMappings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      // Load payment settings
      const paymentData = await SettingsService.getSettingsByCategory('payments');
      const paymentSettings = paymentData.reduce((acc, setting) => ({ ...acc, [setting.setting_key]: setting.setting_value }), {});
      setPaymentSettings(paymentSettings);

      // Load business settings  
      const businessData = await SettingsService.getSettingsByCategory('general');
      const businessSettings = businessData.reduce((acc, setting) => ({ ...acc, [setting.setting_key]: setting.setting_value }), {});
      setBusinessSettings(businessSettings);

      // Load communication settings
      const commData = await SettingsService.getSettingsByCategory('communications');
      const commSettings = commData.reduce((acc, setting) => ({ ...acc, [setting.setting_key]: setting.setting_value }), {});
      setCommunicationSettings(commSettings);

      // Check Stripe environment
      const stripeEnv = await getStripeEnvironment();
      setStripeEnvironment(stripeEnv);

    } catch (error) {
      console.error('Failed to load settings:', error);
      toast({
        title: "Error Loading Settings",
        description: "Failed to load configuration. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadAndronauticData = async () => {
    try {
      // Get raw bookings data
      const { data: rawBookings, error } = await supabase
        .from('raw_bookings')
        .select('*')
        .order('imported_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setRawData(rawBookings || []);
    } catch (error) {
      console.error('Failed to load Andronautic data:', error);
    }
  };

  const loadFieldMappings = async () => {
    try {
      const { data: mappings, error } = await supabase
        .from('andronautic_field_mappings')
        .select('*')
        .order('is_mapped', { ascending: false })
        .order('andronautic_field');

      if (error) throw error;
      setFieldMappings(mappings || []);
    } catch (error) {
      console.error('Failed to load field mappings:', error);
    }
  };

  const analyzeFields = async () => {
    setIsAnalyzing(true);
    try {
      console.log('🔍 Analyzing Andronautic field structure...');
      
      const { data, error } = await supabase.functions.invoke('analyze-andronautic-fields');
      
      if (error) throw error;

      console.log('✅ Field analysis completed:', data);
      setFieldAnalysis(data.field_analysis || []);
      
      toast({
        title: "Field Analysis Complete",
        description: `Discovered ${data.fields_discovered} unique fields`,
        variant: "default"
      });

      // Reload mappings to see updates
      await loadFieldMappings();

    } catch (error) {
      console.error('❌ Field analysis failed:', error);
      toast({
        title: "Field Analysis Failed",
        description: error.message || 'Unknown error occurred',
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const updateFieldMapping = async (id: number, updates: Partial<FieldMapping>) => {
    try {
      const { error } = await supabase
        .from('andronautic_field_mappings')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setFieldMappings(prev => prev.map(mapping => 
        mapping.id === id ? { ...mapping, ...updates } : mapping
      ));

    } catch (error) {
      console.error('Failed to update field mapping:', error);
      toast({
        title: "Update Failed",
        description: "Failed to save field mapping",
        variant: "destructive"
      });
    }
  };

  const runFieldMapping = async () => {
    setIsProcessing(true);
    setProcessingResults([]);
    
    try {
      console.log('🔄 Starting field mapping process...');
      
      const { data, error } = await supabase.functions.invoke('process-andronautic-data');
      
      if (error) throw error;

      console.log('✅ Field mapping completed:', data);
      setProcessingResults(data.results || []);
      
      toast({
        title: "Field Mapping Complete",
        description: `Processed ${data.processed} bookings, ${data.errors} errors`,
        variant: data.errors > 0 ? "destructive" : "default"
      });

      // Reload data to see updates
      await loadAndronauticData();

    } catch (error) {
      console.error('❌ Field mapping failed:', error);
      toast({
        title: "Field Mapping Failed",
        description: error.message || 'Unknown error occurred',
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const runAndronauticImport = async () => {
    setIsProcessing(true);
    
    try {
      console.log('📥 Starting Andronautic import...');
      
      const { data, error } = await supabase.functions.invoke('andronautic-import');
      
      if (error) throw error;

      console.log('✅ Import completed:', data);
      
      toast({
        title: "Import Complete",
        description: `Imported ${data.bookings_imported} bookings, ${data.invoices_imported} invoices`,
        variant: "default"
      });

      // Reload data to see new imports
      await loadAndronauticData();

    } catch (error) {
      console.error('❌ Import failed:', error);
      toast({
        title: "Import Failed",
        description: error.message || 'Unknown error occurred',
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const updateSetting = (category: string, key: string, value: string) => {
    if (category === 'payments') {
      setPaymentSettings(prev => ({ ...prev, [key]: value }));
    } else if (category === 'business') {
      setBusinessSettings(prev => ({ ...prev, [key]: value }));
    } else if (category === 'communications') {
      setCommunicationSettings(prev => ({ ...prev, [key]: value }));
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      const allSettings = { ...paymentSettings, ...businessSettings, ...communicationSettings };
      
      // Save each setting
      const savePromises = Object.entries(allSettings).map(([key, value]) =>
        SettingsService.updateSetting(key, value, 'admin')
      );

      await Promise.all(savePromises);

      // Refresh Stripe configuration
      await StripeConfig.refresh();
      const stripeEnv = await getStripeEnvironment();
      setStripeEnvironment(stripeEnv);

      toast({
        title: "Settings Saved",
        description: "All configuration has been updated successfully.",
        variant: "default"
      });

    } catch (error) {
      console.error('Failed to save settings:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const createMissingSettings = async () => {
    setIsSaving(true);
    try {
      // Create default settings if they don't exist
      const defaultSettings = [
        { key: SETTING_KEYS.STRIPE_PUBLISHABLE_KEY_TEST, value: '', category: 'payments', description: 'Stripe publishable key for test environment' },
        { key: SETTING_KEYS.STRIPE_SECRET_KEY_TEST, value: '', category: 'payments', description: 'Stripe secret key for test environment' },
        { key: SETTING_KEYS.STRIPE_WEBHOOK_SECRET, value: '', category: 'payments', description: 'Stripe webhook secret for payment confirmations' },
        { key: SETTING_KEYS.PAYMENT_CURRENCY, value: 'EUR', category: 'payments', description: 'Default currency for payments' },
        { key: SETTING_KEYS.PAYMENT_COUNTRY, value: 'ES', category: 'payments', description: 'Country code for payment processing' },
        { key: SETTING_KEYS.ENVIRONMENT_MODE, value: 'test', category: 'payments', description: 'Current environment mode (test/live)' },
        { key: SETTING_KEYS.COMPANY_NAME, value: 'Zatara Charters', category: 'general', description: 'Business name for invoices and payments' },
        { key: SETTING_KEYS.COMPANY_EMAIL, value: 'hello@zatara.es', category: 'general', description: 'Business contact email' },
        { key: SETTING_KEYS.WHATSAPP_PHONE_NUMBER, value: '+34711013403', category: 'communications', description: 'Primary WhatsApp number for customer contact' },
        { key: SETTING_KEYS.BOOKING_CONFIRMATION_TEMPLATE, value: 'bookings@zatara.es', category: 'communications', description: 'Email for booking confirmations' },
      ];

      for (const setting of defaultSettings) {
        await SettingsService.updateSetting(setting.key, setting.value, 'admin');
      }

      toast({
        title: "Settings Initialized",
        description: "Default settings have been created. Please refresh to see them.",
        variant: "default"
      });

      // Reload settings
      setTimeout(() => loadSettings(), 1000);

    } catch (error) {
      console.error('Failed to create settings:', error);
      toast({
        title: "Initialization Failed",
        description: "Failed to create default settings.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const maskSecret = (value: string) => {
    if (!value || value.length < 8) return value;
    return value.substring(0, 8) + '•'.repeat(Math.max(0, value.length - 8));
  };

  const getFilteredMappings = () => {
    switch (mappingFilter) {
      case 'mapped':
        return fieldMappings.filter(m => m.is_mapped && m.supabase_field);
      case 'unmapped':
        return fieldMappings.filter(m => !m.is_mapped || !m.supabase_field);
      case 'manual':
        return fieldMappings.filter(m => m.andronautic_field.startsWith('_MANUAL_'));
      default:
        return fieldMappings;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Settings</h1>
          <p className="text-gray-600">Manage application configuration and API keys</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadSettings} disabled={isSaving}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={saveSettings} disabled={isSaving}>
            {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Save All
          </Button>
        </div>
      </div>

      {/* Stripe Status Card */}
      {stripeEnvironment && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {stripeEnvironment.isConfigured ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              )}
              Stripe Configuration Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium">Status:</span>
                <span className={`ml-2 ${stripeEnvironment.isConfigured ? 'text-green-600' : 'text-yellow-600'}`}>
                  {stripeEnvironment.isConfigured ? 'Configured' : 'Not Configured'}
                </span>
              </div>
              <div>
                <span className="font-medium">Mode:</span>
                <span className="ml-2">{stripeEnvironment.mode}</span>
              </div>
              <div>
                <span className="font-medium">Currency:</span>
                <span className="ml-2">{stripeEnvironment.currency}</span>
              </div>
              <div>
                <span className="font-medium">Country:</span>
                <span className="ml-2">{stripeEnvironment.country}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="payments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="payments">Payment Settings</TabsTrigger>
          <TabsTrigger value="business">Business Settings</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="andronautic">Andronautic Integration</TabsTrigger>
        </TabsList>

        {/* Payment Settings */}
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stripe Configuration</CardTitle>
              <CardDescription>Configure Stripe payment processing for your charter bookings</CardDescription>
              <div className="flex items-center gap-2">
                <Switch
                  checked={showSecrets}
                  onCheckedChange={setShowSecrets}
                />
                <Label className="flex items-center gap-1">
                  {showSecrets ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  Show API Keys
                </Label>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Test Publishable Key</Label>
                  <Input
                    type={showSecrets ? 'text' : 'password'}
                    value={paymentSettings[SETTING_KEYS.STRIPE_PUBLISHABLE_KEY_TEST] || ''}
                    onChange={(e) => updateSetting('payments', SETTING_KEYS.STRIPE_PUBLISHABLE_KEY_TEST, e.target.value)}
                    placeholder="pk_test_..."
                  />
                </div>
                <div>
                  <Label>Test Secret Key</Label>
                  <Input
                    type={showSecrets ? 'text' : 'password'}
                    value={paymentSettings[SETTING_KEYS.STRIPE_SECRET_KEY_TEST] || ''}
                    onChange={(e) => updateSetting('payments', SETTING_KEYS.STRIPE_SECRET_KEY_TEST, e.target.value)}
                    placeholder="sk_test_..."
                  />
                </div>
                <div>
                  <Label>Webhook Secret</Label>
                  <Input
                    type={showSecrets ? 'text' : 'password'}
                    value={paymentSettings[SETTING_KEYS.STRIPE_WEBHOOK_SECRET] || ''}
                    onChange={(e) => updateSetting('payments', SETTING_KEYS.STRIPE_WEBHOOK_SECRET, e.target.value)}
                    placeholder="whsec_..."
                  />
                </div>
                <div>
                  <Label>Environment Mode</Label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={paymentSettings[SETTING_KEYS.ENVIRONMENT_MODE] || 'test'}
                    onChange={(e) => updateSetting('payments', SETTING_KEYS.ENVIRONMENT_MODE, e.target.value)}
                  >
                    <option value="test">Test</option>
                    <option value="live">Live</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Business Settings */}
        <TabsContent value="business" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Basic business details for invoices and communications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Business Name</Label>
                  <Input
                    value={businessSettings[SETTING_KEYS.COMPANY_NAME] || ''}
                    onChange={(e) => updateSetting('business', SETTING_KEYS.COMPANY_NAME, e.target.value)}
                    placeholder="Zatara Charters"
                  />
                </div>
                <div>
                  <Label>Business Email</Label>
                  <Input
                    type="email"
                    value={businessSettings[SETTING_KEYS.COMPANY_EMAIL] || ''}
                    onChange={(e) => updateSetting('business', SETTING_KEYS.COMPANY_EMAIL, e.target.value)}
                    placeholder="hello@zatara.es"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Communication Settings */}
        <TabsContent value="communications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Communication Channels</CardTitle>
              <CardDescription>Configure customer communication methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>WhatsApp Number</Label>
                  <Input
                    value={communicationSettings[SETTING_KEYS.WHATSAPP_PHONE_NUMBER] || ''}
                    onChange={(e) => updateSetting('communications', SETTING_KEYS.WHATSAPP_PHONE_NUMBER, e.target.value)}
                    placeholder="+34711013403"
                  />
                </div>
                <div>
                  <Label>Booking Confirmation Email</Label>
                  <Input
                    type="email"
                    value={communicationSettings[SETTING_KEYS.BOOKING_CONFIRMATION_TEMPLATE] || ''}
                    onChange={(e) => updateSetting('communications', SETTING_KEYS.BOOKING_CONFIRMATION_TEMPLATE, e.target.value)}
                    placeholder="bookings@zatara.es"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Andronautic Integration */}
        <TabsContent value="andronautic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Andronautic Data Integration
              </CardTitle>
              <CardDescription>
                Import and process booking data from Andronautic API into your Supabase database
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Control Panel */}
              <div className="flex gap-2 flex-wrap">
                <Button 
                  onClick={runAndronauticImport} 
                  disabled={isProcessing || isAnalyzing}
                  variant="outline"
                  size="sm"
                >
                  {isProcessing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                  Import Raw Data
                </Button>
                <Button 
                  onClick={analyzeFields} 
                  disabled={isProcessing || isAnalyzing}
                  variant="outline"
                  size="sm"
                >
                  {isAnalyzing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
                  Analyze Fields
                </Button>
                <Button 
                  onClick={runFieldMapping} 
                  disabled={isProcessing || isAnalyzing}
                  size="sm"
                >
                  {isProcessing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <MapPin className="h-4 w-4 mr-2" />}
                  Process Data
                </Button>
                <Button 
                  variant="outline" 
                  onClick={loadAndronauticData}
                  disabled={isProcessing || isAnalyzing}
                  size="sm"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>

              {/* Data Status */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{rawData.length}</div>
                  <div className="text-sm text-blue-600">Raw Records</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {rawData.filter(r => r.processed_at).length}
                  </div>
                  <div className="text-sm text-green-600">Processed</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {rawData.filter(r => !r.processed_at).length}
                  </div>
                  <div className="text-sm text-yellow-600">Pending</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{fieldMappings.length}</div>
                  <div className="text-sm text-purple-600">Field Mappings</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Field Mapping Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Field Mapping Configuration
              </CardTitle>
              <CardDescription>
                Configure how Andronautic fields map to your Supabase database columns
              </CardDescription>
              <div className="flex gap-2">
                <Button 
                  variant={mappingFilter === 'all' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setMappingFilter('all')}
                >
                  All ({fieldMappings.length})
                </Button>
                <Button 
                  variant={mappingFilter === 'mapped' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setMappingFilter('mapped')}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Mapped ({fieldMappings.filter(m => m.is_mapped && m.supabase_field).length})
                </Button>
                <Button 
                  variant={mappingFilter === 'unmapped' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setMappingFilter('unmapped')}
                >
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Unmapped ({fieldMappings.filter(m => !m.is_mapped || !m.supabase_field).length})
                </Button>
                <Button 
                  variant={mappingFilter === 'manual' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setMappingFilter('manual')}
                >
                  <Users className="h-4 w-4 mr-1" />
                  Manual ({fieldMappings.filter(m => m.andronautic_field.startsWith('_MANUAL_')).length})
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {getFilteredMappings().map((mapping) => (
                  <div key={mapping.id} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={mapping.is_mapped}
                          onCheckedChange={(checked) => updateFieldMapping(mapping.id, { is_mapped: checked })}
                        />
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {mapping.andronautic_field.startsWith('_MANUAL_') 
                            ? mapping.andronautic_field.replace('_MANUAL_', '🔧 ')
                            : mapping.andronautic_field
                          }
                        </code>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {mapping.field_type}
                        </span>
                      </div>
                      {mapping.is_required && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Required</span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">Supabase Field</Label>
                        <Input
                          value={mapping.supabase_field || ''}
                          onChange={(e) => updateFieldMapping(mapping.id, { supabase_field: e.target.value })}
                          placeholder="Select target field..."
                          className="text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Default Value</Label>
                        <Input
                          value={mapping.default_value || ''}
                          onChange={(e) => updateFieldMapping(mapping.id, { default_value: e.target.value })}
                          placeholder="Default value..."
                          className="text-sm"
                        />
                      </div>
                    </div>
                    
                    {mapping.notes && (
                      <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                        {mapping.notes}
                      </div>
                    )}
                  </div>
                ))}
                
                {getFilteredMappings().length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4" />
                    <p>No field mappings found for this filter.</p>
                    <p className="text-sm">Try running "Analyze Fields" to discover Andronautic data structure.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Processing Results */}
          {processingResults.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Latest Processing Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto">
                  {processingResults.map((result, index) => (
                    <div key={index} className="flex justify-between items-center py-1">
                      <span className="font-mono text-sm">{result.locator}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        result.status === 'success' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {result.status === 'success' ? result.action : result.error}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Sample Raw Data */}
          {showRawData && rawData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Sample Raw Data</CardTitle>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={showRawData}
                    onCheckedChange={setShowRawData}
                  />
                  <Label>Show Sample Raw Data</Label>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="text-xs bg-gray-50 p-3 rounded border overflow-x-auto max-h-60">
                  {JSON.stringify(rawData[0].andronautic_data, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Initialize Settings Button */}
      {Object.keys(paymentSettings).length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Initialize Settings</CardTitle>
            <CardDescription>It looks like this is the first time setting up. Create default settings?</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={createMissingSettings} disabled={isSaving}>
              {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
              Create Default Settings
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminSettings;