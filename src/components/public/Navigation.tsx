
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const Navigation = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/charter', label: 'Charter' },
    { path: '/boat-club', label: 'Boat Club' },
    { path: '/sales', label: 'Sales' },
    { path: '/management', label: 'Management' },
    { path: '/guides', label: 'Guides' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/83fe3d22-8bf7-47d2-9462-1954772ef062.png" 
              alt="Zatara" 
              className="h-12 w-auto"
            />
            <div className="hidden sm:block">
              <div className="text-xl font-semibold text-zatara-navy">
                Zatara
              </div>
              <div className="text-xs text-zatara-blue tracking-wide">
                LUXURY YACHT SERVICES
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-zatara-blue font-semibold'
                    : 'text-gray-700 hover:text-zatara-blue'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button className="bg-zatara-blue hover:bg-zatara-blue-dark text-white">
              <Link to="/auth">Login</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button 
              variant="outline" 
              asChild 
              className="border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white"
            >
              <Link to="/auth">Login</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden pb-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-center py-2 px-3 rounded font-medium transition-colors text-sm ${
                  location.pathname === link.path
                    ? 'bg-zatara-blue text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
