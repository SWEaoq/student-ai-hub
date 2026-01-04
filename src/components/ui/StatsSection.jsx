import React from 'react';
import StaggerContainer from '../animations/StaggerContainer';
import StatCard from './StatCard';

/**
 * StatsSection - Statistics section with animated counters
 * @param {Array} stats - Array of stat objects {value, label, suffix}
 * @param {string} lang - Language
 */
const StatsSection = ({ stats, lang = 'en' }) => {
  const defaultStats = [
    { value: 50, label: lang === 'en' ? 'AI Tools' : 'أدوات ذكاء اصطناعي', suffix: '+' },
    { value: 1000, label: lang === 'en' ? 'Students' : 'طالب', suffix: '+' },
    { value: 25, label: lang === 'en' ? 'Guides' : 'دليل', suffix: '+' },
    { value: 100, label: lang === 'en' ? 'Prompts' : 'أمر', suffix: '+' }
  ];

  const displayStats = stats || defaultStats;

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {displayStats.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix || ''}
            />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default StatsSection;

