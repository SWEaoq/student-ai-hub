import React, { useState, useMemo } from 'react';
import { CONTENT, PROMPTS } from '../data/content';
import CopyButton from './ui/CopyButton';
import StaggerContainer from './animations/StaggerContainer';
import SearchBar from './ui/SearchBar';
import EmptyState from './ui/EmptyState';

const PromptVault = ({ lang }) => {
    const t = CONTENT[lang];
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPrompts = useMemo(() => {
        if (!searchQuery.trim()) return PROMPTS;
        
        const query = searchQuery.toLowerCase();
        return PROMPTS.filter(prompt => {
            const content = prompt.content[lang];
            return (
                content.title.toLowerCase().includes(query) ||
                content.text.toLowerCase().includes(query) ||
                content.tag.toLowerCase().includes(query)
            );
        });
    }, [searchQuery, lang]);

    return (
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="flex items-center gap-2 sm:gap-4 mb-8 sm:mb-10">
                <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent flex-1 opacity-50" />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white text-center uppercase tracking-widest">
                    {t.vault.title} <span className="text-purple-500">{t.vault.title_accent}</span>
                </h2>
                <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent flex-1 opacity-50" />
            </div>

            <div className="mb-6 sm:mb-8">
                <SearchBar
                    onSearch={setSearchQuery}
                    placeholder={lang === 'en' ? 'Search prompts...' : 'ابحث عن الأوامر...'}
                />
            </div>

            {filteredPrompts.length > 0 ? (
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
                    {filteredPrompts.map((prompt, index) => {
                    const content = prompt.content[lang];
                    return (
                        <div key={index} className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4 sm:p-6 relative group h-full flex flex-col">
                            <div className={`absolute top-3 sm:top-4 ${lang === 'ar' ? 'left-3 sm:left-4' : 'right-3 sm:right-4'} text-[10px] sm:text-xs font-mono text-gray-600 px-2 py-1 border border-white/5 rounded`}>
                                {content.tag}
                            </div>
                            <h3 className={`text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 ${lang === 'ar' ? 'pl-14 sm:pl-16' : 'pr-14 sm:pr-16'}`}>
                                {content.title}
                            </h3>
                            <div className="bg-white/5 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm text-gray-300 leading-relaxed min-h-[100px] sm:min-h-[120px] mb-3 sm:mb-4 border border-white/5 group-hover:border-white/10 active:border-white/10 transition-colors flex-grow">
                                "{content.text}"
                            </div>
                            <CopyButton
                                text={content.text}
                                successMessage={t.vault.copied}
                                className="w-full py-2.5 sm:py-3 rounded-lg font-bold text-xs sm:text-sm min-h-[44px]"
                            >
                                {t.vault.copy}
                            </CopyButton>
                        </div>
                    );
                    })}
                </StaggerContainer>
            ) : (
                <EmptyState 
                    message={lang === 'en' ? 'No prompts found. Try a different search.' : 'لم يتم العثور على أوامر. جرب بحثًا مختلفًا.'}
                />
            )}
        </section>
    );
};

export default PromptVault;
