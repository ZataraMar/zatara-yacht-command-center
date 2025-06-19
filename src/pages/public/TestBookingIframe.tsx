
import React from 'react';
import { Navigation } from '@/components/public/Navigation';
import { Footer } from '@/components/public/Footer';

const TestBookingIframe = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Zatara branding */}
      <section className="bg-gradient-to-br from-zatara-blue-light to-blue-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-zatara-navy mb-4">
              Zatara Booking Test
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Testing the embedded booking system
            </p>
          </div>
        </div>
      </section>

      {/* Iframe Test Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-zatara-navy mb-4">
              Live Booking System
            </h2>
            <p className="text-gray-600">
              Full booking functionality embedded below:
            </p>
          </div>
          
          {/* Iframe Container */}
          <div className="flex justify-center">
            <div className="w-full max-w-4xl bg-gray-50 p-6 rounded-lg shadow-lg">
              <iframe 
                id="ifboat" 
                src="https://boatcharter.zatara.es/es/boats/booking/75212/?iframe=True" 
                height="800" 
                width="100%" 
                frameBorder="0"
                className="rounded-md border border-gray-200"
                title="Zatara Booking System"
              >
                <p>Your browser does not support iframes. Please visit our booking page directly.</p>
              </iframe>
            </div>
          </div>
          
          {/* Test Information */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-zatara-blue mb-2">
                Status
              </h3>
              <p className="text-green-600 font-medium">Live & Active</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-zatara-blue mb-2">
                Boat ID
              </h3>
              <p className="text-zatara-navy">75212</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-zatara-blue mb-2">
                Language
              </h3>
              <p className="text-zatara-navy">Spanish (ES)</p>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="mt-8 text-center space-x-4">
            <button 
              className="bg-zatara-blue text-white px-6 py-3 rounded-lg hover:bg-zatara-blue-dark transition-colors"
              onClick={() => window.open('https://boatcharter.zatara.es/es/boats/booking/75212/', '_blank')}
            >
              Open Direct Link
            </button>
            <button 
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              onClick={() => window.location.reload()}
            >
              Refresh Test
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TestBookingIframe;
