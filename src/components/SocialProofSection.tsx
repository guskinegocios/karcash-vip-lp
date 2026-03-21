import { ScrollReveal } from "./ScrollReveal";
import { AnimatedCounter } from "./AnimatedCounter";

export const SocialProofSection = () => {
    return (
        <section className="py-[120px] bg-background border-y border-secondary/20 relative z-10">
            <div className="container mx-auto px-4">
                {/* Stats */}
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-foreground mb-4">
                            Inteligência de Mercado que gera <span className="text-primary italic">Resultados Reais.</span>
                        </h2>
                        <p className="text-foreground/70 text-lg max-w-2xl mx-auto normal-case">
                            Não somos mágica, somos o topo da cadeia de suprimentos automotivos. Veja por que investidores profissionais escolhem a KarCash.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                    {[
                        { value: 5000, suffix: "+", label: "Membros Ativos" },
                        { value: 10000, suffix: "+", label: "Carros Negociados" },
                        { value: 50, prefix: "R$ ", suffix: "M+", label: "Em Lucros Gerados" },
                        { value: 300, suffix: "+", label: "Ofertas por Mês" },
                    ].map((stat, index) => (
                        <ScrollReveal key={index} delay={index * 0.1}>
                            <div className="card-elevated text-center py-10 bg-card border border-secondary/30">
                                <div className="font-display font-bold text-3xl md:text-5xl text-primary mb-2">
                                    <AnimatedCounter
                                        end={stat.value}
                                        prefix={stat.prefix}
                                        suffix={stat.suffix}
                                    />
                                </div>
                                <p className="text-foreground/50 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                                    {stat.label}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Testimonials */}
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl text-foreground mb-4 uppercase">
                            Relatos Diretos da Comunidade
                        </h3>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        { name: "Rafael T.", time: "Membro há 2 meses", content: "\"Peguei um Compass ontem no grupo e passei pra frente hoje. 15k de lucro líquido. Vocês são absurdos.\"" },
                        { name: "Marcos V.", time: "Membro há 5 meses", content: "\"Achei que era mentira não precisar de CNPJ. Consegui tirar a Strada Volcano direto na loja economizando 22 mil reais.\"" },
                        { name: "Carlos E.", time: "Investidor", content: "\"Já opero no mercado há anos, mas a curadoria de vocês é o que me permite escalar sem dor de cabeça com cautelar.\"" }
                    ].map((testimonial, idx) => (
                        <ScrollReveal key={idx} delay={idx * 0.1}>
                            <div className="bg-card/40 p-8 rounded-2xl border border-secondary/30 relative">
                                <div className="flex gap-3 items-center mb-6">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">{testimonial.name[0]}</div>
                                    <div>
                                        <p className="font-bold text-sm text-foreground uppercase tracking-wider">{testimonial.name}</p>
                                        <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-tight">{testimonial.time}</p>
                                    </div>
                                </div>
                                <p className="text-foreground/70 text-sm leading-relaxed italic normal-case">{testimonial.content}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};
