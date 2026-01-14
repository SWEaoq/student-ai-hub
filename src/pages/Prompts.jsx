import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PromptVault from '../components/PromptVault';
// import { CONTENT } from '../data/content'; // Removed static
import { useSiteContent } from '../hooks/useSiteContent';

const Prompts = () => {
    const { lang, getText } = useSiteContent();
    const navigate = useNavigate();
    const isRTL = lang === 'ar';

    return (
        <div className="w-full pt-20 sm:pt-24 md:pt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <button onClick={() => navigate(-1)} className="inline-flex items-center text-gray-400 hover:text-white active:text-white mb-6 sm:mb-8 transition-colors min-h-[44px]">
                    <ArrowLeft className={`w-5 h-5 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
                    {getText('common.back')}
                </button>
            </div>
            <PromptVault />
        </div>
    );
};

export default Prompts;
