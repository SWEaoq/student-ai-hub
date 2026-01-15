import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Edit2, Book } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPlaybook = () => {
    const navigate = useNavigate();
    const [playbooks, setPlaybooks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Helper to safely get value from item or content JSONB
    const getValue = (item, field, lang = 'en') => {
        if (!item) return '';
        // 1. Try direct column if it exists (e.g. item.title)
        if (item[field] && typeof item[field] === 'string') return item[field];
        // 2. Try content root (for link, category etc)
        if (item.content && item.content[field]) return item.content[field];
        // 3. Try content lang specific
        if (item.content && item.content[lang] && item.content[lang][field]) return item.content[lang][field];
        // 4. Try legacy nested title/desc if they were objects
        if (item[field] && item[field][lang]) return item[field][lang];
        
        return '';
    };

    const fetchPlaybooks = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('playbooks').select('*').order('id', { ascending: false });
        if (error) console.error(error);
        else {
            setPlaybooks(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPlaybooks();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('Delete this playbook?')) return;
        const { error } = await supabase.from('playbooks').delete().eq('id', id);
        if (error) alert(error.message);
        else fetchPlaybooks();
    };

    return (
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl mt-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Book className="text-emerald-400" size={24} />
                    Playbooks
                </h2>
                <button 
                    onClick={() => navigate('/admin/playbooks/new')}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all hover:scale-105"
                >
                    <Plus size={16} /> Add Playbook
                </button>
            </div>

            {loading ? (
                <div className="text-center py-12 text-zinc-500">Loading playbooks...</div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {playbooks.map((item) => (
                        <div key={item.id} className="bg-white/5 rounded-xl border border-white/10 overflow-hidden group hover:bg-white/[0.07] transition-colors">
                            <div className="h-40 bg-zinc-800 relative">
                                {getValue(item, 'image_url') ? (
                                    <img src={getValue(item, 'image_url')} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-600"><Book size={48} /></div>
                                )}
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 p-1 rounded-lg">
                                    <button onClick={() => navigate(`/admin/playbooks/edit/${item.id}`)} className="text-white hover:text-purple-400 p-1"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300 p-1"><Trash2 size={16} /></button>
                                </div>
                            </div>
                            <div className="p-4">
                                <span className="text-xs font-bold text-emerald-400 mb-1 block uppercase tracking-wider">
                                    {getValue(item, 'category') || 'Uncategorized'}
                                </span>
                                <h3 className="font-bold text-white mb-2 line-clamp-1">
                                    {getValue(item, 'title', 'en') || 'Untitled'}
                                </h3>
                                <p className="text-sm text-zinc-400 line-clamp-2">
                                    {getValue(item, 'description', 'en')}
                                </p>
                                <a href={getValue(item, 'link')} target="_blank" rel="noreferrer" className="mt-3 block text-purple-400 text-xs hover:underline">View Playbook &rarr;</a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminPlaybook;
