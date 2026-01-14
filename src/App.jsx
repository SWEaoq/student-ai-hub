import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AnimatedBackground from './components/ui/AnimatedBackground';
import ParticleSystem from './components/ui/ParticleSystem';
import MouseFollower from './components/ui/MouseFollower';
import PageTransition from './components/animations/PageTransition';
import ScrollToTop from './components/ui/ScrollToTop';
import { ToastProvider } from './components/ui/ToastProvider';
import { SiteContentProvider, useSiteContent } from './hooks/useSiteContent';
import ErrorBoundary from './components/layout/ErrorBoundary';
import Footer from './components/layout/Footer';
import Skeleton from './components/ui/Skeleton';

import AIChatAssistant from './components/ui/AIChatAssistant';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Tools = lazy(() => import('./pages/Tools'));
const Playbook = lazy(() => import('./pages/Playbook'));
const Prompts = lazy(() => import('./pages/Prompts'));
const ToolDetail = lazy(() => import('./pages/ToolDetail'));
const PlaybookDetail = lazy(() => import('./pages/PlaybookDetail'));
const Academy = lazy(() => import('./pages/Academy'));
const AcademyCategory = lazy(() => import('./pages/AcademyCategory'));
const AcademyTutorial = lazy(() => import('./pages/AcademyTutorial'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

function AppContent() {
  const { lang, setLang } = useSiteContent();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Detect mobile device for performance optimization
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [lang]);

  // Check if current path is admin to conditionally render layout
  const isAdmin = window.location.pathname.startsWith('/admin');

  return (
    <div className={`min-h-screen bg-black text-white selection:bg-neon-purple selection:text-white`} style={{ fontFamily: lang === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif' }}>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&display=swap');`}
      </style>
      
      <AnimatedBackground />
      <ParticleSystem particleCount={isMobile ? 10 : 25} />
      <MouseFollower enabled={true} />

      {!isAdmin && <Navbar lang={lang} setLang={setLang} />}
      <div className={`relative z-10 ${!isAdmin ? 'max-w-7xl mx-auto px-0 sm:px-4' : 'w-full'} flex flex-col min-h-screen`}>
        <main className="flex-grow flex flex-col items-center w-full">
          <Suspense fallback={
            <div className="w-full flex items-center justify-center min-h-[60vh]">
              <div className="flex flex-col gap-4 items-center">
                <Skeleton variant="circle" className="w-16 h-16" />
                <Skeleton variant="text" className="w-48 h-4" />
              </div>
            </div>
          }>
            <Routes>
              <Route
                path="/"
                element={<PageTransition><Home lang={lang} /></PageTransition>}
              />
              <Route
                path="/tools"
                element={<PageTransition><Tools lang={lang} /></PageTransition>}
              />
              <Route
                path="/playbook"
                element={<PageTransition><Playbook lang={lang} /></PageTransition>}
              />
              <Route
                path="/prompts"
                element={<PageTransition><Prompts lang={lang} /></PageTransition>}
              />
              <Route
                path="/tool/:id"
                element={<PageTransition><ToolDetail lang={lang} /></PageTransition>}
              />
              <Route
                path="/playbook/:id"
                element={<PageTransition><PlaybookDetail lang={lang} /></PageTransition>}
              />
              <Route
                path="/academy"
                element={<PageTransition><Academy lang={lang} /></PageTransition>}
              />
              <Route
                path="/academy/:category"
                element={<PageTransition><AcademyCategory lang={lang} /></PageTransition>}
              />
              <Route
                path="/academy/:category/:stack"
                element={<PageTransition><AcademyTutorial lang={lang} /></PageTransition>}
              />
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              
              <Route
                path="*"
                element={<PageTransition><NotFound lang={lang} /></PageTransition>}
              />
            </Routes>
          </Suspense>
        </main>

        {!isAdmin && <Footer lang={lang} />}
      </div>
      {!isAdmin && <AIChatAssistant />}
      <ScrollToTop />
    </div>
  );
}

const App = () => {
  return (
    <ErrorBoundary>
      <ToastProvider>
        {/* SiteContentProvider manages global settings and navigation */}
        <SiteContentProvider>
          <AppContent />
        </SiteContentProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
};

export default App;
