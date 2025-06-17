
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Copy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface WhatsAppTemplate {
  template_name: string;
  template_type: string;
  message_content: string;
  variables: Record<string, string>;
}

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
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [generatedMessage, setGeneratedMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase.rpc('get_whatsapp_templates');
      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
      // Fallback templates if database function doesn't exist yet
      setTemplates([
        {
          template_name: 'booking_confirmation',
          template_type: 'booking',
          message_content: `Hi {{guest_name}}! 🛥️ Your charter with {{boat_name}} is confirmed for {{charter_date}} at {{start_time}}. We're excited to welcome {{total_guests}} guests aboard! Total: €{{charter_total}}. See you soon! ⛵`,
          variables: {}
        },
        {
          template_name: 'pre_departure',
          template_type: 'reminder',
          message_content: `Hi {{guest_name}}! 🌊 Your charter on {{boat_name}} is tomorrow at {{start_time}}. Please bring sunscreen, swimwear, and valid ID. Weather looks perfect! Can't wait to show you the beautiful Mallorcan coast! ⛵☀️`,
          variables: {}
        },
        {
          template_name: 'post_charter',
          template_type: 'followup',
          message_content: `Thank you {{guest_name}} for choosing Zatara! 🙏 We hope you had an amazing time on {{boat_name}}. We'd love to hear about your experience - please leave us a review! Looking forward to welcoming you back soon! ⭐⛵`,
          variables: {}
        }
      ]);
    }
  };

  const generateMessage = async () => {
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
      // Try using the database function first
      const { data, error } = await supabase.rpc('generate_whatsapp_message', {
        charter_locator: charter.locator,
        template_name_param: selectedTemplate
      });

      if (error) {
        // Fallback to client-side generation
        const template = templates.find(t => t.template_name === selectedTemplate);
        if (template) {
          let message = template.message_content;
          message = message.replace(/\{\{guest_name\}\}/g, charter.guest_name.split(' ')[0]);
          message = message.replace(/\{\{boat_name\}\}/g, charter.boat);
          message = message.replace(/\{\{charter_date\}\}/g, new Date(charter.charter_date).toLocaleDateString());
          message = message.replace(/\{\{start_time\}\}/g, charter.start_time);
          message = message.replace(/\{\{total_guests\}\}/g, charter.total_guests.toString());
          message = message.replace(/\{\{charter_total\}\}/g, charter.charter_total.toString());
          setGeneratedMessage(message);
        }
      } else {
        setGeneratedMessage(data);
      }
    } catch (error) {
      console.error('Error generating message:', error);
      toast({
        title: "Error",
        description: "Failed to generate message. Please try again.",
        variant: "destructive"
      });
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-green-600" />
          <span>WhatsApp Message Generator</span>
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
                {templates.map((template) => (
                  <SelectItem key={template.template_name} value={template.template_name}>
                    {template.template_name.replace('_', ' ').toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Charter Details</label>
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline">{charter.boat}</Badge>
              <Badge variant="outline">{new Date(charter.charter_date).toLocaleDateString()}</Badge>
              <Badge variant="outline">{charter.total_guests} guests</Badge>
            </div>
          </div>
        </div>

        <Button 
          onClick={generateMessage} 
          disabled={!selectedTemplate || loading}
          className="w-full"
        >
          {loading ? 'Generating...' : 'Generate Message'}
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
