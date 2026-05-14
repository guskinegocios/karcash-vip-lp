import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, LucideIcon } from 'lucide-react';

interface CtaButtonProps {
    text: string;
    href?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    fullWidth?: boolean;
    icon?: LucideIcon;
    showArrow?: boolean;
    className?: string;
}

export const CtaButton: React.FC<CtaButtonProps> = ({ 
    text, 
    href, 
    onClick,
    variant = 'primary', 
    size = 'md',
    fullWidth = false,
    icon: Icon,
    showArrow = true,
    className = "" 
}) => {
    // Basic variant styles
    const variants = {
        primary: "btn-primary-cta", // Neon Green
        secondary: "bg-white/5 hover:bg-white/10 text-white border border-white/10",
        accent: "bg-[#ff6b00] hover:bg-[#ff8533] text-white shadow-[0_10px_30px_rgba(255,107,0,0.3)] border-none",
        outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/5 border-none shadow-none"
    };

    // Sizes
    const sizes = {
        sm: "px-6 py-2 text-xs",
        md: "px-8 py-3 text-sm",
        lg: "px-10 py-4 text-base",
        xl: "px-12 py-5 text-xl"
    };

    const content = (
        <>
            {Icon && <Icon className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'}`} />}
            {text}
            {showArrow && <ChevronRight className={`${size === 'sm' ? 'w-4 h-4' : 'w-6 h-6'} group-hover:translate-x-1.5 transition-transform duration-300`} />}
        </>
    );

    const buttonProps = {
        className: `
            ${variants[variant]} 
            ${sizes[size]} 
            ${fullWidth ? 'w-full' : 'w-max'} 
            group flex items-center justify-center gap-3 rounded-2xl transition-all font-black uppercase tracking-wider
            ${className}
        `,
        whileHover: { scale: 1.02, y: -4 },
        whileTap: { scale: 0.98 }
    };

    if (href) {
        return (
            <a href={href} className={`${fullWidth ? 'w-full' : 'w-max'} inline-block`}>
                <motion.button {...buttonProps}>
                    {content}
                </motion.button>
            </a>
        );
    }

    return (
        <motion.button onClick={onClick} {...buttonProps}>
            {content}
        </motion.button>
    );
};
