import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Book } from 'lucide-react';
import { GUIDES, CONTENT } from '../data/content';
import FadeIn from '../components/animations/FadeIn';
import StaggerContainer from '../components/animations/StaggerContainer';

const PlaybookDetail = ({ lang }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Fetch from Supabase or Fallback
  const [dbGuide, setDbGuide] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // 1. Try to find in static GUIDES first (if ID matches static IDs like 'uml')
    const staticGuide = GUIDES.find(g => g.id === id);
    if (staticGuide) {
        setDbGuide(staticGuide);
        setLoading(false);
        return;
    }

    // 2. If not found, or if we want to prioritize DB, fetch from Supabase
    // Note: If we want DB to override static, we should fetch DB first.
    // Let's try fetching DB.
    const fetchGuide = async () => {
        try {
            const { data, error } = await import('../lib/supabase').then(m => m.supabase.from('playbooks').select('*').eq('id', id).single());
            
            if (error || !data) {
                // If DB check fails/empty, fallback to static if available
                if (staticGuide) setDbGuide(staticGuide);
                else setDbGuide(null);
            } else {
                // Transform DB data to match component structure
                // DB structure: title (jsonb), description (jsonb), content (jsonb), image_url, etc.
                // Component expects: icon (we'll use default), content: { en: { title, desc, steps }, ar: ... }
                
                // Construct the object
                const transformed = {
                    id: data.id,
                    icon: null, // We'll handle icon fallback in render
                    content: {
                        en: {
                            title: data.title?.en || '',
                            desc: data.description?.en || '',
                            steps: data.content?.en?.steps || []
                        },
                        ar: {
                            title: data.title?.ar || '',
                            desc: data.description?.ar || '',
                            steps: data.content?.ar?.steps || []
                        }
                    }
                };
                setDbGuide(transformed);
            }
        } catch (e) {
            console.error(e);
            if (staticGuide) setDbGuide(staticGuide);
        } finally {
            setLoading(false);
        }
    };
    fetchGuide();
  }, [id]);

  if (loading) return <div className="text-white text-center py-20">Loading...</div>;
  if (!dbGuide) return <div className="text-white text-center py-20">Guide not found</div>;

  const content = dbGuide.content[lang] || dbGuide.content['en'];
  const GuideIcon = dbGuide.icon || Book;
  const t = CONTENT[lang];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <FadeIn delay={0.1}>
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-gray-400 hover:text-white active:text-white mb-6 sm:mb-8 transition-colors min-h-[44px]">
          {lang === 'ar' ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
          {t.common.back}
        </button>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="bg-gray-900/50 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-cyan-500/10 rounded-full blur-[60px] sm:blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="p-3 sm:p-4 bg-cyan-500/10 rounded-xl sm:rounded-2xl text-cyan-400">
                <guide.icon className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">{content.title}</h1>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 md:mb-10 leading-relaxed border-s-4 border-cyan-500 ps-4 sm:ps-6 py-2 bg-white/5 rounded-e-lg">
              {content.desc}
            </p>

            <StaggerContainer>
              <div className="space-y-6">
                {content.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-3 sm:gap-6 group">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-base sm:text-lg font-mono text-cyan-400 font-bold shrink-0 group-hover:bg-cyan-500 group-hover:text-black transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                        {idx + 1}
                      </div>
                      {idx !== content.steps.length - 1 && (
                        <div className="w-0.5 h-full min-h-[60px] bg-gradient-to-b from-cyan-500/30 via-cyan-500/20 to-transparent my-2 transition-colors" />
                      )}
                    </div>
                    <div className="pt-1 flex-1 pb-6">
                      <p className="text-base sm:text-lg text-gray-200 leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default PlaybookDetail;
