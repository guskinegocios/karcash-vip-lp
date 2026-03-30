import { motion } from "framer-motion";
import { Check, ClipboardList } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { trackMetaEvent } from "@/utils/track";

const Success = () => {
  const [buyer, setBuyer] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('karcash_last_buyer');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setBuyer(parsed);
        
        // Track the Lead conversion!
        trackMetaEvent({
          eventName: 'Lead',
          userData: { email: parsed.email }
        });
      } catch (e) {
        console.error("Erro ao ler dados do comprador", e);
      }
    }
  }, []);

  const profileLink = buyer 
    ? `/form?email=${encodeURIComponent(buyer.email)}&name=${encodeURIComponent(buyer.name)}`
    : '/form';

  return (
    <main className="flex-1 flex items-center justify-center py-12 md:py-24">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full mx-auto flex items-center justify-center mb-6">
            <Check className="w-12 h-12" />
          </div>

          <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            Seja bem-vindo ao Clube VIP!
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-12">
            Seu pagamento foi confirmado. Agora, siga os passos abaixo para começar a lucrar:
          </p>

          <div className="grid gap-8">
            {/* Step 1: Instagram */}
            <div className="bg-card p-6 rounded-2xl border border-border text-left relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
               <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                 <span className="w-6 h-6 bg-primary text-black rounded-full flex items-center justify-center text-xs">1</span>
                 Solicitar Acesso ao Instagram
               </h3>
               <p className="text-muted-foreground mb-6 text-sm">
                 Nossa tecnologia identificará seu pagamento e aprovará sua solicitação automaticamente.
               </p>
               <a 
                href={`https://instagram.com/${import.meta.env.VITE_INSTAGRAM_VIP_HANDLE?.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-cta py-3 px-6 rounded-xl font-display font-bold text-base inline-flex items-center gap-2 w-full justify-center"
              >
                SOLICITAR ACESSO AO {import.meta.env.VITE_INSTAGRAM_VIP_HANDLE}
              </a>
            </div>

            {/* Step 2: Profile (The "1 minute" survey) */}
            <div className="bg-card p-6 rounded-2xl border border-primary/20 text-left relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
               <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                 <span className="w-6 h-6 bg-primary text-black rounded-full flex items-center justify-center text-xs">2</span>
                 Personalizar seu Perfil VIP
               </h3>
               <p className="text-muted-foreground mb-6 text-sm">
                 Nos ajude a melhorar nossa entrega para você. Leva somente 1 minutinho.
               </p>
               <Link 
                to={profileLink}
                className="bg-white text-black hover:bg-white/90 py-3 px-6 rounded-xl font-display font-bold text-base inline-flex items-center gap-2 w-full justify-center transition-colors"
              >
                <ClipboardList className="w-5 h-5" />
                FINALIZAR MEU PERFIL (1 MIN)
              </Link>
            </div>
          </div>

          <div className="mt-12">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Voltar para o site oficial
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Success;
