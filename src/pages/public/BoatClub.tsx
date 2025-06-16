
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
  Calendar,
  Waves,
  Fish,
  Camera
} from 'lucide-react';

const BoatClub = () => {
  const membershipPackages = [
    {
      name: "Sea Explorer",
      type: "Lite Package",
      description: "Perfect for occasional adventures",
      features: [
        "Lower upfront cost",
        "Co-payment per booking",
        "Guaranteed availability",
        "Free water toys",
        "Professional skipper included",
        "Learn new skills sessions"
      ],
      boats: ["Zatara", "PuraVida"],
      ideal: "2-6 outings per year"
    },
    {
      name: "Ocean Enthusiast", 
      type: "Regular Package",
      description: "For regular sea lovers",
      features: [
        "Moderate upfront investment",
        "Reduced co-payments",
        "Priority booking",
        "Free water toys & equipment",
        "Skippered or learn to skipper",
        "Special member days out",
        "Fishing & diving experiences"
      ],
      boats: ["Zatara", "PuraVida"],
      ideal: "6-15 outings per year"
    }
  ];

  const clubFeatures = [
    {
      icon: <Anchor className="h-8 w-8 text-zatara-blue" />,
      title: "Skippered Experience",
      description: "Sit back and enjoy yourself with our professional skippers, or learn to skipper under supervision"
    },
    {
      icon: <Waves className="h-8 w-8 text-zatara-blue" />,
      title: "Free Water Toys",
      description: "All water toys and equipment included for members - no extra charges"
    },
    {
      icon: <Fish className="h-8 w-8 text-zatara-blue" />,
      title: "Special Activities",
      description: "Learn to sail, freedive, fish, or just enjoy the Mediterranean waters"
    },
    {
      icon: <Calendar className="h-8 w-8 text-zatara-blue" />,
      title: "Guaranteed Availability",
      description: "Custom packages available with guaranteed boat access when you need it"
    }
  ];

  const currentFleet = [
    {
      name: "Zatara",
      location: "Naviera Balear",
      capacity: "Up to 12 guests",
      features: ["Luxury yacht", "8-hour charters", "Premium service"],
      image: "https://eefenqehcesevuudtpti.supabase.co/storage/v1/object/public/zataraphotos/zatara-profile.jpg"
    },
    {
      name: "PuraVida",
      location: "Club de Mar", 
      capacity: "Up to 10 guests",
      features: ["Family friendly", "6-hour charters", "Great for beginners"],
      image: "https://eefenqehcesevuudtpti.supabase.co/storage/v1/object/public/puravidaphotos/puravida-profile.jpg"
    }
  ];

  const handleWhatsAppInquiry = (packageName: string) => {
    const message = `Hello Zatara, I'm interested in the ${packageName} boat club membership. Can you provide more information?`;
    window.open(`https://wa.me/34711013403?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-r from-zatara-navy to-zatara-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <img 
              src="/lovable-uploads/c2ba532a-b378-4225-bbe6-7b4846e018fd.png" 
              alt="Zatara Boat Club" 
              className="h-16 w-auto mx-auto mb-8"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Exclusive Boat Club Membership
            </h1>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Lower upfront costs with co-payments when you book. Less pressure, more flexibility, guaranteed availability when you want to go out on the water.
            </p>
          </div>
        </div>
      </section>

      {/* Membership Packages */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zatara-navy mb-4">
              Membership Packages
            </h2>
            <p className="text-lg text-gray-600">
              Choose the package that fits your lifestyle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {membershipPackages.map((pkg, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-2 border-zatara-blue-light">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <CardTitle className="text-zatara-navy text-2xl">{pkg.name}</CardTitle>
                    <Badge className="bg-zatara-blue text-white">
                      {pkg.type}
                    </Badge>
                  </div>
                  <CardDescription className="text-base">
                    {pkg.description}
                  </CardDescription>
                  <p className="text-sm text-zatara-blue font-medium">
                    Ideal for: {pkg.ideal}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <Shield className="h-4 w-4 mr-3 text-zatara-blue flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-zatara-navy mb-2">Available boats:</p>
                    <div className="flex flex-wrap gap-2">
                      {pkg.boats.map((boat, idx) => (
                        <Badge key={idx} variant="outline" className="border-zatara-blue text-zatara-blue">
                          {boat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-zatara-blue hover:bg-zatara-blue-dark text-white"
                    onClick={() => handleWhatsAppInquiry(pkg.name)}
                  >
                    Inquire About {pkg.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Club Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zatara-navy mb-4">
              Why Join Our Boat Club?
            </h2>
            <p className="text-lg text-gray-600">
              Enjoy all the benefits of boat ownership without the hassle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {clubFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-zatara-navy mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Fleet */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zatara-navy mb-4">
              Our Current Fleet
            </h2>
            <p className="text-lg text-gray-600">
              Premium boats available to club members
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {currentFleet.map((boat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  <img 
                    src={boat.image} 
                    alt={boat.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-zatara-navy text-xl">{boat.name}</CardTitle>
                  <CardDescription className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {boat.capacity}
                    </span>
                    <span className="text-zatara-blue font-medium">
                      {boat.location}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {boat.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <Shield className="h-4 w-4 mr-2 text-zatara-blue" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-zatara-navy mb-6">
                Ready to Join Our Boat Club?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Get in touch to learn more about membership options and find the perfect package for your lifestyle. Custom packages available based on your specific needs.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-zatara-blue" />
                  <span>Lower upfront costs than traditional boat sharing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-zatara-blue" />
                  <span>Guaranteed availability when you want it</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-zatara-blue" />
                  <span>Professional skippered service included</span>
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

export default BoatClub;
