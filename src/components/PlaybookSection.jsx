import React from 'react';
import { Link } from 'react-router-dom';
import { Workflow } from 'lucide-react';
import { GUIDES, CONTENT } from '../data/content';
import StaggerContainer from './animations/StaggerContainer';
import AnimatedCard from './animations/AnimatedCard';

const PlaybookSection = ({ lang }) => {
  const t = CONTENT[lang];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex items-center gap-2 sm:gap-4 mb-8 sm:mb-10">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent flex-1 opacity-50" />
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white text-center uppercase tracking-widest flex items-center gap-2 sm:gap-3">
          <Workflow className="text-cyan-500 w-5 h-5 sm:w-6 sm:h-6" />
          {t.playbook.title} <span className="text-cyan-500">{t.playbook.title_accent}</span>
        </h2>
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent flex-1 opacity-50" />
      </div>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-stretch">
        {GUIDES.map((guide) => {
          const content = guide.content[lang];
          return (
            <AnimatedCard key={guide.id} enableHover={true} className="h-full">
              <Link to={`/playbook/${guide.id}`} className="flex h-full">
                <div className="bg-gray-900/40 border border-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 relative overflow-hidden group hover:border-cyan-500/30 active:border-cyan-500/30 transition-all h-full flex flex-col w-full">
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-cyan-500/10 rounded-full blur-[40px] sm:blur-[50px] pointer-events-none group-hover:bg-cyan-500/20 transition-all" />
                
                <div className="mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                    <div className="p-2 sm:p-3 bg-cyan-500/10 rounded-lg text-cyan-400">
                    <guide.icon className="w-5 h-5 sm:w-6 sm:h-6" />
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
      </StaggerContainer>
    </section>
  );
};

export default PlaybookSection;
