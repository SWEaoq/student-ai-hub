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
    <div className="min-h-screen flex items-center justify-center px-6">
      <FadeIn className="text-center max-w-md w-full">
        <div className="mb-8">
          <div className="inline-block p-6 bg-purple-500/20 rounded-full mb-6">
            <AlertCircle className="text-purple-400" size={64} />
          </div>
          <h1 className="text-6xl font-black text-white mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-300 mb-4">
            {lang === 'en' ? 'Page Not Found' : 'الصفحة غير موجودة'}
          </h2>
          <p className="text-gray-400 mb-8">
            {lang === 'en' 
              ? "The page you're looking for doesn't exist or has been moved." 
              : 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.'}
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
        >
          <Home size={20} />
          {lang === 'en' ? 'Go Home' : 'العودة للرئيسية'}
        </Link>
      </FadeIn>
    </div>
  );
};

export default NotFound;

