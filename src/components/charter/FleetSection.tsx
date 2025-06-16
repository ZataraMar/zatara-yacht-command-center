
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, Shield } from 'lucide-react';

export const FleetSection = () => {
  const boatCards = [
    {
      name: "Zatara",
      type: "Luxury Charter Yacht",
      capacity: "Up to 12 guests",
      duration: "8 hours",
      features: ["Premium service", "Professional captain", "Gourmet catering"],
      price: "From €2,500",
      image: "https://eefenqehcesevuudtpti.supabase.co/storage/v1/object/public/zataraphotos/zatara-main.jpg", // Update with actual image path
      hasBoatClub: true,
      location: "Naviera Balear"
    },
    {
      name: "PuraVida", 
      type: "Day Charter Boat",
      capacity: "Up to 10 guests",
      duration: "6 hours",
      features: ["Family friendly", "Snorkeling gear", "Light refreshments"],
      price: "From €1,800",
      image: "https://eefenqehcesevuudtpti.supabase.co/storage/v1/object/public/puravidaphotos/puravida-main.jpg", // Update with actual image path
      hasBoatClub: true,
      location: "Club de Mar"
    },
    {
      name: "Monte Carlo 5",
      type: "Luxury Cruiser",
      capacity: "Up to 8 guests", 
      duration: "8 hours",
      features: ["Coming soon", "Premium comfort", "Advanced navigation"],
      price: "Expression of Interest",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      hasBoatClub: false,
      isComingSoon: true
    },
    {
      name: "Fjord 40",
      type: "Open Cruiser",
      capacity: "Up to 10 guests", 
      duration: "8 hours",
      features: ["Coming soon", "Scandinavian design", "Performance cruising"],
      price: "Expression of Interest",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=800&q=80",
      hasBoatClub: false,
      isComingSoon: true
    },
    {
      name: "Saxdor 400 GTO",
      type: "Sport Cruiser",
      capacity: "Up to 12 guests", 
      duration: "8 hours",
      features: ["Coming soon", "Sport performance", "Modern luxury"],
      price: "Expression of Interest",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
      hasBoatClub: false,
      isComingSoon: true
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-zatara-navy mb-4">
            Our Premium Fleet
          </h2>
          <p className="text-lg text-gray-600">
            Choose from our carefully maintained luxury vessels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {boatCards.map((boat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                <img 
                  src={boat.image} 
                  alt={boat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-zatara-navy text-xl">{boat.name}</CardTitle>
                  <Badge variant="secondary" className={`${boat.isComingSoon ? 'bg-gray-500' : 'bg-zatara-blue'} text-white`}>
                    {boat.isComingSoon ? 'Coming Soon' : boat.type}
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
                {boat.location && (
                  <p className="text-sm text-zatara-blue font-medium">{boat.location}</p>
                )}
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
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-zatara-navy">
                    {boat.price}
                  </span>
                </div>
                <div className="space-y-2">
                  {boat.isComingSoon ? (
                    <Button 
                      className="w-full bg-gray-500 hover:bg-gray-600 text-white"
                      onClick={() => window.open('https://wa.me/34711013403?text=I%20would%20like%20to%20express%20interest%20in%20the%20' + boat.name, '_blank')}
                    >
                      Express Interest
                    </Button>
                  ) : (
                    <Button 
                      className="w-full bg-zatara-blue hover:bg-zatara-blue-dark text-white"
                      onClick={() => window.open('https://boatcharter.zatara.es/en/', '_blank')}
                    >
                      Book Now
                    </Button>
                  )}
                  {boat.hasBoatClub && (
                    <Button 
                      variant="outline"
                      className="w-full border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white"
                      onClick={() => window.location.href = '/boat-club'}
                    >
                      Join Boat Club
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
