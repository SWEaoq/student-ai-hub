import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Edit2, Save, X, MessageSquare } from 'lucide-react';

const AdminPrompts = () => {
    const [prompts, setPrompts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});
    const [formLang, setFormLang] = useState('en');

    const fetchPrompts = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('prompts').select('*').order('created_at', { ascending: false });
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
                : supabase.from('prompts').insert([payload]);

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
                en_title: content.en?.title,
                en_text: content.en?.text,
                en_tag: content.en?.tag,
                ar_title: content.ar?.title,
                ar_text: content.ar?.text,
                ar_tag: content.ar?.tag,
            });
        } else {
            setFormData({});
        }
    }, [editingItem]);

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
                        <h3 className="font-bold mb-1">{prompt.content?.en?.title}</h3>
                        <p className="text-sm text-zinc-400 line-clamp-3 font-mono bg-black/20 p-2 rounded">{prompt.content?.en?.text}</p>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <h3 className="text-xl font-bold text-white mb-4">{editingItem ? 'Edit' : 'Add'} Prompt</h3>
                            
                            <div className="flex gap-2 border-b border-white/10 pb-4">
                                <button type="button" onClick={() => setFormLang('en')} className={`px-3 py-1 rounded text-sm ${formLang === 'en' ? 'bg-purple-600' : 'bg-white/5'}`}>EN</button>
                                <button type="button" onClick={() => setFormLang('ar')} className={`px-3 py-1 rounded text-sm ${formLang === 'ar' ? 'bg-purple-600' : 'bg-white/5'}`}>AR</button>
                            </div>

                            <input className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white" placeholder={`Title (${formLang})`} value={formData[`${formLang}_title`] || ''} onChange={e => setFormData({...formData, [`${formLang}_title`]: e.target.value})} dir={formLang === 'ar' ? 'rtl' : 'ltr'} />
                            <input className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white" placeholder="Category" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} />
                            <textarea className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white font-mono" placeholder={`Prompt Text (${formLang})`} value={formData[`${formLang}_text`] || ''} onChange={e => setFormData({...formData, [`${formLang}_text`]: e.target.value})} rows={6} dir={formLang === 'ar' ? 'rtl' : 'ltr'} />
                            <input className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white" placeholder={`Tag (${formLang})`} value={formData[`${formLang}_tag`] || ''} onChange={e => setFormData({...formData, [`${formLang}_tag`]: e.target.value})} dir={formLang === 'ar' ? 'rtl' : 'ltr'} />

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
