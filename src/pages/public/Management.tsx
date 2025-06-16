
import React from 'react';
import { Navigation } from '@/components/public/Navigation';
import { Footer } from '@/components/public/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Settings, Users, Calendar, Wrench, FileText, Phone, Star } from 'lucide-react';

const Management = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Yacht Management Services
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Complete yacht management solutions in Mallorca. Let us handle everything while you enjoy your yacht.
            </p>
            <Button size="lg">
              <Settings className="mr-2 h-5 w-5" />
              Get Management Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Management Solutions
            </h2>
            <p className="text-xl text-gray-600">
              Professional yacht management services covering every aspect of yacht ownership
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Wrench className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Technical Management</CardTitle>
                <CardDescription>
                  Complete technical oversight including maintenance, repairs, and system monitoring
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Crew Management</CardTitle>
                <CardDescription>
                  Professional crew recruitment, training, and management services
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Administrative</CardTitle>
                <CardDescription>
                  Documentation, insurance, registration, and compliance management
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Charter Management</CardTitle>
                <CardDescription>
                  Professional charter operations to generate revenue from your yacht
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Insurance & Safety</CardTitle>
                <CardDescription>
                  Comprehensive insurance management and safety compliance programs
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>24/7 Support</CardTitle>
                <CardDescription>
                  Round-the-clock emergency support and concierge services
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Management Packages */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Management Packages
            </h2>
            <p className="text-xl text-gray-600">
              Tailored management solutions for every yacht owner's needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Essential */}
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Essential</CardTitle>
                <CardDescription>Basic management for smaller yachts</CardDescription>
                <div className="text-3xl font-bold text-blue-600 mt-4">€1,500</div>
                <div className="text-sm text-gray-500">per month</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>Basic maintenance oversight</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>Documentation management</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>Insurance coordination</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>Monthly reporting</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>Emergency support</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Choose Essential
                </Button>
              </CardContent>
            </Card>

            {/* Premium */}
            <Card className="border-blue-500 border-2 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Recommended
                </span>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Premium</CardTitle>
                <CardDescription>Complete management solution</CardDescription>
                <div className="text-3xl font-bold text-blue-600 mt-4">€3,500</div>
                <div className="text-sm text-gray-500">per month</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>Full technical management</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>Crew management included</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>Charter operations</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>24/7 concierge service</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>Weekly reporting</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>Revenue optimization</span>
                  </li>
                </ul>
                <Button className="w-full">
                  Choose Premium
                </Button>
              </CardContent>
            </Card>

            {/* Luxury */}
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-500 mr-2" />
                  Luxury
                </CardTitle>
                <CardDescription>White-glove service for superyachts</CardDescription>
                <div className="text-3xl font-bold text-blue-600 mt-4">Custom</div>
                <div className="text-sm text-gray-500">quote required</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>Dedicated yacht manager</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>Full crew + captain management</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>Luxury charter operations</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>Personal concierge</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>Real-time reporting</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>Custom services</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Get Custom Quote
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Our Management */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Zatara Management?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Local Expertise</h3>
                <p className="text-gray-600 text-lg">
                  Deep knowledge of Mallorca's marinas, regulations, and service providers ensures your yacht receives the best care.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-4">Revenue Generation</h3>
                <p className="text-gray-600 text-lg">
                  Our charter operations can help offset management costs while maintaining your yacht to the highest standards.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-4">Transparent Reporting</h3>
                <p className="text-gray-600 text-lg">
                  Regular detailed reports keep you informed about your yacht's condition, expenses, and charter performance.
                </p>
              </div>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80"
                alt="Yacht management services"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Simplify Yacht Ownership?
          </h2>
          <p className="text-xl mb-8">
            Let our experienced team handle every aspect of your yacht while you focus on enjoying it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Get Management Quote
            </Button>
            <Button size="lg" variant="outline">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Management;
