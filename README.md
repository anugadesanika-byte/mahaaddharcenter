# Arya Enterprises - Maha E-Seva Kendra & Digital Citizen Portal

A comprehensive, full-stack, enterprise-grade citizen services web platform for **Arya Enterprises (Maha E-Seva Kendra & Multi-Services Center)** located in Akurdi, PCMC, Pune. Built with **React 18**, **Tailwind CSS**, and **Express.js**, featuring an **Admin Analytics & Request Management Suite**, **Customer Self-Service Portal with Document Uploads**, and a **Zero-Cost Self-Contained Database Engine** designed for **Render** and **Vercel** deployment.

---

## 📋 Table of Contents
- [🌟 System Highlights & Key Features](#-system-highlights--key-features)
  - [1. Admin Analytics & Request Management Dashboard](#1-admin-analytics--request-management-dashboard)
  - [2. Citizen Portal & Online Document Upload](#2-citizen-portal--online-document-upload)
  - [3. Tri-Lingual Experience (EN / MR / HI)](#3-tri-lingual-experience-en--mr--hi)
  - [4. Zero-Cost Self-Contained Database Storage](#4-zero-cost-self-contained-database-storage)
- [🔐 Default Demo Credentials](#-default-demo-credentials)
- [🛠️ Tech Stack & Architecture](#️-tech-stack--architecture)
- [📁 Project Directory Structure](#-project-directory-structure)
- [🚀 How to Run Locally from Scratch](#-how-to-run-locally-from-scratch)
  - [Prerequisites](#prerequisites)
  - [Step 1: Start Backend Server](#step-1-start-backend-server)
  - [Step 2: Start Frontend Application](#step-2-start-frontend-application)
- [☁️ Cloud Deployment Guide](#️-cloud-deployment-guide)
  - [Deploy Backend to Render (Free Tier)](#deploy-backend-to-render-free-tier)
  - [Deploy Frontend to Vercel (Free Tier)](#deploy-frontend-to-vercel-free-tier)
- [💾 Database Architecture & Zero Cost Guarantee](#-database-architecture--zero-cost-guarantee)
- [🖼️ Image Path Handling Guarantee](#️-image-path-handling-guarantee)
- [📞 Contact & Center Details](#-contact--center-details)
- [📄 License](#-license)

---

## 🌟 System Highlights & Key Features

### 1. Admin Analytics Studio & Request Management Suite
Accessible at `/#admin` or `/#analytics` (or via **Analytics Panel** and **Request Menu** in the navigation):

#### 📊 Separate Executive Analytics & Multiple Charts Panel (`/#analytics`):
* **📈 1. Monthly Application & Delivery Area Trend Chart:** Interactive dual-gradient SVG area & line chart tracking month-over-month citizen submissions vs. fulfilled certificates, with real-time hover tooltips (Submissions, Completions, Resolution Rate, and Monthly Revenue).
* **🍩 2. Status Distribution Donut Chart:** Interactive multi-segment SVG ring visualizer displaying current workload across *Fulfilled (55%)*, *In-Progress (24%)*, *Pending Review (16%)*, and *Rejected (5%)* with hover focus and percentage metrics.
* **📅 3. Weekly Day-by-Day Peak Workload Chart:** Clustered column bars comparing submissions vs completed resolutions across Monday to Sunday, highlighting high-rush traffic days (Saturdays & Mondays) to optimize operator scheduling.
* **📑 4. Service Category Performance & SLA Table:** Cross-sector comparison across *Identity*, *Certificates*, *Business*, *Legal*, and *Welfare Schemes* detailing volume, fee collection (₹), average SLA turnaround time, and completion rates.
* **🎯 5. 4-Stage Citizen Verification Funnel:** Pipeline conversion from *Online Upload (100%)* ➔ *Operator Document Check (92%)* ➔ *Tahsildar / UIDAI Desk (80%)* ➔ *Certificate Issued & Delivered (75%)*.
* **🏆 6. Top 8 In-Demand Government Services Leaderboard:** Ranked cards showing application count, revenue yield, and turnaround speed per service.
* **🗺️ 7. PCMC & Pune Geographic Demand Breakdown:** Ward-level heat indicators across Akurdi, Nigdi Pradhikaran, Chinchwad, Ravet, and Bhosari.
* **📲 8. Channel Delivery & Payment Split:** Online portal self-uploads (68%) vs walk-in center visits (32%), along with digital UPI vs cash ratios.
* **📥 One-Click CSV Export:** Operators can download full executive business intelligence reports in standard CSV format with a single click.

#### 📋 Dedicated Citizen Request Management Menu (`/#admin`):
* **Status Filter Tabs:** `All Requests`, `Pending Review`, `In-Progress (Govt Desk)`, `Fulfilled / Ready`, and `Rejected / Discrepancy`.
* **Live Search & Filter:** Instant search by Applicant Name, Mobile, Tracking Number, or Service.
* **Status & Remarks Update Modal:** Operator can change status, append official citizen remarks, adjust government fees, and generate government tracking numbers.
* **Document Inspection Modal:** Review uploaded Aadhaar, Ration cards, and Affidavits with 1-click inspection links.

---

### 2. Citizen Portal & Online Document Upload
Accessible at `/#portal` or `/#apply` (or via the **Citizen Portal** button in the header):
* **📝 30+ Government Services Online Application:** Citizens can select any service from the catalog (Caste Certificate, Income Certificate, Domicile, Shop Act, PAN Card, Ladki Bahin Yojana, etc.).
* **📋 Dynamic Document Checklist:** Automatically displays mandatory documents required for the chosen service (e.g. 7/12 extract, Ration card, School Leaving Certificate, Affidavit).
* **📎 Multi-File Verification Upload:** Citizens can securely attach proof documents (PDF, JPG, PNG) directly from their mobile phone or PC.
* **📍 Live 4-Step Application Tracker:**
  1. `Submitted` (Documents received by Kendra)
  2. `Under Review` (Operator verified credentials)
  3. `Processing` (Government application filed with Tahsildar/UIDAI)
  4. `Completed / Ready` (Certificate ready with direct download link)
* **🔔 Tracking Number & Remarks:** View assigned tracking reference numbers (e.g. `MH-REQ-884102`) and center remarks.

---

### 3. Tri-Lingual Experience (EN / MR / HI)
* Full dynamic translation for the public interface across **English**, **मराठी (Marathi)**, and **हिंदी (Hindi)**.
* Powered by Google **Noto Sans** and **Noto Sans Devanagari** typography.
* Preserves government terminology standard in Maharashtra governance.

---

### 4. Zero-Cost Self-Contained Database Storage
* **No Monthly Fees:** Zero dependency on MongoDB Atlas, Supabase, Neon, or AWS RDS.
* **Self-Contained File Engine:** The entire database resides in `backend/data/database.json`.
* **Crash-Safe Atomic Writes:** Uses temporary swap files (`.tmp`) and `fs.renameSync` to eliminate data corruption during concurrent writes.
* **Multi-Environment Resilience:** Seamless fallback to browser local storage if the backend is waking up from Render's free tier sleep.

---

### 5. Single-Session Enforcement & Real-Time Conflict Detection
* **🛡️ One Active Session Per User:** Prevents concurrent logins across multiple devices or browsers to safeguard citizen Aadhaar documents and administrative controls.
* **🔄 Session Persistence:** When deployed to Vercel/Render, the user session remains intact across page refreshes, internal routing, and browser restarts.
* **⚡ Concurrent Session Conflict Modal:**
  If a citizen or admin tries to sign in from Device B while Device A is already logged in, a modal dialog appears asking:
  > **"You want to terminate Another Session "**
  - **Cancel:** Preserves the existing session on Device A and aborts the login on Device B.
  - **Yes, Terminate Session:** Terminates the session on Device A and starts a fresh session on Device B.
* **📡 Real-Time SSE & Cross-Tab Synchronization:**
  - Built-in **Server-Sent Events (SSE)** endpoint (`/api/auth/session-stream`) pushes instant invalidation events to the previous device.
  - Device A immediately signs out and displays a clear security notification: *"Your session has been terminated because another session was started on a different device."*
  - Supported across network devices via SSE and across local tabs/windows via `BroadcastChannel` and `storage` sync.

---

### 6. Automated Approval Email Notifications (Gmail SMTP)
* **✉️ Automated Trigger on Approval:** When an admin or operator updates a citizen's request status to **"Fulfilled / Ready"** (`fulfilled` or `approved`), the system automatically dispatches an official, bilingual (English & Marathi) confirmation email to the applicant's email address.
* **📬 Sender Account:** Dispatched from **`anugadesanika@gmail.com`** using Google App Password authentication via Nodemailer.
* **📑 Email Contents:**
  - Green **Application Approved & Fulfilled** status badge
  - Service Name & Government Tracking ID
  - Date & Time of approval
  - Operator remarks and next steps (how to download online or collect physically at the Akurdi center)
  - Complete Maha E-Seva Kendra center address & helpline number
* **🔄 Manual Re-Send Option:** Operators can also click the **"Email"** button next to any approved application in the Admin Dashboard to re-send the notification at any time.

---

## 🔐 Default Demo Credentials

For testing and demonstration, the database comes pre-seeded with verified test accounts:

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Center Admin** | `admin@aryaseva.com` | `admin123` | Full Analytics, Request Management, Status Updates |
| **Demo Citizen** | `customer@example.com` | `customer123` | Apply Online, Upload Documents, Track Applications |

> 💡 *Tip: The Login / Registration screen (`/#auth`) contains convenient **"1-Click Demo Fill"** buttons to test either role instantly without typing.*

---

## 🛠️ Tech Stack & Architecture

```text
┌────────────────────────────────────────────────────────┐
│               Frontend (Vercel SPA)                    │
│   React 18 + Vite 5 + Tailwind CSS + Lucide / FontAwesome│
└───────────────────────────┬────────────────────────────┘
                            │ REST API / JWT Auth / FormData
┌───────────────────────────▼────────────────────────────┐
│               Backend (Render Web Service)             │
│   Node.js + Express.js + Multer + JWT + BcryptJS       │
└───────────────────────────┬────────────────────────────┘
                            │ Atomic Safe FS Engine
┌───────────────────────────▼────────────────────────────┐
│      Self-Contained Database (Zero Cost Hosting)        │
│             backend/data/database.json                 │
└────────────────────────────────────────────────────────┘
```

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18 | Declarative component UI with hooks and Context API |
| **Styling & Theme** | Tailwind CSS 3 | Tri-color Indian national palette (Saffron, Navy, Emerald) |
| **Build Tool** | Vite 5 | Instant HMR and optimized production bundling |
| **Routing** | Hash-Based SPA | Fully compatible with static hosting (Vercel, GitHub Pages) |
| **Backend Runtime** | Node.js & Express | Lightweight RESTful microservice |
| **Authentication** | JWT & Bcrypt | Signed JSON Web Tokens with salted password hashing |
| **File Uploads** | Multer | Multipart document processing with disk storage |
| **Database Engine** | File JSON Store | High-performance, atomic, zero-cost file storage |

---

## 📁 Project Directory Structure

```text
Maha-E-Seva-Kendra-Template-main/
├── backend/                              # Express REST API Server
│   ├── data/
│   │   └── database.json                 # Self-contained zero-cost JSON database
│   ├── uploads/                          # Citizen uploaded document files
│   ├── .env.example                      # Environment variables template
│   ├── db.js                             # Atomic JSON database engine
│   ├── render.yaml                       # 1-click Blueprint for Render.com deployment
│   ├── server.js                         # Express API routes, JWT auth & controllers
│   └── package.json                      # Backend dependencies
│
├── public/                               # Static assets served at root
│   ├── images/                           # 48 project images (Aadhaar, PAN, certificates, etc.)
│   └── favicon.ico                       # Portal favicon
│
├── src/                                  # React 18 Application Source
│   ├── components/                       # Shared UI Components
│   │   ├── ContactOverlay.jsx            # Floating WhatsApp & Call dialer
│   │   ├── Footer.jsx                    # Comprehensive footer
│   │   ├── HeroSlider.jsx                # Auto-sliding scheme banner
│   │   ├── MediaModal.jsx                # Lightbox viewer for office gallery
│   │   ├── Navbar.jsx                    # MegaMenu, Tri-lingual toggle & Auth status
│   │   ├── ServiceCard.jsx               # Service card with enquire & online apply
│   │   └── ServiceModal.jsx              # Detailed modal with documents & fast-track apply
│   │
│   ├── context/                          # React Context Providers
│   │   ├── AuthContext.jsx               # Citizen/Admin session, login, register, logout
│   │   └── LanguageContext.jsx           # Tri-lingual (EN, MR, HI) translations
│   │
│   ├── data/
│   │   └── data.js                       # 30+ services catalog, scheme details, contacts
│   │
│   ├── pages/                            # Top-Level Page Views
│   │   ├── AboutPage.jsx                 # Center history, operator credentials, mission
│   │   ├── AdminDashboard.jsx            # Analytics KPI cards & request management table
│   │   ├── AuthPage.jsx                  # Citizen/Admin sign-in and registration tabs
│   │   ├── BlogPage.jsx                  # Informative articles on Maharashtra schemes
│   │   ├── ContactPage.jsx               # Google Map, address, working hours, form
│   │   ├── CustomerPortal.jsx            # Document upload wizard & application tracking
│   │   ├── GalleryPage.jsx               # High-res photos and office video tours
│   │   ├── HomePage.jsx                  # Hero, search bar, trending cards, FAQ
│   │   └── ServicesPage.jsx              # Filterable catalog by category
│   │
│   ├── services/
│   │   └── api.js                        # Unified API client with offline demo fallback
│   ├── App.jsx                           # Application router & modal controller
│   ├── index.css                         # Tailwind directives & custom CSS
│   └── main.jsx                          # React application entry point
│
├── .gitignore                            # Git ignore rules
├── index.html                            # HTML5 root with responsive meta tags
├── package.json                          # Frontend dependencies & Vite scripts
├── postcss.config.js                     # Tailwind PostCSS configuration
├── tailwind.config.js                    # Brand colors: Saffron (#ff9933), Navy (#000080)
├── vercel.json                           # Vercel SPA routing rewrite configuration
└── README.md                             # Complete project documentation
```

---

## 🚀 How to Run Locally from Scratch

### Prerequisites
* **Node.js** version 18.0.0 or higher ([Download Node.js](https://nodejs.org/))
* **npm** version 9.0.0 or higher

---

### Step 1: Start Backend Server

Open a terminal in the project root:

```bash
# Navigate to backend directory
cd backend

# Install backend dependencies (express, cors, multer, bcryptjs, jsonwebtoken, dotenv)
npm install

# Start backend server
npm start
```

The backend server will start on:
```text
> Maha E-Seva Kendra API running on http://localhost:5000
> Database connected: backend/data/database.json
```

---

### Step 2: Start Frontend Application

Open a **second terminal** in the project root:

```bash
# Install frontend dependencies (react, react-dom, vite, tailwindcss)
npm install

# Start Vite development server
npm run dev
```

Open your browser and navigate to:
```text
http://localhost:5173
```

---

## ☁️ Cloud Deployment Guide

### Deploy Backend to Render (Free Tier)

The backend is configured for deployment on **Render's Free Web Service Tier**:

1. **Push your code to GitHub / GitLab**.
2. Log in to [Render.com](https://render.com) and click **"New +"** ➔ **"Web Service"**.
3. Connect your repository.
4. Configure the service settings:
   - **Name:** `maha-e-seva-api` (or any name you choose)
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** `Free`
5. Under **Environment Variables**, add:
   - `PORT`: `5000`
   - `JWT_SECRET`: `your_random_secure_jwt_secret_key_123`
   - `CLIENT_URL`: `https://your-frontend.vercel.app` (or `*`)
   - `EMAIL_USER`: `anugadesanika@gmail.com`
   - `EMAIL_PASS`: `your_16_char_google_app_password` *(paste directly in Render; never commit to Git)*
   - `EMAIL_SENDER_NAME`: `"Arya Enterprises - Maha E-Seva Kendra"`
6. Click **"Create Web Service"**.
7. Copy your deployed backend URL (e.g. `https://maha-e-seva-api.onrender.com`).

---

### ⏱️ Keeping Render Backend Online 24/7 (Free Tier Uptime Setup)

Render's free tier spins down web services after 15 minutes of inactivity. To keep your server online 24/7 at **zero cost**:

1. **Lightweight Health Endpoint (`/health` and `/api/health`):**
   The backend includes dedicated `GET` and `HEAD` routes:
   ```text
   GET https://your-backend-name.onrender.com/health
   Response: { "status": "ok", "uptime": 1240, "database": "connected" }
   ```
2. **Automated Free Ping via UptimeRobot (Recommended):**
   - Create a free account at [UptimeRobot.com](https://uptimerobot.com).
   - Click **"Add New Monitor"**:
     - **Monitor Type:** `HTTP(s)`
     - **Friendly Name:** `Maha E-Seva Backend`
     - **URL (or IP):** `https://your-backend-name.onrender.com/health`
     - **Monitoring Interval:** `Every 5 minutes` (or 10 minutes)
   - Save the monitor. UptimeRobot will ping the health route every 5 minutes, preventing Render from ever falling asleep!
3. **Built-in Auto Heartbeat:**
   - Render automatically provides `RENDER_EXTERNAL_URL` in its environment. When detected, the backend also automatically fires an internal keep-alive heartbeat every 12 minutes.

---

### 🔒 GitHub Secret Protection & Security Compliance
- All sensitive credentials (JWT secrets, email passwords, session identifiers) are strictly isolated in `backend/.env`.
- Root and backend `.gitignore` rules prevent any `.env` file from being committed to Git.
- Sample templates (`.env.example` and `backend/.env.example`) are provided with dummy placeholders so repositories can be pushed to public/school GitHub accounts without triggering GitGuardian or GitHub Secret Scanning warnings.

*(Alternatively, you can use Render's **Blueprint** feature which reads `backend/render.yaml` automatically).*

---

### Deploy Frontend to Vercel (Free Tier)

The frontend includes `vercel.json` configured for SPA routing:

1. Log in to [Vercel](https://vercel.com) and click **"Add New..."** ➔ **"Project"**.
2. Import your GitHub repository.
3. Configure the build settings:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `./` (leave default)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Under **Environment Variables**, add:
   - `VITE_API_URL`: `https://your-backend-name.onrender.com/api` (URL of your Render backend)
5. Click **"Deploy"**.

Your application will be live across high-speed global CDNs with automatic HTTPS!

---

## 💾 Database Architecture & Zero Cost Guarantee

### Why a Self-Contained JSON Database?
Most database providers (MongoDB Atlas, Supabase, Neon) charge recurring monthly fees, require credit cards, and throttle connections after short inactivity periods.

To eliminate recurring hosting fees:
1. **Zero External Billing:** All citizen records, applications, uploaded file metadata, and admin metrics are stored directly in `backend/data/database.json`.
2. **Safe Concurrent Writing (`db.js`):**
   ```javascript
   // Atomic write avoids file corruption
   const tempPath = `${DB_PATH}.tmp`;
   fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf8');
   fs.renameSync(tempPath, DB_PATH);
   ```
3. **Automated Seeding:** If `database.json` is missing or emptied, the backend automatically initializes with default schema, admin credentials, demo customers, and sample citizen applications.
4. **Resilient Offline / Sleep Fallback:** In `src/services/api.js`, if the Render free server is cold-starting, the frontend seamlessly uses a local storage clone so users experience zero blank screens.

---

## 🖼️ Image Path Handling Guarantee

All 48 service, certification, and office photos are preserved in the original structure:
* Stored in `public/images/`
* Referenced cleanly in `src/data/data.js` as `images/adhar.jpg`, `images/pan.jpg`, `images/income.jpg`, etc.
* When Vite compiles for production (`npm run build`), all images from `public/images/` are copied directly to `dist/images/` without altering URL paths.

---

## 📞 Contact & Center Details

* **Center Name:** Arya Enterprises - Maha E-Seva Kendra & Multi-Services
* **Proprietor:** Paras Shende
* **Location:** Shop No. 3, Near Akurdi Railway Station, Akurdi, PCMC, Pune - 411035, Maharashtra
* **Helpline:** `+91 7774946121` / `+91 9172462464`
* **WhatsApp:** `+91 7774946121`
* **Email:** `support@aryaseva.com`
* **Operating Hours:** Monday – Saturday: 9:00 AM – 8:30 PM | Sunday: 10:00 AM – 2:00 PM

---

## 📄 License
MIT License. Free for government Kendra operators, citizens, and educational use.
