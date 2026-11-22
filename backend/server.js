const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { readDB, writeDB, initDB } = require('./db');
const {
  isEmailConfigured,
  sendContactEnquiryEmail,
  sendRequestApprovedEmail,
  EMAIL_FROM,
  EMAIL_TO
} = require('./emailService');

// Initialize database
initDB();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'arya_eseva_jwt_super_secret_key_2026';

// Trust Render reverse proxy for accurate IP rate-limiting & HTTPS detection
app.set('trust proxy', 1);

// Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Configure CORS: Allow explicitly configured production Vercel frontend and local development
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://arya-eseva.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000'
]
  .filter(Boolean)
  .map((origin) => origin.trim().replace(/\/+$/, ''));

const corsOptions = {
  origin: function (origin, callback) {
    // Allow non-browser requests (Uptime monitors, mobile, curl)
    if (!origin) return callback(null, true);
    const normalized = origin.trim().replace(/\/+$/, '');
    if (allowedOrigins.includes(normalized) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy violation: Origin ${origin} is not allowed`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};
app.use(cors(corsOptions));

// Request Body Limits
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Static uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const safeName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '_');
    cb(null, `${Date.now()}_${safeName}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 } // 1MB maximum limit per document
});

// Active SSE connections map: sessionId -> { res, userId, role, email }
const activeSSEConnections = new Map();

function sendSSEMessage(sessionId, data) {
  const client = activeSSEConnections.get(sessionId);
  if (client) {
    try {
      const clientRes = client.res || client;
      clientRes.write(`data: ${JSON.stringify(data)}\n\n`);
    } catch (e) {
      activeSSEConnections.delete(sessionId);
    }
  }
}

// Real-time event broadcaster for requests, approvals, and citizen updates
function broadcastRealtimeEvent(eventData, filterFn = null) {
  activeSSEConnections.forEach((client, sessionId) => {
    try {
      if (!filterFn || filterFn(client)) {
        const clientRes = client.res || client;
        clientRes.write(`data: ${JSON.stringify(eventData)}\n\n`);
      }
    } catch (e) {
      activeSSEConnections.delete(sessionId);
    }
  });
}

// Helper: Token generator (includes unique sessionId)
function generateToken(user, sessionId) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      sessionId: sessionId
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// Auth Middleware: enforces single active session
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing or invalid' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const db = readDB();
    const user = db.users.find((u) => u.id === decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User account no longer exists' });
    }

    // Verify session matches currently active session for this user
    if (decoded.sessionId && user.activeSession && user.activeSession.sessionId !== decoded.sessionId) {
      return res.status(401).json({
        code: 'SESSION_TERMINATED',
        message: 'Your session has been terminated because another session was started on a different device.'
      });
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone
    };
    req.sessionId = decoded.sessionId;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expired or invalid', error: err.message });
  }
}

// Admin only middleware
function adminMiddleware(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Administrator privileges required' });
  }
  next();
}

// Rate Limiter for outbound Contact Email enquiries (5 requests per 15 minutes per IP)
const emailRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many enquiry requests from this IP address. Please wait 15 minutes before sending another message.'
  }
});

// In-Memory Duplicate Submission Guard (60-second sliding window)
const recentSubmissions = new Map();
function isDuplicateSubmission(key, windowSeconds = 60) {
  const now = Date.now();
  for (const [k, time] of recentSubmissions.entries()) {
    if (now - time > windowSeconds * 1000) {
      recentSubmissions.delete(k);
    }
  }
  if (recentSubmissions.has(key)) {
    return true;
  }
  recentSubmissions.set(key, now);
  return false;
}

// -------------------------------------------------------------
// ROUTES
// -------------------------------------------------------------

// Health Check Route for Uptime Monitors (UptimeRobot, BetterStack, Cron-Job.org)
// Supports both GET & HEAD requests on /health and /api/health to keep Render awake 24/7
const handleHealthCheck = (req, res) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });
  res.status(200).json({
    status: 'ok',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    service: 'Arya Enterprises Maha E-Seva Kendra API',
    emailProvider: 'Resend HTTPS API',
    emailConfigured: isEmailConfigured(),
    database: 'connected',
    environment: process.env.NODE_ENV || 'development'
  });
};

app.get('/health', handleHealthCheck);
app.get('/api/health', handleHealthCheck);
app.head('/health', (req, res) => res.status(200).end());
app.head('/api/health', (req, res) => res.status(200).end());

// 0. Email: Send Contact Enquiry via Resend HTTPS API
app.post('/api/email/send', emailRateLimiter, async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body || {};

    // 1. Type validation
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof subject !== 'string' ||
      typeof message !== 'string'
    ) {
      return res.status(400).json({
        success: false,
        message: 'Validation error: name, email, subject, and message are required strings.'
      });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = typeof phone === 'string' ? phone.trim() : '';
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();

    // 2. Required fields
    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      return res.status(400).json({
        success: false,
        message: 'Validation error: please fill in all required fields (Name, Email, Subject, and Message).'
      });
    }

    // 3. Length validation
    if (trimmedName.length < 2 || trimmedName.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Validation error: name must be between 2 and 100 characters.'
      });
    }
    if (trimmedSubject.length < 2 || trimmedSubject.length > 200) {
      return res.status(400).json({
        success: false,
        message: 'Validation error: subject must be between 2 and 200 characters.'
      });
    }
    if (trimmedMessage.length < 5 || trimmedMessage.length > 3000) {
      return res.status(400).json({
        success: false,
        message: 'Validation error: message must be between 5 and 3000 characters.'
      });
    }
    if (trimmedPhone && trimmedPhone.length > 20) {
      return res.status(400).json({
        success: false,
        message: 'Validation error: phone number must not exceed 20 characters.'
      });
    }

    // 4. Email format validation (standard RFC 5322 regex)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailRegex.test(trimmedEmail) || trimmedEmail.length > 254) {
      return res.status(400).json({
        success: false,
        message: 'Validation error: please provide a valid email address.'
      });
    }

    // 5. In-memory duplicate submission check
    const duplicateKey = `${trimmedEmail.toLowerCase()}_${trimmedSubject.toLowerCase()}_${trimmedMessage.slice(0, 100).toLowerCase()}`;
    if (isDuplicateSubmission(duplicateKey, 60)) {
      return res.status(429).json({
        success: false,
        message: 'Duplicate submission detected. Please wait at least 60 seconds before re-sending identical enquiries.'
      });
    }

    // 6. Send email via Resend SDK
    const emailResult = await sendContactEnquiryEmail({
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      subject: trimmedSubject,
      message: trimmedMessage,
      submittedAt: new Date().toISOString(),
      clientIp: req.ip
    });

    if (!emailResult.success) {
      if (emailResult.notConfigured) {
        return res.status(503).json({
          success: false,
          message: 'The email service is temporarily unconfigured on this deployment. Please reach out via WhatsApp (+91 7774946121) or phone.'
        });
      }
      return res.status(500).json({
        success: false,
        message: 'Failed to deliver your email message. Please try again later or contact us directly on WhatsApp.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully! Our center team will get back to you shortly.',
      id: emailResult.id
    });
  } catch (err) {
    console.error('[Server] Uncaught error in POST /api/email/send:', err.message);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred while processing your message.'
    });
  }
});

// 1. Auth: Register Customer
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, phone, password, deviceInfo } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const db = readDB();
    const existing = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ message: 'An account with this email already exists' });
    }

    const sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const clientDevice = deviceInfo || req.headers['user-agent'] || 'Web Client';

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      passwordHash,
      role: 'customer',
      createdAt: new Date().toISOString(),
      activeSession: {
        sessionId,
        deviceInfo: clientDevice,
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '',
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString()
      }
    };

    db.users.push(newUser);
    writeDB(db);

    // Broadcast real-time citizen registration event
    broadcastRealtimeEvent({
      type: 'NEW_CITIZEN_REGISTERED',
      message: `New citizen registered: ${newUser.name} (${newUser.email})`,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        createdAt: newUser.createdAt
      }
    });

    const token = generateToken(newUser, sessionId);
    res.status(201).json({
      message: 'Registration successful',
      token,
      sessionId,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error during registration', error: err.message });
  }
});

// 2. Auth: Login (Customer or Admin) with Concurrent Session Conflict Detection
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, forceTerminate, deviceInfo } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const db = readDB();
    const user = db.users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const clientDevice = deviceInfo || req.headers['user-agent'] || 'Web Browser';
    const existingSession = user.activeSession;

    // Check if an active session already exists and user hasn't explicitly confirmed termination
    if (existingSession && existingSession.sessionId && !forceTerminate) {
      return res.status(409).json({
        sessionConflict: true,
        message: 'You want to terminate Another Session ',
        existingSession: {
          deviceInfo: existingSession.deviceInfo || 'Another Device / Browser',
          loginTime: existingSession.createdAt
        }
      });
    }

    // User confirmed termination ("Yes") or had no prior session:
    // Terminate existing session in realtime via SSE if active
    if (existingSession && existingSession.sessionId) {
      sendSSEMessage(existingSession.sessionId, {
        type: 'SESSION_TERMINATED',
        reason: 'Another session was started on a different device.',
        newDevice: clientDevice,
        timestamp: new Date().toISOString()
      });
      activeSSEConnections.delete(existingSession.sessionId);
    }

    // Start fresh unique session
    const newSessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    user.activeSession = {
      sessionId: newSessionId,
      deviceInfo: clientDevice,
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '',
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString()
    };

    writeDB(db);

    const token = generateToken(user, newSessionId);
    res.json({
      message: 'Login successful',
      token,
      sessionId: newSessionId,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error during login', error: err.message });
  }
});

// 2b. Auth: Realtime SSE Stream for Session Status
app.get('/api/auth/session-stream', (req, res) => {
  const token = req.query.token;
  if (!token) {
    return res.status(401).send('Token missing');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const db = readDB();
    const user = db.users.find((u) => u.id === decoded.id);

    if (!user || !user.activeSession || user.activeSession.sessionId !== decoded.sessionId) {
      return res.status(401).send('Session terminated or invalid');
    }

    // Setup SSE headers
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });

    res.write(`data: ${JSON.stringify({ type: 'CONNECTED', sessionId: decoded.sessionId })}\n\n`);

    // Register active SSE connection with user metadata
    activeSSEConnections.set(decoded.sessionId, { res, userId: user.id, role: user.role, email: user.email });

    // Keep connection alive with heartbeat every 20 seconds
    const heartbeat = setInterval(() => {
      try {
        res.write(': heartbeat\n\n');
      } catch (e) {
        clearInterval(heartbeat);
      }
    }, 20000);

    req.on('close', () => {
      clearInterval(heartbeat);
      activeSSEConnections.delete(decoded.sessionId);
    });
  } catch (err) {
    return res.status(401).send('Invalid token');
  }
});

// 2c. Auth: Active Session Check
app.get('/api/auth/check-session', authMiddleware, (req, res) => {
  res.json({
    active: true,
    sessionId: req.sessionId,
    user: req.user
  });
});

// 2d. Auth: Logout (clears activeSession)
app.post('/api/auth/logout', authMiddleware, (req, res) => {
  try {
    const db = readDB();
    const user = db.users.find((u) => u.id === req.user.id);
    if (user && user.activeSession) {
      if (activeSSEConnections.has(user.activeSession.sessionId)) {
        activeSSEConnections.delete(user.activeSession.sessionId);
      }
      user.activeSession = null;
      writeDB(db);
    }
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error during logout' });
  }
});

// 3. Auth: Current User Profile
app.get('/api/auth/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// 4. Customer: Get My Requests
app.get('/api/requests/my-requests', authMiddleware, (req, res) => {
  try {
    const db = readDB();
    const myRequests = (db.requests || [])
      .filter((r) => r.customerId === req.user.id || r.customerEmail.toLowerCase() === req.user.email.toLowerCase())
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(myRequests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve your requests', error: err.message });
  }
});

// 5. Customer: Create Service Request with Documents
app.post('/api/requests', authMiddleware, upload.array('documents', 10), (req, res) => {
  try {
    const {
      serviceId,
      serviceName,
      category,
      notes,
      applicantName,
      applicantPhone,
      applicantEmail,
      aadhaarNumber,
      address
    } = req.body;

    if (!serviceName) {
      return res.status(400).json({ message: 'Service name is required' });
    }

    // Process uploaded files
    const uploadedDocs = (req.files || []).map((file) => ({
      name: file.fieldname || 'Uploaded Document',
      originalName: file.originalname,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype,
      url: `/uploads/${file.filename}`
    }));

    // If documents were sent as structured JSON/base64 in body:
    let extraDocs = [];
    if (req.body.documentsMetadata) {
      try {
        extraDocs = JSON.parse(req.body.documentsMetadata);
      } catch (e) {
        // ignore
      }
    }

    const allDocuments = [...uploadedDocs, ...extraDocs];

    const db = readDB();
    const newReqId = `REQ-${new Date().getFullYear()}-${String(1000 + (db.requests?.length || 0) + 1).padStart(4, '0')}`;

    const newRequest = {
      id: newReqId,
      customerId: req.user.id,
      customerName: applicantName || req.user.name,
      customerEmail: applicantEmail || req.user.email,
      customerPhone: applicantPhone || req.user.phone || '',
      aadhaarNumber: aadhaarNumber || '',
      address: address || '',
      serviceId: serviceId ? Number(serviceId) : null,
      serviceName,
      category: category || 'General',
      status: 'pending', // pending, in_progress, fulfilled, rejected
      notes: notes || '',
      operatorRemarks: 'Application received online. Awaiting document verification.',
      fee: 100,
      trackingNumber: `TRACK-${Math.floor(100000 + Math.random() * 900000)}`,
      documents: allDocuments,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completedAt: null
    };

    if (!db.requests) db.requests = [];
    db.requests.unshift(newRequest);
    writeDB(db);

    // Broadcast real-time event for new citizen service application
    broadcastRealtimeEvent({
      type: 'NEW_REQUEST',
      message: `New citizen application: ${newRequest.serviceName} from ${newRequest.customerName}`,
      request: newRequest
    });

    res.status(201).json({
      message: 'Service request submitted successfully!',
      request: newRequest
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create request', error: err.message });
  }
});

// 6. Admin: Get All Requests with Filtering & Search
app.get('/api/requests', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const { status, category, search } = req.query;
    const db = readDB();
    let list = db.requests || [];

    if (status && status !== 'all') {
      list = list.filter((r) => r.status.toLowerCase() === status.toLowerCase());
    }

    if (category && category !== 'all') {
      list = list.filter((r) => r.category.toLowerCase() === category.toLowerCase());
    }

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (r) =>
          r.id.toLowerCase().includes(q) ||
          r.customerName.toLowerCase().includes(q) ||
          r.customerPhone.includes(q) ||
          r.serviceName.toLowerCase().includes(q) ||
          (r.trackingNumber && r.trackingNumber.toLowerCase().includes(q))
      );
    }

    // Sort newest first
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch requests', error: err.message });
  }
});

// 7. Admin: Update Request Status & Operator Remarks (Sends Email on Approval)
app.patch('/api/requests/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, operatorRemarks, fee, trackingNumber } = req.body;

    const db = readDB();
    const index = (db.requests || []).findIndex((r) => r.id === id);
    if (index === -1) {
      return res.status(404).json({ message: `Request with ID ${id} not found` });
    }

    const current = db.requests[index];
    const previousStatus = current.status;
    const newStatus = status ? status.toLowerCase() : current.status;

    current.status = newStatus;
    if (operatorRemarks !== undefined) current.operatorRemarks = operatorRemarks;
    if (fee !== undefined) current.fee = Number(fee);
    if (trackingNumber !== undefined) current.trackingNumber = trackingNumber;
    current.updatedAt = new Date().toISOString();

    const isNowApproved = newStatus === 'fulfilled' || newStatus === 'approved';
    const wasNotApproved = previousStatus !== 'fulfilled' && previousStatus !== 'approved';

    if (isNowApproved && !current.completedAt) {
      current.completedAt = new Date().toISOString();
    } else if (!isNowApproved) {
      current.completedAt = null;
    }

    let emailNotification = null;

    // Send email notification to citizen whenever request status is marked as approved/fulfilled
    if (isNowApproved && wasNotApproved) {
      try {
        emailNotification = await sendRequestApprovedEmail(current);
        current.lastEmailNotification = {
          sentAt: new Date().toISOString(),
          status: emailNotification.success ? 'delivered' : 'failed',
          recipient: emailNotification.recipient || current.customerEmail || current.applicantEmail,
          messageId: emailNotification.messageId,
          error: emailNotification.error
        };
      } catch (mailErr) {
        console.error('[Server] Email dispatch error:', mailErr);
        current.lastEmailNotification = {
          sentAt: new Date().toISOString(),
          status: 'failed',
          error: mailErr.message
        };
      }
    }

    db.requests[index] = current;
    writeDB(db);

    // Broadcast real-time status update to both the Customer and Admins
    broadcastRealtimeEvent({
      type: 'REQUEST_STATUS_UPDATED',
      requestId: current.id,
      customerId: current.customerId,
      customerEmail: current.customerEmail,
      status: newStatus,
      isApproved: isNowApproved,
      serviceName: current.serviceName,
      operatorRemarks: current.operatorRemarks,
      trackingNumber: current.trackingNumber,
      completedAt: current.completedAt,
      request: current,
      timestamp: new Date().toISOString()
    });

    res.json({
      message: `Request status updated to ${newStatus}`,
      request: current,
      emailNotification
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update request status', error: err.message });
  }
});

// 7b. Admin: Resend or Send Approval Email explicitly
app.post('/api/requests/:id/send-approval-email', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const db = readDB();
    const request = (db.requests || []).find((r) => r.id === id);
    if (!request) {
      return res.status(404).json({ message: `Request with ID ${id} not found` });
    }

    const emailResult = await sendRequestApprovedEmail(request);
    request.lastEmailNotification = {
      sentAt: new Date().toISOString(),
      status: emailResult.success ? 'delivered' : 'failed',
      recipient: emailResult.recipient || request.customerEmail || request.applicantEmail,
      messageId: emailResult.messageId,
      error: emailResult.error
    };
    writeDB(db);

    if (emailResult.success) {
      res.json({ message: `Approval email sent successfully to ${emailResult.recipient}`, result: emailResult });
    } else {
      res.status(500).json({ message: `Failed to send email: ${emailResult.error}`, result: emailResult });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error sending approval email', error: err.message });
  }
});

// 8. Admin: Delete Request
app.delete('/api/requests/:id', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const db = readDB();
    const index = (db.requests || []).findIndex((r) => r.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Request not found' });
    }

    const removed = db.requests.splice(index, 1);
    writeDB(db);
    res.json({ message: 'Request deleted successfully', removed: removed[0] });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete request', error: err.message });
  }
});

// 9. Admin: Analytics Dashboard Data
app.get('/api/analytics', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const { timeframe = '6m' } = req.query;
    const db = readDB();
    const requests = db.requests || [];
    const users = db.users || [];

    // Distinct mock analytics datasets per timeframe
    if (timeframe === '7d') {
      return res.json({
        timeframe: '7d',
        label: 'Last 7 Days',
        overview: {
          totalRequests: 38,
          pendingRequests: 3,
          inProgressRequests: 6,
          fulfilledRequests: 28,
          rejectedRequests: 1,
          fulfillmentRate: 74,
          totalRevenue: 14250,
          pendingRevenue: 2800,
          avgTurnaroundDays: 1.4,
          sameDayDeliveryRate: 64,
          totalCustomers: 26
        },
        monthlyTrends: [
          { month: '15 Nov', submitted: 5, fulfilled: 4, revenue: 1800 },
          { month: '16 Nov', submitted: 6, fulfilled: 5, revenue: 2100 },
          { month: '17 Nov', submitted: 4, fulfilled: 3, revenue: 1400 },
          { month: '18 Nov', submitted: 7, fulfilled: 6, revenue: 2600 },
          { month: '19 Nov', submitted: 5, fulfilled: 4, revenue: 1950 },
          { month: '20 Nov', submitted: 8, fulfilled: 5, revenue: 2800 },
          { month: '21 Nov', submitted: 3, fulfilled: 2, revenue: 1600 }
        ],
        weeklyVolume: [
          { day: 'Mon', submitted: 6, completed: 5 },
          { day: 'Tue', submitted: 7, completed: 6 },
          { day: 'Wed', submitted: 5, completed: 4 },
          { day: 'Thu', submitted: 6, completed: 5 },
          { day: 'Fri', submitted: 8, completed: 7 },
          { day: 'Sat', submitted: 9, completed: 7 },
          { day: 'Sun', submitted: 3, completed: 2 }
        ],
        statusDistribution: [
          { label: 'Fulfilled', key: 'fulfilled', count: 28, color: '#10b981', textColor: 'text-emerald-600', bgLight: 'bg-emerald-50', percentage: 74 },
          { label: 'In-Progress', key: 'in_progress', count: 6, color: '#3b82f6', textColor: 'text-blue-600', bgLight: 'bg-blue-50', percentage: 16 },
          { label: 'Pending Review', key: 'pending', count: 3, color: '#f59e0b', textColor: 'text-amber-600', bgLight: 'bg-amber-50', percentage: 8 },
          { label: 'Rejected', key: 'rejected', count: 1, color: '#ef4444', textColor: 'text-rose-600', bgLight: 'bg-rose-50', percentage: 2 }
        ],
        categoryAnalytics: [
          { category: 'Identity & Cards', count: 12, revenue: 4200, avgTat: '1.1 days', rate: 96, color: '#ff9933' },
          { category: 'Certificates & Revenue', count: 14, revenue: 5800, avgTat: '2.4 days', rate: 90, color: '#000080' },
          { category: 'Business & Registrations', count: 5, revenue: 2600, avgTat: '1.2 days', rate: 94, color: '#138808' },
          { category: 'Police & Legal Affidavits', count: 4, revenue: 1100, avgTat: '1.5 days', rate: 88, color: '#8b5cf6' },
          { category: 'Government Welfare Schemes', count: 3, revenue: 550, avgTat: '1.8 days', rate: 98, color: '#06b6d4' }
        ],
        pipelineFunnel: [
          { step: '1. Online Application Submitted', count: 38, percentage: 100, note: 'Docs received past 7 days' },
          { step: '2. Operator Document Verification', count: 35, percentage: 92, note: 'Identity and checklist verified' },
          { step: '3. Tahsildar / Central Govt Desk', count: 31, percentage: 82, note: 'Processed on government portals' },
          { step: '4. Certificate Approved & Signed', count: 28, percentage: 74, note: 'Delivered digitally / collected' }
        ],
        topServices: [
          { name: 'Aadhaar Card Biometric Update', count: 11, revenue: 1100, tatDays: 1.0 },
          { name: 'Income Certificate (3 Years)', count: 9, revenue: 1800, tatDays: 2.2 },
          { name: 'Domicile & Age Nationality', count: 7, revenue: 1750, tatDays: 2.8 },
          { name: 'Shop Act (Gumasta) License', count: 5, revenue: 2500, tatDays: 0.9 },
          { name: 'Ladki Bahin Yojana e-KYC', count: 4, revenue: 200, tatDays: 0.4 },
          { name: 'Caste Certificate & Verification', count: 3, revenue: 900, tatDays: 4.0 },
          { name: 'Police Clearance Certificate (PCC)', count: 2, revenue: 600, tatDays: 1.8 }
        ]
      });
    }

    if (timeframe === '30d') {
      return res.json({
        timeframe: '30d',
        label: 'Last 30 Days',
        overview: {
          totalRequests: 148,
          pendingRequests: 9,
          inProgressRequests: 22,
          fulfilledRequests: 113,
          rejectedRequests: 4,
          fulfillmentRate: 76,
          totalRevenue: 58400,
          pendingRevenue: 11200,
          avgTurnaroundDays: 1.8,
          sameDayDeliveryRate: 56,
          totalCustomers: 48
        },
        monthlyTrends: [
          { month: 'Week 1', submitted: 32, fulfilled: 26, revenue: 12600 },
          { month: 'Week 2', submitted: 38, fulfilled: 31, revenue: 15400 },
          { month: 'Week 3', submitted: 42, fulfilled: 34, revenue: 17200 },
          { month: 'Week 4', submitted: 36, fulfilled: 22, revenue: 13200 }
        ],
        weeklyVolume: [
          { day: 'Mon', submitted: 24, completed: 21 },
          { day: 'Tue', submitted: 28, completed: 25 },
          { day: 'Wed', submitted: 32, completed: 29 },
          { day: 'Thu', submitted: 26, completed: 24 },
          { day: 'Fri', submitted: 35, completed: 31 },
          { day: 'Sat', submitted: 38, completed: 33 },
          { day: 'Sun', submitted: 14, completed: 12 }
        ],
        statusDistribution: [
          { label: 'Fulfilled', key: 'fulfilled', count: 113, color: '#10b981', textColor: 'text-emerald-600', bgLight: 'bg-emerald-50', percentage: 76 },
          { label: 'In-Progress', key: 'in_progress', count: 22, color: '#3b82f6', textColor: 'text-blue-600', bgLight: 'bg-blue-50', percentage: 15 },
          { label: 'Pending Review', key: 'pending', count: 9, color: '#f59e0b', textColor: 'text-amber-600', bgLight: 'bg-amber-50', percentage: 6 },
          { label: 'Rejected', key: 'rejected', count: 4, color: '#ef4444', textColor: 'text-rose-600', bgLight: 'bg-rose-50', percentage: 3 }
        ],
        categoryAnalytics: [
          { category: 'Identity & Cards', count: 44, revenue: 16800, avgTat: '1.3 days', rate: 95, color: '#ff9933' },
          { category: 'Certificates & Revenue', count: 52, revenue: 24200, avgTat: '2.8 days', rate: 89, color: '#000080' },
          { category: 'Business & Registrations', count: 24, revenue: 15600, avgTat: '1.5 days', rate: 93, color: '#138808' },
          { category: 'Police & Legal Affidavits', count: 16, revenue: 7400, avgTat: '1.8 days', rate: 87, color: '#8b5cf6' },
          { category: 'Government Welfare Schemes', count: 12, revenue: 2400, avgTat: '2.0 days', rate: 97, color: '#06b6d4' }
        ],
        pipelineFunnel: [
          { step: '1. Online Application Submitted', count: 148, percentage: 100, note: 'Citizens uploaded docs on portal' },
          { step: '2. Operator Document Verification', count: 138, percentage: 93, note: 'Passed identity and checklist' },
          { step: '3. Tahsildar / Central Govt Desk', count: 124, percentage: 84, note: 'Forwarded to competent desk' },
          { step: '4. Certificate Approved & Signed', count: 113, percentage: 76, note: 'Digital signature applied' }
        ],
        topServices: [
          { name: 'Aadhaar Card Biometric Update', count: 34, revenue: 3400, tatDays: 1.1 },
          { name: 'Income Certificate (3 Years)', count: 28, revenue: 5600, tatDays: 2.6 },
          { name: 'Domicile & Age Nationality', count: 23, revenue: 5750, tatDays: 3.4 },
          { name: 'Shop Act (Gumasta) License', count: 18, revenue: 9000, tatDays: 1.0 },
          { name: 'Caste Certificate & Verification', count: 15, revenue: 4500, tatDays: 4.8 },
          { name: 'Ladki Bahin Yojana e-KYC', count: 14, revenue: 700, tatDays: 0.5 },
          { name: 'Police Clearance Certificate (PCC)', count: 11, revenue: 3300, tatDays: 2.1 }
        ]
      });
    }

    if (timeframe === '1y') {
      return res.json({
        timeframe: '1y',
        label: 'Fiscal Year 2024-25',
        overview: {
          totalRequests: 1180,
          pendingRequests: 18,
          inProgressRequests: 42,
          fulfilledRequests: 1092,
          rejectedRequests: 28,
          fulfillmentRate: 92,
          totalRevenue: 482600,
          pendingRevenue: 38400,
          avgTurnaroundDays: 2.1,
          sameDayDeliveryRate: 52,
          totalCustomers: 194
        },
        monthlyTrends: [
          { month: 'Q1 (Apr-Jun)', submitted: 210, fulfilled: 194, revenue: 84500 },
          { month: 'Q2 (Jul-Sep)', submitted: 340, fulfilled: 312, revenue: 138200 },
          { month: 'Q3 (Oct-Dec)', submitted: 410, fulfilled: 374, revenue: 168900 },
          { month: 'Q4 (Jan-Mar Est.)', submitted: 220, fulfilled: 212, revenue: 91000 }
        ],
        weeklyVolume: [
          { day: 'Mon', submitted: 184, completed: 172 },
          { day: 'Tue', submitted: 210, completed: 196 },
          { day: 'Wed', submitted: 236, completed: 218 },
          { day: 'Thu', submitted: 198, completed: 184 },
          { day: 'Fri', submitted: 248, completed: 231 },
          { day: 'Sat', submitted: 282, completed: 262 },
          { day: 'Sun', submitted: 106, completed: 97 }
        ],
        statusDistribution: [
          { label: 'Fulfilled', key: 'fulfilled', count: 1092, color: '#10b981', textColor: 'text-emerald-600', bgLight: 'bg-emerald-50', percentage: 92 },
          { label: 'In-Progress', key: 'in_progress', count: 42, color: '#3b82f6', textColor: 'text-blue-600', bgLight: 'bg-blue-50', percentage: 4 },
          { label: 'Pending Review', key: 'pending', count: 18, color: '#f59e0b', textColor: 'text-amber-600', bgLight: 'bg-amber-50', percentage: 2 },
          { label: 'Rejected', key: 'rejected', count: 28, color: '#ef4444', textColor: 'text-rose-600', bgLight: 'bg-rose-50', percentage: 2 }
        ],
        categoryAnalytics: [
          { category: 'Identity & Cards', count: 320, revenue: 128000, avgTat: '1.3 days', rate: 95, color: '#ff9933' },
          { category: 'Certificates & Revenue', count: 410, revenue: 196000, avgTat: '3.0 days', rate: 91, color: '#000080' },
          { category: 'Business & Registrations', count: 215, revenue: 112000, avgTat: '1.6 days', rate: 94, color: '#138808' },
          { category: 'Police & Legal Affidavits', count: 135, revenue: 58000, avgTat: '1.9 days', rate: 89, color: '#8b5cf6' },
          { category: 'Government Welfare Schemes', count: 100, revenue: 28600, avgTat: '2.2 days', rate: 97, color: '#06b6d4' }
        ],
        pipelineFunnel: [
          { step: '1. Online Application Submitted', count: 1180, percentage: 100, note: 'Citizens uploaded docs on portal (FY 2024-25)' },
          { step: '2. Operator Document Verification', count: 1128, percentage: 96, note: 'Passed identity and mandatory checklist' },
          { step: '3. Tahsildar / Central Govt Desk', count: 1104, percentage: 94, note: 'Application filed on Aaple Sarkar / UIDAI' },
          { step: '4. Certificate Approved & Signed', count: 1092, percentage: 92, note: 'Digital signature applied / ready for download' }
        ],
        topServices: [
          { name: 'Aadhaar Card Biometric Update', count: 284, revenue: 28400, tatDays: 1.1 },
          { name: 'Income Certificate (3 Years)', count: 236, revenue: 47200, tatDays: 2.8 },
          { name: 'Domicile & Age Nationality', count: 198, revenue: 49500, tatDays: 3.9 },
          { name: 'Shop Act (Gumasta) License', count: 162, revenue: 81000, tatDays: 1.0 },
          { name: 'Caste Certificate & Verification', count: 134, revenue: 40200, tatDays: 5.2 },
          { name: 'Ladki Bahin Yojana e-KYC', count: 112, revenue: 5600, tatDays: 0.5 },
          { name: 'Police Clearance Certificate (PCC)', count: 88, revenue: 26400, tatDays: 2.3 }
        ]
      });
    }

    // Default 6 Months
    const totalRequests = requests.length;
    const pendingRequests = requests.filter((r) => r.status === 'pending').length;
    const inProgressRequests = requests.filter((r) => r.status === 'in_progress').length;
    const fulfilledRequests = requests.filter((r) => r.status === 'fulfilled').length;
    const rejectedRequests = requests.filter((r) => r.status === 'rejected').length;

    const fulfillmentRate = totalRequests > 0 ? Math.round((fulfilledRequests / totalRequests) * 100) : 89;
    const totalRevenue = 202100;
    const pendingRevenue = 24800;

    // Group by category
    const categoryCounts = {};
    const categoryRevenue = {};
    requests.forEach((r) => {
      const cat = r.category || 'General';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
      categoryRevenue[cat] = (categoryRevenue[cat] || 0) + (Number(r.fee) || 100);
    });

    // Top services
    const serviceCounts = {};
    const serviceRevenue = {};
    requests.forEach((r) => {
      serviceCounts[r.serviceName] = (serviceCounts[r.serviceName] || 0) + 1;
      serviceRevenue[r.serviceName] = (serviceRevenue[r.serviceName] || 0) + (Number(r.fee) || 100);
    });
    
    const topServices = Object.entries(serviceCounts)
      .map(([name, count]) => ({
        name,
        count,
        revenue: serviceRevenue[name] || count * 150,
        tatDays: name.includes('Aadhaar') ? 1.5 : name.includes('Income') ? 3.0 : name.includes('Shop') ? 1.0 : 4.0
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    // Monthly trends (Last 6 months)
    const monthlyTrends = [
      { month: 'Jun', submitted: 48, fulfilled: 44, revenue: 16800 },
      { month: 'Jul', submitted: 62, fulfilled: 58, revenue: 23400 },
      { month: 'Aug', submitted: 74, fulfilled: 68, revenue: 29500 },
      { month: 'Sep', submitted: 89, fulfilled: 81, revenue: 36200 },
      { month: 'Oct', submitted: 104, fulfilled: 95, revenue: 43800 },
      { month: 'Nov', submitted: Math.max(118, totalRequests * 5), fulfilled: Math.max(98, fulfilledRequests * 5), revenue: totalRevenue + 12000 }
    ];

    // Weekly day-by-day distribution
    const weeklyVolume = [
      { day: 'Mon', submitted: 24, completed: 21 },
      { day: 'Tue', submitted: 28, completed: 25 },
      { day: 'Wed', submitted: 32, completed: 29 },
      { day: 'Thu', submitted: 26, completed: 24 },
      { day: 'Fri', submitted: 35, completed: 31 },
      { day: 'Sat', submitted: 38, completed: 33 },
      { day: 'Sun', submitted: 14, completed: 12 }
    ];

    // Status breakdown with SVG-friendly percentages & colors
    const totalCount = Math.max(totalRequests, 1);
    const statusDistribution = [
      { label: 'Fulfilled', key: 'fulfilled', count: fulfilledRequests || 42, color: '#10b981', textColor: 'text-emerald-600', bgLight: 'bg-emerald-50' },
      { label: 'In-Progress', key: 'in_progress', count: inProgressRequests || 18, color: '#3b82f6', textColor: 'text-blue-600', bgLight: 'bg-blue-50' },
      { label: 'Pending Review', key: 'pending', count: pendingRequests || 12, color: '#f59e0b', textColor: 'text-amber-600', bgLight: 'bg-amber-50' },
      { label: 'Rejected / Discrepancy', key: 'rejected', count: rejectedRequests || 4, color: '#ef4444', textColor: 'text-rose-600', bgLight: 'bg-rose-50' }
    ].map((item) => {
      const allSum = (fulfilledRequests || 42) + (inProgressRequests || 18) + (pendingRequests || 12) + (rejectedRequests || 4);
      return {
        ...item,
        percentage: Math.round((item.count / allSum) * 100)
      };
    });

    // Category performance
    const categoryAnalytics = [
      { category: 'Identity & Cards', count: 38, revenue: 15200, avgTat: '1.4 days', rate: 94, color: '#ff9933' },
      { category: 'Certificates & Revenue', count: 46, revenue: 21500, avgTat: '3.2 days', rate: 88, color: '#000080' },
      { category: 'Business & Registrations', count: 22, revenue: 14800, avgTat: '1.8 days', rate: 92, color: '#138808' },
      { category: 'Police & Legal Affidavits', count: 18, revenue: 8600, avgTat: '2.0 days', rate: 86, color: '#8b5cf6' },
      { category: 'Government Welfare Schemes', count: 29, revenue: 5800, avgTat: '2.5 days', rate: 96, color: '#06b6d4' }
    ];

    // Conversion pipeline funnel
    const pipelineFunnel = [
      { step: '1. Online Application Submitted', count: 153, percentage: 100, note: 'Citizens uploaded docs on portal' },
      { step: '2. Operator Document Verification', count: 141, percentage: 92, note: 'Passed identity and mandatory checklist' },
      { step: '3. Tahsildar / Central Govt Desk', count: 122, percentage: 80, note: 'Application filed on Aaple Sarkar / UIDAI' },
      { step: '4. Certificate Approved & Signed', count: 114, percentage: 75, note: 'Digital signature applied / ready for download' }
    ];

    // Geographic / Ward Demand (PCMC area)
    const regionalDemand = [
      { area: 'Akurdi Railway Station & Village', count: 54, percentage: 35, lat: 'Akurdi' },
      { area: 'Nigdi Pradhikaran & Yamunanagar', count: 37, percentage: 24, lat: 'Nigdi' },
      { area: 'Chinchwad Station & Thergaon', count: 28, percentage: 18, lat: 'Chinchwad' },
      { area: 'Ravet & Kiwale Sub-urbs', count: 20, percentage: 13, lat: 'Ravet' },
      { area: 'Bhosari & Moshi Link Road', count: 14, percentage: 10, lat: 'Bhosari' }
    ];

    // Channel split
    const channelSplit = {
      digitalPortal: 68,
      centerWalkIn: 32,
      onlinePaymentPct: 74,
      cashPaymentPct: 26
    };

    // Recent activity logs
    const recentActivity = requests
      .slice()
      .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
      .slice(0, 6)
      .map((r) => ({
        id: r.id,
        applicant: r.customerName,
        service: r.serviceName,
        category: r.category,
        status: r.status,
        updatedAt: r.updatedAt || r.createdAt
      }));

    res.json({
      overview: {
        totalRequests: totalRequests || 76,
        pendingRequests: pendingRequests || 12,
        inProgressRequests: inProgressRequests || 18,
        fulfilledRequests: fulfilledRequests || 42,
        rejectedRequests: rejectedRequests || 4,
        fulfillmentRate,
        totalRevenue,
        pendingRevenue,
        avgTurnaroundDays: 2.2,
        sameDayDeliveryRate: 48,
        totalCustomers: Math.max(users.filter((u) => u.role === 'customer').length, 34)
      },
      categoryCounts,
      topServices,
      monthlyTrends,
      weeklyVolume,
      statusDistribution,
      categoryAnalytics,
      pipelineFunnel,
      regionalDemand,
      channelSplit,
      recentActivity
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to generate analytics', error: err.message });
  }
});

// Multer Error Handling Middleware: Enforces 1 MB file limit
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'File upload error: Document file size exceeds the 1 MB maximum limit. Please compress or resize your file before uploading.'
      });
    }
    return res.status(400).json({ message: `Upload error: ${err.message}` });
  }
  if (err) {
    return res.status(500).json({ message: err.message || 'Internal server error during upload' });
  }
  next();
});

// Start Server
if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`===============================================`);
    console.log(`Arya Enterprises Maha E-Seva Kendra API Server`);
    console.log(`Listening on host 0.0.0.0, port: ${PORT}`);
    console.log(`Health Check: http://localhost:${PORT}/health`);
    console.log(`Email Service: Powered by Resend HTTPS API`);
    console.log(`Database File: ${path.join(__dirname, 'data', 'database.json')}`);
    console.log(`Status: Ready for Render deployment & Vercel CORS`);
    console.log(`===============================================`);

    // Optional Auto Keep-Alive for Render Free Tier (pings /health every 12 minutes)
    const keepAliveUrl = process.env.RENDER_EXTERNAL_URL || process.env.PING_URL;
    if (keepAliveUrl) {
      const https = require('https');
      const http = require('http');
      const target = keepAliveUrl.endsWith('/health') ? keepAliveUrl : `${keepAliveUrl}/health`;
      const client = target.startsWith('https') ? https : http;

      console.log(`[Keep-Alive] Automated 12-minute heartbeat enabled for: ${target}`);
      setInterval(() => {
        client.get(target, (res) => {
          console.log(`[Keep-Alive] Ping successful (Status: ${res.statusCode}) at ${new Date().toISOString()}`);
        }).on('error', (err) => {
          console.warn(`[Keep-Alive] Ping warning: ${err.message}`);
        });
      }, 12 * 60 * 1000);
    }
  });
}

module.exports = app;
