
import React from 'react';
import { SecureAuthForm } from '@/components/auth/SecureAuthForm';

const Auth = () => {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-mediterranean p-6">
      <div className="w-full max-w-lg">
        <div className="text-center mb-12 animate-fade-in">
          {/* Luxury Zatara Logo */}
          <div className="mb-8">
            <img 
              src="/lovable-uploads/83fe3d22-8bf7-47d2-9462-1954772ef062.png" 
              alt="Zatara" 
              className="h-20 sm:h-24 w-auto mx-auto brightness-0 saturate-0 opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          <div className="space-y-4">
            <h1 className="zatara-luxury-script text-luxury-3xl text-zatara-navy">
              Zatara Mar
            </h1>
            <div className="text-luxury-sm text-zatara-blue font-medium tracking-wide">
              LUXURY MANAGEMENT PORTAL
            </div>
            <div className="w-24 h-1 bg-gradient-zatara-gold mx-auto rounded-full"></div>
            <p className="text-luxury-xs text-zatara-navy/70 max-w-md mx-auto leading-relaxed">
              Exclusive access to your premium yacht services dashboard
            </p>
          </div>
        </div>
        <div className="animate-slide-up">
          <div className="bg-white/90 backdrop-blur-sm rounded-luxury shadow-elegant p-8 sm:p-10 border border-zatara-gold/20">
            <SecureAuthForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
