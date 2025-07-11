import React, { useState } from 'react';
// Fix: Ensure navigation variables are correctly named
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
  Shield,
  Database,
  Globe,
  Cog,
  FileSearch,
  CalendarCheck,
  ChevronDown,
  ChevronRight,
  Wrench,
  Ship,
  Handshake,
  Users2,
  Briefcase,
  Crown
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
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    operations: true,
    fleet: false,
    revenue: false,
    customer: false,
    system: false,
    public: false
  });
  const { profile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const userRole = profile?.role || '';
  const isOwnerUser = isOwner(userRole);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const navigationSections = [
    {
      id: 'operations',
      name: '🚤 Core Operations',
      color: 'text-[#00A3E4]',
      bgColor: 'bg-[#00A3E4]',
      items: [
        { name: 'Dashboard Overview', href: '/dashboard', icon: BarChart3, current: location.pathname === '/dashboard' },
        { name: 'Live Operations', href: '/dashboard/operations', icon: Anchor, current: location.pathname === '/dashboard/operations' },
        { name: 'Bookings Management', href: '/dashboard/bookings-mgmt', icon: Calendar, current: location.pathname === '/dashboard/bookings-mgmt' },
        { name: 'CRM Dashboard', href: '/dashboard/crm', icon: UserCheck, current: location.pathname === '/dashboard/crm' },
      ]
    },
    {
      id: 'fleet',
      name: '⚓ Fleet & Crew',
      color: 'text-[#00A3E4]',
      bgColor: 'bg-[#00A3E4]',
      items: [
        { name: 'Fleet Overview', href: '/dashboard/fleet', icon: Ship, current: location.pathname === '/dashboard/fleet' },
        { name: 'Boat Content', href: '/dashboard/boat-content', icon: Target, current: location.pathname === '/dashboard/boat-content' },
        { name: 'Skipper & Crew', href: '/dashboard/crew', icon: Users2, current: location.pathname === '/dashboard/crew' },
        { name: 'Maintenance & Works', href: '/dashboard/maintenance', icon: Wrench, current: location.pathname === '/dashboard/maintenance' },
        { name: 'Boats For Sale', href: '/dashboard/brokerage', icon: Crown, current: location.pathname === '/dashboard/brokerage' },
      ]
    },
    {
      id: 'revenue',
      name: '💰 Revenue Management',
      color: 'text-[#CCCC33]',
      bgColor: 'bg-[#CCCC33]',
      items: [
        { name: 'Pricing & Discounts', href: '/dashboard/pricing', icon: DollarSign, current: location.pathname === '/dashboard/pricing' },
        { name: 'Extras Management', href: '/dashboard/extras', icon: Zap, current: location.pathname === '/dashboard/extras' },
        { name: 'Financial Overview', href: '/dashboard/financials', icon: BarChart3, current: location.pathname === '/dashboard/financials' },
        { name: 'Sales Partners', href: '/dashboard/partners', icon: Handshake, current: location.pathname === '/dashboard/partners' },
      ]
    },
    {
      id: 'customer',
      name: '👥 Customer & Team',
      color: 'text-[#D4AF37]',
      bgColor: 'bg-[#D4AF37]',
      items: [
        { name: 'Guest Experience', href: '/dashboard/guests', icon: UserCheck, current: location.pathname === '/dashboard/guests' },
        { name: 'Boat Club Management', href: '/dashboard/boat-club', icon: Users, current: location.pathname === '/dashboard/boat-club' },
        { name: 'Team Management', href: '/dashboard/team', icon: Users, current: location.pathname === '/dashboard/team' },
        { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3, current: location.pathname === '/dashboard/analytics' },
      ]
    },
    {
      id: 'system',
      name: '⚙️ System & Admin',
      color: 'text-[#333333]',
      bgColor: 'bg-[#333333]',
      items: [
        { name: 'Project Management', href: '/dashboard/projects', icon: Briefcase, current: location.pathname === '/dashboard/projects' },
        { name: 'User Management', href: '/dashboard/users', icon: Shield, current: location.pathname === '/dashboard/users' },
        { name: 'Admin Settings', href: '/dashboard/admin-settings', icon: Cog, current: location.pathname === '/dashboard/admin-settings' },
        { name: 'Field Analysis', href: '/dashboard/field-analysis', icon: FileSearch, current: location.pathname === '/dashboard/field-analysis' },
        { name: 'Automation', href: '/dashboard/automation', icon: MessageSquare, current: location.pathname === '/dashboard/automation' },
      ]
    },
    {
      id: 'public',
      name: '🌐 Public & Marketing',
      color: 'text-[#66D9EF]',
      bgColor: 'bg-[#66D9EF]',
      items: [
        { name: 'Landing Pages', href: '/dashboard/landing-pages', icon: Globe, current: location.pathname === '/dashboard/landing-pages' },
        { name: 'Calendar Sync', href: '/dashboard/calendar-sync', icon: CalendarCheck, current: location.pathname === '/dashboard/calendar-sync' },
        { name: 'Operations Excellence', href: '/dashboard/operations-excellence', icon: Zap, current: location.pathname === '/dashboard/operations-excellence' },
      ]
    }
  ];

  const clientNavigation = [
    { name: 'My Bookings', href: '/dashboard/bookings', icon: Calendar, current: location.pathname === '/dashboard/bookings' },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings, current: location.pathname === '/dashboard/settings' },
  ];

  const getCurrentPageName = () => {
    if (!isOwnerUser) {
      const clientItem = clientNavigation.find(item => item.current);
      return clientItem?.name || 'Dashboard';
    }
    
    for (const section of navigationSections) {
      const activeItem = section.items.find(item => item.current);
      if (activeItem) {
        return activeItem.name;
      }
    }
    return 'Dashboard';
  };

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
            <nav className="px-2 space-y-2">
              {isOwnerUser ? (
                navigationSections.map((section) => (
                  <div key={section.id} className="space-y-1">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className={`w-full flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md transition-colors ${section.color} hover:bg-gray-50`}
                      style={{ fontFamily: 'Tw Cen MT, sans-serif' }}
                    >
                      <span className="text-xs font-semibold uppercase tracking-wide">{section.name}</span>
                      {expandedSections[section.id] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    {expandedSections[section.id] && (
                      <div className="ml-2 space-y-1 border-l-2 border-gray-200 pl-2">
                        {section.items.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={`${
                              item.current
                                ? 'bg-[#00A3E4] text-white'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors`}
                            onClick={() => setSidebarOpen(false)}
                          >
                            <item.icon className="mr-3 h-4 w-4" />
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                clientNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      item.current
                        ? 'bg-[#00A3E4] text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="mr-4 h-6 w-6" />
                    {item.name}
                  </Link>
                ))
              )}
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
              <nav className="flex-1 px-2 space-y-2 bg-white">
                {isOwnerUser ? (
                  navigationSections.map((section) => (
                    <div key={section.id} className="space-y-1">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className={`w-full flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md transition-colors ${section.color} hover:bg-gray-50`}
                        style={{ fontFamily: 'Tw Cen MT, sans-serif' }}
                      >
                        <span className="text-xs font-semibold uppercase tracking-wide">{section.name}</span>
                        {expandedSections[section.id] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      {expandedSections[section.id] && (
                        <div className="ml-2 space-y-1 border-l-2 border-gray-200 pl-2">
                          {section.items.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              className={`${
                                item.current
                                  ? 'bg-[#00A3E4] text-white'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                              } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors`}
                            >
                              <item.icon className="mr-3 h-4 w-4" />
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  clientNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${
                        item.current
                          ? 'bg-[#00A3E4] text-white'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors`}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  ))
                )}
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
              <h1 className="text-2xl font-semibold text-zatara-navy" style={{ fontFamily: 'Cosmoball, cursive' }}>
                {getCurrentPageName()}
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
