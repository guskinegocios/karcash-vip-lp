import { motion } from "framer-motion";
import { ChevronRight, Award } from "lucide-react";

export const HeroSection = () => {
    return (
        <section className="relative min-h-0 flex items-start pt-16 md:pt-24 pb-12 overflow-hidden bg-background">
            {/* Very Subtle Institutional Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[160px] rounded-full -translate-y-1/2 opacity-30" />
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    <motion.h1
                        className="mb-6 text-[32px] md:text-[48px] leading-[1.1] font-black tracking-tighter text-foreground uppercase"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        QUER GANHAR <span className="text-primary italic">R$20.000,00</span> EM 10 DIAS? <br />
                        AQUI NÓS TE <span className="text-primary italic">PROVAMOS</span> COMO ISSO É POSSÍVEL!
                    </motion.h1>

                    <motion.p
                        className="text-base md:text-lg text-foreground/60 mb-6 max-w-2xl leading-relaxed font-medium"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Se você é uma pessoa inteligente, que dá valor para o seu dinheiro, e está procurando um negócio com <span className="text-foreground font-bold">lucros reais e sem enganação?</span><br />
                        Finalmente encontrou a oportunidade da sua vida!
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col items-center gap-6 w-full"
                    >
                        <a href="/checkout" className="w-full sm:w-auto">
                            <motion.button
                                className="btn-primary-cta w-full sm:w-auto px-10 py-4 text-xl group flex items-center justify-center gap-4 rounded-2xl shadow-[0_20px_50px_rgba(11,115,71,0.2)] hover:shadow-primary/30 transition-all"
                                whileHover={{ scale: 1.02, y: -4 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                QUERO ACESSO VIP AGORA
                                <ChevronRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform duration-300" />
                            </motion.button>
                        </a>
                    </motion.div>
                    
                    {/* Institutional Badge */}
                    <motion.div 
                        className="mt-12 pt-6 border-t border-border/50 flex justify-center gap-10 w-full max-w-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                    >
                        <div className="flex items-center gap-3 text-primary transition-all duration-700">
                            <Award className="w-5 h-5" />
                            <span className="text-[10px] font-black tracking-[0.4em] uppercase">Security Level Protocol</span>
                        </div>
                    </motion.div>
                </div>
            </div>
            

        </section>
    );
};