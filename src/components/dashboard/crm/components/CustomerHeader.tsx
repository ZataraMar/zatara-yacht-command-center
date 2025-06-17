
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

interface CustomerHeaderProps {
  onRefetch: () => void;
}

export const CustomerHeader = ({ onRefetch }: CustomerHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-zatara-navy">Customer 360° Profile</h2>
        <p className="text-zatara-blue">Complete customer relationship management</p>
      </div>
      <Button onClick={onRefetch}>
        <MessageSquare className="h-4 w-4 mr-2" />
        Contact Customer
      </Button>
    </div>
  );
};
