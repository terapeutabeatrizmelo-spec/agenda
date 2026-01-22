import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface YearPickerProps {
    isOpen: boolean;
    currentYear: number;
    onClose: () => void;
    onYearSelect: (year: number) => void;
}

export const YearPicker: React.FC<YearPickerProps> = ({ isOpen, currentYear, onClose, onYearSelect }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const years = Array.from({ length: 201 }, (_, i) => 1900 + i); // 1900 to 2100

    useEffect(() => {
        if (isOpen && scrollRef.current) {
            // Scroll to current year
            const yearIndex = years.indexOf(currentYear);
            const itemHeight = 48; // Height of each year item
            const containerHeight = scrollRef.current.clientHeight;
            const scrollPosition = yearIndex * itemHeight - containerHeight / 2 + itemHeight / 2;

            setTimeout(() => {
                scrollRef.current?.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }, [isOpen, currentYear, years]);

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Year Picker Modal */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 max-h-96 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl z-50 border border-white/10">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <h3 className="text-lg font-bold text-white">Selecione o Ano</h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Year List */}
                <div
                    ref={scrollRef}
                    className="overflow-y-auto custom-scrollbar p-2"
                    style={{ maxHeight: '320px' }}
                >
                    {years.map(year => (
                        <button
                            key={year}
                            onClick={() => {
                                onYearSelect(year);
                                onClose();
                            }}
                            className={`w-full px-4 py-3 rounded-xl text-center transition-all duration-200 ${year === currentYear
                                    ? 'bg-violet-500 text-white font-bold shadow-lg shadow-violet-500/30'
                                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {year}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};
