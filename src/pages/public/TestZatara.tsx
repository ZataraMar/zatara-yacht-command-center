
import React from 'react';
import { Navigation } from '@/components/public/Navigation';
import { Footer } from '@/components/public/Footer';

const TestZatara = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Zatara branding */}
      <section className="bg-gradient-to-br from-zatara-blue-light to-blue-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-zatara-navy mb-4">
              Test Zatara Booking
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Testing the embedded booking system for Zatara
            </p>
          </div>
        </div>
      </section>

      {/* Iframe Test Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-zatara-navy mb-4">
              Booking System Test
            </h2>
            <p className="text-gray-600">
              Testing the iframe booking integration below:
            </p>
          </div>
          
          {/* Iframe Container */}
          <div className="flex justify-center">
            <div className="w-full max-w-lg bg-gray-50 p-4 rounded-lg shadow-lg">
              <iframe 
                id="ifboat" 
                src="https://boatcharter.zatara.es/es/boats/booking/75212/?iframe=True" 
                height="750" 
                width="100%" 
                frameBorder="0"
                className="rounded-md"
                title="Zatara Booking System"
              >
                <p>Your browser does not support iframes. Please visit our booking page directly.</p>
              </iframe>
            </div>
          </div>
          
          {/* Test Information */}
          <div className="mt-8 text-center">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-zatara-blue mb-2">
                Test Notes
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Testing iframe loading and responsiveness</li>
                <li>• Checking booking functionality within iframe</li>
                <li>• Verifying mobile compatibility</li>
                <li>• Ensuring no CORS or security issues</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TestZatara;
