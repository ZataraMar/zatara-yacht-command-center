
import React from 'react';
import { Navigation } from '@/components/public/Navigation';
import { Footer } from '@/components/public/Footer';
import { HeroSection } from '@/components/charter/HeroSection';
import { FleetSection } from '@/components/charter/FleetSection';
import { VideoSection } from '@/components/charter/VideoSection';
import { SecureContactForm } from '@/components/charter/SecureContactForm';
import { DownloadSection } from '@/components/downloads/DownloadSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, Star } from 'lucide-react';

const Charter = () => {
  const charterDownloads = [
    {
      title: "Charter Information Guide",
      description: "Complete guide to our charter services, boats, and booking process.",
      filename: "zatara-charter-guide.pdf"
    },
    {
      title: "Safety & Equipment Information", 
      description: "Safety protocols, equipment details, and what to expect on board.",
      filename: "zatara-safety-guide.pdf"
    }
  ];

  const reviews = [
    { text: "Incredible experience! The crew was professional and the boat was immaculate.", author: "Sarah M.", rating: 5 },
    { text: "Perfect day on the water. Highly recommend Zatara for special occasions.", author: "Michael R.", rating: 5 },
    { text: "Best charter experience in Mallorca. Will definitely book again!", author: "Emma L.", rating: 5 }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <HeroSection />
      <VideoSection />
      <FleetSection />

      {/* Customer Reviews */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zatara-navy mb-4">
              What Our Guests Say
            </h2>
            <p className="text-lg text-gray-600">
              Real experiences from our valued customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{review.text}"</p>
                  <p className="font-semibold text-zatara-navy">- {review.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <DownloadSection
        title="Charter Information"
        description="Download our comprehensive guides and information packets"
        downloads={charterDownloads}
      />

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-zatara-navy mb-6">
                Ready to Book Your Charter?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Get in touch with our team to plan your perfect day on the water. 
                We'll help you choose the right boat and create an unforgettable experience.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-zatara-blue" />
                  <span>Secure booking process</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-zatara-blue" />
                  <span>Professional crew included</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-zatara-blue" />
                  <span>5-star service guarantee</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <SecureContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Charter;
