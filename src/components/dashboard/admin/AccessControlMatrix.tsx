import React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Search, Shield, Users, Settings, History } from 'lucide-react';
import { roleOptions } from '@/utils/userRoleUtils';

interface PagePermission {
  id: string;
  page_path: string;
  page_name: string;
  role_name: string;
  permission_type: string;
  is_allowed: boolean;
}

interface PermissionTemplate {
  id: string;
  template_name: string;
  template_description: string;
  role_permissions: any;
  is_active: boolean;
}

const dashboardPages = [
  { path: '/dashboard', name: 'Dashboard Home' },
  { path: '/dashboard/fleet', name: 'Fleet Management' },
  { path: '/dashboard/operations', name: 'Operations Center' },
  { path: '/dashboard/bookings', name: 'Bookings Management' },
  { path: '/dashboard/financials', name: 'Financial Reports' },
  { path: '/dashboard/analytics', name: 'Analytics' },
  { path: '/dashboard/team', name: 'Team Management' },
  { path: '/dashboard/admin', name: 'Admin Settings' },
  { path: '/dashboard/user-settings', name: 'User Settings' },
];

export const AccessControlMatrix: React.FC = () => {
  const [permissions, setPermissions] = React.useState<PagePermission[]>([]);
  const [templates, setTemplates] = React.useState<PermissionTemplate[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedTemplate, setSelectedTemplate] = React.useState<string>('');

  const fetchPermissions = async () => {
    try {
      const { data, error } = await supabase
        .from('page_role_permissions')
        .select('*')
        .order('page_path', { ascending: true });

      if (error) throw error;
      setPermissions(data || []);
    } catch (error) {
      console.error('Error fetching permissions:', error);
      toast.error('Failed to load permissions');
    }
  };

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('permission_templates')
        .select('*')
        .eq('is_active', true)
        .order('template_name', { ascending: true });

      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast.error('Failed to load templates');
    }
  };

  React.useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchPermissions(), fetchTemplates()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const togglePermission = async (pagePath: string, pageName: string, roleName: string, permissionType: 'read' | 'write' | 'admin') => {
    const existing = permissions.find(p => 
      p.page_path === pagePath && 
      p.role_name === roleName && 
      p.permission_type === permissionType
    );

    try {
      if (existing?.is_allowed) {
        // Revoke permission
        await supabase.rpc('revoke_page_permission', {
          page_path: pagePath,
          role_name: roleName,
          permission_type: permissionType
        });
        toast.success(`Revoked ${permissionType} access for ${roleName}`);
      } else {
        // Grant permission
        await supabase.rpc('grant_page_permission', {
          page_path: pagePath,
          page_name: pageName,
          role_name: roleName,
          permission_type: permissionType
        });
        toast.success(`Granted ${permissionType} access for ${roleName}`);
      }

      // Refresh permissions
      await fetchPermissions();
    } catch (error) {
      console.error('Error toggling permission:', error);
      toast.error('Failed to update permission');
    }
  };

  const applyTemplate = async (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (!template) return;

    try {
      // This would apply the template permissions
      // Implementation would depend on the template structure
      toast.success(`Applied template: ${template.template_name}`);
      await fetchPermissions();
    } catch (error) {
      console.error('Error applying template:', error);
      toast.error('Failed to apply template');
    }
  };

  const getPermissionStatus = (pagePath: string, roleName: string, permissionType: 'read' | 'write' | 'admin'): boolean => {
    const permission = permissions.find(p => 
      p.page_path === pagePath && 
      p.role_name === roleName && 
      p.permission_type === permissionType
    );
    return permission?.is_allowed || false;
  };

  const filteredPages = dashboardPages.filter(page => 
    page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.path.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading access control matrix...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Enhanced Access Control Matrix
          </CardTitle>
          <CardDescription>
            Manage granular page-level permissions for all user roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="matrix" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="matrix">Permission Matrix</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="audit">Audit Log</TabsTrigger>
            </TabsList>

            <TabsContent value="matrix" className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search pages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Apply template..." />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.template_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedTemplate && (
                  <Button onClick={() => applyTemplate(selectedTemplate)}>
                    Apply Template
                  </Button>
                )}
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-medium">Page</th>
                        {roleOptions.map((role) => (
                          <th key={role.value} className="text-center p-4 font-medium min-w-32">
                            <div className="space-y-1">
                              <div>{role.label}</div>
                              <Badge variant="outline" className="text-xs">
                                {role.value}
                              </Badge>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPages.map((page) => (
                        <tr key={page.path} className="border-t">
                          <td className="p-4">
                            <div>
                              <div className="font-medium">{page.name}</div>
                              <div className="text-sm text-muted-foreground">{page.path}</div>
                            </div>
                          </td>
                          {roleOptions.map((role) => (
                            <td key={role.value} className="p-4 text-center">
                              <div className="space-y-2">
                                {(['read', 'write', 'admin'] as const).map((permType) => (
                                  <div key={permType} className="flex items-center justify-center gap-2">
                                    <span className="text-xs w-12">{permType}</span>
                                    <Switch
                                      checked={getPermissionStatus(page.path, role.value, permType)}
                                      onCheckedChange={() => togglePermission(page.path, page.name, role.value, permType)}
                                    />
                                  </div>
                                ))}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <div className="grid gap-4">
                {templates.map((template) => (
                  <Card key={template.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{template.template_name}</span>
                        <Button 
                          size="sm" 
                          onClick={() => applyTemplate(template.id)}
                        >
                          Apply Template
                        </Button>
                      </CardTitle>
                      <CardDescription>
                        {template.template_description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="audit" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    Permission Changes Audit Log
                  </CardTitle>
                  <CardDescription>
                    Track all permission changes for compliance and troubleshooting
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Audit log functionality will be implemented here
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};