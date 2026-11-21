import React from 'react';

export default function Footer({ onNavigate, onFilterCategory }) {
  const handleServiceClick = (category) => {
    onNavigate('services');
    if (onFilterCategory) {
      onFilterCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-chakra text-white pt-16 pb-8 border-t-8 border-secondary relative overflow-hidden mt-auto" id="footer">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & About */}
          <div>
            <h4 className="text-xl font-extrabold mb-4 text-primary">Arya Enterprises</h4>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Your trusted partner for all government and legal documentation needs. We simplify the process of obtaining essential certificates, licenses, and online forms with expert guidance and transparency.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition transform hover:scale-110"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition transform hover:scale-110"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=917774946121"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500 hover:text-white transition transform hover:scale-110"
                aria-label="WhatsApp"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white border-b-2 border-primary inline-block pb-1">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-primary transition flex items-center gap-2">
                  <i className="fas fa-angle-right text-xs"></i> Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-primary transition flex items-center gap-2">
                  <i className="fas fa-angle-right text-xs"></i> Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-primary transition flex items-center gap-2">
                  <i className="fas fa-angle-right text-xs"></i> All Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-primary transition flex items-center gap-2">
                  <i className="fas fa-angle-right text-xs"></i> Latest News
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-primary transition flex items-center gap-2">
                  <i className="fas fa-angle-right text-xs"></i> Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Services Category shortcuts */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white border-b-2 border-secondary inline-block pb-1">Our Services</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <button onClick={() => handleServiceClick('Identity')} className="hover:text-secondary transition flex items-center gap-2 text-left">
                  <i className="fas fa-id-card text-xs opacity-50"></i> Identity Documents
                </button>
              </li>
              <li>
                <button onClick={() => handleServiceClick('Business')} className="hover:text-secondary transition flex items-center gap-2 text-left">
                  <i className="fas fa-store text-xs opacity-50"></i> Shop Act & Licenses
                </button>
              </li>
              <li>
                <button onClick={() => handleServiceClick('Certificates')} className="hover:text-secondary transition flex items-center gap-2 text-left">
                  <i className="fas fa-file-contract text-xs opacity-50"></i> Govt Certificates
                </button>
              </li>
              <li>
                <button onClick={() => handleServiceClick('Financial')} className="hover:text-secondary transition flex items-center gap-2 text-left">
                  <i className="fas fa-rupee-sign text-xs opacity-50"></i> Financial Services
                </button>
              </li>
              <li>
                <button onClick={() => handleServiceClick('Police/Legal')} className="hover:text-secondary transition flex items-center gap-2 text-left">
                  <i className="fas fa-gavel text-xs opacity-50"></i> Legal Affidavits
                </button>
              </li>
            </ul>
          </div>

          {/* Visit Us */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white border-b-2 border-primary inline-block pb-1">Visit Us</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt mt-1 text-primary"></i>
                <span>B-81, Upper Ground, HDFC Bank, Below INOX, Jai Ganesh Vision, Akurdi, Pune – 411035</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-phone-alt text-secondary"></i>
                <a href="tel:+917620346620" className="hover:underline">+91 7620346620</a>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-envelope text-primary"></i>
                <a href="mailto:anugadesanika@gmail.com" className="hover:underline">anugadesanika@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-clock text-gray-400"></i>
                <span>Mon - Sat: 10 AM - 8 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} <span className="text-white font-bold">Arya Enterprises</span>. All Rights Reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-400">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

