
import React from 'react';
import { SecureAuthForm } from '@/components/auth/SecureAuthForm';

const Auth = () => {
  return (
    <div className="min-h-screen gradient-mediterranean p-6 flex justify-center pt-[33vh]">
      <div className="w-full max-w-sm">
        <div className="animate-slide-up">
          {/* Logo positioned above the form box */}
          <div className="text-center mb-6">
            <img 
              src="/lovable-uploads/83fe3d22-8bf7-47d2-9462-1954772ef062.png" 
              alt="Zatara" 
              className="h-56 w-auto mx-auto hover:opacity-90 transition-opacity duration-300 object-contain" 
            />
            <div className="w-16 h-1 bg-gradient-zatara-gold mx-auto rounded-full mt-4"></div>
          </div>
          
          {/* Compact authentication form box */}
          <div className="bg-white/90 backdrop-blur-sm rounded-luxury shadow-elegant p-6 border border-zatara-gold/20">
            <SecureAuthForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
