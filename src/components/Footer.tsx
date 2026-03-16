import KarcashLogo from '@/assets/logo_karcash-removebg_1.webp';
import { useState } from "react";
import { Instagram, MessageCircle } from "lucide-react";
import { CancellationModal } from "./CancellationModal";

export const Footer = () => {
  const [isCancellationModalOpen, setIsCancellationModalOpen] = useState(false);

  const scrollToFAQ = () => {
    const faqSection = document.querySelector('section:has(.accordion)');
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <footer className="bg-navy-deep border-t border-border py-12">
        <div className="container mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
            {/* Left - Logo & Tagline */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <a href="/" className="flex items-center">
                <img src={KarcashLogo} alt="KarCash Logo" className="h-10 w-auto" />
              </a>
              <p className="text-muted-foreground text-sm text-center md:text-left">
                Transformando oportunidades em lucro real.
              </p>
            </div>

            {/* Center - Quick Links */}
            <div className="flex flex-col items-center gap-4">
              <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">
                Links Rápidos
              </h4>
              <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                <a href="/termos" className="hover:text-foreground transition-colors">
                  Termos de Uso
                </a>
                <a href="/privacidade" className="hover:text-foreground transition-colors">
                  Política de Privacidade
                </a>
                <a
                  href="/#faq"
                  className="hover:text-foreground transition-colors"
                >
                  Dúvidas Frequentes
                </a>
              </div>
            </div>

            {/* Right - Social & Copyright */}
            <div className="flex flex-col items-center md:items-end gap-4">
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/karcashmotors/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} KarCash. Todos os direitos reservados.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 text-center max-w-4xl mx-auto">
            <p className="text-xs text-muted-foreground/60 leading-relaxed">
              <strong>Atenção:</strong> A KarCash atua exclusivamente como uma plataforma de tecnologia e inteligência de mercado, fornecendo informações sobre oportunidades automotivas. Não vendemos carros, não intermediamos pagamentos de veículos e não nos responsabilizamos pelas condições reais dos lotes ou pelas negociações de compra e venda realizadas diretamente entre os membros e as concessionárias/lojas.
            </p>
          </div>

          {/* Bottom Divider & Manage Subscription Link */}
          <div className="mt-10 pt-6 border-t border-border/50 flex justify-center">
            <button
              onClick={() => setIsCancellationModalOpen(true)}
              className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors underline-offset-2 hover:underline"
            >
              Gerenciar Assinatura ou Cancelar
            </button>
          </div>
        </div>
      </footer>

      {/* Cancellation Modal */}
      <CancellationModal
        isOpen={isCancellationModalOpen}
        onClose={() => setIsCancellationModalOpen(false)}
      />
    </>
  );
};
