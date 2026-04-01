import { motion } from "framer-motion";
import { Shield, Lock, Check, Instagram } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// import InputMask from "react-input-mask"; // Removido para evitar avisos de findDOMNode
// import { supabase } from "@/lib/supabaseClient"; // Removido: agora usamos o repository
import subscriptionRepository from "@/repositories/subscriptionRepository"; // Importa o repository
import { toast } from 'sonner'; // Importa o sistema de toasts
import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // Importa hooks do router
import { useScrollIntoView } from "@/hooks/useScrollIntoView"; // UX de Scroll Mobile
import api from "@/services/api"; // Importa o serviço de API
import { trackMetaEvent } from "@/utils/track";


import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Schema de validação com Zod
const formSchema = z.object({
  name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  phone: z.string().refine((val) => val.replace(/\D/g, '').length >= 10, {
    message: "O telefone deve ter pelo menos 10 dígitos.",
  }),
  instagram: z.string().min(3, { message: "O @ deve ter pelo menos 3 caracteres." }).optional().or(z.literal("")),
});

const Checkout = () => {
  const formContainerRef = useRef<HTMLDivElement>(null);
  useScrollIntoView(formContainerRef);

  const [isLoading, setIsLoading] = useState(false); // Estado de loading
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      instagram: "",
    },
  });

  const { isValid } = form.formState;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Captura as UTMs da URL ou do localStorage (persistência)
  const getUtms = () => {
    // 1. Tenta pegar da URL primeiro (mais recente)
    const urlUtms = {
      utm_source: searchParams.get("utm_source"),
      utm_medium: searchParams.get("utm_medium"),
      utm_campaign: searchParams.get("utm_campaign"),
      utm_content: searchParams.get("utm_content"),
      utm_term: searchParams.get("utm_term"),
    };

    if (urlUtms.utm_source) return { ...urlUtms, referrer: document.referrer || "" };

    // 2. Se não tiver na URL, tenta pegar do localStorage
    try {
      const savedUtms = localStorage.getItem("karcash_utms");
      if (savedUtms) {
        const parsed = JSON.parse(savedUtms);
        // Opcional: Validar se as UTMs não são muito antigas (ex: > 30 dias)
        return {
          utm_source: parsed.utm_source || "",
          utm_medium: parsed.utm_medium || "",
          utm_campaign: parsed.utm_campaign || "",
          utm_content: parsed.utm_content || "",
          utm_term: parsed.utm_term || "",
          referrer: document.referrer || ""
        };
      }
    } catch (e) {
      console.warn("Erro ao ler UTMs do localStorage", e);
    }

    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
      referrer: document.referrer || ""
    };
  };

  const utms = getUtms();

  const formatPhone = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 3) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
    }
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    toast.info("Processando sua inscrição...");

    try {
      // 1. Salva no Supabase (Status Pendente)
      await subscriptionRepository.createSubscription({
        name: values.name,
        email: values.email.toLowerCase(),
        phone: values.phone.replace(/\D/g, ''),
        instagram: values.instagram,
        ...utms
      });

      // 1.5 Dispara o rastreamento do Facebook para InitiateCheckout
      trackMetaEvent({
        eventName: 'InitiateCheckout',
        userData: { email: values.email, phone: values.phone }
      });

      // 3. Salva dados temporários para a página de sucesso (auto-preenchimento do perfil)
      localStorage.setItem('karcash_last_buyer', JSON.stringify({
        name: values.name,
        email: values.email
      }));

      // 4. Redireciona para o checkout do Cakto com autopreenchimento
      const baseUrl = import.meta.env.VITE_CAKTO_CHECKOUT_URL;
      
      if (baseUrl) {
        // Constrói a URL final com parâmetros para autopreenchimento e UTMs
        const checkoutUrl = new URL(baseUrl);
        
        // Dados do cliente para o Cakto
        checkoutUrl.searchParams.set("name", values.name);
        checkoutUrl.searchParams.set("email", values.email);
        checkoutUrl.searchParams.set("phone", values.phone.replace(/\D/g, ''));
        
        // Repassa as UTMs capturadas para o gateway
        if (utms.utm_source) checkoutUrl.searchParams.set("utm_source", utms.utm_source);
        if (utms.utm_medium) checkoutUrl.searchParams.set("utm_medium", utms.utm_medium);
        if (utms.utm_campaign) checkoutUrl.searchParams.set("utm_campaign", utms.utm_campaign);
        if (utms.utm_content) checkoutUrl.searchParams.set("utm_content", utms.utm_content);
        if (utms.utm_term) checkoutUrl.searchParams.set("utm_term", utms.utm_term);
        
        window.location.href = checkoutUrl.toString();
      } else {
        // Fallback caso a URL não esteja configurada
        navigate('/congratulations');
      }

    } catch (error) {
      console.error('Erro ao salvar no Supabase:', error);
      const errorMessage = (error as any).message || "Ocorreu um erro desconhecido.";

      let friendlyMessage = "Ocorreu um erro ao processar sua inscrição.";
      if (errorMessage.includes("unique_profile_email")) {
        navigate('/congratulations');
        return;
      }

      toast.error(friendlyMessage);
      setIsLoading(false);
    }
  }

  return (
    <div className="pt-8 pb-[40vh] md:py-12 md:pb-12" ref={formContainerRef}>
      <div className="container mx-auto px-4 max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Order Summary */}
          <div className="card-elevated mb-8">
            <h2 className="font-display font-bold text-lg text-foreground mb-4">
              Resumo do Pedido
            </h2>

            <div className="flex items-center justify-between py-4 border-b border-border">
              <div>
                <p className="font-medium text-foreground">Assinatura Mensal VIP</p>
                <p className="text-sm text-muted-foreground">Acesso ao grupo exclusivo</p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground line-through text-sm">R$ 499,94</p>
                <p className="font-display font-bold text-xl text-primary">R$ 49,94</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <span className="font-medium text-foreground">Total:</span>
              <span className="font-display font-bold text-2xl text-foreground">R$ 49,94</span>
            </div>

            <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-primary font-medium text-center">
                🔥 Você está economizando R$ 450,00 (90% OFF)
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="card-elevated">
            <h2 className="font-display font-bold text-lg text-foreground mb-6">
              Seus Dados
            </h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground mb-2 block">Nome Completo</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Seu nome completo"
                          {...field}
                          className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground mb-2 block">E-mail</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="seu@email.com"
                          {...field}
                          className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground mb-2 block">WhatsApp (com DDD)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          placeholder="(00) 00000-0000"
                          onChange={(e) => {
                            const formatted = formatPhone(e.target.value);
                            field.onChange(formatted);
                          }}
                          className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground mb-2 block">Instagram (@usuario)</FormLabel>
                      <FormControl>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
                            <Input
                                placeholder="usuario"
                                {...field}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/^@/, '');
                                    field.onChange(val);
                                }}
                                className="bg-input border-border text-foreground placeholder:text-muted-foreground pl-7 focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                disabled={isLoading}
                            />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <motion.div
                  initial={false}
                  animate={isValid ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <Button
                    type="submit"
                    className={`w-full py-4 h-auto rounded-xl font-display font-bold text-lg transition-all ${isValid && !isLoading
                      ? "btn-primary-cta"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                      }`}
                    disabled={!isValid || isLoading}
                  >
                    {isLoading ? "SALVANDO..." : "GARANTIR MEU ACESSO VIP"}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>Dados Protegidos</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              <span>SSL Seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-primary" />
              <span>PCI Compliant</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;