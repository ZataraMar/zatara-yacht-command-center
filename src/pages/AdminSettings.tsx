import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, RefreshCw, Eye, EyeOff, AlertTriangle, CheckCircle } from 'lucide-react';
import SettingsService, { SETTING_KEYS } from '@/services/SettingsService';
import { StripeConfig, getStripeEnvironment } from '@/utils/stripe';

interface SettingGroup {
  [key: string]: string;
}

export const AdminSettings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSecrets, setShowSecrets] = useState(false);
  const [stripeEnvironment, setStripeEnvironment] = useState<any>(null);
  
  const [paymentSettings, setPaymentSettings] = useState<SettingGroup>({});
  const [businessSettings, setBusinessSettings] = useState<SettingGroup>({});
  const [communicationSettings, setCommunicationSettings] = useState<SettingGroup>({});
  
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      // Load payment settings
      const paymentData = await SettingsService.getSettingsByCategory('payments');
      setPaymentSettings(paymentData);

      // Load business settings  
      const businessData = await SettingsService.getSettingsByCategory('general');
      setBusinessSettings(businessData);

      // Load communication settings
      const commData = await SettingsService.getSettingsByCategory('communications');
      setCommunicationSettings(commData);

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
        { key: SETTING_KEYS.BUSINESS_NAME, value: 'Zatara Charters', category: 'general', description: 'Business name for invoices and payments' },
        { key: SETTING_KEYS.BUSINESS_EMAIL, value: 'hello@zatara.es', category: 'general', description: 'Business contact email' },
        { key: SETTING_KEYS.WHATSAPP_NUMBER, value: '+34711013403', category: 'communications', description: 'Primary WhatsApp number for customer contact' },
        { key: SETTING_KEYS.BOOKING_CONFIRMATION_EMAIL, value: 'bookings@zatara.es', category: 'communications', description: 'Email for booking confirmations' },
      ];

      for (const setting of defaultSettings) {
        await SettingsService.createSetting(setting.key, setting.value, setting.category, setting.description);
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
                    value={businessSettings[SETTING_KEYS.BUSINESS_NAME] || ''}
                    onChange={(e) => updateSetting('business', SETTING_KEYS.BUSINESS_NAME, e.target.value)}
                    placeholder="Zatara Charters"
                  />
                </div>
                <div>
                  <Label>Business Email</Label>
                  <Input
                    type="email"
                    value={businessSettings[SETTING_KEYS.BUSINESS_EMAIL] || ''}
                    onChange={(e) => updateSetting('business', SETTING_KEYS.BUSINESS_EMAIL, e.target.value)}
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
                    value={communicationSettings[SETTING_KEYS.WHATSAPP_NUMBER] || ''}
                    onChange={(e) => updateSetting('communications', SETTING_KEYS.WHATSAPP_NUMBER, e.target.value)}
                    placeholder="+34711013403"
                  />
                </div>
                <div>
                  <Label>Booking Confirmation Email</Label>
                  <Input
                    type="email"
                    value={communicationSettings[SETTING_KEYS.BOOKING_CONFIRMATION_EMAIL] || ''}
                    onChange={(e) => updateSetting('communications', SETTING_KEYS.BOOKING_CONFIRMATION_EMAIL, e.target.value)}
                    placeholder="bookings@zatara.es"
                  />
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