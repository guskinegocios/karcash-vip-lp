import { motion } from "framer-motion";

export const AnnouncementBar = () => {
  return (
    <div className="bg-primary text-primary-foreground py-2 px-4 text-center relative z-[60] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center gap-2"
      >
        <span className="text-xs md:text-sm font-black tracking-tight uppercase">
          🔥 OPORTUNIDADE ÚNICA: Apenas 10 veículos raros disponíveis hoje. Oferta exclusiva para membros.
        </span>
      </motion.div>
    </div>
  );
};
