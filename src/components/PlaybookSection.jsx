import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Workflow, Book } from 'lucide-react';
import { useSiteContent } from '../hooks/useSiteContent';
import { ICON_MAP } from '../lib/iconMap';
import StaggerContainer from './animations/StaggerContainer';
import AnimatedCard from './animations/AnimatedCard';
import { GUIDES } from '../data/content'; // Import static guides (Step 172)

const PlaybookSection = () => {
  const { lang, getText } = useSiteContent();
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    const fetchPlaybooks = async () => {
        const { data } = await supabase.from('playbooks').select('*').order('id', { ascending: false });
        if (data && data.length > 0) {
            setGuides(data.map(item => {
                let enTitle = item.content?.en?.title || item.title?.en || (typeof item.title === 'string' ? item.title : 'Untitled');
                let arTitle = item.content?.ar?.title || item.title?.ar || (typeof item.title === 'string' ? item.title : 'Untitled');
                let enDesc = item.content?.en?.description || item.description?.en || (typeof item.description === 'string' ? item.description : '');
                let arDesc = item.content?.ar?.description || item.description?.ar || (typeof item.description === 'string' ? item.description : '');

                // Fallback to static GUIDES if descriptions are missing
                if (!enDesc || !arDesc) {
                    const staticMatch = GUIDES.find(g => 
                        g.content?.en?.title === enTitle || 
                        g.content?.ar?.title === arTitle ||
                        g.id === item.id // In case ID matches
                    );
                    if (staticMatch) {
                        if (!enDesc) enDesc = staticMatch.content?.en?.desc || '';
                        if (!arDesc) arDesc = staticMatch.content?.ar?.desc || '';
                    }
                }

                return {
                    id: item.id,
                    icon: ICON_MAP[item.icon_name] || Book,
                    content: {
                        en: { title: enTitle, desc: enDesc },
                        ar: { title: arTitle, desc: arDesc }
                    }
                };
            }));
        }
    };
    fetchPlaybooks();
  }, []);

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex items-center gap-2 sm:gap-4 mb-8 sm:mb-10">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent flex-1 opacity-50" />
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white text-center uppercase tracking-widest flex items-center gap-2 sm:gap-3">
          <Workflow className="text-cyan-500 w-5 h-5 sm:w-6 sm:h-6" />
          {getText('playbook.title')} <span className="text-cyan-500">{getText('playbook.title_accent')}</span>
        </h2>
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent flex-1 opacity-50" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-stretch">
        {guides.map((guide) => {
          const content = guide.content[lang] || {};
          const Icon = guide.icon || Book;
          
          return (
            <AnimatedCard key={guide.id} enableHover={true} className="h-full" initial="visible">
              <Link to={`/playbook/${guide.id}`} className="flex h-full">
                <div className="bg-gray-900/40 border border-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 relative overflow-hidden group hover:border-cyan-500/30 active:border-cyan-500/30 transition-all h-full flex flex-col w-full">
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-cyan-500/10 rounded-full blur-[40px] sm:blur-[50px] pointer-events-none group-hover:bg-cyan-500/20 transition-all" />
                
                <div className="mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                    <div className="p-2 sm:p-3 bg-cyan-500/10 rounded-lg text-cyan-400">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">{content.title}</h3>
                </div>
                
                <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 border-b border-white/5 pb-3 sm:pb-4 flex-grow">
                    {content.desc}
                </p>

                <div className="text-cyan-500 text-xs sm:text-sm font-mono flex items-center gap-2 group-hover:translate-x-2 transition-transform mt-auto">
                    {lang === 'ar' ? 'اقرأ الدليل' : 'Read Guide'} {lang === 'ar' ? <span>&larr;</span> : <span>&rarr;</span>}
                </div>
                </div>
              </Link>
            </AnimatedCard>
          );
        })}
      </div>
    </section>
  );
};

export default PlaybookSection;
