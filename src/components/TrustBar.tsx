import { ShieldCheck, Unlock, Handshake } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const trustItems = [
    {
        icon: <ShieldCheck className="w-8 h-8 text-primary" />,
        title: "Pagamento Seguro",
        description: "Transação criptografada de ponta a ponta.",
    },
    {
        icon: <Unlock className="w-8 h-8 text-primary" />,
        title: "Sem Fidelidade",
        description: "Você livre para cancelar a qualquer momento.",
    },
    {
        icon: <Handshake className="w-8 h-8 text-primary" />,
        title: "Compra Direta",
        description: "Negocie direto com a loja. Não cobramos comissão.",
    },
];

export const TrustBar = () => {
    return (
        <section className="py-8 bg-card/50 border-y border-white/5 relative z-10">
            <div className="container mx-auto px-4">
                <ScrollReveal>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        {trustItems.map((item, index) => (
                            <div key={index} className="flex flex-col items-center gap-3">
                                <div className="p-3 bg-primary/10 rounded-full">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="font-display font-semibold text-lg text-foreground">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};
