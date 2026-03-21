import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

export const FinalCTA = () => {
  return (
    <section className="py-[120px] bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 text-center">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-foreground mb-8">
              Domine o mercado de <span className="text-primary">recuperados premium</span> agora.
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 mb-12">
              Não deixe seu capital preso em leilões que corroem sua margem. 
              Tenha o suporte de quem entende de ativos raros e alta lucratividade.
            </p>
            
            <div className="flex flex-col items-center gap-6">
              <motion.button
                className="btn-primary-cta w-full md:w-auto px-12 py-6 text-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://wa.me/your-link-here', '_blank')}
              >
                FALAR COM O ESTRATEGISTA KARCASH
              </motion.button>
              
              <div className="flex items-center gap-2 text-foreground/50 text-sm italic">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Responda rápido: apenas 3 estrategistas disponíveis agora
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
