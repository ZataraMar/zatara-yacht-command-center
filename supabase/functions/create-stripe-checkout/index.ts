import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, user-agent",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[STRIPE-CHECKOUT] Function started");
    
    // Log device information for debugging
    const userAgent = req.headers.get("user-agent") || "unknown";
    const origin = req.headers.get("origin") || "unknown";
    console.log("[STRIPE-CHECKOUT] User-Agent:", userAgent);
    console.log("[STRIPE-CHECKOUT] Origin:", origin);
    
    // Detect mobile devices
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    console.log("[STRIPE-CHECKOUT] Is Mobile:", isMobile);

    // Get request data - handle both direct calls and supabase.functions.invoke()
    const requestData = await req.json();
    console.log("[STRIPE-CHECKOUT] Raw request:", JSON.stringify(requestData));
    
    // Extract data from either direct call or invoke call format
    const { payment_data, success_url, cancel_url, customer_email } = requestData;
    
    // Enhanced input validation
    if (!payment_data || typeof payment_data !== 'object') {
      throw new Error("Invalid payment_data: must be an object");
    }
    
    if (!payment_data.amount || typeof payment_data.amount !== 'number' || payment_data.amount <= 0) {
      throw new Error("Invalid amount: must be a positive number");
    }
    
    if (!payment_data.currency || typeof payment_data.currency !== 'string' || payment_data.currency.length !== 3) {
      throw new Error("Invalid currency: must be a 3-letter currency code");
    }
    
    if (!success_url || typeof success_url !== 'string' || !success_url.startsWith('http')) {
      throw new Error("Invalid success_url: must be a valid HTTP URL");
    }
    
    if (!cancel_url || typeof cancel_url !== 'string' || !cancel_url.startsWith('http')) {
      throw new Error("Invalid cancel_url: must be a valid HTTP URL");
    }
    
    if (customer_email && (typeof customer_email !== 'string' || !customer_email.includes('@'))) {
      throw new Error("Invalid customer_email: must be a valid email address");
    }
    
    console.log("[STRIPE-CHECKOUT] Input validation passed");

    // Initialize Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    console.log("[STRIPE-CHECKOUT] Stripe key check:", stripeKey ? 'Found' : 'Missing');
    
    if (!stripeKey) {
      console.error("[STRIPE-CHECKOUT] STRIPE_SECRET_KEY environment variable not found");
      throw new Error("Stripe secret key not configured. Please set STRIPE_SECRET_KEY in edge function secrets.");
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });
    console.log("[STRIPE-CHECKOUT] Stripe initialized");

    // Create checkout session with mobile-optimized settings
    const sessionConfig = {
      payment_method_types: ['card'],
      mode: 'payment' as const,
      line_items: [
        {
          price_data: {
            currency: payment_data.currency.toLowerCase(),
            product_data: {
              name: payment_data.description,
            },
            unit_amount: payment_data.amount,
          },
          quantity: 1,
        },
      ],
      customer_email: customer_email,
      metadata: {
        ...payment_data.metadata,
        user_agent: userAgent,
        is_mobile: isMobile.toString(),
        origin: origin,
      },
      success_url: success_url,
      cancel_url: cancel_url,
      // Mobile-specific optimizations
      ...(isMobile && {
        billing_address_collection: 'auto',
        shipping_address_collection: null,
      }),
    };
    
    console.log("[STRIPE-CHECKOUT] Creating session with config:", JSON.stringify(sessionConfig, null, 2));
    const session = await stripe.checkout.sessions.create(sessionConfig);

    console.log("[STRIPE-CHECKOUT] Session created:", session.id);
    console.log("[STRIPE-CHECKOUT] Session URL length:", session.url?.length || 0);

    // Enhanced response with debugging info
    const response = { 
      url: session.url,
      session_id: session.id,
      debug: {
        is_mobile: isMobile,
        user_agent: userAgent.substring(0, 100),
        url_length: session.url?.length || 0,
      }
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("[STRIPE-CHECKOUT] Error:", error.message);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});