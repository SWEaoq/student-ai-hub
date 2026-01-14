import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Book } from 'lucide-react';
// import { ACADEMY_CATEGORIES, ACADEMY_TUTORIALS, CONTENT } from '../data/content'; // Removed static
import { useSiteContent } from '../hooks/useSiteContent';
import StaggerContainer from '../components/animations/StaggerContainer';
import AnimatedCard from '../components/animations/AnimatedCard';
import FadeIn from '../components/animations/FadeIn';
import { supabase } from '../lib/supabase';
import { ICON_MAP } from '../lib/iconMap';

const AcademyCategory = () => {
    const { lang, getText } = useSiteContent();
  const { category } = useParams();
  const navigate = useNavigate();
  const isRTL = lang === 'ar';

  const [categoryData, setCategoryData] = useState(null);
  const [stacks, setStacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);
            // Fetch Category
            const { data: catData, error: catError } = await supabase
                .from('academy_categories')
                .select('*')
                .eq('id', category)
                .single();
            
            if (catError) {
                 if (catError.code !== 'PGRST116') console.error('Error fetching category:', catError);
            } else if (catData) {
                // Map icon
                 const CatIcon = ICON_MAP[catData.icon_name] || Book; // Default icon
                 
                 const processedCategory = {
                    ...catData,
                    icon: CatIcon,
                    content: catData.content ? {
                        en: { name: catData.content.en.name, description: catData.content.en.description },
                        ar: { name: catData.content.ar.name, description: catData.content.ar.description }
                    } : { en: {}, ar: {} }
                 };
                 setCategoryData(processedCategory);

                 // Fetch Tutorials (Stacks) in this category
                 // We can filter by category field if it exists, or by checking if ID is in `stacks` array (jsonb)
                 // Assuming `stacks` field in `academy_categories` is just an array of IDs [ 'flutter', 'react' ]
                 
                 const stackIds = catData.stacks || [];
                 if (stackIds.length > 0) {
                     // Using 'in' filter requires an array
                     const { data: tutorialsData, error: tutorialsError } = await supabase
                        .from('academy_tutorials')
                        .select('*')
                        .in('id', stackIds);
                     
                     if (tutorialsError) {
                         console.error('Error fetching tutorials:', tutorialsError);
                     } else if (tutorialsData) {
                         // Process tutorials
                         const processedStacks = tutorialsData.map(stack => ({
                             ...stack,
                             icon: ICON_MAP[stack.icon_name] || Book,
                             content: stack.content ? {
                                 en: { 
                                     name: stack.content.en.name, 
                                     tagline: stack.content.en.tagline, 
                                     description: stack.content.en.description 
                                 },
                                 ar: { 
                                     name: stack.content.ar.name, 
                                     tagline: stack.content.ar.tagline, 
                                     description: stack.content.ar.description 
                                }
                             } : { en: {}, ar: {} }
                         }));
                         // Sort them based on the order in stackIds
                         processedStacks.sort((a, b) => {
                             return stackIds.indexOf(a.id) - stackIds.indexOf(b.id);
                         });
                         setStacks(processedStacks);
                     }
                 }
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    fetchData();
  }, [category]);
  
  if (loading) {
      return (
          <div className="w-full pt-32 pb-12 flex justify-center items-center min-h-[50vh]">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
      );
  }

  if (!categoryData) {
    return (
      <div className="w-full pt-32 pb-12 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-white text-xl">{lang === 'ar' ? 'التصنيف غير موجود' : 'Category not found'}</p>
          <button onClick={() => navigate('/academy')} className="mt-4 text-cyan-400 hover:text-cyan-300">
            {lang === 'ar' ? '← رجوع للأكاديمية' : '← Back to Academy'}
          </button>
        </div>
      </div>
    );
  }

  const categoryContent = categoryData.content[lang];

  return (
    <div className="w-full pt-32 pb-12 sm:pb-16 md:pb-20" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn delay={0.1}>
          <button
            onClick={() => navigate('/academy')}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 sm:mb-8 transition-colors min-h-[44px]"
          >
            <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180 ml-2' : 'mr-2'}`} />
            {getText('academy.backToCategories')}
          </button>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 bg-gradient-to-br ${categoryData.color} opacity-20 rounded-xl`}>
                <categoryData.icon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
                {categoryContent.name}
              </h1>
            </div>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl">
              {categoryContent.description}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">
            {getText('academy.chooseStack')}
          </h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {stacks.map((stack) => {
            const stackContent = stack.content[lang];
            const StackIcon = stack.icon;
            // Fetch translations from hook or use generic map
            const difficultyLabels = {
              beginner: getText('academy.beginner', 'Beginner'),
              intermediate: getText('academy.intermediate', 'Intermediate'),
              advanced: getText('academy.advanced', 'Advanced'),
            };

            return (
              <AnimatedCard key={stack.id} enableHover={true} className="h-full">
                <Link
                  to={`/academy/${category}/${stack.id}`}
                  className="group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 active:bg-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col h-full"
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br ${stack.color} rounded-full blur-[40px] sm:blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity`} />
                  
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${stack.color} opacity-20 flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform`}>
                    <StackIcon size={24} className="sm:w-7 sm:h-7" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    {stackContent.name}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-cyan-400 mb-3 font-medium">
                    {stackContent.tagline}
                  </p>
                  
                  <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-grow">
                    {stackContent.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-500">
                        {getText('academy.difficulty')}: <span className="text-gray-400">{difficultyLabels[stack.difficulty] || stack.difficulty}</span>
                      </span>
                      <span className="text-xs text-gray-500">
                        {getText('academy.estimatedTime')}: <span className="text-gray-400">{stack.estimatedTime}</span>
                      </span>
                    </div>
                    <span className={`text-sm font-medium bg-gradient-to-r ${stack.color} bg-clip-text text-transparent group-hover:translate-x-1 transition-transform`}>
                      {lang === 'ar' ? '→' : '→'}
                    </span>
                  </div>
                </Link>
              </AnimatedCard>
            );
          })}
        </StaggerContainer>
      </div>
    </div>
  );
};

export default AcademyCategory;

