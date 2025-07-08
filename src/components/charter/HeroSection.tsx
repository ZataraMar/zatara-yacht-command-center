
import React from 'react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const scrollToFleet = () => {
    document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-zatara-blue to-zatara-navy">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Discover Mallorca
          <span className="block text-yellow-400">In Pure Luxury</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Premium yacht charters with super yacht standards. 
          Small family business, extraordinary experiences.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={scrollToBooking}
            className="bg-yellow-400 hover:bg-yellow-500 text-zatara-navy px-8 py-4 rounded-full text-lg font-semibold transition transform hover:scale-105"
          >
            Book Your Charter
          </Button>
          <Button 
            onClick={scrollToFleet}
            variant="outline" 
            className="border-2 border-white text-white hover:bg-white hover:text-zatara-navy px-8 py-4 rounded-full text-lg font-semibold transition"
          >
            View Our Fleet
          </Button>
        </div>
      </div>
      
      {/* Floating yacht animation */}
      <div className="absolute bottom-10 right-10 animate-bounce opacity-30">
        <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
          <path d="M5 25 L55 25 L50 15 L45 10 L15 10 L10 15 Z" fill="white"/>
          <path d="M25 10 L25 5 L30 5 L30 10" stroke="white" strokeWidth="2"/>
        </svg>
      </div>
    </section>
  );
};
