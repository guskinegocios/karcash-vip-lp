import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Sparkles } from "lucide-react";

interface VIPSidebarWidgetProps {
    onClick: () => void;
    isOpen: boolean;
}

const VIPCustomIcon = () => (
    <svg viewBox="0 0 100 100" className="w-6 h-6 relative z-10 text-black">
        {/* Stylized Hexagonal Seal */}
        <path 
            d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        />
        {/* Dynamic Growth Arrow */}
        <path 
            d="M35 65 L48 52 L58 62 L75 35" 
            stroke="currentColor" 
            strokeWidth="8" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        />
        <path 
            d="M60 35 H75 V50" 
            stroke="currentColor" 
            strokeWidth="8" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        />
        {/* Subtle $ Symbol */}
        <circle cx="50" cy="50" r="40" fill="currentColor" fillOpacity="0.05" />
    </svg>
);

export const VIPSidebarWidget = ({ onClick, isOpen }: VIPSidebarWidgetProps) => {
    return (
        <AnimatePresence>
            {!isOpen && (
                <>
                    {/* Desktop Version (Side Tab) */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] hidden md:block"
                    >
                        <button
                            onClick={onClick}
                            className="relative flex items-center group"
                        >
                            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-l-2xl group-hover:bg-primary/40 transition-all duration-500" />
                            
                            <div className="relative flex items-center bg-gradient-to-b from-primary to-primary/80 text-black py-6 px-3 rounded-l-2xl border-l border-y border-white/20 shadow-[-10px_0_30px_rgba(var(--primary-rgb),0.3)] hover:shadow-[-10px_0_40px_rgba(var(--primary-rgb),0.5)] transition-all duration-300 group-hover:-translate-x-3">
                                <div className="flex flex-col items-center gap-4 text-center">
                                    <Sparkles className="w-5 h-5 animate-pulse" />
                                    <span 
                                        className="font-display font-black text-[10px] uppercase tracking-[0.2em] [writing-mode:vertical-lr] rotate-180"
                                    >
                                        Qual seu nível de lucro?
                                    </span>
                                    <TrendingUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </div>
                            </div>
                        </button>
                    </motion.div>

                    {/* Mobile Version (Exclusivo e Customizado) */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 260, damping: 20 }}
                        className="fixed bottom-6 right-6 z-[100] md:hidden"
                    >
                        <button
                            onClick={onClick}
                            className="relative w-16 h-16 flex flex-col items-center justify-center group"
                        >
                            {/* Floating Glow Effects */}
                            <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full animate-pulse" />
                            
                            <div className="relative w-full h-full bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-full flex flex-col items-center justify-center text-black shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)] border-2 border-white/30 overflow-hidden">
                                {/* Custom VIP Icon - Sized down */}
                                <div className="scale-75">
                                    <VIPCustomIcon />
                                </div>
                                
                                {/* Animated Sweep Shine */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-active:translate-x-full transition-transform duration-1000" />
                                
                                <span className="relative z-10 text-[8px] font-black uppercase tracking-[0.1em] mt-0.5">Lucrar</span>
                            </div>
                            
                            {/* External Pulsing Ring */}
                            <div className="absolute inset-0 border-2 border-primary/50 rounded-full animate-ping pointer-events-none" />
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
