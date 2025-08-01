
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useAuth } from '@/contexts/SecureAuthContext';
import { toast } from '@/hooks/use-toast';
import { useAuthForm } from '@/hooks/useAuthForm';
import { AuthFormFields } from './AuthFormFields';

export const SecureAuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const { formData, errors, validateForm, handleInputChange, setFormData } = useAuthForm(isLogin);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          
          // Check for specific error types
          if (error.message?.includes('already registered') || error.message?.includes('User already registered')) {
            errorMessage = `This email address is already registered. Please sign in instead or use the "Forgot Password" option if you need to reset your password.`;
            toast({
              title: "Account Already Exists",
              description: errorMessage,
              variant: "destructive"
            });
            // Auto-switch to login mode
            setTimeout(() => {
              setIsLogin(true);
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
          toast({
            title: "Registration Successful!",
            description: "Please check your email to confirm your account. Once confirmed, you can sign in and verify your WhatsApp number if applicable.",
            duration: 8000
          });
          // Clear form and switch to login
          setFormData(prev => ({
            ...prev,
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            phone: '',
            whatsappEnabled: false,
            role: 'charter_clients'
          }));
          setTimeout(() => setIsLogin(true), 2000);
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      
      // Handle network or unexpected errors
      let errorMessage = "Something went wrong. Please try again.";
      
      if (error.message?.includes('already registered') || error.message?.includes('User already registered')) {
        errorMessage = "This email address is already registered. Please sign in instead.";
        setTimeout(() => setIsLogin(true), 3000);
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Load remembered email on component mount
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem('zatara_remember_email');
    if (rememberedEmail) {
      setFormData(prev => ({
        ...prev,
        email: rememberedEmail,
        rememberMe: true
      }));
    }
  }, [setFormData]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
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
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full gradient-zatara" disabled={loading}>
            {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
          </Button>
          <Button type="button" variant="ghost" onClick={() => setIsLogin(!isLogin)} className="w-full">
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </Button>
          {isLogin && (
            <div className="text-center">
              <Button type="button" variant="link" className="text-sm text-blue-600 hover:text-blue-800">
                Forgot your password?
              </Button>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};
