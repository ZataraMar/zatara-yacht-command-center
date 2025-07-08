
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/34711013403?text=Hello%20Zatara,%20I%20would%20like%20to%20inquire%20about%20your%20services', '_blank');
  };

  return (
    <footer className="bg-zatara-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info with tight cropped logo */}
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="text-2xl font-bold text-white">
                Zatara
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Small family-run business operating to super yacht standards with a focus on quality service and a love of the sea. Experience luxury charter and exclusive boat club memberships in Mallorca.
            </p>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-zatara-blue flex-shrink-0" />
                <span>Panteon House, Palma 07014</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-4 w-4 text-zatara-blue flex-shrink-0" />
                <button 
                  onClick={handleWhatsAppClick}
                  className="hover:text-white transition-colors underline"
                >
                  WhatsApp: +34 711 013 403
                </button>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li><Link to="/charter" className="hover:text-white transition-colors">Luxury Charter</Link></li>
              <li><Link to="/boat-club" className="hover:text-white transition-colors">Exclusive Boat Club</Link></li>
              <li><Link to="/sales" className="hover:text-white transition-colors">Yacht Brokerage</Link></li>
              <li><Link to="/management" className="hover:text-white transition-colors">Yacht Management</Link></li>
            </ul>
          </div>

          {/* Fleet Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Our Fleet</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li>Zatara - Naviera Balear</li>
              <li>PuraVida - Club de Mar</li>
              <li><Link to="/guides" className="hover:text-white transition-colors">Mallorca Guides</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Safety Protocols</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Get In Touch</h3>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Ready to discover the magic of the Balearic waters with Zatara?
            </p>
            <Button 
              className="bg-zatara-blue hover:bg-zatara-blue-dark text-white w-full"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp Us
            </Button>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; 2025 Zatara Mallorca. All rights reserved.
            </p>
            <p className="text-zatara-blue text-sm font-medium">
              Crafted for the Mediterranean lifestyle.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
