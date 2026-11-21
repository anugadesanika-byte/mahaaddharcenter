import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const waNumber = "917774946121";
    const waMessage = `*General Enquiry from Website*\n\nName: ${formData.name}\nPhone: ${formData.mobile}\nEmail: ${formData.email || 'N/A'}\nEnquiry Type / Subject: ${formData.subject}\nMessage: ${formData.message}`;
    const waUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, '_blank');
    setSubmitted(true);
    setFormData({ name: '', mobile: '', email: '', subject: '', message: '' });
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
            Have questions about document requirements, fees, or timelines? Visit our center or reach out directly.
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
                  Fast response on call and instant WhatsApp support during business hours.
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
                    <p className="font-bold text-xs uppercase tracking-wider text-light mb-1">Email Address</p>
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

            <div className="mt-8 pt-6 border-t border-white/15 relative z-10">
              <a
                href="https://api.whatsapp.com/send?phone=917774946121"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1faa52] text-white py-3 px-6 rounded-xl font-bold transition shadow-lg"
              >
                <i className="fab fa-whatsapp text-xl"></i>
                <span>Direct WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:w-2/3 bg-gray-50 p-8 md:p-10 rounded-2xl border border-gray-200">
            <h3 className="text-2xl font-bold text-chakra mb-2">Send Us an Enquiry</h3>
            <p className="text-gray-500 text-sm mb-6">
              Fill in your details below. We will instantly receive your query on WhatsApp and assist you.
            </p>

            {submitted && (
              <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded-xl text-sm flex items-center justify-between animate-fade-in">
                <span>Thank you! Your message has been prepared for WhatsApp chat.</span>
                <button onClick={() => setSubmitted(false)} className="text-green-700 font-bold ml-2">×</button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Amit Patil"
                    className="w-full border-gray-300 rounded-lg p-3 text-sm border focus:ring-2 focus:ring-primary focus:outline-none bg-white transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">10-Digit Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="e.g. 9876543210"
                    className="w-full border-gray-300 rounded-lg p-3 text-sm border focus:ring-2 focus:ring-primary focus:outline-none bg-white transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. name@example.com"
                    className="w-full border-gray-300 rounded-lg p-3 text-sm border focus:ring-2 focus:ring-primary focus:outline-none bg-white transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Service / Subject *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Domicile Certificate, PAN Card"
                    className="w-full border-gray-300 rounded-lg p-3 text-sm border focus:ring-2 focus:ring-primary focus:outline-none bg-white transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Your Message or Query *</label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your document requirement, urgency, or specific questions..."
                  className="w-full border-gray-300 rounded-lg p-3 text-sm border focus:ring-2 focus:ring-primary focus:outline-none bg-white transition"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-secondary hover:bg-green-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-md transition transform hover:scale-105 flex items-center gap-2"
              >
                <i className="fab fa-whatsapp text-lg"></i>
                <span>Submit Enquiry via WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

