
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SecureAuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Home, 
  Calendar, 
  Anchor, 
  Users, 
  BarChart3, 
  Settings, 
  Bell,
  Menu,
  LogOut,
  Activity,
  MessageCircle,
  DollarSign,
  UserCheck,
  Shield,
  Zap,
  TrendingUp
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  title = "Dashboard",
  subtitle = "Welcome to Zatara Mar"
}) => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const userRole = profile?.role || '';

  const getNavigationItems = () => {
    const baseItems = [
      { icon: Home, label: 'Overview', href: '/dashboard', roles: ['all'] },
      { icon: Activity, label: 'Operations Center', href: '/dashboard/operations', roles: ['team', 'agency', 'management', 'owners', 'staff', 'skippers'] },
      { icon: Calendar, label: 'My Bookings', href: '/dashboard/bookings', roles: ['charter_clients', 'boat_club_clients'] },
    ];

    const operationalItems = [
      { icon: Anchor, label: 'Fleet Management', href: '/dashboard/fleet', roles: ['team', 'management', 'owners', 'staff', 'skippers'] },
      { icon: Users, label: 'Team Management', href: '/dashboard/team', roles: ['management', 'owners'] },
      { icon: DollarSign, label: 'Financial Management', href: '/dashboard/financials', roles: ['management', 'owners', 'agency'] },
      { icon: UserCheck, label: 'Guest Experience', href: '/dashboard/guests', roles: ['team', 'agency', 'management', 'owners', 'staff'] },
      { icon: Shield, label: 'Operational Excellence', href: '/dashboard/operations-excellence', roles: ['team', 'management', 'owners', 'staff', 'skippers'] },
    ];

    const analyticsItems = [
      { icon: TrendingUp, label: 'Advanced Analytics', href: '/dashboard/analytics', roles: ['management', 'owners', 'agency'] },
      { icon: Zap, label: 'Automation & Integration', href: '/dashboard/automation', roles: ['management', 'owners', 'agency'] },
    ];

    const allItems = [...baseItems, ...operationalItems, ...analyticsItems];
    
    return allItems.filter(item => 
      item.roles.includes('all') || item.roles.includes(userRole)
    );
  };

  const navigationItems = getNavigationItems();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-luxury transform transition-transform duration-200 ease-in-out z-50 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 border-b border-zatara-gold/20">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/83fe3d22-8bf7-47d2-9462-1954772ef062.png" 
              alt="Zatara" 
              className="h-12 w-auto"
            />
            <div>
              <h1 className="zatara-luxury-script text-lg text-zatara-navy">Zatara Mar</h1>
              <p className="text-xs text-zatara-blue uppercase tracking-wide">Management</p>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-zatara-navy hover:bg-zatara-blue/10 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zatara-gold/20">
          <div className="space-y-2">
            <Link
              to="/dashboard/settings"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-zatara-navy hover:bg-zatara-blue/10 transition-colors w-full"
            >
              <Settings className="h-5 w-5" />
              <span className="font-medium">Settings</span>
            </Link>
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full justify-start"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top header */}
        <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-zatara-gold/20 sticky top-0 z-30">
          <div className="px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-xl font-bold text-zatara-navy">{title}</h1>
                  <p className="text-sm text-zatara-blue">{subtitle}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Bell className="h-5 w-5" />
                </Button>
                <div className="text-right hidden md:block">
                  <div className="text-sm font-medium text-zatara-navy">
                    {profile?.first_name} {profile?.last_name}
                  </div>
                  <div className="text-xs text-zatara-blue capitalize">
                    {profile?.role?.replace('_', ' ')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
