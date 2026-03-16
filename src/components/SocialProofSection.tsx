import { ScrollReveal } from "./ScrollReveal";
import { AnimatedCounter } from "./AnimatedCounter";

export const SocialProofSection = () => {
    return (
        <section className="py-20 bg-background border-y border-white/5 relative z-10">
            <div className="container mx-auto px-4">
                {/* Stats */}
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-4">
                            Milhares Já <span className="text-primary">Lucram Conosco.</span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Não somos mágica, somos inteligência de mercado. Veja por que +5.000 membros já transformaram seu dinheiro com a KarCash.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20">
                    {[
                        { value: 5000, suffix: "+", label: "Membros Ativos" },
                        { value: 10000, suffix: "+", label: "Carros Negociados" },
                        { value: 50, prefix: "R$ ", suffix: "M+", label: "Em Lucros Gerados" },
                        { value: 300, suffix: "+", label: "Ofertas por Mês" },
                    ].map((stat, index) => (
                        <ScrollReveal key={index} delay={index * 0.1}>
                            <div className="card-elevated text-center py-10 bg-card/30">
                                <div className="font-display font-bold text-3xl md:text-5xl text-primary mb-2">
                                    <AnimatedCounter
                                        end={stat.value}
                                        prefix={stat.prefix}
                                        suffix={stat.suffix}
                                    />
                                </div>
                                <p className="text-muted-foreground font-medium uppercase tracking-widest text-[10px] md:text-xs">
                                    {stat.label}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Testimonials Fake Prints / Texts */}
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
                            Resultados Reais da Comunidade
                        </h3>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            O que nossos membros estão comentando no grupo VIP e no WhatsApp.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {/* Depoimento 1 */}
                    <ScrollReveal delay={0.1}>
                        <div className="bg-card/50 p-6 rounded-2xl border border-white/5 relative">
                            <div className="flex gap-3 items-center mb-4">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">R</div>
                                <div>
                                    <p className="font-bold text-sm text-foreground">Rafael T.</p>
                                    <p className="text-xs text-muted-foreground">Membro há 2 meses</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground text-sm italic">"Peguei um Compass ontem no grupo e passei pra frente hoje. 15k de lucro líquido. Vocês são absurdos, não saio mais daqui."</p>
                        </div>
                    </ScrollReveal>

                    {/* Depoimento 2 */}
                    <ScrollReveal delay={0.2}>
                        <div className="bg-card/50 p-6 rounded-2xl border border-white/5 relative">
                            <div className="flex gap-3 items-center mb-4">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">M</div>
                                <div>
                                    <p className="font-bold text-sm text-foreground">Marcos V.</p>
                                    <p className="text-xs text-muted-foreground">Membro há 5 meses</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground text-sm italic">"Achei que era mentira não precisar de CNPJ. Consegui tirar a Strada Volcano direto na loja economizando 22 mil reais. Obrigado equipe."</p>
                        </div>
                    </ScrollReveal>

                    {/* Depoimento 3 */}
                    <ScrollReveal delay={0.3}>
                        <div className="bg-card/50 p-6 rounded-2xl border border-white/5 relative">
                            <div className="flex gap-3 items-center mb-4">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">C</div>
                                <div>
                                    <p className="font-bold text-sm text-foreground">Carlos E.</p>
                                    <p className="text-xs text-muted-foreground">Novo membro</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground text-sm italic">"Entrei semana passada, só to observando e hoje já vi 3 Civic que eu queria muito colocar na loja. Margem muito forte."</p>
                        </div>
                    </ScrollReveal>
                </div>

            </div>
        </section>
    );
};
