
import React from 'react';
import { EnhancedSecureAuthForm } from '@/components/auth/EnhancedSecureAuthForm';
import { AUTH_CONFIG, SUPABASE_CONFIG_INSTRUCTIONS } from '@/utils/authConfig';

const Auth = () => {
  // Log configuration instructions for development
  React.useEffect(() => {
    console.log('Supabase Configuration Required:');
    console.log(SUPABASE_CONFIG_INSTRUCTIONS);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center gradient-mediterranean p-6">
      <div className="w-full max-w-md">
        <div className="animate-slide-up">
          <div className="bg-white/90 backdrop-blur-sm rounded-luxury shadow-elegant p-6 border border-zatara-gold/20">
            {/* Logo with proper sizing to match form elements */}
            <div className="text-center mb-4">
              <img 
                src="/lovable-uploads/83fe3d22-8bf7-47d2-9462-1954772ef062.png" 
                alt="Zatara" 
                className="h-48 w-auto hover:opacity-90 transition-opacity duration-300 object-cover mx-auto" 
              />
            </div>
            <div className="w-16 h-1 bg-gradient-zatara-gold mx-auto rounded-full mt-2 mb-6"></div>
            
            {/* Enhanced auth form with cruise.zatara.es configuration */}
            <EnhancedSecureAuthForm />
            
            {/* Development notice */}
            {!window.location.hostname.includes('cruise.zatara.es') && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-700 text-center">
                  <strong>Development Mode:</strong> This will be deployed to cruise.zatara.es
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
