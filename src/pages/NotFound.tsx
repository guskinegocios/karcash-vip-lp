import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { House, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="container max-w-lg text-center">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="w-24 h-24 bg-primary/10 text-primary rounded-full mx-auto flex items-center justify-center mb-8 shadow-inner">
                <Search className="w-10 h-10" />
            </div>

            <h1 className="font-display font-black text-7xl md:text-9xl text-foreground mb-4 uppercase tracking-tighter opacity-10 select-none">
                404
            </h1>

            <h2 className="font-display font-black text-2xl md:text-3xl text-foreground mb-4 uppercase tracking-tight -mt-12 md:-mt-16">
                Rota não encontrada
            </h2>
            
            <p className="text-muted-foreground mb-12 font-medium leading-relaxed max-w-sm mx-auto">
                O endereço que você tentou acessar não existe ou foi movido para uma nova localização no ecossistema KarCash.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="rounded-2xl font-black uppercase tracking-widest px-8 h-14 w-full sm:w-auto shadow-xl shadow-primary/20">
                    <Link to="/">
                        <House className="mr-2 w-5 h-5 font-bold" />
                        VOLTAR AO INÍCIO
                    </Link>
                </Button>
            </div>

            <p className="mt-16 text-[10px] text-muted-foreground/30 font-black uppercase tracking-[0.4em]">
                KarCash VIP • Protocolo de Navegação
            </p>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
