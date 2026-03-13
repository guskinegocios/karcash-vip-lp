import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import {
    Car,
    CheckCircle2,
    Loader2,
    User,
    Mail,
    Phone,
    MessageSquare,
    Calendar as CalendarIcon,
    ArrowLeft
} from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Link } from "react-router-dom";

const sellerSchema = z.object({
    name: z.string().min(2, "Nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    whatsapp: z.string().min(10, "WhatsApp inválido"),
    carModel: z.string().min(2, "Modelo do carro é obrigatório"),
    carYear: z.string().min(4, "Ano inválido"),
    description: z.string().min(10, "Conte-nos um pouco mais sobre o estado do carro"),
});

type SellerFormValues = z.infer<typeof sellerSchema>;

const SellCar = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submittedData, setSubmittedData] = useState<SellerFormValues | null>(null);

    const form = useForm<SellerFormValues>({
        resolver: zodResolver(sellerSchema),
        defaultValues: {
            name: "",
            email: "",
            whatsapp: "",
            carModel: "",
            carYear: "",
            description: "",
        },
    });

    const onSubmit = async (data: SellerFormValues) => {
        setIsSubmitting(true);
        try {
            const { error } = await supabase
                .from("seller_leads")
                .insert([
                    {
                        name: data.name,
                        email: data.email,
                        whatsapp: data.whatsapp,
                        car_model: data.carModel,
                        car_year: parseInt(data.carYear), // Converte para INTEGER conforme o novo SQL
                        description: data.description,
                        status: "pending"
                    }
                ]);

            if (error) throw error;

            // Envia e-mail de notificação
            try {
                await fetch('/api/send-welcome-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: data.email,
                        name: data.name,
                        phone: data.whatsapp,
                        type: 'oferta_venda',
                        carDetails: {
                            model: data.carModel,
                            year: data.carYear,
                            description: data.description
                        }
                    }),
                });
            } catch (emailError) {
                console.warn('Erro ao enviar e-mail de notificação:', emailError);
            }

            setSubmittedData(data);
            setIsSuccess(true);
            toast.success("Proposta enviada com sucesso!");
        } catch (error) {
            console.error("Error saving lead:", error);
            toast.error("Erro ao enviar proposta. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess && submittedData) {
        const whatsappMessage = encodeURIComponent(
            `Olá KarCash! Gostaria de uma avaliação prioritária para o meu veículo:\n\n` +
            `*Nome:* ${submittedData.name}\n` +
            `*Carro:* ${submittedData.carModel} ${submittedData.carYear}\n` +
            `*WhatsApp:* ${submittedData.whatsapp}\n` +
            `*Descrição:* ${submittedData.description}`
        );

        const whatsappNumber = "5511999999999"; // TODO: Substituir pelo número real da KarCash

        return (
            <div className="min-h-[60vh] flex items-center justify-center container mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-card border border-primary/20 rounded-3xl p-10 text-center space-y-6 shadow-2xl shadow-primary/5"
                >
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-12 h-12 text-primary" />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-foreground">Proposta Enviada!</h1>
                    <p className="text-muted-foreground text-lg">
                        Recebemos seus dados em nosso sistema. Deseja acelerar sua avaliação falando agora com um especialista?
                    </p>

                    <div className="space-y-3">
                        <a
                            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary-cta w-full py-4 flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] border-none"
                        >
                            <MessageSquare className="w-5 h-5" />
                            FALAR NO WHATSAPP AGORA
                        </a>

                        <Link to="/" className="block">
                            <button className="w-full py-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                VOLTAR PARA A HOME
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-4">
                <ScrollReveal>
                    <div className="max-w-5xl mx-auto">
                        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Voltar para o site
                        </Link>

                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            {/* Left Side: Info */}
                            <div className="space-y-8">
                                <div>
                                    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold text-primary bg-primary/10 rounded-full border border-primary/20 uppercase tracking-widest">
                                        💰 Compramos à Vista
                                    </span>
                                    <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight mb-6">
                                        Sua venda é nossa <span className="text-primary">prioridade.</span>
                                    </h1>
                                    <p className="text-muted-foreground text-lg leading-relaxed">
                                        Não perca tempo com anúncios particulares ou propostas indecentes de concessionárias.
                                        Na KarCash, avaliamos seu veículo avariado de forma justa e honesta.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        "Avaliação profissional em tempo recorde",
                                        "Pagamento à vista na aprovação",
                                        "Retirada do veículo por nossa conta",
                                        "Rede de investidores pronta para comprar"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                                                <CheckCircle2 className="w-4 h-4 text-primary" />
                                            </div>
                                            <span className="text-foreground font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-6 bg-card/30 border border-white/5 rounded-2xl">
                                    <p className="text-sm text-muted-foreground italic">
                                        "Vendi meu carro batido em menos de 48h. Recebi o valor justo e o processo foi extremamente transparente."
                                    </p>
                                    <div className="mt-4 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center">
                                            <User className="w-5 h-5 text-primary/40" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-foreground">Marcelo S.</p>
                                            <p className="text-[10px] text-muted-foreground italic">Vendeu um Civic 2021</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Form */}
                            <div className="bg-card border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                                {/* Decorative elements */}
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 blur-[60px] rounded-full group-hover:bg-primary/10 transition-colors" />

                                <h2 className="text-2xl font-display font-bold text-foreground mb-8">Informações do Veículo</h2>

                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Nome Completo</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                                <Input placeholder="Seu nome" className="bg-background/50 pl-10 border-white/10" {...field} />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="whatsapp"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">WhatsApp</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                                <Input placeholder="(00) 00000-0000" className="bg-background/50 pl-10 border-white/10" {...field} />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">E-mail para Contato</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                            <Input placeholder="seu@email.com" className="bg-background/50 pl-10 border-white/10" {...field} />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="carModel"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Modelo do Carro</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                                <Input placeholder="Ex: Onix, Corolla..." className="bg-background/50 pl-10 border-white/10" {...field} />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="carYear"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Ano</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                                <Input placeholder="Ex: 2020" className="bg-background/50 pl-10 border-white/10" {...field} />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Descrição das Avarias</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                                            <Textarea
                                                                placeholder="Conte-nos o estado atual do veículo..."
                                                                className="bg-background/50 pl-10 min-h-[120px] border-white/10 resize-none pt-2"
                                                                {...field}
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full btn-primary-cta py-4 text-lg flex items-center justify-center gap-3"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    ENVIANDO...
                                                </>
                                            ) : (
                                                "QUERO RECEBER MINHA OFERTA"
                                            )}
                                        </button>

                                        <p className="text-[10px] text-muted-foreground text-center uppercase tracking-widest">
                                            🔒 Seus dados estão protegidos pela LGPD
                                        </p>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
};

export default SellCar;
