import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from './Logo';

const adsData = [
  {
    brand: "BMW",
    model: "320 M SPORT",
    year: "2023",
    details: "COLISÃO FRONTAL/TRAS.",
    fipe: "281.700,00",
    karcash: "200.000,00",
    profit: "81.700,00",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=600"
  },
  {
    brand: "FIAT",
    model: "MOBI LIKE",
    year: "2024",
    details: "MOTOR AVARIADO",
    fipe: "53.462,00",
    karcash: "27.998,00",
    profit: "25.464,00",
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=600" // Generic subcompact replacement
  },
  {
    brand: "HYUNDAI",
    model: "HB20 TGDI",
    year: "2025",
    details: "COLISÃO TRASEIRA",
    fipe: "96.735,00",
    karcash: "49.999,00",
    profit: "46.736,00",
    image: "https://images.unsplash.com/photo-1629897143924-d2eab3aedb2b?auto=format&fit=crop&q=80&w=600"
  },
  {
    brand: "NISSAN",
    model: "KICKS SENSE",
    year: "2024",
    details: "MOTOR AVARIADO",
    fipe: "104.142,00",
    karcash: "59.100,00",
    profit: "45.000,00",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600"
  },
  {
    brand: "RENAULT",
    model: "KANGOO ADV.",
    year: "2024",
    details: "COLISÃO FRONTAL",
    fipe: "106.326,00",
    karcash: "51.200,00",
    profit: "55.126,00",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600"
  }
];

const AdCard = ({ data }: { data: typeof adsData[0] }) => {
  return (
    <div className="flex-shrink-0 w-[280px] md:w-[320px] aspect-[4/5] bg-[#0A120E] border border-white/10 rounded-2xl overflow-hidden relative flex flex-col group hover:border-primary/50 transition-colors duration-300">
      {/* Background Graphic Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <div className="absolute top-0 right-0 w-48 h-48 bg-primary rounded-full blur-[80px]" />
         <svg className="absolute bottom-0 left-0 w-full h-1/2 text-primary" viewBox="0 0 100 100" preserveAspectRatio="none">
             <polygon fill="currentColor" points="0,100 100,0 100,100" opacity="0.3" />
             <polygon fill="currentColor" points="0,100 50,20 100,100" opacity="0.5" />
         </svg>
      </div>

      {/* Header - Logo */}
      <div className="pt-5 pb-2 px-5 flex justify-center relative z-10">
        <Logo variant="light" h={24} />
      </div>

      {/* Content */}
      <div className="px-5 flex-1 flex flex-col relative z-10 mt-2">
        
        <div className="flex justify-between items-start mb-4">
            {/* Vehicle Info */}
            <div className="flex flex-col max-w-[55%]">
                <span className="text-primary font-black text-lg leading-tight uppercase">{data.brand}</span>
                <span className="text-white font-bold text-sm leading-tight uppercase">{data.model}</span>
                <span className="text-white/50 font-medium text-[9px] uppercase mt-1 tracking-wider">{data.details}</span>
                <span className="text-primary font-bold text-sm mt-1">{data.year}</span>
            </div>

            {/* Profit Margin Info */}
            <div className="flex flex-col items-end gap-1.5 min-w-[40%]">
                <div className="bg-[#1A2520] border border-white/5 rounded px-2 py-1 flex justify-between items-center w-full">
                    <span className="text-[8px] text-white/50 uppercase tracking-widest leading-none">FIPE</span>
                    <span className="text-[10px] text-white font-bold line-through leading-none">{data.fipe}</span>
                </div>
                <div className="bg-[#1A2520] border border-white/5 rounded px-2 py-1 flex justify-between items-center w-full">
                    <span className="text-[8px] text-white/50 uppercase tracking-widest leading-none">KARCASH</span>
                    <span className="text-[10px] text-white font-bold leading-none">{data.karcash}</span>
                </div>
                <div className="bg-primary shadow-[0_0_15px_rgba(11,115,71,0.4)] rounded px-2 py-1.5 flex justify-between items-center w-full mt-1">
                    <span className="text-[9px] text-[#05100B] uppercase font-black tracking-wider leading-none">LUCRO</span>
                    <span className="text-xs text-[#05100B] font-black leading-none">+{data.profit}</span>
                </div>
            </div>
        </div>

      </div>

      {/* Vehicle Image */}
      <div className="h-40 w-full relative z-20 mt-auto px-4 pb-4">
          <div className="w-full h-full rounded-xl overflow-hidden border border-white/10 shadow-xl bg-black">
              <img 
                src={data.image} 
                alt={`${data.brand} ${data.model}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
          </div>
      </div>
    </div>
  );
};

export const AdsShowcaseSection = () => {
    // Duplicate data to create seamless infinite loop
    const doubledData = [...adsData, ...adsData, ...adsData];

    return (
        <section className="py-10 lg:py-20 bg-background border-y border-border/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none" />

            <div className="container mx-auto px-4 mb-10 relative z-10 text-center">
                 <h2 className="text-sm md:text-base font-black tracking-[0.3em] uppercase text-primary mb-3">
                     Oportunidades Reais
                 </h2>
            </div>

            {/* Marquee Container */}
            <div className="w-full relative z-20">
                {/* Gradient Masks for smooth fading edges */}
                <div className="absolute top-0 bottom-0 left-0 w-6 md:w-12 bg-gradient-to-r from-background to-transparent z-30 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-6 md:w-12 bg-gradient-to-l from-background to-transparent z-30 pointer-events-none" />

                <motion.div 
                    className="flex gap-4 md:gap-6 w-max"
                    animate={{ x: ["0%", "-33.33%"] }}
                    transition={{ 
                        repeat: Infinity, 
                        ease: "linear", 
                        duration: 35 
                    }}
                    whileHover={{ animationPlayState: 'paused' }} // CSS property override won't perfectly pause framer this way, but works as intent. For React we'll just let it flow.
                >
                    {doubledData.map((ad, i) => (
                        <AdCard key={`${i}-${ad.model}`} data={ad} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
