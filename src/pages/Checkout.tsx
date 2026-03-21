import { motion } from "framer-motion";
import { Shield, Lock, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// import InputMask from "react-input-mask"; // Removido para evitar avisos de findDOMNode
// import { supabase } from "@/lib/supabaseClient"; // Removido: agora usamos o repository
import subscriptionRepository from "@/repositories/subscriptionRepository"; // Importa o repository
import { toast } from 'sonner'; // Importa o sistema de toasts
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import api from "@/services/api"; // Importa o serviço de API


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
});

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(false); // Estado de loading
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const { isValid } = form.formState;
  const navigate = useNavigate(); // Inicializa useNavigate

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
        email: values.email,
        phone: values.phone.replace(/\D/g, ''),
      });

      // 2. Dispara o E-mail de Teste via nossa API interna
      // Nota: Em ambiente local (Vite), isso pode falhar se não estiver usando o Vercel Dev,
      // mas deixamos pronto para o teste do Resend conforme solicitado.
      try {
        await fetch('/api/send-welcome-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            name: values.name,
            phone: values.phone
          }),
        });
      } catch (emailError) {
        console.warn('Aviso: Não foi possível disparar o e-mail localmente (esperado fora da Vercel).', emailError);
      }

      // 3. Vai direto para a tela de agradecimento (Pula o Guru)
      navigate('/obrigado');

    } catch (error) {
      console.error('Erro ao salvar no Supabase:', error);
      const errorMessage = (error as any).message || "Ocorreu um erro desconhecido.";

      let friendlyMessage = "Ocorreu um erro ao processar sua inscrição.";
      if (errorMessage.includes("unique_profile_email")) {
        navigate('/obrigado');
        return;
      }

      toast.error(friendlyMessage);
      setIsLoading(false);
    }
  }

  return (
    <div className="py-8 md:py-12">
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