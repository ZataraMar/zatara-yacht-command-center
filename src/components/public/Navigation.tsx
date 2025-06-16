
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
    <nav className="bg-white/95 backdrop-blur-sm shadow-elegant border-b border-zatara-gold/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center py-6 sm:py-8">
          {/* Luxury Logo Section */}
          <Link to="/" className="flex items-center space-x-4 group">
            <img 
              src="/lovable-uploads/83fe3d22-8bf7-47d2-9462-1954772ef062.png" 
              alt="Zatara" 
              className="h-16 sm:h-20 lg:h-24 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <div className="zatara-luxury-script text-luxury-lg text-zatara-navy">
                Zatara Mar
              </div>
              <div className="text-sm font-medium text-zatara-blue tracking-wide">
                LUXURY YACHT SERVICES
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`luxury-text font-medium transition-all duration-300 hover:scale-105 ${
                  location.pathname === link.path
                    ? 'text-zatara-gold font-semibold border-b-2 border-zatara-gold pb-1'
                    : 'text-zatara-navy hover:text-zatara-gold'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button className="gradient-zatara-gold hover:shadow-gold text-zatara-navy font-semibold px-8 py-4 rounded-luxury transition-all duration-300 hover:scale-105">
              <Link to="/auth">Client Portal</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="border-2 border-zatara-gold text-zatara-gold hover:bg-zatara-gold hover:text-zatara-navy font-semibold px-6 py-3 rounded-luxury transition-all duration-300"
            >
              <Link to="/auth">Portal</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden pb-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-center py-3 px-4 rounded-luxury font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'bg-zatara-gold text-zatara-navy font-semibold shadow-gold'
                    : 'text-zatara-navy hover:bg-zatara-pearl hover:text-zatara-gold'
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
