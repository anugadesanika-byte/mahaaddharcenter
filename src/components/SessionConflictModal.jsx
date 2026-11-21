// src/components/SessionConflictModal.jsx
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function SessionConflictModal({
  isOpen,
  conflictData,
  onConfirmTerminate,
  onCancel,
  loading = false
}) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const deviceInfo = conflictData?.existingSession?.deviceInfo || 'Another Device / Browser';
  const loginTime = conflictData?.existingSession?.loginTime
    ? new Date(conflictData.existingSession.loginTime).toLocaleString()
    : 'Recently';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-amber-200 overflow-hidden transform transition-all animate-scale-up"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Warning Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-6 py-4 text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-xl shrink-0">
            <i className="fas fa-desktop-slash"></i>
          </div>
          <div>
            <span className="text-[10px] font-black tracking-widest uppercase bg-white/25 px-2 py-0.5 rounded-full">
              Single-Session Security
            </span>
            <h3 className="text-base font-extrabold leading-tight mt-0.5">
              Concurrent Session Detected
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Main User Prompt Title */}
          <div className="text-center my-2">
            <div className="inline-block px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold mb-2">
              ⚠️ Active Login Conflict
            </div>
            <h2 className="text-xl font-black text-slate-900 leading-snug">
              &ldquo;You want to terminate Another Session &rdquo;
            </h2>
            <p className="text-xs text-slate-600 mt-2">
              {t('sessionConflictSubtitle') ||
                'An active login session for this account is already running on another device or browser.'}
            </p>
          </div>

          {/* Active Session Summary Card */}
          <div className="my-5 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-600">
              <span className="font-semibold flex items-center gap-1.5">
                <i className="fas fa-laptop text-primary"></i>
                <span>{t('sessionConflictExisting') || 'Active Device'}:</span>
              </span>
              <span className="font-bold text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                {deviceInfo}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="font-semibold flex items-center gap-1.5">
                <i className="fas fa-clock text-amber-500"></i>
                <span>{t('sessionConflictLoginAt') || 'Session Started'}:</span>
              </span>
              <span className="text-slate-700 font-medium">{loginTime}</span>
            </div>
            <div className="pt-2 border-t border-slate-200/80 text-[11px] text-amber-800 flex items-start gap-1.5">
              <i className="fas fa-info-circle mt-0.5 shrink-0"></i>
              <span>
                {t('sessionConflictQuestion') ||
                  'If you proceed, the previous device will be logged out immediately in real time.'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition focus:outline-none"
            >
              {t('btnTerminateCancel') || 'Cancel'}
            </button>
            <button
              type="button"
              onClick={onConfirmTerminate}
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-xs shadow-md shadow-orange-500/25 transition focus:outline-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  <span>Terminating...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-sign-out-alt"></i>
                  <span>{t('btnTerminateYes') || 'Yes, Terminate'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
