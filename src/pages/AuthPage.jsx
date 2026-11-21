// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import SessionConflictModal from '../components/SessionConflictModal';

export default function AuthPage({ onNavigate, initialMode = 'login' }) {
  const { login, register, loading } = useAuth();
  const { lang, t } = useLanguage();
  const [mode, setMode] = useState(initialMode); // 'login' | 'register' | 'admin'

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Single active session conflict popup state
  const [conflictModalOpen, setConflictModalOpen] = useState(false);
  const [conflictData, setConflictData] = useState(null);
  const [terminating, setTerminating] = useState(false);

  const fillDemoAdmin = () => {
    setMode('admin');
    setEmail('admin@aryaseva.com');
    setPassword('admin123');
    setErrorMsg('');
  };

  const fillDemoCustomer = () => {
    setMode('login');
    setEmail('customer@example.com');
    setPassword('customer123');
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      if (mode === 'register') {
        const res = await register({ name, email, phone, password });
        onNavigate('portal');
      } else {
        const res = await login(email, password, false);
        // Check for concurrent session conflict on another device
        if (res && res.sessionConflict) {
          setConflictData(res);
          setConflictModalOpen(true);
          return;
        }

        if (res && res.user) {
          if (res.user.role === 'admin') {
            onNavigate('admin');
          } else {
            onNavigate('portal');
          }
        }
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    }
  };

  // User confirmed "Yes, Terminate Session"
  const handleConfirmTerminate = async () => {
    setTerminating(true);
    try {
      const res = await login(email, password, true); // forceTerminate = true
      setTerminating(false);
      setConflictModalOpen(false);

      if (res && res.user) {
        if (res.user.role === 'admin') {
          onNavigate('admin');
        } else {
          onNavigate('portal');
        }
      }
    } catch (err) {
      setTerminating(false);
      setConflictModalOpen(false);
      setErrorMsg(err.message || 'Failed to terminate other session. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 flex items-center justify-center animate-fade-in">
      <div className="max-w-md w-full">
        {/* Portal Logo & Header */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center gap-2 cursor-pointer mb-2"
            onClick={() => onNavigate('home')}
          >
            <img src="images/logo.jpeg" alt="Arya Enterprises" className="h-16 w-auto object-contain" />
            <div className="text-left">
              <h1 className="text-xl font-extrabold text-3d-tri leading-tight">Arya Enterprises</h1>
              <p className="text-[10px] text-secondary font-bold tracking-wider">Maha E-Seva Kendra</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Government of Maharashtra & Citizen Authentication Portal
          </p>
        </div>

        {/* Quick Demo Fill Pills */}
        <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 mb-6 text-xs text-amber-900 shadow-xs">
          <div className="font-bold flex items-center gap-1.5 mb-2">
            <i className="fas fa-magic text-primary"></i>
            <span>Instant Demo Login (1-Click Fill):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={fillDemoAdmin}
              className="px-3 py-1 bg-white hover:bg-chakra hover:text-white border border-amber-300 rounded-lg font-bold text-chakra transition"
            >
              👑 {t('demoAdminFill')}
            </button>
            <button
              type="button"
              onClick={fillDemoCustomer}
              className="px-3 py-1 bg-white hover:bg-secondary hover:text-white border border-amber-300 rounded-lg font-bold text-secondary transition"
            >
              👤 {t('demoCitizenFill')}
            </button>
          </div>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-3 text-center text-xs font-bold border-b border-slate-100 bg-slate-50">
            <button
              onClick={() => {
                setMode('login');
                setErrorMsg('');
              }}
              className={`py-3.5 transition ${
                mode === 'login'
                  ? 'bg-white text-primary border-b-2 border-primary'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {t('authCitizenLogin')}
            </button>
            <button
              onClick={() => {
                setMode('register');
                setErrorMsg('');
              }}
              className={`py-3.5 transition ${
                mode === 'register'
                  ? 'bg-white text-primary border-b-2 border-primary'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {t('authCitizenRegister')}
            </button>
            <button
              onClick={() => {
                setMode('admin');
                setErrorMsg('');
              }}
              className={`py-3.5 transition flex items-center justify-center gap-1.5 ${
                mode === 'admin'
                  ? 'bg-chakra text-white'
                  : 'text-slate-500 hover:text-chakra'
              }`}
            >
              <i className="fas fa-shield-alt text-[10px]"></i>
              <span>{t('authAdminLogin')}</span>
            </button>
          </div>

          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-chakra">
                {mode === 'login' && 'Sign In to Citizen Account'}
                {mode === 'register' && 'Create Your Citizen Account'}
                {mode === 'admin' && 'Authorized Administrator Sign In'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {mode === 'login' && 'Access your document tracking, certificate downloads, and service history.'}
                {mode === 'register' && 'Register once to apply for certificates, shop act licenses, and schemes.'}
                {mode === 'admin' && 'Restricted portal for Kendra staff to review analytics & fulfill citizen requests.'}
              </p>
            </div>

            {errorMsg && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <i className="fas fa-exclamation-triangle shrink-0"></i>
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Patil"
                    className="w-full border border-slate-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              )}

              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full border border-slate-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {mode === 'admin' ? 'Admin Email Address *' : 'Email Address *'}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={mode === 'admin' ? 'admin@aryaseva.com' : 'you@example.com'}
                  className="w-full border border-slate-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password *</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-slate-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading || terminating}
                className={`w-full py-3.5 rounded-xl font-bold text-white text-sm shadow-md transition transform hover:scale-[1.02] flex items-center justify-center gap-2 ${
                  mode === 'admin'
                    ? 'bg-chakra hover:bg-blue-900'
                    : 'bg-primary hover:bg-orange-600'
                }`}
              >
                {loading || terminating ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <i className={`fas ${mode === 'register' ? 'fa-user-plus' : 'fa-sign-in-alt'}`}></i>
                )}
                <span>
                  {mode === 'login' && t('btnSignIn')}
                  {mode === 'register' && t('btnRegister')}
                  {mode === 'admin' && t('authAdminLogin')}
                </span>
              </button>
            </form>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500">
            <i className="fas fa-lock mr-1 text-emerald-600"></i> SSL 256-Bit Encrypted Government Data Security
          </div>
        </div>
      </div>

      {/* Concurrent Session Prompt Modal: "You want to terminate Another Session " */}
      <SessionConflictModal
        isOpen={conflictModalOpen}
        conflictData={conflictData}
        loading={terminating}
        onConfirmTerminate={handleConfirmTerminate}
        onCancel={() => setConflictModalOpen(false)}
      />
    </div>
  );
}
