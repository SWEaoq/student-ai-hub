import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PromptVault from '../components/PromptVault';

const Prompts = ({ lang }) => {
    const isRTL = lang === 'ar';

    return (
        <div className="w-full pt-32">
            <div className="max-w-7xl mx-auto px-6">
                <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className={`w-5 h-5 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
                    {lang === 'en' ? 'Back to Hub' : 'العودة إلى المركز'}
                </Link>
            </div>
            <PromptVault lang={lang} />
        </div>
    );
};

export default Prompts;
