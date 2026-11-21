import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactOverlay from './components/ContactOverlay';
import ServiceModal from './components/ServiceModal';
import MediaModal from './components/MediaModal';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import CustomerPortal from './pages/CustomerPortal';
import AuthPage from './pages/AuthPage';
import SessionTerminatedModal from './components/SessionTerminatedModal';

function AppContent() {
  const { user, isAdmin, isCustomer, sessionTerminatedInfo, closeTerminatedModal } = useAuth();

  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const validPages = [
      'home',
      'services',
      'about',
      'gallery',
      'blog',
      'contact',
      'admin',
      'analytics',
      'portal',
      'auth',
      'apply'
    ];
    return validPages.includes(hash) ? hash : 'home';
  };

  const [activePage, setActivePage] = useState(getInitialPage);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [portalServiceId, setPortalServiceId] = useState(null);

  // Modal States
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  // Sync active page with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages = [
        'home',
        'services',
        'about',
        'gallery',
        'blog',
        'contact',
        'admin',
        'portal',
        'auth',
        'apply'
      ];
      if (validPages.includes(hash)) {
        setActivePage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page, categoryOrExtra = null) => {
    setActivePage(page);
    window.location.hash = page;
    if (page === 'services' && typeof categoryOrExtra === 'string') {
      setSelectedCategory(categoryOrExtra);
    }
    if ((page === 'portal' || page === 'apply') && categoryOrExtra) {
      setPortalServiceId(categoryOrExtra);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenServiceModal = (service) => {
    setSelectedService(service);
    setServiceModalOpen(true);
  };

  const handleOpenMediaModal = (media) => {
    setSelectedMedia(media);
    setMediaModalOpen(true);
  };

  const handleApplyOnline = (serviceId) => {
    setPortalServiceId(serviceId);
    setServiceModalOpen(false);
    navigateTo('portal', serviceId);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 antialiased font-sans">
      {/* Global Navbar with Mega-Menu & Auth state */}
      <Navbar
        activePage={activePage}
        setActivePage={navigateTo}
        onOpenServiceModal={handleOpenServiceModal}
      />

      {/* Main Page Routing */}
      <main className="flex-grow">
        {activePage === 'home' && (
          <HomePage
            onOpenServiceModal={handleOpenServiceModal}
            onOpenMediaModal={handleOpenMediaModal}
            onNavigate={navigateTo}
            onFilterCategory={(cat) => {
              setSelectedCategory(cat);
              navigateTo('services', cat);
            }}
          />
        )}

        {activePage === 'services' && (
          <ServicesPage
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onOpenServiceModal={handleOpenServiceModal}
          />
        )}

        {activePage === 'about' && <AboutPage onNavigate={navigateTo} />}

        {activePage === 'gallery' && (
          <GalleryPage onOpenMediaModal={handleOpenMediaModal} />
        )}

        {activePage === 'blog' && <BlogPage onNavigate={navigateTo} />}

        {activePage === 'contact' && <ContactPage />}

        {/* Admin Analytics & Request Management Dashboard */}
        {(activePage === 'admin' || activePage === 'analytics') && (
          <AdminDashboard
            onNavigate={navigateTo}
            initialSection={activePage === 'analytics' ? 'analytics' : 'requests'}
          />
        )}

        {/* Customer Portal: Service Application & Document Tracking */}
        {(activePage === 'portal' || activePage === 'apply') && (
          <CustomerPortal
            onNavigate={navigateTo}
            preSelectedServiceId={portalServiceId}
          />
        )}

        {/* Unified Authentication Portal */}
        {activePage === 'auth' && (
          <AuthPage
            onNavigate={navigateTo}
            initialMode="login"
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={navigateTo}
        onFilterCategory={(cat) => {
          setSelectedCategory(cat);
          navigateTo('services', cat);
        }}
      />

      {/* Persistent Floating WhatsApp & Call Speed-Dial */}
      <ContactOverlay />

      {/* Global Service Modal with Online Application integration */}
      <ServiceModal
        service={selectedService}
        isOpen={serviceModalOpen}
        onClose={() => setServiceModalOpen(false)}
        onApplyOnline={handleApplyOnline}
      />

      {/* Global Media Modal */}
      <MediaModal
        media={selectedMedia}
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
      />

      {/* Real-time Session Terminated Notification Modal */}
      <SessionTerminatedModal
        isOpen={sessionTerminatedInfo?.isOpen}
        message={sessionTerminatedInfo?.message}
        onClose={closeTerminatedModal}
        onReLogin={() => {
          closeTerminatedModal();
          navigateTo('auth');
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
