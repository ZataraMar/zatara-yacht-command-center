
import React from 'react';
import { Navigation } from '@/components/public/Navigation';
import { Footer } from '@/components/public/Footer';
import { SecureContactForm } from '@/components/charter/SecureContactForm';
import { DownloadSection } from '@/components/downloads/DownloadSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Anchor, 
  Users, 
  Clock, 
  Star, 
  Shield,
  Download
} from 'lucide-react';

const Charter = () => {
  const boatCards = [
    {
      name: "Zatara",
      type: "Luxury Charter Yacht",
      capacity: "Up to 12 guests",
      duration: "8 hours",
      features: ["Premium service", "Professional captain", "Gourmet catering"],
      price: "From €2,500",
      image: "/api/placeholder/400/300"
    },
    {
      name: "PuraVida", 
      type: "Day Charter Boat",
      capacity: "Up to 10 guests",
      duration: "6 hours",
      features: ["Family friendly", "Snorkeling gear", "Light refreshments"],
      price: "From €1,800",
      image: "/api/placeholder/400/300"
    }
  ];

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
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-zatara-navy to-zatara-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <img 
              src="/lovable-uploads/c2ba532a-b378-4225-bbe6-7b4846e018fd.png" 
              alt="Zatara Charter" 
              className="h-16 w-auto mx-auto mb-8"
            />
            <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6">
              Luxury Yacht Charters
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Experience the Mediterranean in style aboard our premium fleet
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-zatara-gold hover:bg-yellow-600 text-zatara-navy font-semibold"
                onClick={() => window.open('https://boatcharter.zatara.es/en/', '_blank')}
              >
                <Anchor className="mr-2 h-5 w-5" />
                Book Your Charter
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-zatara-navy"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="py-16 bg-zatara-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-zatara-navy mb-4">
              Our Premium Fleet
            </h2>
            <p className="text-xl text-gray-600">
              Choose from our carefully maintained luxury vessels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {boatCards.map((boat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-zatara-navy">{boat.name}</CardTitle>
                    <Badge variant="secondary" className="bg-zatara-blue text-white">
                      {boat.type}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {boat.capacity}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {boat.duration}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {boat.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <Shield className="h-4 w-4 mr-2 text-zatara-blue" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-zatara-navy">
                      {boat.price}
                    </span>
                    <Button 
                      className="gradient-zatara"
                      onClick={() => window.open('https://boatcharter.zatara.es/en/', '_blank')}
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-zatara-navy mb-4">
              What Our Guests Say
            </h2>
            <p className="text-xl text-gray-600">
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
              <h2 className="text-3xl font-playfair font-bold text-zatara-navy mb-6">
                Ready to Book Your Charter?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
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
