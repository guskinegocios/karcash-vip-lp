import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { Quote, Play, Shield } from "lucide-react";

export const ManifestoSection = () => {
    return (
        <section id="manifesto" className="pt-8 pb-24 bg-secondary/10 border-t border-border/20 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-20" />
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
                    
                    {/* Left side: Editorial text */}
                    <div className="order-2 lg:order-1 max-w-2xl">
                        <ScrollReveal>
                            <div className="flex justify-start mb-8">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                    <Quote className="w-6 h-6" />
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="space-y-6 text-lg md:text-xl text-foreground/80 leading-[1.8] font-medium">
                                <p>
                                    <span className="text-foreground font-black text-2xl block mb-2 uppercase tracking-tight">
                                        Se você é uma pessoa inteligente...
                                    </span>
                                    Que dá valor para o seu dinheiro e está procurando um negócio com <span className="text-primary italic font-bold">lucros reais</span>, finalmente encontrou a oportunidade da sua vida.
                                </p>

                                <p>
                                    Você sabia que é possível ganhar <span className="text-foreground font-black">R$ 20.000,00 em 10 dias</span> reparando um veículo avariado? Não acredita? Eu mesmo já fiz isso várias vezes e te provo como isso é possível. 
                                </p>

                                <div className="bg-secondary/30 p-6 rounded-2xl border border-border shadow-sm italic text-foreground text-sm md:text-base border-l-4 border-l-primary">
                                    "Sem métodos milagrosos, chega de mentiras e de enganação. Quando você tiver acesso à informação certa, vai abrir a sua mente e você vai ter este resultado."
                                </div>

                                <p>
                                    Enquanto o mercado está saturado de gente tentando a mesma coisa — como carros de leilão ou repasse — nós estamos lucrando muito em um <span className="text-primary font-bold">segmento que a maioria desconhece.</span>
                                </p>

                                <div className="space-y-2 pt-4">
                                    <p className="text-2xl md:text-3xl font-black text-foreground uppercase leading-tight tracking-tighter">
                                        Nós <span className="text-primary italic">compramos, reparamos e revendemos.</span>
                                    </p>
                                    <p className="text-sm font-black text-foreground/40 uppercase tracking-[0.2em]">
                                        Processo 100% Validado pelo KarCash VIP
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Right side: Media / Video Mockup */}
                    <div className="order-1 lg:order-2">
                        <ScrollReveal delay={0.2}>
                            <div className="relative group">
                                {/* Glass Border Effect */}
                                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-transparent to-primary/10 rounded-[40px] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
                                
                                {/* Video Container */}
                                <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-2xl bg-[#05100B] aspect-[4/5] lg:aspect-video">
                                    {/* Mockup Overlay / Play Button */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 group-hover:bg-black/20 transition-colors duration-500">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center text-white shadow-[0_0_40px_rgba(11,115,71,0.5)] cursor-pointer"
                                        >
                                            <Play className="w-6 h-6 md:w-8 md:h-8 fill-current ml-1" />
                                        </motion.div>
                                        <p className="mt-4 md:mt-6 text-white font-black text-[10px] md:text-xs uppercase tracking-[0.3em] bg-black/40 backdrop-blur-md px-5 py-2 md:px-6 md:py-2.5 rounded-full border border-white/10">
                                            Assistir Processo na Prática
                                        </p>
                                    </div>

                                    {/* Placeholder Image (Gustavo in action mockup) */}
                                    <img 
                                        src="https://images.unsplash.com/photo-1487754180451-c456f719c141?auto=format&fit=crop&q=80&w=1000" 
                                        alt="Processo KarCash VIP" 
                                        className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                                    />

                                    {/* Authority Badge inside Video */}
                                    <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8 flex justify-between items-center z-20">
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                                <Shield className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                                            </div>
                                            <div className="text-white">
                                                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest leading-none">Status</p>
                                                <p className="text-[10px] md:text-xs font-bold">Operação Real</p>
                                            </div>
                                        </div>
                                        <div className="text-white/60 text-[9px] md:text-[10px] font-black uppercase tracking-tighter">
                                            Reparo & Revenda
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Stats Card */}
                                <motion.div 
                                    className="absolute -bottom-6 -left-6 bg-card border border-border p-5 rounded-2xl shadow-xl z-30 hidden md:block"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <p className="text-xs text-muted-foreground uppercase font-black tracking-widest mb-1">Lucro Médio</p>
                                    <p className="text-2xl font-black text-primary">R$ 20.400,00</p>
                                </motion.div>
                            </div>
                        </ScrollReveal>
                    </div>

                </div>
            </div>
        </section>
    );
};
