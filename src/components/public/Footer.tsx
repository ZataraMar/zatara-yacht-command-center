
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  return (
    <footer className="bg-zatara-navy text-white relative overflow-hidden">
      {/* Luxury accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 gradient-zatara-gold"></div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <img 
                src="/lovable-uploads/83fe3d22-8bf7-47d2-9462-1954772ef062.png" 
                alt="Zatara" 
                className="h-12 w-auto brightness-0 invert transition-transform duration-300 hover:scale-105"
              />
              <div className="zatara-luxury-script text-luxury-lg text-zatara-gold">
                Zatara Mar
              </div>
            </div>
            <p className="text-gray-300 text-luxury-xs leading-relaxed">
              Premium yacht services in the heart of the Mediterranean. Experience luxury charter, exclusive boat club memberships, and comprehensive yacht management in Mallorca.
            </p>
            <div className="space-y-4 text-luxury-xs text-gray-300">
              <div className="flex items-center space-x-4">
                <MapPin className="h-5 w-5 text-zatara-gold flex-shrink-0" />
                <span>Puerto Portals, Mallorca</span>
              </div>
              <div className="flex items-center space-x-4">
                <MessageCircle className="h-5 w-5 text-zatara-gold flex-shrink-0" />
                <span>WhatsApp: +34 711 013 403</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-luxury-lg font-playfair font-semibold mb-6 text-zatara-gold">Services</h3>
            <ul className="space-y-4 text-gray-300 text-luxury-xs">
              <li><Link to="/charter" className="hover:text-zatara-gold transition-colors duration-300 hover:scale-105 inline-block">Luxury Charter</Link></li>
              <li><Link to="/boat-club" className="hover:text-zatara-gold transition-colors duration-300 hover:scale-105 inline-block">Exclusive Boat Club</Link></li>
              <li><Link to="/sales" className="hover:text-zatara-gold transition-colors duration-300 hover:scale-105 inline-block">Yacht Brokerage</Link></li>
              <li><Link to="/management" className="hover:text-zatara-gold transition-colors duration-300 hover:scale-105 inline-block">Yacht Management</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-luxury-lg font-playfair font-semibold mb-6 text-zatara-gold">Explore</h3>
            <ul className="space-y-4 text-gray-300 text-luxury-xs">
              <li><Link to="/guides" className="hover:text-zatara-gold transition-colors duration-300 hover:scale-105 inline-block">Mallorca Guides</Link></li>
              <li><a href="#" className="hover:text-zatara-gold transition-colors duration-300 hover:scale-105 inline-block">Safety First</a></li>
              <li><a href="#" className="hover:text-zatara-gold transition-colors duration-300 hover:scale-105 inline-block">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-zatara-gold transition-colors duration-300 hover:scale-105 inline-block">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-luxury-lg font-playfair font-semibold mb-6 text-zatara-gold">Get In Touch</h3>
            <p className="text-gray-300 mb-8 text-luxury-xs leading-relaxed">
              Ready to discover the magic of the Balearic waters with Zatara?
            </p>
            <Button className="gradient-zatara-gold hover:shadow-gold text-zatara-navy px-8 py-4 rounded-luxury transition-all duration-300 font-semibold w-full hover:scale-105">
              <MessageCircle className="mr-3 h-5 w-5" />
              WhatsApp Us
            </Button>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-16 pt-8 text-center">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-luxury-xs">
              &copy; 2024 Zatara Mallorca. All rights reserved.
            </p>
            <p className="text-zatara-gold text-luxury-xs font-medium">
              Crafted for the Mediterranean lifestyle.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
