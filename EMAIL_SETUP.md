# Production Email System Setup & Deployment Guide
## Arya Enterprises Maha E-Seva Kendra

This document describes the production-ready email delivery architecture implemented using the **official Resend Node.js SDK and HTTPS API**, specifically configured to operate reliably on **Render Free tier** without hitting outbound SMTP port blocks.

---

## 1. Architecture Overview

```
┌─────────────────────────────────┐
│     React + Vite Frontend       │
│        (Hosted on Vercel)       │
│   https://your-domain.vercel.app│
└────────────────┬────────────────┘
                 │
                 │ HTTPS (POST /api/email/send)
                 │ CORS-Protected, Rate-Limited
                 ▼
┌─────────────────────────────────┐
│     Node.js + Express Backend   │
│     (Hosted on Render Free)     │
│  https://your-api.onrender.com  │
│  - Input validation (RFC 5322)  │
│  - In-memory duplicate filter   │
│  - 5 requests / 15m rate limit  │
└────────────────┬────────────────┘
                 │
                 │ HTTPS REST API (Port 443)
                 │ [No SMTP / No Port 25/465/587]
                 ▼
┌─────────────────────────────────┐
│        Resend HTTPS API         │
│     https://api.resend.com      │
│  - Verified Custom Domain       │
│  - SPF & DKIM Signed            │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│     Verified Recipient Inbox    │
│    (Configured in EMAIL_TO)     │
│   e.g. your_email@gmail.com     │
└─────────────────────────────────┘
```

### Why Resend HTTPS API (and NOT SMTP or Nodemailer)?
* **Render Free Port Blocks**: Render explicitly blocks outbound connections on standard SMTP ports (`25`, `465`, and `587`) on the Free tier to prevent spam abuse. Attempting to connect via Gmail SMTP or Nodemailer causes connection timeout errors (`ETIMEDOUT`).
* **HTTPS API Guarantee**: Resend communicates strictly over standard HTTPS (port `443`), which is fully open and unhindered on Render Free.
* **Security & Reputation**: Deliverability is backed by SPF, DKIM, and DMARC on your custom domain, avoiding spam folders.

---

## 2. Modified and Created Files

| File | Status | Description |
|---|---|---|
| `backend/package.json` | Modified | Added official `resend` and `express-rate-limit` dependencies; removed unused `nodemailer`. |
| `backend/emailService.js` | Modified | Rewritten to use the official Resend SDK (`resend.emails.send`) for contact enquiries and application approvals. |
| `backend/server.js` | Modified | Added `trust proxy`, strict CORS, request rate limiting, duplicate submission prevention, `POST /api/email/send`, and `GET /health` with `0.0.0.0` host binding. |
| `src/services/api.js` | Modified | Added `sendContactEmail(enquiryData)` connecting the frontend to `POST /api/email/send`. |
| `src/pages/ContactPage.jsx` | Modified | Integrated official email submission with loading spinner, success toast, error banner, client-side validation, and instant WhatsApp fallback. |
| `backend/.env.example` | Modified | Created environment variable template for backend and Render configuration. |
| `.env.example` | Modified | Created environment variable template for frontend and Vercel configuration. |
| `backend/.env` | Modified | Configured safe local development defaults. |
| `EMAIL_SETUP.md` | Created | Comprehensive architectural, setup, and deployment documentation. |

---

## 3. Environment Variables Reference

### Backend (Render Free)

Configure these in the Render Dashboard under **Environment**:

| Variable | Required | Example / Default | Description |
|---|---|---|---|
| `NODE_ENV` | Yes | `production` | Sets Node to production optimization mode. |
| `PORT` | Auto | *(Supplied by Render)* | Render automatically assigns this port at runtime. Express listens on `0.0.0.0`. |
| `JWT_SECRET` | Yes | `your_long_secure_jwt_secret_32_chars` | Secret key for citizen and admin authentication tokens. |
| `RESEND_API_KEY` | Yes | `re_123456789_abcdef...` | Your secret API key from the Resend Dashboard. |
| `EMAIL_FROM` | Yes | `Arya Enterprises <contact@yourdomain.com>` | The verified sender identity in Resend. *(Use `onboarding@resend.dev` for testing)*. |
| `EMAIL_TO` | Yes | `anugadesanika@gmail.com` | Destination inbox where all customer contact enquiries will be delivered. |
| `FRONTEND_URL` | Yes | `https://your-vercel-domain.vercel.app` | Exact URL of your deployed Vercel frontend for strict CORS enforcement. |

### Frontend (Vercel)

Configure this in the Vercel Dashboard under **Project Settings → Environment Variables**:

| Variable | Required | Example | Description |
|---|---|---|---|
| `VITE_API_URL` | Yes | `https://your-render-backend.onrender.com` | Production URL of your Express API deployed on Render. *(No trailing slash)* |

---

## 4. Step-by-Step Setup Guide

### Step 4.1: Resend Account & API Key Setup
1. Visit **[https://resend.com](https://resend.com)** and create a free account.
2. Navigate to **API Keys** in the left sidebar.
3. Click **Create API Key**:
   * **Name**: `Maha-E-Seva-Production`
   * **Permission**: `Full access` (or `Sending access`)
   * **Domain**: Select your domain (or `All domains`).
4. Copy the key starting with `re_...` immediately. Save it securely.

> [!NOTE]
> Resend provides a testing domain `onboarding@resend.dev`. When using `onboarding@resend.dev`:
> - You can **only** send emails to the email address registered with your Resend account.
> - To send emails to any recipient or receive from arbitrary visitors, you must verify your custom domain in Step 4.2.

---

### Step 4.2: Custom Sending Domain Verification (DNS)
1. In the Resend Dashboard, go to **Domains** and click **Add Domain**.
2. Enter your custom domain (e.g., `aryaseva.in` or `notifications.yourdomain.com`).
3. Resend will display DNS records to add at your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.):
   * **DKIM (CNAME or TXT)**: Authenticates your domain's cryptographic signature.
   * **SPF (TXT)**: Authorizes Resend mail servers.
   * **DMARC (TXT)**: Specifies policy for handling unauthorized mail.
4. Add these exact records in your DNS manager.
5. In Resend, click **Verify DNS Records**. Once status changes to **Verified**, update `EMAIL_FROM`:
   ```env
   EMAIL_FROM=Arya Enterprises <contact@yourdomain.com>
   ```

---

### Step 4.3: Render Backend Deployment
1. Log in to your **[Render Dashboard](https://dashboard.render.com/)**.
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository: `https://github.com/anugadesanika-byte/mahaaddharcenter.git`.
4. Configure service settings:
   * **Name**: `maha-e-seva-backend`
   * **Root Directory**: `backend` *(CRITICAL: backend is in a subfolder)*
   * **Runtime**: `Node`
   * **Build Command**: `npm install`
   * **Start Command**: `node server.js`
   * **Instance Type**: `Free`
5. Click **Advanced** → **Add Environment Variable** and enter:
   ```
   NODE_ENV = production
   JWT_SECRET = <generate_a_random_32_character_string>
   RESEND_API_KEY = re_your_actual_resend_api_key
   EMAIL_FROM = Arya Enterprises <onboarding@resend.dev>  (or your verified domain)
   EMAIL_TO = anugadesanika@gmail.com
   FRONTEND_URL = https://your-vercel-domain.vercel.app
   ```
6. Click **Create Web Service**.
7. Once deployed, note down your Render URL: `https://<service-name>.onrender.com`.

---

### Step 4.4: Vercel Frontend Deployment
1. Log in to your **[Vercel Dashboard](https://vercel.com/)**.
2. Click **Add New...** → **Project**.
3. Import your repository: `mahaaddharcenter`.
4. Configure project settings:
   * **Framework Preset**: `Vite`
   * **Root Directory**: `./` (Root)
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
5. Expand **Environment Variables** and add:
   ```
   VITE_API_URL = https://your-backend-service-name.onrender.com
   ```
   *(Ensure there is NO trailing slash).*
6. Click **Deploy**.
7. Once deployed, copy your production Vercel URL (e.g. `https://mahaaddharcenter.vercel.app`).
8. Return to Render and update `FRONTEND_URL` to match this exact Vercel URL so CORS allows incoming requests.

---

## 5. Testing and Verification Checklist

| Test Item | Steps to Verify | Expected Result |
|---|---|---|
| **1. Health Endpoint** | Visit `https://your-backend.onrender.com/health` in your browser. | HTTP 200 with `{ "status": "ok", "emailProvider": "Resend HTTPS API", "emailConfigured": true }`. |
| **2. Missing Field Rejection** | Send POST with empty name or email via Postman / curl. | HTTP 400 with specific validation message explaining the missing field. |
| **3. Invalid Email Format** | Submit contact form with `not-an-email`. | Frontend blocks submission with client-side red banner; backend rejects with HTTP 400. |
| **4. Oversized Message** | Send a message body with >3000 characters. | Backend rejects with HTTP 400 (`message must be between 5 and 3000 characters`). |
| **5. Duplicate Submission** | Click submit twice within 60 seconds with identical details. | Backend rejects the 2nd attempt with HTTP 429 (`Duplicate submission detected`). |
| **6. Rate Limiting** | Send 6 requests rapidly from the same IP. | 6th request returns HTTP 429 (`Too many enquiry requests from this IP address`). |
| **7. CORS Enforcement** | Test request from unauthorized origin with origin header. | Request blocked with CORS policy violation error. |
| **8. Real Email Delivery** | Fill out the Contact page form on your live site and click **Send Official Enquiry Email**. | 1. Button shows spinner `Sending Message...`<br/>2. Green banner confirms delivery.<br/>3. Email arrives in `EMAIL_TO` inbox with reply-to set to visitor's email. |
| **9. Cold-Start Handling** | First visit after 15 minutes of inactivity on Render Free. | May take 20–50 seconds while container wakes up. Status UI handles timeout gracefully. |

---

## 6. Security & Anti-Abuse Measures Implemented

1. **Strict Input Sanitization**: HTML escaping is applied to all visitor inputs before building the email template to prevent HTML injection and phishing vectors.
2. **Hardcoded Server Recipient**: The destination address (`EMAIL_TO`) is read strictly from backend environment variables. The API endpoint never allows visitors to specify arbitrary recipients, eliminating open-relay vulnerabilities.
3. **Safe Reply-To Routing**: The visitor's verified email is passed into Resend's `reply_to` parameter. The `From` field is strictly controlled by `EMAIL_FROM`.
4. **Reverse Proxy Trust**: `app.set('trust proxy', 1)` is enabled so Render's forwarded headers are accurately parsed for IP rate-limiting without trusting forged client headers.
5. **Payload Size Guard**: Body parsing is restricted to `2mb`, preventing Denial of Service (DoS) attacks via memory exhaustion.

---

## 7. Troubleshooting Guide

### Issue: "The email service is temporarily unconfigured on this deployment (503)"
* **Cause**: `RESEND_API_KEY` is either missing or empty in your Render environment variables.
* **Fix**: In the Render Dashboard, open your web service → **Environment** → add `RESEND_API_KEY = re_...` and trigger a manual redeploy.

### Issue: "Resend error: You can only send testing emails to your own email address"
* **Cause**: You are using `onboarding@resend.dev` as `EMAIL_FROM`, and `EMAIL_TO` is set to an address different from your Resend account email.
* **Fix**: Either change `EMAIL_TO` to your Resend account email for testing, or verify your custom domain in Resend and update `EMAIL_FROM` to an address on your verified domain.

### Issue: "CORS policy violation: Origin https://... is not allowed"
* **Cause**: The `FRONTEND_URL` environment variable on Render does not match the actual Vercel URL (e.g. trailing slash mismatch, `http` vs `https`, or different subdomain).
* **Fix**: Check your Vercel domain in your browser URL bar. Copy the exact domain without trailing slash and set it as `FRONTEND_URL` on Render.

### Issue: Frontend shows "Unable to reach server"
* **Cause**: `VITE_API_URL` was not configured before running `npm run build` on Vercel.
* **Fix**: Vite embeds environment variables into the static bundle at build time. Whenever you change `VITE_API_URL` on Vercel, you must go to **Deployments** → **Redeploy** to produce a fresh build.
