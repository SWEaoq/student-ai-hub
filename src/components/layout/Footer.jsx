import React from 'react';
import { CONTENT } from '../../data/content';
import FadeIn from '../animations/FadeIn';

/**
 * Footer - Enhanced footer component
 */
const Footer = ({ lang = 'en' }) => {
  const t = CONTENT[lang];

  return (
    <footer className="py-12 px-6 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-white mb-2">{t.footer.text}</h3>
            <p className="text-gray-400 text-sm">{t.footer.sub}</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-white/5">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Student AI Hub. Built with React & Tailwind.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">
                {lang === 'en' ? 'Privacy' : 'الخصوصية'}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {lang === 'en' ? 'Terms' : 'الشروط'}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {lang === 'en' ? 'Contact' : 'اتصل بنا'}
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
};

export default Footer;

