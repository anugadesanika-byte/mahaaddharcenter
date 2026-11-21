import React from 'react';
import { galleryData } from '../data/data';

export default function GalleryPage({ onOpenMediaModal }) {
  return (
    <div className="py-16 bg-gray-50 min-h-screen animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Center Photos & Guides
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-chakra mt-3 mb-2">
            Media Gallery
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
            Glimpses of our center, citizen support desks, biometric operations, and educational process guides.
          </p>
        </div>

        {/* Masonry Columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-6xl mx-auto">
          {galleryData.map((item, index) => (
            <div
              key={index}
              onClick={() => onOpenMediaModal(item)}
              className="break-inside-avoid relative rounded-2xl overflow-hidden shadow-md group cursor-pointer bg-white border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative overflow-hidden bg-gray-100">
                <img
                  src={item.src}
                  alt={item.title}
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/600x400?text=Gallery+Item';
                  }}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Video Play Overlay */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition group-hover:bg-black/20">
                    <div className="w-16 h-16 rounded-full bg-white/90 text-primary flex items-center justify-center shadow-lg transition transform group-hover:scale-110">
                      <i className="fas fa-play text-xl ml-1"></i>
                    </div>
                  </div>
                )}

                {/* Type Badge */}
                <span
                  className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full shadow-md ${
                    item.type === 'video'
                      ? 'bg-red-600 text-white'
                      : 'bg-black/60 text-white backdrop-blur-xs'
                  }`}
                >
                  {item.type === 'video' ? 'Video Guide' : 'Photo'}
                </span>
              </div>

              {/* Caption */}
              <div className="p-5">
                <h4 className="font-bold text-chakra text-lg mb-1 group-hover:text-primary transition">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

