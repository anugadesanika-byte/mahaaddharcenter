import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { servicesData } from '../data/data';

export default function HeroSlider({ onOpenServiceModal }) {
  const { lang } = useLanguage();
  const trendingServices = servicesData.filter((s) => s.isTrending).slice(0, 3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trendingServices.length);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, [isPaused, trendingServices.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + trendingServices.length) % trendingServices.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % trendingServices.length);
  };

  return (
    <section
      className="relative h-[450px] bg-gray-900 overflow-hidden group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div id="hero-slider" className="relative h-full w-full">
        {trendingServices.map((service, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={service.id}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
              style={{ backgroundImage: `url(${service.image})` }}
            >
              {/* Dark Gradient Overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent flex items-center">
                <div className="container mx-auto px-6 md:px-12">
                  <div className="max-w-xl text-white space-y-4 animate-fade-in">
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                      {service.category} · Trending
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-white drop-shadow">
                      {service.title[lang] || service.title.en}
                    </h2>
                    <p className="text-gray-200 text-sm md:text-base line-clamp-3 leading-relaxed drop-shadow">
                      {service.desc[lang] || service.desc.en}
                    </p>
                    <div className="pt-2 flex gap-4">
                      <button
                        onClick={() => onOpenServiceModal(service)}
                        className="bg-secondary hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
                      >
                        Enquire Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-primary text-white p-3 rounded-full z-20 hover:scale-110 transition backdrop-blur-sm"
        aria-label="Previous Slide"
      >
        <i className="fas fa-chevron-left text-lg"></i>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-primary text-white p-3 rounded-full z-20 hover:scale-110 transition backdrop-blur-sm"
        aria-label="Next Slide"
      >
        <i className="fas fa-chevron-right text-lg"></i>
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
        {trendingServices.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === currentIndex ? 'bg-primary scale-125 w-8' : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

