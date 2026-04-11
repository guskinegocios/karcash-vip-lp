import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
    Car,
    CheckCircle2,
    Loader2,
    User,
    Mail,
    Phone,
    MessageSquare,
    Calendar as CalendarIcon,
    ArrowLeft,
    ArrowRight,
    Camera,
    Check,
    X,
    MapPin,
    Hash,
    Gauge,
    DollarSign,
    AlertCircle
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
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// --- SCHEMA ---
const sellerSchema = z.object({
    // Step 1: Vehicle
    carBrand: z.string().min(2, "Marca é obrigatória"),
    carModel: z.string().min(2, "Modelo é obrigatório"),
    carYear: z.string().min(4, "Ano é obrigatório"),
    carPlate: z.string().min(7, "Placa deve ter no mínimo 7 caracteres"),
    carKm: z.string().min(1, "Quilometragem é obrigatória"),
    carFipe: z.string().optional(),
    
    // Step 2: Condition (Checklist)
    works: z.boolean().default(false),
    gearsEngage: z.boolean().default(false),
    rolls: z.boolean().default(false),
    isPaidOff: z.boolean().default(false),
    hasDebts: z.boolean().default(false),
    
    // Step 3: Photos (Strings storing preview URLs or handle logic)
    photoFront: z.any().optional(),
    photoRear: z.any().optional(),
    photoLeft: z.any().optional(),
    photoRight: z.any().optional(),
    photoInterior: z.any().optional(),
    photoEngine: z.any().optional(),

    // Step 4: Personal
    name: z.string().min(2, "Nome é obrigatório"),
    whatsapp: z.string().min(10, "WhatsApp é obrigatório"),
    email: z.string().email("E-mail inválido"),
    location: z.string().min(5, "Localização é obrigatória"),
});

type SellerFormValues = z.infer<typeof sellerSchema>;

const STEPS = [
    { id: 1, title: "Veículo", icon: Car },
    { id: 2, title: "Estado", icon: AlertCircle },
    { id: 3, title: "Fotos", icon: Camera },
    { id: 4, title: "Contato", icon: User },
];

const SellCar = () => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [previews, setPreviews] = useState<Record<string, string>>({});

    const form = useForm<SellerFormValues>({
        resolver: zodResolver(sellerSchema),
        defaultValues: {
            carBrand: "", carModel: "", carYear: "", carPlate: "", carKm: "", carFipe: "",
            works: false, gearsEngage: false, rolls: false, isPaidOff: true, hasDebts: false,
            name: "", whatsapp: "", email: "", location: "",
        },
    });

    // Handle Image Preview
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => ({ ...prev, [fieldName]: reader.result as string }));
                form.setValue(fieldName as any, file);
            };
            reader.readAsDataURL(file);
        }
    };

    const nextStep = async () => {
        // Simple manual validation per step if needed
        const fields = getFieldsForStep(step);
        const isValid = await form.trigger(fields as any);
        if (isValid) setStep(prev => Math.min(prev + 1, 4));
    };

    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const getFieldsForStep = (currentStep: number) => {
        switch(currentStep) {
            case 1: return ["carBrand", "carModel", "carYear", "carPlate", "carKm"];
            case 2: return ["works", "gearsEngage", "rolls", "isPaidOff", "hasDebts"];
            case 3: return []; // Photos optional for now in trigger
            case 4: return ["name", "whatsapp", "email", "location"];
            default: return [];
        }
    };

    const onSubmit = async (data: SellerFormValues) => {
        setIsSubmitting(true);
        try {
            // 1. Insert Lead Data
            const { data: lead, error: leadError } = await supabase
                .from("seller_leads")
                .insert([{
                    name: data.name,
                    email: data.email,
                    whatsapp: data.whatsapp,
                    car_brand: data.carBrand,
                    car_model: data.carModel,
                    car_year: parseInt(data.carYear),
                    car_plate: data.carPlate,
                    car_km: data.carKm,
                    car_fipe: data.carFipe,
                    location: data.location,
                    works: data.works,
                    gears_engage: data.gearsEngage,
                    rolls: data.rolls,
                    is_paid_off: data.isPaidOff,
                    has_debts: data.hasDebts,
                    status: "pending"
                }])
                .select("id")
                .single();

            if (leadError) throw leadError;
            const leadId = lead.id;

            // 2. Define Photo Slots to Process
            const photoSlots = [
                { id: "photoFront", label: "Frente" },
                { id: "photoRear", label: "Traseira" },
                { id: "photoLeft", label: "Lateral Esquerda" },
                { id: "photoRight", label: "Lateral Direita" },
                { id: "photoInterior", label: "Interior" },
                { id: "photoEngine", label: "Motor" },
            ];

            // 3. Process Uploads
            const uploadPromises = photoSlots.map(async (slot) => {
                const file = (data as any)[slot.id];
                if (!file || !(file instanceof File)) return null;

                const fileExt = file.name.split('.').pop() || 'jpg';
                const fileName = `${slot.id}.${fileExt}`;
                const filePath = `${leadId}/${fileName}`;

                // Upload to Storage
                const { error: uploadError } = await supabase.storage
                    .from("seller-assets")
                    .upload(filePath, file);

                if (uploadError) {
                    console.warn(`Erro ao subir ${slot.id}:`, uploadError);
                    return null;
                }

                // Get Public URL
                const { data: { publicUrl } } = supabase.storage
                    .from("seller-assets")
                    .getPublicUrl(filePath);

                // Insert Link into Table
                const { error: linkError } = await supabase
                    .from("seller_lead_images")
                    .insert([{
                        lead_id: leadId,
                        url: publicUrl,
                        type: slot.id
                    }]);

                if (linkError) {
                    console.warn(`Erro ao linkar ${slot.id}:`, linkError);
                }

                return publicUrl;
            });

            // Wait for all uploads to finish/fail
            await Promise.all(uploadPromises);

            setIsSuccess(true);
            toast.success("Avaliação e fotos enviadas com sucesso!");
        } catch (error) {
            console.error("Error:", error);
            toast.error("Erro ao enviar. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-background">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full bg-card p-10 rounded-[2.5rem] border border-border shadow-elevated text-center space-y-6">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-12 h-12 text-primary" />
                    </div>
                    <h1 className="text-3xl font-display font-bold">Solicitação Enviada!</h1>
                    <p className="text-muted-foreground">Em até 24h nossa equipe entrará em contato com a proposta para o seu veículo.</p>
                    <Link to="/" className="block btn-primary-cta py-4">VOLTAR PARA A HOME</Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAF9] text-slate-900 pt-6 pb-12">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors group">
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-bold text-xs uppercase tracking-widest">Voltar</span>
                        </Link>
                        <div className="flex items-center gap-3">
                            {STEPS.map((s) => (
                                <div key={s.id} className={cn(
                                    "w-2.5 h-2.5 rounded-full transition-all duration-500",
                                    step >= s.id ? "bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]" : "bg-slate-200"
                                )} />
                            ))}
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-[320px_1fr] gap-8 items-start">
                        {/* Sidebar (Desktop Only) */}
                        <div className="hidden lg:block space-y-6 sticky top-24">
                            <div className="space-y-3">
                                <span className="inline-block px-3 py-1 text-[9px] font-black text-primary bg-primary/10 rounded-full border border-primary/20 uppercase tracking-[0.2em]">
                                    Avaliação VIP
                                </span>
                                <h1 className="text-3xl font-display font-bold leading-tight text-slate-950">
                                    Venda seu veículo pelo <span className="text-primary">valor justo.</span>
                                </h1>
                                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                                    Nosso processo transparente garante que você receba uma oferta real em menos de 24 horas.
                                </p>
                            </div>

                            <div className="space-y-4 p-6 bg-white border border-slate-300 rounded-[1.5rem] shadow-sm">
                                {STEPS.map((s) => (
                                    <div key={s.id} className={cn(
                                        "flex items-center gap-3 transition-all duration-300",
                                        step === s.id ? "opacity-100 translate-x-2" : "opacity-40"
                                    )}>
                                        <div className={cn(
                                            "w-9 h-9 rounded-lg flex items-center justify-center border",
                                            step === s.id ? "bg-primary/20 border-primary text-primary" : "bg-slate-50 border-slate-300"
                                        )}>
                                            <s.icon className="w-4 h-4" />
                                        </div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-950">{s.title}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Form Container */}
                        <div className="bg-white border border-slate-300 rounded-[2rem] p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden min-h-[550px] flex flex-col">
                            {/* Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none" />
                            
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="flex-grow flex flex-col">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={step}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex-grow"
                                        >
                                                        {/* STEP 1: VEHICLE INFO */}
                                            {step === 1 && (
                                                <div className="space-y-6">
                                                    <div>
                                                        <h2 className="text-2xl font-display font-bold mb-1 text-slate-950">Dados do Veículo</h2>
                                                        <p className="text-sm text-slate-700 font-medium">Conte-nos as informações básicas do seu carro.</p>
                                                    </div>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        <FormField control={form.control} name="carBrand" render={({ field }) => (
                                                            <FormItem className="space-y-1.5">
                                                                <FormLabel className="uppercase text-[9px] font-black tracking-widest text-slate-800">Marca</FormLabel>
                                                                <FormControl><div className="relative"><Car className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/><Input placeholder="Ex: Honda" className="pl-12 h-12 border-slate-300 text-slate-950 placeholder:text-slate-400" {...field} /></div></FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )} />
                                                        <FormField control={form.control} name="carModel" render={({ field }) => (
                                                            <FormItem className="space-y-1.5">
                                                                <FormLabel className="uppercase text-[9px] font-black tracking-widest text-slate-800">Modelo</FormLabel>
                                                                <FormControl><div className="relative"><Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/><Input placeholder="Ex: Civic" className="pl-12 h-12 border-slate-300 text-slate-950 placeholder:text-slate-400" {...field} /></div></FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )} />
                                                        <FormField control={form.control} name="carYear" render={({ field }) => (
                                                            <FormItem className="space-y-1.5">
                                                                <FormLabel className="uppercase text-[9px] font-black tracking-widest text-slate-800">Ano</FormLabel>
                                                                <FormControl><div className="relative"><CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/><Input placeholder="Ex: 2021" className="pl-12 h-12 border-slate-300 text-slate-950 placeholder:text-slate-400" {...field} /></div></FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )} />
                                                        <FormField control={form.control} name="carPlate" render={({ field }) => (
                                                            <FormItem className="space-y-1.5">
                                                                <FormLabel className="uppercase text-[9px] font-black tracking-widest text-slate-800">Placa</FormLabel>
                                                                <FormControl><div className="relative"><Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/><Input placeholder="AAA-0000" className="pl-12 h-12 border-slate-300 text-slate-950 placeholder:text-slate-400" {...field} /></div></FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )} />
                                                        <FormField control={form.control} name="carKm" render={({ field }) => (
                                                            <FormItem className="space-y-1.5">
                                                                <FormLabel className="uppercase text-[9px] font-black tracking-widest text-slate-800">KM Atual</FormLabel>
                                                                <FormControl><div className="relative"><Gauge className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/><Input placeholder="Ex: 45.000" className="pl-12 h-12 border-slate-300 text-slate-950 placeholder:text-slate-400" {...field} /></div></FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )} />
                                                        <FormField control={form.control} name="carFipe" render={({ field }) => (
                                                            <FormItem className="space-y-1.5">
                                                                <FormLabel className="uppercase text-[9px] font-black tracking-widest text-slate-800">Valor FIPE (Opcional)</FormLabel>
                                                                <FormControl><div className="relative"><DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/><Input placeholder="Ex: R$ 85.000" className="pl-12 h-12 border-slate-300 text-slate-950 placeholder:text-slate-400" {...field} /></div></FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )} />
                                                    </div>
                                                </div>
                                            )}

                                            {/* STEP 2: CONDITION */}
                                            {step === 2 && (
                                                <div className="space-y-6">
                                                    <div>
                                                        <h2 className="text-2xl font-display font-bold mb-1 text-slate-950">Estado Real</h2>
                                                        <p className="text-sm text-slate-700 font-medium">Responda rapidamente sobre a condição do carro.</p>
                                                    </div>
                                                    <div className="grid gap-3">
                                                        {[
                                                            { name: "works", label: "O motor funciona?" },
                                                            { name: "gearsEngage", label: "O câmbio engrena?" },
                                                            { name: "rolls", label: "O carro roda?" },
                                                            { name: "isPaidOff", label: "Está quitado?" },
                                                            { name: "hasDebts", label: "Possui débitos?" },
                                                        ].map((item) => (
                                                            <div key={item.name} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
                                                                <span className="font-bold text-sm text-slate-900">{item.label}</span>
                                                                <div className="flex gap-2">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => form.setValue(item.name as any, true)}
                                                                        className={cn(
                                                                            "px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-sm",
                                                                            form.watch(item.name as any) === true ? "bg-primary text-black" : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-300"
                                                                        )}
                                                                    >
                                                                        Sim
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => form.setValue(item.name as any, false)}
                                                                        className={cn(
                                                                            "px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-sm",
                                                                            form.watch(item.name as any) === false ? "bg-red-500 text-white" : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-300"
                                                                        )}
                                                                    >
                                                                        Não
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* STEP 3: PHOTOS */}
                                            {step === 3 && (
                                                <div className="space-y-6">
                                                    <div>
                                                        <h2 className="text-2xl font-display font-bold mb-1 text-slate-950">Fotos</h2>
                                                        <p className="text-sm text-slate-700 font-medium">6 visões essenciais para avaliação.</p>
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-3">
                                                        {[
                                                            { id: "photoFront", label: "Frente" },
                                                            { id: "photoLeft", label: "Lat Esq" },
                                                            { id: "photoRear", label: "Traseira" },
                                                            { id: "photoRight", label: "Lat Dir" },
                                                            { id: "photoInterior", label: "Painel" },
                                                            { id: "photoEngine", label: "Motor" },
                                                        ].map((slot) => (
                                                            <div key={slot.id} className="relative group aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-300 flex flex-col items-center justify-center gap-1.5 hover:border-primary/50 transition-all cursor-pointer shadow-sm">
                                                                {previews[slot.id] ? (
                                                                    <div className="absolute inset-0">
                                                                        <img src={previews[slot.id]} className="w-full h-full object-cover" alt={slot.label} />
                                                                        <button type="button" onClick={() => setPreviews(prev => ({ ...prev, [slot.id]: "" }))} className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-red-500"><X className="w-3 h-3" /></button>
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        <Camera className="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors" />
                                                                        <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">{slot.label}</span>
                                                                        <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, slot.id)} className="absolute inset-0 opacity-0 cursor-pointer" />
                                                                    </>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* STEP 4: CONTACT */}
                                            {step === 4 && (
                                                <div className="space-y-6">
                                                    <div>
                                                        <h2 className="text-2xl font-display font-bold mb-1 text-slate-950">Finalização</h2>
                                                        <p className="text-sm text-slate-700 font-medium">Onde enviamos sua proposta?</p>
                                                    </div>
                                                    <div className="grid gap-4">
                                                        <FormField control={form.control} name="name" render={({ field }) => (
                                                            <FormItem className="space-y-1.5">
                                                                <FormLabel className="uppercase text-[9px] font-black tracking-widest text-slate-800">Nome Completo</FormLabel>
                                                                <FormControl><div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/><Input placeholder="Seu nome" className="pl-12 h-12 border-slate-300 text-slate-950 placeholder:text-slate-400" {...field} /></div></FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )} />
                                                        <FormField control={form.control} name="whatsapp" render={({ field }) => (
                                                            <FormItem className="space-y-1.5">
                                                                <FormLabel className="uppercase text-[9px] font-black tracking-widest text-slate-800">WhatsApp</FormLabel>
                                                                <FormControl><div className="relative"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/><Input placeholder="(00) 00000-0000" className="pl-12 h-12 border-slate-300 text-slate-950 placeholder:text-slate-400" {...field} /></div></FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )} />
                                                        <FormField control={form.control} name="email" render={({ field }) => (
                                                            <FormItem className="space-y-1.5">
                                                                <FormLabel className="uppercase text-[9px] font-black tracking-widest text-slate-800">E-mail</FormLabel>
                                                                <FormControl><div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/><Input placeholder="seu@email.com" className="pl-12 h-12 border-slate-300 text-slate-950 placeholder:text-slate-400" {...field} /></div></FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )} />
                                                        <FormField control={form.control} name="location" render={({ field }) => (
                                                            <FormItem className="space-y-1.5">
                                                                <FormLabel className="uppercase text-[9px] font-black tracking-widest text-slate-800">Localização</FormLabel>
                                                                <FormControl><div className="relative"><MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/><Input placeholder="Ex: São Paulo, SP" className="pl-12 h-12 border-slate-300 text-slate-950 placeholder:text-slate-400" {...field} /></div></FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )} />
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Navigation */}
                                    <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            disabled={step === 1}
                                            className={cn(
                                                "px-8 py-4 text-xs font-black uppercase tracking-widest transition-all",
                                                step === 1 ? "opacity-0 pointer-events-none" : "text-slate-500 hover:text-primary"
                                            )}
                                        >
                                            Voltar
                                        </button>

                                        {step < 4 ? (
                                            <button
                                                type="button"
                                                onClick={nextStep}
                                                className="btn-primary-cta px-10 py-5 flex items-center gap-2 group"
                                            >
                                                Próximo Passo
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="btn-primary-cta px-10 py-5 bg-[#ff6b00] hover:bg-[#ff802b] border-none flex items-center gap-2"
                                            >
                                                {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Enviando...</> : "Finalizar Proposta"}
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellCar;
