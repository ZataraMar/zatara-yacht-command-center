import React from 'react';
import { Navigation } from '@/components/public/Navigation';
import { Footer } from '@/components/public/Footer';
import { ContactForm } from '@/components/charter/ContactForm';
import { DownloadSection } from '@/components/downloads/DownloadSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Users, MapPin, Star, Calendar } from 'lucide-react';

const Charter = () => {
  const charterDownloads = [
    {
      title: "Charter Information Package",
      description: "Complete guide to our charter services, pricing, and what's included",
      filename: "zatara-charter-info.pdf"
    },
    {
      title: "Safety Guidelines",
      description: "Important safety information and guidelines for your charter experience",
      filename: "zatara-safety-guide.pdf"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Charter Logo */}
      <section className="relative bg-gradient-to-br from-zatara-blue-light to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <img 
                src="/lovable-uploads/c2ba532a-b378-4225-bbe6-7b4846e018fd.png" 
                alt="Zatara Charter" 
                className="h-24 w-auto mx-auto"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-zatara-navy mb-6">
              Yacht Charter Services
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience the beauty of Mallorca and the Balearic Islands aboard our premium yachts with professional crew.
            </p>
            <Button size="lg" asChild className="gradient-zatara">
              <a href="https://boatcharter.zatara.es/en/" target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-5 w-5" />
                Book Now
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Fleet Options - Styled like boatcharter.zatara.es */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-zatara-navy mb-4">
              Choose Your Yacht
            </h2>
            <p className="text-xl text-gray-600">
              Select from our premium fleet for your perfect charter experience
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Zatara */}
            <Card className="overflow-hidden border-zatara-blue-light hover:shadow-xl transition-shadow">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=80"
                  alt="Zatara luxury yacht"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-zatara-gold text-zatara-navy px-3 py-1 rounded-full text-sm font-semibold">
                  Premium
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-zatara-navy font-playfair">Zatara</CardTitle>
                    <CardDescription>Premium Luxury Charter</CardDescription>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-zatara-gold fill-current" />
                    <span className="font-semibold text-zatara-navy">4.9</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <Clock className="h-5 w-5 text-zatara-blue mb-1" />
                    <span className="text-sm text-gray-600">8 Hours</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Users className="h-5 w-5 text-zatara-blue mb-1" />
                    <span className="text-sm text-gray-600">Up to 12</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <MapPin className="h-5 w-5 text-zatara-blue mb-1" />
                    <span className="text-sm text-gray-600">All Coasts</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Included:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Professional captain and crew</li>
                    <li>• Snorkeling equipment</li>
                    <li>• Premium sound system</li>
                    <li>• Refreshments and snacks</li>
                    <li>• Fuel included</li>
                  </ul>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-zatara-blue">From €1,200</span>
                    <span className="text-sm text-gray-500">per day</span>
                  </div>
                  <Button className="w-full gradient-zatara" size="lg" asChild>
                    <a href="https://boatcharter.zatara.es/en/" target="_blank" rel="noopener noreferrer">
                      Book Zatara
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* PuraVida */}
            <Card className="overflow-hidden border-zatara-blue-light hover:shadow-xl transition-shadow">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
                  alt="PuraVida yacht"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-zatara-blue text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Standard
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-zatara-navy font-playfair">PuraVida</CardTitle>
                    <CardDescription>Standard Charter Experience</CardDescription>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-zatara-gold fill-current" />
                    <span className="font-semibold text-zatara-navy">4.7</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <Clock className="h-5 w-5 text-zatara-blue mb-1" />
                    <span className="text-sm text-gray-600">6 Hours</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Users className="h-5 w-5 text-zatara-blue mb-1" />
                    <span className="text-sm text-gray-600">Up to 8</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <MapPin className="h-5 w-5 text-zatara-blue mb-1" />
                    <span className="text-sm text-gray-600">Near Coast</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Included:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Professional captain</li>
                    <li>• Basic snorkeling gear</li>
                    <li>• Music system</li>
                    <li>• Water and soft drinks</li>
                    <li>• Fuel included</li>
                  </ul>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-zatara-blue">From €800</span>
                    <span className="text-sm text-gray-500">per day</span>
                  </div>
                  <Button className="w-full gradient-zatara" size="lg" asChild>
                    <a href="https://boatcharter.zatara.es/en/" target="_blank" rel="noopener noreferrer">
                      Book PuraVida
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact & Downloads */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-playfair font-bold text-zatara-navy mb-6">
                Ready to Book Your Charter?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Get in touch with us to plan your perfect Mediterranean adventure. Our team will help you choose the right yacht and customize your experience.
              </p>
              <ContactForm />
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80"
                alt="Yacht charter experience"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Downloads */}
      <DownloadSection 
        title="Charter Information"
        description="Download our comprehensive guides and information packages"
        downloads={charterDownloads}
      />

      {/* Popular Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600">
              Discover the most beautiful spots around Mallorca
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80"
                alt="Es Trenc Beach"
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle>Es Trenc</CardTitle>
                <CardDescription>Crystal clear waters and white sand beaches</CardDescription>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80"
                alt="Cabrera Island"
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle>Cabrera Island</CardTitle>
                <CardDescription>Protected national park with pristine nature</CardDescription>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=400&q=80"
                alt="Formentor"
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle>Cap de Formentor</CardTitle>
                <CardDescription>Dramatic cliffs and hidden coves</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Process */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">
            Simple Booking Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold">Choose Your Yacht</h3>
              <p className="text-gray-600">Select from Zatara or PuraVida based on your group size and preferences.</p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold">Book Your Date</h3>
              <p className="text-gray-600">Check availability and secure your preferred date with a deposit.</p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold">Enjoy Your Charter</h3>
              <p className="text-gray-600">Meet our crew and set sail for an unforgettable Mediterranean experience.</p>
            </div>
          </div>

          <div className="mt-12">
            <Button size="lg">
              Start Booking Process
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Charter;
