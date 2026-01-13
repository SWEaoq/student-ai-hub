import { useSiteContent } from '../../hooks/useSiteContent';
import FadeIn from '../animations/FadeIn';
import { CONTENT } from '../../data/content';

/**
 * Footer - Enhanced footer component
 */
const Footer = ({ lang = 'en' }) => {
  const t = CONTENT[lang] || CONTENT['en'];
  const { getText } = useSiteContent();

  return (
    <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">{getText('footer_text', t.footer.text)}</h3>
            <p className="text-gray-400 text-xs sm:text-sm">{t.footer.sub}</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-white/5">
            <p className="text-gray-600 text-xs sm:text-sm text-center md:text-left">
              {t.common.copyright}
            </p>
            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">
              <a href="#" className="hover:text-white active:text-white transition-colors min-h-[44px] flex items-center">
                {t.common.privacy}
              </a>
              <a href="#" className="hover:text-white active:text-white transition-colors min-h-[44px] flex items-center">
                {t.common.terms}
              </a>
              <a href="#" className="hover:text-white active:text-white transition-colors min-h-[44px] flex items-center">
                {t.common.contact}
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
};

export default Footer;

