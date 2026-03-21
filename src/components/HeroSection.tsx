import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export const HeroSection = () => {
    return (
        <section className="min-h-screen md:min-h-[90vh] flex items-center justify-center pt-28 md:pt-32 pb-16 md:pb-16 overflow-hidden bg-background relative uppercase">
            {/* Background Gradient elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-2 mb-4 md:mb-8 text-[10px] md:text-sm font-bold tracking-widest text-primary bg-primary/10 rounded-full border border-primary/20">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            EXCLUSIVO PARA INVESTIDORES PREMIUM
                        </span>
                    </motion.div>

                    <motion.h1
                        className="mb-4 md:mb-8 text-[32px] md:text-[72px] leading-[1.05] font-black tracking-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        OS MELHORES CARROS <br className="hidden md:block" />
                        <span className="text-primary italic">NÃO ESTÃO</span> NO LEILÃO.
                    </motion.h1>

                    <motion.p
                        className="text-base md:text-2xl text-foreground/90 mb-6 md:mb-12 max-w-3xl mx-auto normal-case leading-relaxed px-2 md:px-0 font-medium"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Eles são negociados antes. <strong>Sem histórico, sem sinistro</strong> — e com margem cheia de FIPE. 
                        Tenha acesso a veículos que não aparecem para o público comum e lucre como quem já entende o jogo.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col items-center gap-4 md:gap-6"
                    >
                        <a href="/checkout" className="w-full md:w-auto">
                            <motion.button
                                className="btn-primary-cta w-full md:w-auto px-10 py-4 md:py-6 text-xl md:text-2xl group flex items-center justify-center gap-3 pulse-glow"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                QUERO ACESSAR OPORTUNIDADES REAIS AGORA
                                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </a>
                        
                        <p className="text-primary text-sm md:text-base font-bold italic tracking-wide">
                            🚀 Disponibilizamos em média 10 veículos por dia para toda a base
                        </p>
                    </motion.div>
                </div>
            </div>
            
            {/* Scroll Indicator */}
            <motion.div 
                className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-[2px] h-12 bg-gradient-to-b from-primary to-transparent" />
            </motion.div>
        </section>
    );
};