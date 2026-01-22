import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
    onClose: (id: string) => void;
}

const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-400" />,
    error: <AlertCircle className="w-5 h-5 text-red-400" />,
    info: <Info className="w-5 h-5 text-blue-400" />,
};

const styles = {
    success: 'border-green-500/20 bg-green-500/10 text-green-100',
    error: 'border-red-500/20 bg-red-500/10 text-red-100',
    info: 'border-blue-500/20 bg-blue-500/10 text-blue-100',
};

export function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

export const Toast: React.FC<ToastProps> = ({ id, message, type, duration = 3000, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(id);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, id, onClose]);

    return (
        <div
            className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-lg transition-all animate-in slide-in-from-right-full duration-300 pointer-events-auto min-w-[300px]",
                styles[type]
            )}
            role="alert"
        >
            {icons[type]}
            <p className="flex-1 text-sm font-medium">{message}</p>
            <button
                onClick={() => onClose(id)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors opacity-70 hover:opacity-100"
            >
                <X size={16} />
            </button>
        </div>
    );
};
