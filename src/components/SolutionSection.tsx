import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { Check, ShieldCheck, TrendingUp, Gem } from "lucide-react";
import { CtaButton } from "./CtaButton";

const benefits = [
    {
        icon: <TrendingUp className="w-8 h-8" />,
        title: "VENDA POR 100% DA FIPE",
        description: "Nossos veículos têm valor de revenda de 100% da Tabela FIPE. Você vende pelo valor justo porque não há depreciação de mercado."
    },
    {
        icon: <ShieldCheck className="w-8 h-8" />,
        title: "ZERO LEILÃO E SINISTRO",
        description: "Na consulta cautelar: nenhum tem passagem por leilão, não foram indenizados por seguradoras e não têm sinistro (pequena ou média monta)!"
    },
    {
        icon: <Gem className="w-8 h-8" />,
        title: "100% FINANCIAMENTO E SEGURO",
        description: "Veículos totalmente limpos, podendo ser financiados facilmente pelos bancos e com aceitação para fazer seguro 100%."
    }
];

export const SolutionSection = () => {
    return (
        <section className="py-16 md:py-[120px] bg-background">
            <div className="container mx-auto px-4">
                <ScrollReveal>
                    <div className="text-center mb-12 md:mb-[64px]">
                        <h2 className="text-foreground text-2xl md:text-6xl font-black uppercase leading-tight tracking-tighter">
                            Aqui é <span className="text-primary italic">o oposto.</span><br />
                            Você compra certo e vende pelo valor cheio.
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-3 gap-6 md:gap-[32px] mb-12 md:mb-20">
                    {benefits.map((benefit, index) => (
                        <ScrollReveal key={index} delay={index * 0.1}>
                            <div className="p-6 md:p-8 rounded-2xl bg-card border border-white/5 h-full flex flex-col items-center text-center group hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-2xl">
                                <div className="w-14 h-14 md:w-16 md:h-16 mb-4 md:mb-6 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl md:text-2xl mb-3 md:mb-4 text-foreground uppercase tracking-tight font-black italic">{benefit.title}</h3>
                                <p className="text-foreground/60 leading-relaxed font-medium text-sm md:text-base">
                                    {benefit.description}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Proof Section: Real Example */}
                <ScrollReveal>
                    <div className="max-w-4xl mx-auto p-px bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 rounded-[2rem] md:rounded-[32px] mb-12 md:mb-16">
                        <div className="bg-black/90 rounded-[1.9rem] md:rounded-[31px] p-6 md:p-12 relative overflow-hidden shadow-2xl border border-white/5">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <TrendingUp className="w-32 h-32 text-foreground" />
                            </div>
                            
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-10">
                                <h3 className="text-xl md:text-3xl font-black uppercase flex items-center gap-3 text-white">
                                    <span className="hidden md:block w-10 h-px bg-primary" />
                                    Exemplo Real de Operação
                                </h3>
                                <div className="w-fit px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
                                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-primary">Polo Track 1.0 2026</span>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                                <div className="space-y-4 md:space-y-6">
                                    <div className="flex justify-between items-center border-b border-white/5 pb-3 md:pb-4">
                                        <span className="text-white/40 uppercase font-black text-[9px] md:text-xs tracking-widest">Compra</span>
                                        <span className="text-lg md:text-xl font-black text-white">R$ 50.890,00</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/5 pb-3 md:pb-4">
                                        <span className="text-white/40 uppercase font-black text-[9px] md:text-xs tracking-widest">Reparos</span>
                                        <span className="text-lg md:text-xl font-black text-white">R$ 9.926,03</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/5 pb-3 md:pb-4">
                                        <span className="text-primary uppercase font-black text-[9px] md:text-xs tracking-widest">Venda (100% FIPE)</span>
                                        <span className="text-lg md:text-xl font-black text-primary drop-shadow-[0_0_15px_rgba(0,255,0,0.3)]">R$ 80.663,00</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <div>
                                            <span className="text-white font-black uppercase text-sm md:text-base tracking-tight block">Lucro Líquido</span>
                                            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-primary">Em apenas 10 dias</span>
                                        </div>
                                        <span className="text-2xl md:text-3xl font-black text-primary drop-shadow-[0_0_20px_rgba(0,255,0,0.5)]">R$ 20.736,97</span>
                                    </div>
                                </div>

                                <div className="space-y-3 md:space-y-4">
                                    {[
                                        "Giro em 10 dias (Recorde)",
                                        "Sem histórico de leilão",
                                        "Pronto para Revenda Direta",
                                        "Margem Segura"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 md:gap-3 text-white/70 font-black text-[10px] md:text-sm uppercase tracking-tight">
                                            <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                                <Check className="text-primary w-2.5 h-2.5 md:w-3 md:h-3" />
                                            </div>
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Fixed CTA for All screens: Centered */}
                <ScrollReveal delay={0.3}>
                    <div className="w-full flex justify-center">
                        <CtaButton 
                            text="QUERO LUCRAR COM ESSES VEÍCULOS" 
                            href="/checkout" 
                            fullWidth={true}
                            className="md:w-fit md:px-12 md:mx-auto"
                        />
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};
