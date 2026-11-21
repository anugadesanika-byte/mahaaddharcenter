import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function ServiceCard({ service, onEnquire, onFilterCategory }) {
  const { lang } = useLanguage();

  return (
    <div className="bg-white rounded-xl p-4 shadow hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-gray-100 hover:-translate-y-1">
      <div>
        <div className="relative mb-3 overflow-hidden rounded-lg h-44 bg-gray-100">
          <img
            src={service.image}
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/400x250?text=Service';
            }}
            alt={service.title[lang] || service.title.en}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
          {service.isNew && (
            <span className="absolute top-2 right-2 text-xs font-bold bg-primary text-white px-2.5 py-1 rounded-full shadow">
              New
            </span>
          )}
          <span className="absolute bottom-2 left-2 text-xs font-semibold bg-black/60 text-white px-2 py-0.5 rounded backdrop-blur-xs">
            {service.category}
          </span>
        </div>

        <h4 className="font-bold text-chakra text-lg mb-1 line-clamp-1 hover:text-primary transition">
          {service.title[lang] || service.title.en}
        </h4>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {service.desc[lang] || service.desc.en}
        </p>
      </div>

      <div className="flex gap-2 pt-2 border-t border-gray-100">
        <button
          onClick={() => onEnquire(service)}
          className="flex-1 px-3 py-2 bg-secondary hover:bg-green-700 text-white font-semibold rounded text-sm transition shadow-xs text-center"
        >
          Enquire
        </button>
        {onFilterCategory && (
          <button
            onClick={() => onFilterCategory(service.category)}
            className="px-3 py-2 border border-gray-200 hover:border-primary hover:text-primary text-gray-600 rounded text-sm transition text-center"
          >
            {service.category}
          </button>
        )}
      </div>
    </div>
  );
}

