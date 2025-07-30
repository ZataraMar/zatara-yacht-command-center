
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/SecureAuthContext';
import { toast } from '@/hooks/use-toast';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { validateSession } from '@/utils/csrfProtection';
import { cleanupAuthState } from '@/utils/authSecurity';

// Restricted public roles only
const publicUserRoles = [
  { value: 'charter_clients', label: 'Charter Client' },
  { value: 'boat_club_clients', label: 'Boat Club Client' },
  { value: 'charter_brokers', label: 'Charter Broker' },
];

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('charter_clients');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [sessionValidated, setSessionValidated] = useState(false);
  const { signIn, signUp } = useAuth();

  // Validate existing session and setup security
  useEffect(() => {
    const initializeSecurity = async () => {
      try {
        const isValid = await validateSession();
        setSessionValidated(true);
        
        if (!isValid) {
          // Clean up any stale auth state
          cleanupAuthState();
        }
      } catch (error) {
        console.error('Session validation error:', error);
        setSessionValidated(true);
      }
    };

    initializeSecurity();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Enhanced security validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      if (isLogin) {
        // Clean any existing auth state before sign in
        cleanupAuthState();
        
        const { error } = await signIn(email, password);
        if (error) {
          // Enhanced error handling
          let errorMessage = error.message;
          if (errorMessage.includes('Invalid login credentials')) {
            errorMessage = 'Invalid email or password. Please check your credentials and try again.';
          } else if (errorMessage.includes('Email not confirmed')) {
            errorMessage = 'Please check your email and click the confirmation link before signing in.';
          }
          
          toast({
            title: "Sign In Failed",
            description: errorMessage,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "Successfully signed in to Zatara Dashboard.",
            variant: "default",
          });
        }
      } else {
        // Sign up with enhanced validation
        if (!firstName || !lastName) {
          throw new Error('First name and last name are required');
        }

        const { error } = await signUp(email, password, {
          first_name: firstName,
          last_name: lastName,
          role: role,
        });
        
        if (error) {
          let errorMessage = error.message;
          if (errorMessage.includes('User already registered')) {
            errorMessage = 'An account with this email already exists. Please sign in instead.';
          } else if (errorMessage.includes('weak password')) {
            errorMessage = 'Password is too weak. Please use a stronger password with at least 6 characters.';
          }
          
          toast({
            title: "Registration Failed",
            description: errorMessage,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account Created!",
            description: "Please check your email to confirm your account before signing in.",
            variant: "default",
          });
          
          // Switch to login mode after successful signup
          setIsLogin(true);
          setPassword('');
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{isLogin ? 'Sign In' : 'Create Account'}</CardTitle>
        <CardDescription>
          {isLogin 
            ? 'Enter your credentials to access the Zatara Mar Management Dashboard'
            : 'Create your account to get started'
          }
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {publicUserRoles.map((roleOption) => (
                      <SelectItem key={roleOption.value} value={roleOption.value}>
                        {roleOption.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                <strong>Note:</strong> Staff and management accounts require approval. 
                Contact your administrator if you need elevated access.
              </div>
            </>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="pr-10"
                placeholder={isLogin ? "Enter your password" : "Create a secure password (min 6 characters)"}
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
            {!isLogin && (
              <p className="text-xs text-gray-500">
                Use a strong password with at least 6 characters for better security
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            type="submit" 
            className="w-full bg-[#00A3E4] hover:bg-[#0085B8] text-white" 
            disabled={loading || !sessionValidated}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>{isLogin ? 'Secure Sign In' : 'Create Account'}</span>
              </div>
            )}
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setIsLogin(!isLogin);
              setPassword('');
              setFirstName('');
              setLastName('');
            }}
            className="w-full"
            disabled={loading}
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </Button>
          
          <div className="text-xs text-gray-500 text-center">
            <div className="flex items-center justify-center space-x-1">
              <Shield className="h-3 w-3" />
              <span>Secured with enterprise-grade encryption</span>
            </div>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};
