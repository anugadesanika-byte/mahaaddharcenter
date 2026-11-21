import React from 'react';

export default function AboutPage({ onNavigate }) {
  return (
    <div className="py-16 bg-white min-h-screen animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-chakra mb-3">About Arya Enterprises</h2>
          <div className="flex justify-center gap-1.5 mb-4">
            <div className="w-10 h-1.5 bg-primary rounded"></div>
            <div className="w-10 h-1.5 bg-white border border-gray-300 rounded"></div>
            <div className="w-10 h-1.5 bg-secondary rounded"></div>
          </div>
          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
            Your trusted partner for all government and legal documentation needs in Akurdi, PCMC, Pune.
          </p>
        </div>

        {/* Story Section */}
        <div className="flex flex-col md:flex-row gap-12 items-center max-w-6xl mx-auto mb-16">
          <div className="md:w-1/2 relative">
            <img
              src="images/aryaimage1.jpg"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/600x400?text=About+Office';
              }}
              className="rounded-2xl shadow-xl relative z-10 w-full border-4 border-white object-cover h-[380px]"
              alt="Arya Enterprises Office"
            />
            <div className="absolute -bottom-6 -left-4 bg-white p-5 rounded-xl shadow-xl z-20 border-l-4 border-primary">
              <p className="font-extrabold text-3xl text-chakra">14+ Years</p>
              <p className="text-xs text-gray-500 font-semibold tracking-wide">Of Trusted Citizen Service</p>
            </div>
          </div>

          <div className="md:w-1/2 space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-dark leading-snug">
              Simplifying Government Documentation for Citizens & Businesses
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Arya Enterprises is a premier Maha E-Seva Kendra and Multi-Services Center located at Jai Ganesh Vision, Akurdi, Pune. We bridge the gap between citizens and complicated government processes by providing a hassle-free, transparent, and prompt experience.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Whether you need urgent Aadhaar card updates, PAN cards, income certificates, caste validity, business shop acts (Gumasta), passport applications, or notary affidavits, our seasoned team handles every stage with accuracy.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <i className="fas fa-check-circle text-secondary text-xl"></i>
                <span className="font-semibold text-gray-800 text-sm">Expert Guidance</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <i className="fas fa-check-circle text-secondary text-xl"></i>
                <span className="font-semibold text-gray-800 text-sm">Fast Processing</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <i className="fas fa-check-circle text-secondary text-xl"></i>
                <span className="font-semibold text-gray-800 text-sm">Secure Data</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <i className="fas fa-check-circle text-secondary text-xl"></i>
                <span className="font-semibold text-gray-800 text-sm">Transparent Fees</span>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Grid */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 max-w-6xl mx-auto border border-gray-100">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-chakra">Why Citizens Trust Arya Enterprises</h3>
            <p className="text-gray-500 text-sm mt-1">Our core pillars of dedication and excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-primary flex items-center justify-center text-xl mb-4 font-bold">
                <i className="fas fa-user-shield"></i>
              </div>
              <h4 className="font-bold text-dark text-lg mb-2">100% Verified Processes</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                We strictly adhere to official government portals (Aaple Sarkar, UIDAI, Mahadbt, MCA) ensuring all forms are submitted authentically without errors.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-green-100 text-secondary flex items-center justify-center text-xl mb-4 font-bold">
                <i className="fas fa-clock"></i>
              </div>
              <h4 className="font-bold text-dark text-lg mb-2">Save Your Valuable Time</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Skip long queues and repeated visits to administrative offices. We track your application status from initiation to certificate delivery.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-chakra flex items-center justify-center text-xl mb-4 font-bold">
                <i className="fas fa-headset"></i>
              </div>
              <h4 className="font-bold text-dark text-lg mb-2">Instant WhatsApp Support</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Need to clarify required documents or check eligibility? Get immediate answers directly from our specialists via WhatsApp or call.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-primary hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-lg shadow-md transition transform hover:scale-105"
            >
              Get In Touch With Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

