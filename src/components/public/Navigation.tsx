
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageCircle, Menu, X, ChevronDown } from 'lucide-react';
import { LanguageToggle } from '@/components/common/LanguageToggle';
import { ZataraLogo } from '@/components/common/ZataraLogo';

export const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [charterDropdownOpen, setCharterDropdownOpen] = useState(false);

  const navLinks = [
    { 
      path: '/charter', 
      label: 'Charter',
      hasDropdown: true,
      dropdownItems: [
        {
          label: 'Experiences',
          items: [
            { path: '/charter/experiences/mallorcan-sailing', label: 'Mallorcan Sailing' }
          ]
        },
        { path: '/charter/private', label: 'Private Charters' },
        { path: '/charter/shared', label: 'Shared Experiences' }
      ]
    },
    { path: '/club', label: 'Club' },
    { path: '/sales', label: 'Sales' },
    { path: '/management', label: 'Management' },
    { path: '/guides', label: 'Guides' },
  ];

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/34711013403?text=Hello%20Zatara,%20I%20would%20like%20to%20inquire%20about%20your%20services', '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActiveLink = (path: string) => {
    if (path === '/charter') {
      return location.pathname.startsWith('/charter');
    }
    return location.pathname === path;
  };

  return (
    <>
      {/* Main Navigation */}
      <nav className={`bg-white shadow-sm border-b sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-3">
              <ZataraLogo size="sm" variant="image" className="!h-12" />
              <div className="flex flex-col">
                <div className="text-sm text-zatara-blue tracking-wide font-medium whitespace-nowrap">
                  LUXURY YACHT SERVICES
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                <div key={link.path} className="relative">
                  {link.hasDropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setCharterDropdownOpen(true)}
                      onMouseLeave={() => setCharterDropdownOpen(false)}
                    >
                      <button
                        className={`text-lg font-medium transition-colors flex items-center gap-1 ${
                          isActiveLink(link.path)
                            ? 'text-zatara-blue font-semibold'
                            : 'text-zatara-blue hover:text-zatara-blue-dark'
                        }`}
                      >
                        {link.label}
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      
                      {/* Dropdown Menu */}
                      {charterDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                          {link.dropdownItems?.map((item, index) => (
                            <div key={index}>
                              {item.items ? (
                                // Experiences submenu
                                <div className="px-4 py-2">
                                  <div className="text-sm font-semibold text-gray-700 mb-2">{item.label}</div>
                                  {item.items.map((subItem, subIndex) => (
                                    <Link
                                      key={subIndex}
                                      to={subItem.path}
                                      className="block px-2 py-1 text-sm text-zatara-blue hover:bg-zatara-blue-light rounded"
                                      onClick={() => setCharterDropdownOpen(false)}
                                    >
                                      {subItem.label}
                                    </Link>
                                  ))}
                                </div>
                              ) : (
                                // Regular dropdown item
                                <Link
                                  to={item.path}
                                  className="block px-4 py-2 text-sm text-zatara-blue hover:bg-zatara-blue-light"
                                  onClick={() => setCharterDropdownOpen(false)}
                                >
                                  {item.label}
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`text-lg font-medium transition-colors ${
                        isActiveLink(link.path)
                          ? 'text-zatara-blue font-semibold'
                          : 'text-zatara-blue hover:text-zatara-blue-dark'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <LanguageToggle />
              <Button 
                variant="outline"
                size="sm"
                onClick={handleWhatsAppClick}
                className="border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white px-3 py-1"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
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
                className="border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white p-2"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white p-2"
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
                  <div key={link.path}>
                    {link.hasDropdown ? (
                      <div>
                        <Link
                          to={link.path}
                          className={`text-base font-medium py-2 px-3 rounded transition-colors block ${
                            isActiveLink(link.path)
                              ? 'bg-zatara-blue text-white'
                              : 'text-zatara-blue hover:bg-zatara-blue-light'
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                        <div className="ml-4 mt-2 space-y-1">
                          {link.dropdownItems?.map((item, index) => (
                            <div key={index}>
                              {item.items ? (
                                <div>
                                  <div className="text-sm font-semibold text-gray-600 px-3 py-1">{item.label}</div>
                                  {item.items.map((subItem, subIndex) => (
                                    <Link
                                      key={subIndex}
                                      to={subItem.path}
                                      className="block text-sm text-zatara-blue hover:bg-zatara-blue-light py-1 px-6 rounded"
                                      onClick={() => setIsMenuOpen(false)}
                                    >
                                      {subItem.label}
                                    </Link>
                                  ))}
                                </div>
                              ) : (
                                <Link
                                  to={item.path}
                                  className="block text-sm text-zatara-blue hover:bg-zatara-blue-light py-1 px-6 rounded"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {item.label}
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={link.path}
                        className={`text-base font-medium py-2 px-3 rounded transition-colors ${
                          isActiveLink(link.path)
                            ? 'bg-zatara-blue text-white'
                            : 'text-zatara-blue hover:bg-zatara-blue-light'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
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

      {/* Scrolled Navigation */}
      <nav className={`bg-white shadow-lg border-b fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <ZataraLogo size="sm" variant="image" className="!h-8" />
            </Link>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline"
                size="sm"
                onClick={handleWhatsAppClick}
                className="border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white p-2"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white p-2"
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Scrolled Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-gray-200 bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <div key={link.path}>
                    <Link
                      to={link.path}
                      className={`text-base font-medium py-2 px-3 rounded transition-colors block ${
                        isActiveLink(link.path)
                          ? 'bg-zatara-blue text-white'
                          : 'text-zatara-blue hover:bg-zatara-blue-light'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                    {link.hasDropdown && (
                      <div className="ml-4 mt-1 space-y-1">
                        {link.dropdownItems?.map((item, index) => (
                          <div key={index}>
                            {item.items ? (
                              <div>
                                <div className="text-sm font-semibold text-gray-600 px-3 py-1">{item.label}</div>
                                {item.items.map((subItem, subIndex) => (
                                  <Link
                                    key={subIndex}
                                    to={subItem.path}
                                    className="block text-sm text-zatara-blue hover:bg-zatara-blue-light py-1 px-6 rounded"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {subItem.label}
                                  </Link>
                                ))}
                              </div>
                            ) : (
                              <Link
                                to={item.path}
                                className="block text-sm text-zatara-blue hover:bg-zatara-blue-light py-1 px-6 rounded"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {item.label}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Button 
                  className="bg-zatara-blue hover:bg-zatara-blue-dark text-white mt-2"
                  asChild
                >
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>Login</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
