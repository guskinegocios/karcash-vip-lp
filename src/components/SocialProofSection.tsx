import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { AnimatedCounter } from "./AnimatedCounter";
import { TrendingUp, Clock, ShieldCheck, Zap, Quote, CheckCircle2 } from "lucide-react";

export const SocialProofSection = () => {
    const stats = [
        { 
            value: 22.4, 
            suffix: "%", 
            label: "Margem Média de Lucro", 
            description: "Rentabilidade real sobre o capital investido.",
            icon: TrendingUp,
            trend: "+3.2%"
        },
        { 
            value: 14, 
            suffix: " Dias", 
            label: "Giro Médio de Estoque", 
            description: "Liquidez rápida para reinvestimento ágil.",
            icon: Clock,
            trend: "Fast"
        },
        { 
            value: 100, 
            suffix: "%", 
            label: "Cautelar Aprovada", 
            description: "Zero restrições. Transparência total.",
            icon: ShieldCheck,
            trend: "Safe"
        },
        { 
            value: 450, 
            suffix: "+", 
            label: "Ofertas Mensais", 
            description: "Fluxo constante de oportunidades raras.",
            icon: Zap,
            trend: "Active",
            live: true
        },
    ];

    const testimonials = [
        { 
            name: "Rafael T.", 
            role: "Membro Premium",
            time: "2 meses", 
            content: "Peguei um Compass ontem no grupo e passei pra frente hoje. 15k de lucro líquido. Vocês são absurdos.",
            initial: "R"
        },
        { 
            name: "Marcos V.", 
            role: "Investidor Autônomo",
            time: "5 meses", 
            content: "Achei que era mentira não precisar de CNPJ. Consegui tirar a Strada Volcano direto na loja economizando 22 mil reais.",
            initial: "M"
        },
        { 
            name: "Carlos E.", 
            role: "Gestor de Frota",
            time: "1 ano", 
            content: "Já opero no mercado há anos, mas a curadoria da KarCash é o que me permite escalar sem dor de cabeça com cautelar.",
            initial: "C"
        }
    ];

    return (
        <section className="py-[120px] bg-background relative overflow-hidden flex flex-col items-center">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <ScrollReveal>
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-widest mb-6 uppercase">
                            <Zap className="w-3 h-3" />
                            Market Intelligence Dashboard
                        </div>
                        <h2 className="text-foreground mb-6 leading-tight max-w-4xl mx-auto uppercase">
                            Inteligência de Mercado que gera <span className="text-primary italic">Alpha Real.</span>
                        </h2>
                        <p className="text-foreground/60 text-lg max-w-2xl mx-auto normal-case leading-relaxed">
                            Não operamos com "sorte". Operamos com dados e curadoria no topo da cadeia de suprimentos automotivos.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Dashboard Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
                    {stats.map((stat, index) => (
                        <ScrollReveal key={index} delay={index * 0.1}>
                            <motion.div 
                                className="group relative p-8 rounded-2xl bg-[#0A0C0B] border border-white/5 hover:border-primary/30 transition-all duration-500 overflow-hidden"
                                whileHover={{ y: -5 }}
                            >
                                {/* Stat Icon & Trend */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500">
                                            <stat.icon className="w-6 h-6 text-foreground/40 group-hover:text-primary transition-colors" />
                                        </div>
                                        {stat.live && (
                                            <div className="absolute -top-1 -right-1 flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-[10px] font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                                            {stat.trend}
                                        </span>
                                        {stat.live && <span className="text-[8px] font-black text-primary/40 tracking-tighter uppercase">Live Feed</span>}
                                    </div>
                                </div>

                                {/* Main Value */}
                                <div className="mb-2">
                                    <span className="font-display font-bold text-4xl md:text-5xl text-foreground">
                                        <AnimatedCounter
                                            end={stat.value}
                                            decimals={stat.value % 1 !== 0 ? 1 : 0}
                                            suffix={stat.suffix}
                                        />
                                    </span>
                                </div>

                                {/* Label & Description */}
                                <div className="space-y-2">
                                    <p className="text-xs font-bold text-foreground/90 uppercase tracking-widest">{stat.label}</p>
                                    <p className="text-[10px] text-foreground/40 font-medium leading-relaxed uppercase">{stat.description}</p>
                                </div>

                                {/* Bottom Glow Effect */}
                                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Community Insights Section */}
                <div className="grid lg:grid-cols-3 gap-12 items-center">
                    <ScrollReveal>
                        <div className="lg:pr-12">
                            <h3 className="text-3xl md:text-4xl text-foreground mb-6 leading-tight uppercase">
                                Relatos da <span className="text-primary italic">Comunidade.</span>
                            </h3>
                            <p className="text-foreground/50 text-base mb-8 normal-case leading-relaxed italic">
                                "O sucesso no mercado de repasse não é sobre quem grita mais alto, mas sobre quem tem acesso às informações certas antes de todo mundo."
                            </p>
                            <div className="flex items-center gap-4 py-6 border-t border-white/5">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-card flex items-center justify-center overflow-hidden">
                                            <div className="w-full h-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">{i}</div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">
                                    +5.200 MEMBROS ATIVOS
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>

                    <div className="lg:col-span-2 grid md:grid-cols-2 gap-6 relative">
                        {/* Decorative Quote Icon behind */}
                        <Quote className="absolute -top-12 -left-12 w-48 h-48 text-white/[0.02] -rotate-12 pointer-events-none" />
                        
                        {testimonials.map((item, idx) => (
                            <ScrollReveal key={idx} delay={idx * 0.15}>
                                <div className={`p-8 rounded-2xl bg-card/40 border border-white/5 hover:border-white/10 transition-all ${idx === 1 ? 'md:translate-y-8' : ''}`}>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
                                            {item.initial}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-bold text-sm text-foreground uppercase tracking-wider">{item.name}</p>
                                                <CheckCircle2 className="w-3 h-3 text-primary" />
                                            </div>
                                            <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-tight">
                                                {item.role} • {item.time}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-foreground/70 text-sm leading-relaxed italic normal-case border-l-2 border-primary/30 pl-4">
                                        "{item.content}"
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
