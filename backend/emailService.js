// backend/emailService.js
// Production-Ready Email Service powered by official Resend Node.js SDK (HTTPS API)
// Eliminates SMTP port blocking issues on Render Free tier

const { Resend } = require('resend');
require('dotenv').config();

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const EMAIL_FROM = process.env.EMAIL_FROM || 'Arya Enterprises <onboarding@resend.dev>';
const EMAIL_TO = process.env.EMAIL_TO || 'anugadesanika@gmail.com';

// Initialize Resend Client
let resendClient = null;
if (RESEND_API_KEY && RESEND_API_KEY.trim() !== '') {
  try {
    resendClient = new Resend(RESEND_API_KEY.trim());
  } catch (err) {
    console.error('[EmailService] Error initializing Resend client:', err.message);
  }
} else {
  console.warn('[EmailService] RESEND_API_KEY is not set. Outbound emails will be simulated or rejected gracefully.');
}

/**
 * Basic HTML sanitizer to prevent HTML injection in emails
 */
function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Checks whether Resend is configured with a valid-looking API key
 */
function isEmailConfigured() {
  return Boolean(resendClient && RESEND_API_KEY.startsWith('re_'));
}

/**
 * Formats a modern, accessible HTML email for general customer enquiries
 */
function createContactEmailHTML({ name, email, phone, subject, message, submittedAt, clientIp }) {
  const safeName = escapeHTML(name);
  const safeEmail = escapeHTML(email);
  const safePhone = escapeHTML(phone || 'Not provided');
  const safeSubject = escapeHTML(subject);
  const safeMessage = escapeHTML(message).replace(/\n/g, '<br/>');
  const safeDate = submittedAt ? new Date(submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : new Date().toLocaleString('en-IN');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Website Enquiry - Arya Enterprises</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f1f5f9; color: #1e293b; }
    .wrapper { max-width: 620px; margin: 24px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
    .header { background: linear-gradient(135deg, #FF6F00 0%, #000080 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 6px 0 0; font-size: 13px; opacity: 0.95; }
    .badge { display: inline-block; background: rgba(255,255,255,0.2); backdrop-filter: blur(4px); color: #ffffff; font-weight: 700; font-size: 11px; padding: 4px 12px; border-radius: 12px; text-transform: uppercase; margin-top: 12px; }
    .content { padding: 32px 28px; }
    .info-card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
    .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #cbd5e1; font-size: 13px; }
    .info-row:last-child { border-bottom: none; }
    .info-label { color: #64748b; font-weight: 600; }
    .info-value { color: #0f172a; font-weight: 700; text-align: right; }
    .message-box { background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 12px; padding: 18px; margin: 24px 0; }
    .message-title { font-size: 12px; font-weight: 800; color: #b45309; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.5px; }
    .message-body { font-size: 14px; color: #451a03; line-height: 1.6; margin: 0; word-break: break-word; }
    .reply-hint { background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 12px 16px; border-radius: 8px; font-size: 12px; color: #065f46; margin-top: 20px; }
    .footer { background-color: #0f172a; color: #94a3b8; padding: 20px; text-align: center; font-size: 11px; line-height: 1.6; }
    .footer strong { color: #f8fafc; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Arya Enterprises</h1>
      <p>Maha E-Seva Kendra & Multi-Services Center</p>
      <div class="badge">Official Website Contact Enquiry</div>
    </div>

    <div class="content">
      <p style="font-size: 14px; color: #475569; margin: 0 0 20px 0;">
        You have received a new customer enquiry from the <strong>Arya Enterprises Maha E-Seva Kendra</strong> website contact form.
      </p>

      <div class="info-card">
        <div class="info-row">
          <span class="info-label">Applicant Name:</span>
          <span class="info-value">${safeName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email Address:</span>
          <span class="info-value"><a href="mailto:${safeEmail}" style="color: #FF6F00; text-decoration: none;">${safeEmail}</a></span>
        </div>
        <div class="info-row">
          <span class="info-label">Contact Number:</span>
          <span class="info-value"><a href="tel:${safePhone}" style="color: #000080; text-decoration: none;">${safePhone}</a></span>
        </div>
        <div class="info-row">
          <span class="info-label">Service / Subject:</span>
          <span class="info-value" style="color: #0f172a;">${safeSubject}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Submitted On:</span>
          <span class="info-value">${safeDate} IST</span>
        </div>
      </div>

      <div class="message-box">
        <div class="message-title">Customer Message / Requirement Details:</div>
        <p class="message-body">${safeMessage}</p>
      </div>

      <div class="reply-hint">
        <strong>Quick Reply Tip:</strong> Clicking "Reply" in your email client will reply directly to <strong>${safeEmail}</strong>.
      </div>
    </div>

    <div class="footer">
      <strong>Arya Enterprises Maha E-Seva Kendra</strong><br/>
      Shop No. 1, Near Akurdi Railway Station, Akurdi, PCMC, Pune - 411035<br/>
      <span style="font-size: 10px; opacity: 0.7;">Sent via Resend HTTPS API · Delivered securely to verified recipient</span>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Generates an official, beautifully formatted HTML email for approved/fulfilled service requests
 */
function createApprovalEmailHTML({ customerName, serviceName, trackingNumber, fee, operatorRemarks, completedAt }) {
  const safeCustomer = escapeHTML(customerName || 'Valued Citizen');
  const safeService = escapeHTML(serviceName || 'Government Document Service');
  const safeTracking = escapeHTML(trackingNumber || 'N/A');
  const safeFee = escapeHTML(String(fee || '100'));
  const safeRemarks = escapeHTML(operatorRemarks || '');

  const formattedDate = completedAt
    ? new Date(completedAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Kolkata'
      })
    : new Date().toLocaleDateString('en-IN');

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
    <div class="header">
      <h1>Arya Enterprises</h1>
      <p>Maha E-Seva Kendra & Multi-Services Center, Akurdi, Pune</p>
      <div class="badge">Application Approved / Fulfilled</div>
    </div>

    <div class="content">
      <div class="greeting">Dear ${safeCustomer},</div>
      <p style="font-size: 14px; line-height: 1.6; margin: 6px 0 14px; color: #334155;">
        We are pleased to inform you that your government service request has been successfully <strong>reviewed, verified, and approved</strong>.
      </p>

      <div class="marathi-note">
        <strong>नमस्कार!</strong> आपल्या अर्जाची शासकीय पडताळणी पूर्ण झाली असून अर्ज यशस्वीरीत्या <strong>मंजूर (Approved)</strong> झाला आहे. आपण आपले प्रमाणपत्र / पोचपावती पोर्टलवरून डाउनलोड करू शकता अथवा केंद्रावर येऊन मिळवू शकता.
      </div>

      <div class="card">
        <div class="detail-row">
          <span class="detail-label">Service Name:</span>
          <span class="detail-value" style="color: #FF6F00;">${safeService}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Tracking ID:</span>
          <span class="detail-value" style="font-family: monospace; letter-spacing: 0.5px;">${safeTracking}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Approval Date:</span>
          <span class="detail-value">${formattedDate}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Service Fee:</span>
          <span class="detail-value">₹${safeFee} (Paid / Settlement)</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Status:</span>
          <span class="detail-value" style="color: #10b981;">Fulfilled / Approved ✅</span>
        </div>
      </div>

      ${
        safeRemarks
          ? `
      <div class="remarks-box">
        <div class="remarks-title">Kendra Operator Remarks:</div>
        <p class="remarks-text">${safeRemarks}</p>
      </div>
      `
          : ''
      }

      <div class="instructions">
        <h4>Next Steps to Collect Your Document:</h4>
        <ul>
          <li><strong>Online Download:</strong> Log in to the Citizen Portal to access your certificate and download verified acknowledgement slips.</li>
          <li><strong>Physical Collection:</strong> If you requested a laminated hard copy or biometric output, you may collect it directly from our Akurdi center during working hours (9:00 AM – 9:00 PM).</li>
          <li><strong>Need Help?</strong> You can contact our operator on WhatsApp or call <strong>+91 77749 46121</strong> with your Tracking ID.</li>
        </ul>
      </div>
    </div>

    <div class="footer">
      <strong>Arya Enterprises - Maha E-Seva Kendra</strong><br/>
      Shop No. 1, Near Akurdi Railway Station, Akurdi, PCMC, Pune - 411035<br/>
      Official Contact: +91 77749 46121 | Email: ${escapeHTML(EMAIL_TO)}<br/>
      <span style="font-size: 10px; opacity: 0.7;">Sent securely via Resend HTTPS API.</span>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Sends a website contact enquiry email via Resend HTTPS API
 * @param {Object} enquiry - { name, email, phone, subject, message, submittedAt, clientIp }
 * @returns {Promise<Object>}
 */
async function sendContactEnquiryEmail({ name, email, phone, subject, message, submittedAt, clientIp }) {
  if (!resendClient) {
    console.warn('[EmailService] Cannot send contact enquiry: Resend client not initialized (missing or invalid RESEND_API_KEY).');
    return {
      success: false,
      notConfigured: true,
      error: 'Email service is not currently configured with a valid RESEND_API_KEY. Please contact the administrator.'
    };
  }

  const cleanSubject = `[Website Enquiry] ${subject.slice(0, 100)} - ${name.slice(0, 50)}`;
  const textContent = `New Website Enquiry\n\nFrom: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nSubject: ${subject}\n\nMessage:\n${message}\n\nSubmitted At: ${submittedAt || new Date().toISOString()}`;

  try {
    const response = await resendClient.emails.send({
      from: EMAIL_FROM,
      to: [EMAIL_TO],
      reply_to: email.trim(),
      subject: cleanSubject,
      html: createContactEmailHTML({ name, email, phone, subject, message, submittedAt, clientIp }),
      text: textContent
    });

    if (response.error) {
      console.error('[EmailService] Resend API returned error:', response.error.message || response.error);
      return {
        success: false,
        error: response.error.message || 'Failed to dispatch email via Resend API'
      };
    }

    console.log(`[EmailService] Contact enquiry email dispatched successfully via Resend. ID: ${response.data?.id}`);
    return {
      success: true,
      id: response.data?.id,
      recipient: EMAIL_TO
    };
  } catch (error) {
    console.error('[EmailService] Network/SDK exception while sending email via Resend:', error.message);
    return {
      success: false,
      error: error.message || 'Internal error communicating with Resend HTTPS API'
    };
  }
}

/**
 * Sends an email notification when a service request is approved / fulfilled via Resend HTTPS API
 * @param {Object} request - The request object from database
 * @returns {Promise<Object>}
 */
async function sendRequestApprovedEmail(request) {
  if (!request) {
    return { success: false, error: 'No request data provided' };
  }

  const recipientEmail = request.customerEmail || request.applicantEmail;
  if (!recipientEmail || !recipientEmail.includes('@')) {
    console.warn(`[EmailService] No valid recipient email found for request ${request.id}`);
    return { success: false, error: 'No valid recipient email address found for this application' };
  }

  if (!resendClient) {
    console.warn(`[EmailService] Cannot send approval email for request ${request.id}: RESEND_API_KEY is not configured.`);
    return {
      success: false,
      notConfigured: true,
      error: 'Resend API key is not configured on the backend server.'
    };
  }

  const cleanSubject = `✅ Approved: Your ${request.serviceName} Application (${request.trackingNumber || request.id})`;
  const textContent = `Dear ${request.customerName || 'Citizen'},\n\nYour application for ${request.serviceName} (Tracking ID: ${request.trackingNumber || request.id}) has been approved and fulfilled.\n\nPlease log in to the portal or visit our center in Akurdi to collect your document.\n\nArya Enterprises Maha E-Seva Kendra`;

  try {
    const response = await resendClient.emails.send({
      from: EMAIL_FROM,
      to: [recipientEmail.trim()],
      subject: cleanSubject,
      html: createApprovalEmailHTML({
        customerName: request.customerName || request.applicantName,
        serviceName: request.serviceName,
        trackingNumber: request.trackingNumber || request.id,
        fee: request.fee,
        operatorRemarks: request.operatorRemarks,
        completedAt: request.completedAt || new Date().toISOString()
      }),
      text: textContent
    });

    if (response.error) {
      console.error(`[EmailService] Resend API error sending approval to ${recipientEmail}:`, response.error.message || response.error);
      return {
        success: false,
        error: response.error.message || 'Failed to dispatch approval email via Resend'
      };
    }

    console.log(`[EmailService] Approval email dispatched successfully via Resend to ${recipientEmail}. ID: ${response.data?.id}`);
    return {
      success: true,
      id: response.data?.id,
      recipient: recipientEmail
    };
  } catch (error) {
    console.error(`[EmailService] Exception sending approval email to ${recipientEmail}:`, error.message);
    return {
      success: false,
      error: error.message || 'Internal error communicating with Resend HTTPS API'
    };
  }
}

module.exports = {
  isEmailConfigured,
  sendContactEnquiryEmail,
  sendRequestApprovedEmail,
  EMAIL_FROM,
  EMAIL_TO
};
