import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Edit2, Save, X, MessageSquare } from 'lucide-react';
import AIGenerator from './AIGenerator';

const AdminPrompts = () => {
    const [prompts, setPrompts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});
    const [formLang, setFormLang] = useState('en');

    const fetchPrompts = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('prompts').select('*');
        if (error) console.error(error);
        else setPrompts(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchPrompts();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('Delete this prompt?')) return;
        const { error } = await supabase.from('prompts').delete().eq('id', id);
        if (error) alert(error.message);
        else fetchPrompts();
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                category: formData.category,
                content: {
                    en: {
                        title: formData.en_title,
                        text: formData.en_text,
                        tag: formData.en_tag
                    },
                    ar: {
                        title: formData.ar_title,
                        text: formData.ar_text,
                        tag: formData.ar_tag
                    }
                }
            };

            const query = editingItem 
                ? supabase.from('prompts').update(payload).eq('id', editingItem.id)
                : supabase.from('prompts').insert([{
                    ...payload,
                    id: crypto.randomUUID()
                }]);

            const { error } = await query;
            if (error) throw error;
            
            setShowModal(false);
            fetchPrompts();
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (editingItem) {
            const content = editingItem.content || {};
            setFormData({
                category: editingItem.category,
                en_title: content.en?.title || editingItem.title,
                en_text: content.en?.text || editingItem.text || editingItem.body,
                en_tag: content.en?.tag || editingItem.tag,
                ar_title: content.ar?.title,
                ar_text: content.ar?.text,
                ar_tag: content.ar?.tag,
            });
        } else {
            setFormData({});
        }
    }, [editingItem]);

    const getPromptTitle = (prompt) => {
        return prompt.content?.en?.title || prompt.title || 'Untitled Prompt';
    };

    const getPromptText = (prompt) => {
        return prompt.content?.en?.text || prompt.text || prompt.body || '';
    };

    return (
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl mt-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <MessageSquare className="text-green-400" size={24} />
                    Prompts
                </h2>
                <button 
                    onClick={() => { setEditingItem(null); setShowModal(true); }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
                >
                    <Plus size={16} /> Add Prompt
                </button>
            </div>

            {loading ? (
                <div className="text-zinc-500 text-center py-8">Loading prompts...</div>
            ) : (
                <div className="grid md:grid-cols-2 gap-4">
                    {prompts.map((prompt) => (
                        <div key={prompt.id} className="bg-white/5 p-4 rounded-xl border border-white/10 text-white">
                            <div className="flex justify-between items-start mb-2">
                                <span className="bg-white/10 px-2 py-1 rounded text-xs text-zinc-400">{prompt.category}</span>
                                <div className="flex gap-2">
                                    <button onClick={() => { setEditingItem(prompt); setShowModal(true); }}><Edit2 size={16} className="text-zinc-400 hover:text-white" /></button>
                                    <button onClick={() => handleDelete(prompt.id)}><Trash2 size={16} className="text-red-400 hover:text-red-300" /></button>
                                </div>
                            </div>
                            <h3 className="font-bold mb-1">{getPromptTitle(prompt)}</h3>
                            <p className="text-sm text-zinc-400 line-clamp-3 font-mono bg-black/20 p-2 rounded">{getPromptText(prompt)}</p>
                        </div>
                    ))}
                    {prompts.length === 0 && (
                        <div className="col-span-2 text-center text-zinc-500 py-8">
                            No prompts found. Click "Add Prompt" to create one.
                        </div>
                    )}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <h3 className="text-xl font-bold text-white mb-4">{editingItem ? 'Edit' : 'Add'} Prompt</h3>
                            
                            <div className="flex gap-2 border-b border-white/10 pb-4">
                                <button type="button" onClick={() => setFormLang('en')} className={`px-3 py-1 rounded text-sm ${formLang === 'en' ? 'bg-purple-600' : 'bg-white/5'}`}>EN</button>
                                <button type="button" onClick={() => setFormLang('ar')} className={`px-3 py-1 rounded text-sm ${formLang === 'ar' ? 'bg-purple-600' : 'bg-white/5'}`}>AR</button>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Title ({formLang.toUpperCase()})
                                </label>
                                <div className="flex gap-2">
                                    <input 
                                        className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3 text-white" 
                                        placeholder={`Enter title (${formLang})`} 
                                        value={formData[`${formLang}_title`] || ''} 
                                        onChange={e => setFormData({...formData, [`${formLang}_title`]: e.target.value})} 
                                        dir={formLang === 'ar' ? 'rtl' : 'ltr'} 
                                    />
                                    {formLang === 'en' && formData.en_title && (
                                        <AIGenerator
                                            type="translation"
                                            context={{ text: formData.en_title }}
                                            lang="ar"
                                            onGenerate={(text) => setFormData({...formData, ar_title: text})}
                                            label="🌐"
                                            className="shrink-0"
                                        />
                                    )}
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Category
                                </label>
                                <input 
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white" 
                                    placeholder="Category" 
                                    value={formData.category || ''} 
                                    onChange={e => setFormData({...formData, category: e.target.value})} 
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Prompt Text ({formLang.toUpperCase()})
                                </label>
                                <div className="flex gap-2">
                                    <textarea 
                                        className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3 text-white font-mono resize-none" 
                                        placeholder={`Enter prompt text (${formLang})`} 
                                        value={formData[`${formLang}_text`] || ''} 
                                        onChange={e => setFormData({...formData, [`${formLang}_text`]: e.target.value})} 
                                        rows={6} 
                                        dir={formLang === 'ar' ? 'rtl' : 'ltr'} 
                                    />
                                    <div className="flex flex-col gap-2 shrink-0">
                                        {formLang === 'en' && formData.category && formData.en_title && (
                                            <AIGenerator
                                                type="prompt"
                                                context={{ 
                                                    category: formData.category,
                                                    title: formData.en_title
                                                }}
                                                lang="en"
                                                onGenerate={(text) => setFormData({...formData, en_text: text})}
                                                label="🤖"
                                                className="shrink-0"
                                            />
                                        )}
                                        {formLang === 'en' && formData.en_text && (
                                            <AIGenerator
                                                type="translation"
                                                context={{ text: formData.en_text }}
                                                lang="ar"
                                                onGenerate={(text) => setFormData({...formData, ar_text: text})}
                                                label="🌐"
                                                className="shrink-0"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Tag ({formLang.toUpperCase()})
                                </label>
                                <div className="flex gap-2">
                                    <input 
                                        className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3 text-white" 
                                        placeholder={`Enter tag (${formLang})`} 
                                        value={formData[`${formLang}_tag`] || ''} 
                                        onChange={e => setFormData({...formData, [`${formLang}_tag`]: e.target.value})} 
                                        dir={formLang === 'ar' ? 'rtl' : 'ltr'} 
                                    />
                                    {formLang === 'en' && formData.en_tag && (
                                        <AIGenerator
                                            type="translation"
                                            context={{ text: formData.en_tag }}
                                            lang="ar"
                                            onGenerate={(text) => setFormData({...formData, ar_tag: text})}
                                            label="🌐"
                                            className="shrink-0"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-zinc-400">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-purple-600 rounded-lg text-white font-bold">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPrompts;
