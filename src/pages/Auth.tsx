
import React from 'react';
import { SecureAuthForm } from '@/components/auth/SecureAuthForm';

const Auth = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zatara-blue to-zatara-blue-dark p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          {/* Zatara Logo Space */}
          <div className="mb-6">
            <img 
              src="/lovable-uploads/83fe3d22-8bf7-47d2-9462-1954772ef062.png" 
              alt="Zatara" 
              className="h-12 sm:h-16 w-auto mx-auto brightness-0 invert"
            />
          </div>
          <h1 className="text-responsive-lg font-bold text-white zatara-script mb-2">
            Zatara Mar
          </h1>
          <p className="text-zatara-blue-light text-responsive-sm font-medium">
            Secure Management Dashboard
          </p>
        </div>
        <div className="animate-slide-up">
          <SecureAuthForm />
        </div>
      </div>
    </div>
  );
};

export default Auth;
