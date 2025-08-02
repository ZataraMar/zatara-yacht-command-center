-- Database Schema Management System
-- Track all database objects and their metadata

-- Main registry for all database objects
CREATE TABLE database_schema_registry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  object_name TEXT NOT NULL,
  object_type TEXT NOT NULL CHECK (object_type IN ('table', 'view', 'function', 'trigger', 'index')),
  schema_name TEXT NOT NULL DEFAULT 'public',
  business_purpose TEXT,
  business_function TEXT,
  owner_team TEXT,
  criticality_level TEXT CHECK (criticality_level IN ('critical', 'high', 'medium', 'low', 'deprecated')) DEFAULT 'medium',
  data_classification TEXT CHECK (data_classification IN ('public', 'internal', 'confidential', 'restricted')) DEFAULT 'internal',
  record_count BIGINT DEFAULT 0,
  size_bytes BIGINT DEFAULT 0,
  last_accessed TIMESTAMP WITH TIME ZONE,
  last_modified TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  cleanup_eligible BOOLEAN DEFAULT false,
  migration_notes TEXT,
  documentation_url TEXT,
  UNIQUE(schema_name, object_name, object_type)
);

-- Track relationships between database objects
CREATE TABLE table_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_table TEXT NOT NULL,
  target_table TEXT NOT NULL,
  relationship_type TEXT NOT NULL CHECK (relationship_type IN ('foreign_key', 'view_dependency', 'function_dependency', 'trigger_dependency', 'business_logic')),
  constraint_name TEXT,
  relationship_description TEXT,
  dependency_strength TEXT CHECK (dependency_strength IN ('hard', 'soft', 'optional')) DEFAULT 'hard',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(source_table, target_table, relationship_type, constraint_name)
);

-- Track table usage analytics
CREATE TABLE table_usage_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name TEXT NOT NULL,
  query_count BIGINT DEFAULT 0,
  last_query_time TIMESTAMP WITH TIME ZONE,
  avg_query_duration_ms NUMERIC,
  most_common_operations JSONB, -- ['SELECT', 'INSERT', 'UPDATE', 'DELETE']
  peak_usage_hours JSONB, -- [8, 9, 10, 14, 15, 16] (hours of day)
  monthly_query_count BIGINT DEFAULT 0,
  growth_trend TEXT CHECK (growth_trend IN ('increasing', 'stable', 'decreasing', 'unknown')) DEFAULT 'unknown',
  performance_score INTEGER CHECK (performance_score BETWEEN 1 AND 100),
  recommendation TEXT,
  analysis_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(table_name, analysis_date)
);

-- Track schema changes and impact
CREATE TABLE schema_change_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  change_type TEXT NOT NULL CHECK (change_type IN ('create', 'alter', 'drop', 'rename')),
  object_name TEXT NOT NULL,
  object_type TEXT NOT NULL,
  change_description TEXT NOT NULL,
  sql_statement TEXT,
  impact_assessment JSONB, -- {affected_tables: [], affected_views: [], risk_level: 'low'}
  executed_by TEXT,
  executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  rollback_sql TEXT,
  change_approved_by TEXT,
  business_justification TEXT
);

-- Track cleanup recommendations
CREATE TABLE cleanup_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name TEXT NOT NULL,
  recommendation_type TEXT NOT NULL CHECK (recommendation_type IN ('drop_empty', 'consolidate', 'archive', 'optimize', 'partition')),
  priority TEXT CHECK (priority IN ('high', 'medium', 'low')) DEFAULT 'medium',
  estimated_savings TEXT, -- "Storage: 2GB, Performance: +15%"
  risk_level TEXT CHECK (risk_level IN ('high', 'medium', 'low')) DEFAULT 'low',
  dependencies_count INTEGER DEFAULT 0,
  recommendation_description TEXT NOT NULL,
  cleanup_sql TEXT,
  rollback_plan TEXT,
  reviewed_by TEXT,
  approved_by TEXT,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected', 'executed', 'rolled_back')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  executed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on all tables
ALTER TABLE database_schema_registry ENABLE ROW LEVEL SECURITY;
ALTER TABLE table_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE table_usage_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE schema_change_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE cleanup_recommendations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (management access only)
CREATE POLICY "Management can manage schema registry" ON database_schema_registry
FOR ALL USING (
  CASE
    WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
    ELSE false
  END
);

CREATE POLICY "Management can manage table relationships" ON table_relationships
FOR ALL USING (
  CASE
    WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
    ELSE false
  END
);

CREATE POLICY "Management can view usage analytics" ON table_usage_analytics
FOR ALL USING (
  CASE
    WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
    ELSE false
  END
);

CREATE POLICY "Management can manage schema changes" ON schema_change_log
FOR ALL USING (
  CASE
    WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
    ELSE false
  END
);

CREATE POLICY "Management can manage cleanup recommendations" ON cleanup_recommendations
FOR ALL USING (
  CASE
    WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
    ELSE false
  END
);

-- Create indexes for performance
CREATE INDEX idx_schema_registry_object_type ON database_schema_registry(object_type);
CREATE INDEX idx_schema_registry_criticality ON database_schema_registry(criticality_level);
CREATE INDEX idx_schema_registry_active ON database_schema_registry(is_active);
CREATE INDEX idx_table_relationships_source ON table_relationships(source_table);
CREATE INDEX idx_table_relationships_target ON table_relationships(target_table);
CREATE INDEX idx_usage_analytics_table ON table_usage_analytics(table_name);
CREATE INDEX idx_usage_analytics_date ON table_usage_analytics(analysis_date);
CREATE INDEX idx_change_log_date ON schema_change_log(executed_at);
CREATE INDEX idx_cleanup_status ON cleanup_recommendations(status);

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_schema_registry_updated_at
  BEFORE UPDATE ON database_schema_registry
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to analyze current database schema
CREATE OR REPLACE FUNCTION analyze_current_schema()
RETURNS TABLE(
  table_name TEXT,
  record_count BIGINT,
  size_estimate TEXT,
  has_data BOOLEAN,
  has_indexes BOOLEAN,
  has_foreign_keys BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    t.tablename::TEXT,
    COALESCE(s.n_tup_ins - s.n_tup_del, 0) as record_count,
    pg_size_pretty(pg_total_relation_size(quote_ident(t.schemaname)||'.'||quote_ident(t.tablename))) as size_estimate,
    COALESCE(s.n_tup_ins - s.n_tup_del, 0) > 0 as has_data,
    EXISTS(
      SELECT 1 FROM pg_indexes i 
      WHERE i.schemaname = t.schemaname AND i.tablename = t.tablename
    ) as has_indexes,
    EXISTS(
      SELECT 1 FROM information_schema.table_constraints tc 
      WHERE tc.table_schema = t.schemaname 
      AND tc.table_name = t.tablename 
      AND tc.constraint_type = 'FOREIGN KEY'
    ) as has_foreign_keys
  FROM pg_tables t
  LEFT JOIN pg_stat_user_tables s ON s.schemaname = t.schemaname AND s.relname = t.tablename
  WHERE t.schemaname = 'public'
  ORDER BY record_count DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get table dependencies
CREATE OR REPLACE FUNCTION get_table_dependencies(target_table_name TEXT)
RETURNS TABLE(
  dependent_table TEXT,
  constraint_name TEXT,
  dependency_type TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    tc.table_name::TEXT as dependent_table,
    tc.constraint_name::TEXT,
    'foreign_key'::TEXT as dependency_type
  FROM information_schema.table_constraints tc
  JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
  JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name = tc.constraint_name
  WHERE tc.constraint_type = 'FOREIGN KEY'
  AND ccu.table_name = target_table_name
  AND tc.table_schema = 'public';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;