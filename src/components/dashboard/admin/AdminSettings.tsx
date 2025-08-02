import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Settings, Eye, EyeOff, RefreshCw, Shield, Mail, CreditCard, Smartphone, Cog, Building, Globe, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { UserManagement } from './UserManagement';
import { SystemHealthMonitor } from './SystemHealthMonitor';
import { AccessControlMatrix } from './AccessControlMatrix';
import { DashboardBuilder } from './DashboardBuilder';
import { DatabaseSchemaManager } from './DatabaseSchemaManager';
import { FieldAnalysisDashboard } from './FieldAnalysisDashboard';
import { EnhancedFieldMapping } from './EnhancedFieldMapping';
import { SystemActivityLogger } from './SystemActivityLogger';

interface SettingItem {
  setting_key: string;
  setting_value: string;
  setting_type: string;
  description: string;
  category: string;
  is_encrypted: boolean;
}

export const AdminSettings = () => {
  const [settings, setSettings] = useState<SettingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [visiblePasswords, setVisiblePasswords] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const categoryConfig = {
    payments: { icon: CreditCard, label: 'Payment Systems', color: 'text-green-600' },
    email: { icon: Mail, label: 'Email Configuration', color: 'text-blue-600' },
    communications: { icon: Smartphone, label: 'Communications', color: 'text-purple-600' },
    automation: { icon: Cog, label: 'Automation & N8N', color: 'text-orange-600' },
    business: { icon: Building, label: 'Business Settings', color: 'text-gray-600' },
    formatting: { icon: Clock, label: 'Date & Time Formatting', color: 'text-indigo-600' },
    integrations: { icon: Globe, label: 'Platform Integrations', color: 'text-teal-600' },
    platforms: { icon: Globe, label: 'Booking Platforms', color: 'text-indigo-600' },
    system: { icon: Settings, label: 'System Configuration', color: 'text-red-600' }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      console.log('🔍 Fetching admin settings from Supabase...');
      
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*')
        .order('category', { ascending: true })
        .order('setting_key', { ascending: true });

      if (error) {
        console.error('❌ Supabase error:', error);
        throw error;
      }
      
      console.log('✅ Settings loaded successfully:', data?.length || 0, 'settings');
      setSettings(data || []);
      
      if (data && data.length > 0) {
        toast({
          title: "🎉 Settings Loaded Successfully!",
          description: `Loaded ${data.length} configuration settings including LIVE Stripe keys`,
        });
      }
    } catch (error) {
      console.error('❌ Error fetching settings:', error);
      toast({
        title: "⚠️ Error Loading Settings",
        description: "Could not load admin settings. Check database connection.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (settingKey: string, newValue: string) => {
    try {
      console.log(`💾 Updating ${settingKey}...`);
      
      const { error } = await supabase
        .from('admin_settings')
        .update({ 
          setting_value: newValue,
          updated_at: new Date().toISOString(),
          updated_by: 'admin'
        })
        .eq('setting_key', settingKey);

      if (error) throw error;

      setSettings(prev => prev.map(setting => 
        setting.setting_key === settingKey 
          ? { ...setting, setting_value: newValue }
          : setting
      ));

      toast({
        title: "✅ Setting Updated!",
        description: `${settingKey.replace(/_/g, ' ')} has been saved successfully`,
      });
    } catch (error) {
      console.error('❌ Update error:', error);
      toast({
        title: "❌ Save Failed",
        description: `Could not update ${settingKey}`,
        variant: "destructive"
      });
    }
  };

  const togglePasswordVisibility = (settingKey: string) => {
    const newVisible = new Set(visiblePasswords);
    if (newVisible.has(settingKey)) {
      newVisible.delete(settingKey);
    } else {
      newVisible.add(settingKey);
    }
    setVisiblePasswords(newVisible);
  };

  const settingsByCategory = settings.reduce((acc, setting) => {
    if (!acc[setting.category]) {
      acc[setting.category] = [];
    }
    acc[setting.category].push(setting);
    return acc;
  }, {} as Record<string, SettingItem[]>);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-lg font-medium">Loading admin settings...</p>
          <p className="text-sm text-gray-500 mt-2">Connecting to database...</p>
        </div>
      </div>
    );
  };

  const availableCategories = Object.keys(settingsByCategory).filter(cat => 
    settingsByCategory[cat].length > 0 && categoryConfig[cat]
  );

  if (availableCategories.length === 0) {
    return (
      <div className="text-center py-12">
        <Settings className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Settings Found</h3>
        <p className="text-gray-500 mb-4">Could not load admin settings from the database.</p>
        <Button onClick={fetchSettings} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry Loading
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🔧 Admin Settings</h1>
        <p className="text-gray-600">Comprehensive admin panel for Zatara Charter Management System</p>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="system">Health</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="builder">Builder</TabsTrigger>
          <TabsTrigger value="schema">Schema</TabsTrigger>
          <TabsTrigger value="field-analysis">Fields</TabsTrigger>
          <TabsTrigger value="field-mapping">Mapping</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="system">
          <SystemHealthMonitor />
        </TabsContent>

        <TabsContent value="permissions">
          <AccessControlMatrix />
        </TabsContent>

        <TabsContent value="builder">
          <DashboardBuilder />
        </TabsContent>

        <TabsContent value="schema">
          <DatabaseSchemaManager />
        </TabsContent>

        <TabsContent value="field-analysis">
          <FieldAnalysisDashboard />
        </TabsContent>

        <TabsContent value="field-mapping">
          <EnhancedFieldMapping />
        </TabsContent>

        <TabsContent value="activity">
          <SystemActivityLogger />
        </TabsContent>
      </Tabs>

      <Tabs defaultValue={availableCategories[0]} className="w-full mt-8">
        <TabsList className="grid w-full gap-1 mb-6 h-auto p-1" style={{
          gridTemplateColumns: `repeat(${Math.min(availableCategories.length, 4)}, 1fr)`
        }}>
          {availableCategories.map((category) => {
            const config = categoryConfig[category];
            if (!config) return null;
            
            const Icon = config.icon;
            const count = settingsByCategory[category]?.length || 0;
            
            return (
              <TabsTrigger 
                key={category} 
                value={category}
                className="flex flex-col items-center gap-1 p-3 min-h-[70px] text-center"
              >
                <Icon size={18} className={config.color} />
                <span className="text-xs font-medium leading-tight">
                  {config.label}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {count}
                </Badge>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {availableCategories.map((category) => {
          const categorySettings = settingsByCategory[category];
          const config = categoryConfig[category];
          if (!config) return null;
          
          const Icon = config.icon;
          
          return (
            <TabsContent key={category} value={category}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon size={24} className={config.color} />
                    {config.label}
                  </CardTitle>
                  <CardDescription>
                    Configure {config.label.toLowerCase()} settings and API keys for your yacht charter business
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categorySettings.map((setting) => {
                    const isPassword = setting.setting_type === 'password';
                    const isVisible = visiblePasswords.has(setting.setting_key);
                    const isStripeKey = setting.setting_key.includes('stripe');

                    return (
                      <Card 
                        key={setting.setting_key} 
                        className={`border-l-4 ${isStripeKey ? 'border-l-green-500 bg-green-50' : 'border-l-blue-500'}`}
                      >
                        <CardContent className="pt-6">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <Label className="text-sm font-medium">
                                  {setting.setting_key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </Label>
                                {isStripeKey && (
                                  <Badge variant="outline" className="ml-2 text-xs text-red-700">
                                    🔴 LIVE
                                  </Badge>
                                )}
                              </div>
                              {isPassword && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => togglePasswordVisibility(setting.setting_key)}
                                >
                                  {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                                </Button>
                              )}
                            </div>
                            
                            <Input
                              type={isPassword && !isVisible ? 'password' : 'text'}
                              value={setting.setting_value}
                              onChange={(e) => updateSetting(setting.setting_key, e.target.value)}
                              placeholder={setting.description}
                              className="font-mono text-sm"
                            />
                            
                            <p className="text-xs text-gray-500">
                              {setting.description}
                            </p>
                            
                            {setting.is_encrypted && (
                              <Badge variant="secondary" className="text-xs">
                                <Shield size={12} className="mr-1" />
                                Encrypted
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>

      <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center gap-2 text-red-800">
          <Shield size={20} />
          <span className="font-medium">🔒 LIVE Production Environment</span>
        </div>
        <p className="text-red-700 mt-2 text-sm">
          <strong>WARNING:</strong> You are using LIVE Stripe keys. Real payments will be processed. 
          All API keys are secured and only visible to authorized administrators.
        </p>
      </div>
    </div>
  );
};
