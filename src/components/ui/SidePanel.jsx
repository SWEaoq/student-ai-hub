import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const SidePanel = ({ isOpen, onClose, title, children, footer, width = "max-w-2xl" }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300); // Wait for animation
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    return (
        <div className={`fixed inset-0 z-[9999] flex justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
                onClick={onClose}
            />

            {/* Panel */}
            <div 
                className={`
                    relative w-full ${width} h-full bg-[#0a0a0a] border-l border-white/10 shadow-2xl 
                    flex flex-col transform transition-transform duration-300 ease-out
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                {/* Header */}
                <div className="flex-none px-6 py-5 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a] z-10">
                    <h2 className="text-xl font-bold text-white max-w-[80%] truncate">{title}</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 custom-scrollbar">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="flex-none px-6 py-4 border-t border-white/10 bg-[#0a0a0a] z-10">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SidePanel;
