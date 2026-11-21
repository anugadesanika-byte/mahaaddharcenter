// src/pages/CustomerPortal.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { servicesData, categories } from '../data/data';
import { api } from '../services/api';

export default function CustomerPortal({ onNavigate, preSelectedServiceId }) {
  const { user, isCustomer, logout } = useAuth();
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('requests'); // 'requests' or 'apply'
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Apply Form State
  const [selectedServiceId, setSelectedServiceId] = useState(preSelectedServiceId || 101);
  const [applicantName, setApplicantName] = useState(user?.name || '');
  const [applicantPhone, setApplicantPhone] = useState(user?.phone || '');
  const [applicantEmail, setApplicantEmail] = useState(user?.email || '');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);

  // Selected Service metadata
  const currentService = servicesData.find((s) => s.id === Number(selectedServiceId)) || servicesData[0];

  const fetchMyRequests = async () => {
    setLoading(true);
    try {
      const data = await api.getMyRequests();
      setMyRequests(data || []);
    } catch (err) {
      console.error('Failed to load customer requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyRequests();
      if (preSelectedServiceId) {
        setSelectedServiceId(preSelectedServiceId);
        setActiveTab('apply');
      }
    }
  }, [user, preSelectedServiceId]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('serviceId', currentService.id);
      formData.append('serviceName', currentService.title.en);
      formData.append('category', currentService.category);
      formData.append('applicantName', applicantName);
      formData.append('applicantPhone', applicantPhone);
      formData.append('applicantEmail', applicantEmail);
      formData.append('aadhaarNumber', aadhaarNumber);
      formData.append('address', address);
      formData.append('notes', notes);

      // Attach documents
      uploadedFiles.forEach((file) => {
        formData.append('documents', file);
      });

      const res = await api.createServiceRequest(formData);
      setSubmissionSuccess(res.request || res);
      setUploadedFiles([]);
      setNotes('');
      fetchMyRequests();
    } catch (err) {
      alert('Error submitting application: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border-t-8 border-primary">
          <div className="w-16 h-16 bg-orange-100 text-primary rounded-full flex items-center justify-center mx-auto text-2xl mb-4">
            <i className="fas fa-user-lock"></i>
          </div>
          <h2 className="text-2xl font-bold text-chakra mb-2">Sign In to Citizen Portal</h2>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            Please log in or create a customer account to track your documents, upload verification proofs, and monitor status.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('auth')}
              className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition shadow"
            >
              Sign In / Register Now
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl transition text-sm"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* Top Banner */}
      <div className="bg-white border-b border-slate-200 shadow-xs">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Aaple Sarkar Citizen Services
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-chakra mt-1">
              {t('portalTitle')}
            </h1>
            <p className="text-xs text-slate-500">
              {user.name} · {t('applicantPhone')}: <strong>{user.phone || 'N/A'}</strong> · {user.email}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('apply')}
              className="bg-primary hover:bg-orange-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow flex items-center gap-2"
            >
              <i className="fas fa-plus-circle"></i>
              <span>{t('btnNewApplication')}</span>
            </button>
            <button
              onClick={logout}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl transition"
            >
              <i className="fas fa-sign-out-alt mr-1"></i> {t('btnLogout')}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 max-w-6xl">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 mb-8 space-x-6">
          <button
            onClick={() => {
              setActiveTab('requests');
              setSubmissionSuccess(null);
            }}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'requests'
                ? 'border-primary text-primary'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <i className="fas fa-list-check"></i>
            <span>{t('tabMyRequests')} ({myRequests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('apply')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'apply'
                ? 'border-primary text-primary'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <i className="fas fa-file-upload"></i>
            <span>{t('tabApplyOnline')}</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: MY REQUESTS & TRACKING */}
        {/* ========================================================= */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm border">
                <i className="fas fa-spinner fa-spin text-3xl text-primary mb-3"></i>
                <p className="text-sm text-slate-500">Retrieving your service requests...</p>
              </div>
            ) : myRequests.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm border p-8">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto text-2xl mb-4">
                  <i className="fas fa-inbox"></i>
                </div>
                <h3 className="text-lg font-bold text-slate-700 mb-1">No Applications Yet</h3>
                <p className="text-xs text-slate-500 mb-6 max-w-md mx-auto">
                  You have not submitted any service requests yet. Pick a certificate or license from our catalog and upload your verification documents to get started.
                </p>
                <button
                  onClick={() => setActiveTab('apply')}
                  className="bg-primary hover:bg-orange-600 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow"
                >
                  <i className="fas fa-plus-circle mr-2"></i> Submit Your First Application
                </button>
              </div>
            ) : (
              myRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 transition hover:shadow-md"
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-black text-chakra bg-slate-100 px-2.5 py-1 rounded">
                          {req.id}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          Submitted on {new Date(req.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">{req.serviceName}</h3>
                      <span className="text-xs text-slate-500">Category: <strong>{req.category}</strong></span>
                    </div>

                    <div className="text-right">
                      {req.status === 'fulfilled' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800">
                          <i className="fas fa-check-circle text-emerald-600"></i> Fulfilled & Ready
                        </span>
                      )}
                      {req.status === 'in_progress' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold bg-blue-100 text-blue-800">
                          <i className="fas fa-spinner fa-spin text-blue-600"></i> In-Progress (Govt Desk)
                        </span>
                      )}
                      {req.status === 'pending' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800">
                          <i className="fas fa-clock text-amber-600"></i> Verification Pending
                        </span>
                      )}
                      {req.status === 'rejected' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold bg-red-100 text-red-800">
                          <i className="fas fa-ban text-red-600"></i> Rejected
                        </span>
                      )}
                      <p className="text-[11px] text-slate-500 mt-1">
                        Tracking No: <span className="font-mono font-bold text-slate-700">{req.trackingNumber || 'Pending'}</span>
                      </p>
                    </div>
                  </div>

                  {/* Visual Progress Stepper */}
                  <div className="my-6 px-2">
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      {/* Step 1 */}
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold mb-1 shadow-xs">
                          <i className="fas fa-check"></i>
                        </div>
                        <span className="font-semibold text-slate-800 text-[11px]">Submitted</span>
                      </div>

                      {/* Step 2 */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-1 shadow-xs ${
                            req.status !== 'pending' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white animate-pulse'
                          }`}
                        >
                          {req.status !== 'pending' ? <i className="fas fa-check"></i> : '2'}
                        </div>
                        <span className="font-semibold text-slate-800 text-[11px]">Verification</span>
                      </div>

                      {/* Step 3 */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-1 shadow-xs ${
                            req.status === 'fulfilled'
                              ? 'bg-emerald-500 text-white'
                              : req.status === 'in_progress'
                              ? 'bg-blue-600 text-white animate-pulse'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {req.status === 'fulfilled' ? <i className="fas fa-check"></i> : '3'}
                        </div>
                        <span className="font-semibold text-slate-800 text-[11px]">Processing</span>
                      </div>

                      {/* Step 4 */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-1 shadow-xs ${
                            req.status === 'fulfilled'
                              ? 'bg-emerald-600 text-white'
                              : req.status === 'rejected'
                              ? 'bg-red-500 text-white'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {req.status === 'fulfilled' ? (
                            <i className="fas fa-certificate"></i>
                          ) : req.status === 'rejected' ? (
                            <i className="fas fa-times"></i>
                          ) : (
                            '4'
                          )}
                        </div>
                        <span className="font-semibold text-slate-800 text-[11px]">
                          {req.status === 'rejected' ? 'Rejected' : 'Fulfilled'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Remarks & Document Summary */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
                    <div>
                      <span className="font-bold text-slate-700 block mb-0.5">Operator Update / Remarks:</span>
                      <p className="text-slate-600 italic">
                        "{req.operatorRemarks || 'Your application is under queue. We will notify you once processed.'}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-slate-500">
                        <i className="fas fa-paperclip mr-1"></i> {req.documents?.length || 0} files attached
                      </span>
                      {req.status === 'fulfilled' && (
                        <a
                          href="/uploads/sample_doc.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg transition shadow-xs flex items-center gap-1.5"
                        >
                          <i className="fas fa-download"></i> Download Certificate
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: APPLY FOR NEW SERVICE WITH DOCUMENTS */}
        {/* ========================================================= */}
        {activeTab === 'apply' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
            {submissionSuccess ? (
              <div className="text-center py-10 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl mb-4">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h3 className="text-2xl font-bold text-chakra mb-2">Application Submitted Successfully!</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                  Your application for <strong>{submissionSuccess.serviceName}</strong> has been registered with ID:{' '}
                  <span className="font-mono font-bold text-primary">{submissionSuccess.id}</span>.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setSubmissionSuccess(null);
                      setActiveTab('requests');
                    }}
                    className="bg-chakra hover:bg-blue-900 text-white font-bold text-xs px-6 py-3 rounded-xl shadow transition"
                  >
                    View Status in My Requests
                  </button>
                  <button
                    onClick={() => setSubmissionSuccess(null)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-6 py-3 rounded-xl transition"
                  >
                    Apply for Another Service
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-8">
                {/* Section 1: Choose Service */}
                <div>
                  <h3 className="text-lg font-bold text-chakra mb-1 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">1</span>
                    <span>Select Government or Legal Service</span>
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Choose from over 30+ official Maha E-Seva Kendra documentation services.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Service Selection *</label>
                      <select
                        value={selectedServiceId}
                        onChange={(e) => setSelectedServiceId(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl p-3 text-sm font-semibold focus:ring-2 focus:ring-primary focus:outline-none bg-slate-50"
                      >
                        {servicesData.map((s) => (
                          <option key={s.id} value={s.id}>
                            [{s.category}] {s.title.en} ({s.title.mr || ''})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Auto-Loaded Required Documents list for selected service */}
                    <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200">
                      <span className="text-xs font-bold text-amber-800 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                        <i className="fas fa-clipboard-check"></i> Required Documents for {currentService.title.en}:
                      </span>
                      <ul className="list-disc list-inside text-xs text-amber-900 space-y-1">
                        {(currentService.docs?.en || ['Aadhaar Card', 'Address Proof', 'Passport Photo']).map((doc, idx) => (
                          <li key={idx} className="font-medium">{doc}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Section 2: Applicant Information */}
                <div>
                  <h3 className="text-lg font-bold text-chakra mb-1 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">2</span>
                    <span>Applicant Information</span>
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Provide accurate identity details matching your government proofs.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Name (as per Aadhaar) *</label>
                      <input
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number (WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Aadhaar Number (12 Digits)</label>
                      <input
                        type="text"
                        maxLength="12"
                        placeholder="XXXX XXXX XXXX"
                        value={aadhaarNumber}
                        onChange={(e) => setAadhaarNumber(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-xs font-mono focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Residential Address (PCMC / Pune)</label>
                      <input
                        type="text"
                        placeholder="e.g. Flat 102, Shanti Heights, Akurdi, Pune - 411035"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Section 3: Document Uploads */}
                <div>
                  <h3 className="text-lg font-bold text-chakra mb-1 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">3</span>
                    <span>Upload Required Verification Documents</span>
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Upload scanned PDFs or clear camera photos of your documents (PDF, JPG, PNG up to 15MB each).
                  </p>

                  <div className="border-2 border-dashed border-slate-300 hover:border-primary rounded-2xl p-6 text-center bg-slate-50/50 transition">
                    <input
                      type="file"
                      id="doc-upload"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="doc-upload" className="cursor-pointer block">
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto text-xl mb-2">
                        <i className="fas fa-cloud-upload-alt"></i>
                      </div>
                      <span className="text-sm font-bold text-chakra hover:underline">
                        Click here to select files or drag and drop
                      </span>
                      <p className="text-xs text-slate-400 mt-1">
                        Select multiple documents simultaneously (Aadhaar, Ration Card, Photo, Certificates)
                      </p>
                    </label>
                  </div>

                  {/* Uploaded Files Preview List */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <span className="text-xs font-bold text-slate-700">Selected Files ({uploadedFiles.length}):</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {uploadedFiles.map((file, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-2.5 bg-slate-100 rounded-lg text-xs"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <i className="fas fa-file text-primary"></i>
                              <span className="truncate font-medium text-slate-800">{file.name}</span>
                              <span className="text-slate-400 text-[10px]">({Math.round(file.size / 1024)} KB)</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(i)}
                              className="text-red-500 hover:text-red-700 ml-2"
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Section 4: Specific Remarks */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Special Remarks or Specific Requirements (Optional)
                  </label>
                  <textarea
                    rows="2"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Urgent processing needed for passport appointment / scholarship deadline..."
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                  ></textarea>
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    <i className="fas fa-shield-alt text-emerald-600 mr-1"></i> Data encrypted & securely submitted to Akurdi Kendra.
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-secondary hover:bg-green-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg transition transform hover:scale-105 flex items-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        <span>Uploading & Submitting...</span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        <span>Submit Application for Verification</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
