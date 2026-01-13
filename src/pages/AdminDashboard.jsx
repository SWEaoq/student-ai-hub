import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { TOOLS, PROMPTS } from '../data/content';
import { LayoutDashboard, PenTool, MessageSquare, LogOut, Plus, Trash2, Edit2, Save, X, Database } from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('tools'); // 'tools' | 'prompts'
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});

    // Fetch items based on active tab
    const fetchItems = React.useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase.from(activeTab).select('*').order('created_at', { ascending: false });
        if (error) {
            console.error('Error fetching items:', error);
        } else {
            setItems(data || []);
        }
        setLoading(false);
    }, [activeTab]);

    // Seed Data Function
    const handleSeed = async () => {
        if (!window.confirm('This will import data from content.js into Supabase. Continue?')) return;
        setLoading(true);

        try {
            if (activeTab === 'tools') {
                const toolsToInsert = TOOLS.map(tool => {
                    // Manual mapping of icons based on ID
                    let iconName = 'Sparkles';
                    switch(tool.id) {
                        case 'perplexity': iconName = 'PerplexityIcon'; break;
                        case 'claude': iconName = 'SiAnthropic'; break;
                        case 'chatgpt': iconName = 'SiOpenai'; break;
                        case 'notion': iconName = 'SiNotion'; break;
                        case 'cursor': iconName = 'CursorIcon'; break;
                        case 'midjourney': iconName = 'MidjourneyIcon'; break;
                        case 'antigravity': iconName = 'SiGoogle'; break;
                        case 'gemini': iconName = 'SiGoogle'; break;
                        case 'gamma': iconName = 'GammaIcon'; break;
                        case 'genspark': iconName = 'GensparkIcon'; break;
                        case 'figma': iconName = 'SiFigma'; break;
                        case 'uxpilot': iconName = 'Terminal'; break;
                        default: iconName = 'Sparkles';
                    }

                    return {
                        name: tool.content.en.name,
                        tag_line: tool.content.en.tag,
                        description: tool.content.en.description,
                        category: tool.category,
                        url: tool.website,
                        icon_name: iconName,
                        has_free_tier: tool.hasFreeTier,
                        content: tool.content
                    };
                });
                
                const { error } = await supabase.from('tools').insert(toolsToInsert);
                if (error) throw error;

            } else if (activeTab === 'prompts') {
                const promptsToInsert = PROMPTS.map(prompt => ({
                    category: prompt.category,
                    content: prompt.content
                }));

                const { error } = await supabase.from('prompts').insert(promptsToInsert);
                if (error) throw error;
            }
            
            alert('Data imported successfully!');
            fetchItems();
        } catch (error) {
            alert('Error importing data: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Auth Check and Initial Fetch
    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/admin/login');
            } else {
                fetchItems();
            }
        };
        checkUser();
    }, [navigate, fetchItems]);

    // Handle Delete
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;

        const { error } = await supabase.from(activeTab).delete().eq('id', id);
        if (error) {
            alert('Error deleting item: ' + error.message);
        } else {
            fetchItems();
        }
    };

    // Handle Form Submit
    // Category Filter State
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Filtered Items
    const filteredItems = React.useMemo(() => {
        if (selectedCategory === 'all') return items;
        return items.filter(item => item.category?.toLowerCase() === selectedCategory.toLowerCase());
    }, [items, selectedCategory]);

    // Unique Categories
    const categories = React.useMemo(() => {
        const cats = new Set(items.map(i => i.category).filter(Boolean));
        return ['all', ...Array.from(cats)];
    }, [items]);

    // Form Language State
    const [formLang, setFormLang] = useState('en'); // 'en' | 'ar'

    // Handle Form Submit
    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            let payload = {
                category: formData.category,
                // Shared fields
                ...(activeTab === 'tools' ? {
                    url: formData.url,
                    icon_name: formData.icon_name,
                    has_free_tier: formData.has_free_tier !== false // Default true if undefined
                } : {})
            };

            // Construct Content JSONB
            const content = {
                en: {
                    ...(activeTab === 'tools' ? {
                        name: formData.en_name,
                        description: formData.en_description,
                        tag: formData.en_tag
                    } : {
                        title: formData.en_title,
                        text: formData.en_text,
                        tag: formData.en_tag
                    })
                },
                ar: {
                    ...(activeTab === 'tools' ? {
                        name: formData.ar_name,
                        description: formData.ar_description,
                        tag: formData.ar_tag
                    } : {
                        title: formData.ar_title,
                        text: formData.ar_text,
                        tag: formData.ar_tag
                    })
                }
            };
            
            // Add top-level fallbacks for easier searching/display if needed, though we rely on content usually
            if (activeTab === 'tools') {
               payload.name = formData.en_name; 
               payload.tag_line = formData.en_tag;
               payload.description = formData.en_description;
            }

            payload.content = content;

            const query = editingItem 
                ? supabase.from(activeTab).update(payload).eq('id', editingItem.id)
                : supabase.from(activeTab).insert([payload]);

            const { error } = await query;

            if (error) throw error;

            setShowModal(false);
            fetchItems();
        } catch (error) {
            alert('Error saving item: ' + error.message);
        } finally {
            setLoading(false);
        }
    };
    
    // Initialize Form Data
    useEffect(() => {
        if (editingItem) {
            const content = editingItem.content || {};
            const en = content.en || {};
            const ar = content.ar || {};
            
            setFormData({
                category: editingItem.category,
                // Shared
                url: editingItem.url,
                icon_name: editingItem.icon_name,
                has_free_tier: editingItem.has_free_tier,
                
                // English
                en_name: en.name || editingItem.name,
                en_description: en.description || editingItem.description,
                en_tag: en.tag || editingItem.tag_line, // Handle legacy field mapping
                en_title: en.title,
                en_text: en.text,
                
                // Arabic
                ar_name: ar.name,
                ar_description: ar.description,
                ar_tag: ar.tag,
                ar_title: ar.title,
                ar_text: ar.text,
            });
        } else {
            setFormData({});
        }
    }, [editingItem]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };
    
    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    if (loading && !items.length) return <div className="min-h-screen bg-transparent flex items-center justify-center text-white"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div></div>;

    return (
        <div className="min-h-screen w-full text-white relative">
            {/* Sidebar / Nav */}
            <nav className="border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-500/20 p-2 rounded-xl backdrop-blur-sm border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                                <LayoutDashboard className="w-5 h-5 text-purple-400" />
                            </div>
                            <span className="font-bold text-lg tracking-tight">Admin Dashboard</span>
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-2 hover:bg-white/5 rounded-lg"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('tools')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                            activeTab === 'tools' 
                                ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)] ring-1 ring-purple-400/50' 
                                : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/5'
                        }`}
                    >
                        <PenTool size={18} />
                        Tools Manager
                    </button>
                    <button
                        onClick={() => setActiveTab('prompts')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                            activeTab === 'prompts' 
                                ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)] ring-1 ring-purple-400/50' 
                                : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/5'
                        }`}
                    >
                        <MessageSquare size={18} />
                        Prompts Manager
                    </button>
                </div>

                {/* Content Area */}
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                                <span className="capitalize">{activeTab}</span> List
                                <span className="text-sm font-normal text-zinc-400 bg-white/10 px-2.5 py-0.5 rounded-full ml-2 border border-white/5">
                                    {filteredItems.length}
                                </span>
                            </h2>
                            {/* Category Filter */}
                            <select 
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-purple-500"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat} className="bg-zinc-900">{cat === 'all' ? 'All Categories' : cat}</option>
                                ))}
                            </select>
                        </div>
                        <button 
                            onClick={() => { setEditingItem(null); setShowModal(true); }}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] flex items-center gap-2"
                        >
                            <Plus size={18} />
                            Add New {activeTab === 'tools' ? 'Tool' : 'Prompt'}
                        </button>
                    </div>

                    <div className="border border-white/10 rounded-xl overflow-hidden bg-black/20">
                        {items.length === 0 ? (
                            <div className="p-16 text-center text-zinc-400">
                                <div className="mx-auto w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                                    {activeTab === 'tools' ? <PenTool className="opacity-50 w-8 h-8" /> : <MessageSquare className="opacity-50 w-8 h-8" />}
                                </div>
                                <p className="mb-6 text-lg">No {activeTab} found in the database.</p>
                                <button 
                                    onClick={handleSeed}
                                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-bold transition-all border border-white/10 hover:border-white/20 flex items-center gap-2 mx-auto"
                                >
                                    <Database size={18} />
                                    Import Legacy Data
                                </button>
                            </div>
                        ) : filteredItems.length === 0 ? (
                            <div className="p-12 text-center text-zinc-500">
                                <p>No items found in this category.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-white/5">
                                {filteredItems.map((item) => (
                                    <div key={item.id} className="p-5 flex items-center justify-between hover:bg-white/5 transition-colors group">
                                        <div>
                                            <h3 className="font-bold text-white text-lg mb-1 group-hover:text-purple-400 transition-colors">
                                                {activeTab === 'tools' ? item.name : item.content?.en?.title || item.title || 'Untitled'}
                                            </h3>
                                            <p className="text-sm text-zinc-500 font-medium">
                                                <span className="bg-white/5 px-2 py-0.5 rounded text-xs mr-2 border border-white/5">{item.category}</span>
                                                {activeTab === 'tools' ? item.tag_line : ''}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => { setEditingItem(item); setShowModal(true); }} className="p-2.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-transparent hover:border-white/10">
                                                <Edit2 size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(item.id)} className="p-2.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
                        <form onSubmit={handleSave}>
                            <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-md z-10">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <div className="bg-purple-500/20 p-1.5 rounded-lg">
                                        {editingItem ? <Edit2 size={16} className="text-purple-400"/> : <Plus size={16} className="text-purple-400"/>}
                                    </div>
                                    {editingItem ? 'Edit' : 'Add New'} {activeTab === 'tools' ? 'Tool' : 'Prompt'}
                                </h3>
                                <button type="button" onClick={() => setShowModal(false)} className="text-zinc-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-lg">
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <div className="p-6 space-y-6">
                                {/* Shared Settings */}
                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-purple-400 uppercase tracking-wider">Shared Settings</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-zinc-400 mb-2">Category</label>
                                            <input required className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-zinc-700" placeholder="e.g. writing" value={formData.category || ''} onChange={e => handleInputChange('category', e.target.value)} />
                                        </div>
                                        {activeTab === 'tools' && (
                                        <div>
                                            <label className="block text-sm font-medium text-zinc-400 mb-2">Icon Name</label>
                                            <input className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-zinc-700" placeholder="SiOpenai" value={formData.icon_name || ''} onChange={e => handleInputChange('icon_name', e.target.value)} />
                                        </div>
                                        )}
                                    </div>
                                    {activeTab === 'tools' && (
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-2">Website URL</label>
                                        <input className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-zinc-700" placeholder="https://..." value={formData.url || ''} onChange={e => handleInputChange('url', e.target.value)} />
                                    </div>
                                    )}
                                </div>

                                <div className="border-t border-white/10"></div>

                                {/* Content Tabs */}
                                <div>
                                    <div className="flex gap-2 mb-4">
                                        <button type="button" onClick={() => setFormLang('en')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${formLang === 'en' ? 'bg-purple-600 text-white' : 'bg-white/5 text-zinc-400 hover:text-white'}`}>English Content (EN)</button>
                                        <button type="button" onClick={() => setFormLang('ar')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${formLang === 'ar' ? 'bg-purple-600 text-white' : 'bg-white/5 text-zinc-400 hover:text-white'}`}>Arabic Content (AR)</button>
                                    </div>

                                    <div className="space-y-4">
                                        {activeTab === 'tools' && (
                                            <>
                                                <div>
                                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Name ({formLang.toUpperCase()})</label>
                                                    <input 
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-zinc-700" 
                                                        value={formData[`${formLang}_name`] || ''} 
                                                        onChange={e => handleInputChange(`${formLang}_name`, e.target.value)} 
                                                        dir={formLang === 'ar' ? 'rtl' : 'ltr'}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Tag Line ({formLang.toUpperCase()})</label>
                                                    <input 
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-zinc-700" 
                                                        value={formData[`${formLang}_tag`] || ''} 
                                                        onChange={e => handleInputChange(`${formLang}_tag`, e.target.value)}
                                                        dir={formLang === 'ar' ? 'rtl' : 'ltr'} 
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Description ({formLang.toUpperCase()})</label>
                                                    <textarea 
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-zinc-700" 
                                                        rows={3} 
                                                        value={formData[`${formLang}_description`] || ''} 
                                                        onChange={e => handleInputChange(`${formLang}_description`, e.target.value)}
                                                        dir={formLang === 'ar' ? 'rtl' : 'ltr'}
                                                    />
                                                </div>
                                            </>
                                        )}

                                        {activeTab === 'prompts' && (
                                            <>
                                                <div>
                                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Title ({formLang.toUpperCase()})</label>
                                                    <input 
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-zinc-700" 
                                                        value={formData[`${formLang}_title`] || ''} 
                                                        onChange={e => handleInputChange(`${formLang}_title`, e.target.value)}
                                                        dir={formLang === 'ar' ? 'rtl' : 'ltr'}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Prompt Text ({formLang.toUpperCase()})</label>
                                                    <textarea 
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-zinc-700 font-mono text-sm" 
                                                        rows={6} 
                                                        value={formData[`${formLang}_text`] || ''} 
                                                        onChange={e => handleInputChange(`${formLang}_text`, e.target.value)}
                                                        dir={formLang === 'ar' ? 'rtl' : 'ltr'} 
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Tag ({formLang.toUpperCase()})</label>
                                                    <input 
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-zinc-700" 
                                                        value={formData[`${formLang}_tag`] || ''} 
                                                        onChange={e => handleInputChange(`${formLang}_tag`, e.target.value)}
                                                        dir={formLang === 'ar' ? 'rtl' : 'ltr'}
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-6 border-t border-white/10 flex justify-end gap-3 sticky bottom-0 bg-[#0a0a0a]/95 backdrop-blur-md">
                                <button 
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-5 py-2.5 text-zinc-400 hover:text-white font-medium hover:bg-white/5 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-purple-900/20 border border-purple-500/20">
                                    <Save size={18} />
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
