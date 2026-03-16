import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Loader2 } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const CheckoutOfferSection = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        whatsapp: "",
        document: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Required Validations
        if (!formData.name || !formData.email || !formData.whatsapp || !formData.document) {
            toast({
                title: "Preencha todos os campos",
                description: "Precisamos dos seus dados para liberar acesso.",
                variant: "destructive"
            });
            setIsLoading(false);
            return;
        }

        try {
            // Mocking Supabase call - here you'd call your Supabase insertion logic
            // await supabase.from('leads').insert([formData])
            await new Promise((resolve) => setTimeout(resolve, 1500));

            toast({
                title: "Cadastro realizado!",
                description: "Redirecionando para o pagamento seguro...",
            });

            // Redirect to actual checkout
            navigate("/checkout");
        } catch (error) {
            toast({
                title: "Erro no cadastro",
                description: "Tente novamente mais tarde.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="py-24 bg-gradient-to-b from-background to-navy/20" id="pricing">
            <div className="container mx-auto px-4 max-w-5xl">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold text-primary bg-primary/10 rounded-full border border-primary/20 uppercase tracking-widest">
                            🚀 Vagas Limitadas
                        </span>
                        <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
                            Sua Oportunidade <span className="text-primary">Começa Aqui.</span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Preencha seus dados para garantir a sua vaga com desconto exclusivo de abertura.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                    {/* Offer Details */}
                    <ScrollReveal delay={0.1} className="flex-1 w-full flex">
                        <div className="card-elevated flex flex-col justify-between w-full relative overflow-hidden bg-card/40 border-primary/20 p-8 md:p-10">
                            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-bl-xl z-20">
                                OFERTA ESPECIAL
                            </div>

                            <div>
                                <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
                                    Vip KarCash
                                </h3>

                                <div className="mb-6 flex flex-col">
                                    <span className="text-muted-foreground line-through text-lg">De R$ 197,00</span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl md:text-5xl font-bold text-foreground">R$ 59,90</span>
                                        <span className="text-muted-foreground">/mês</span>
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {[
                                        "Acesso Imediato ao Grupo VIP",
                                        "10 novas ofertas abaixo da FIPE / dia",
                                        "Contato direto com lojistas",
                                        "Cancela quando quiser"
                                    ].map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <span className="text-foreground/90">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Form Capture */}
                    <ScrollReveal delay={0.2} className="flex-1 w-full flex">
                        <div className="card-elevated bg-card/80 p-8 md:p-10 w-full flex flex-col justify-center border-white/10">
                            <h4 className="text-xl font-bold text-foreground mb-6 text-center">
                                Preencha para Continuar
                            </h4>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Seu nome completo"
                                        className="w-full bg-background/50 border border-white/10 rounded-lg py-3 px-4 text-foreground focus:outline-none focus:border-primary/50"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Seu melhor e-mail"
                                        className="w-full bg-background/50 border border-white/10 rounded-lg py-3 px-4 text-foreground focus:outline-none focus:border-primary/50"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="whatsapp"
                                        placeholder="WhatsApp (ex: 11999999999)"
                                        className="w-full bg-background/50 border border-white/10 rounded-lg py-3 px-4 text-foreground focus:outline-none focus:border-primary/50"
                                        value={formData.whatsapp}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="document"
                                        placeholder="CPF / CNPJ"
                                        className="w-full bg-background/50 border border-white/10 rounded-lg py-3 px-4 text-foreground focus:outline-none focus:border-primary/50"
                                        value={formData.document}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    className="btn-primary-cta w-full py-4 mt-6 flex gap-2 justify-center items-center"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            IR PARA PAGAMENTO SEGURO
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </motion.button>
                            </form>
                            <p className="text-xs text-muted-foreground text-center mt-4 flex items-center justify-center gap-1">
                                Seus dados estão criptografados e seguros.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};
