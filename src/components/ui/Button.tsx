import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'glass' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    ...props
}) => {
    const baseStyles = "relative overflow-hidden transition-all duration-300 rounded-xl font-medium flex items-center justify-center cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:brightness-110 border border-violet-400/20",
        secondary: "bg-cyan-600 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:brightness-110",
        glass: "glass-panel hover:bg-white/10 text-white border-white/10 hover:border-white/20",
        danger: "bg-rose-500/80 hover:bg-rose-600 text-white backdrop-blur-sm",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-6 py-2.5",
        lg: "px-8 py-3.5 text-lg",
        icon: "w-12 h-12 rounded-full p-2 flex items-center justify-center", // FAB style
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>
            {/* Glow effect for primary/secondary */}
            {(variant === 'primary' || variant === 'secondary') && (
                <div className="absolute inset-0 bg-white/20 blur-md opacity-0 hover:opacity-100 transition-opacity duration-300" />
            )}
        </button>
    );
};
