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
    image: "/anuncios/bmw-removebg.png"
  },
  {
    brand: "FIAT",
    model: "MOBI LIKE",
    year: "2024",
    details: "MOTOR AVARIADO",
    fipe: "53.462,00",
    karcash: "27.998,00",
    profit: "25.464,00",
    image: "/anuncios/FIAT_MOBI_LIKE.png"
  },
  {
    brand: "HYUNDAI",
    model: "HB20 TGDI",
    year: "2025",
    details: "COLISÃO TRASEIRA",
    fipe: "96.735,00",
    karcash: "49.999,00",
    profit: "46.736,00",
    image: "/anuncios/HYUNDAI_HB20_TGDI.png"
  },
  {
    brand: "NISSAN",
    model: "KICKS SENSE",
    year: "2024",
    details: "MOTOR AVARIADO",
    fipe: "104.142,00",
    karcash: "59.100,00",
    profit: "45.000,00",
    image: "/anuncios/NISSAN_KICKS_SENSE.png"
  },
  {
    brand: "RENAULT",
    model: "KANGOO ADV.",
    year: "2024",
    details: "COLISÃO FRONTAL",
    fipe: "106.326,00",
    karcash: "51.200,00",
    profit: "55.126,00",
    image: "/anuncios/RENAULT_KANGOO_ADVANCE.png"
  }
];

const AdCard = ({ data }: { data: typeof adsData[0] }) => {
  return (
    <div 
      className="flex-shrink-0 w-[280px] md:w-[320px] aspect-[4/5] rounded-[2rem] overflow-hidden relative flex flex-col group transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/10 hover:border-white/20 hover:shadow-[0_30px_50px_rgba(0,0,0,0.6)]"
      style={{ backgroundImage: "url('/anuncios/bgCard.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Header - Logo */}
      <div className="pt-3 pb-0 px-5 flex justify-center relative z-10 drop-shadow-xl">
        <img src="/logo_karcash.webp" alt="Karcash Logo" className="h-[18px] object-contain" />
      </div>

      {/* Glassmorphic Information Plate */}
      <div className="mx-4 mt-1 p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl relative z-20 flex flex-col gap-3 transition-colors duration-300 group-hover:bg-black/50">
        
        {/* Car Name & Year */}
        <div className="flex flex-col">
            <span className="text-white/60 font-bold text-[10px] tracking-widest uppercase mb-0.5">{data.brand} • {data.year}</span>
            <span className="text-white font-black text-xl md:text-2xl uppercase leading-none drop-shadow-md">{data.model}</span>
            <span className="text-white/40 font-medium text-[9px] uppercase mt-1 tracking-wider">{data.details}</span>
        </div>

        {/* Financials Grid */}
        <div className="grid grid-cols-[1.2fr_1fr] gap-3 mt-1 pt-3 border-t border-white/10">
            {/* FIPE & Karcash */}
            <div className="flex flex-col gap-1.5 border-r border-white/10 pr-3">
                <div className="flex justify-between items-end">
                    <span className="text-[9px] text-white/50 font-bold tracking-wider">FIPE</span>
                    <span className="text-[10px] text-white/40 line-through font-bold">R$ {data.fipe}</span>
                </div>
                <div className="flex justify-between items-end">
                    <span className="text-[9px] text-white/90 font-bold tracking-wider">VIP</span>
                    <span className="text-[13px] text-white font-black drop-shadow-md">R$ {data.karcash}</span>
                </div>
            </div>

            {/* Profit Margin */}
            <div className="flex flex-col justify-center">
                <span className="text-[9px] text-[#DBFC1D]/80 font-bold tracking-wider uppercase mb-0.5">Lucro na Revenda</span>
                <span className="text-lg md:text-xl text-[#DBFC1D] font-black leading-none drop-shadow-[0_0_12px_rgba(219,252,29,0.2)]">+{data.profit}</span>
            </div>
        </div>
      </div>

      {/* 3D Vehicle Image */}
      <div className="flex-1 w-full relative z-20 flex items-end justify-center px-4 pb-4 pointer-events-none mt-auto">
          <img 
            src={data.image} 
            alt={`${data.brand} ${data.model}`} 
            className="w-[115%] max-h-[170px] md:max-h-[200px] object-contain object-bottom -translate-y-2 drop-shadow-[0_30px_30px_rgba(0,0,0,0.9)]"
          />
      </div>
    </div>
  );
};

export const AdsShowcaseSection = () => {
    // Duplicate data to create seamless infinite loop
    const doubledData = [...adsData, ...adsData, ...adsData];

    return (
        <section className="pt-2 pb-10 lg:pt-4 lg:pb-20 bg-background border-y border-border/20 overflow-hidden relative">
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
