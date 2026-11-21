import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function ServiceModal({ service, isOpen, onClose, onApplyOnline }) {
  const { lang, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    message: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !service) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceTitle = service.title[lang] || service.title.en;
    const waNumber = "917774946121";
    const waMessage = `Hello, I want to enquire about *${serviceTitle}*.\n\nName: ${formData.name}\nMobile: ${formData.mobile}\nMessage: ${formData.message}`;
    const waUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, '_blank');
    setFormData({ name: '', mobile: '', message: '' });
    onClose();
  };

  const docs = service.docs
    ? (service.docs[lang] || service.docs.en || [])
    : [];

  const eligibility = service.eligibility
    ? (service.eligibility[lang] || service.eligibility.en)
    : 'Contact center for detailed eligibility criteria.';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row border-t-8 border-primary"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full w-10 h-10 flex items-center justify-center transition z-10 focus:outline-none"
          aria-label="Close Service Modal"
        >
          <i className="fas fa-times text-lg"></i>
        </button>

        {/* Left Column: Service Details */}
        <div className="md:w-3/5 p-6 md:p-8 overflow-y-auto custom-scroll">
          <img
            src={service.image}
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/600x300?text=Service';
            }}
            alt={service.title[lang] || service.title.en}
            className="w-full h-48 object-cover rounded-lg mb-4 shadow-sm"
          />

          <span className="text-secondary font-bold text-xs uppercase tracking-wide">
            {service.category}
          </span>

          <h2 className="text-2xl md:text-3xl font-bold text-chakra mb-3 mt-1">
            {service.title[lang] || service.title.en}
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed text-sm">
            {service.desc[lang] || service.desc.en}
          </p>

          {/* Fast-Track Online Application Prompt */}
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border border-orange-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="inline-flex items-center gap-1.5 text-primary font-bold text-sm">
                <i className="fas fa-bolt text-secondary"></i> {t('fastTrackTitle')}
              </span>
              <span className="bg-primary text-white text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                {t('fastTrackBadge')}
              </span>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              {t('fastTrackDesc')}
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onApplyOnline) onApplyOnline(service.id);
              }}
              className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-2.5 px-4 rounded-lg shadow transition flex items-center justify-center gap-2 text-sm"
            >
              <i className="fas fa-file-arrow-up"></i>
              <span>{t('btnApplyOnlineWithDocs')}</span>
            </button>
          </div>

          {/* Documents Section */}
          <div className="mb-6 bg-light p-4 rounded-lg border border-primary/20">
            <h4 className="font-bold text-chakra border-b border-primary/20 pb-2 mb-3 text-sm uppercase flex items-center gap-2">
              <i className="fas fa-file-alt text-primary"></i>
              <span>{t('lblDocuments')}</span>
            </h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1.5">
              {docs.map((d, index) => (
                <li key={index}>{d}</li>
              ))}
            </ul>
          </div>

          {/* Eligibility Section */}
          <div>
            <h4 className="font-bold text-chakra border-b pb-2 mb-2 text-sm uppercase flex items-center gap-2">
              <i className="fas fa-check-circle text-secondary"></i>
              <span>{t('lblEligibility')}</span>
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">{eligibility}</p>
          </div>
        </div>

        {/* Right Column: WhatsApp Quick Enquiry Form */}
        <div className="md:w-2/5 bg-gray-50 p-6 md:p-8 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col justify-center">
          <div className="mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Instant Help</span>
            <h3 className="text-xl font-bold text-chakra flex items-center gap-2">
              <i className="fab fa-whatsapp text-green-500"></i>
              <span>{t('formTitle')}</span>
            </h3>
            <p className="text-xs text-gray-500 mt-1">{t('instantWaHelp')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                {t('formName')} *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border-gray-300 rounded p-2.5 text-sm border focus:ring-2 focus:ring-primary focus:outline-none bg-white"
                placeholder="e.g. Rahul Sharma"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                {t('formMobile')} *
              </label>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full border-gray-300 rounded p-2.5 text-sm border focus:ring-2 focus:ring-primary focus:outline-none bg-white"
                placeholder="10-digit mobile number"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                {t('formMessage')} *
              </label>
              <textarea
                rows="3"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full border-gray-300 rounded p-2.5 text-sm border focus:ring-2 focus:ring-primary focus:outline-none bg-white"
                placeholder="Write your questions or requirement here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-secondary hover:bg-green-700 text-white font-bold py-3 rounded shadow transition flex items-center justify-center gap-2"
            >
              <i className="fab fa-whatsapp text-lg"></i>
              <span>{t('btnSubmit')}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
