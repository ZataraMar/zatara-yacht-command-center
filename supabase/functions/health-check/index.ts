import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[HEALTH-CHECK] Starting health check");

    // Check all required secrets
    const requiredSecrets = [
      { name: "STRIPE_SECRET_KEY", required: true, description: "Required for payment processing" },
      { name: "SUPABASE_URL", required: true, description: "Supabase project URL" },
      { name: "SUPABASE_ANON_KEY", required: true, description: "Supabase anonymous key" },
      { name: "SUPABASE_SERVICE_ROLE_KEY", required: true, description: "Supabase service role key" },
    ];

    const secretStatus = requiredSecrets.map(secret => {
      const value = Deno.env.get(secret.name);
      const isConfigured = !!value;
      const status = isConfigured ? "✅ Configured" : "❌ Missing";
      
      console.log(`[HEALTH-CHECK] ${secret.name}: ${status}`);
      
      return {
        name: secret.name,
        configured: isConfigured,
        required: secret.required,
        description: secret.description,
        status
      };
    });

    // Check overall health
    const missingRequired = secretStatus.filter(s => s.required && !s.configured);
    const overallHealth = missingRequired.length === 0 ? "healthy" : "unhealthy";
    
    const response = {
      status: overallHealth,
      timestamp: new Date().toISOString(),
      secrets: secretStatus,
      summary: {
        total: secretStatus.length,
        configured: secretStatus.filter(s => s.configured).length,
        missing: secretStatus.filter(s => !s.configured).length,
        missingRequired: missingRequired.length
      }
    };

    console.log(`[HEALTH-CHECK] Overall status: ${overallHealth}`);
    
    return new Response(JSON.stringify(response, null, 2), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: overallHealth === "healthy" ? 200 : 500,
    });

  } catch (error) {
    console.error("[HEALTH-CHECK] Error:", error.message);
    return new Response(JSON.stringify({ 
      status: "error",
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});