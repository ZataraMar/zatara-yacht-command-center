
import React from 'react';
import { SecureAuthForm } from '@/components/auth/SecureAuthForm';

const Auth = () => {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-mediterranean p-6">
      <div className="w-full max-w-md">
        <div className="animate-slide-up">
          <div className="bg-white/90 backdrop-blur-sm rounded-luxury shadow-elegant p-8 sm:p-10 border border-zatara-gold/20">
            {/* Logo with proper sizing to match form elements */}
            <div className="text-center mb-6">
              <div className="overflow-hidden inline-block">
                <img 
                  src="/lovable-uploads/83fe3d22-8bf7-47d2-9462-1954772ef062.png" 
                  alt="Zatara" 
                  className="h-16 w-auto mx-auto hover:opacity-90 transition-opacity duration-300 object-cover" 
                  style={{ 
                    padding: '0', 
                    margin: '0 auto'
                  }}
                />
              </div>
              <div className="w-16 h-1 bg-gradient-zatara-gold mx-auto rounded-full mt-4"></div>
            </div>
            <SecureAuthForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
