import { CreditCard, MessageCircle, TrendingUp, Handshake } from "lucide-react"
import { ScrollReveal } from "./ScrollReveal"
import { StepCard } from "./StepCard"

export const Journey = () => {
    return (
        <section className="py-16 bg-navy relative z-10">
            <div className="container mx-auto px-4">
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-4">
                            Sua Jornada de Lucro em{" "}
                            <span className="text-primary">4 Passos</span>
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    <StepCard
                        number={1}
                        title="Assine"
                        description="Garanta seu acesso VIP à nossa plataforma de ofertas."
                        icon={<CreditCard className="w-8 h-8" />}
                        delay={0}
                    />
                    <StepCard
                        number={2}
                        title="Entre no Grupo"
                        description="Acesse nossa comunidade fechada com as melhores oportunidades diárias."
                        icon={<MessageCircle className="w-8 h-8" />}
                        delay={0.1}
                    />
                    <StepCard
                        number={3}
                        title="Escolha o Carro"
                        description="Analise as margens de lucro e encontre o veículo perfeito para você."
                        icon={<TrendingUp className="w-8 h-8" />}
                        delay={0.2}
                    />
                    <StepCard
                        number={4}
                        title="Negocie Direto"
                        description="Você quem trata direto com a concessionária ou particular. Feche negócio com a melhor margem!"
                        icon={<Handshake className="w-8 h-8" />}
                        delay={0.3}
                    />
                </div>
            </div>
        </section>
    );
}
