import { motion } from "framer-motion";
import { Check } from "lucide-react";

const Success = () => {
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

          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Seu pagamento foi confirmado. Agora, o passo final é solicitar o acesso 
            ao nosso perfil exclusivo no Instagram onde as ofertas são postadas diariamente.
          </p>

          <div className="flex flex-col items-center gap-6">
            <a 
              href={`https://instagram.com/${import.meta.env.VITE_INSTAGRAM_VIP_HANDLE?.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-cta py-4 px-8 rounded-xl font-display font-bold text-lg inline-flex items-center gap-2"
            >
              SOLICITAR ACESSO AO {import.meta.env.VITE_INSTAGRAM_VIP_HANDLE}
            </a>

            <p className="text-sm text-muted-foreground max-w-md">
              <span className="font-bold text-primary">Importante:</span> Nossa tecnologia (Lastlink) identificará seu pagamento e aprovará sua solicitação automaticamente em instantes.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Success;
