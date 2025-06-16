
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/SecureAuthContext';
import { toast } from '@/hooks/use-toast';
import { signInSchema, signUpSchema, sanitizeInput } from '@/utils/inputValidation';
import { Shield, AlertTriangle, Eye, EyeOff } from 'lucide-react';

// Restricted public roles only - security enhanced
const publicUserRoles = [{
  value: 'charter_clients',
  label: 'Charter Client'
}, {
  value: 'boat_club_clients',
  label: 'Boat Club Client'
}, {
  value: 'charter_brokers',
  label: 'Charter Broker'
}];
export const SecureAuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'charter_clients',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const {
    signIn,
    signUp
  } = useAuth();
  const validateForm = () => {
    const schema = isLogin ? signInSchema : signUpSchema;
    const dataToValidate = isLogin ? {
      email: formData.email,
      password: formData.password
    } : formData;
    
    // Check password confirmation for signup
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return false;
    }
    
    try {
      schema.parse(dataToValidate);
      setErrors({});
      return true;
    } catch (error: any) {
      const newErrors: Record<string, string> = {};
      error.errors?.forEach((err: any) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
  };
  const handleInputChange = (field: string, value: string | boolean) => {
    if (typeof value === 'string') {
      // Sanitize input to prevent XSS
      const sanitizedValue = sanitizeInput(value);
      setFormData(prev => ({
        ...prev,
        [field]: sanitizedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }

    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
    
    // Clear confirm password error when either password field changes
    if ((field === 'password' || field === 'confirmPassword') && errors.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: ''
      }));
    }
  };
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
        const {
          error
        } = await signIn(formData.email, formData.password);
        if (error) {
          // Don't expose detailed error information
          toast({
            title: "Sign In Failed",
            description: "Invalid email or password. Please try again.",
            variant: "destructive"
          });
        } else {
          // Store remember me preference
          if (formData.rememberMe) {
            localStorage.setItem('zatara_remember_email', formData.email);
          } else {
            localStorage.removeItem('zatara_remember_email');
          }
        }
      } else {
        const {
          error
        } = await signUp(formData.email, formData.password, {
          first_name: formData.firstName,
          last_name: formData.lastName,
          role: formData.role
        });
        if (error) {
          // Handle specific signup errors securely
          let errorMessage = "Registration failed. Please try again.";
          if (error.message?.includes('already registered')) {
            errorMessage = "This email is already registered. Please sign in instead.";
          }
          toast({
            title: "Registration Failed",
            description: errorMessage,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Success!",
            description: "Please check your email to confirm your account."
          });
        }
      }
    } catch (error) {
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
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem('zatara_remember_email');
    if (rememberedEmail) {
      setFormData(prev => ({
        ...prev,
        email: rememberedEmail,
        rememberMe: true
      }));
    }
  }, []);
  return <Card className="w-full max-w-md mx-auto">
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {!isLogin && <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" type="text" value={formData.firstName} onChange={e => handleInputChange('firstName', e.target.value)} className={errors.firstName ? 'border-red-500' : ''} required />
                  {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" type="text" value={formData.lastName} onChange={e => handleInputChange('lastName', e.target.value)} className={errors.lastName ? 'border-red-500' : ''} required />
                  {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={value => handleInputChange('role', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {publicUserRoles.map(roleOption => <SelectItem key={roleOption.value} value={roleOption.value}>
                        {roleOption.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Note:</strong> Staff and management accounts require approval. 
                  Contact your administrator if you need elevated access.
                </div>
              </div>
            </>}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} className={errors.email ? 'border-red-500' : ''} required />
            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input id="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={e => handleInputChange('password', e.target.value)} className={errors.password ? 'border-red-500 pr-10' : 'pr-10'} required />
              <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
              </Button>
            </div>
            {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
            {!isLogin && <p className="text-xs text-gray-600">
                Password must be at least 8 characters with uppercase, lowercase, and number
              </p>}
          </div>
          {!isLogin && <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={e => handleInputChange('confirmPassword', e.target.value)} className={errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'} required />
                <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                </Button>
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>}
          {isLogin && <div className="flex items-center space-x-2">
              <Checkbox id="rememberMe" checked={formData.rememberMe} onCheckedChange={checked => handleInputChange('rememberMe', checked as boolean)} />
              <Label htmlFor="rememberMe" className="text-sm font-normal cursor-pointer">
                Remember me
              </Label>
            </div>}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full gradient-zatara" disabled={loading}>
            {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
          </Button>
          <Button type="button" variant="ghost" onClick={() => setIsLogin(!isLogin)} className="w-full">
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </Button>
        </CardFooter>
      </form>
    </Card>;
};
