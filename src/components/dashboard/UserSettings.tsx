
import React from 'react';

interface UserSettingsProps {
  userRole: string;
  profile: any;
}

export const UserSettings = ({ userRole, profile }: UserSettingsProps) => {
  return (
    <div className="text-center p-8">
      <h2 className="text-2xl font-bold text-zatara-navy mb-4">Account Settings</h2>
      <p className="text-zatara-blue">Profile and system settings will be available here.</p>
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">
          Current role: <span className="font-medium capitalize">{userRole?.replace('_', ' ')}</span>
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Email: <span className="font-medium">{profile?.email}</span>
        </p>
      </div>
    </div>
  );
};
