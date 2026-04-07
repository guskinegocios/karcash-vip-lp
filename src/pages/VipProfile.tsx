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
          className="max-w-md w-full card-premium text-center shadow-2xl"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Check className="text-primary w-10 h-10" />
          </div>
          <h2 className="text-2xl font-display font-black mb-4 uppercase tracking-tight">Qualificação Concluída!</h2>
          <p className="text-muted-foreground mb-10 font-medium leading-relaxed">
            Seu perfil foi atualizado. Agora nossa inteligência tem os melhores dados para te enviar as oportunidades mais lucrativas do mercado VIP.
          </p>
          <Button asChild variant="default" className="w-full h-14 text-lg font-bold rounded-2xl transition-all hover:scale-[1.02]">
            <Link to="/">VOLTAR PARA O SITE</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-8 pb-[40vh] md:py-16 md:pb-16 px-4" ref={formContainerRef}>
      {/* Google Form Style Container */}
      <div className="max-w-2xl w-full">
        {/* Top Header Link */}
        <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground hover:text-primary transition-colors bg-white py-2 px-5 rounded-full border border-border shadow-sm">
                <ArrowLeft className="w-3 h-3 mr-2" />
                Voltar para KarCash VIP
            </Link>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Title Block */}
          <div className="card-elevated border-border shadow-md overflow-hidden relative text-left p-0">
            <div className="h-2 w-full bg-primary" />
            <div className="p-8">
                <h1 className="text-3xl font-display font-black text-foreground mb-4 uppercase tracking-tight">Personalização VIP</h1>
                <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                    Olá {name.split(' ')[0] || 'VIP'}, qualifique seu perfil para receber as oportunidades mais adequadas ao seu capital e região.
                </p>
            </div>
          </div>

          {/* Question 1: Region */}
          <div className="bg-card p-8 rounded-3xl border border-border shadow-md text-left transition-all hover:shadow-lg">
            <h3 className="text-base font-black text-foreground mb-6 flex items-start gap-3 uppercase tracking-tight">
                <span className="text-primary font-mono opacity-40 text-sm">01.</span>
                Qual o seu Estado de residência?
            </h3>
            <div className="relative">
                <select 
                className="w-full bg-input/50 border border-border rounded-xl p-4 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer text-sm font-bold text-foreground"
                value={formData.region}
                onChange={(e) => handleSelect("region", e.target.value)}
                required
                >
                <option value="">Selecione o Estado</option>
                {states.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                    <Check className="w-4 h-4 rotate-90" />
                </div>
            </div>
          </div>

          {/* Question 2: Age */}
          <div className="bg-card p-8 rounded-3xl border border-border shadow-md text-left transition-all hover:shadow-lg">
            <h3 className="text-base font-black text-foreground mb-6 flex items-start gap-3 uppercase tracking-tight">
                <span className="text-primary font-mono opacity-40 text-sm">02.</span>
                Qual sua faixa etária?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["18-24", "25-34", "35-44", "45-54", "55+"].map(range => (
                <label 
                    key={range} 
                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.age_range === range ? 'border-primary bg-primary/5 shadow-inner' : 'border-border/40 bg-input/20 hover:border-border hover:bg-input/40'
                    }`}
                >
                    <input 
                        type="radio" 
                        name="age_range"
                        className="w-4 h-4 accent-primary mr-3"
                        checked={formData.age_range === range}
                        onChange={() => handleSelect("age_range", range)}
                    />
                    <span className={`text-sm font-bold ${formData.age_range === range ? 'text-primary' : 'text-foreground'}`}>{range} anos</span>
                </label>
              ))}
            </div>
          </div>

          {/* Question 3: Income */}
          <div className="bg-card p-8 rounded-3xl border border-border shadow-md text-left transition-all hover:shadow-lg">
            <h3 className="text-base font-black text-foreground mb-6 flex items-start gap-3 uppercase tracking-tight">
                <span className="text-primary font-mono opacity-40 text-sm">03.</span>
                Qual sua faixa de renda mensal?
            </h3>
            <div className="space-y-3">
              {["Até R$ 5 mil", "R$ 5 mil a R$ 10 mil", "R$ 10 mil a R$ 20 mil", "Acima de R$ 20 mil"].map(level => (
                <label 
                    key={level} 
                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.income_level === level ? 'border-primary bg-primary/5 shadow-inner' : 'border-border/40 bg-input/20 hover:border-border hover:bg-input/40'
                    }`}
                >
                    <input 
                        type="radio" 
                        name="income_level"
                        className="w-4 h-4 accent-primary mr-3"
                        checked={formData.income_level === level}
                        onChange={() => handleSelect("income_level", level)}
                    />
                    <span className={`text-sm font-bold ${formData.income_level === level ? 'text-primary' : 'text-foreground'}`}>{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Question 4: Experience */}
          <div className="bg-card p-8 rounded-3xl border border-border shadow-md text-left transition-all hover:shadow-lg">
            <h3 className="text-base font-black text-foreground mb-6 flex items-start gap-3 uppercase tracking-tight">
                <span className="text-primary font-mono opacity-40 text-sm">04.</span>
                Qual seu nível de experiência?
            </h3>
            <div className="space-y-3">
              {["Profissional (Vivo disso)", "Intermediário (Já fiz algumas vezes)", "Iniciante (Estou descobrindo agora)"].map(exp => (
                <label 
                    key={exp} 
                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.experience_level === exp ? 'border-primary bg-primary/5 shadow-inner' : 'border-border/40 bg-input/20 hover:border-border hover:bg-input/40'
                    }`}
                >
                    <input 
                        type="radio" 
                        name="experience_level"
                        className="w-4 h-4 accent-primary mr-3"
                        checked={formData.experience_level === exp}
                        onChange={() => handleSelect("experience_level", exp)}
                    />
                    <span className={`text-sm font-bold ${formData.experience_level === exp ? 'text-primary' : 'text-foreground'}`}>{exp}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Question 5: Fear */}
          <div className="bg-card p-8 rounded-3xl border border-border shadow-md text-left transition-all hover:shadow-lg">
            <h3 className="text-base font-black text-foreground mb-6 flex items-start gap-3 uppercase tracking-tight">
                <span className="text-primary font-mono opacity-40 text-sm">05.</span>
                Qual seu MAIOR medo ao comprar?
            </h3>
            <div className="space-y-3">
              {[
                  "Veículo com 'Sinistro' ou 'Leilão'", 
                  "Prejuízo inesperado na reforma", 
                  "O carro demorar muito para vender", 
                  "Burocracia lenta com documentos"
              ].map(fear => (
                <label 
                    key={fear} 
                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.main_fear === fear ? 'border-primary bg-primary/5 shadow-inner' : 'border-border/40 bg-input/20 hover:border-border hover:bg-input/40'
                    }`}
                >
                    <input 
                        type="radio" 
                        name="main_fear"
                        className="w-4 h-4 accent-primary mr-3"
                        checked={formData.main_fear === fear}
                        onChange={() => handleSelect("main_fear", fear)}
                    />
                    <span className={`text-sm font-bold ${formData.main_fear === fear ? 'text-primary' : 'text-foreground'}`}>{fear}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Final Button Block */}
          <div className="py-12 text-center">
            <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full max-w-sm h-16 text-lg font-black uppercase tracking-widest rounded-[1.5rem] shadow-2xl shadow-primary/20 hover:scale-[1.03] active:scale-95 transition-all"
            >
                {isSubmitting ? "ENVIANDO..." : "QUALIFICAR MEU PERFIL"}
                {!isSubmitting && <Send className="ml-2 w-5 h-5" />}
            </Button>
            <p className="mt-8 text-[10px] text-muted-foreground opacity-30 font-black uppercase tracking-[0.3em]">
                KarCash VIP • Inteligência de Mercado Automotivo
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VipProfile;
