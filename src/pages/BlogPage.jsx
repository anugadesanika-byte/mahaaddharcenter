import React, { useState } from 'react';
import { blogData } from '../data/data';

export default function BlogPage({ onNavigate }) {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="py-16 bg-gray-50 min-h-screen animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full border border-green-200">
            Government Schemes & Rule Alerts
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-chakra mt-3 mb-2">
            Latest Updates & News
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
            Stay informed about new government regulations, registration deadlines, and certificate validity procedures.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogData.map((post, index) => (
            <article
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/600x400?text=News+Update';
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-chakra font-bold text-xs px-3 py-1 rounded-full shadow-xs">
                    {post.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="text-xs text-gray-400 font-medium mb-2 flex items-center gap-2">
                    <i className="far fa-calendar-alt text-primary"></i>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="font-bold text-dark text-lg mb-3 leading-snug hover:text-primary transition">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {post.desc}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-gray-50 flex justify-between items-center">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-primary font-bold text-sm hover:underline flex items-center gap-1"
                >
                  <span>Read Full Article</span>
                  <i className="fas fa-arrow-right text-xs"></i>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Read Article Modal */}
        {selectedPost && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedPost(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 relative shadow-2xl border-t-8 border-primary max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full w-10 h-10 flex items-center justify-center transition"
                aria-label="Close Article Modal"
              >
                <i className="fas fa-times"></i>
              </button>

              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-56 object-cover rounded-xl mb-4"
              />

              <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                <span className="bg-light text-primary font-bold px-2.5 py-1 rounded-full">{selectedPost.category}</span>
                <span>·</span>
                <span>{selectedPost.date}</span>
              </div>

              <h3 className="text-2xl font-bold text-chakra mb-4">{selectedPost.title}</h3>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-line mb-6">
                {selectedPost.desc}
              </p>

              <div className="bg-gray-50 p-4 rounded-xl border flex flex-col sm:flex-row justify-between items-center gap-3">
                <span className="text-sm font-semibold text-gray-700">Need help applying for this scheme?</span>
                <button
                  onClick={() => {
                    setSelectedPost(null);
                    onNavigate('contact');
                  }}
                  className="bg-secondary hover:bg-green-700 text-white font-bold px-5 py-2 rounded-lg text-sm shadow transition"
                >
                  Contact Our Center
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

