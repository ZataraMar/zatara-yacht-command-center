
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Copy, Sparkles } from 'lucide-react';
import { useEnhancedWhatsAppTemplates } from '@/hooks/useEnhancedWhatsAppTemplates';
import { toast } from '@/hooks/use-toast';
import { formatDate } from '@/utils/formatters';

interface WhatsAppGeneratorProps {
  charter: {
    locator: string;
    guest_name: string;
    boat: string;
    charter_date: string;
    start_time: string;
    total_guests: number;
    charter_total: number;
  };
}

export const WhatsAppGenerator: React.FC<WhatsAppGeneratorProps> = ({ charter }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [generatedMessage, setGeneratedMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const { templates, generateMessage } = useEnhancedWhatsAppTemplates();

  const handleGenerateMessage = async () => {
    if (!selectedTemplate) {
      toast({
        title: "No template selected",
        description: "Please select a template first.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const message = await generateMessage(charter.locator, selectedTemplate);
      setGeneratedMessage(message);
    } catch (error) {
      console.error('Error generating message:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedMessage);
      toast({
        title: "Copied!",
        description: "Message copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy message",
        variant: "destructive"
      });
    }
  };

  const sendWhatsApp = () => {
    const encodedMessage = encodeURIComponent(generatedMessage);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Filter templates based on boat compatibility
  const compatibleTemplates = templates.filter(template => 
    !template.boat_specific || 
    template.applicable_boats.includes('all') ||
    template.applicable_boats.some(boat => 
      charter.boat.toLowerCase().includes(boat.toLowerCase())
    )
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-green-600" />
          <span>Enhanced WhatsApp Generator</span>
          <Sparkles className="h-4 w-4 text-yellow-500" />
        </CardTitle>
        <CardDescription>
          Generate personalized messages for {charter.guest_name} - {charter.locator}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Message Template</label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a template..." />
              </SelectTrigger>
              <SelectContent>
                {compatibleTemplates.map((template) => (
                  <SelectItem key={template.template_name} value={template.template_name}>
                    <div className="flex items-center space-x-2">
                      <span>{template.template_name.replace(/_/g, ' ').toUpperCase()}</span>
                      {template.boat_specific && (
                        <Badge variant="outline" className="text-xs">
                          {template.applicable_boats.join(', ')}
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Charter Details</label>
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline">{charter.boat}</Badge>
              <Badge variant="outline">{formatDate(charter.charter_date)}</Badge>
              <Badge variant="outline">{charter.total_guests} guests</Badge>
              <Badge variant="outline">€{charter.charter_total}</Badge>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleGenerateMessage} 
          disabled={!selectedTemplate || loading}
          className="w-full"
        >
          {loading ? 'Generating...' : 'Generate Enhanced Message'}
        </Button>

        {generatedMessage && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Generated Message</label>
              <Textarea 
                value={generatedMessage}
                onChange={(e) => setGeneratedMessage(e.target.value)}
                rows={6}
                className="resize-none"
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={copyToClipboard} variant="outline" className="flex items-center space-x-2">
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </Button>
              <Button onClick={sendWhatsApp} className="flex items-center space-x-2 bg-green-600 hover:bg-green-700">
                <Send className="h-4 w-4" />
                <span>Send WhatsApp</span>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
