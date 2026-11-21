// src/components/SessionTerminatedModal.jsx
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function SessionTerminatedModal({
  isOpen,
  message,
  onClose,
  onReLogin
}) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-red-200 overflow-hidden transform transition-all animate-scale-up"
        role="alertdialog"
        aria-modal="true"
      >
        {/* Danger Header */}
        <div className="bg-gradient-to-r from-red-600 to-rose-600 px-6 py-5 text-white flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shrink-0">
            <i className="fas fa-user-lock"></i>
          </div>
          <div>
            <span className="text-[10px] font-black tracking-widest uppercase bg-white/25 px-2 py-0.5 rounded-full">
              Real-Time Security Notice
            </span>
            <h3 className="text-lg font-extrabold leading-tight mt-0.5">
              {t('sessionTerminatedTitle') || 'Session Terminated'}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 border-2 border-red-100 flex items-center justify-center text-red-500 text-2xl">
            <i className="fas fa-desktop text-red-500"></i>
          </div>

          <h4 className="text-base font-extrabold text-slate-800 mb-2">
            Signed Out from Another Device
          </h4>

          <p className="text-xs text-slate-600 leading-relaxed mb-6">
            {message ||
              t('sessionTerminatedNotice') ||
              'Your session has been terminated because another session was started on a different device.'}
          </p>

          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-[11px] text-amber-900 text-left mb-6 flex items-start gap-2">
            <i className="fas fa-shield-alt text-amber-600 mt-0.5 shrink-0"></i>
            <span>
              Arya Enterprises Maha E-Seva Kendra enforces single active session policy for Aadhaar, citizen privacy, and administrative compliance.
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition focus:outline-none"
            >
              Dismiss
            </button>
            <button
              type="button"
              onClick={onReLogin}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-chakra to-blue-900 hover:from-blue-900 hover:to-chakra text-white font-black text-xs shadow-md transition focus:outline-none flex items-center justify-center gap-2"
            >
              <i className="fas fa-sign-in-alt"></i>
              <span>{t('btnSignInAgain') || 'Sign In Again'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
