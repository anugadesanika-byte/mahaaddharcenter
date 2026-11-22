// src/pages/AdminDashboard.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { categories } from '../data/data';
import AnalyticsPanel from '../components/AnalyticsPanel';

export default function AdminDashboard({ onNavigate, initialSection = 'analytics' }) {
  const { user, isAdmin, logout } = useAuth();
  const { lang, t } = useLanguage();
  const [adminSection, setAdminSection] = useState(initialSection); // 'analytics' | 'requests'
  const [requests, setRequests] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // all, pending, in_progress, fulfilled, rejected
  const [selectedCategory, setSelectedCategory] = useState('all'); // all, or specific category
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Status Modal State
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('pending');
  const [operatorRemarks, setOperatorRemarks] = useState('');
  const [fee, setFee] = useState(100);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [updating, setUpdating] = useState(false);

  // Email Notification Toast State
  const [emailNotificationToast, setEmailNotificationToast] = useState(null);

  // Document Viewer Modal State
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [viewingDocs, setViewingDocs] = useState([]);
  const [docModalTitle, setDocModalTitle] = useState('');
  const [realtimeNotice, setRealtimeNotice] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [reqList, analyticsData] = await Promise.all([
        api.getAllRequests({ status: activeTab, search: searchQuery }),
        api.getAnalytics()
      ]);
      setRequests(reqList || []);
      setAnalytics(analyticsData);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [activeTab, searchQuery]);

  // Real-time listener for incoming customer requests & citizen signups
  useEffect(() => {
    const token = localStorage.getItem('eseva_auth_token');
    const unsubscribe = api.subscribeSessionStream(
      token,
      null,
      (realtimeEvent) => {
        if (realtimeEvent.type === 'NEW_REQUEST' && realtimeEvent.request) {
          setRequests((prev) => {
            const exists = prev.some((r) => r.id === realtimeEvent.request.id);
            if (exists) return prev;
            return [realtimeEvent.request, ...prev];
          });
          setRealtimeNotice({
            type: 'NEW_REQUEST',
            title: '🚨 New Citizen Application Received!',
            message: `${realtimeEvent.request.customerName} submitted an application for ${realtimeEvent.request.serviceName}.`,
            time: new Date().toLocaleTimeString()
          });
          setTimeout(() => setRealtimeNotice(null), 9000);
        } else if (realtimeEvent.type === 'NEW_CITIZEN_REGISTERED' && realtimeEvent.user) {
          setRealtimeNotice({
            type: 'NEW_CITIZEN_REGISTERED',
            title: '👤 New Citizen Registered!',
            message: `${realtimeEvent.user.name} (${realtimeEvent.user.email}) registered on the portal.`,
            time: new Date().toLocaleTimeString()
          });
          setTimeout(() => setRealtimeNotice(null), 9000);
        } else if (realtimeEvent.type === 'REQUEST_STATUS_UPDATED') {
          setRequests((prev) =>
            prev.map((r) =>
              r.id === realtimeEvent.requestId
                ? {
                    ...r,
                    status: realtimeEvent.status || r.status,
                    operatorRemarks: realtimeEvent.operatorRemarks || r.operatorRemarks,
                    trackingNumber: realtimeEvent.trackingNumber || r.trackingNumber,
                    completedAt: realtimeEvent.completedAt || r.completedAt
                  }
                : r
            )
          );
        }
      }
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const openStatusModal = (req) => {
    setSelectedRequest(req);
    setNewStatus(req.status);
    setOperatorRemarks(req.operatorRemarks || '');
    setFee(req.fee || 100);
    setTrackingNumber(req.trackingNumber || '');
    setStatusModalOpen(true);
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedRequest) return;
    setUpdating(true);
    try {
      const res = await api.updateRequestStatus(selectedRequest.id, {
        status: newStatus,
        operatorRemarks,
        fee,
        trackingNumber
      });
      setStatusModalOpen(false);
      fetchDashboardData();

      if (newStatus === 'fulfilled' || newStatus === 'approved') {
        const recipient = selectedRequest.customerEmail || selectedRequest.applicantEmail || 'applicant';
        setEmailNotificationToast(
          `Request approved! Official confirmation email dispatched to ${recipient} via anugadesanika@gmail.com.`
        );
        setTimeout(() => setEmailNotificationToast(null), 7000);
      }
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleSendApprovalEmail = async (reqItem) => {
    try {
      const res = await api.sendApprovalEmail(reqItem.id);
      setEmailNotificationToast(
        `✅ Approval email sent to ${reqItem.customerEmail || reqItem.applicantEmail} via anugadesanika@gmail.com!`
      );
      setTimeout(() => setEmailNotificationToast(null), 7000);
      fetchDashboardData();
    } catch (err) {
      alert('Approval email notification: ' + err.message);
    }
  };

  const handleDeleteRequest = async (id) => {
    if (window.confirm(`Are you sure you want to delete request ${id}? This cannot be undone.`)) {
      try {
        await api.deleteRequest(id);
        fetchDashboardData();
      } catch (err) {
        alert('Failed to delete request');
      }
    }
  };

  const openDocsModal = (req) => {
    setViewingDocs(req.documents || []);
    setDocModalTitle(`${req.serviceName} - ${req.customerName}`);
    setDocModalOpen(true);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border-t-8 border-red-500">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto text-2xl mb-4">
            <i className="fas fa-lock"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Administrator Access Required</h2>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            Please log in with an administrator account to view the analytics dashboard and fulfill requests.
          </p>
          <button
            onClick={() => onNavigate('auth')}
            className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition shadow"
          >
            Go to Admin Sign In
          </button>
        </div>
      </div>
    );
  }

  // DYNAMIC OVERVIEW: Compute live metrics directly from the actual active requests
  const overview = useMemo(() => {
    const totalRequests = requests.length;
    const pendingRequests = requests.filter((r) => r.status === 'pending').length;
    const inProgressRequests = requests.filter((r) => r.status === 'in_progress').length;
    const fulfilledRequests = requests.filter((r) => r.status === 'fulfilled').length;
    const rejectedRequests = requests.filter((r) => r.status === 'rejected').length;
    const fulfillmentRate =
      totalRequests > 0 ? Math.round((fulfilledRequests / totalRequests) * 100) : 0;
    const totalRevenue = requests
      .filter((r) => r.status === 'fulfilled')
      .reduce((sum, r) => sum + (Number(r.fee) || 100), 0);
    const pendingRevenue = requests
      .filter((r) => r.status === 'pending' || r.status === 'in_progress')
      .reduce((sum, r) => sum + (Number(r.fee) || 100), 0);

    return {
      totalRequests,
      pendingRequests,
      inProgressRequests,
      fulfilledRequests,
      rejectedRequests,
      fulfillmentRate,
      totalRevenue,
      pendingRevenue
    };
  }, [requests]);

  // DYNAMIC CATEGORY COUNTS: Computed live from all requests
  const categoryCounts = useMemo(() => {
    const counts = { all: requests.length };
    categories.forEach((cat) => {
      counts[cat] = 0;
    });
    requests.forEach((r) => {
      const c = r.category || 'General';
      counts[c] = (counts[c] || 0) + 1;
    });
    return counts;
  }, [requests]);

  // DYNAMIC FILTERING: Filter by Status, Category, and Search Query
  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      // 1. Status Filter
      if (activeTab !== 'all' && r.status.toLowerCase() !== activeTab.toLowerCase()) {
        return false;
      }
      // 2. Category Filter
      if (selectedCategory !== 'all') {
        const cat = (r.category || '').toLowerCase();
        const sel = selectedCategory.toLowerCase();
        if (!cat.includes(sel) && !sel.includes(cat)) {
          return false;
        }
      }
      // 3. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesId = (r.id || '').toLowerCase().includes(q);
        const matchesName = (r.customerName || '').toLowerCase().includes(q);
        const matchesPhone = (r.customerPhone || '').includes(q);
        const matchesEmail = (r.customerEmail || '').toLowerCase().includes(q);
        const matchesService = (r.serviceName || '').toLowerCase().includes(q);
        const matchesTracking = (r.trackingNumber || '').toLowerCase().includes(q);
        const matchesDocs = (r.documents || []).some((d) =>
          (d.name || d.originalName || '').toLowerCase().includes(q)
        );
        return (
          matchesId ||
          matchesName ||
          matchesPhone ||
          matchesEmail ||
          matchesService ||
          matchesTracking ||
          matchesDocs
        );
      }
      return true;
    });
  }, [requests, activeTab, selectedCategory, searchQuery]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, selectedCategory, searchQuery, itemsPerPage]);

  // PAGINATION CALCULATIONS
  const totalItems = filteredRequests.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  // Category Theme Styler
  const getCategoryTheme = (category) => {
    const cat = (category || '').toLowerCase();
    if (cat.includes('identity')) {
      return {
        border: 'border-amber-300',
        bg: 'bg-amber-50/60',
        text: 'text-amber-800',
        badge: 'bg-amber-100 text-amber-900 border-amber-300',
        icon: 'fa-id-card'
      };
    }
    if (cat.includes('certif')) {
      return {
        border: 'border-blue-300',
        bg: 'bg-blue-50/60',
        text: 'text-blue-800',
        badge: 'bg-blue-100 text-blue-900 border-blue-300',
        icon: 'fa-certificate'
      };
    }
    if (cat.includes('business')) {
      return {
        border: 'border-emerald-300',
        bg: 'bg-emerald-50/60',
        text: 'text-emerald-800',
        badge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        icon: 'fa-briefcase'
      };
    }
    if (cat.includes('police') || cat.includes('legal')) {
      return {
        border: 'border-purple-300',
        bg: 'bg-purple-50/60',
        text: 'text-purple-800',
        badge: 'bg-purple-100 text-purple-900 border-purple-300',
        icon: 'fa-balance-scale'
      };
    }
    if (cat.includes('financ')) {
      return {
        border: 'border-cyan-300',
        bg: 'bg-cyan-50/60',
        text: 'text-cyan-800',
        badge: 'bg-cyan-100 text-cyan-900 border-cyan-300',
        icon: 'fa-indian-rupee-sign'
      };
    }
    return {
      border: 'border-indigo-300',
      bg: 'bg-indigo-50/60',
      text: 'text-indigo-800',
      badge: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      icon: 'fa-file-lines'
    };
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* Top Admin Header Bar */}
      <div className="bg-chakra text-white border-b-4 border-secondary shadow-md">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-primary font-bold text-xl border border-white/20">
              <i className="fas fa-shield-alt"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-wide">{t('adminTitle')}</h1>
                <span className="bg-emerald-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                  Live Operations
                </span>
              </div>
              <p className="text-xs text-gray-300">
                {t('adminSubtitle')} · Logged in as: <strong className="text-white">{user?.name}</strong> ({user?.email})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
            >
              <i className="fas fa-external-link-alt mr-1.5"></i> {t('btnViewPublic')}
            </button>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow"
            >
              <i className="fas fa-sign-out-alt mr-1.5"></i> {t('btnLogout')}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-6">
        {/* ========================================================= */}
        {/* PRIMARY ADMIN PANEL SEGMENTED SWITCHER */}
        {/* ========================================================= */}
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-2 mb-8">
          <button
            onClick={() => setAdminSection('analytics')}
            className={`flex-1 flex items-center justify-center gap-2.5 py-3 px-6 rounded-xl font-bold text-sm transition ${
              adminSection === 'analytics'
                ? 'bg-chakra text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <i className="fas fa-chart-pie text-base text-primary"></i>
            <span>{t('tabAnalytics')}</span>
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
              adminSection === 'analytics' ? 'bg-primary text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              Live BI Studio
            </span>
          </button>

          <button
            onClick={() => setAdminSection('requests')}
            className={`flex-1 flex items-center justify-center gap-2.5 py-3 px-6 rounded-xl font-bold text-sm transition ${
              adminSection === 'requests'
                ? 'bg-chakra text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <i className="fas fa-tasks text-base text-secondary"></i>
            <span>{t('tabRequests')}</span>
            {overview.pendingRequests > 0 && (
              <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                {overview.pendingRequests} {t('statusPending')}
              </span>
            )}
          </button>
        </div>

        {/* Floating Real-Time Inflow Notice Toast */}
        {realtimeNotice && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-chakra via-slate-900 to-chakra text-white border border-primary/40 shadow-xl flex items-center justify-between gap-4 text-xs animate-slide-down">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center text-lg shrink-0 shadow-md">
                <i className={realtimeNotice.type === 'NEW_REQUEST' ? 'fas fa-bolt text-yellow-300' : 'fas fa-user-check'}></i>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-sm">{realtimeNotice.title}</span>
                  <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Live
                  </span>
                  <span className="text-[10px] text-gray-400">{realtimeNotice.time}</span>
                </div>
                <p className="font-medium text-gray-200 mt-0.5">{realtimeNotice.message}</p>
              </div>
            </div>
            <button
              onClick={() => setRealtimeNotice(null)}
              className="text-gray-300 hover:text-white p-1.5 rounded-lg"
            >
              <i className="fas fa-times text-sm"></i>
            </button>
          </div>
        )}

        {/* Floating Email Notification Alert Toast */}
        {emailNotificationToast && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 shadow-md flex items-center justify-between gap-3 text-xs text-emerald-900 animate-slide-down">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm shrink-0">
                <i className="fas fa-paper-plane"></i>
              </div>
              <div>
                <p className="font-extrabold text-emerald-950">Email Notification Status:</p>
                <p className="font-medium text-emerald-800">{emailNotificationToast}</p>
              </div>
            </div>
            <button
              onClick={() => setEmailNotificationToast(null)}
              className="text-emerald-700 hover:text-emerald-900 p-1.5"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 1: SEPARATE ANALYTICS & CHARTS PANEL */}
        {/* ========================================================= */}
        {adminSection === 'analytics' && (
          <AnalyticsPanel
            analytics={analytics}
            requests={requests}
            onRefresh={fetchDashboardData}
          />
        )}

        {/* ========================================================= */}
        {/* VIEW 2: CITIZEN REQUEST MANAGEMENT MENU */}
        {/* ========================================================= */}
        {adminSection === 'requests' && (
          <div className="space-y-8 animate-fade-in">
            {/* Quick Status Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {/* Card 1: Total */}
              <div
                onClick={() => setActiveTab('all')}
                className={`p-5 rounded-2xl shadow-sm border cursor-pointer transition ${
                  activeTab === 'all'
                    ? 'border-primary ring-2 ring-primary/20 bg-orange-50/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">All Submissions</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm">
                    <i className="fas fa-folder-open"></i>
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-slate-900">{overview.totalRequests}</span>
                  <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full">
                    Total
                  </span>
                </div>
              </div>

              {/* Card 2: Pending */}
              <div
                onClick={() => setActiveTab('pending')}
                className={`p-5 rounded-2xl shadow-sm border cursor-pointer transition ${
                  activeTab === 'pending'
                    ? 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/30'
                    : 'bg-white border-amber-200 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center justify-between text-amber-700 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Pending Review</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-sm">
                    <i className="fas fa-clock"></i>
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-amber-700">{overview.pendingRequests}</span>
                  <span className="text-xs text-amber-700 font-semibold bg-amber-100 px-2 py-0.5 rounded-full">
                    Verification
                  </span>
                </div>
              </div>

              {/* Card 3: In Progress */}
              <div
                onClick={() => setActiveTab('in_progress')}
                className={`p-5 rounded-2xl shadow-sm border cursor-pointer transition ${
                  activeTab === 'in_progress'
                    ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/30'
                    : 'bg-white border-blue-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between text-blue-700 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">In Progress</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm">
                    <i className="fas fa-spinner fa-spin"></i>
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-blue-700">{overview.inProgressRequests}</span>
                  <span className="text-xs text-blue-700 font-semibold bg-blue-100 px-2 py-0.5 rounded-full">
                    Tahsildar Desk
                  </span>
                </div>
              </div>

              {/* Card 4: Fulfilled */}
              <div
                onClick={() => setActiveTab('fulfilled')}
                className={`p-5 rounded-2xl shadow-sm border cursor-pointer transition ${
                  activeTab === 'fulfilled'
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/30'
                    : 'bg-white border-emerald-200 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center justify-between text-emerald-700 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Fulfilled / Issued</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">
                    <i className="fas fa-check-circle"></i>
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-emerald-700">{overview.fulfilledRequests}</span>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                    {overview.fulfillmentRate}%
                  </span>
                </div>
              </div>

              {/* Card 5: Revenue */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Fees</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm">
                    <i className="fas fa-indian-rupee-sign"></i>
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-chakra">
                    ₹{Number(overview.totalRevenue).toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Collected</span>
                </div>
              </div>
            </div>

            {/* REQUEST MANAGEMENT SECTION */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {/* Header & Status Tabs */}
              <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-chakra flex items-center gap-2">
                    <i className="fas fa-tasks text-primary"></i>
                    <span>Citizen Service Requests Operations</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Filter across all categories, review citizen-uploaded documents in max-column grid pages, update remarks, and dispatch approvals.
                  </p>
                </div>

                {/* Status Filter Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 bg-slate-200/70 p-1.5 rounded-xl text-xs font-bold self-start lg:self-center">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-3 py-1.5 rounded-lg transition ${
                      activeTab === 'all' ? 'bg-white text-chakra shadow-sm' : 'text-slate-600 hover:text-chakra'
                    }`}
                  >
                    {t('statusAll')} ({overview.totalRequests})
                  </button>
                  <button
                    onClick={() => setActiveTab('pending')}
                    className={`px-3 py-1.5 rounded-lg transition ${
                      activeTab === 'pending'
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'text-amber-700 hover:bg-amber-100/50'
                    }`}
                  >
                    {t('statusPending')} ({overview.pendingRequests})
                  </button>
                  <button
                    onClick={() => setActiveTab('in_progress')}
                    className={`px-3 py-1.5 rounded-lg transition ${
                      activeTab === 'in_progress'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-blue-700 hover:bg-blue-100/50'
                    }`}
                  >
                    {t('statusInProgress')} ({overview.inProgressRequests})
                  </button>
                  <button
                    onClick={() => setActiveTab('fulfilled')}
                    className={`px-3 py-1.5 rounded-lg transition ${
                      activeTab === 'fulfilled'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-emerald-700 hover:bg-emerald-100/50'
                    }`}
                  >
                    {t('statusFulfilled')} ({overview.fulfilledRequests})
                  </button>
                  <button
                    onClick={() => setActiveTab('rejected')}
                    className={`px-3 py-1.5 rounded-lg transition ${
                      activeTab === 'rejected'
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'text-red-700 hover:bg-red-100/50'
                    }`}
                  >
                    {t('statusRejected')} ({overview.rejectedRequests})
                  </button>
                </div>
              </div>

              {/* DYNAMIC CATEGORY PILLS BAR */}
              <div className="px-6 py-3.5 bg-slate-100/60 border-b border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="text-[11px] font-extrabold uppercase text-slate-500 tracking-wider whitespace-nowrap mr-1 flex items-center gap-1.5">
                  <i className="fas fa-layer-group text-primary"></i> Category:
                </span>

                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                    selectedCategory === 'all'
                      ? 'bg-chakra text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                  }`}
                >
                  <span>All Categories</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {categoryCounts.all || requests.length}
                  </span>
                </button>

                {categories.map((cat) => {
                  const count = categoryCounts[cat] || 0;
                  const theme = getCategoryTheme(cat);
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                      }`}
                    >
                      <i className={`fas ${theme.icon} text-[10px] ${isSelected ? 'text-white' : theme.text}`}></i>
                      <span>{cat}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* SEARCH & VIEW SWITCHER CONTROLS BAR */}
              <div className="p-4 bg-white border-b border-slate-100 flex flex-col md:flex-row gap-3 justify-between items-center">
                {/* Search Bar */}
                <div className="relative w-full md:max-w-md">
                  <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by Request ID, Citizen, Phone, Service, or Document..."
                    className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <i className="fas fa-times-circle"></i>
                    </button>
                  )}
                </div>

                {/* Right controls: View Switcher & Items Per Page */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                  {/* Results Count Summary */}
                  <div className="text-xs text-slate-500 font-medium">
                    Found <strong>{totalItems}</strong> files / applications
                  </div>

                  {/* Items per page selector */}
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <span className="hidden sm:inline">Per page:</span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => setItemsPerPage(Number(e.target.value))}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value={8}>8</option>
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>

                  {/* View Switcher: Max Columns Grid vs Detailed Table */}
                  <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                        viewMode === 'grid'
                          ? 'bg-white text-primary shadow-xs'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                      title="Max Columns Files Grid View"
                    >
                      <i className="fas fa-th-large"></i>
                      <span className="hidden sm:inline">Grid (Max Cols)</span>
                    </button>

                    <button
                      onClick={() => setViewMode('table')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                        viewMode === 'table'
                          ? 'bg-white text-primary shadow-xs'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                      title="Detailed Table View"
                    >
                      <i className="fas fa-table-list"></i>
                      <span className="hidden sm:inline">Table</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* MAIN CONTENT AREA: GRID VIEW OR TABLE VIEW */}
              {loading ? (
                <div className="text-center py-20 text-slate-400">
                  <i className="fas fa-spinner fa-spin text-3xl mb-3 text-primary"></i>
                  <p className="font-semibold text-slate-600">Loading citizen files across categories...</p>
                </div>
              ) : totalItems === 0 ? (
                <div className="text-center py-20 px-6 text-slate-400">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400 text-2xl">
                    <i className="fas fa-folder-open"></i>
                  </div>
                  <p className="font-bold text-slate-700 text-base">No Applications Found Under This Filter</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                    Try switching category tabs, clearing search keywords, or selecting a different status filter.
                  </p>
                  {(activeTab !== 'all' || selectedCategory !== 'all' || searchQuery) && (
                    <button
                      onClick={() => {
                        setActiveTab('all');
                        setSelectedCategory('all');
                        setSearchQuery('');
                      }}
                      className="mt-4 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-xs hover:bg-orange-600 transition"
                    >
                      Reset All Filters
                    </button>
                  )}
                </div>
              ) : viewMode === 'grid' ? (
                /* ========================================================= */
                /* VIEW MODE: MAX COLUMNS GRID (1 to 5 COLUMNS ON WIDE SCREENS) */
                /* ========================================================= */
                <div className="p-5 bg-slate-50/70">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                    {paginatedRequests.map((req) => {
                      const theme = getCategoryTheme(req.category);
                      const docCount = req.documents ? req.documents.length : 0;
                      return (
                        <div
                          key={req.id}
                          className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group hover:border-primary/50"
                        >
                          {/* Card Top: Category & ID */}
                          <div className={`p-3 border-b ${theme.bg} ${theme.border} flex items-center justify-between`}>
                            <div className="flex items-center gap-1.5 truncate">
                              <i className={`fas ${theme.icon} text-xs ${theme.text}`}></i>
                              <span className={`text-[11px] font-extrabold truncate ${theme.text}`}>
                                {req.category || 'General'}
                              </span>
                            </div>
                            <span className="font-mono text-[10px] font-black bg-white/90 text-slate-800 px-2 py-0.5 rounded shadow-2xs shrink-0">
                              {req.id}
                            </span>
                          </div>

                          {/* Card Body */}
                          <div className="p-3.5 flex-1 flex flex-col justify-between">
                            <div>
                              {/* Service Name */}
                              <h3
                                className="font-bold text-xs text-slate-900 leading-snug line-clamp-2 mb-2 group-hover:text-primary transition"
                                title={req.serviceName}
                              >
                                {req.serviceName}
                              </h3>

                              {/* Citizen Details */}
                              <div className="space-y-1 mb-3 text-[11px]">
                                <div className="flex items-center gap-1.5 text-slate-800 font-semibold truncate">
                                  <i className="fas fa-user-circle text-slate-400 text-xs"></i>
                                  <span className="truncate">{req.customerName || 'Citizen Applicant'}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-500">
                                  <i className="fas fa-phone-alt text-[10px] text-slate-400"></i>
                                  <a
                                    href={`tel:${req.customerPhone}`}
                                    className="hover:text-primary transition truncate font-medium"
                                  >
                                    {req.customerPhone || 'N/A'}
                                  </a>
                                </div>
                                {req.customerEmail && (
                                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] truncate">
                                    <i className="fas fa-envelope text-[9px]"></i>
                                    <span className="truncate">{req.customerEmail}</span>
                                  </div>
                                )}
                              </div>

                              {/* Attached Files & Documents Section */}
                              <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 mb-3">
                                <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 mb-1.5">
                                  <span className="flex items-center gap-1">
                                    <i className="fas fa-paperclip text-slate-400"></i>
                                    <span>Attached Files:</span>
                                  </span>
                                  <span className={`px-1.5 py-0.2 rounded-full font-black ${
                                    docCount > 0 ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-500'
                                  }`}>
                                    {docCount}
                                  </span>
                                </div>

                                {docCount > 0 ? (
                                  <div className="space-y-1">
                                    {req.documents.slice(0, 2).map((doc, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-center justify-between text-[10px] text-slate-700 bg-white p-1 rounded border border-slate-200/60 truncate"
                                      >
                                        <div className="flex items-center gap-1.5 truncate">
                                          <i className="fas fa-file-pdf text-red-500 text-[10px] shrink-0"></i>
                                          <span className="truncate font-medium">{doc.name || doc.originalName || `Document ${idx + 1}`}</span>
                                        </div>
                                        {doc.size && (
                                          <span className="text-[9px] text-slate-400 shrink-0 ml-1">
                                            {(doc.size / 1024).toFixed(0)}KB
                                          </span>
                                        )}
                                      </div>
                                    ))}
                                    {docCount > 2 && (
                                      <p className="text-[9px] text-slate-400 italic text-center">
                                        +{docCount - 2} more document(s)
                                      </p>
                                    )}
                                    <button
                                      onClick={() => openDocsModal(req)}
                                      className="w-full mt-1.5 py-1 text-[10px] font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 rounded transition flex items-center justify-center gap-1"
                                    >
                                      <i className="fas fa-eye text-[9px]"></i>
                                      <span>View All {docCount} Docs</span>
                                    </button>
                                  </div>
                                ) : (
                                  <p className="text-[10px] text-slate-400 italic text-center py-1">
                                    No documents attached
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Status & Tracking Footer */}
                            <div>
                              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] mb-2.5">
                                <div>
                                  <span className="text-slate-400">Tracking: </span>
                                  <span className="font-mono font-bold text-slate-700">
                                    {req.trackingNumber || 'Pending'}
                                  </span>
                                </div>
                                <div>
                                  {req.status === 'pending' && (
                                    <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full text-[10px] inline-flex items-center gap-1">
                                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                                      Pending
                                    </span>
                                  )}
                                  {req.status === 'in_progress' && (
                                    <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full text-[10px] inline-flex items-center gap-1">
                                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                                      In-Progress
                                    </span>
                                  )}
                                  {req.status === 'fulfilled' && (
                                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px] inline-flex items-center gap-1">
                                      <i className="fas fa-check text-[9px]"></i>
                                      Fulfilled
                                    </span>
                                  )}
                                  {req.status === 'rejected' && (
                                    <span className="bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full text-[10px] inline-flex items-center gap-1">
                                      <i className="fas fa-times text-[9px]"></i>
                                      Rejected
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="grid grid-cols-2 gap-1.5">
                                <button
                                  onClick={() => openStatusModal(req)}
                                  className="w-full bg-chakra hover:bg-blue-900 text-white font-bold py-1.5 px-2 rounded-lg text-[11px] transition flex items-center justify-center gap-1 shadow-2xs"
                                >
                                  <i className="fas fa-edit text-[10px]"></i>
                                  <span>Update</span>
                                </button>

                                {req.status === 'fulfilled' ? (
                                  <button
                                    onClick={() => handleSendApprovalEmail(req)}
                                    className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 font-bold py-1.5 px-2 rounded-lg text-[11px] transition flex items-center justify-center gap-1"
                                    title="Send / Resend Official Approval Email"
                                  >
                                    <i className="fas fa-paper-plane text-[10px]"></i>
                                    <span>Email</span>
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleDeleteRequest(req.id)}
                                    className="w-full bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 font-bold py-1.5 px-2 rounded-lg text-[11px] transition flex items-center justify-center gap-1"
                                  >
                                    <i className="fas fa-trash-alt text-[10px]"></i>
                                    <span>Delete</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* ========================================================= */
                /* VIEW MODE: DETAILED TABLE VIEW */
                /* ========================================================= */
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100/80 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                        <th className="py-3 px-4">Request ID</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Applicant</th>
                        <th className="py-3 px-4">Service & Category</th>
                        <th className="py-3 px-4">Uploaded Files</th>
                        <th className="py-3 px-4">Tracking No.</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {paginatedRequests.map((req) => (
                        <tr key={req.id} className="hover:bg-slate-50/80 transition">
                          {/* ID */}
                          <td className="py-3.5 px-4 font-mono font-bold text-chakra">
                            {req.id}
                          </td>

                          {/* Date */}
                          <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                            {new Date(req.createdAt).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </td>

                          {/* Applicant */}
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">{req.customerName}</div>
                            <div className="text-slate-500 text-[11px]">
                              <a href={`tel:${req.customerPhone}`} className="hover:text-primary">
                                <i className="fas fa-phone-alt text-[9px] mr-1"></i>
                                {req.customerPhone || 'N/A'}
                              </a>
                            </div>
                            <div className="text-slate-400 text-[10px] truncate max-w-[140px]">
                              {req.customerEmail}
                            </div>
                          </td>

                          {/* Service */}
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-800 line-clamp-1 max-w-[200px]" title={req.serviceName}>
                              {req.serviceName}
                            </div>
                            <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full inline-block mt-0.5">
                              {req.category}
                            </span>
                          </td>

                          {/* Uploaded Documents */}
                          <td className="py-3.5 px-4">
                            {req.documents && req.documents.length > 0 ? (
                              <button
                                onClick={() => openDocsModal(req)}
                                className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-2.5 py-1 rounded-lg transition inline-flex items-center gap-1.5 text-[11px]"
                              >
                                <i className="fas fa-paperclip text-[10px]"></i>
                                <span>{req.documents.length} Files</span>
                              </button>
                            ) : (
                              <span className="text-slate-400 italic text-[11px]">No docs attached</span>
                            )}
                          </td>

                          {/* Tracking Number */}
                          <td className="py-3.5 px-4 font-mono text-[11px] text-slate-700 font-semibold">
                            {req.trackingNumber || 'PENDING'}
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-4">
                            {req.status === 'pending' && (
                              <span className="bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full text-[11px] inline-flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                                Pending
                              </span>
                            )}
                            {req.status === 'in_progress' && (
                              <span className="bg-blue-100 text-blue-800 font-bold px-2.5 py-1 rounded-full text-[11px] inline-flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                                In Progress
                              </span>
                            )}
                            {req.status === 'fulfilled' && (
                              <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full text-[11px] inline-flex items-center gap-1">
                                <i className="fas fa-check text-[10px]"></i>
                                Fulfilled
                              </span>
                            )}
                            {req.status === 'rejected' && (
                              <span className="bg-red-100 text-red-800 font-bold px-2.5 py-1 rounded-full text-[11px] inline-flex items-center gap-1">
                                <i className="fas fa-times text-[10px]"></i>
                                Rejected
                              </span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {req.status === 'fulfilled' && (
                                <button
                                  onClick={() => handleSendApprovalEmail(req)}
                                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 px-2 py-1 rounded-lg font-bold text-xs transition shadow-xs flex items-center gap-1"
                                  title={`Resend Approval Email to ${req.customerEmail || req.applicantEmail} via anugadesanika@gmail.com`}
                                >
                                  <i className="fas fa-paper-plane text-[10px]"></i>
                                  <span className="hidden sm:inline">Email</span>
                                </button>
                              )}
                              <button
                                onClick={() => openStatusModal(req)}
                                className="bg-chakra hover:bg-blue-900 text-white px-2.5 py-1 rounded-lg font-bold text-xs transition shadow-xs flex items-center gap-1"
                                title="Update Status, Add Remarks, Assign Tracking"
                              >
                                <i className="fas fa-edit text-[10px]"></i>
                                <span>Update</span>
                              </button>
                              <button
                                onClick={() => handleDeleteRequest(req.id)}
                                className="text-slate-400 hover:text-red-600 p-1 rounded transition"
                                title="Delete Request"
                              >
                                <i className="fas fa-trash-alt text-xs"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* PAGINATION CONTROLS BAR */}
              {totalItems > 0 && (
                <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="text-slate-500 font-medium text-center sm:text-left">
                    Showing <strong className="text-slate-800">{startIndex + 1}</strong> to{' '}
                    <strong className="text-slate-800">{Math.min(startIndex + itemsPerPage, totalItems)}</strong> of{' '}
                    <strong className="text-slate-800">{totalItems}</strong> entries
                    {selectedCategory !== 'all' && (
                      <span className="ml-1 text-primary font-semibold">in {selectedCategory}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* First Page */}
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={validCurrentPage === 1}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed font-bold"
                      title="First Page"
                    >
                      <i className="fas fa-angles-left text-[10px]"></i>
                    </button>

                    {/* Previous Page */}
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={validCurrentPage === 1}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed font-bold flex items-center gap-1"
                    >
                      <i className="fas fa-chevron-left text-[10px]"></i>
                      <span className="hidden sm:inline">Prev</span>
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((p) => {
                        // Display current page, first, last, and immediate neighbors
                        return p === 1 || p === totalPages || Math.abs(p - validCurrentPage) <= 1;
                      })
                      .map((p, idx, arr) => {
                        const showEllipsisBefore = idx > 0 && p - arr[idx - 1] > 1;
                        return (
                          <React.Fragment key={p}>
                            {showEllipsisBefore && (
                              <span className="px-1 text-slate-400">...</span>
                            )}
                            <button
                              onClick={() => setCurrentPage(p)}
                              className={`w-8 h-8 rounded-lg font-bold text-xs transition ${
                                validCurrentPage === p
                                  ? 'bg-chakra text-white shadow-xs'
                                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              {p}
                            </button>
                          </React.Fragment>
                        );
                      })}

                    {/* Next Page */}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={validCurrentPage === totalPages}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed font-bold flex items-center gap-1"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <i className="fas fa-chevron-right text-[10px]"></i>
                    </button>

                    {/* Last Page */}
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={validCurrentPage === totalPages}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed font-bold"
                      title="Last Page"
                    >
                      <i className="fas fa-angles-right text-[10px]"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: STATUS & REMARKS UPDATE MODAL */}
      {/* ========================================================= */}
      {statusModalOpen && selectedRequest && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in"
          onClick={() => setStatusModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border-t-8 border-primary"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-mono font-bold text-slate-400">
                  {selectedRequest.id}
                </span>
                <h3 className="text-lg font-bold text-chakra">
                  Update Service Application Status
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedRequest.serviceName} · {selectedRequest.customerName}
                </p>
              </div>
              <button
                onClick={() => setStatusModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>

            <form onSubmit={handleUpdateStatus} className="space-y-4">
              {/* Status Radio / Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Select Workflow Status *
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <label
                    className={`border p-2.5 rounded-xl cursor-pointer flex items-center gap-2 transition ${
                      newStatus === 'pending'
                        ? 'border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="pending"
                      checked={newStatus === 'pending'}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="hidden"
                    />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span>Pending Verification</span>
                  </label>

                  <label
                    className={`border p-2.5 rounded-xl cursor-pointer flex items-center gap-2 transition ${
                      newStatus === 'in_progress'
                        ? 'border-blue-500 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="in_progress"
                      checked={newStatus === 'in_progress'}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="hidden"
                    />
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    <span>In-Progress (Govt)</span>
                  </label>

                  <label
                    className={`border p-2.5 rounded-xl cursor-pointer flex items-center gap-2 transition ${
                      newStatus === 'fulfilled'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="fulfilled"
                      checked={newStatus === 'fulfilled'}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="hidden"
                    />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span>Fulfilled / Ready</span>
                  </label>

                  <label
                    className={`border p-2.5 rounded-xl cursor-pointer flex items-center gap-2 transition ${
                      newStatus === 'rejected'
                        ? 'border-red-500 bg-red-50 text-red-900 ring-2 ring-red-500/20'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="rejected"
                      checked={newStatus === 'rejected'}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="hidden"
                    />
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                    <span>Rejected / Re-upload</span>
                  </label>
                </div>

                {/* Automated Approval Email Notice */}
                {newStatus === 'fulfilled' && (
                  <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-xs text-emerald-900 animate-fade-in">
                    <i className="fas fa-envelope-circle-check text-emerald-600 mt-0.5 text-sm shrink-0"></i>
                    <div>
                      <span className="font-bold">Automated Email Notification:</span>
                      <p className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
                        Approving this request will automatically send an official certificate confirmation email to{' '}
                        <span className="font-semibold underline">
                          {selectedRequest?.customerEmail || selectedRequest?.applicantEmail || 'applicant'}
                        </span>{' '}
                        via <span className="font-semibold">anugadesanika@gmail.com</span>.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Operator Remarks */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Operator Remarks (Visible to Citizen) *
                </label>
                <textarea
                  rows="3"
                  required
                  value={operatorRemarks}
                  onChange={(e) => setOperatorRemarks(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-primary focus:outline-none bg-slate-50 focus:bg-white"
                  placeholder="e.g. Application filed with Tehsildar desk. Acknowledgement slip generated."
                ></textarea>
              </div>

              {/* Tracking Number & Fee */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Govt Tracking / App ID
                  </label>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs font-mono focus:ring-2 focus:ring-primary focus:outline-none bg-slate-50"
                    placeholder="e.g. MH-DOM-2024-991"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Government Fee (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs font-mono focus:ring-2 focus:ring-primary focus:outline-none bg-slate-50"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStatusModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-5 py-2 text-xs font-bold bg-primary hover:bg-orange-600 text-white rounded-xl shadow transition flex items-center gap-1.5"
                >
                  {updating ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save"></i>
                      <span>Save & Notify Citizen</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: DOCUMENT VIEWER MODAL */}
      {/* ========================================================= */}
      {docModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in"
          onClick={() => setDocModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 border-t-8 border-chakra max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4 pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-bold text-chakra flex items-center gap-2">
                  <i className="fas fa-file-invoice text-primary"></i>
                  <span>Citizen Uploaded Verification Documents</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{docModalTitle}</p>
              </div>
              <button
                onClick={() => setDocModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>

            {viewingDocs.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                <i className="fas fa-folder-open text-3xl mb-2"></i>
                <p>No documents uploaded for this application.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {viewingDocs.map((doc, idx) => {
                  const isImage = doc.mimetype?.startsWith('image/') || doc.url?.match(/\.(jpeg|jpg|gif|png)$/i);
                  const isPdf = doc.mimetype?.includes('pdf') || doc.url?.endsWith('.pdf');

                  return (
                    <div
                      key={idx}
                      className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-primary flex items-center justify-center text-lg shrink-0">
                          {isImage ? (
                            <i className="fas fa-file-image text-emerald-600"></i>
                          ) : isPdf ? (
                            <i className="fas fa-file-pdf text-red-600"></i>
                          ) : (
                            <i className="fas fa-file-alt text-blue-600"></i>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-xs text-slate-800">
                            {doc.originalName || doc.name || `Document #${idx + 1}`}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {doc.size ? `${Math.round(doc.size / 1024)} KB · ` : ''}
                            {doc.mimetype || 'Official proof'}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <a
                          href={doc.url && doc.url !== '#' ? doc.url : `/uploads/sample_doc.pdf`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-primary hover:bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs transition flex items-center gap-1.5"
                        >
                          <i className="fas fa-eye"></i>
                          <span>Inspect Doc</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setDocModalOpen(false)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl transition"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
