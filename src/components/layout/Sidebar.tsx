import React from 'react';
import { X, Calendar, LayoutGrid, List } from 'lucide-react';
import type { ViewMode } from '../../types';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    viewMode: ViewMode;
    onViewChange: (mode: ViewMode) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, viewMode, onViewChange }) => {
    const views: { mode: ViewMode; icon: typeof Calendar; label: string }[] = [
        { mode: 'agenda', icon: Calendar, label: 'Agenda' },
        { mode: 'day', icon: List, label: 'Dia' },
        { mode: 'week', icon: LayoutGrid, label: 'Semana' },
        { mode: 'month', icon: Calendar, label: 'Mês' }
    ];

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-br from-slate-900 to-slate-800 z-50 transform transition-transform duration-300 ease-out shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-500 to-cyan-500 flex items-center justify-center">
                            <img src="/coffee-cup-v5.png" alt="Coffee Cup" className="w-[115%] h-[115%] object-contain" />
                        </div>
                        <h2 className="text-lg font-bold text-white">Terapia com Café</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4">
                    <div className="space-y-1">
                        {views.map(({ mode, icon: Icon, label }) => (
                            <button
                                key={mode}
                                onClick={() => {
                                    onViewChange(mode);
                                    onClose();
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${viewMode === mode
                                    ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30'
                                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <Icon size={20} className={viewMode === mode ? 'stroke-[2.5px]' : ''} />
                                <span className="font-medium">{label}</span>
                            </button>
                        ))}
                    </div>
                </nav>
            </div>
        </>
    );
};
