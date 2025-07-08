import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessModal = ({ isOpen, onClose }: SuccessModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Request Received!</h3>
          <p className="text-gray-600 mb-6">Thank you for your interest. We'll check availability and get back to you within 2 hours with a detailed quote.</p>
          <Button 
            onClick={onClose} 
            className="w-full bg-zatara-blue text-white py-3 font-semibold hover:bg-zatara-blue-dark transition"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};