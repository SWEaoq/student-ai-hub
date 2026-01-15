import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Edit2, GraduationCap, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminAcademy = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [tutorials, setTutorials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('categories'); // 'categories' | 'tutorials'

    // Helper to safely get value from item or content JSONB
    const getValue = (item, field, lang = 'en') => {
        if (!item) return '';
        if (item[field] && typeof item[field] === 'string') return item[field];
        if (item.content && item.content[field]) return item.content[field];
        if (item.content && item.content[lang] && item.content[lang][field]) return item.content[lang][field];
        return '';
    };

    const fetchData = async () => {
        setLoading(true);
        const { data: cats, error: err1 } = await supabase.from('academy_categories').select('*').order('id');
        const { data: tuts, error: err2 } = await supabase.from('academy_tutorials').select('*').order('id');
        
        if (err1 || err2) console.error(err1, err2);
        else {
            setCategories(cats || []);
            setTutorials(tuts || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id, table) => {
        if (!confirm('Delete this item?')) return;
        const { error } = await supabase.from(table).delete().eq('id', id);
        if (error) alert(error.message);
        else fetchData();
    };

    return (
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl mt-8">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <GraduationCap className="text-yellow-400" size={24} />
                        Academy Manager
                    </h2>
                    <div className="flex gap-2">
                        <button onClick={() => setActiveSection('categories')} className={`px-3 py-1 rounded-lg text-sm ${activeSection === 'categories' ? 'bg-purple-600 text-white' : 'bg-white/5 text-zinc-400'}`}>Categories</button>
                        <button onClick={() => setActiveSection('tutorials')} className={`px-3 py-1 rounded-lg text-sm ${activeSection === 'tutorials' ? 'bg-purple-600 text-white' : 'bg-white/5 text-zinc-400'}`}>Tutorials</button>
                    </div>
                </div>
                <button 
                    onClick={() => navigate(`/admin/academy/${activeSection === 'categories' ? 'category' : 'tutorial'}/new`)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all hover:scale-105"
                >
                    <Plus size={16} /> Add {activeSection === 'categories' ? 'Category' : 'Tutorial'}
                </button>
            </div>

            {loading ? <div className="text-zinc-500 text-center py-8">Loading...</div> : (
                <div className="grid md:grid-cols-2 gap-4">
                    {activeSection === 'categories' ? categories.map(cat => (
                        <div key={cat.id} className="bg-white/5 p-4 rounded-xl border border-white/10 group hover:bg-white/[0.07] transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <span className="bg-yellow-500/20 text-yellow-500 p-2 rounded-lg">{getValue(cat, 'icon_name')}</span>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => navigate(`/admin/academy/category/edit/${cat.id}`)} className="p-2 hover:bg-white/10 rounded-lg transition-colors"><Edit2 className="text-zinc-400 hover:text-white" size={16} /></button>
                                    <button onClick={() => handleDelete(cat.id, 'academy_categories')} className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="text-red-400 hover:text-red-300" size={16} /></button>
                                </div>
                            </div>
                            <h3 className="font-bold text-white mb-1">
                                {getValue(cat, 'name', 'en') || 'Untitled'}
                            </h3>
                            <p className="text-sm text-zinc-400 line-clamp-2">
                                {getValue(cat, 'description', 'en')}
                            </p>
                        </div>
                    )) : tutorials.map(tut => (
                         <div key={tut.id} className="bg-white/5 p-4 rounded-xl border border-white/10 group flex items-start gap-4 hover:bg-white/[0.07] transition-colors">
                            <div className="bg-blue-500/20 text-blue-400 p-3 rounded-full shrink-0"><Video size={20} /></div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-white mb-1 truncate">
                                    {getValue(tut, 'name', 'en') || 'Untitled'}
                                </h3>
                                <a href={getValue(tut, 'link')} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline block truncate">{getValue(tut, 'link')}</a>
                                <p className="text-xs text-zinc-500 mt-1">
                                    In: {(() => {
                                        const cat = categories.find(c => c.id === getValue(tut, 'category'));
                                        return cat ? (getValue(cat, 'name', 'en') || 'Unknown') : 'Unknown Category';
                                    })()}
                                </p>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                <button onClick={() => navigate(`/admin/academy/tutorial/edit/${tut.id}`)} className="p-2 hover:bg-white/10 rounded-lg transition-colors"><Edit2 className="text-zinc-400 hover:text-white" size={16} /></button>
                                <button onClick={() => handleDelete(tut.id, 'academy_tutorials')} className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="text-red-400 hover:text-red-300" size={16} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminAcademy;
