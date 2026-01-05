import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import FadeIn from '../components/animations/FadeIn';
import { useSEO } from '../hooks/useSEO';

const NotFound = ({ lang = 'en' }) => {
  useSEO({
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.'
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 sm:pt-0">
      <FadeIn className="text-center max-w-md w-full">
        <div className="mb-6 sm:mb-8">
          <div className="inline-block p-4 sm:p-6 bg-purple-500/20 rounded-full mb-4 sm:mb-6">
            <AlertCircle className="text-purple-400 w-12 h-12 sm:w-16 sm:h-16" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-3 sm:mb-4">404</h1>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-300 mb-3 sm:mb-4">
            {lang === 'en' ? 'Page Not Found' : 'الصفحة غير موجودة'}
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 px-4">
            {lang === 'en' 
              ? "The page you're looking for doesn't exist or has been moved." 
              : 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.'}
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 active:bg-gray-200 transition-colors min-h-[44px]"
        >
          <Home size={20} className="w-5 h-5 sm:w-5 sm:h-5" />
          {lang === 'en' ? 'Go Home' : 'العودة للرئيسية'}
        </Link>
      </FadeIn>
    </div>
  );
};

export default NotFound;

