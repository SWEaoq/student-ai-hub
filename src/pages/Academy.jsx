import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useSiteContent } from '../hooks/useSiteContent';
import { ICON_MAP } from '../lib/iconMap';
import StaggerContainer from '../components/animations/StaggerContainer';
import AnimatedCard from '../components/animations/AnimatedCard';
import FadeIn from '../components/animations/FadeIn';
import { GraduationCap } from 'lucide-react';

const Academy = () => {
  const { lang, getText } = useSiteContent();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from('academy_categories').select('*').order('id');
      if (data && data.length > 0) {
        setCategories(data.map(cat => {
            // Robust content resolution
            const enName = cat.content?.en?.name || cat.title?.en || (typeof cat.title === 'string' ? cat.title : 'Untitled');
            const arName = cat.content?.ar?.name || cat.title?.ar || (typeof cat.title === 'string' ? cat.title : 'Untitled');
            const enDesc = cat.content?.en?.description || cat.description?.en || (typeof cat.description === 'string' ? cat.description : '');
            const arDesc = cat.content?.ar?.description || cat.description?.ar || (typeof cat.description === 'string' ? cat.description : '');

            return {
              ...cat,
              content: {
                en: { name: enName, description: enDesc },
                ar: { name: arName, description: arDesc }
              },
              icon: ICON_MAP[cat.icon_name] || GraduationCap,
              color: cat.color || 'from-blue-500 to-cyan-500', 
              stacks: cat.stacks || []
            };
        }));
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="w-full pt-32 pb-12 sm:pb-16 md:pb-20" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn delay={0.1}>
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl">
                <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                {getText('academy.title')} <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">{getText('academy.title_accent')}</span>
              </h1>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {getText('academy.subtitle')}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">
            {getText('academy.chooseCategory')}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {categories.map((category) => {
            const content = category.content[lang] || {};
            const CategoryIcon = category.icon || GraduationCap;
            
            return (
              <AnimatedCard key={category.id} enableHover={true} className="h-full">
                <Link
                  to={`/academy/${category.id}`}
                  className="group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 active:border-white/20 transition-all duration-300 overflow-hidden flex flex-col h-full"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br ${category.color || 'from-purple-500 to-pink-500'} rounded-full blur-[60px] sm:blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity`} />
                  
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${category.color || 'from-purple-500 to-pink-500'} opacity-20 flex items-center justify-center mb-4 sm:mb-6 text-white group-hover:scale-110 transition-transform`}>
                    <CategoryIcon size={28} className="sm:w-8 sm:h-8" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                    {content.name}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4 sm:mb-6 flex-grow">
                    {content.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                    <span className="text-xs sm:text-sm text-gray-500">
                      {category.stacks?.length || 0} {lang === 'ar' ? 'تقنيات متاحة' : 'stacks available'}
                    </span>
                    <span className={`text-sm font-medium bg-gradient-to-r ${category.color || 'from-purple-500 to-pink-500'} bg-clip-text text-transparent group-hover:translate-x-1 transition-transform`}>
                      {lang === 'ar' ? 'ابدأ التعلم →' : 'Start Learning →'}
                    </span>
                  </div>
                </Link>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Academy;
