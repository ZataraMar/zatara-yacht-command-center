
// Custom email templates for Zatara authentication
export const createEmailTemplate = (type: 'confirmation' | 'reset', data: {
  confirmationUrl?: string;
  resetUrl?: string;
  userName?: string;
}) => {
  const baseStyles = `
    <style>
      .zatara-email {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        background: linear-gradient(135deg, #003d82 0%, #0066cc 100%);
        color: white;
        border-radius: 12px;
        overflow: hidden;
      }
      .header {
        background: rgba(255,255,255,0.1);
        padding: 30px;
        text-align: center;
        border-bottom: 2px solid rgba(255,215,0,0.3);
      }
      .logo {
        font-size: 32px;
        font-weight: bold;
        color: #FFD700;
        margin-bottom: 8px;
        font-family: serif;
      }
      .tagline {
        font-size: 12px;
        color: rgba(255,255,255,0.8);
        letter-spacing: 2px;
      }
      .content {
        padding: 40px 30px;
        background: white;
        color: #333;
      }
      .btn {
        display: inline-block;
        background: linear-gradient(135deg, #003d82 0%, #0066cc 100%);
        color: white;
        padding: 16px 32px;
        text-decoration: none;
        border-radius: 8px;
        font-weight: bold;
        margin: 20px 0;
        border: 2px solid #FFD700;
      }
      .footer {
        padding: 20px 30px;
        background: #f8f9fa;
        color: #666;
        font-size: 12px;
        text-align: center;
      }
    </style>
  `;

  if (type === 'confirmation') {
    return `
      ${baseStyles}
      <div class="zatara-email">
        <div class="header">
          <div class="logo">Zatara</div>
          <div class="tagline">LUXURY YACHT CHARTERS</div>
        </div>
        <div class="content">
          <h2 style="color: #003d82; margin-bottom: 20px;">Welcome to Zatara Mar!</h2>
          <p>Thank you for creating your account with us. We're excited to have you join our exclusive community.</p>
          <p>To complete your registration and access your dashboard, please confirm your email address by clicking the button below:</p>
          <div style="text-align: center;">
            <a href="${data.confirmationUrl}" class="btn">Confirm Your Email</a>
          </div>
          <p style="margin-top: 30px; color: #666; font-size: 14px;">
            If the button doesn't work, you can copy and paste this link into your browser:<br>
            <a href="${data.confirmationUrl}" style="color: #0066cc; word-break: break-all;">${data.confirmationUrl}</a>
          </p>
          <p style="margin-top: 20px; color: #666; font-size: 14px;">
            <strong>What's next?</strong><br>
            Once confirmed, you'll have access to your personalized dashboard where you can manage bookings, view exclusive offers, and connect with our team.
          </p>
        </div>
        <div class="footer">
          <p>Zatara Mar - Premium Yacht Services in Mallorca</p>
          <p>cruise@zatara.es | +34 XXX XXX XXX</p>
        </div>
      </div>
    `;
  }

  if (type === 'reset') {
    return `
      ${baseStyles}
      <div class="zatara-email">
        <div class="header">
          <div class="logo">Zatara</div>
          <div class="tagline">LUXURY YACHT CHARTERS</div>
        </div>
        <div class="content">
          <h2 style="color: #003d82; margin-bottom: 20px;">Password Reset Request</h2>
          <p>We received a request to reset your password for your Zatara account.</p>
          <p>Click the button below to choose a new password:</p>
          <div style="text-align: center;">
            <a href="${data.resetUrl}" class="btn">Reset Your Password</a>
          </div>
          <p style="margin-top: 30px; color: #666; font-size: 14px;">
            If the button doesn't work, you can copy and paste this link into your browser:<br>
            <a href="${data.resetUrl}" style="color: #0066cc; word-break: break-all;">${data.resetUrl}</a>
          </p>
          <p style="margin-top: 20px; color: #666; font-size: 14px;">
            <strong>Security Note:</strong><br>
            This link will expire in 1 hour for your security. If you didn't request this reset, you can safely ignore this email.
          </p>
        </div>
        <div class="footer">
          <p>Zatara Mar - Premium Yacht Services in Mallorca</p>
          <p>cruise@zatara.es | +34 XXX XXX XXX</p>
        </div>
      </div>
    `;
  }

  return '';
};
