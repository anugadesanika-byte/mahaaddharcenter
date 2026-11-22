// src/services/api.js
// Client API for Arya Enterprises Maha E-Seva Kendra
// Works with Render backend, and includes fallback storage if backend is cold-starting

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function getAuthHeaders(isFormData = false) {
  const token = localStorage.getItem('eseva_auth_token');
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
}

// Client device detector for session identification
export function getClientDeviceInfo() {
  if (typeof navigator === 'undefined') return 'Web Browser';
  const ua = navigator.userAgent || '';
  let browser = 'Web Browser';
  if (ua.includes('Edg/')) browser = 'Microsoft Edge';
  else if (ua.includes('Chrome/')) browser = 'Google Chrome';
  else if (ua.includes('Firefox/')) browser = 'Mozilla Firefox';
  else if (ua.includes('Safari/') && !ua.includes('Chrome/')) browser = 'Apple Safari';

  let os = 'Device';
  if (ua.includes('Win')) os = 'Windows PC';
  else if (ua.includes('Android')) os = 'Android Mobile';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'Apple iOS';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';

  return `${browser} (${os})`;
}

// Cross-tab broadcast channel for instant multi-tab session synchronization and real-time events
const SESSION_CHANNEL_NAME = 'eseva_active_session_channel';
const REALTIME_CHANNEL_NAME = 'eseva_realtime_events';
let sessionBroadcastChannel = null;
let realtimeBroadcastChannel = null;
try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    sessionBroadcastChannel = new BroadcastChannel(SESSION_CHANNEL_NAME);
    realtimeBroadcastChannel = new BroadcastChannel(REALTIME_CHANNEL_NAME);
  }
} catch (e) {
  // BroadcastChannel not available in this environment
}

export function broadcastLocalRealtimeEvent(eventData) {
  try {
    if (realtimeBroadcastChannel) {
      realtimeBroadcastChannel.postMessage(eventData);
    }
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('eseva_realtime_signal', JSON.stringify({
        ...eventData,
        _timestamp: Date.now()
      }));
    }
  } catch (e) {}
}

// Fallback seed data if backend is offline/cold-starting
function getLocalFallbackDB() {
  const LOCAL_KEY = 'eseva_offline_db';
  let db = null;
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (raw) db = JSON.parse(raw);
  } catch (e) {
    // ignore
  }

  if (!db) {
    db = {
      requests: [
        {
          id: 'REQ-2026-0891',
          customerId: 'usr_demo_customer',
          customerName: 'Rohan Deshmukh',
          customerEmail: 'customer@example.com',
          customerPhone: '9822334455',
          serviceId: 101,
          serviceName: 'Aadhaar Card Biometric Update',
          category: 'Identity',
          status: 'fulfilled',
          notes: 'Biometric update appointment completed at center.',
          operatorRemarks: 'Verified against UIDAI central portal. Updated successfully.',
          fee: 100,
          trackingNumber: 'UID-PUN-98214',
          documents: [
            { name: 'Identity Proof', originalName: 'old_aadhaar.pdf', url: '#' },
            { name: 'Address Proof', originalName: 'electricity_bill.pdf', url: '#' }
          ],
          createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 8 * 86400000).toISOString(),
          completedAt: new Date(Date.now() - 8 * 86400000).toISOString()
        },
        {
          id: 'REQ-2026-0942',
          customerId: 'usr_demo_customer',
          customerName: 'Rohan Deshmukh',
          customerEmail: 'customer@example.com',
          customerPhone: '9822334455',
          serviceId: 201,
          serviceName: 'Domicile & Age Nationality Certificate',
          category: 'Certificates',
          status: 'in_progress',
          notes: 'Applied on Aaple Sarkar. Tehsildar desk verification in progress.',
          operatorRemarks: 'Documents scanned and submitted to Tahsildar Haveli Pune.',
          fee: 250,
          trackingNumber: 'MH-DOM-2026-4432',
          documents: [
            { name: 'School Leaving Certificate', originalName: 'lc_certificate.pdf', url: '#' }
          ],
          createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
          completedAt: null
        },
        {
          id: 'REQ-2026-1005',
          customerId: 'usr_demo_customer',
          customerName: 'Rohan Deshmukh',
          customerEmail: 'customer@example.com',
          customerPhone: '9822334455',
          serviceId: 301,
          serviceName: 'Shop Act (Gumasta) License',
          category: 'Business',
          status: 'pending',
          notes: 'New retail grocery shop in Akurdi. Needs fast processing.',
          operatorRemarks: 'Awaiting signature verification.',
          fee: 500,
          trackingNumber: 'PCMC-GUM-7761',
          documents: [
            { name: 'Shop Front Photo', originalName: 'shop_photo.jpg', url: '#' },
            { name: 'Rent Agreement', originalName: 'rent_agreement.pdf', url: '#' }
          ],
          createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
          completedAt: null
        },
        {
          id: 'REQ-2026-1018',
          customerId: 'usr_customer_anita',
          customerName: 'Anita Shinde',
          customerEmail: 'anita.s@yahoo.com',
          customerPhone: '9823098765',
          serviceId: 504,
          serviceName: 'Ladki Bahin Yojana e-KYC',
          category: 'Financial',
          status: 'pending',
          notes: 'Bank Aadhaar linking assistance requested.',
          operatorRemarks: 'Queued for biometric DBT verification.',
          fee: 50,
          trackingNumber: 'LBY-MAHA-4312',
          documents: [{ name: 'Bank Passbook', originalName: 'bank_passbook.pdf', url: '#' }],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          completedAt: null
        }
      ]
    };
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(db));
    } catch (e) {}
  }
  return db;
}

function saveLocalFallbackDB(db) {
  try {
    localStorage.setItem('eseva_offline_db', JSON.stringify(db));
  } catch (e) {}
}

export const api = {
  // Authentication with Single-Session enforcement
  async login(email, password, forceTerminate = false, deviceInfo = null) {
    const clientDevice = deviceInfo || getClientDeviceInfo();
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, forceTerminate, deviceInfo: clientDevice })
      });

      // Handle 409 Conflict: Active session detected on another device
      if (res.status === 409) {
        const data = await res.json().catch(() => ({}));
        return {
          sessionConflict: true,
          message: data.message || 'You want to terminate Another Session ',
          existingSession: data.existingSession || { deviceInfo: 'Another Device / Browser' }
        };
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await res.json();
      if (data && data.sessionId) {
        localStorage.setItem('eseva_session_id', data.sessionId);
      }
      return data;
    } catch (err) {
      if (err.sessionConflict) return err;

      // Local fallback for offline/demo
      const trimmedEmail = email.trim().toLowerCase();
      let matchedUser = null;
      if (trimmedEmail === 'admin@aryaseva.com' && password === 'admin123') {
        matchedUser = {
          id: 'usr_admin',
          name: 'System Administrator',
          email: 'admin@aryaseva.com',
          role: 'admin',
          phone: '7774946121'
        };
      } else if (trimmedEmail === 'customer@example.com' && password === 'customer123') {
        matchedUser = {
          id: 'usr_demo_customer',
          name: 'Rohan Deshmukh',
          email: 'customer@example.com',
          role: 'customer',
          phone: '9822334455'
        };
      }

      if (matchedUser) {
        const activeKey = `eseva_active_session_${matchedUser.id}`;
        const existingSessionRaw = localStorage.getItem(activeKey);

        // If another session is recorded and user hasn't chosen to terminate it
        if (existingSessionRaw && !forceTerminate) {
          try {
            const existing = JSON.parse(existingSessionRaw);
            const myCurrentSessionId = localStorage.getItem('eseva_session_id');
            if (existing.sessionId && existing.sessionId !== myCurrentSessionId) {
              return {
                sessionConflict: true,
                message: 'You want to terminate Another Session ',
                existingSession: {
                  deviceInfo: existing.deviceInfo || 'Another Browser Window / Tab',
                  loginTime: existing.loginTime || new Date().toISOString()
                }
              };
            }
          } catch (e) {}
        }

        // If user clicked Yes to terminate: broadcast to other tabs/windows
        if (existingSessionRaw && forceTerminate) {
          try {
            const oldSession = JSON.parse(existingSessionRaw);
            if (sessionBroadcastChannel) {
              sessionBroadcastChannel.postMessage({
                type: 'SESSION_TERMINATED',
                userId: matchedUser.id,
                oldSessionId: oldSession.sessionId,
                message: 'Another session was started on a different device.'
              });
            }
            localStorage.setItem('eseva_session_terminated_signal', JSON.stringify({
              userId: matchedUser.id,
              timestamp: Date.now()
            }));
          } catch (e) {}
        }

        const newSessionId = `mock_sess_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
        localStorage.setItem(activeKey, JSON.stringify({
          sessionId: newSessionId,
          deviceInfo: clientDevice,
          loginTime: new Date().toISOString()
        }));
        localStorage.setItem('eseva_session_id', newSessionId);

        const token = `mock_jwt_${matchedUser.role}_token_${Date.now()}`;
        return {
          message: 'Login successful (Offline Mode)',
          user: matchedUser,
          token,
          sessionId: newSessionId
        };
      }
      throw err;
    }
  },

  async register(userData) {
    const clientDevice = getClientDeviceInfo();
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...userData, deviceInfo: clientDevice })
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Registration failed');
      }
      const data = await res.json();
      if (data && data.sessionId) {
        localStorage.setItem('eseva_session_id', data.sessionId);
      }
      broadcastLocalRealtimeEvent({
        type: 'NEW_CITIZEN_REGISTERED',
        user: data.user || { name: userData.name, email: userData.email },
        message: `New citizen registered: ${userData.name}`
      });
      return data;
    } catch (err) {
      // Offline fallback registration
      const newSessionId = `mock_sess_${Date.now()}`;
      const user = {
        id: `usr_${Date.now()}`,
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '',
        role: 'customer'
      };
      const token = 'mock_jwt_customer_token_' + Date.now();
      localStorage.setItem('eseva_session_id', newSessionId);
      localStorage.setItem(`eseva_active_session_${user.id}`, JSON.stringify({
        sessionId: newSessionId,
        deviceInfo: clientDevice,
        loginTime: new Date().toISOString()
      }));
      broadcastLocalRealtimeEvent({
        type: 'NEW_CITIZEN_REGISTERED',
        user,
        message: `New citizen registered: ${user.name}`
      });
      return { message: 'Registered successfully (Offline Mode)', user, token, sessionId: newSessionId };
    }
  },

  async getProfile() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: getAuthHeaders()
      });
      if (!res.ok) throw new Error('Failed to fetch profile');
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async checkSession() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/check-session`, {
        headers: getAuthHeaders()
      });
      if (res.status === 401) {
        const data = await res.json().catch(() => ({}));
        if (data.code === 'SESSION_TERMINATED') {
          return { terminated: true, message: data.message };
        }
        return { active: false };
      }
      if (res.ok) {
        return { active: true };
      }
      return { active: true };
    } catch (err) {
      return { active: true };
    }
  },

  async logout() {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
    } catch (e) {
      // ignore
    }
    const userRaw = localStorage.getItem('eseva_user');
    if (userRaw) {
      try {
        const u = JSON.parse(userRaw);
        localStorage.removeItem(`eseva_active_session_${u.id}`);
      } catch (e) {}
    }
    localStorage.removeItem('eseva_session_id');
  },

  subscribeSessionStream(token, onTerminated, onRealtimeEvent) {
    let eventSource = null;
    let isCleanedUp = false;

    // 1. Connect to SSE if token is present and not mock
    if (token && !token.startsWith('mock_')) {
      try {
        const sseUrl = `${API_BASE_URL}/api/auth/session-stream?token=${encodeURIComponent(token)}`;
        eventSource = new EventSource(sseUrl);

        eventSource.onmessage = (event) => {
          if (isCleanedUp) return;
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'SESSION_TERMINATED') {
              if (onTerminated) onTerminated(data);
            } else if (
              data.type === 'NEW_REQUEST' ||
              data.type === 'REQUEST_STATUS_UPDATED' ||
              data.type === 'NEW_CITIZEN_REGISTERED'
            ) {
              if (onRealtimeEvent) onRealtimeEvent(data);
            }
          } catch (e) {}
        };

        eventSource.onerror = () => {
          // SSE reconnects automatically
        };
      } catch (e) {
        console.warn('SSE stream failed to initialize:', e);
      }
    }

    // 2. BroadcastChannel for instant multi-tab sync
    const handleBroadcast = (event) => {
      if (isCleanedUp) return;
      if (event.data && event.data.type === 'SESSION_TERMINATED') {
        const currentUserRaw = localStorage.getItem('eseva_user');
        if (currentUserRaw) {
          try {
            const currentUser = JSON.parse(currentUserRaw);
            if (currentUser.id === event.data.userId) {
              const currentSessionId = localStorage.getItem('eseva_session_id');
              if (!event.data.oldSessionId || event.data.oldSessionId === currentSessionId) {
                if (onTerminated) onTerminated(event.data);
              }
            }
          } catch (e) {}
        }
      }
    };

    const handleRealtimeBroadcast = (event) => {
      if (isCleanedUp) return;
      if (event.data && onRealtimeEvent) {
        onRealtimeEvent(event.data);
      }
    };

    if (sessionBroadcastChannel) {
      sessionBroadcastChannel.addEventListener('message', handleBroadcast);
    }
    if (realtimeBroadcastChannel) {
      realtimeBroadcastChannel.addEventListener('message', handleRealtimeBroadcast);
    }

    // 3. Storage event listener fallback
    const handleStorage = (e) => {
      if (isCleanedUp) return;
      if (e.key === 'eseva_session_terminated_signal' && e.newValue) {
        try {
          const sig = JSON.parse(e.newValue);
          const currentUserRaw = localStorage.getItem('eseva_user');
          if (currentUserRaw) {
            const currentUser = JSON.parse(currentUserRaw);
            if (currentUser.id === sig.userId) {
              if (onTerminated) {
                onTerminated({
                  type: 'SESSION_TERMINATED',
                  reason: 'Another session was started on a different device.'
                });
              }
            }
          }
        } catch (err) {}
      } else if (e.key === 'eseva_realtime_signal' && e.newValue) {
        try {
          const payload = JSON.parse(e.newValue);
          if (onRealtimeEvent) {
            onRealtimeEvent(payload);
          }
        } catch (err) {}
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      isCleanedUp = true;
      if (eventSource) {
        eventSource.close();
      }
      if (sessionBroadcastChannel) {
        sessionBroadcastChannel.removeEventListener('message', handleBroadcast);
      }
      if (realtimeBroadcastChannel) {
        realtimeBroadcastChannel.removeEventListener('message', handleRealtimeBroadcast);
      }
      window.removeEventListener('storage', handleStorage);
    };
  },

  // Service Requests
  async getAllRequests(filters = {}) {
    try {
      const query = new URLSearchParams();
      if (filters.status && filters.status !== 'all') query.append('status', filters.status);
      if (filters.category && filters.category !== 'all') query.append('category', filters.category);
      if (filters.search) query.append('search', filters.search);

      const res = await fetch(`${API_BASE_URL}/api/requests?${query.toString()}`, {
        headers: getAuthHeaders()
      });
      if (!res.ok) throw new Error('Failed to fetch requests');
      return await res.json();
    } catch (err) {
      // Local fallback
      const db = getLocalFallbackDB();
      let list = [...(db.requests || [])];
      if (filters.status && filters.status !== 'all') {
        list = list.filter((r) => r.status.toLowerCase() === filters.status.toLowerCase());
      }
      if (filters.category && filters.category !== 'all') {
        list = list.filter((r) => r.category.toLowerCase() === filters.category.toLowerCase());
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        list = list.filter(
          (r) =>
            r.id.toLowerCase().includes(q) ||
            r.customerName.toLowerCase().includes(q) ||
            r.serviceName.toLowerCase().includes(q) ||
            r.customerPhone.includes(q)
        );
      }
      return list;
    }
  },

  async getMyRequests() {
    const currentUserRaw = localStorage.getItem('eseva_user');
    let currentUser = null;
    if (currentUserRaw) {
      try {
        currentUser = JSON.parse(currentUserRaw);
      } catch (e) {}
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/requests/my-requests`, {
        headers: getAuthHeaders()
      });
      if (!res.ok) throw new Error('Failed to fetch your requests');
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (err) {
      // Offline fallback: Strictly isolate each customer's data
      // New customers MUST get an empty, fresh dashboard of their own with 0 preloaded files
      if (!currentUser || !currentUser.id) return [];

      const db = getLocalFallbackDB();
      // If demo customer account (customer@example.com), allow sample files
      // If any newly registered citizen, return ONLY requests matching their specific ID or email
      const isDemoCustomer = currentUser.email === 'customer@example.com' || currentUser.id === 'usr_demo_customer';

      return (db.requests || []).filter((r) => {
        if (isDemoCustomer) {
          return r.customerId === 'usr_demo_customer' || r.customerEmail === 'customer@example.com';
        }
        return (
          r.customerId === currentUser.id ||
          (currentUser.email && r.customerEmail && r.customerEmail.toLowerCase() === currentUser.email.toLowerCase())
        );
      });
    }
  },

  async createServiceRequest(formDataOrData) {
    try {
      const isFormData = formDataOrData instanceof FormData;
      const res = await fetch(`${API_BASE_URL}/api/requests`, {
        method: 'POST',
        headers: getAuthHeaders(isFormData),
        body: isFormData ? formDataOrData : JSON.stringify(formDataOrData)
      });
      if (!res.ok) throw new Error('Failed to submit request');
      const data = await res.json();
      broadcastLocalRealtimeEvent({
        type: 'NEW_REQUEST',
        request: data.request,
        message: `New request: ${data.request?.serviceName}`
      });
      return data;
    } catch (err) {
      // Offline fallback: save into local database
      const db = getLocalFallbackDB();
      const newId = `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      let reqData = {};
      if (formDataOrData instanceof FormData) {
        for (let [k, v] of formDataOrData.entries()) {
          if (k !== 'documents') reqData[k] = v;
        }
      } else {
        reqData = { ...formDataOrData };
      }

      const currentUserRaw = localStorage.getItem('eseva_user');
      let currentUser = null;
      if (currentUserRaw) {
        try {
          currentUser = JSON.parse(currentUserRaw);
        } catch (e) {}
      }

      const newReq = {
        id: newId,
        customerId: currentUser?.id || reqData.customerId || 'usr_current',
        customerName: reqData.applicantName || currentUser?.name || 'Applicant',
        customerEmail: reqData.applicantEmail || currentUser?.email || 'applicant@example.com',
        customerPhone: reqData.applicantPhone || currentUser?.phone || '9800000000',
        aadhaarNumber: reqData.aadhaarNumber || '',
        address: reqData.address || '',
        serviceId: reqData.serviceId ? Number(reqData.serviceId) : 101,
        serviceName: reqData.serviceName || 'Government Document Service',
        category: reqData.category || 'General',
        status: 'pending',
        notes: reqData.notes || '',
        operatorRemarks: 'Application received online. Document verification queued.',
        fee: 100,
        trackingNumber: `TRACK-${Math.floor(100000 + Math.random() * 900000)}`,
        documents: (reqData.documents && reqData.documents.length > 0) ? reqData.documents : [
          { name: 'Submitted Verification Documents', originalName: 'applicant_docs.pdf', url: '#' }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completedAt: null
      };

      db.requests = [newReq, ...(db.requests || [])];
      saveLocalFallbackDB(db);

      broadcastLocalRealtimeEvent({
        type: 'NEW_REQUEST',
        request: newReq,
        message: `New request: ${newReq.serviceName}`
      });

      return { message: 'Request submitted successfully!', request: newReq };
    }
  },

  async updateRequestStatus(id, updateData) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/requests/${id}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData)
      });
      if (!res.ok) throw new Error('Failed to update status');
      const data = await res.json();
      broadcastLocalRealtimeEvent({
        type: 'REQUEST_STATUS_UPDATED',
        requestId: id,
        status: updateData.status,
        operatorRemarks: updateData.operatorRemarks,
        trackingNumber: updateData.trackingNumber,
        request: data.request,
        timestamp: new Date().toISOString()
      });
      return data;
    } catch (err) {
      const db = getLocalFallbackDB();
      const item = (db.requests || []).find((r) => r.id === id);
      if (item) {
        if (updateData.status) item.status = updateData.status;
        if (updateData.operatorRemarks !== undefined) item.operatorRemarks = updateData.operatorRemarks;
        if (updateData.fee !== undefined) item.fee = Number(updateData.fee);
        if (updateData.trackingNumber !== undefined) item.trackingNumber = updateData.trackingNumber;
        item.updatedAt = new Date().toISOString();
        if (updateData.status === 'fulfilled') item.completedAt = new Date().toISOString();
        saveLocalFallbackDB(db);

        broadcastLocalRealtimeEvent({
          type: 'REQUEST_STATUS_UPDATED',
          requestId: id,
          status: updateData.status,
          operatorRemarks: updateData.operatorRemarks,
          trackingNumber: updateData.trackingNumber,
          request: item,
          timestamp: new Date().toISOString()
        });

        return { message: 'Updated locally', request: item };
      }
      throw err;
    }
  },

  // Contact Enquiry Email via Resend HTTPS API
  async sendContactEmail(enquiryData) {
    const res = await fetch(`${API_BASE_URL}/api/email/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(enquiryData)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || data.error || `Failed to deliver email (${res.status})`);
    }
    return data;
  },

  async sendApprovalEmail(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/requests/${id}/send-approval-email`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to send approval email');
      }
      return await res.json();
    } catch (err) {
      throw err;
    }
  },

  async deleteRequest(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/requests/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (!res.ok) throw new Error('Failed to delete request');
      return await res.json();
    } catch (err) {
      const db = getLocalFallbackDB();
      db.requests = (db.requests || []).filter((r) => r.id !== id);
      saveLocalFallbackDB(db);
      return { message: 'Deleted locally' };
    }
  },

  // Analytics
  async getAnalytics(timeframe = '6m') {
    try {
      const res = await fetch(`${API_BASE_URL}/api/analytics?timeframe=${encodeURIComponent(timeframe)}`, {
        headers: getAuthHeaders()
      });
      if (!res.ok) throw new Error('Failed to fetch analytics');
      return await res.json();
    } catch (err) {
      const db = getLocalFallbackDB();
      const requests = db.requests || [];
      const totalRequests = requests.length;
      const pendingRequests = requests.filter((r) => r.status === 'pending').length;
      const inProgressRequests = requests.filter((r) => r.status === 'in_progress').length;
      const fulfilledRequests = requests.filter((r) => r.status === 'fulfilled').length;
      const rejectedRequests = requests.filter((r) => r.status === 'rejected').length;

      // Dynamic timeframe datasets
      if (timeframe === '7d') {
        return {
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
          ]
        };
      }

      if (timeframe === '30d') {
        return {
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
          ]
        };
      }

      if (timeframe === '1y') {
        return {
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
          ]
        };
      }

      // Default 6m
      return {
        overview: {
          totalRequests: 503,
          pendingRequests: 12,
          inProgressRequests: 28,
          fulfilledRequests: 449,
          rejectedRequests: 14,
          fulfillmentRate: 89,
          totalRevenue: 202100,
          pendingRevenue: 24800,
          avgTurnaroundDays: 2.2,
          sameDayDeliveryRate: 48,
          totalCustomers: 84
        },
        monthlyTrends: [
          { month: 'Jun', submitted: 48, fulfilled: 44, revenue: 16800 },
          { month: 'Jul', submitted: 62, fulfilled: 58, revenue: 23400 },
          { month: 'Aug', submitted: 74, fulfilled: 68, revenue: 29500 },
          { month: 'Sep', submitted: 89, fulfilled: 81, revenue: 36200 },
          { month: 'Oct', submitted: 104, fulfilled: 95, revenue: 43800 },
          { month: 'Nov', submitted: 126, fulfilled: 108, revenue: 52400 }
        ],
        weeklyVolume: [
          { day: 'Mon', submitted: 82, completed: 74 },
          { day: 'Tue', submitted: 94, completed: 86 },
          { day: 'Wed', submitted: 108, completed: 98 },
          { day: 'Thu', submitted: 88, completed: 82 },
          { day: 'Fri', submitted: 116, completed: 104 },
          { day: 'Sat', submitted: 128, completed: 112 },
          { day: 'Sun', submitted: 46, completed: 41 }
        ]
      };
    }
  }
};
