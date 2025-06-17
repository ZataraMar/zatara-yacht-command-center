
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface WhatsAppTemplate {
  id: number;
  template_name: string;
  template_type: string;
  message_content: string;
  variables: any;
  boat_specific: boolean;
  applicable_boats: string[];
  language_code: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export const useEnhancedWhatsAppTemplates = () => {
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTemplates = async (filterType?: string) => {
    try {
      setLoading(true);
      
      // Direct query to whatsapp_templates table
      const { data: templateData, error } = await supabase
        .from('whatsapp_templates')
        .select('*')
        .eq('is_active', true)
        .order('template_name');
      
      if (error) {
        console.error('Error fetching templates:', error);
        setTemplates([]);
      } else {
        // Transform the data to match our interface
        const transformedData = (templateData || []).map((item: any) => ({
          id: item.id,
          template_name: item.template_name,
          template_type: item.template_type,
          message_content: item.message_content,
          variables: item.variables || {},
          boat_specific: item.boat_specific || false,
          applicable_boats: item.applicable_boats || ['all'],
          language_code: item.language_code || 'en',
          is_active: item.is_active || true,
          created_at: item.created_at,
          updated_at: item.updated_at
        }));
        
        setTemplates(transformedData);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
      setTemplates([]);
    } finally {
      setLoading(false);
    }
  };

  const generateMessage = async (charterLocator: string, templateName: string, customData?: any) => {
    try {
      const template = templates.find(t => t.template_name === templateName);
      if (!template) {
        throw new Error('Template not found');
      }

      // Get charter data
      const { data: charterData } = await supabase
        .from('bookings')
        .select(`
          *,
          operations (*)
        `)
        .eq('locator', charterLocator)
        .single();

      if (charterData) {
        let message = template.message_content;
        
        // Replace template variables
        message = message.replace(/\{\{guest_name\}\}/g, charterData.guest_first_name || 'Guest');
        message = message.replace(/\{\{boat_name\}\}/g, charterData.boat || 'our boat');
        message = message.replace(/\{\{charter_date\}\}/g, new Date(charterData.start_date).toLocaleDateString());
        message = message.replace(/\{\{start_time\}\}/g, new Date(charterData.start_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
        message = message.replace(/\{\{total_guests\}\}/g, charterData.total_guests?.toString() || '1');
        message = message.replace(/\{\{charter_total\}\}/g, charterData.charter_total?.toString() || '0');
        
        // Apply custom data if provided
        if (customData) {
          Object.entries(customData).forEach(([key, value]) => {
            message = message.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), String(value));
          });
        }
        
        return message;
      }
      
      return template.message_content;
    } catch (error) {
      console.error('Error generating message:', error);
      toast({
        title: "Error",
        description: "Failed to generate message. Please try again.",
        variant: "destructive"
      });
      return '';
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return {
    templates,
    loading,
    fetchTemplates,
    generateMessage
  };
};
