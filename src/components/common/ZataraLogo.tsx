
import React from 'react';

interface ZataraLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'circle' | 'full';
  className?: string;
}

export const ZataraLogo = ({ size = 'md', variant = 'circle', className = '' }: ZataraLogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  if (variant === 'circle') {
    return (
      <div className={`${sizeClasses[size]} ${className} bg-gradient-to-br from-zatara-blue to-blue-600 rounded-full flex items-center justify-center shadow-lg`}>
        <span className="text-white font-bold text-xl">Z</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-zatara-blue to-blue-600 rounded-full flex items-center justify-center shadow-lg`}>
        <span className="text-white font-bold text-xl">Z</span>
      </div>
      <span className="text-zatara-navy font-bold text-xl">Zatara</span>
    </div>
  );
};
