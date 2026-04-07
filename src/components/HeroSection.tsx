import { motion } from "framer-motion";
import { ChevronRight, Award, ShieldCheck, Zap } from "lucide-react";

export const HeroSection = () => {
    return (
        <section className="relative min-h-[75vh] md:min-h-[80vh] flex items-start pt-20 md:pt-28 pb-16 overflow-hidden bg-background">
            {/* Very Subtle Institutional Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[160px] rounded-full -translate-y-1/2 opacity-30" />
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    {/* Authority Tag */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-3 px-5 py-2.5 mb-8 text-[11px] font-black tracking-[0.25em] text-foreground/60 bg-secondary/80 backdrop-blur-md rounded-xl border border-border shadow-sm uppercase"
                    >
                        <Zap className="w-4 h-4 text-primary animate-pulse" />
                        Acesso Exclusivo para Investidores Premium
                    </motion.div>

                    <motion.h1
                        className="mb-6 text-[36px] md:text-[64px] leading-[1.1] font-black tracking-tighter text-foreground uppercase"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        O ACESSO QUE O <br />
                        MERCADO COMUM <br />
                        <span className="text-primary italic">NÃO TEM.</span>
                    </motion.h1>

                    <motion.p
                        className="text-base md:text-lg text-foreground/60 mb-10 max-w-xl leading-relaxed font-medium"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Não vendemos carros. Entregamos a <strong>conexão direta</strong> com ativos invisíveis do mercado. 
                        Veículos 100% livres de leilão, curados para garantir sua margem de FIPE cheia.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col items-center gap-10 w-full"
                    >
                        <a href="/checkout" className="w-full sm:w-auto">
                            <motion.button
                                className="btn-primary-cta w-full sm:w-auto px-12 py-6 text-2xl group flex items-center justify-center gap-4 rounded-2xl shadow-[0_20px_50px_rgba(11,115,71,0.2)] hover:shadow-primary/30 transition-all"
                                whileHover={{ scale: 1.02, y: -4 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                QUERO ACESSO VIP AGORA
                                <ChevronRight className="w-7 h-7 group-hover:translate-x-1.5 transition-transform duration-300" />
                            </motion.button>
                        </a>
                        
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex items-center gap-2.5 text-primary font-black text-sm italic border-b-2 border-primary/10 pb-2 tracking-widest uppercase">
                                <ShieldCheck className="w-5 h-5" />
                                FONTE DIRETA & RARA • PADRÃO PRIVATE
                            </div>
                            <p className="text-foreground/40 text-[10px] font-black tracking-[0.3em] uppercase">
                                Apenas 10 vagas desbloqueadas por dia
                            </p>
                        </div>
                    </motion.div>
                    
                    {/* Institutional Badge */}
                    <motion.div 
                        className="mt-20 pt-10 border-t border-border/50 flex justify-center gap-10 w-full max-w-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                    >
                        <div className="flex items-center gap-3 text-foreground/30 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                            <Award className="w-6 h-6" />
                            <span className="text-[11px] font-black tracking-[0.4em] uppercase">Security Level Protocol</span>
                        </div>
                    </motion.div>
                </div>
            </div>
            
            {/* Scroll Indicator */}
            <motion.div 
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="w-[1.5px] h-16 bg-gradient-to-b from-foreground to-transparent" />
            </motion.div>
        </section>
    );
};