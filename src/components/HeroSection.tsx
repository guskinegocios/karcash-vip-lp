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
                        className="mb-4 md:mb-8 text-[28px] md:text-[64px] leading-[1.1]"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Até quando você vai aceitar perder <span className="text-primary italic">30% do seu lucro</span> para o histórico de leilão?
                    </motion.h1>

                    <motion.p
                        className="text-base md:text-xl text-foreground/80 mb-6 md:mb-12 max-w-3xl mx-auto normal-case leading-relaxed px-2 md:px-0"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Pare de disputar "restos" em pátios lotados. <strong className="text-foreground">Tenha acesso exclusivo a veículos raros</strong>, 
                        recuperados com margem de 100% da Tabela Fipe e sem nenhuma restrição na cautelar.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col items-center gap-4 md:gap-6"
                    >
                        <a href="#solucao" className="w-full md:w-auto">
                            <motion.button
                                className="btn-primary-cta w-full md:w-auto px-10 py-4 md:py-5 text-lg md:text-xl group flex items-center justify-center gap-3"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                QUERO MEU ACESSO EXCLUSIVO
                                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </a>
                        
                        <div className="flex flex-col md:flex-row items-center justify-center gap-x-8 gap-y-1.5 text-foreground/40 text-[10px] md:text-xs font-bold tracking-widest uppercase">
                            <span className="flex items-center gap-2">✓ CAUTELAR 100% APROVADA</span>
                            <span className="flex items-center gap-2">✓ SEM RESTRIÇÃO DE LEILÃO</span>
                            <span className="flex items-center gap-2">✓ MARGEM DE CONCESSIONÁRIA</span>
                        </div>
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