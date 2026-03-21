import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { Check, ShieldCheck, TrendingUp, Gem } from "lucide-react";

const benefits = [
    {
        icon: <Gem className="w-8 h-8" />,
        title: "Mercadoria Rara",
        description: "Ativos exclusivos captados diretamente, que não estão no leilão nem em nenhum outro lugar do mercado comum."
    },
    {
        icon: <ShieldCheck className="w-8 h-8" />,
        title: "Cautelar Limpa",
        description: "Carros totalmente livres de qualquer apontamento de leilão, sinistro ou média monta na consulta cautelar."
    },
    {
        icon: <TrendingUp className="w-8 h-8" />,
        title: "Retorno Real",
        description: "Venda pelo valor cheio de mercado. Lucro real baseado em 100% da Tabela Fipe após a recuperação."
    }
];

export const SolutionSection = () => {
    return (
        <section className="py-[120px] bg-background">
            <div className="container mx-auto px-4">
                <ScrollReveal>
                    <div className="text-center mb-[64px]">
                        <h2 className="text-foreground">
                            Onde os Profissionais <span className="text-primary">Lucram de Verdade.</span>
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-3 gap-[32px]">
                    {benefits.map((benefit, index) => (
                        <ScrollReveal key={index} delay={index * 0.1}>
                            <div className="p-8 rounded-2xl bg-card border border-secondary/50 h-full flex flex-col items-center text-center group hover:border-primary/30 transition-all duration-300">
                                <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-2xl mb-4 text-foreground uppercase">{benefit.title}</h3>
                                <p className="text-foreground/70 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};
