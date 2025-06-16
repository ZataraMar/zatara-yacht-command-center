
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
          {/* Logo - Using the plain Zatara script logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/83fe3d22-8bf7-47d2-9462-1954772ef062.png" 
              alt="Zatara" 
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-zatara-blue font-semibold'
                    : 'text-zatara-navy hover:text-zatara-blue'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="gradient-zatara hover:bg-zatara-blue-dark text-white font-medium">
              <Link to="/auth">Login</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="outline" size="sm" asChild className="border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white">
              <Link to="/auth">Login</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-zatara-blue font-semibold'
                    : 'text-zatara-navy hover:text-zatara-blue'
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
