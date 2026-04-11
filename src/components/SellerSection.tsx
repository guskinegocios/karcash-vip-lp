import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const TrafficSignCrashedCarIcon = () => (
  <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center drop-shadow-[0_10px_30px_rgba(204,255,0,0.3)]">
    {/* Placa de Advertência (Losango) via SVG */}
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
    
    {/* Imagem do Carro (Referência solicitada) */}
    <img 
      src="/icons/car-removebg.webp" 
      alt="Carro Batido" 
      className="relative z-10 w-[60%] h-auto object-contain brightness-0 contrast-125"
      onError={(e) => {
        // Fallback case image is not found
        e.currentTarget.style.display = 'none';
      }}
    />
  </div>
);

export const SellerSection = () => {
    return (
        <section id="vender" className="py-24 relative overflow-hidden bg-white">
            {/* Background Glow - Soft and Light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="container mx-auto px-4 relative z-10">
                <ScrollReveal>
                    <div className="max-w-5xl mx-auto rounded-[2.5rem] bg-gradient-to-br from-slate-50 to-white border border-slate-200 p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden group">
                        
                        {/* Decorative Soft Gradient Overlay */}
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[80px] pointer-events-none group-hover:bg-primary/10 transition-colors duration-700" />
                        
                        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center">
                            <div className="space-y-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Venda seu veículo rápido</span>
                                </div>
                                
                                <div className="space-y-6">
                                    <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 leading-tight">
                                        TEM UM CARRO <span className="text-primary">AVARIADO</span> <br/>
                                        E QUER VENDER AGORA? 🚗
                                    </h2>
                                    
                                    <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl">
                                        Nossa rede exclusiva de investidores compra seu veículo à vista. 
                                        Acesse nossa página de avaliação e receba uma oferta em até 24h.
                                    </p>
                                </div>
                                
                                <Link to="/sell" className="inline-block pt-4">
                                    <motion.button
                                        whileHover={{ scale: 1.05, x: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn-primary-cta px-10 py-5 bg-[#ff6b00] hover:bg-[#ff8533] text-white border-none shadow-[0_10px_30px_rgba(255,107,0,0.2)] flex items-center gap-3 font-black text-lg group"
                                    >
                                        QUERO VENDER MEU CARRO
                                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </Link>
                            </div>
                            
                            {/* Icon Placeholder */}
                            <div className="hidden md:flex flex-col items-center justify-center p-12 bg-slate-100/50 border border-slate-200 rounded-3xl relative">
                                <TrafficSignCrashedCarIcon />
                            </div>
                        </div>
                        
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};
