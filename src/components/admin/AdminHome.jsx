import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Edit2, Save, X, Layout } from 'lucide-react';

const GRADIENTS = [
    { label: 'Blue', value: 'blue' },
    { label: 'Purple', value: 'purple' },
    { label: 'Green', value: 'green' },
    { label: 'Red', value: 'red' },
    { label: 'Orange', value: 'orange' },
    { label: 'Cyan', value: 'cyan' },
    { label: 'Pink', value: 'pink' },
];

const AdminHome = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});
    const [formLang, setFormLang] = useState('en');

    const fetchCards = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('home_cards').select('*').order('order', { ascending: true });
        if (error) console.error(error);
        else setCards(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchCards();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('Delete this card?')) return;
        const { error } = await supabase.from('home_cards').delete().eq('id', id);
        if (error) alert(error.message);
        else fetchCards();
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                title: { 
                    en: formData.en_title, 
                    ar: formData.ar_title 
                },
                description: { 
                    en: formData.en_desc, 
                    ar: formData.ar_desc 
                },
                icon_name: formData.icon_name,
                link: formData.link,
                color: formData.color || 'purple',
                order: formData.order || 0,
                is_featured: formData.is_featured
            };

            const query = editingItem 
                ? supabase.from('home_cards').update(payload).eq('id', editingItem.id)
                : supabase.from('home_cards').insert([payload]);

            const { error } = await query;
            if (error) throw error;
            
            setShowModal(false);
            fetchCards();
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (editingItem) {
            setFormData({
                en_title: editingItem.title?.en || '',
                ar_title: editingItem.title?.ar || '',
                en_desc: editingItem.description?.en || '',
                ar_desc: editingItem.description?.ar || '',
                icon_name: editingItem.icon_name,
                link: editingItem.link,
                color: editingItem.color,
                order: editingItem.order,
                is_featured: editingItem.is_featured
            });
        } else {
            setFormData({});
        }
    }, [editingItem]);

    return (
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl mt-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Layout className="text-pink-400" size={24} />
                    Home Cards
                </h2>
                <button 
                    onClick={() => { setEditingItem(null); setShowModal(true); }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
                >
                    <Plus size={16} /> Add Card
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cards.map((card) => (
                    <div key={card.id} className="bg-white/5 p-4 rounded-xl border border-white/10 group hover:border-white/20 transition-all">
                        <div className="flex justify-between items-start mb-3">
                            <div className={`w-10 h-10 rounded-lg bg-${card.color}-500/20 flex items-center justify-center text-${card.color}-400`}>
                                <span className="text-xs">{card.icon_name && card.icon_name.slice(0,2)}</span>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => { setEditingItem(card); setShowModal(true); }} className="text-zinc-400 hover:text-white"><Edit2 size={16} /></button>
                                <button onClick={() => handleDelete(card.id)} className="text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
                            </div>
                        </div>
                        <h3 className="font-bold text-white mb-1">{card.title?.en}</h3>
                        <p className="text-xs text-zinc-500 line-clamp-2">{card.description?.en}</p>
                        <div className="mt-3 flex gap-2 text-xs">
                           <span className="bg-white/10 px-2 py-1 rounded text-zinc-400">Order: {card.order}</span>
                           {card.is_featured && <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded">Featured</span>}
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <h3 className="text-xl font-bold text-white mb-4">{editingItem ? 'Edit' : 'Add'} Home Card</h3>
                             
                             <div className="flex gap-2 border-b border-white/10 pb-4">
                                <button type="button" onClick={() => setFormLang('en')} className={`px-3 py-1 rounded text-sm ${formLang === 'en' ? 'bg-purple-600' : 'bg-white/5'}`}>EN</button>
                                <button type="button" onClick={() => setFormLang('ar')} className={`px-3 py-1 rounded text-sm ${formLang === 'ar' ? 'bg-purple-600' : 'bg-white/5'}`}>AR</button>
                             </div>

                             <input className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white" placeholder={`Title (${formLang})`} value={formData[`${formLang}_title`] || ''} onChange={e => setFormData({...formData, [`${formLang}_title`]: e.target.value})} required dir={formLang === 'ar' ? 'rtl' : 'ltr'} />
                             <textarea className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white" placeholder={`Description (${formLang})`} value={formData[`${formLang}_desc`] || ''} onChange={e => setFormData({...formData, [`${formLang}_desc`]: e.target.value})} rows={3} dir={formLang === 'ar' ? 'rtl' : 'ltr'} />

                             <div className="grid grid-cols-2 gap-4">
                                <input className="bg-white/5 border border-white/10 rounded-lg p-3 text-white" placeholder="Icon Name (e.g. Zap)" value={formData.icon_name || ''} onChange={e => setFormData({...formData, icon_name: e.target.value})} />
                                <input className="bg-white/5 border border-white/10 rounded-lg p-3 text-white" placeholder="Link (/tools)" value={formData.link || ''} onChange={e => setFormData({...formData, link: e.target.value})} />
                             </div>

                             <div className="flex gap-4 items-center">
                                <input type="number" className="bg-white/5 border border-white/10 rounded-lg p-3 text-white w-24" placeholder="Order" value={formData.order || 0} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} />
                                <label className="flex items-center gap-2 text-white">
                                    <input type="checkbox" checked={formData.is_featured || false} onChange={e => setFormData({...formData, is_featured: e.target.checked})} className="rounded bg-white/5 border-white/10" />
                                    Featured?
                                </label>
                             </div>

                             <div>
                                <label className="block text-xs text-zinc-500 mb-2">Color Theme</label>
                                <div className="flex gap-2 flex-wrap">
                                    {GRADIENTS.map(g => (
                                        <button type="button" key={g.value} onClick={() => setFormData({...formData, color: g.value})} className={`w-8 h-8 rounded-full bg-${g.value}-500 ${formData.color === g.value ? 'ring-2 ring-white' : ''}`} title={g.label} />
                                    ))}
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

export default AdminHome;
