import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { Check, ShieldCheck, TrendingUp, Gem } from "lucide-react";

const benefits = [
    {
        icon: <Gem className="w-8 h-8" />,
        title: "Acesso Privilegiado",
        description: "Acesse o mercado invisível: carros que as concessionárias negociam antes de chegarem ao público comum."
    },
    {
        icon: <ShieldCheck className="w-8 h-8" />,
        title: "100% Elegível FIPE",
        description: "Sem histórico de leilão, sem sinistro ou média monta. Veículos prontos para venda pelo valor máximo de mercado."
    },
    {
        icon: <TrendingUp className="w-8 h-8" />,
        title: "Margem Preservada",
        description: "Não aceite perder 30% do lucro. Opere com carros raros que garantem a maior liquidez do mercado."
    }
];

export const SolutionSection = () => {
    return (
        <section className="py-[120px] bg-background">
            <div className="container mx-auto px-4">
                <ScrollReveal>
                    <div className="text-center mb-[64px]">
                        <h2 className="text-foreground text-3xl md:text-6xl font-black uppercase leading-tight">
                            Aqui é <span className="text-primary italic">o oposto.</span><br />
                            Você compra certo e vende pelo valor cheio.
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-3 gap-[32px] mb-20">
                    {benefits.map((benefit, index) => (
                        <ScrollReveal key={index} delay={index * 0.1}>
                            <div className="p-8 rounded-2xl bg-card border border-border h-full flex flex-col items-center text-center group hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-xl">
                                <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-2xl mb-4 text-foreground uppercase tracking-tight font-black italic">{benefit.title}</h3>
                                <p className="text-foreground/70 leading-relaxed font-medium">
                                    {benefit.description}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Proof Section: Real Example */}
                <ScrollReveal>
                    <div className="max-w-4xl mx-auto p-1 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 rounded-[32px]">
                        <div className="bg-card rounded-[30px] p-8 md:p-12 relative overflow-hidden shadow-xl border border-border/50">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <TrendingUp className="w-32 h-32 text-foreground" />
                            </div>
                            
                            <h3 className="text-2xl md:text-3xl font-black uppercase mb-8 flex items-center gap-3 text-foreground">
                                <span className="w-10 h-px bg-primary" />
                                Exemplo Real de Operação
                            </h3>

                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center border-b border-border pb-4">
                                        <span className="text-foreground/60 uppercase font-black text-xs tracking-widest">Compra</span>
                                        <span className="text-xl font-black text-foreground">R$ 42.000</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-border pb-4">
                                        <span className="text-foreground/60 uppercase font-black text-xs tracking-widest">Recuperação</span>
                                        <span className="text-xl font-black text-foreground">R$ 6.500</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-border pb-4">
                                        <span className="text-primary uppercase font-black text-xs tracking-widest">Venda (FIPE 100%)</span>
                                        <span className="text-xl font-black text-primary">R$ 64.900</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-foreground font-black uppercase text-base tracking-tight">Lucro Líquido</span>
                                        <span className="text-3xl font-black text-primary">R$ 16.400</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-foreground/80 font-black text-sm uppercase tracking-tight">
                                        <Check className="text-primary w-5 h-5 flex-shrink-0" />
                                        <span>Sem restrição documental</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-foreground/80 font-black text-sm uppercase tracking-tight">
                                        <Check className="text-primary w-5 h-5 flex-shrink-0" />
                                        <span>Venda facilitada (Giro Rápido)</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-foreground/80 font-black text-sm uppercase tracking-tight">
                                        <Check className="text-primary w-5 h-5 flex-shrink-0" />
                                        <span>Margem 100% preservada</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};
