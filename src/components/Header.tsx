import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { CtaButton } from "./CtaButton";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  // Hide buttons on checkout and success pages
  const hideButtons = location.pathname === '/checkout' || location.pathname === '/congratulations';

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5 shadow-2xl">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img 
            src="/logo_karcash.webp" 
            alt="KarCash Logo" 
            className="h-10 w-auto" 
          />
        </a>

        {/* Desktop CTA - Conditional Rendering */}
        {!hideButtons && (
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="/#vender" 
              className="text-sm font-black text-white/50 hover:text-white uppercase tracking-widest transition-colors"
            >
              Vender um Carro
            </a>
            <CtaButton 
                text="QUERO ACESSO AGORA" 
                href="/checkout" 
                variant="primary" 
                size="sm" 
            />
          </div>
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
          className="md:hidden bg-background border-t border-white/5 p-6 shadow-2xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <a
            href="/#vender"
            className="block text-center text-sm font-black text-white/50 hover:text-white uppercase tracking-widest mb-6 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Vender um Carro
          </a>
          <CtaButton 
            text="QUERO ACESSO AGORA" 
            href="/checkout" 
            variant="primary" 
            size="lg" 
            fullWidth={true}
            onClick={() => setIsMenuOpen(false)}
          />
        </motion.div>
      )}
    </header>
  );
};
