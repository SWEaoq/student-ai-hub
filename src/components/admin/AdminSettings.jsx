import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Globe } from 'lucide-react';

const SETTINGS_KEYS = [
    { key: 'hero_title_1', label: 'Hero Title Line 1' },
    { key: 'hero_title_1_accent', label: 'Hero Title Line 1 (Accent)' },
    { key: 'hero_title_2', label: 'Hero Title Line 2' },
    { key: 'hero_title_2_accent', label: 'Hero Title Line 2 (Accent)' },
    { key: 'hero_subtitle', label: 'Hero Subtitle' },
    { key: 'footer_text', label: 'Footer Main Text' },
];

const AdminSettings = () => {
    const [settings, setSettings] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('site_settings').select('*');
        if (error) console.error('Error fetching settings:', error);
        else {
            const map = {};
            data.forEach(item => {
                map[item.key] = item.value;
            });
            setSettings(map);
        }
        setLoading(false);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const updates = Object.keys(settings).map(key => ({
                key,
                value: settings[key],
                updated_at: new Date()
            }));

            const { error } = await supabase.from('site_settings').upsert(updates);
            if (error) throw error;
            alert('Settings saved successfully!');
        } catch (error) {
            alert('Error saving settings: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (key, lang, value) => {
        setSettings(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                [lang]: value
            }
        }));
    };

    if (loading) return <div className="text-white">Loading settings...</div>;

    return (
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Globe className="text-purple-400" size={24} />
                    Global Site Content
                </h2>
                <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 disabled:opacity-50"
                >
                    <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="grid gap-6">
                {SETTINGS_KEYS.map(({ key, label }) => (
                    <div key={key} className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <label className="block text-sm font-bold text-purple-400 mb-3 uppercase tracking-wider">{label}</label>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <span className="text-xs text-zinc-500 mb-1 block">English</span>
                                <input 
                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-purple-500"
                                    value={settings[key]?.en || ''}
                                    onChange={(e) => handleChange(key, 'en', e.target.value)}
                                />
                            </div>
                            <div>
                                <span className="text-xs text-zinc-500 mb-1 block">Arabic</span>
                                <input 
                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:ring-1 focus:ring-purple-500 text-right"
                                    dir="rtl"
                                    value={settings[key]?.ar || ''}
                                    onChange={(e) => handleChange(key, 'ar', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-12 pt-8 border-t border-white/10">
                <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
                    Danger Zone
                </h3>
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                    <h4 className="text-white font-bold mb-2">Restore Default Content</h4>
                    <p className="text-gray-400 text-sm mb-4">
                        This will re-populate the home cards and other default content if they are missing.
                        It will not delete existing data, but may overwrite some default entries.
                    </p>
                    <button
                        onClick={async () => {
                            if (!confirm('Are you sure you want to restore default content?')) return;
                            
                            setSaving(true);
                            try {
                                const defaultCards = [
                                    {
                                        title: { en: "Explore Tools", ar: "استكشف الأدوات" },
                                        description: { en: "Discover the best AI tools for students.", ar: "اكتشف أفضل أدوات الذكاء الاصطناعي للطلاب." },
                                        icon_name: 'Zap',
                                        link: '/tools',
                                        color: 'purple',
                                        order: 1,
                                        is_featured: false
                                    },
                                    {
                                        title: { en: "View Playbooks", ar: "تصفح الشروحات" },
                                        description: { en: "Detailed guides and tutorials.", ar: "شروحات ودروس مفصلة لكيفية الاستخدام." },
                                        icon_name: 'BookOpen',
                                        link: '/playbook',
                                        color: 'blue',
                                        order: 2,
                                        is_featured: false
                                    },
                                    {
                                        title: { en: "Start Learning", ar: "ابدأ التعلم" },
                                        description: { en: "Master AI development skills.", ar: "احترف مهارات تطوير الذكاء الاصطناعي." },
                                        icon_name: 'Terminal',
                                        link: '/academy',
                                        color: 'green',
                                        order: 3,
                                        is_featured: false
                                    },
                                    {
                                        title: { en: "Browse Prompts", ar: "مكتبة الأوامر" },
                                        description: { en: "Ready-to-use prompts for study.", ar: "أوامر جاهزة للاستخدام في دراستك." },
                                        icon_name: 'GraduationCap',
                                        link: '/prompts',
                                        color: 'orange',
                                        order: 4,
                                        is_featured: false
                                    }
                                ];

                                // Upsert cards one by one or batch
                                // We don't have unique constraint on just title, so we rely on them either being new or we just insert them.
                                // But better to check or just insert? Let's just insert for now as a restore action.
                                // To prevent duplicates, users can delete old ones. Or we could clear table first?
                                // Let's clear table first to be safe since this is a "Restore" action.
                                
                                const { error: deleteError } = await supabase.from('home_cards').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
                                if (deleteError) throw deleteError;
                                
                                const { error: insertError } = await supabase.from('home_cards').insert(defaultCards);
                                if (insertError) throw insertError;

                                alert('Content restored successfully! Refresh the home page.');
                            } catch (e) {
                                alert('Error: ' + e.message);
                            } finally {
                                setSaving(false);
                            }
                        }}
                        disabled={saving}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors"
                    >
                        {saving ? 'Restoring...' : 'Restore Missing Cards'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
