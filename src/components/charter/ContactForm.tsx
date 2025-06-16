
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Mail } from 'lucide-react';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: 'charter'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-zatara-navy">Get In Touch</CardTitle>
        <CardDescription>
          Ready to book your charter? Send us a message or contact us directly.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
          <Textarea
            name="message"
            placeholder="Tell us about your charter requirements..."
            value={formData.message}
            onChange={handleChange}
            rows={4}
          />
          <Button type="submit" className="w-full gradient-zatara">
            <Mail className="mr-2 h-4 w-4" />
            Send Message
          </Button>
        </form>
        
        <div className="pt-4 border-t">
          <Button variant="outline" className="w-full border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white">
            <MessageCircle className="mr-2 h-4 w-4" />
            WhatsApp: +34 711 013 403
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
