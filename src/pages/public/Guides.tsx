
import React from 'react';
import { Navigation } from '@/components/public/Navigation';
import { Footer } from '@/components/public/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Star, Camera, Compass, Waves } from 'lucide-react';

const Guides = () => {
  const destinations = [
    {
      id: 1,
      name: "Palma Bay",
      description: "Historic capital with stunning cathedral and vibrant nightlife",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80",
      duration: "Half Day",
      highlights: ["Cathedral of Palma", "Paseo Marítimo", "Old Town"],
      difficulty: "Easy"
    },
    {
      id: 2,
      name: "Es Trenc",
      description: "Pristine white sand beach with crystal clear waters",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
      duration: "Full Day",
      highlights: ["Natural beach", "Snorkeling", "Beach restaurants"],
      difficulty: "Easy"
    },
    {
      id: 3,
      name: "Cabrera Island",
      description: "Protected national park with untouched nature",
      image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=600&q=80",
      duration: "Full Day",
      highlights: ["Blue Cave", "Castle ruins", "Marine reserve"],
      difficulty: "Moderate"
    },
    {
      id: 4,
      name: "Cap de Formentor",
      description: "Dramatic cliffs and hidden coves in the north",
      image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=600&q=80",
      duration: "Full Day",
      highlights: ["Formentor Beach", "Lighthouse", "Scenic cliffs"],
      difficulty: "Moderate"
    },
    {
      id: 5,
      name: "Cala Mondragó",
      description: "Protected natural park with two beautiful coves",
      image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=600&q=80",
      duration: "Half Day",
      highlights: ["Twin coves", "Nature trails", "Clear waters"],
      difficulty: "Easy"
    },
    {
      id: 6,
      name: "Dragonera Island",
      description: "Wild island nature reserve off the west coast",
      image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?auto=format&fit=crop&w=600&q=80",
      duration: "Full Day",
      highlights: ["Lighthouse hike", "Wildlife watching", "Secluded bays"],
      difficulty: "Challenging"
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
              Destination Guides
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover the most beautiful destinations around Mallorca and the Balearic Islands with our expert guides.
            </p>
            <Button size="lg">
              <Compass className="mr-2 h-5 w-5" />
              Explore Destinations
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex items-center justify-center space-x-3">
              <Waves className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-semibold">Best Season</h3>
                <p className="text-gray-600">May - October</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <Clock className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-semibold">Typical Charter</h3>
                <p className="text-gray-600">6-8 hours</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <MapPin className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-semibold">Operating Area</h3>
                <p className="text-gray-600">50 nautical miles</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destination Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600">
              Carefully curated destinations for unforgettable yacht experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      destination.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      destination.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {destination.difficulty}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {destination.duration}
                    </span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {destination.name}
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">4.8</span>
                    </div>
                  </CardTitle>
                  <CardDescription>{destination.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Camera className="h-4 w-4 mr-2 text-blue-600" />
                      Highlights
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {destination.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    View Full Guide
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Planning Tips */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Planning Your Charter
            </h2>
            <p className="text-xl text-gray-600">
              Essential tips for the perfect Mallorca yacht experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <Clock className="h-6 w-6 text-blue-600 mr-3" />
                  Best Times to Visit
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg">May - June</h4>
                    <p className="text-gray-600">Perfect weather, fewer crowds, calm seas</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">July - August</h4>
                    <p className="text-gray-600">Peak season, warmest weather, busiest</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">September - October</h4>
                    <p className="text-gray-600">Ideal conditions, warm water, less crowded</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <Waves className="h-6 w-6 text-blue-600 mr-3" />
                  Weather Conditions
                </h3>
                <div className="space-y-3">
                  <p className="text-gray-600">• Average temperatures: 22-28°C (72-82°F)</p>
                  <p className="text-gray-600">• Prevailing winds: Light to moderate</p>
                  <p className="text-gray-600">• Sea conditions: Generally calm</p>
                  <p className="text-gray-600">• Visibility: Excellent (15+ nautical miles)</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <MapPin className="h-6 w-6 text-blue-600 mr-3" />
                  What to Bring
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Essential</h4>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Sunscreen (SPF 30+)</li>
                      <li>• Sunglasses</li>
                      <li>• Hat or cap</li>
                      <li>• Swimwear</li>
                      <li>• Towels</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Optional</h4>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Camera</li>
                      <li>• Light jacket</li>
                      <li>• Snorkeling gear</li>
                      <li>• Book/magazine</li>
                      <li>• Waterproof bag</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">Local Regulations</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Marine protected areas require special permits</li>
                  <li>• Anchoring restrictions in certain bays</li>
                  <li>• Speed limits near shore (3 knots)</li>
                  <li>• Respect wildlife and marine environment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Explore Mallorca?
          </h2>
          <p className="text-xl mb-8">
            Book your charter today and discover these incredible destinations with our expert crew.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Book Charter Now
            </Button>
            <Button size="lg" variant="outline">
              Contact Local Guide
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Guides;
