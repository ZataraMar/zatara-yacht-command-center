import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { supabase } from "@/integrations/supabase/client";
import { Database, FileText, AlertTriangle, TrendingUp, Package, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

export function DatabaseSchemaManager() {
  const [schemaItems, setSchemaItems] = useState<SchemaItem[]>([]);
  const [cleanupRecommendations, setCleanupRecommendations] = useState<CleanupRecommendation[]>([]);
  const [schemaAnalysis, setSchemaAnalysis] = useState<SchemaAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadSchemaData();
  }, []);

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
      toast({
        title: "Error",
        description: "Failed to load schema data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const analyzeSchema = async () => {
    try {
      const { data, error } = await supabase.rpc('analyze_current_schema');
      if (error) throw error;
      
      setSchemaAnalysis(data || []);
      toast({
        title: "Analysis Complete",
        description: "Schema analysis has been updated",
      });
    } catch (error) {
      console.error('Error analyzing schema:', error);
      toast({
        title: "Error",
        description: "Failed to analyze schema",
        variant: "destructive",
      });
    }
  };

  const schemaColumns: ColumnDef<SchemaItem>[] = [
    {
      accessorKey: "object_name",
      header: "Object Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4" />
          <span className="font-medium">{row.getValue("object_name")}</span>
        </div>
      ),
    },
    {
      accessorKey: "object_type",
      header: "Type",
      cell: ({ row }) => (
        <Badge variant="outline">
          {row.getValue("object_type")}
        </Badge>
      ),
    },
    {
      accessorKey: "criticality_level",
      header: "Criticality",
      cell: ({ row }) => {
        const level = row.getValue("criticality_level") as string;
        const variant = level === 'critical' ? 'destructive' : 
                      level === 'high' ? 'default' : 'secondary';
        return <Badge variant={variant}>{level}</Badge>;
      },
    },
    {
      accessorKey: "record_count",
      header: "Records",
      cell: ({ row }) => {
        const count = row.getValue("record_count") as number;
        return (
          <div className="text-right font-mono">
            {count.toLocaleString()}
          </div>
        );
      },
    },
    {
      accessorKey: "business_purpose",
      header: "Purpose",
      cell: ({ row }) => {
        const purpose = row.getValue("business_purpose") as string;
        return (
          <div className="max-w-xs truncate">
            {purpose || "Not documented"}
          </div>
        );
      },
    },
    {
      accessorKey: "cleanup_eligible",
      header: "Cleanup",
      cell: ({ row }) => {
        const eligible = row.getValue("cleanup_eligible") as boolean;
        return eligible ? (
          <Badge variant="destructive">Eligible</Badge>
        ) : (
          <Badge variant="outline">Keep</Badge>
        );
      },
    },
  ];

  const analysisColumns: ColumnDef<SchemaAnalysis>[] = [
    {
      accessorKey: "table_name",
      header: "Table Name",
    },
    {
      accessorKey: "record_count",
      header: "Records",
      cell: ({ row }) => {
        const count = row.getValue("record_count") as number;
        return (
          <div className="text-right font-mono">
            {count.toLocaleString()}
          </div>
        );
      },
    },
    {
      accessorKey: "size_estimate",
      header: "Size",
    },
    {
      accessorKey: "has_data",
      header: "Has Data",
      cell: ({ row }) => {
        const hasData = row.getValue("has_data") as boolean;
        return hasData ? (
          <Badge variant="default">Yes</Badge>
        ) : (
          <Badge variant="secondary">Empty</Badge>
        );
      },
    },
    {
      accessorKey: "has_indexes",
      header: "Indexed",
      cell: ({ row }) => {
        const hasIndexes = row.getValue("has_indexes") as boolean;
        return hasIndexes ? (
          <Badge variant="default">Yes</Badge>
        ) : (
          <Badge variant="outline">No</Badge>
        );
      },
    },
    {
      accessorKey: "has_foreign_keys",
      header: "FK Relations",
      cell: ({ row }) => {
        const hasFKs = row.getValue("has_foreign_keys") as boolean;
        return hasFKs ? (
          <Badge variant="default">Yes</Badge>
        ) : (
          <Badge variant="outline">No</Badge>
        );
      },
    },
  ];

  const cleanupColumns: ColumnDef<CleanupRecommendation>[] = [
    {
      accessorKey: "table_name",
      header: "Table",
    },
    {
      accessorKey: "recommendation_type",
      header: "Recommendation",
      cell: ({ row }) => (
        <Badge variant="outline">
          {row.getValue("recommendation_type")}
        </Badge>
      ),
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => {
        const priority = row.getValue("priority") as string;
        const variant = priority === 'high' ? 'destructive' : 
                      priority === 'medium' ? 'default' : 'secondary';
        return <Badge variant={variant}>{priority}</Badge>;
      },
    },
    {
      accessorKey: "risk_level",
      header: "Risk",
      cell: ({ row }) => {
        const risk = row.getValue("risk_level") as string;
        const variant = risk === 'high' ? 'destructive' : 'outline';
        return <Badge variant={variant}>{risk}</Badge>;
      },
    },
    {
      accessorKey: "recommendation_description",
      header: "Description",
      cell: ({ row }) => (
        <div className="max-w-md truncate">
          {row.getValue("recommendation_description")}
        </div>
      ),
    },
    {
      accessorKey: "estimated_savings",
      header: "Savings",
    },
  ];

  const stats = {
    totalTables: schemaAnalysis.length,
    emptyTables: schemaAnalysis.filter(t => !t.has_data).length,
    tablesWithData: schemaAnalysis.filter(t => t.has_data).length,
    cleanupOpportunities: cleanupRecommendations.filter(r => r.status === 'pending').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Database Schema Manager</h1>
          <p className="text-muted-foreground">
            Manage and optimize your database structure
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={analyzeSchema} variant="outline">
            <TrendingUp className="h-4 w-4 mr-2" />
            Analyze Schema
          </Button>
          <Button onClick={loadSchemaData}>
            <Settings className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tables</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTables}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">With Data</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.tablesWithData}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empty Tables</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.emptyTables}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cleanup Opportunities</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.cleanupOpportunities}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="analysis" className="space-y-4">
        <TabsList>
          <TabsTrigger value="analysis">Current Analysis</TabsTrigger>
          <TabsTrigger value="registry">Schema Registry</TabsTrigger>
          <TabsTrigger value="cleanup">Cleanup Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Schema Analysis</CardTitle>
              <CardDescription>
                Real-time analysis of all database tables and their current state
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={analysisColumns} data={schemaAnalysis} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="registry" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Schema Registry</CardTitle>
              <CardDescription>
                Documented database objects with business context and metadata
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={schemaColumns} data={schemaItems} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cleanup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cleanup Recommendations</CardTitle>
              <CardDescription>
                Automated suggestions for optimizing your database structure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={cleanupColumns} data={cleanupRecommendations} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}