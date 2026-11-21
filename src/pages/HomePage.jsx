import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { categories, servicesData, blogData, galleryData } from '../data/data';
import HeroSlider from '../components/HeroSlider';
import ServiceCard from '../components/ServiceCard';

export default function HomePage({ onOpenServiceModal, onOpenMediaModal, onNavigate, onFilterCategory }) {
  const { lang, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Search logic across languages
  const filteredSearch = searchQuery.trim() === ''
    ? []
    : servicesData.filter((s) => {
        const q = searchQuery.toLowerCase();
        const enTitle = (s.title.en || '').toLowerCase();
        const mrTitle = (s.title.mr || '').toLowerCase();
        const hiTitle = (s.title.hi || '').toLowerCase();
        const desc = (s.desc[lang] || s.desc.en || '').toLowerCase();
        const cat = (s.category || '').toLowerCase();
        return enTitle.includes(q) || mrTitle.includes(q) || hiTitle.includes(q) || desc.includes(q) || cat.includes(q);
      });

  const trendingServices = servicesData.filter((s) => s.isTrending).slice(0, 8);
  const latestBlogs = blogData.slice(0, 3);
  const previewGallery = galleryData.slice(0, 4);

  const handleCategoryClick = (cat) => {
    onNavigate('services');
    if (onFilterCategory) onFilterCategory(cat);
  };

  return (
    <div className="animate-fade-in">
      {/* HERO SLIDER */}
      <HeroSlider onOpenServiceModal={onOpenServiceModal} />

      {/* SEARCH BAR */}
      <section className="relative z-20 -mt-8 mb-8 container mx-auto px-4">
        <div className="bg-white p-4 rounded-xl shadow-xl max-w-3xl mx-auto border border-gray-100 flex gap-2 search-ring">
          <div className="flex-grow relative">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-lg border-none focus:ring-0 text-gray-700 bg-transparent placeholder-gray-400 focus:outline-none"
              placeholder="Search for services (e.g., Aadhaar, Pan, License, Domicile)..."
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                aria-label="Clear Search"
              >
                <i className="fas fa-times-circle"></i>
              </button>
            )}
          </div>
          <button
            onClick={() => {
              if (searchQuery) {
                const el = document.getElementById('search-results-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-secondary hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold transition shadow-md hidden sm:block"
          >
            Search
          </button>
        </div>
      </section>

      {/* QUICK CATEGORY CHIPS */}
      <section className="py-2 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-3 pt-1">
            <button
              onClick={() => handleCategoryClick('all')}
              className="px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap bg-chakra text-white shadow-sm hover:scale-105 transition"
            >
              All Services
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className="px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-gray-100 hover:bg-light hover:text-primary text-gray-700 transition"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SEARCH RESULTS SECTION */}
      {searchQuery.trim() !== '' && (
        <section id="search-results-section" className="py-8 bg-gray-50 border-b animate-fade-in">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-chakra">
                Search Results ({filteredSearch.length})
              </h3>
              <button
                onClick={() => setSearchQuery('')}
                className="text-red-500 text-sm hover:underline font-semibold"
              >
                Clear Search
              </button>
            </div>
            {filteredSearch.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl p-8 border">
                <i className="fas fa-search text-4xl text-gray-300 mb-3"></i>
                <p className="text-gray-500">No services found matching "{searchQuery}". Try another keyword.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredSearch.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onEnquire={onOpenServiceModal}
                    onFilterCategory={handleCategoryClick}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* TRENDING SERVICES */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-8 bg-primary rounded"></div>
              <div>
                <h3 className="text-2xl font-bold text-dark">{t('trendingTitle')}</h3>
                <p className="text-xs text-gray-500 mt-0.5">Most requested documentation and certification services</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('services')}
              className="text-primary text-sm font-bold hover:underline"
            >
              View All Services &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onEnquire={onOpenServiceModal}
                onFilterCategory={handleCategoryClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* LATEST NEWS & UPDATES */}
      <section className="py-14 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-8 bg-chakra rounded"></div>
              <div>
                <h3 className="text-2xl font-bold text-dark">{t('blogTitle')}</h3>
                <p className="text-xs text-gray-500 mt-0.5">Government notices, scheme alerts, and guidelines</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('blog')}
              className="text-primary text-sm font-bold hover:underline"
            >
              View All Updates &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestBlogs.map((b, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 border border-gray-100 flex flex-col justify-between">
                <div>
                  <img
                    src={b.image}
                    alt={b.title}
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x250?text=News'; }}
                    className="w-full h-44 object-cover rounded-lg mb-3"
                    loading="lazy"
                  />
                  <div className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                    <span className="bg-light text-primary px-2 py-0.5 rounded font-semibold">{b.category}</span>
                    <span>·</span>
                    <span>{b.date}</span>
                  </div>
                  <h4 className="font-bold text-chakra mb-2 text-base line-clamp-2 hover:text-primary transition">{b.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{b.desc}</p>
                </div>
                <div className="pt-4 mt-2 border-t border-gray-50">
                  <button onClick={() => onNavigate('blog')} className="text-xs text-primary font-bold hover:underline">Read Details →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="py-14 bg-light border-t border-primary/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-8 bg-secondary rounded"></div>
              <div>
                <h3 className="text-2xl font-bold text-dark">Our Gallery</h3>
                <p className="text-xs text-gray-500 mt-0.5">Photos & moments from our Akurdi center</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('gallery')}
              className="text-secondary text-sm font-bold hover:underline"
            >
              View Gallery &rarr;
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {previewGallery.map((item, idx) => (
              <div
                key={idx}
                className="relative rounded-xl overflow-hidden shadow-md group cursor-pointer h-48 bg-gray-200"
                onClick={() => onOpenMediaModal(item)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300?text=Gallery'; }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-white font-bold text-sm line-clamp-1">{item.title}</span>
                  <span className="text-gray-300 text-xs line-clamp-1">{item.desc}</span>
                </div>
                {item.type === 'video' && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow">
                    Video
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

