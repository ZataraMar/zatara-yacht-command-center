
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageCircle, Menu, X } from 'lucide-react';

export const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { path: '/charter', label: 'Charter' },
    { path: '/boat-club', label: 'Boat Club' },
    { path: '/sales', label: 'Sales' },
    { path: '/management', label: 'Management' },
    { path: '/guides', label: 'Guides' },
  ];

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/34711013403?text=Hello%20Zatara,%20I%20would%20like%20to%20inquire%20about%20your%20services', '_blank');
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/83fe3d22-8bf7-47d2-9462-1954772ef062.png" 
              alt="Zatara" 
              className="h-20 w-auto"
            />
            <div className="hidden sm:block">
              <div className="text-3xl font-bold text-zatara-navy">
                Zatara
              </div>
              <div className="text-base text-zatara-blue tracking-wide font-medium">
                LUXURY YACHT SERVICES
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-zatara-blue font-semibold'
                    : 'text-gray-700 hover:text-zatara-blue'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button 
              variant="outline"
              size="sm"
              onClick={handleWhatsAppClick}
              className="border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            <Button asChild className="bg-zatara-blue hover:bg-zatara-blue-dark text-white">
              <Link to="/auth">Login</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <Button 
              variant="outline"
              size="sm"
              onClick={handleWhatsAppClick}
              className="border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white"
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-200 mt-3 pt-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-base font-medium py-2 px-3 rounded transition-colors ${
                    location.pathname === link.path
                      ? 'bg-zatara-blue text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button 
                className="bg-zatara-blue hover:bg-zatara-blue-dark text-white mt-3"
                asChild
              >
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>Login to Portal</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
