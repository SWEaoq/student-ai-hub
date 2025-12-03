import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { GUIDES, CONTENT } from '../data/content';

const PlaybookDetail = ({ lang }) => {
  const { id } = useParams();
  const guide = GUIDES.find(g => g.id === id);


  if (!guide) return <div className="text-white text-center py-20">Guide not found</div>;

  const content = guide.content[lang];

  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-20" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
        {lang === 'ar' ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
        {lang === 'ar' ? 'العودة' : 'Back'}
      </Link>

      <div className="bg-gray-900/50 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-cyan-500/10 rounded-2xl text-cyan-400">
                    <guide.icon className="w-8 h-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-white">{content.title}</h1>
            </div>

            <p className="text-xl text-gray-300 mb-10 leading-relaxed border-l-4 border-cyan-500 pl-6 py-2 bg-white/5 rounded-r-lg">
                {content.desc}
            </p>

            <div className="space-y-8">
                {content.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-6 group">
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-lg font-mono text-cyan-400 font-bold shrink-0 group-hover:bg-cyan-500 group-hover:text-black transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                                {idx + 1}
                            </div>
                            {idx !== content.steps.length - 1 && (
                                <div className="w-px h-full bg-white/10 my-2 border-l border-dashed border-gray-700 group-hover:border-cyan-500/30 transition-colors" />
                            )}
                        </div>
                        <div className="pt-1 pb-8">
                            <p className="text-lg text-gray-200 leading-relaxed">{step}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default PlaybookDetail;
