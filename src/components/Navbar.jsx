import React from 'react';
import { Globe } from 'lucide-react';
import { CONTENT } from '../data/content';

const Navbar = ({ lang, setLang }) => {
    const t = CONTENT[lang];

    return (
        <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
            <div className={`max-w-7xl mx-auto px-6 h-16 flex items-center justify-between ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div className="text-2xl font-bold tracking-tighter text-white">
                    STUDENT <span className="text-purple-500">AI</span> HUB
                </div>
                <div className={`flex items-center gap-4 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <button
                        onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-medium text-gray-300 transition-all border border-white/10"
                    >
                        <Globe size={14} />
                        {lang === 'en' ? 'Arabic / عربي' : 'English'}
                    </button>
                    <span className="text-xs font-mono text-gray-400 hidden sm:block">{t.nav.version}</span>
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium transition-all text-white">
                        {t.nav.login}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
