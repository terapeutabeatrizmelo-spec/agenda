import React from 'react';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { format } from 'date-fns';

interface HeaderProps {
    currentDate: Date;
    onPrev: () => void;
    onNext: () => void;
    onToday: () => void;
    onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    currentDate,
    onPrev,
    onNext,
    onToday,
    onMenuClick
}) => {
    return (
        <header className="h-[var(--header-height)] px-4 md:px-6 flex items-center justify-between glass-panel mx-2 md:mx-4 mt-2 md:mt-4 mb-2 z-50 transition-all duration-300">
            <div className="flex items-center gap-3 md:gap-4">
                {/* Menu Button */}
                <button
                    onClick={onMenuClick}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white"
                    aria-label="Menu"
                >
                    <Menu size={24} />
                </button>

                {/* Logo - Mobile (icon only) */}
                <div className="flex md:hidden items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                        <img src="/coffee-cup-v5.png" alt="Coffee Cup" className="w-[115%] h-[115%] object-contain drop-shadow-md" />
                    </div>
                    <h1 className="text-base font-bold text-white">
                        Terapia com Café
                    </h1>
                </div>

                {/* Logo - Desktop (full) */}
                <div className="hidden md:flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                        <img src="/coffee-cup-v5.png" alt="Coffee Cup" className="w-[115%] h-[115%] object-contain drop-shadow-md" />
                    </div>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        Agenda Terapia com Café
                    </h1>
                </div>

                {/* Year */}
                <h2 className="text-lg md:text-xl font-semibold text-white/70">
                    {format(currentDate, 'yyyy')}
                </h2>
            </div>

            {/* Date Navigation */}
            <div className="flex items-center gap-2 md:gap-3 bg-black/20 p-1.5 rounded-xl border border-white/5">
                <button
                    onClick={onPrev}
                    className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors"
                    aria-label="Mês anterior"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={onToday}
                    className="px-4 py-2 text-sm font-medium hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors"
                >
                    Hoje
                </button>
                <button
                    onClick={onNext}
                    className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors"
                    aria-label="Próximo mês"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </header>
    );
};
