
import React from 'react';

interface ZataraLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'circle' | 'full' | 'image';
  className?: string;
}

export const ZataraLogo = ({ size = 'md', variant = 'image', className = '' }: ZataraLogoProps) => {
  const sizeClasses = {
    sm: 'h-48',      // 6x larger (was h-8, now 192px)
    md: 'h-72',      // 6x larger (was h-12, now 288px)
    lg: 'h-96',      // 6x larger (was h-16, now 384px)
    xl: 'h-[576px]'  // 6x larger (was h-24, now 576px)
  };

  if (variant === 'image') {
    return (
      <img 
        src="/lovable-uploads/75f61a6c-e5fb-491b-a726-bb33b2db96ba.png" 
        alt="Zatara Logo" 
        className={`${sizeClasses[size]} w-auto object-contain ${className}`}
        style={{ 
          filter: 'contrast(1.1) saturate(1.2)',
          imageRendering: 'crisp-edges'
        }}
      />
    );
  }

  if (variant === 'circle') {
    return (
      <div className={`${sizeClasses[size]} ${className} bg-gradient-to-br from-zatara-blue to-blue-600 rounded-full flex items-center justify-center shadow-lg aspect-square`}>
        <span className="text-white font-bold text-xl">Z</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <img 
        src="/lovable-uploads/75f61a6c-e5fb-491b-a726-bb33b2db96ba.png" 
        alt="Zatara Logo" 
        className={`${sizeClasses[size]} w-auto object-contain`}
        style={{ 
          filter: 'contrast(1.1) saturate(1.2)',
          imageRendering: 'crisp-edges'
        }}
      />
    </div>
  );
};
