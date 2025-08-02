import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SchemaItem {
  id: string;
  object_name: string;
  object_type: string;
  business_purpose?: string;
  criticality_level: string;
  record_count: number;
  size_bytes: number;
  last_accessed?: string;
  cleanup_eligible: boolean;
}

interface CleanupRecommendation {
  id: string;
  table_name: string;
  recommendation_type: string;
  priority: string;
  risk_level: string;
  recommendation_description: string;
  estimated_savings?: string;
  status: string;
}

interface SchemaAnalysis {
  table_name: string;
  record_count: number;
  size_estimate: string;
  has_data: boolean;
  has_indexes: boolean;
  has_foreign_keys: boolean;
}

export function useSchemaData() {
  const [schemaItems, setSchemaItems] = useState<SchemaItem[]>([]);
  const [cleanupRecommendations, setCleanupRecommendations] = useState<CleanupRecommendation[]>([]);
  const [schemaAnalysis, setSchemaAnalysis] = useState<SchemaAnalysis[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSchemaData = async () => {
    try {
      setLoading(true);
      
      // Load schema registry
      const { data: registry, error: registryError } = await supabase
        .from('database_schema_registry')
        .select('*')
        .order('record_count', { ascending: false });

      if (registryError) throw registryError;

      // Load cleanup recommendations
      const { data: cleanup, error: cleanupError } = await supabase
        .from('cleanup_recommendations')
        .select('*')
        .order('priority', { ascending: false });

      if (cleanupError) throw cleanupError;

      // Run schema analysis
      const { data: analysis, error: analysisError } = await supabase
        .rpc('analyze_current_schema');

      if (analysisError) throw analysisError;

      setSchemaItems(registry || []);
      setCleanupRecommendations(cleanup || []);
      setSchemaAnalysis(analysis || []);
    } catch (error) {
      console.error('Error loading schema data:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const analyzeSchema = async () => {
    try {
      const { data, error } = await supabase.rpc('analyze_current_schema');
      if (error) throw error;
      
      setSchemaAnalysis(data || []);
    } catch (error) {
      console.error('Error analyzing schema:', error);
      throw error;
    }
  };

  useEffect(() => {
    loadSchemaData();
  }, []);

  return {
    schemaItems,
    cleanupRecommendations,
    schemaAnalysis,
    loading,
    loadSchemaData,
    analyzeSchema,
  };
}