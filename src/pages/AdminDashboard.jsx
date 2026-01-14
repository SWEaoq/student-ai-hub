import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, PenTool, MessageSquare, LogOut, Settings, Layout, Link as LinkIcon, Globe, GraduationCap, Book } from 'lucide-react';

// Import Sub-components
import AdminTools from '../components/admin/AdminTools';
import AdminPrompts from '../components/admin/AdminPrompts';
import AdminSettings from '../components/admin/AdminSettings';
import AdminNavigation from '../components/admin/AdminNavigation';
import AdminHome from '../components/admin/AdminHome';
import AdminAcademy from '../components/admin/AdminAcademy';
import AdminPlaybook from '../components/admin/AdminPlaybook';
import AITestButton from '../components/admin/AITestButton';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('tools');

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) navigate('/admin/login');
        };
        checkUser();
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    const tabs = [
        { id: 'settings', label: 'Site Settings', icon: Settings, component: <AdminSettings /> },
        { id: 'navigation', label: 'Navigation', icon: LinkIcon, component: <AdminNavigation /> },
        { id: 'home', label: 'Home Cards', icon: Layout, component: <AdminHome /> },
        { id: 'tools', label: 'Tools', icon: PenTool, component: <AdminTools /> },
        { id: 'academy', label: 'Academy', icon: GraduationCap, component: <AdminAcademy /> },
        { id: 'playbooks', label: 'Playbooks', icon: Book, component: <AdminPlaybook /> },
        { id: 'prompts', label: 'Prompts', icon: MessageSquare, component: <AdminPrompts /> },
    ];

    return (
        <div className="min-h-screen w-full text-white relative bg-black">
            {/* Navbar */}
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
                {/* AI Connection Test */}
                <AITestButton />
                
                {/* Tabs Navigation */}
                <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                                activeTab === tab.id
                                    ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)]' 
                                    : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area - Animate transition could go here */}
                <div className="min-h-[60vh]">
                    {tabs.find(t => t.id === activeTab)?.component}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
