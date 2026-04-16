import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface CtaButtonProps {
    text?: string;
    href?: string;
    className?: string; // For wrapper styling (e.g. margin, alignment)
}

export const CtaButton: React.FC<CtaButtonProps> = ({ 
    text = "QUERO ACESSO AGORA", 
    href = "/checkout", 
    className = "" 
}) => {
    return (
        <div className={`flex justify-center w-full ${className}`}>
            <a href={href} className="w-full sm:w-auto inline-block">
                <motion.button
                    className="btn-primary-cta w-full sm:w-auto px-10 py-4 text-xl group flex items-center justify-center gap-4 rounded-2xl shadow-[0_20px_50px_rgba(11,115,71,0.2)] hover:shadow-primary/30 transition-all font-black uppercase tracking-wider"
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {text}
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform duration-300" />
                </motion.button>
            </a>
        </div>
    );
};
