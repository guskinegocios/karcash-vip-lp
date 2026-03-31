import { motion } from "framer-motion";
import { Check, ArrowLeft, Send } from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useScrollIntoView } from "@/hooks/useScrollIntoView";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import subscriptionRepository from "@/repositories/subscriptionRepository";

const VipProfile = () => {
  const formContainerRef = useRef<HTMLDivElement>(null);
  useScrollIntoView(formContainerRef);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const email = searchParams.get("email") || "";
  const name = searchParams.get("name") || "";

  const [formData, setFormData] = useState({
    age_range: "",
    region: "",
    income_level: "",
    experience_level: "",
    main_fear: "",
    main_interest: "",
  });

  const states = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", 
    "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  const handleSelect = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("E-mail não encontrado. Por favor, acesse pelo link enviado.");
      return;
    }

    // Validação básica
    const isMissingFields = Object.values(formData).some(val => !val);
    if (isMissingFields) {
        toast.error("Por favor, responda todas as perguntas.");
        return;
    }

    setIsSubmitting(true);
    try {
      await subscriptionRepository.updateProfileVip(email, formData);
      setIsCompleted(true);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar perfil. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-card p-10 rounded-3xl border border-primary/20 text-center shadow-2xl"
        >
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="text-primary w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold mb-4">OBRIGADO!</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            Seu perfil foi atualizado. Agora nossa equipe tem os melhores dados para te ajudar a lucrar no mercado VIP.
          </p>
          <Button asChild className="w-full h-14 text-lg font-bold rounded-2xl">
            <Link to="/">VOLTAR PARA O SITE</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center py-8 md:py-16 px-4" ref={formContainerRef}>
      {/* Google Form Style Container */}
      <div className="max-w-2xl w-full">
        {/* Top Header Link */}
        <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors bg-card/30 py-1.5 px-4 rounded-full border border-border">
                <ArrowLeft className="w-3 h-3 mr-2" />
                Voltar para KarCash VIP
            </Link>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Main Title Block */}
          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm relative text-left">
            <div className="h-1.5 w-full bg-primary" />
            <div className="p-5">
                <h1 className="text-xl font-bold text-foreground mb-1.5">Perfil VIP KarCash</h1>
                <p className="text-muted-foreground text-xs leading-relaxed">
                    Olá {name.split(' ')[0] || 'VIP'}, nos ajude a entender seu perfil para entregarmos as melhores oportunidades.
                </p>
            </div>
          </div>

          {/* Question 1: Region */}
          <div className="bg-card p-5 rounded-xl border border-border shadow-sm text-left">
            <h3 className="text-sm font-bold mb-3 flex items-start gap-2.5">
                <span className="text-primary font-mono opacity-50 text-xs">01.</span>
                Qual o seu Estado de residência?
            </h3>
            <select 
              className="w-full bg-background border border-border rounded-lg p-2.5 outline-none focus:border-primary transition-all appearance-none cursor-pointer text-xs"
              value={formData.region}
              onChange={(e) => handleSelect("region", e.target.value)}
              required
            >
              <option value="">Selecione o Estado</option>
              {states.map(uf => <option key={uf} value={uf}>{uf}</option>)}
            </select>
          </div>

          {/* Question 2: Age */}
          <div className="bg-card p-5 rounded-xl border border-border shadow-sm text-left">
            <h3 className="text-sm font-bold mb-3 flex items-start gap-2.5">
                <span className="text-primary font-mono opacity-50 text-xs">02.</span>
                Qual sua faixa etária?
            </h3>
            <div className="space-y-1.5">
              {["18-24", "25-34", "35-44", "45-54", "55+"].map(range => (
                <label 
                    key={range} 
                    className={`flex items-center p-2.5 rounded-lg border cursor-pointer transition-all ${
                        formData.age_range === range ? 'border-primary bg-primary/5' : 'border-transparent bg-background/50 hover:bg-background'
                    }`}
                >
                    <input 
                        type="radio" 
                        name="age_range"
                        className="w-3.5 h-3.5 accent-primary mr-2.5"
                        checked={formData.age_range === range}
                        onChange={() => handleSelect("age_range", range)}
                    />
                    <span className="text-xs text-foreground font-medium">{range} anos</span>
                </label>
              ))}
            </div>
          </div>

          {/* Question 3: Income */}
          <div className="bg-card p-5 rounded-xl border border-border shadow-sm text-left">
            <h3 className="text-sm font-bold mb-3 flex items-start gap-2.5">
                <span className="text-primary font-mono opacity-50 text-xs">03.</span>
                Qual sua faixa de renda mensal bruta?
            </h3>
            <div className="space-y-1.5">
              {["Até R$ 5 mil", "R$ 5 mil a R$ 10 mil", "R$ 10 mil a R$ 20 mil", "Acima de R$ 20 mil"].map(level => (
                <label 
                    key={level} 
                    className={`flex items-center p-2.5 rounded-lg border cursor-pointer transition-all ${
                        formData.income_level === level ? 'border-primary bg-primary/5' : 'border-transparent bg-background/50 hover:bg-background'
                    }`}
                >
                    <input 
                        type="radio" 
                        name="income_level"
                        className="w-3.5 h-3.5 accent-primary mr-2.5"
                        checked={formData.income_level === level}
                        onChange={() => handleSelect("income_level", level)}
                    />
                    <span className="text-xs text-foreground font-medium">{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Question 4: Experience */}
          <div className="bg-card p-5 rounded-xl border border-border shadow-sm text-left">
            <h3 className="text-sm font-bold mb-3 flex items-start gap-2.5">
                <span className="text-primary font-mono opacity-50 text-xs">04.</span>
                Qual seu nível de experiência com revenda?
            </h3>
            <div className="space-y-1.5">
              {["Profissional (Vivo disso)", "Intermediário (Já fiz algumas vezes)", "Iniciante (Estou descobrindo agora)"].map(exp => (
                <label 
                    key={exp} 
                    className={`flex items-center p-2.5 rounded-lg border cursor-pointer transition-all ${
                        formData.experience_level === exp ? 'border-primary bg-primary/5' : 'border-transparent bg-background/50 hover:bg-background'
                    }`}
                >
                    <input 
                        type="radio" 
                        name="experience_level"
                        className="w-3.5 h-3.5 accent-primary mr-2.5"
                        checked={formData.experience_level === exp}
                        onChange={() => handleSelect("experience_level", exp)}
                    />
                    <span className="text-xs text-foreground font-medium">{exp}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Question 5: Fear */}
          <div className="bg-card p-5 rounded-xl border border-border shadow-sm text-left">
            <h3 className="text-sm font-bold mb-3 flex items-start gap-2.5">
                <span className="text-primary font-mono opacity-50 text-xs">05.</span>
                Qual seu MAIOR medo ao comprar um veículo de leilão?
            </h3>
            <div className="space-y-1.5">
              {[
                  "Veículo com 'Sinistro' ou 'Leilão' no laudo", 
                  "Ter um prejuízo inesperado na reforma", 
                  "O carro demorar muito para vender", 
                  "Burocracia lenta com documentos"
              ].map(fear => (
                <label 
                    key={fear} 
                    className={`flex items-center p-2.5 rounded-lg border cursor-pointer transition-all ${
                        formData.main_fear === fear ? 'border-primary bg-primary/5' : 'border-transparent bg-background/50 hover:bg-background'
                    }`}
                >
                    <input 
                        type="radio" 
                        name="main_fear"
                        className="w-3.5 h-3.5 accent-primary mr-2.5"
                        checked={formData.main_fear === fear}
                        onChange={() => handleSelect("main_fear", fear)}
                    />
                    <span className="text-xs text-foreground font-medium">{fear}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Final Button Block */}
          <div className="py-6 text-center">
            <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full max-w-sm h-12 text-base font-bold rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
                {isSubmitting ? "ENVIANDO..." : "ENVIAR MINHAS RESPOSTAS"}
                {!isSubmitting && <Send className="ml-2 w-4 h-4" />}
            </Button>
            <p className="mt-4 text-[9px] text-muted-foreground opacity-50 uppercase tracking-tight">
                KarCash VIP • Tecnologia de Qualificação Automotiva
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VipProfile;
