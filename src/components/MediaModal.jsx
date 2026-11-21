import React, { useEffect } from 'react';

export default function MediaModal({ media, isOpen, onClose }) {
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

  if (!isOpen || !media) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-primary transition p-2 focus:outline-none"
          aria-label="Close Lightbox"
        >
          <i className="fas fa-times text-2xl"></i>
        </button>

        {media.type === 'video' ? (
          <div className="relative w-full aspect-video bg-black flex items-center justify-center rounded-lg overflow-hidden border-2 border-white/20 shadow-2xl">
            <img
              src={media.src}
              alt={media.title}
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <div className="relative z-10 flex flex-col items-center gap-3">
              <i className="fas fa-play-circle text-6xl text-white animate-pulse"></i>
              <p className="text-white font-bold text-lg drop-shadow">Video Preview</p>
            </div>
          </div>
        ) : (
          <img
            src={media.src}
            alt={media.title}
            className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border-4 border-white/20"
          />
        )}

        <div className="text-center text-white mt-4 max-w-2xl">
          <h3 className="font-bold text-lg md:text-xl text-primary drop-shadow">{media.title}</h3>
          <p className="text-gray-300 text-sm mt-1">{media.desc}</p>
        </div>
      </div>
    </div>
  );
}

