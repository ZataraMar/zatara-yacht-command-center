
import React from 'react';
import { Link } from 'react-router-dom';
import { Anchor, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-zatara-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <Anchor className="h-6 w-6 text-zatara-gold" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-zatara-blue rounded-full"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-playfair font-bold tracking-wide">Zatara</span>
                <span className="text-xs text-zatara-gold font-medium -mt-1 tracking-wider">MALLORCA</span>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Premium yacht services in the heart of the Mediterranean. Experience luxury charter, exclusive boat club memberships, and comprehensive yacht management in Mallorca.
            </p>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-zatara-gold" />
                <span>Puerto Portals, Mallorca</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-zatara-gold" />
                <span>cruise@zatara.es</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-zatara-gold" />
                <span>+34 XXX XXX XXX</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-playfair font-semibold mb-4 text-zatara-gold">Services</h3>
            <ul className="space-y-3 text-gray-300">
              <li><Link to="/charter" className="hover:text-zatara-gold transition-colors">Luxury Charter</Link></li>
              <li><Link to="/boat-club" className="hover:text-zatara-gold transition-colors">Exclusive Boat Club</Link></li>
              <li><Link to="/sales" className="hover:text-zatara-gold transition-colors">Yacht Brokerage</Link></li>
              <li><Link to="/management" className="hover:text-zatara-gold transition-colors">Yacht Management</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-playfair font-semibold mb-4 text-zatara-gold">Explore</h3>
            <ul className="space-y-3 text-gray-300">
              <li><Link to="/guides" className="hover:text-zatara-gold transition-colors">Mallorca Guides</Link></li>
              <li><a href="#" className="hover:text-zatara-gold transition-colors">Safety First</a></li>
              <li><a href="#" className="hover:text-zatara-gold transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-zatara-gold transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-playfair font-semibold mb-4 text-zatara-gold">Set Sail</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Ready to discover the magic of the Balearic waters with Zatara?
            </p>
            <button className="gradient-zatara-gold hover:bg-zatara-gold-dark text-zatara-navy px-6 py-3 rounded-lg transition-all duration-300 font-medium shadow-lg">
              Contact Us Today
            </button>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Zatara Mallorca. All rights reserved. | Crafted for the Mediterranean lifestyle.</p>
        </div>
      </div>
    </footer>
  );
};
