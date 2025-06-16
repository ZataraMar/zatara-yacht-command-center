
import React from 'react';
import { Link } from 'react-router-dom';
import { Anchor, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Anchor className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">Zatara Mar</span>
            </div>
            <p className="text-gray-300 mb-4">
              Premium yacht services in Mallorca. Charter, sales, management, and boat club memberships.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Mallorca, Balearic Islands</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>cruise@zatara.es</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+34 XXX XXX XXX</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/charter" className="hover:text-white transition-colors">Yacht Charter</Link></li>
              <li><Link to="/boat-club" className="hover:text-white transition-colors">Boat Club</Link></li>
              <li><Link to="/sales" className="hover:text-white transition-colors">Yacht Sales</Link></li>
              <li><Link to="/management" className="hover:text-white transition-colors">Yacht Management</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Information</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/guides" className="hover:text-white transition-colors">Destination Guides</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Safety Information</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <p className="text-gray-300 mb-4">
              Ready to experience the best of Mallorca waters?
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors">
              Contact Us
            </button>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Zatara Mar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
