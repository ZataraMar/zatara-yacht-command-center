
import React from 'react';
import { Navigation } from '@/components/public/Navigation';
import { Footer } from '@/components/public/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Anchor, Euro, Calendar, Users, Ruler, Fuel } from 'lucide-react';

const Sales = () => {
  const listings = [
    {
      id: 1,
      name: "Sunseeker Predator 68",
      price: "€1,250,000",
      year: 2019,
      length: "68 ft",
      guests: 12,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      status: "Available",
      description: "Exceptional performance yacht with luxury accommodations"
    },
    {
      id: 2,
      name: "Princess V58",
      price: "€950,000",
      year: 2020,
      length: "58 ft",
      guests: 10,
      image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=80",
      status: "New",
      description: "Brand new Princess yacht with cutting-edge technology"
    },
    {
      id: 3,
      name: "Azimut 55",
      price: "€750,000",
      year: 2018,
      length: "55 ft",
      guests: 8,
      image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=800&q=80",
      status: "Pending",
      description: "Italian craftsmanship with Mediterranean styling"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Yacht Sales & Brokerage
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Premium yacht sales and brokerage services in the Mediterranean. Find your perfect yacht or sell with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Anchor className="mr-2 h-5 w-5" />
                Browse Yachts
              </Button>
              <Button size="lg" variant="outline">
                Sell Your Yacht
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600">
              Complete yacht sales and brokerage solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Anchor className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Yacht Sales</CardTitle>
                <CardDescription>
                  Premium new and pre-owned yacht sales with full documentation support
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Euro className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Brokerage</CardTitle>
                <CardDescription>
                  Professional yacht brokerage services with market expertise
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Consultation</CardTitle>
                <CardDescription>
                  Expert guidance on yacht selection, valuation, and market trends
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Listings
            </h2>
            <p className="text-xl text-gray-600">
              Discover our current selection of premium yachts
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {listings.map((yacht) => (
              <Card key={yacht.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={yacht.image}
                    alt={yacht.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge 
                      variant={yacht.status === 'New' ? 'default' : yacht.status === 'Available' ? 'secondary' : 'destructive'}
                    >
                      {yacht.status}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{yacht.name}</CardTitle>
                      <CardDescription>{yacht.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{yacht.price}</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div className="flex flex-col items-center">
                      <Calendar className="h-4 w-4 text-blue-600 mb-1" />
                      <span className="text-gray-600">{yacht.year}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Ruler className="h-4 w-4 text-blue-600 mb-1" />
                      <span className="text-gray-600">{yacht.length}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Users className="h-4 w-4 text-blue-600 mb-1" />
                      <span className="text-gray-600">{yacht.guests}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1">View Details</Button>
                    <Button variant="outline" className="flex-1">Contact</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View All Listings
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Zatara for Yacht Sales?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80"
                alt="Yacht consultation"
                className="rounded-lg shadow-lg w-full h-80 object-cover"
              />
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Market Expertise</h3>
                  <p className="text-gray-600">Deep knowledge of Mediterranean yacht market and pricing trends.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Full Service Support</h3>
                  <p className="text-gray-600">Complete documentation, surveys, and legal support throughout the process.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Exclusive Network</h3>
                  <p className="text-gray-600">Access to off-market listings and qualified buyers worldwide.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Post-Sale Services</h3>
                  <p className="text-gray-600">Ongoing yacht management and maintenance services available.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Buy or Sell?
          </h2>
          <p className="text-xl mb-8">
            Let our experienced team help you navigate the yacht market with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Browse Yachts
            </Button>
            <Button size="lg" variant="outline">
              Get Free Valuation
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sales;
