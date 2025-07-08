
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface StaffInvitationRequest {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  invitedBy: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, firstName, lastName, role, invitedBy }: StaffInvitationRequest = await req.json();
    
    // Enhanced input validation
    if (!email || typeof email !== 'string' || !email.includes('@') || email.length > 254) {
      throw new Error("Invalid email address");
    }
    
    if (!firstName || typeof firstName !== 'string' || firstName.trim().length < 1 || firstName.length > 50) {
      throw new Error("Invalid first name: must be 1-50 characters");
    }
    
    if (!lastName || typeof lastName !== 'string' || lastName.trim().length < 1 || lastName.length > 50) {
      throw new Error("Invalid last name: must be 1-50 characters");
    }
    
    const validRoles = ['owner', 'management', 'operations', 'skippers', 'finance', 'casual_staff'];
    if (!role || !validRoles.includes(role)) {
      throw new Error(`Invalid role: must be one of ${validRoles.join(', ')}`);
    }
    
    if (!invitedBy || typeof invitedBy !== 'string' || invitedBy.trim().length < 1) {
      throw new Error("Invalid invitedBy: must be provided");
    }
    
    console.log("Staff invitation validation passed");

    const inviteLink = `${Deno.env.get("SUPABASE_URL")}/auth/v1/signup?email=${encodeURIComponent(email)}&role=${role}`;

    const emailResponse = await resend.emails.send({
      from: "Zatara Charter Management <team@zatara.es>",
      to: [email],
      subject: "Welcome to Zatara Charter Management Team",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #1e40af, #3b82f6); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold;">Z</div>
            <h1 style="color: #1e3a8a; margin-top: 20px;">Zatara Charter Management</h1>
          </div>
          
          <h2 style="color: #1e3a8a;">Welcome to the Team, ${firstName}!</h2>
          
          <p>You've been invited by ${invitedBy} to join the Zatara Charter Management platform as a <strong>${role.replace('_', ' ')}</strong>.</p>
          
          <p>Our charter management system provides:</p>
          <ul>
            <li>Real-time charter operations management</li>
            <li>Guest communication tools</li>
            <li>Financial tracking and reporting</li>
            <li>Fleet maintenance coordination</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${inviteLink}" style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              Accept Invitation & Sign Up
            </a>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            If you have any questions, please contact us at cruise@zatara.es
          </p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #9ca3af; font-size: 12px; text-align: center;">
            Zatara Charter Management System<br>
            Mallorca, Spain
          </p>
        </div>
      `,
    });

    console.log("Staff invitation sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending staff invitation:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
