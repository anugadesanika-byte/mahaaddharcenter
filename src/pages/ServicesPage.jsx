import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { categories, servicesData } from '../data/data';
import ServiceCard from '../components/ServiceCard';

export default function ServicesPage({ selectedCategory = 'all', onSelectCategory, onOpenServiceModal }) {
  const { lang, t } = useLanguage();
  const [currentCat, setCurrentCat] = useState(selectedCategory || 'all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategoryChange = (cat) => {
    setCurrentCat(cat);
    if (onSelectCategory) onSelectCategory(cat);
  };

  const filteredServices = servicesData.filter((service) => {
    const matchesCat = currentCat === 'all' || service.category === currentCat;
    if (!matchesCat) return false;

    if (!searchTerm.trim()) return true;

    const term = searchTerm.toLowerCase();
    const titleEn = (service.title.en || '').toLowerCase();
    const titleMr = (service.title.mr || '').toLowerCase();
    const titleHi = (service.title.hi || '').toLowerCase();
    const desc = (service.desc[lang] || service.desc.en || '').toLowerCase();
    return titleEn.includes(term) || titleMr.includes(term) || titleHi.includes(term) || desc.includes(term);
  });

  return (
    <div className="py-14 bg-gray-50 min-h-screen animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Page Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-50 px-3.5 py-1 rounded-full border border-green-200 mb-2">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="text-xs font-bold text-secondary uppercase tracking-widest">
              Official Aaple Sarkar & UIDAI Document Checklists
            </span>
            <span className="text-[10px] font-extrabold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              Max 1 MB
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-chakra mt-2 mb-3">
            {t('allServicesTitle')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            {t('allServicesSubtitle')}
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10 max-w-5xl mx-auto">
          {/* Quick Search */}
          <div className="relative mb-6 max-w-md mx-auto">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search services within category..."
              className="w-full pl-11 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times-circle"></i>
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-xs ${
                currentCat === 'all'
                  ? 'bg-chakra text-white scale-105 shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-light hover:text-primary'
              }`}
            >
              All Services ({servicesData.length})
            </button>
            {categories.map((cat) => {
              const count = servicesData.filter((s) => s.category === cat).length;
              const isActive = currentCat === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-xs ${
                    isActive
                      ? 'bg-primary text-white scale-105 shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-light hover:text-primary'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/30 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border max-w-xl mx-auto">
            <i className="fas fa-folder-open text-5xl text-gray-300 mb-4"></i>
            <h4 className="text-xl font-bold text-gray-700 mb-2">No services found</h4>
            <p className="text-gray-500 text-sm mb-6">
              Try adjusting your search keyword or switch to another category.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                handleCategoryChange('all');
              }}
              className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-600 transition"
            >
              View All Services
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onEnquire={onOpenServiceModal}
                onFilterCategory={handleCategoryChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

