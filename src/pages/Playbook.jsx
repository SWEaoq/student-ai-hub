import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
// import { CONTENT } from '../data/content'; // Removed static
import { useSiteContent } from '../hooks/useSiteContent';
import PlaybookSection from '../components/PlaybookSection';

const Playbook = () => {
    const { lang, getText } = useSiteContent();
    const navigate = useNavigate();
    const isRTL = lang === 'ar';

    return (
        <div className="w-full pt-32">
            <div className="max-w-7xl mx-auto px-6">
                <button onClick={() => navigate(-1)} className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className={`w-5 h-5 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
                    {getText('common.back')}
                </button>
            </div>
            <PlaybookSection lang={lang} />
        </div>
    );
};

export default Playbook;
