import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { CtaButton } from "./CtaButton";

export const HeroSection = () => {
    return (
        <section className="relative min-h-0 flex items-start pt-16 md:pt-24 pb-12 overflow-hidden bg-background">
            {/* Very Subtle Institutional Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 blur-[160px] rounded-full -translate-y-1/2 opacity-50" />
            
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
                        <CtaButton text="QUERO ACESSO AGORA" href="/checkout" size="lg" />
                    </motion.div>
                    
                    {/* Institutional Badge */}
                    <motion.div 
                        className="mt-12 pt-6 border-t border-white/5 flex justify-center gap-10 w-full max-w-lg"
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