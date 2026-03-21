import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

export const PainSection = () => {
  return (
    <section className="py-[120px] bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-[32px] items-center">
          {/* Left Column: Copy */}
          <ScrollReveal>
            <div>
              <h2 className="mb-8 text-foreground">
                O Leilão Comum é o <span className="text-primary">Cemitério</span> do seu Lucro.
              </h2>
              <div className="space-y-6 text-foreground/80">
                <p>
                  No mercado tradicional, o carimbo de <strong className="text-foreground">"Sinistro"</strong> ou <strong className="text-foreground">"Média Monta"</strong> faz seu dinheiro evaporar.
                </p>
                <p>
                  Você trabalha, recupera o carro, investe tempo e energia, mas o mercado te pune implacavelmente com vendas de <strong className="text-primary">20% a 30% abaixo da Tabela Fipe</strong>.
                </p>
                <p>
                  Até quando você vai aceitar trabalhar para alimentar o lucro das seguradoras e pátios de leilão, enquanto sua margem desaparece no histórico do veículo?
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Visual Element */}
          <ScrollReveal delay={0.2}>
            <div className="relative aspect-video lg:aspect-square bg-card rounded-2xl border border-secondary/30 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-24 h-24 mb-6 mx-auto rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                     <span className="text-4xl text-destructive font-bold select-none">✕</span>
                  </div>
                  <p className="text-2xl font-display font-bold text-destructive uppercase tracking-widest mb-2">Histórico de Leilão</p>
                  <p className="text-foreground/60 max-w-xs mx-auto text-sm">O carimbo que destrói a confiança do seu comprador e sepulta sua margem de lucro.</p>
                </div>
              </div>
              {/* Abstract decorative elements */}
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-destructive/5 rounded-full blur-3xl" />
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-20" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
