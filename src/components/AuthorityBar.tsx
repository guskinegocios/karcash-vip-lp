import KarcashLogo from '@/assets/logo_karcash-removebg_1.webp';
import { motion } from "framer-motion";

export const AuthorityBar = () => {
  return (
    <section className="bg-background py-8 border-b border-secondary/30">
      <div className="container mx-auto px-4 flex justify-center md:justify-start">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img src={KarcashLogo} alt="KarCash Logo" className="h-10 md:h-12 w-auto grayscale brightness-200 opacity-80" />
        </motion.div>
      </div>
    </section>
  );
};
