import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ACADEMY_TUTORIALS, ACADEMY_CATEGORIES, CONTENT } from '../data/content';
import FadeIn from '../components/animations/FadeIn';
import StaggerContainer from '../components/animations/StaggerContainer';
import CodeBlock from '../components/CodeBlock';
import Checkpoint from '../components/Checkpoint';
import ProgressTracker from '../components/ProgressTracker';

const AcademyTutorial = ({ lang }) => {
  const { category, stack } = useParams();
  const navigate = useNavigate();
  const t = CONTENT[lang];
  const isRTL = lang === 'ar';

  const tutorial = ACADEMY_TUTORIALS[stack];
  const categoryData = ACADEMY_CATEGORIES.find(cat => cat.id === category);

  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    // Set first section as active by default
    if (tutorial?.sections && tutorial.sections.length > 0 && !activeSection) {
      setActiveSection(tutorial.sections[0].id);
    }
  }, [tutorial, activeSection]);

  useEffect(() => {
    // Scroll to section if hash is present
    const hash = window.location.hash.slice(1);
    if (hash && tutorial?.sections) {
      const section = tutorial.sections.find(s => s.id === hash);
      if (section) {
        setActiveSection(section.id);
        setTimeout(() => {
          const element = document.getElementById(`section-${section.id}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  }, [tutorial, stack]);

  if (!tutorial || !categoryData) {
    return (
      <div className="w-full pt-32 pb-12 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-white text-xl">{lang === 'ar' ? 'الدورة غير موجودة' : 'Tutorial not found'}</p>
          <button onClick={() => navigate('/academy')} className="mt-4 text-cyan-400 hover:text-cyan-300">
            {lang === 'ar' ? '← رجوع للأكاديمية' : '← Back to Academy'}
          </button>
        </div>
      </div>
    );
  }

  const tutorialContent = tutorial.content[lang];
  const sections = tutorial.sections;
  const currentSectionIndex = sections.findIndex(s => s.id === activeSection);
  const currentSection = sections[currentSectionIndex];
  const sectionContent = currentSection?.content[lang];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  };

  const navigateSection = (direction) => {
    if (direction === 'next' && currentSectionIndex < sections.length - 1) {
      scrollToSection(sections[currentSectionIndex + 1].id);
    } else if (direction === 'prev' && currentSectionIndex > 0) {
      scrollToSection(sections[currentSectionIndex - 1].id);
    }
  };

  return (
    <div className="w-full pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn delay={0.1}>
          <button
            onClick={() => navigate(`/academy/${category}`)}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 sm:mb-8 transition-colors min-h-[44px]"
          >
            {isRTL ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
            {t.academy.backToCategories}
          </button>
        </FadeIn>

        {/* Header */}
        <FadeIn delay={0.2}>
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 bg-gradient-to-br ${tutorial.color} opacity-20 rounded-xl`}>
                <tutorial.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2">
                  {tutorialContent.name}
                </h1>
                <p className="text-base text-cyan-400 font-medium">
                  {tutorialContent.tagline}
                </p>
              </div>
            </div>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mb-6">
              {tutorialContent.description}
            </p>
            <ProgressTracker tutorialId={stack} sections={sections} activeSection={activeSection} lang={lang} />
          </div>
        </FadeIn>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <FadeIn delay={0.3}>
            <div className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24 bg-gray-900/50 border border-white/10 rounded-2xl p-4 sm:p-6">
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
                  {t.academy.sections}
                </h3>
                <nav className="space-y-2">
                  {sections.map((section, idx) => {
                    const sectionTitle = section.content[lang].title;
                    const isActive = activeSection === section.id;
                    
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`
                          w-full text-left px-3 py-2 rounded-lg text-sm transition-all
                          ${isActive
                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }
                        `}
                      >
                        <span className="font-medium">{idx + 1}. {sectionTitle}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </FadeIn>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {currentSection && (
              <FadeIn delay={0.4}>
                <div id={`section-${currentSection.id}`} className="bg-gray-900/50 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br ${tutorial.color} rounded-full blur-[60px] sm:blur-[80px] opacity-10 pointer-events-none`} />
                  
                  <div className="relative z-10">
                    <div className="mb-6 sm:mb-8">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">
                        {sectionContent.title}
                      </h2>
                      <p className="text-base sm:text-lg text-gray-300 leading-relaxed border-s-4 border-cyan-500 ps-4 sm:ps-6 py-2 bg-white/5 rounded-e-lg">
                        {sectionContent.description}
                      </p>
                    </div>

                    <StaggerContainer>
                      <div className="space-y-6">
                        {sectionContent.steps.map((step, idx) => (
                          <div key={idx} className="flex gap-4 sm:gap-6 group">
                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-base sm:text-lg font-mono text-cyan-400 font-bold shrink-0 group-hover:bg-cyan-500 group-hover:text-black transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                                {idx + 1}
                              </div>
                              {idx !== sectionContent.steps.length - 1 && (
                                <div className="w-0.5 h-full min-h-[60px] bg-gradient-to-b from-cyan-500/30 via-cyan-500/20 to-transparent my-2 transition-colors" />
                              )}
                            </div>
                            <div className="pt-1 flex-1 pb-6">
                              <p className="text-base sm:text-lg text-gray-200 leading-relaxed whitespace-pre-line">
                                {step}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </StaggerContainer>

                    {/* Code Examples */}
                    {sectionContent.codeExamples && sectionContent.codeExamples.length > 0 && (
                      <div className="mt-10 sm:mt-12">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                          {lang === 'ar' ? 'أمثلة الكود' : 'Code Examples'}
                        </h3>
                        <div className="space-y-6">
                          {sectionContent.codeExamples.map((example, idx) => (
                            <CodeBlock
                              key={idx}
                              code={example.code}
                              language={example.language}
                              title={example.title}
                              lang={lang}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Checkpoints */}
                    {sectionContent.checkpoints && sectionContent.checkpoints.length > 0 && (
                      <div className="mt-10 sm:mt-12">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                          {lang === 'ar' ? 'نقاط الفحص' : 'Checkpoints'}
                        </h3>
                        <div className="space-y-3">
                          {sectionContent.checkpoints.map((checkpoint, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                              <div className="pt-1">
                                <Checkpoint
                                  id={idx}
                                  tutorialId={stack}
                                  sectionId={currentSection.id}
                                  lang={lang}
                                />
                              </div>
                              <span className="text-sm text-gray-300 flex-1 leading-relaxed">
                                {checkpoint}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Navigation */}
                    <div className="mt-10 sm:mt-12 pt-8 border-t border-white/10 flex items-center justify-between gap-4">
                      <button
                        onClick={() => navigateSection('prev')}
                        disabled={currentSectionIndex === 0}
                        className={`
                          flex items-center gap-2 px-4 py-2 rounded-lg transition-all min-h-[44px]
                          ${currentSectionIndex === 0
                            ? 'text-gray-600 cursor-not-allowed'
                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }
                        `}
                      >
                        {isRTL ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
                        <span>{t.academy.prevSection}</span>
                      </button>

                      <span className="text-sm text-gray-500">
                        {currentSectionIndex + 1} / {sections.length}
                      </span>

                      <button
                        onClick={() => navigateSection('next')}
                        disabled={currentSectionIndex === sections.length - 1}
                        className={`
                          flex items-center gap-2 px-4 py-2 rounded-lg transition-all min-h-[44px]
                          ${currentSectionIndex === sections.length - 1
                            ? 'text-gray-600 cursor-not-allowed'
                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }
                        `}
                      >
                        <span>{t.academy.nextSection}</span>
                        {isRTL ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
                      </button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyTutorial;

