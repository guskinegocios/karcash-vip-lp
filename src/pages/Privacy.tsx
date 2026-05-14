import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";

const Privacy = () => {
    return (
        <div className="min-h-screen bg-background pt-20 pb-24 text-white">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Header Legal Document */}
                <div className="mb-16 border-b border-white/5 pb-10 pt-10 relative">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none opacity-50" />
                    
                    <Link
                        to="/"
                        className="text-white/30 hover:text-primary transition-all font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 group mb-8 w-fit"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Voltar ao Início
                    </Link>

                    <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter text-white italic">
                        Política de <span className="text-primary">Privacidade</span>
                    </h1>
                    <p className="text-[11px] text-white/20 uppercase tracking-[0.2em] font-black">
                        Vigência: {new Date().getFullYear()} • KarCash VIP Technology
                    </p>
                </div>

                {/* Content */}
                <div className="bg-card p-8 md:p-16 rounded-[2.5rem] shadow-2xl border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-full bg-primary/2 blur-[120px] pointer-events-none opacity-20" />
                    
                    <div className="relative z-10 max-w-none">
                        
                        <p className="text-xl text-white font-black mb-12 leading-tight uppercase tracking-tight italic">
                            Sua privacidade é <span className="text-primary">inegociável.</span> <br />
                            <span className="text-white/40 text-sm font-medium normal-case tracking-normal">Esta política detalha como o ecossistema KarCash protege sua integridade digital.</span>
                        </p>

                        <div className="space-y-12">
                            <section>
                                <h3 className="text-2xl font-black mb-6 border-l-4 border-primary pl-4 text-white uppercase italic tracking-tight">1. Informações que Coletamos</h3>
                                <p className="leading-relaxed text-white/60 font-medium text-lg">Solicitamos informações pessoais, como nome, e-mail e telefone, apenas quando realmente precisamos delas para lhe fornecer um serviço (como o acesso à lista VIP). Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento.</p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-black mb-6 border-l-4 border-primary pl-4 text-white uppercase italic tracking-tight">2. Uso de Dados</h3>
                                <p className="leading-relaxed text-white/60 font-medium text-lg">Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-black mb-6 border-l-4 border-primary pl-4 text-white uppercase italic tracking-tight">3. Compartilhamento de Dados</h3>
                                <p className="leading-relaxed text-white/60 font-medium text-lg">Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-black mb-6 border-l-4 border-primary pl-4 text-white uppercase italic tracking-tight">4. Cookies</h3>
                                <p className="leading-relaxed text-white/60 font-medium text-lg">O KarCash utiliza cookies para melhorar a experiência do usuário. Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.</p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-black mb-6 border-l-4 border-primary pl-4 text-white uppercase italic tracking-tight">5. Compromisso do Usuário</h3>
                                <p className="leading-relaxed text-white/60 font-medium text-lg">O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o KarCash oferece no site e com caráter enunciativo, mas não limitativo:</p>
                                <ul className="list-disc pl-6 mt-6 space-y-4 text-white/60 font-medium text-lg">
                                    <li>Não se envolver em atividades que sejam ilegais ou contrárias à boa fé e à ordem pública;</li>
                                    <li>Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, ou apostas online, pornografia, de apologia ao terrorismo ou contra os direitos humanos.</li>
                                </ul>
                            </section>
                        </div>
                    </div>

                    {/* Footer Nav */}
                    <div className="mt-20 pt-10 border-t border-white/5 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                        <Link to="/termos" className="text-white/30 hover:text-primary transition-all font-black text-[10px] uppercase tracking-[0.2em]">
                            Termos de Uso
                        </Link>
                        <p className="text-[9px] text-white/10 font-black uppercase tracking-widest flex items-center gap-2 justify-center">
                            <Shield className="w-3 h-3" />
                            Ambiente 100% Seguro & Criptografado
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
