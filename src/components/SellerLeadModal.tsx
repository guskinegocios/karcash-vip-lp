import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";

export const SellerLeadModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check if the user has already seen the modal in this session to prevent spamming
        const hasSeenModal = sessionStorage.getItem("hasSeenSellerModal");
        if (!hasSeenModal) {
            const timer = setTimeout(() => {
                setIsOpen(true);
                sessionStorage.setItem("hasSeenSellerModal", "true");
            }, 2000); // Small delay to not be too aggressive
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-2xl p-0 overflow-hidden bg-transparent border-none shadow-none">
                <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-card to-background backdrop-blur-md p-8 relative overflow-hidden w-full">
                    {/* Decorative background circle */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />

                    <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                        <div className="flex-1 text-center md:text-left">
                            <span className="inline-block px-4 py-1.5 mb-4 text-[10px] md:text-xs font-bold text-primary bg-primary/10 rounded-full border border-primary/20 uppercase tracking-widest">
                                💰 Venda Seu Veículo Rápido
                            </span>
                            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4 leading-tight text-balance">
                                Tem um carro <span className="text-primary">Avariado</span> e quer vender agora? 🚗
                            </h2>
                            <p className="text-muted-foreground text-base mb-6 max-w-xl mx-auto md:mx-0 leading-relaxed">
                                Nossa rede exclusiva de investidores compra seu veículo à vista.
                                Acesse nossa página de avaliação e receba uma oferta em até 24h.
                            </p>

                            <Link to="/vender" onClick={() => setIsOpen(false)}>
                                <motion.button
                                    className="btn-primary-cta text-sm md:text-base flex items-center justify-center gap-2 group px-6 py-3 w-full sm:w-auto"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    QUERO VENDER MEU CARRO
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>
                        </div>

                        <div className="flex-shrink-0 relative hidden sm:block">
                            <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center group overflow-hidden">
                                <Car className="w-16 h-16 md:w-24 md:h-24 text-primary/30 group-hover:text-primary/60 transition-all duration-700 -rotate-12 group-hover:rotate-0 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
