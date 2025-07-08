
import React from 'react';
import { Navigation } from '@/components/public/Navigation';
import { Footer } from '@/components/public/Footer';
import { ContactForm } from '@/components/charter/ContactForm';
import { VideoSection } from '@/components/charter/VideoSection';

const Charter = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Charter Excellence</h1>
          <p className="text-xl mb-8">Experience the Mediterranean like never before</p>
        </div>
      </section>

      <ContactForm />
      <VideoSection />
      <Footer />
    </div>
  );
};

export default Charter;
