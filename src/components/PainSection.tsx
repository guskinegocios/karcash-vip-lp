import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { AlertTriangle, XCircle, TrendingDown, FileText } from "lucide-react";

export const PainSection = () => {
    return (
        <section className="py-[120px] bg-background relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-destructive/5 blur-[120px] rounded-full opacity-20" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-[64px] items-center">
                    {/* Left Column: Copy */}
                    <ScrollReveal>
                        <div className="max-w-xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold tracking-widest mb-6 uppercase">
                                <AlertTriangle className="w-3 h-3" />
                                Alerta de Risco
                            </div>
                            <h2 className="mb-8 text-foreground leading-[1.1] text-3xl md:text-5xl font-black uppercase">
                                <span className="text-primary italic block mb-2">O leilão parece barato.</span>
                                Mas cobra no final.
                            </h2>
                            <div className="space-y-6 text-foreground/70 text-lg md:text-xl leading-relaxed normal-case font-medium">
                                <p>
                                    Você compra mais barato... <strong className="text-foreground">Mas também vende mais barato.</strong>
                                </p>
                                <p>
                                    O carimbo de <strong className="text-destructive font-bold underline decoration-2 underline-offset-4">"Histórico de Leilão"</strong> na cautelar é uma sentença de morte para o seu giro de capital.
                                </p>
                                <div className="space-y-3 bg-white/5 p-6 rounded-xl border border-white/5">
                                    <p className="flex items-center gap-2 text-sm text-foreground/80"><XCircle className="w-4 h-4 text-destructive" /> Histórico de leilão na cautelar</p>
                                    <p className="flex items-center gap-2 text-sm text-foreground/80"><XCircle className="w-4 h-4 text-destructive" /> Sinistro/Média Monta registrado</p>
                                    <p className="flex items-center gap-2 text-sm text-foreground/80"><XCircle className="w-4 h-4 text-destructive" /> Desvalorização de até 30%</p>
                                </div>
                                <p className="text-primary font-bold">
                                    Resultado: margem comprimida e estoque parado.
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Right Column: Visual Element "Elite Auditor Report" */}
                    <ScrollReveal delay={0.2}>
                        <div className="relative group">
                            {/* Decorative Outer Glow */}
                            <div className="absolute inset-0 bg-destructive/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
                                {/* Header of the Report */}
                                <div className="bg-muted px-6 py-4 border-b border-border flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-foreground/40" />
                                        <span className="text-[10px] font-bold tracking-widest text-foreground/40 uppercase">Relatório de Auditoria v4.2</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 rounded-full bg-destructive/40" />
                                        <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                                        <div className="w-2 h-2 rounded-full bg-green-500/40" />
                                    </div>
                                </div>

                                {/* Body of the Report */}
                                <div className="p-8 space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end border-b border-border pb-2">
                                            <span className="text-xs text-foreground/40 uppercase font-bold">Identificação</span>
                                            <span className="text-sm font-mono text-foreground/80">BMW 320 M SPORT 2023</span>
                                        </div>
                                        <div className="flex justify-between items-end border-b border-border pb-2">
                                            <span className="text-xs text-foreground/40 uppercase font-bold">Valor Fipe</span>
                                            <span className="text-sm font-mono text-foreground/80">R$ 281.700,00</span>
                                        </div>
                                    </div>

                                    {/* The Red Audit Entry */}
                                    <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4 relative overflow-hidden">
                                        <div className="flex items-center gap-4 relative z-10">
                                            <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                                                <TrendingDown className="w-5 h-5 text-destructive" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-destructive uppercase tracking-widest mb-1">Anomalia de Mercado Detectada</p>
                                                <p className="text-base font-bold text-foreground italic">HISTÓRICO DE LEILÃO (SINISTRO)</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between relative z-10">
                                            <span className="text-xs text-foreground/60 uppercase">Impacto no Lucro:</span>
                                            <span className="text-xl font-bold text-destructive">- R$ 84.510,00</span>
                                        </div>

                                        {/* Background Scanline animation */}
                                        <motion.div
                                            className="absolute inset-0 bg-destructive/5"
                                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    </div>

                                    {/* The "DENIED" Stamp */}
                                    <div className="flex justify-center pt-4">
                                        <motion.div
                                            initial={{ scale: 2, opacity: 0, rotate: -15 }}
                                            animate={{ scale: 1, opacity: 1, rotate: -15 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 260,
                                                damping: 20,
                                                delay: 1
                                            }}
                                            className="px-8 py-3 border-4 border-destructive text-destructive font-black text-3xl uppercase tracking-tighter opacity-80"
                                            style={{ borderRadius: '4px' }}
                                        >
                                            REJEITADO
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Footer details */}
                                <div className="bg-muted px-6 py-3 text-[9px] font-mono text-foreground/30 flex justify-between">
                                    <span>HASH: 8f2a9c...1e4b</span>
                                    <span>MARKET_CONFIDENCE: 22%</span>
                                </div>
                            </div>

                            {/* Floating Tooltip */}
                            <motion.div
                                className="absolute -right-4 lg:right-6 -bottom-4 bg-primary text-primary-foreground p-4 rounded-xl shadow-2xl max-w-[180px] z-20"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            >
                                <div className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 flex-shrink-0" />
                                    <p className="text-[10px] font-bold leading-tight">OCULTAR ISSO NÃO É MAIS POSSÍVEL NO MERCADO RARO.</p>
                                </div>
                            </motion.div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};
