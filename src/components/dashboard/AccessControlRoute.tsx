
import React from 'react';

interface AccessControlRouteProps {
  children: React.ReactNode;
  accessCheck: (userRole: string) => boolean;
  userRole: string;
}

export const AccessControlRoute = ({ 
  children, 
  accessCheck,
  userRole 
}: AccessControlRouteProps) => {
  if (!accessCheck(userRole)) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-zatara-navy mb-4">Access Restricted</h2>
        <p className="text-zatara-blue">You don't have permission to access this section.</p>
      </div>
    );
  }
  return <>{children}</>;
};
