import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/public/Navigation';
import { Footer } from '@/components/public/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Ship, Users, Award, Star, MessageCircle } from 'lucide-react';
const Homepage = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/34711013403?text=Hello%20Zatara,%20I%20would%20like%20to%20inquire%20about%20your%20services', '_blank');
  };
  return <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-zatara-blue-light to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-zatara-navy mb-6">
                Discover Mallorca
                <span className="text-zatara-blue block">In Luxury</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Small family-run business operating to super yacht standards with a focus on quality service and a love of the sea. Premium yacht charter services, exclusive boat club memberships, and complete yacht management solutions in the heart of the Mediterranean.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-zatara-blue hover:bg-zatara-blue-dark text-white">
                  <a href="https://boatcharter.zatara.es/en/" target="_blank" rel="noopener noreferrer">
                    Book Charter
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild className="border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white">
                  <Link to="/boat-club">Join Boat Club</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img src="https://eefenqehcesevuudtpti.supabase.co/storage/v1/object/public/puravidaphotos/Cristian%20Shoot/Yacht_Charter_Mallorca_PuraVida3.jpg" alt="PuraVida luxury yacht in Mediterranean waters" className="rounded-lg shadow-2xl w-full h-96 object-cover" onError={e => {
              // Fallback to placeholder if image doesn't load
              e.currentTarget.src = "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=800&q=80";
            }} />
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-zatara-navy mb-4">
              Complete Yacht Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From day charters to boat club memberships, we provide everything you need for the perfect Mediterranean experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow border-zatara-blue-light">
              <CardHeader>
                <Ship className="h-12 w-12 text-zatara-blue mx-auto mb-4" />
                <CardTitle className="text-zatara-navy">Yacht Charter</CardTitle>
                <CardDescription>
                  Day and multi-day yacht charters with professional crew
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild className="w-full border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white">
                  <a href="https://boatcharter.zatara.es/en/" target="_blank" rel="noopener noreferrer">
                    Book Now
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-zatara-blue-light">
              <CardHeader>
                <Users className="h-12 w-12 text-zatara-blue mx-auto mb-4" />
                <CardTitle className="text-zatara-navy">Boat Club</CardTitle>
                <CardDescription>
                  Exclusive membership with shared yacht ownership benefits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild className="w-full border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white">
                  <Link to="/boat-club">
                    Learn More
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-zatara-blue-light">
              <CardHeader>
                <Award className="h-12 w-12 text-zatara-blue mx-auto mb-4" />
                <CardTitle className="text-zatara-navy">Yacht Sales</CardTitle>
                <CardDescription>
                  Premium yacht brokerage and sales services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild className="w-full border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white">
                  <Link to="/sales">
                    Learn More
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-zatara-blue-light">
              <CardHeader>
                <Ship className="h-12 w-12 text-zatara-blue mx-auto mb-4" />
                <CardTitle className="text-zatara-navy">Management</CardTitle>
                <CardDescription>
                  Complete yacht management and maintenance services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild className="w-full border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white">
                  <Link to="/management">
                    Learn More
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20 bg-zatara-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-zatara-navy mb-4">
              What Our Guests Say
            </h2>
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-zatara-gold fill-current" />)}
                </div>
                <CardDescription className="text-gray-600">
                  "Absolutely incredible experience! The crew was professional and the yacht was beautiful. Perfect day on the water around Mallorca."
                </CardDescription>
                <div className="text-sm text-zatara-blue font-medium">- Google Review</div>
              </CardHeader>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-zatara-gold fill-current" />)}
                </div>
                <CardDescription className="text-gray-600">
                  "Best charter experience we've had! Jules and the team were fantastic. Highly recommend for anyone visiting Mallorca."
                </CardDescription>
                <div className="text-sm text-zatara-blue font-medium">- TripAdvisor</div>
              </CardHeader>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-zatara-gold fill-current" />)}
                </div>
                <CardDescription className="text-gray-600">
                  "Professional service from start to finish. The boat was immaculate and the experience exceeded our expectations."
                </CardDescription>
                <div className="text-sm text-zatara-blue font-medium">- Google Review</div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-zatara-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for Your Mediterranean Adventure?
          </h2>
          <p className="text-xl mb-8">
            Contact us today to book your charter or learn about boat club membership options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="https://boatcharter.zatara.es/en/" target="_blank" rel="noopener noreferrer">
                Book Charter Now
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-zatara-blue" onClick={handleWhatsAppClick}>
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Homepage;