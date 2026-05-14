import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { CtaButton } from "./CtaButton";

export const FinalCTA = () => {
  return (
    <section className="py-20 md:py-[120px] bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 text-center">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="text-white mb-6 md:mb-8 text-2xl md:text-6xl font-black uppercase leading-tight tracking-tighter italic text-center">
              Isso não é curso. <span className="text-primary">É ACESSO.</span>
            </h2>
            <p className="text-base md:text-2xl text-white/70 mb-10 md:mb-12 font-medium leading-relaxed text-center">
              Pare de disputar carro ruim com multidão em pátios lotados. <br className="hidden md:block" />
              Domine o mercado com informação privilegiada e margem de concessionária.
            </p>
            
            <div className="w-full flex flex-col items-center gap-10 md:gap-12">
                <div className="w-full flex justify-center">
                    <CtaButton 
                        text="QUERO MEU ACESSO AGORA" 
                        href="/checkout" 
                        variant="primary" 
                        size="xl" 
                        fullWidth={true}
                        className="md:w-fit md:px-16 md:scale-110 md:mx-auto"
                    />
                </div>
              
              <div className="space-y-4 pt-4 md:pt-0">
                <p className="text-primary font-black text-base md:text-lg uppercase tracking-[0.2em] italic text-center">✓ RISCO ZERO PARA TESTAR</p>
                <p className="text-white/30 text-[10px] md:text-sm max-w-lg mx-auto leading-relaxed uppercase font-black text-center">
                  Se você não encontrar oportunidades reais dentro da plataforma, devolvemos 100% do seu investimento. Sem burocracia.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
