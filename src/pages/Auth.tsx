
import React from 'react';
import { SecureAuthForm } from '@/components/auth/SecureAuthForm';

const Auth = () => {
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
                className="h-48 w-auto hover:opacity-90 transition-opacity duration-300 object-cover" 
              />
            </div>
            <div className="w-16 h-1 bg-gradient-zatara-gold mx-auto rounded-full mt-2"></div>
            <SecureAuthForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
