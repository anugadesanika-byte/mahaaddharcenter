import React, { useState } from 'react';
import { api } from '../services/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [clientErrors, setClientErrors] = useState({});

  // Client-side validation before hitting the backend API
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please enter your full name (at least 2 characters).';
    }
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address so we can reply to you.';
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 2) {
      errors.subject = 'Please specify the service or subject of your enquiry.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errors.message = 'Please write a message with at least 5 characters.';
    }
    setClientErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return; // Prevent double submission

    if (!validateForm()) {
      return;
    }

    setStatus('submitting');
    setFeedbackMessage('');

    try {
      const response = await api.sendContactEmail({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.mobile.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim()
      });

      setStatus('success');
      setFeedbackMessage(
        response.message || 'Your message has been sent successfully! Our center team will reply to your email shortly.'
      );
      setFormData({ name: '', mobile: '', email: '', subject: '', message: '' });
      setClientErrors({});
    } catch (err) {
      setStatus('error');
      setFeedbackMessage(
        err.message || 'Unable to send message via email at this moment. Please try again or reach out directly on WhatsApp.'
      );
    }
  };

  const handleWhatsAppDirect = () => {
    const waNumber = '917774946121';
    const waMessage = `*General Enquiry from Website*\n\nName: ${formData.name || 'Visitor'}\nPhone: ${formData.mobile || 'N/A'}\nEmail: ${formData.email || 'N/A'}\nSubject: ${formData.subject || 'General Enquiry'}\nMessage: ${formData.message || 'I would like to enquire about your services.'}`;
    const waUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, '_blank');
  };

  const handleGmailDirect = () => {
    const to = 'anugadesanika@gmail.com';
    const subject = formData.subject ? `[Citizen Enquiry] ${formData.subject}` : 'Citizen Enquiry - Maha E-Seva Kendra';
    const body = `Hello Maha E-Seva Kendra Team,\n\nApplicant Name: ${formData.name || 'Citizen'}\nContact Phone: ${formData.mobile || 'N/A'}\nApplicant Email: ${formData.email || 'N/A'}\n\nEnquiry / Requirement Details:\n${formData.message || 'I would like to enquire about your services, eligibility, and required documents.'}\n\nThank you!`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-16 bg-white min-h-screen animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-chakra uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Akurdi · PCMC · Pune
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-chakra mt-3 mb-2">
            Get In Touch
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
            Have questions about government certificate requirements, fees, or timelines? Send an official enquiry or chat with our operators.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
          {/* Left Column: Contact Information */}
          <div className="lg:w-1/3 bg-chakra text-white p-8 rounded-2xl shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>

            <div className="relative z-10 space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-white">Contact Information</h3>
                <p className="text-gray-300 text-xs leading-relaxed">
                  Fast response by email and instant WhatsApp support during Kendra business hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <p className="font-bold text-xs uppercase tracking-wider text-light mb-1">Our Center Address</p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      B-81, Upper Ground, HDFC Bank, Below INOX, Jai Ganesh Vision, Akurdi, Pune – 411035
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-secondary">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <p className="font-bold text-xs uppercase tracking-wider text-light mb-1">Call Us</p>
                    <p className="text-gray-300 text-sm font-semibold">
                      <a href="tel:+917774946121" className="hover:underline">+91 7774946121</a> / <a href="tel:+917620346620" className="hover:underline">+91 7620346620</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <p className="font-bold text-xs uppercase tracking-wider text-light mb-1">Official Email</p>
                    <p className="text-gray-300 text-sm">
                      <a href="mailto:anugadesanika@gmail.com" className="hover:underline">anugadesanika@gmail.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-gray-300">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <p className="font-bold text-xs uppercase tracking-wider text-light mb-1">Working Hours</p>
                    <p className="text-gray-300 text-sm">Monday – Saturday: 10:00 AM – 08:00 PM</p>
                    <p className="text-gray-400 text-xs mt-0.5">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15 relative z-10 space-y-2">
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1faa52] text-white py-3 px-6 rounded-xl font-bold transition shadow-lg text-sm"
              >
                <i className="fab fa-whatsapp text-lg"></i>
                <span>Direct WhatsApp Chat</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form with Resend HTTPS API Integration */}
          <div className="lg:w-2/3 bg-gray-50 p-8 md:p-10 rounded-2xl border border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <h3 className="text-2xl font-bold text-chakra">Send Us an Enquiry</h3>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-orange-100 text-primary px-3 py-1 rounded-full border border-orange-200">
                <i className="fas fa-bolt"></i> Official Resend Email API
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              Fill in your details below. Your message will be securely dispatched to our center operations team.
            </p>

            {/* Success State Notification */}
            {status === 'success' && (
              <div className="mb-6 p-5 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl text-sm flex items-start justify-between gap-3 shadow-xs animate-fade-in">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <i className="fas fa-check"></i>
                  </div>
                  <div>
                    <p className="font-bold text-emerald-950 text-base">Enquiry Sent Successfully!</p>
                    <p className="text-emerald-800 text-xs mt-1 leading-relaxed">{feedbackMessage}</p>
                    <p className="text-emerald-700 text-[11px] mt-2 font-medium">
                      Need an immediate answer? You can also message us directly on WhatsApp with your query.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="text-emerald-700 hover:text-emerald-900 font-bold p-1"
                  aria-label="Dismiss success message"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            )}

            {/* Error State Notification */}
            {status === 'error' && (
              <div className="mb-6 p-5 bg-rose-50 border border-rose-300 text-rose-900 rounded-2xl text-sm flex items-start justify-between gap-3 shadow-xs animate-fade-in">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <i className="fas fa-exclamation-triangle"></i>
                  </div>
                  <div>
                    <p className="font-bold text-rose-950 text-base">Failed to Send Email</p>
                    <p className="text-rose-800 text-xs mt-1 leading-relaxed">{feedbackMessage}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleWhatsAppDirect}
                        className="bg-[#25D366] hover:bg-[#1faa52] text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-xs transition inline-flex items-center gap-1.5"
                      >
                        <i className="fab fa-whatsapp"></i> Chat on WhatsApp Instead
                      </button>
                      <button
                        type="button"
                        onClick={() => setStatus('idle')}
                        className="text-xs text-rose-700 font-semibold underline hover:text-rose-900"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="text-rose-700 hover:text-rose-900 font-bold p-1"
                  aria-label="Dismiss error message"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            )}

            <form onSubmit={handleEmailSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (clientErrors.name) setClientErrors({ ...clientErrors, name: null });
                    }}
                    placeholder="e.g. Amit Patil"
                    disabled={status === 'submitting'}
                    className={`w-full rounded-lg p-3 text-sm border focus:ring-2 focus:ring-primary focus:outline-none bg-white transition ${
                      clientErrors.name ? 'border-red-500 bg-red-50/20' : 'border-gray-300'
                    }`}
                  />
                  {clientErrors.name && (
                    <p className="text-red-600 text-[11px] mt-1 font-medium">{clientErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Your Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (clientErrors.email) setClientErrors({ ...clientErrors, email: null });
                    }}
                    placeholder="e.g. amit.patil@example.com"
                    disabled={status === 'submitting'}
                    className={`w-full rounded-lg p-3 text-sm border focus:ring-2 focus:ring-primary focus:outline-none bg-white transition ${
                      clientErrors.email ? 'border-red-500 bg-red-50/20' : 'border-gray-300'
                    }`}
                  />
                  {clientErrors.email && (
                    <p className="text-red-600 text-[11px] mt-1 font-medium">{clientErrors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Mobile Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="e.g. 9822334455"
                    disabled={status === 'submitting'}
                    className="w-full border-gray-300 rounded-lg p-3 text-sm border focus:ring-2 focus:ring-primary focus:outline-none bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Service / Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (clientErrors.subject) setClientErrors({ ...clientErrors, subject: null });
                    }}
                    placeholder="e.g. Domicile Certificate, PAN Card, Shop Act"
                    disabled={status === 'submitting'}
                    className={`w-full rounded-lg p-3 text-sm border focus:ring-2 focus:ring-primary focus:outline-none bg-white transition ${
                      clientErrors.subject ? 'border-red-500 bg-red-50/20' : 'border-gray-300'
                    }`}
                  />
                  {clientErrors.subject && (
                    <p className="text-red-600 text-[11px] mt-1 font-medium">{clientErrors.subject}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Your Message or Document Requirements <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (clientErrors.message) setClientErrors({ ...clientErrors, message: null });
                  }}
                  placeholder="Describe your document requirement, questions about eligibility, or urgency..."
                  disabled={status === 'submitting'}
                  className={`w-full rounded-lg p-3 text-sm border focus:ring-2 focus:ring-primary focus:outline-none bg-white transition ${
                    clientErrors.message ? 'border-red-500 bg-red-50/20' : 'border-gray-300'
                  }`}
                ></textarea>
                {clientErrors.message && (
                  <p className="text-red-600 text-[11px] mt-1 font-medium">{clientErrors.message}</p>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={`w-full sm:w-auto font-bold py-3.5 px-8 rounded-xl shadow-md transition transform flex items-center justify-center gap-2.5 text-sm ${
                    status === 'submitting'
                      ? 'bg-slate-400 text-white cursor-not-allowed opacity-80'
                      : 'bg-primary hover:bg-orange-600 text-white hover:scale-102 active:scale-98'
                  }`}
                >
                  {status === 'submitting' ? (
                    <>
                      <i className="fas fa-spinner fa-spin text-base"></i>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane text-base"></i>
                      <span>Send Official Enquiry Email</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleGmailDirect}
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto bg-white hover:bg-red-50 text-red-700 border border-red-200 font-bold py-3.5 px-6 rounded-xl transition text-sm flex items-center justify-center gap-2"
                  title="Open pre-filled enquiry draft in Gmail"
                >
                  <i className="fas fa-envelope text-red-500"></i>
                  <span>Open in Gmail</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto bg-white hover:bg-green-50 text-emerald-700 border border-emerald-300 font-bold py-3.5 px-6 rounded-xl transition text-sm flex items-center justify-center gap-2"
                >
                  <i className="fab fa-whatsapp text-lg text-[#25D366]"></i>
                  <span>Or Message on WhatsApp</span>
                </button>
              </div>

              <p className="text-[11px] text-gray-500 pt-1">
                <i className="fas fa-lock mr-1 text-gray-400"></i> Your details are delivered directly to Kendra management via encrypted HTTPS API and will never be shared.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
