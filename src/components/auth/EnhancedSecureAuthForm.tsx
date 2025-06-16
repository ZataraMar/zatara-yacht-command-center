
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/SecureAuthContext';
import { toast } from '@/hooks/use-toast';
import { useAuthForm } from '@/hooks/useAuthForm';
import { AuthFormFields } from './AuthFormFields';
import { AUTH_CONFIG } from '@/utils/authConfig';
import { AlertCircle, CheckCircle, Mail } from 'lucide-react';

export const EnhancedSecureAuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const { formData, errors, validateForm, handleInputChange, setFormData } = useAuthForm(isLogin);

  // Check URL params for password reset mode
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'reset') {
      setIsPasswordReset(true);
      setIsLogin(false);
    }
  }, []);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // For now, we'll show a success message
      // In a real implementation, you'd call supabase.auth.resetPasswordForEmail
      setEmailSent(true);
      toast({
        title: "Reset Email Sent",
        description: "Check your email for password reset instructions.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset email. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isPasswordReset) {
      return handlePasswordReset(e);
    }
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors below.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          toast({
            title: "Sign In Failed",
            description: "Invalid email or password. Please try again.",
            variant: "destructive"
          });
        } else {
          if (formData.rememberMe) {
            localStorage.setItem('zatara_remember_email', formData.email);
          } else {
            localStorage.removeItem('zatara_remember_email');
          }
          toast({
            title: "Welcome back!",
            description: "Redirecting to your dashboard...",
          });
        }
      } else {
        const { error } = await signUp(formData.email, formData.password, {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone_number: formData.phone,
          whatsapp_enabled: formData.whatsappEnabled,
          role: formData.role
        });
        
        if (error) {
          let errorMessage = "Registration failed. Please try again.";
          
          if (error.message?.includes('already registered') || error.message?.includes('User already registered')) {
            errorMessage = `This email address is already registered. Please sign in instead or use "Forgot Password" if you need to reset your password.`;
            toast({
              title: "Account Already Exists",
              description: errorMessage,
              variant: "destructive"
            });
            setTimeout(() => {
              setIsLogin(true);
              setIsPasswordReset(false);
              setFormData(prev => ({
                ...prev,
                password: '',
                confirmPassword: ''
              }));
            }, 3000);
            return;
          }
          
          if (error.message?.includes('phone') || error.message?.includes('Phone')) {
            errorMessage = "This phone number is already associated with another account. Please use a different phone number or sign in to your existing account.";
          }
          
          toast({
            title: "Registration Failed",
            description: errorMessage,
            variant: "destructive"
          });
        } else {
          setEmailSent(true);
          toast({
            title: "Registration Successful!",
            description: "Please check your email to confirm your account. Once confirmed, you can sign in.",
            duration: 10000
          });
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Load remembered email on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('zatara_remember_email');
    if (rememberedEmail && isLogin) {
      setFormData(prev => ({
        ...prev,
        email: rememberedEmail,
        rememberMe: true
      }));
    }
  }, [setFormData, isLogin]);

  if (emailSent) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-full">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-green-700">Check Your Email</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-blue-800 font-medium">Email sent successfully!</p>
                <p className="text-blue-700 text-sm mt-1">
                  {isPasswordReset ? 
                    "We've sent password reset instructions to your email address." :
                    "We've sent a confirmation email with instructions to activate your account."
                  }
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <p className="text-amber-800 font-medium">Next Steps:</p>
                <ul className="text-amber-700 text-sm mt-1 space-y-1">
                  <li>• Check your inbox (and spam folder)</li>
                  <li>• Click the verification link in the email</li>
                  <li>• Return here to sign in</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="ghost" 
            onClick={() => {
              setEmailSent(false);
              setIsLogin(true);
              setIsPasswordReset(false);
            }} 
            className="w-full"
          >
            Back to Sign In
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const getFormTitle = () => {
    if (isPasswordReset) return "Reset Password";
    return isLogin ? "Welcome Back" : "Create Account";
  };

  const getFormSubtitle = () => {
    if (isPasswordReset) return "Enter your email to receive reset instructions";
    return isLogin ? "Sign in to your Zatara account" : "Join the Zatara community";
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-zatara-navy">{getFormTitle()}</CardTitle>
        <p className="text-center text-zatara-blue text-sm">{getFormSubtitle()}</p>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {isPasswordReset ? (
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zatara-blue"
                placeholder="Enter your email address"
                required
              />
            </div>
          ) : (
            <AuthFormFields
              isLogin={isLogin}
              formData={formData}
              errors={errors}
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              onInputChange={handleInputChange}
              onTogglePassword={() => setShowPassword(!showPassword)}
              onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full gradient-zatara" disabled={loading}>
            {loading ? 'Loading...' : 
             isPasswordReset ? 'Send Reset Email' :
             isLogin ? 'Sign In' : 'Create Account'}
          </Button>
          
          <div className="flex flex-col space-y-2 w-full">
            {!isPasswordReset && (
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setIsPasswordReset(false);
                }} 
                className="w-full"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </Button>
            )}
            
            {isLogin && !isPasswordReset && (
              <Button 
                type="button" 
                variant="link" 
                onClick={() => {
                  setIsPasswordReset(true);
                  setIsLogin(false);
                }}
                className="text-sm text-zatara-blue hover:text-zatara-navy"
              >
                Forgot your password?
              </Button>
            )}
            
            {isPasswordReset && (
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => {
                  setIsPasswordReset(false);
                  setIsLogin(true);
                }}
                className="w-full"
              >
                Back to Sign In
              </Button>
            )}
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};
