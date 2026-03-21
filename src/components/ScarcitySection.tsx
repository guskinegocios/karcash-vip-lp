import { ScrollReveal } from "./ScrollReveal";
import { motion } from "framer-motion";

export const ScarcitySection = () => {
  return (
    <section className="py-[120px] bg-card border-y border-secondary/20 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto bg-background/40 backdrop-blur-sm border border-secondary/30 rounded-[2.5rem] p-8 md:p-16 text-center relative">
            
            {/* Floating Scarcity Badge */}
            <motion.div 
              className="absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-primary/20 border border-primary/40 rounded-full shadow-[0_0_20px_rgba(219,252,29,0.2)]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-primary font-bold text-sm tracking-[0.2em] uppercase">
                APENAS 10 VAGAS
              </span>
            </motion.div>

            <h2 className="text-foreground mb-6">
              Apenas <span className="text-primary italic">10 oportunidades</span> por dia.
            </h2>
            <p className="text-xl md:text-2xl text-foreground font-display font-bold uppercase tracking-widest mb-8">
              Para quem chega primeiro.
            </p>
            <div className="inline-block px-6 py-3 bg-primary/10 border border-primary/20 rounded-full text-primary font-bold text-sm uppercase tracking-wider animate-pulse">
              Filtramos apenas o topo do mercado premium
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
