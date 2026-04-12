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
    <main className="h-screen bg-background flex flex-col items-center justify-center px-4 overflow-hidden">
      <div className="container mx-auto text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full mx-auto flex items-center justify-center mb-5 shadow-lg shadow-primary/5">
            <Check className="w-8 h-8" />
          </div>

          <h1 className="font-display font-black text-3xl md:text-5xl text-foreground mb-3 uppercase tracking-tight">
            Bem-vindo ao Elite VIP!
          </h1>

          <p className="text-base md:text-lg text-muted-foreground mb-6 font-medium max-w-xl mx-auto leading-relaxed">
            Seu acesso foi processado com sucesso. Siga as instruções abaixo para começar a operar com nossa inteligência:
          </p>

          <div className="max-w-md mx-auto">
            {/* Step Card */}
            <div className="card-premium text-left shadow-2xl relative overflow-hidden p-0">
              <div className="h-2 w-full bg-primary" />
              <div className="p-5 sm:p-7">
                <h3 className="font-display font-black text-xl mb-3 uppercase tracking-tight">
                  Acesso ao Portal VIP
                </h3>
                <p className="text-muted-foreground mb-5 text-sm font-medium leading-relaxed">
                  Nossa inteligência identificou seu pagamento. Clique no botão abaixo para solicitar entrada no grupo exclusivo.
                </p>
                <a
                  href={`https://instagram.com/${import.meta.env.VITE_INSTAGRAM_VIP_HANDLE?.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-cta w-full !text-[11px] sm:!text-sm !tracking-wider sm:!tracking-widest"
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
