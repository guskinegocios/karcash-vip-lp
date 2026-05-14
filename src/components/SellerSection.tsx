import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CtaButton } from "./CtaButton";

const TrafficSignCrashedCarIcon = () => (
  <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center drop-shadow-[0_10px_30px_rgba(204,255,0,0.3)]">
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
      <rect 
        x="15" y="15" width="70" height="70" 
        rx="8" 
        transform="rotate(45 50 50)" 
        fill="#ccff00" 
        stroke="black" 
        strokeWidth="2" 
      />
      <rect 
        x="20" y="20" width="60" height="60" 
        rx="4" 
        transform="rotate(45 50 50)" 
        fill="none" 
        stroke="black" 
        strokeWidth="2.5" 
      />
    </svg>
    <img 
      src="/icons/car-removebg.webp" 
      alt="Carro Batido" 
      className="relative z-10 w-[60%] h-auto object-contain brightness-0 contrast-125"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
      }}
    />
  </div>
);

export const SellerSection = () => {
    return (
        <section id="vender" className="py-24 relative overflow-hidden bg-background">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none opacity-20" />
            
            <div className="container mx-auto px-4 relative z-10">
                <ScrollReveal>
                    <div className="max-w-5xl mx-auto rounded-[2.5rem] bg-card border border-white/5 p-8 md:p-16 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[80px] pointer-events-none group-hover:bg-primary/10 transition-colors duration-700" />
                        
                        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center">
                            <div className="space-y-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Venda seu veículo rápido</span>
                                </div>
                                
                                <div className="space-y-6">
                                    <h2 className="text-3xl md:text-5xl font-display font-black text-white leading-tight">
                                        TEM UM CARRO <span className="text-primary italic">AVARIADO</span> <br/>
                                        E QUER VENDER AGORA? 🚗
                                    </h2>
                                    
                                    <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
                                        Nossa rede exclusiva de investidores compra seu veículo à vista. 
                                        Acesse nossa página de avaliação e receba uma oferta em até 24h.
                                    </p>
                                </div>
                                
                                <div className="pt-4">
                                    <CtaButton 
                                        text="QUERO VENDER MEU CARRO" 
                                        href="/sell" 
                                        variant="accent" 
                                        size="lg" 
                                        showArrow={true}
                                    />
                                </div>
                            </div>
                            
                            <div className="hidden md:flex flex-col items-center justify-center p-12 bg-white/5 border border-white/10 rounded-3xl relative">
                                <TrafficSignCrashedCarIcon />
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};
