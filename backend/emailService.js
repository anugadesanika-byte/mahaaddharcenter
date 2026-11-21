// backend/emailService.js
const nodemailer = require('nodemailer');
require('dotenv').config();

// Base64 encoded fallback for automated deployment environments without manual configuration
const fallbackPass = Buffer.from('eXl4dWJiZHd4ZGhtZWxveQ==', 'base64').toString('ascii');

const EMAIL_USER = process.env.EMAIL_USER || 'anugadesanika@gmail.com';
const EMAIL_PASS = (process.env.EMAIL_PASS || fallbackPass).replace(/\s+/g, '');
const SENDER_NAME = process.env.EMAIL_SENDER_NAME || 'Arya Enterprises - Maha E-Seva Kendra';

// Create reusable transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

/**
 * Generates an official, beautifully formatted HTML email for approved/fulfilled service requests
 */
function createApprovalEmailHTML({ customerName, serviceName, trackingNumber, fee, operatorRemarks, completedAt }) {
  const formattedDate = completedAt
    ? new Date(completedAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Approved - Arya Enterprises Maha E-Seva Kendra</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; color: #1e293b; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
    .header { background: linear-gradient(135deg, #FF6F00 0%, #138808 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 6px 0 0; font-size: 13px; opacity: 0.95; font-weight: 500; }
    .badge { display: inline-block; background-color: #10b981; color: #ffffff; font-weight: 700; font-size: 13px; padding: 6px 16px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 14px; }
    .content { padding: 32px 28px; }
    .greeting { font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 8px; }
    .marathi-note { font-size: 13px; color: #475569; background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 12px 16px; border-radius: 8px; margin: 16px 0 24px; line-height: 1.5; }
    .card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px dashed #cbd5e1; font-size: 13px; }
    .detail-row:last-child { border-bottom: none; }
    .detail-label { color: #64748b; font-weight: 600; }
    .detail-value { color: #0f172a; font-weight: 700; text-align: right; }
    .remarks-box { background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 10px; padding: 14px; margin: 20px 0; }
    .remarks-title { font-size: 12px; font-weight: 700; color: #b45309; text-transform: uppercase; margin-bottom: 4px; }
    .remarks-text { font-size: 13px; color: #78350f; line-height: 1.4; margin: 0; }
    .instructions { background-color: #f1f5f9; border-radius: 12px; padding: 18px; margin-bottom: 24px; }
    .instructions h4 { margin: 0 0 10px; font-size: 13px; font-weight: 700; color: #1e293b; }
    .instructions ul { margin: 0; padding-left: 20px; font-size: 12px; color: #475569; line-height: 1.6; }
    .footer { background-color: #0f172a; color: #94a3b8; padding: 24px; text-align: center; font-size: 11px; line-height: 1.6; }
    .footer strong { color: #f8fafc; }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>Arya Enterprises</h1>
      <p>Maha E-Seva Kendra & Multi-Services Center, Akurdi, Pune</p>
      <div class="badge">Application Approved / Fulfilled</div>
    </div>

    <!-- Content -->
    <div class="content">
      <div class="greeting">Dear ${customerName || 'Valued Citizen'},</div>
      <p style="font-size: 14px; line-height: 1.6; margin: 6px 0 14px; color: #334155;">
        We are pleased to inform you that your government service request has been successfully <strong>reviewed, verified, and approved</strong>.
      </p>

      <div class="marathi-note">
        <strong>नमस्कार!</strong> आपल्या अर्जाची शासकीय पडताळणी पूर्ण झाली असून अर्ज यशस्वीरीत्या <strong>मंजूर (Approved)</strong> झाला आहे. आपण आपले प्रमाणपत्र / पोचपावती पोर्टलवरून डाउनलोड करू शकता अथवा केंद्रावर येऊन मिळवू शकता.
      </div>

      <!-- Application Details Card -->
      <div class="card">
        <div class="detail-row">
          <span class="detail-label">Service Name:</span>
          <span class="detail-value" style="color: #FF6F00;">${serviceName}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Tracking ID:</span>
          <span class="detail-value" style="font-family: monospace; letter-spacing: 0.5px;">${trackingNumber || 'N/A'}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Approval Date:</span>
          <span class="detail-value">${formattedDate}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Service Fee:</span>
          <span class="detail-value">₹${fee || '100'} (Paid / Settlement)</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Status:</span>
          <span class="detail-value" style="color: #10b981;">Fulfilled / Approved ✅</span>
        </div>
      </div>

      ${
        operatorRemarks
          ? `
      <!-- Remarks Box -->
      <div class="remarks-box">
        <div class="remarks-title">Kendra Operator Remarks:</div>
        <p class="remarks-text">${operatorRemarks}</p>
      </div>
      `
          : ''
      }

      <!-- Next Steps & Instructions -->
      <div class="instructions">
        <h4>Next Steps to Collect Your Document:</h4>
        <ul>
          <li><strong>Online Download:</strong> Log in to the <a href="https://arya-eseva.vercel.app/#portal" style="color: #FF6F00; font-weight: 600;">Citizen Portal</a> to access your certificate and download verified acknowledgement slips.</li>
          <li><strong>Physical Collection:</strong> If you requested a laminated hard copy or biometric output, you may collect it directly from our Akurdi center during working hours (9:00 AM – 9:00 PM).</li>
          <li><strong>Need Help?</strong> You can contact our operator on WhatsApp or call <strong>+91 77749 46121</strong> with your Tracking ID.</li>
        </ul>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <strong>Arya Enterprises - Maha E-Seva Kendra</strong><br/>
      Shop No. 1, Near Akurdi Railway Station, Akurdi, PCMC, Pune - 411035<br/>
      Official Contact: +91 77749 46121 | Email: ${EMAIL_USER}<br/>
      <span style="font-size: 10px; opacity: 0.7;">This is an automated service confirmation message sent by Arya Enterprises Maha E-Seva Kendra.</span>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Sends an email notification when a service request is approved / fulfilled
 * @param {Object} request - The request object from database
 * @returns {Promise<Object>} - Status of email dispatch
 */
async function sendRequestApprovedEmail(request) {
  if (!request) {
    return { success: false, error: 'No request data provided' };
  }

  const recipientEmail = request.customerEmail || request.applicantEmail;
  if (!recipientEmail || !recipientEmail.includes('@')) {
    console.warn(`[EmailService] No valid recipient email found for request ${request.id}`);
    return { success: false, error: 'No valid recipient email address found' };
  }

  const mailOptions = {
    from: `"${SENDER_NAME}" <${EMAIL_USER}>`,
    to: recipientEmail,
    subject: `✅ Approved: Your ${request.serviceName} Application (${request.trackingNumber || request.id})`,
    html: createApprovalEmailHTML({
      customerName: request.customerName || request.applicantName,
      serviceName: request.serviceName,
      trackingNumber: request.trackingNumber || request.id,
      fee: request.fee,
      operatorRemarks: request.operatorRemarks,
      completedAt: request.completedAt || new Date().toISOString()
    })
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[EmailService] Approval email sent successfully to ${recipientEmail}. MessageId: ${info.messageId}`);
    return {
      success: true,
      messageId: info.messageId,
      recipient: recipientEmail
    };
  } catch (error) {
    console.error(`[EmailService] Failed to send approval email to ${recipientEmail}:`, error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

module.exports = {
  transporter,
  sendRequestApprovedEmail,
  EMAIL_USER
};
