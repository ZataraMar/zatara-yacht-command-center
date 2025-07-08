import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Settings, Eye, EyeOff, Save, RefreshCw, Shield, Mail, CreditCard, Smartphone, Cog, Building, Globe } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://eefenqehcesevuudtpti.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlZmVucWVoY2VzZXZ1dWR0cHRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1NDY4OTQsImV4cCI6MjAzNDEyMjg5NH0.hGB2-8zTKSN3sw6uHYlGLCw_B5-7HJBOemqJ7dOGxW8';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  const [saving, setSaving] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  // Group settings by category
  const settingsByCategory = settings.reduce((acc, setting) => {
    if (!acc[setting.category]) {
      acc[setting.category] = [];
    }
    acc[setting.category].push(setting);
    return acc;
  }, {} as Record<string, SettingItem[]>);

  const categoryConfig = {
    payments: { icon: CreditCard, label: 'Payment Systems', color: 'text-green-600' },
    email: { icon: Mail, label: 'Email Configuration', color: 'text-blue-600' },
    communications: { icon: Smartphone, label: 'Communications', color: 'text-purple-600' },
    automation: { icon: Cog, label: 'Automation & N8N', color: 'text-orange-600' },
    business: { icon: Building, label: 'Business Settings', color: 'text-gray-600' },
    integrations: { icon: Globe, label: 'Platform Integrations', color: 'text-teal-600' },
    platforms: { icon: Globe, label: 'Booking Platforms', color: 'text-indigo-600' },
    system: { icon: Settings, label: 'System Configuration', color: 'text-red-600' }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*')
        .order('category', { ascending: true })
        .order('setting_key', { ascending: true });

      if (error) throw error;
      setSettings(data || []);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (settingKey: string, newValue: string) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('admin_settings')
        .update({ 
          setting_value: newValue,
          updated_at: new Date().toISOString(),
          updated_by: 'admin'
        })
        .eq('setting_key', settingKey);

      if (error) throw error;

      // Update local state
      setSettings(prev => prev.map(setting => 
        setting.setting_key === settingKey 
          ? { ...setting, setting_value: newValue }
          : setting
      ));

      toast({
        title: "Success",
        description: `${settingKey} updated successfully`,
      });
    } catch (error) {
      console.error('Error updating setting:', error);
      toast({
        title: "Error",
        description: "Failed to update setting",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
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

  const renderSettingInput = (setting: SettingItem) => {
    const isPassword = setting.setting_type === 'password';
    const isVisible = visiblePasswords.has(setting.setting_key);

    return (
      <Card key={setting.setting_key} className="mb-4">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor={setting.setting_key} className="text-sm font-medium">
                {setting.setting_key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Label>
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
            
            <div className="flex gap-2">
              {setting.setting_type === 'text' && (
                <Textarea
                  id={setting.setting_key}
                  value={setting.setting_value}
                  onChange={(e) => updateSetting(setting.setting_key, e.target.value)}
                  placeholder={setting.description}
                  className="min-h-[80px]"
                />
              )}
              
              {setting.setting_type !== 'text' && (
                <Input
                  id={setting.setting_key}
                  type={isPassword && !isVisible ? 'password' : 'text'}
                  value={setting.setting_value}
                  onChange={(e) => updateSetting(setting.setting_key, e.target.value)}
                  placeholder={setting.description}
                />
              )}
            </div>
            
            <p className="text-xs text-gray-500">{setting.description}</p>
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
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Settings</h1>
        <p className="text-gray-600">Manage API keys, integrations, and system configuration</p>
      </div>

      <Tabs defaultValue={Object.keys(settingsByCategory)[0]} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-1">
          {Object.entries(categoryConfig).map(([category, config]) => {
            const Icon = config.icon;
            const count = settingsByCategory[category]?.length || 0;
            
            if (count === 0) return null;
            
            return (
              <TabsTrigger 
                key={category} 
                value={category}
                className="flex flex-col items-center gap-1 py-3"
              >
                <Icon size={16} className={config.color} />
                <span className="text-xs font-medium">{config.label}</span>
                <Badge variant="secondary" className="text-xs">{count}</Badge>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {Object.entries(settingsByCategory).map(([category, categorySettings]) => {
          const config = categoryConfig[category];
          if (!config || categorySettings.length === 0) return null;
          
          const Icon = config.icon;
          
          return (
            <TabsContent key={category} value={category} className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon size={24} className={config.color} />
                    {config.label}
                  </CardTitle>
                  <CardDescription>
                    Configure {config.label.toLowerCase()} settings and API keys
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categorySettings.map(renderSettingInput)}
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>

      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-center gap-2 text-amber-800">
          <Shield size={20} />
          <span className="font-medium">Security Notice</span>
        </div>
        <p className="text-amber-700 mt-2 text-sm">
          These settings contain sensitive API keys and configuration data. Only share with authorized personnel. 
          All password fields are automatically masked for security.
        </p>
      </div>
    </div>
  );
};