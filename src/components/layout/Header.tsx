import React from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar, LayoutGrid, List } from 'lucide-react';
import { formatMonthYear } from '../../utils/dateUtils';
import { Button } from '../ui/Button';
import type { ViewMode } from '../../types';

interface HeaderProps {
    currentDate: Date;
    viewMode: ViewMode;
    onPrev: () => void;
    onNext: () => void;
    onToday: () => void;
    onViewChange: (mode: ViewMode) => void;
    onAddClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    currentDate,
    viewMode,
    onPrev,
    onNext,
    onToday,
    onViewChange,
    onAddClick
}) => {
    const ViewIcon = {
        day: List,
        week: LayoutGrid,
        month: Calendar
    };

    return (
        <header className="h-[var(--header-height)] px-4 md:px-6 flex items-center justify-between glass-panel mx-2 md:mx-4 mt-2 md:mt-4 mb-2 z-50 transition-all duration-300">
            <div className="flex items-center gap-2 md:gap-4 flex-1">
                {/* Logo / Title */}
                <div className="flex items-center gap-2 md:gap-3 relative group shrink-0">
                    {/* Steam Animation Overlay */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-in fade-in zoom-in hidden md:block">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white/60">
                            <path d="M8 3 Q 8 1, 9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="animate-[steam_2s_ease-in-out_infinite]" />
                            <path d="M12 2 Q 12 0, 13 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="animate-[steam_2s_ease-in-out_infinite_0.3s]" />
                            <path d="M16 3 Q 16 1, 17 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="animate-[steam_2s_ease-in-out_infinite_0.6s]" />
                        </svg>
                    </div>

                    <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl bg-gradient-to-tr from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20 z-10 shrink-0">
                        <img src="/coffee-cup-v5.png" alt="Coffee Cup" className="w-[115%] h-[115%] object-contain drop-shadow-md" />
                    </div>
                    <h1 className="text-lg md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 hidden lg:block">
                        Agenda Terapia com Café
                    </h1>
                </div>

                {/* Date Navigation */}
                <div className="flex items-center gap-1 md:gap-2 bg-black/20 p-1 rounded-xl border border-white/5 shrink-0">
                    <button onClick={onPrev} className="p-1.5 md:p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors">
                        <ChevronLeft size={18} className="md:w-5 md:h-5" />
                    </button>
                    <button onClick={onNext} className="p-1.5 md:p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors">
                        <ChevronRight size={18} className="md:w-5 md:h-5" />
                    </button>
                    <button onClick={onToday} className="px-2 md:px-3 py-1 text-xs md:text-sm font-medium hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors">
                        Hoje
                    </button>
                </div>

                <h2 className="text-sm md:text-xl font-medium text-white ml-2 capitalize truncate flex-1 min-w-0">
                    {formatMonthYear(currentDate)}
                </h2>
            </div>

            <div className="flex items-center gap-2 md:gap-4 shrink-0 pl-2">
                {/* View Switcher - Icons on Mobile, Text on Desktop */}
                <div className="flex bg-black/20 p-1 rounded-xl border border-white/5 gap-1">
                    {(['day', 'week', 'month'] as const).map((mode) => {
                        const Icon = ViewIcon[mode];
                        const labels = { day: 'Dia', week: 'Semana', month: 'Mês' };
                        const isActive = viewMode === mode;

                        return (
                            <button
                                key={mode}
                                onClick={() => onViewChange(mode)}
                                className={`
                                    relative flex items-center justify-center
                                    w-9 h-9 md:w-auto md:h-auto md:px-4 md:py-1.5 
                                    rounded-lg text-sm font-medium transition-all duration-200
                                    ${isActive ? 'text-white bg-white/10 shadow-sm' : 'text-white/50 hover:text-white hover:bg-white/5'}
                                `}
                                title={labels[mode]}
                            >
                                <span className="hidden md:inline">{labels[mode]}</span>
                                <Icon size={20} className={`${isActive ? 'stroke-[2.5px]' : ''}`} />
                            </button>
                        );
                    })}
                </div>

                <Button onClick={onAddClick} variant="primary" className="shadow-violet-500/20 !p-2 md:!px-4 md:!py-2 w-9 h-9 md:w-auto md:h-auto flex items-center justify-center">
                    <Plus size={20} />
                    <span className="hidden md:inline ml-2">Novo</span>
                </Button>
            </div>
        </header>
    );
};
