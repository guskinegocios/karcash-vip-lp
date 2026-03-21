import { ScrollReveal } from "./ScrollReveal";
import { motion } from "framer-motion";
import { ShieldAlert, Zap, Lock, Eye, Monitor } from "lucide-react";

export const ScarcitySection = () => {
    return (
        <section className="py-[120px] bg-[#050605] relative overflow-hidden flex flex-col items-center">
            {/* Background Decorative Grid/Lines */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(219,252,29,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(219,252,29,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
            </div>

            {/* Glowing Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="container mx-auto px-4 relative z-10 font-display">
                <ScrollReveal>
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col lg:flex-row items-center gap-12 p-8 md:p-16 rounded-[40px] bg-gradient-to-br from-card/80 to-background border border-white/5 relative overflow-hidden group">
                            
                            {/* Left Column: Urgency Visual */}
                            <div className="lg:w-1/2 relative space-y-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-[0.2em] uppercase">
                                    <ShieldAlert className="w-3 h-3" />
                                    Invasão de Lucro: Acesso Restrito
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-4xl md:text-5xl text-foreground uppercase leading-[1.1] font-black">
                                        Não é <span className="text-primary italic">escalável.</span><br />
                                        E esse é o ponto.
                                    </h2>
                                    <p className="text-foreground/70 text-base md:text-lg normal-case font-medium tracking-tight leading-relaxed max-w-sm">
                                        Trabalhamos com um volume limitado de oportunidades. <strong className="text-primary">Apenas 10 veículos por dia</strong>, em média. 
                                        Quem entra primeiro, escolhe melhor.
                                    </p>
                                </div>

                                {/* Status Dashboard Visual */}
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                        <div className="flex items-center gap-2">
                                            <Monitor className="w-4 h-4 text-primary/60" />
                                            <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Server Status</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                            <span className="text-[10px] font-black text-primary uppercase">Membro VIP Online</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="space-y-3 pb-2">
                                            <span className="text-[10px] font-bold text-foreground/60 uppercase">Oportunidades Hoje</span>
                                            <span className="text-xl font-bold text-primary tracking-tighter">10 VEÍCULOS RARS</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div 
                                                className="h-full bg-primary"
                                                initial={{ width: "0%" }}
                                                whileInView={{ width: "12%" }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 pt-2">
                                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-foreground/30 uppercase">
                                            <Lock className="w-3 h-3" />
                                            RSA-256 Active
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-foreground/30 uppercase">
                                            <Eye className="w-3 h-3" />
                                            122 Watching
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Contrast Urgency */}
                            {/* Right Column: Who it is for */}
                            <div className="lg:w-1/2 flex flex-col space-y-6 text-left border-l border-white/5 pl-0 lg:pl-12">
                                <div>
                                    <h4 className="text-primary font-black text-xs tracking-widest uppercase mb-4 italic">ESSE ACESSO É PARA QUEM:</h4>
                                    <ul className="space-y-2 text-sm text-foreground/80">
                                        <li>✓ Quer lucrar com compra e revenda de veículos</li>
                                        <li>✓ Já tem ou consegue levantar capital para operar</li>
                                        <li>✓ Busca previsibilidade, não aposta</li>
                                    </ul>
                                </div>
                                <div className="opacity-50">
                                    <h4 className="text-destructive font-bold text-[10px] tracking-widest uppercase mb-4">NÃO É PARA QUEM:</h4>
                                    <ul className="space-y-2 text-xs text-foreground/60 line-through decoration-destructive/50">
                                        <li>✗ Procura dinheiro fácil</li>
                                        <li>✗ Não entende o básico de compra e venda</li>
                                        <li>✗ Não está disposto a agir rápido</li>
                                    </ul>
                                </div>
                                
                                <div className="pt-4">
                                    <a 
                                        href="#checkout"
                                        className="btn-primary-cta w-full py-4 text-center block"
                                    >
                                        Garantir meu acesso agora
                                    </a>
                                </div>
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                                <div className="w-20 h-20 border-t border-r border-primary/40 rounded-tr-3xl" />
                            </div>
                            <div className="absolute bottom-0 left-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                                <div className="w-20 h-20 border-b border-l border-primary/40 rounded-bl-3xl" />
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};
