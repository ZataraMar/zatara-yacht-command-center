
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Calendar, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  Anchor,
  DollarSign,
  UserCheck,
  Zap,
  Target,
  MessageSquare,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/SecureAuthContext';
import { secureSignOut, isOwner } from '@/utils/authSecurity';
import { ZataraLogo } from '@/components/common/ZataraLogo';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { profile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const userRole = profile?.role || '';
  const isOwnerUser = isOwner(userRole);

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: BarChart3, current: location.pathname === '/dashboard' },
    ...(isOwnerUser ? [
      { name: 'Operations', href: '/dashboard/operations', icon: Anchor, current: location.pathname === '/dashboard/operations' },
      { name: 'Fleet Management', href: '/dashboard/fleet', icon: Target, current: location.pathname === '/dashboard/fleet' },
      { name: 'Team', href: '/dashboard/team', icon: Users, current: location.pathname === '/dashboard/team' },
      { name: 'User Management', href: '/dashboard/users', icon: Shield, current: location.pathname === '/dashboard/users' },
      { name: 'Financials', href: '/dashboard/financials', icon: DollarSign, current: location.pathname === '/dashboard/financials' },
      { name: 'Guest Experience', href: '/dashboard/guests', icon: UserCheck, current: location.pathname === '/dashboard/guests' },
      { name: 'Operations Excellence', href: '/dashboard/operations-excellence', icon: Zap, current: location.pathname === '/dashboard/operations-excellence' },
      { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3, current: location.pathname === '/dashboard/analytics' },
      { name: 'Automation', href: '/dashboard/automation', icon: MessageSquare, current: location.pathname === '/dashboard/automation' },
    ] : [
      { name: 'My Bookings', href: '/dashboard/bookings', icon: Calendar, current: location.pathname === '/dashboard/bookings' },
    ]),
    { name: 'Settings', href: '/dashboard/settings', icon: Settings, current: location.pathname === '/dashboard/settings' },
  ];

  const handleSignOut = async () => {
    await secureSignOut();
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile menu */}
      <div className={`fixed inset-0 flex z-40 lg:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-linear duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setSidebarOpen(false)} />
        
        <div className={`relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white transition ease-in-out duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          
          <div className="flex-shrink-0 flex items-center px-4">
            <ZataraLogo variant="full" size="md" />
          </div>
          
          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    item.current
                      ? 'bg-zatara-blue text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-4 h-6 w-6" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow bg-white pt-5 pb-4 overflow-y-auto border-r border-gray-200">
            <div className="flex items-center flex-shrink-0 px-4">
              <ZataraLogo variant="full" size="lg" />
            </div>
            
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 space-y-1 bg-white">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      item.current
                        ? 'bg-zatara-blue text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow border-b border-gray-200">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-zatara-blue lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex-1 px-4 flex justify-between items-center">
            <div className="flex-1 flex">
              <h1 className="text-2xl font-semibold text-zatara-navy">
                {navigation.find(nav => nav.current)?.name || 'Dashboard'}
              </h1>
            </div>
            
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
                <Badge className="ml-1 bg-red-500 text-white">3</Badge>
              </Button>
              
              <div className="flex items-center space-x-3">
                <div className="text-sm text-right">
                  <p className="font-medium text-zatara-navy">{profile?.first_name} {profile?.last_name}</p>
                  <p className="text-zatara-blue capitalize">{userRole?.replace('_', ' ')}</p>
                </div>
                
                <ZataraLogo size="sm" />
                
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-50">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
