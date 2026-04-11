import { motion } from "framer-motion";
import { CheckCircle2, Play, ArrowRight, UserPlus, Car, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";

interface VIPOpportunityModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export const VIPOpportunityModal = ({ isOpen, setIsOpen }: VIPOpportunityModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-4xl p-0 overflow-hidden md:overflow-visible bg-transparent border-none shadow-none max-h-[95vh] md:max-h-none overflow-y-auto md:overflow-y-visible scrollbar-hide">
                <div className="rounded-2xl md:rounded-[40px] border border-primary/30 bg-background/95 backdrop-blur-xl p-5 md:p-10 relative overflow-hidden w-full shadow-2xl my-4">
                    {/* Background Decorative Elements */}
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

                    <div className="relative z-10">
                        <div className="text-center mb-6 md:mb-10">
                            <span className="inline-block px-3 py-1 mb-3 text-[9px] md:text-xs font-bold text-primary bg-primary/10 rounded-full border border-primary/20 uppercase tracking-widest">
                                🚀 Oportunidade Exclusiva
                            </span>
                            <h2 className="font-display font-bold text-2xl md:text-4xl text-foreground mb-3 leading-tight">
                                Em qual nível você <span className="text-primary italic">está hoje?</span>
                            </h2>
                            <p className="text-muted-foreground text-xs md:text-base max-w-2xl mx-auto px-2">
                                Temos um modelo para cada investidor. Escolha o seu e comece a lucrar agora mesmo.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
                            {/* Nível 1 */}
                            <div className="flex flex-col p-5 md:p-6 rounded-2xl md:rounded-3xl bg-secondary/30 border border-primary/20 transition-all group">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                                    <UserPlus className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                                </div>
                                <h3 className="font-bold text-lg md:text-xl mb-2 md:mb-3">Afiliado VIP</h3>
                                <p className="text-[11px] md:text-xs text-muted-foreground mb-3 md:mb-4 flex-grow">
                                    Invista <span className="text-foreground font-bold">R$ 49,94</span> e receba um cupom de 10% de cashback por cada nova assinatura indicada.
                                </p>
                                <div className="text-primary font-mono text-[10px] md:text-sm font-bold">
                                    Recupere em 10 indicações!
                                </div>
                            </div>

                            {/* Nível 2 */}
                            <div className="flex flex-col p-5 md:p-6 rounded-2xl md:rounded-3xl bg-primary/10 border border-primary/30 shadow-xl relative overflow-hidden group md:scale-105">
                                <div className="absolute top-0 right-0 p-2 md:p-3">
                                    <div className="bg-primary text-black text-[8px] md:text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">Mais Popular</div>
                                </div>
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/20 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                                    <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                                </div>
                                <h3 className="font-bold text-lg md:text-xl mb-2 md:mb-3">Dropshipper</h3>
                                <p className="text-[11px] md:text-xs text-muted-foreground mb-3 md:mb-4 flex-grow">
                                    Intermedie vendas da nossa rede sem precisar comprar o carro. Lucro médio de <span className="text-foreground font-bold text-sm">R$ 1.000,00</span> por veículo.
                                </p>
                                <div className="text-primary font-mono text-[10px] md:text-sm font-bold">
                                    Sem estoque, zero risco.
                                </div>
                            </div>

                            {/* Nível 3 */}
                            <div className="flex flex-col p-5 md:p-6 rounded-2xl md:rounded-3xl bg-secondary/30 border border-primary/20 transition-all group">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                                    <Car className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                                </div>
                                <h3 className="font-bold text-lg md:text-xl mb-2 md:mb-3">Investidor</h3>
                                <p className="text-[11px] md:text-xs text-muted-foreground mb-3 md:mb-4 flex-grow">
                                    Compre e recupere veículos avariados selecionados. Ganhe até <span className="text-foreground font-bold text-sm">R$ 20.000,00</span> em ciclos de 15 dias.
                                </p>
                                <div className="text-primary font-mono text-[10px] md:text-sm font-bold">
                                    Alta rentabilidade real.
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-5 md:p-6 rounded-2xl md:rounded-[2rem] bg-secondary/40 border border-white/5">
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 animate-pulse">
                                    <Play className="w-5 h-5 md:w-6 md:h-6 text-primary fill-primary" />
                                </div>
                                <div>
                                    <p className="text-xs md:text-sm font-bold mb-0.5">Veja na prática:</p>
                                    <p className="text-[10px] md:text-xs text-muted-foreground">Recuperação do Polo e lucro.</p>
                                </div>
                            </div>
                            
                            <Link to="/checkout" className="w-full md:w-auto" onClick={() => setIsOpen(false)}>
                                <motion.button
                                    className="btn-primary-cta text-sm md:text-base flex items-center justify-center gap-2 group px-10 py-4 w-full"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    GARANTIR MINHA VAGA AGORA
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>
                        </div>
                        
                        <div className="mt-6 flex justify-center gap-6 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-primary" /> Vagas Limitadas</span>
                            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-primary" /> Acesso Imediato</span>
                            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-primary" /> Suporte VIP</span>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
