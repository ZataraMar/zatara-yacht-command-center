import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Mail, Lock, User, Phone, Calendar, MapPin } from 'lucide-react';
import { ZataraLogo } from '@/components/common/ZataraLogo';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface LoginFormData {
  email: string;
  password: string;
}

interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  bookingLocator: string;
}

export const ClientAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const { toast } = useToast();

  const [loginForm, setLoginForm] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const [signupForm, setSignupForm] = useState<SignupFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    bookingLocator: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('🔐 Customer login attempt:', loginForm.email);

      // For demo purposes, we'll use a simple authentication check
      // In production, you would implement proper password hashing and verification
      const { data: customer, error } = await supabase
        .from('customer_users')
        .select('*')
        .eq('email', loginForm.email)
        .eq('account_status', 'active')
        .single();

      if (error || !customer) {
        throw new Error('Invalid email or password');
      }

      // Store customer session (simplified for demo)
      localStorage.setItem('zatara_customer_id', customer.id.toString());
      localStorage.setItem('zatara_customer_email', customer.email);
      localStorage.setItem('zatara_customer_name', `${customer.first_name} ${customer.last_name}`);

      // Log the login interaction
      await supabase
        .from('customer_interactions')
        .insert({
          customer_id: customer.id,
          interaction_type: 'website',
          interaction_source: 'portal',
          interaction_summary: 'Customer logged in to portal'
        });

      toast({
        title: "Welcome back!",
        description: `Logged in successfully as ${customer.first_name}`,
      });

      // Redirect to customer dashboard
      window.location.href = '/customer-portal';

    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error.message || "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('📝 Customer signup attempt:', signupForm.email);

      // Validate passwords match
      if (signupForm.password !== signupForm.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Validate booking locator exists
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .select('id, locator, guest_email, guest_first_name, guest_surname')
        .eq('locator', signupForm.bookingLocator)
        .eq('guest_email', signupForm.email)
        .single();

      if (bookingError || !booking) {
        throw new Error('No booking found with this email and locator. Please check your booking confirmation.');
      }

      // Create customer account using our database function
      const { data: result, error: createError } = await supabase
        .rpc('create_customer_from_booking', {
          p_email: signupForm.email,
          p_password_hash: signupForm.password, // In production, hash this properly
          p_booking_locator: signupForm.bookingLocator
        });

      if (createError) {
        throw createError;
      }

      const customerResult = result[0];
      if (!customerResult.success) {
        throw new Error(customerResult.message);
      }

      toast({
        title: "Account Created!",
        description: "Your customer account has been created successfully. You can now log in.",
      });

      // Switch to login tab
      setActiveTab('login');
      setLoginForm({ email: signupForm.email, password: signupForm.password });

    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Account Creation Failed",
        description: error.message || "Please check your information and try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zatara-blue/10 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <ZataraLogo variant="full" size="lg" className="mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-zatara-navy mb-2">Client Portal</h1>
          <p className="text-gray-600">Access your bookings and charter information</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Create Account</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        className="pl-10 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <Alert className="mb-4">
                  <Calendar className="h-4 w-4" />
                  <AlertDescription>
                    You need an existing booking to create an account. Please have your booking locator ready.
                  </AlertDescription>
                </Alert>

                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          value={signupForm.firstName}
                          onChange={(e) => setSignupForm({...signupForm, firstName: e.target.value})}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        value={signupForm.lastName}
                        onChange={(e) => setSignupForm({...signupForm, lastName: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signupEmail">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signupEmail"
                        type="email"
                        placeholder="your@email.com"
                        value={signupForm.email}
                        onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+34 123 456 789"
                        value={signupForm.phone}
                        onChange={(e) => setSignupForm({...signupForm, phone: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bookingLocator">Booking Locator</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="bookingLocator"
                        type="text"
                        placeholder="e.g., 20250610-AB927"
                        value={signupForm.bookingLocator}
                        onChange={(e) => setSignupForm({...signupForm, bookingLocator: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signupPassword">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signupPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={signupForm.password}
                        onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={signupForm.confirmPassword}
                        onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-600">
          <p>Need help? Contact us at <a href="mailto:cruise@zatara.es" className="text-zatara-blue hover:underline">cruise@zatara.es</a></p>
        </div>
      </div>
    </div>
  );
};
