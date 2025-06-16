
import React from 'react';
import { Button } from '@/components/ui/button';
import { Anchor, Download } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-r from-zatara-navy to-zatara-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <img 
            src="/lovable-uploads/c2ba532a-b378-4225-bbe6-7b4846e018fd.png" 
            alt="Zatara Charter" 
            className="h-16 w-auto mx-auto mb-8"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Luxury Yacht Charters
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Experience the Mediterranean in style aboard our premium fleet. Small family-run business operating to super yacht standards with a focus on quality service and a love of the sea.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white hover:bg-gray-100 text-zatara-navy font-semibold px-8 py-3"
              onClick={() => window.open('https://boatcharter.zatara.es/en/', '_blank')}
            >
              <Anchor className="mr-2 h-5 w-5" />
              Book Your Charter
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-zatara-navy px-8 py-3"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Guide
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
