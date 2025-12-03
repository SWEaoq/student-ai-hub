import React from 'react';
import { Globe } from 'lucide-react';
import { CONTENT } from '../data/content';

const Navbar = ({ lang, setLang }) => {


    return (
        <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
            <div className={`max-w-7xl mx-auto px-6 h-24 flex items-center justify-between`}>
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
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
