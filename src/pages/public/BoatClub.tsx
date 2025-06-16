
import React from 'react';
import { Navigation } from '@/components/public/Navigation';
import { Footer } from '@/components/public/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Users, Calendar, Anchor, Star, Crown } from 'lucide-react';

const BoatClub = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Zatara Boat Club
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience yacht ownership without the hassle. Join our exclusive boat club for unlimited access to premium yachts.
            </p>
            <Button size="lg">
              <Crown className="mr-2 h-5 w-5" />
              Join the Club
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Club Benefits
            </h2>
            <p className="text-xl text-gray-600">
              All the benefits of yacht ownership without the costs and responsibilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Priority Booking</CardTitle>
                <CardDescription>
                  Book up to 30 days in advance with member-only time slots
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Unlimited Usage</CardTitle>
                <CardDescription>
                  No limits on booking frequency - sail as often as you want
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Anchor className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Premium Fleet Access</CardTitle>
                <CardDescription>
                  Access to our entire fleet including exclusive member-only yachts
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Star className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>VIP Treatment</CardTitle>
                <CardDescription>
                  Dedicated crew, premium amenities, and personalized service
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Check className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>No Maintenance</CardTitle>
                <CardDescription>
                  Zero maintenance costs or responsibilities - just show up and sail
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Crown className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Exclusive Events</CardTitle>
                <CardDescription>
                  Member-only events, regattas, and social gatherings
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Membership Options
            </h2>
            <p className="text-xl text-gray-600">
              Choose the membership level that fits your sailing lifestyle
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Bronze */}
            <Card className="relative">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Bronze Member</CardTitle>
                <CardDescription>Perfect for occasional sailors</CardDescription>
                <div className="text-3xl font-bold text-blue-600 mt-4">€2,500</div>
                <div className="text-sm text-gray-500">per year</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-600 mr-3" />
                    <span>4 full-day charters per month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-600 mr-3" />
                    <span>PuraVida yacht access</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-600 mr-3" />
                    <span>Standard booking window</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-600 mr-3" />
                    <span>Basic amenities included</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Choose Bronze
                </Button>
              </CardContent>
            </Card>

            {/* Silver */}
            <Card className="relative border-blue-500 border-2">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Silver Member</CardTitle>
                <CardDescription>For regular sailing enthusiasts</CardDescription>
                <div className="text-3xl font-bold text-blue-600 mt-4">€4,200</div>
                <div className="text-sm text-gray-500">per year</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-600 mr-3" />
                    <span>8 full-day charters per month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-600 mr-3" />
                    <span>Both Zatara & PuraVida access</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-600 mr-3" />
                    <span>Priority booking (14 days advance)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-600 mr-3" />
                    <span>Premium amenities included</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-600 mr-3" />
                    <span>Member events access</span>
                  </li>
                </ul>
                <Button className="w-full">
                  Choose Silver
                </Button>
              </CardContent>
            </Card>

            {/* Gold */}
            <Card className="relative">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center">
                  <Crown className="h-6 w-6 text-yellow-500 mr-2" />
                  Gold Member
                </CardTitle>
                <CardDescription>Ultimate sailing experience</CardDescription>
                <div className="text-3xl font-bold text-blue-600 mt-4">€7,500</div>
                <div className="text-sm text-gray-500">per year</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-600 mr-3" />
                    <span>Unlimited charter access</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-600 mr-3" />
                    <span>Entire fleet + exclusive yachts</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-600 mr-3" />
                    <span>30-day advance booking</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-600 mr-3" />
                    <span>Luxury amenities & concierge</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-600 mr-3" />
                    <span>All events + private gatherings</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-600 mr-3" />
                    <span>Transferable privileges</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Choose Gold
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold">Join the Club</h3>
              <p className="text-gray-600">Choose your membership tier and complete the simple application process.</p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold">Book Online</h3>
              <p className="text-gray-600">Use our member portal to book your preferred yacht and time slot.</p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold">Show Up & Sail</h3>
              <p className="text-gray-600">Arrive at the marina - everything is prepared and ready for your adventure.</p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                4
              </div>
              <h3 className="text-xl font-semibold">Enjoy & Repeat</h3>
              <p className="text-gray-600">No maintenance, no storage costs - just unlimited sailing enjoyment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join the Club?
          </h2>
          <p className="text-xl mb-8">
            Start your membership today and experience the freedom of yacht ownership without the hassles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Apply for Membership
            </Button>
            <Button size="lg" variant="outline">
              Schedule Tour
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BoatClub;
