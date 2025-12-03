import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Playbook from './pages/Playbook';
import Prompts from './pages/Prompts';
import ToolDetail from './pages/ToolDetail';
import PlaybookDetail from './pages/PlaybookDetail';

function App() {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className={`min-h-screen bg-black text-white selection:bg-neon-purple selection:text-white`} style={{ fontFamily: lang === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif' }}>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&display=swap');`}
      </style>
      {/* Global Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-neon-purple/30 rounded-full blur-[128px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-neon-green/20 rounded-full blur-[128px]" />
        <div className="absolute top-[40%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-neon-pink/15 rounded-full blur-[128px]" />
      </div>

      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>

      <Navbar lang={lang} setLang={setLang} />
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col min-h-screen">

        <main className="flex-grow flex flex-col items-center w-full">
          <Routes>
            <Route
              path="/"
              element={<Home lang={lang} />}
            />
            <Route
              path="/tools"
              element={<Tools lang={lang} />}
            />
            <Route
              path="/playbook"
              element={<Playbook lang={lang} />}
            />
            <Route
              path="/prompts"
              element={<Prompts lang={lang} />}
            />
            <Route
              path="/tool/:id"
              element={<ToolDetail lang={lang} />}
            />
            <Route
              path="/playbook/:id"
              element={<PlaybookDetail lang={lang} />}
            />
          </Routes>
        </main>

        <footer className="py-8 text-center text-gray-600 text-sm">
          <p>© 2025 Student AI Hub. Built with React & Tailwind.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
