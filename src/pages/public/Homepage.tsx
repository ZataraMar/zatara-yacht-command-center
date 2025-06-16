
import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/public/Navigation';
import { Footer } from '@/components/public/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Anchor, Users, Ship, Award, ArrowRight } from 'lucide-react';

const Homepage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Discover Mallorca
                <span className="text-blue-600 block">In Luxury</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Premium yacht charter services, exclusive boat club memberships, and complete yacht management solutions in the heart of the Mediterranean.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/charter">Book Charter</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/boat-club">Join Boat Club</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=800&q=80"
                alt="Luxury yacht in Mediterranean waters"
                className="rounded-lg shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Yacht Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From day charters to boat club memberships, we provide everything you need for the perfect Mediterranean experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Ship className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Yacht Charter</CardTitle>
                <CardDescription>
                  Day and multi-day yacht charters with professional crew
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/charter">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Boat Club</CardTitle>
                <CardDescription>
                  Exclusive membership with shared yacht ownership benefits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/boat-club">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Anchor className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Yacht Sales</CardTitle>
                <CardDescription>
                  Premium yacht brokerage and sales services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/sales">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Management</CardTitle>
                <CardDescription>
                  Complete yacht management and maintenance services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/management">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Fleet Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Fleet
            </h2>
            <p className="text-xl text-gray-600">
              Modern, well-maintained yachts for every occasion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=600&q=80"
                alt="Zatara yacht"
                className="w-full h-64 object-cover"
              />
              <CardHeader>
                <CardTitle>Zatara</CardTitle>
                <CardDescription>Premium 8-hour charter experience</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Our flagship yacht offering luxury amenities and professional crew for the ultimate Mediterranean experience.
                </p>
                <Button asChild>
                  <Link to="/charter">Book Zatara</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80"
                alt="PuraVida yacht"
                className="w-full h-64 object-cover"
              />
              <CardHeader>
                <CardTitle>PuraVida</CardTitle>
                <CardDescription>Standard 6-hour charter option</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Perfect for day trips and smaller groups, offering comfort and style for exploring Mallorca's coastline.
                </p>
                <Button asChild>
                  <Link to="/charter">Book PuraVida</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for Your Mediterranean Adventure?
          </h2>
          <p className="text-xl mb-8">
            Contact us today to book your charter or learn about boat club membership options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/charter">Book Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="mailto:cruise@zatara.es">Contact Us</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Homepage;
