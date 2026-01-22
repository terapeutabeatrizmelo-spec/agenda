import React from 'react';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
    onClick: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-tr from-violet-500 to-cyan-500 rounded-full shadow-2xl shadow-violet-500/50 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform duration-200 z-50 group ring-2 ring-white/20 hover:ring-white/40"
            aria-label="Novo compromisso"
        >
            <Plus size={28} className="stroke-[2.5px] group-hover:rotate-90 transition-transform duration-300" />
        </button>
    );
};
