import { motion } from "framer-motion";

export const AuthorityBar = () => {
  return (
    <section className="bg-background py-6 md:py-10 border-b border-border/40 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="hidden md:block"
          >
            <img src="https://yrgtjzgwuzyupvrtefwo.supabase.co/storage/v1/object/public/storageImagens/logo_karcash-removebg_1.webp" alt="KarCash Logo" className="h-8 md:h-10 w-auto opacity-40 hover:opacity-100 transition-opacity" />
          </motion.div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 md:gap-x-12">
            {[
              { label: "SEM HISTÓRICO DE LEILÃO", value: "✓" },
              { label: "100% TABELA FIPE", value: "✓" },
              { label: "10 OPÇÕES / DIA", value: "RARE" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="text-primary font-black text-lg">{item.value === "✓" ? "✓" : <span className="text-[10px] bg-primary/20 px-1.5 py-0.5 rounded text-primary border border-primary/30 uppercase">{item.value}</span>}</span>
                <span className="text-foreground/60 text-xs md:text-sm font-bold tracking-widest uppercase">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
