import React, { useMemo, useEffect, useState } from 'react';
// import { CONTENT } from '../data/content'; // Removed static
import { useSiteContent } from '../hooks/useSiteContent';

const ProgressTracker = ({ tutorialId, sections, activeSection }) => {
  const { lang, getText } = useSiteContent();
  
  // Lazy init viewed sections
  const [viewedSections, setViewedSections] = useState(() => {
      if (typeof window === 'undefined') return new Set();
      const key = `tutorial_${tutorialId}_viewed`;
      const viewed = JSON.parse(localStorage.getItem(key) || '[]');
      return new Set(viewed);
  });

  // Track viewed sections (Sync activeSection to storage)
  useEffect(() => {
    if (activeSection) {
      const key = `tutorial_${tutorialId}_viewed`;
      // We read from storage to ensure we have latest, or we could rely on state if we trust it 
      // But better to read current state or storage to append.
      // Since we lazily loaded, `viewedSections` has initial.
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setViewedSections(prev => {
          if (!prev.has(activeSection)) {
              const newSet = new Set(prev).add(activeSection);
              localStorage.setItem(key, JSON.stringify(Array.from(newSet)));
              return newSet;
          }
          return prev;
      });
    }
  }, [activeSection, tutorialId]);

  /* Load effect removed as lazy init handles it */

  const progress = useMemo(() => {
    if (!sections || sections.length === 0) return 0;
    
    // Calculate progress based on sections viewed
    const viewedCount = sections.filter(section => 
      viewedSections.has(section.id)
    ).length;

    return Math.round((viewedCount / sections.length) * 100);
  }, [sections, viewedSections]);

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-400">
          {getText('academy.sections', 'Sections')} {progress}%
        </span>
        <span className="text-sm text-gray-500">
          {progress === 100 ? getText('academy.completed') : `${100 - progress}% ${lang === 'ar' ? 'متبقي' : 'remaining'}`}
        </span>
      </div>
      <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressTracker;

