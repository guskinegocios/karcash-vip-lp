import { motion } from "framer-motion";
import { PhoneMockup } from "./PhoneMockup";

export const HeroSection = () => {
    return (

        <>
            {/* Hero Section */}
            <section className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-4">
                        {/* Content */}
                        <div className="flex-1 text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
                                    🔒 VAGAS LIMITADAS PARA NOVA TURMA
                                </span>
                            </motion.div>

                            <motion.h1
                                className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                Acesse as ofertas que as concessionárias escondem e lucre até <span className="text-secondary">R$ 20 mil</span> por carro.
                            </motion.h1>

                            <motion.p
                                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                A única comunidade que entrega carros <strong>Sem Leilão e Sem Sinistro</strong> com margem real.
                                Não precisa de CNPJ e o acesso é imediato.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <a href="/checkout">
                                    <motion.button
                                        className="btn-primary-cta text-base md:text-lg pulse-glow"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        QUERO ACESSO VIP
                                    </motion.button>
                                </a>
                                <p className="text-muted-foreground text-sm mt-4">
                                    ⚠️ Acesso liberado imediatamente após validação
                                </p>
                            </motion.div>
                        </div>

                        {/* Phone Mockup */}
                        <div className="flex-1 flex justify-center lg:justify-end">
                            <PhoneMockup />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}