import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

export const FinalCTA = () => {
  return (
    <section className="py-[120px] bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 text-center">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-foreground mb-8 text-3xl md:text-6xl font-black uppercase leading-tight">
              Isso não é curso. <span className="text-primary italic">É ACESSO.</span>
            </h2>
            <p className="text-lg md:text-2xl text-foreground/70 mb-12 font-medium">
              Pare de disputar carro ruim com multidão em pátios lotados. <br className="hidden md:block" />
              Domine o mercado com informação privilegiada e margem de concessionária.
            </p>
            
            <div className="flex flex-col items-center gap-8">
              <motion.a
                href="/checkout"
                className="btn-primary-cta w-full md:w-auto px-12 py-6 text-xl md:text-2xl text-center shadow-[0_0_50px_rgba(219,252,29,0.2)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                QUERO MEU ACESSO AGORA
              </motion.a>
              
              <div className="space-y-4">
                <p className="text-primary font-bold text-lg uppercase tracking-widest italic">✓ RISCO ZERO PARA TESTAR</p>
                <p className="text-foreground/50 text-sm max-w-lg mx-auto leading-relaxed">
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
