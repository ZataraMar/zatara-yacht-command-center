import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

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
    console.log("[STRIPE-CHECKOUT] Function started");

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

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
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
      metadata: payment_data.metadata,
      success_url: success_url,
      cancel_url: cancel_url,
    });

    console.log("[STRIPE-CHECKOUT] Session created:", session.id);

    return new Response(JSON.stringify({ 
      url: session.url,
      session_id: session.id 
    }), {
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