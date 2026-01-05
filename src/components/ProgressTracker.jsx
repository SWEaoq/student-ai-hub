import React, { useMemo } from 'react';
import { CONTENT } from '../data/content';

const ProgressTracker = ({ tutorialId, sections, lang = 'en' }) => {
  const t = CONTENT[lang];

  const progress = useMemo(() => {
    if (!sections || sections.length === 0) return 0;
    
    let totalCheckpoints = 0;
    let completedCheckpoints = 0;

    sections.forEach((section) => {
      const checkpoints = section.content[lang]?.checkpoints || [];
      totalCheckpoints += checkpoints.length;
      
      checkpoints.forEach((_, index) => {
        const key = `checkpoint_${tutorialId}_${section.id}_${index}`;
        if (localStorage.getItem(key) === 'true') {
          completedCheckpoints++;
        }
      });
    });

    return totalCheckpoints > 0 
      ? Math.round((completedCheckpoints / totalCheckpoints) * 100)
      : 0;
  }, [tutorialId, sections, lang]);

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-400">
          {t.academy.sections} {progress}%
        </span>
        <span className="text-sm text-gray-500">
          {progress === 100 ? t.academy.completed : `${100 - progress}% ${lang === 'ar' ? 'متبقي' : 'remaining'}`}
        </span>
      </div>
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressTracker;

