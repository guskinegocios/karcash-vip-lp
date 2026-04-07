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
    <main className="min-h-screen bg-background flex flex-col items-center justify-center py-12 md:py-24 px-4">
      <div className="container mx-auto text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 bg-primary/10 text-primary rounded-full mx-auto flex items-center justify-center mb-10 shadow-lg shadow-primary/5">
            <Check className="w-12 h-12" />
          </div>

          <h1 className="font-display font-black text-4xl md:text-6xl text-foreground mb-6 uppercase tracking-tight">
            Bem-vindo ao Elite VIP!
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-16 font-medium max-w-xl mx-auto leading-relaxed">
            Seu acesso foi processado com sucesso. Siga as instruções abaixo para começar a operar com nossa inteligência:
          </p>

          <div className="max-w-md mx-auto">
            {/* Step Card */}
            <div className="card-premium text-left shadow-2xl relative overflow-hidden p-0">
               <div className="h-2 w-full bg-primary" />
               <div className="p-10">
                <h3 className="font-display font-black text-2xl mb-4 uppercase tracking-tight">
                  Acesso ao Portal VIP
                </h3>
                <p className="text-muted-foreground mb-10 text-base font-medium leading-relaxed">
                  Nossa inteligência identificou seu pagamento. Clique no botão abaixo para solicitar entrada no grupo exclusivo.
                </p>
                <a 
                  href={`https://instagram.com/${import.meta.env.VITE_INSTAGRAM_VIP_HANDLE?.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-cta w-full"
                >
                  SOLICITAR ACESSO AGORA
                </a>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Success;
