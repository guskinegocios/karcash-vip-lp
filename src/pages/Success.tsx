import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect } from "react";
import { trackMetaEvent } from "@/utils/track";

const Success = () => {
  useEffect(() => {
    const saved = localStorage.getItem('karcash_last_buyer');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        
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

          <div className="grid gap-8 max-w-md mx-auto">
            {/* Step 1: Instagram */}
            <div className="bg-card p-8 rounded-2xl border border-border text-left relative overflow-hidden shadow-xl">
               <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
               <h3 className="font-bold text-2xl mb-4 flex items-center gap-2">
                 Solicitar Acesso ao Instagram
               </h3>
               <p className="text-muted-foreground mb-8 text-base">
                 Nossa tecnologia identificará seu pagamento e aprovará sua solicitação automaticamente.
               </p>
               <a 
                href={`https://instagram.com/${import.meta.env.VITE_INSTAGRAM_VIP_HANDLE?.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-cta py-4 px-6 rounded-xl font-display font-bold text-lg inline-flex items-center gap-2 w-full justify-center shadow-[0_0_20px_rgba(0,255,0,0.3)]"
              >
                SOLICITAR ACESSO AO {import.meta.env.VITE_INSTAGRAM_VIP_HANDLE}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Success;
