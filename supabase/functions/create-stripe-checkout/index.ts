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
    console.log("[STRIPE-CHECKOUT] Extracted data:", { payment_data, success_url, cancel_url, customer_email });

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