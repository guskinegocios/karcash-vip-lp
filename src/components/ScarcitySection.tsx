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
                                        Restam apenas <span className="text-primary italic">10 licenças</span> ativas para hoje.
                                    </h2>
                                    <p className="text-foreground/50 text-base normal-case font-body tracking-tight leading-relaxed max-w-sm">
                                        Filtramos apenas o topo 1% do mercado premium. O volume de ativos é fisicamente limitado pela nossa curadoria manual.
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
                                        <div className="flex justify-between items-end">
                                            <span className="text-[10px] font-bold text-foreground/60 uppercase">Licenças Disponíveis</span>
                                            <span className="text-xl font-bold text-primary tracking-tighter">10 / 450</span>
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
                            <div className="lg:w-1/2 flex flex-col items-center lg:items-end text-center lg:text-right space-y-8">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 mb-4 animate-bounce">
                                    <Zap className="w-8 h-8" />
                                </div>
                                <div className="space-y-4">
                                    <p className="text-2xl md:text-3xl text-foreground font-black uppercase tracking-tighter leading-tight italic">
                                        "Oportunidades raras não esperam quem tem medo de agir."
                                    </p>
                                    <p className="text-primary font-bold text-xs tracking-[0.3em] uppercase">
                                        — Gustavo, KarCash Founder
                                    </p>
                                </div>
                                
                                <div className="bg-primary text-background px-8 py-4 rounded-full text-sm font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(219,252,29,0.3)] hover:scale-105 transition-transform cursor-pointer">
                                    Garantir meu lugar agora
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
