import React, { useMemo, useEffect, useState } from 'react';
import { CONTENT } from '../data/content';

const ProgressTracker = ({ tutorialId, sections, activeSection, lang = 'en' }) => {
  const t = CONTENT[lang];
  const [viewedSections, setViewedSections] = useState(new Set());

  // Track viewed sections
  useEffect(() => {
    if (activeSection) {
      const key = `tutorial_${tutorialId}_viewed`;
      const viewed = JSON.parse(localStorage.getItem(key) || '[]');
      if (!viewed.includes(activeSection)) {
        viewed.push(activeSection);
        localStorage.setItem(key, JSON.stringify(viewed));
        setViewedSections(new Set(viewed));
      } else {
        setViewedSections(new Set(viewed));
      }
    }
  }, [activeSection, tutorialId]);

  // Load viewed sections on mount
  useEffect(() => {
    const key = `tutorial_${tutorialId}_viewed`;
    const viewed = JSON.parse(localStorage.getItem(key) || '[]');
    setViewedSections(new Set(viewed));
  }, [tutorialId]);

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
          {t.academy.sections} {progress}%
        </span>
        <span className="text-sm text-gray-500">
          {progress === 100 ? t.academy.completed : `${100 - progress}% ${lang === 'ar' ? 'متبقي' : 'remaining'}`}
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

