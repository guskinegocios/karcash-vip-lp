import { ScrollReveal } from "./ScrollReveal";

export const ScarcitySection = () => {
  return (
    <section className="py-[120px] bg-card border-y border-secondary/20 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto bg-background/40 backdrop-blur-sm border border-secondary/30 rounded-[2.5rem] p-8 md:p-16 text-center">
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
