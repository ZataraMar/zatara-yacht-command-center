
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Anchor } from 'lucide-react';

export const Navigation = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
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
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              <Anchor className="h-8 w-8 text-zatara-blue" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-zatara-gold rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-playfair font-bold text-zatara-navy tracking-wide">Zatara</span>
              <span className="text-xs text-zatara-blue font-medium -mt-1 tracking-wider">MALLORCA</span>
            </div>
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
              <Link to="/dashboard">Team Access</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="outline" size="sm" asChild className="border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white">
              <Link to="/dashboard">Team</Link>
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
