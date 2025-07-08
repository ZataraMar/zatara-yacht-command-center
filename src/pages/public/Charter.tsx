
import React from 'react';
import { Navigation } from '@/components/public/Navigation';
import { Footer } from '@/components/public/Footer';
import { HeroSection } from '@/components/charter/HeroSection';
import { BookingWidget } from '@/components/charter/BookingWidget';
import { ExperiencesSection } from '@/components/charter/ExperiencesSection';
import { FleetSection } from '@/components/charter/FleetSection';

const Charter = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <BookingWidget />
      <ExperiencesSection />
      <FleetSection />
      <Footer />
    </div>
  );
};

export default Charter;
