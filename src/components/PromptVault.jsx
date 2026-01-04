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
        <section className="py-20 px-6 max-w-7xl mx-auto" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="flex items-center gap-4 mb-10">
                <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent flex-1 opacity-50" />
                <h2 className="text-3xl font-black text-white text-center uppercase tracking-widest">
                    {t.vault.title} <span className="text-purple-500">{t.vault.title_accent}</span>
                </h2>
                <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent flex-1 opacity-50" />
            </div>

            <div className="mb-8">
                <SearchBar
                    onSearch={setSearchQuery}
                    placeholder={lang === 'en' ? 'Search prompts...' : 'ابحث عن الأوامر...'}
                />
            </div>

            {filteredPrompts.length > 0 ? (
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredPrompts.map((prompt, index) => {
                    const content = prompt.content[lang];
                    return (
                        <div key={index} className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 relative group">
                            <div className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} text-xs font-mono text-gray-600 px-2 py-1 border border-white/5 rounded`}>
                                {content.tag}
                            </div>
                            <h3 className={`text-lg font-bold text-white mb-4 ${lang === 'ar' ? 'pl-16' : 'pr-16'}`}>
                                {content.title}
                            </h3>
                            <div className="bg-white/5 rounded-lg p-4 font-mono text-sm text-gray-300 leading-relaxed min-h-[120px] mb-4 border border-white/5 group-hover:border-white/10 transition-colors">
                                "{content.text}"
                            </div>
                            <CopyButton
                                text={content.text}
                                successMessage={t.vault.copied}
                                className="w-full py-3 rounded-lg font-bold text-sm"
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
