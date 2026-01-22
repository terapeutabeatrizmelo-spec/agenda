import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="glass-panel w-full max-w-md relative z-10 p-6 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gradient">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="custom-scrollbar max-h-[80vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};
