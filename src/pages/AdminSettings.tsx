import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, RefreshCw, Eye, EyeOff, AlertTriangle, CheckCircle, Play, Database, MapPin } from 'lucide-react';
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
  
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
    loadAndronauticData();
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
              <div className="flex gap-4">
                <Button 
                  onClick={runAndronauticImport} 
                  disabled={isProcessing}
                  variant="outline"
                >
                  {isProcessing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                  Import Raw Data
                </Button>
                <Button 
                  onClick={runFieldMapping} 
                  disabled={isProcessing}
                >
                  {isProcessing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <MapPin className="h-4 w-4 mr-2" />}
                  Process Field Mapping
                </Button>
                <Button 
                  variant="outline" 
                  onClick={loadAndronauticData}
                  disabled={isProcessing}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Data
                </Button>
              </div>

              {/* Data Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              </div>

              {/* Processing Results */}
              {processingResults.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Latest Processing Results</h4>
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
                </div>
              )}

              {/* Sample Raw Data */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={showRawData}
                    onCheckedChange={setShowRawData}
                  />
                  <Label>Show Sample Raw Data</Label>
                </div>
                
                {showRawData && rawData.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Sample Andronautic Data Structure</h4>
                    <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
                      {JSON.stringify(rawData[0].andronautic_data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>

              {/* Field Mapping Information */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">Field Mapping</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <div><code>locator</code> → <code>bookings.locator</code></div>
                  <div><code>start/end</code> → <code>bookings.start_date/end_date</code></div>
                  <div><code>guest_name</code> → <code>bookings.guest_first_name + guest_surname</code></div>
                  <div><code>phone</code> → <code>bookings.guest_phone</code></div>
                  <div><code>total_amount</code> → <code>bookings.charter_total</code></div>
                  <div className="text-blue-600 text-xs mt-2">And many more automatic field mappings...</div>
                </div>
              </div>
            </CardContent>
          </Card>
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