import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Calendar, Users, Settings, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { icon: Home, label: 'Home', path: '/dashboard' },
  { icon: Calendar, label: 'Operations', path: '/dashboard/operations' },
  { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: Users, label: 'CRM', path: '/dashboard/crm' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' }
];

export const MobileNavigation: React.FC = () => {
  const location = useLocation();

  if (!location.pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 safe-area-pb">
      <div className="flex justify-around items-center h-16 px-2">
        {navigationItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path || 
                          (path !== '/dashboard' && location.pathname.startsWith(path));
          
          return (
            <NavLink
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center justify-center min-w-0 flex-1 py-1 px-1 text-xs transition-colors",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5 mb-1", isActive && "text-primary")} />
              <span className="truncate">{label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};