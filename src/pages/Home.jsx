import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, BookOpen, Terminal } from 'lucide-react';
import Hero from '../components/Hero';

const Home = ({ lang }) => {
    const cards = [
        {
            id: 'tools',
            title: lang === 'en' ? 'AI Tools Library' : 'مكتبة أدوات الذكاء الاصطناعي',
            desc: lang === 'en' ? 'Curated list of the best AI tools for students.' : 'قائمة مختارة لأفضل أدوات الذكاء الاصطناعي للطلاب.',
            icon: Zap,
            link: '/tools',
            color: 'purple'
        },
        {
            id: 'playbook',
            title: lang === 'en' ? 'The Playbook' : 'الشروحات',
            desc: lang === 'en' ? 'Step-by-step guides to master AI workflows.' : 'شروحات خطوة بخطوة لإتقان سير عمل الذكاء الاصطناعي.',
            icon: BookOpen,
            link: '/playbook',
            color: 'cyan'
        },
        {
            id: 'prompts',
            title: lang === 'en' ? 'Prompt Vault' : 'خزنة الأوامر',
            desc: lang === 'en' ? 'Copy-paste prompts for every situation.' : 'أوامر جاهزة للنسخ واللصق لكل الحالات.',
            icon: Terminal,
            link: '/prompts',
            color: 'green'
        }
    ];

    return (
        <div className="w-full">
            <Hero lang={lang} showFilters={false} />

            <section className="px-6 pb-20 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cards.map((card) => (
                        <Link
                            key={card.id}
                            to={card.link}
                            className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-${card.color}-500/20 rounded-full blur-[60px] group-hover:bg-${card.color}-500/30 transition-all`} />
                            
                            <div className={`w-14 h-14 rounded-2xl bg-${card.color}-500/20 flex items-center justify-center mb-6 text-${card.color}-400 group-hover:scale-110 transition-transform`}>
                                <card.icon size={28} />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-3">{card.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{card.desc}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
