import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  // Hide buttons on checkout and success pages
  const hideButtons = location.pathname === '/checkout' || location.pathname === '/congratulations';

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#05100B] border-b border-white/5 shadow-2xl">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center group">
          <img 
            src="https://yrgtjzgwuzyupvrtefwo.supabase.co/storage/v1/object/public/storageImagens/logo_karcash-removebg_1.webp" 
            alt="KarCash Logo" 
            className="h-10 w-auto brightness-0 invert transition-all duration-300 group-hover:scale-105" 
          />
        </a>

        {/* Desktop CTA - Conditional Rendering */}
        {!hideButtons && (
          <motion.a
            href="/checkout"
            className="hidden md:block btn-primary-cta text-sm py-3 px-8 shadow-none hover:shadow-primary/40 bg-primary border-none text-white"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            QUERO ACESSO AGORA
          </motion.a>
        )}

        {/* Mobile menu button - Conditional Rendering */}
        {!hideButtons && (
          <button
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        )}
      </div>

      {/* Mobile menu - Conditional Rendering */}
      {isMenuOpen && !hideButtons && (
        <motion.div
          className="md:hidden bg-[#05100B] border-t border-white/5 p-6 shadow-2xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <a
            href="/checkout"
            className="btn-primary-cta block text-center text-base py-4"
            onClick={() => setIsMenuOpen(false)}
          >
            QUERO ACESSO AGORA
          </a>
        </motion.div>
      )}
    </header>
  );
};
