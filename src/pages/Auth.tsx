
import React from 'react';
import { AuthForm } from '@/components/auth/AuthForm';

const Auth = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Zatara Mar</h1>
          <p className="text-gray-600 mt-2">Management Dashboard</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
