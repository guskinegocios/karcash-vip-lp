import { Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#05100B] border-t border-white/5 py-12 text-white/60">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
          {/* Left - Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <a href="/" className="flex items-center">
              <img src="/logo_karcash.webp" alt="KarCash Logo" className="h-10 w-auto" />
            </a>
            <p className="text-white/40 text-sm text-center md:text-left font-medium">
              Transformando oportunidades em lucro real.
            </p>
          </div>

          {/* Center - Quick Links */}
          <div className="flex flex-col items-center gap-4">
            <h4 className="font-black text-white/80 text-xs uppercase tracking-widest">
              Links Rápidos
            </h4>
            <div className="flex flex-col items-center gap-2 text-sm text-white/60 font-medium">
              <a href="/termos" className="hover:text-primary transition-colors">
                Termos de Uso
              </a>
              <a href="/privacidade" className="hover:text-primary transition-colors">
                Política de Privacidade
              </a>
              <a
                href="/#faq"
                className="hover:text-primary transition-colors"
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
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-primary hover:text-white transition-all shadow-sm"
                aria-label="Instagram"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-white/40 font-medium">
              © {new Date().getFullYear()} KarCash. Todos os direitos reservados.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-white/5 text-center max-w-4xl mx-auto">
          <p className="text-[10px] text-white/20 leading-relaxed uppercase tracking-tight">
            <strong className="text-white/40 font-bold">Atenção:</strong> A KarCash atua exclusivamente como uma plataforma de tecnologia e inteligência de mercado, fornecendo informações sobre oportunidades automotivas. Não vendemos carros, não intermediamos pagamentos de veículos e não nos responsabilizamos pelas condições reais dos lotes ou pelas negociações de compra e venda realizadas diretamente entre os membros e as concessionárias/lojas.
          </p>
        </div>
      </div>
    </footer>
  );
};
