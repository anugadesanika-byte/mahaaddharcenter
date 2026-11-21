import React, { useState, useEffect } from 'react';

export default function ContactOverlay() {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem('contactOverlayCollapsed') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('contactOverlayCollapsed', collapsed ? 'true' : 'false');
    } catch {
      // ignore
    }
  }, [collapsed]);

  return (
    <div
      id="contact-overlay"
      className={collapsed ? 'collapsed' : ''}
      aria-hidden="false"
    >
      <a
        id="wa-overlay"
        className="overlay-btn wa-btn"
        href="https://api.whatsapp.com/send?phone=917774946121"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <i className="fab fa-whatsapp text-lg"></i>
        <span className="overlay-text font-bold">WhatsApp</span>
      </a>

      <a
        id="call-overlay"
        className="overlay-btn call-btn"
        href="tel:+917620346620"
        aria-label="Call Arya Enterprises"
      >
        <i className="fas fa-phone-alt text-sm"></i>
        <span className="overlay-text font-bold">Call</span>
      </a>

      <button
        id="overlay-toggle"
        className="overlay-toggle"
        onClick={() => setCollapsed(!collapsed)}
        aria-expanded={!collapsed}
        aria-controls="contact-overlay"
        aria-label="Toggle contact options"
      >
        <i className={`fas ${collapsed ? 'fa-comments' : 'fa-times'} text-lg`}></i>
      </button>
    </div>
  );
}

