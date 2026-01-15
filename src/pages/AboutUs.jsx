import React from 'react';
import { motion } from 'framer-motion';
import { useSiteContent } from '../hooks/useSiteContent';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import { Linkedin } from 'lucide-react';

// Images
import abdullahImg from '../assets/founders/abdullah.jpg';
import oussamaImg from '../assets/founders/oussama.jpg';

const AboutUs = () => {
    const { lang } = useSiteContent();

    const founders = [
        {
            name: {
                en: "Abdullah Alqobaisi",
                ar: "عبدالله القبيسي"
            },
            role: {
                en: "Co-Founder",
                ar: "شريك مؤسس"
            },
            focus: "AI Hub",
            image: abdullahImg,
            objectPosition: 'top', // Adjust for face visibility
            linkedin: "https://www.linkedin.com/in/abdullah-alqobaisi-b93b47323/",
            bio: {
                en: "Focusing on the AI Hub platform to empower students and builders with cutting-edge AI tools.",
                ar: "مهتم بتطوير منصة AI Hub، وهدفه يسهّل على الطلاب والمبدعين الوصول لأقوى أدوات الذكاء الاصطناعي."
            }
        },
        {
            name: {
                en: "Oussama Makhbouche",
                ar: "اسامة مخبوش"
            },
            role: {
                en: "Co-Founder",
                ar: "شريك مؤسس"
            },
            focus: "VibeQuest",
            image: oussamaImg,
            objectPosition: 'center',
            linkedin: "https://www.linkedin.com/in/oussama-makhbouche-37a313292/",
            bio: {
                en: "Developing VibeQuest to craft immersive and interactive learning experiences.",
                ar: "يقود تطوير VibeQuest، وشغفه يصنع تجربة تعلم غير تقليدية، تفاعلية وممتعة بنفس الوقت."
            }
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-12 px-4 sm:px-6 relative overflow-hidden flex flex-col justify-center">
            <AnimatedBackground />

            <div className="max-w-7xl mx-auto relative z-10 w-full">
                {/* Vision Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        {lang === 'ar' ? 'رؤيتنا' : 'Our Vision'}
                    </h1>
                    <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        {lang === 'ar' 
                            ? 'نؤمن إن الذكاء الاصطناعي هو فرصة المستقبل. هدفنا نمكّن الطلاب والمبدعين من هذي التقنية، عشان يبنون ويبتكرون ويتركون أثر حقيقي.'
                            : 'We believe AI is the most powerful tool of our time. Our mission is to put this power into the hands of students and creators, not just to consume, but to build, innovate, and shape the future.'}
                    </p>
                </motion.div>

                {/* Founders Section */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {founders.map((founder, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors group text-center"
                        >
                            <div className="relative mb-4 inline-block">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                                <img 
                                    src={founder.image} 
                                    alt={founder.name} 
                                    style={{ objectPosition: founder.objectPosition }}
                                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white/10 mx-auto relative z-10 shadow-2xl"
                                />
                            </div>
                            
                            <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                                {founder.name[lang] || founder.name['en']}
                            </h2>
                            <p className="text-purple-400 font-medium mb-3 text-sm">
                                {founder.role[lang] || founder.role['en']} • {founder.focus}
                            </p>
                            
                            <p className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed h-20 md:h-auto overflow-hidden">
                                {founder.bio[lang] || founder.bio['en']}
                            </p>
                            
                            <a 
                                href={founder.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition-colors font-medium border border-blue-500/30 text-sm"
                            >
                                <Linkedin size={16} />
                                {lang === 'ar' ? 'تواصل على LinkedIn' : 'Connect on LinkedIn'}
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
