import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-20 pb-24">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Header Legal Document */}
                <div className="mb-16 border-b border-slate-200 pb-10 pt-10">
                    <Link
                        to="/"
                        className="text-slate-400 hover:text-primary transition-all font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 group mb-8 w-fit"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Voltar ao Início
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight text-slate-900">
                        Privacidade
                    </h1>
                    <p className="text-[11px] text-slate-500 uppercase tracking-[0.2em] font-bold">
                        Vigência: {new Date().getFullYear()} • KarCash VIP Technology
                    </p>
                </div>

                {/* Content */}
                <div className="bg-white p-8 md:p-16 rounded-2xl shadow-sm border border-slate-100">
                    <div className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-headings:uppercase prose-headings:tracking-tight prose-p:text-slate-600 prose-li:text-slate-600">
                        
                        <p className="lead text-xl text-slate-900 font-bold mb-10 leading-relaxed uppercase tracking-tight">
                            Sua privacidade é inegociável. Esta política detalha como o ecossistema KarCash protege sua integridade digital.
                        </p>

                        <div className="space-y-12">
                            <section>
                                <h3 className="text-2xl mb-4 border-l-4 border-primary pl-4">1. Informações que Coletamos</h3>
                                <p className="leading-relaxed">Solicitamos informações pessoais, como nome, e-mail e telefone, apenas quando realmente precisamos delas para lhe fornecer um serviço (como o acesso à lista VIP). Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento.</p>
                            </section>

                            <section>
                                <h3 className="text-2xl mb-4 border-l-4 border-primary pl-4">2. Uso de Dados</h3>
                                <p className="leading-relaxed">Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</p>
                            </section>

                            <section>
                                <h3 className="text-2xl mb-4 border-l-4 border-primary pl-4">3. Compartilhamento de Dados</h3>
                                <p className="leading-relaxed">Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</p>
                            </section>

                            <section>
                                <h3 className="text-2xl mb-4 border-l-4 border-primary pl-4">4. Cookies</h3>
                                <p className="leading-relaxed">O KarCash utiliza cookies para melhorar a experiência do usuário. Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.</p>
                            </section>

                            <section>
                                <h3 className="text-2xl mb-4 border-l-4 border-primary pl-4">5. Compromisso do Usuário</h3>
                                <p className="leading-relaxed">O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o KarCash oferece no site e com caráter enunciativo, mas não limitativo:</p>
                                <ul className="list-disc pl-6 mt-4 space-y-3">
                                    <li>Não se envolver em atividades que sejam ilegais ou contrárias à boa fé e à ordem pública;</li>
                                    <li>Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, ou apostas online, pornografia, de apologia ao terrorismo ou contra os direitos humanos.</li>
                                </ul>
                            </section>
                        </div>
                    </div>

                    {/* Footer Nav */}
                    <div className="mt-20 pt-8 border-t border-slate-200 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
                        <Link to="/termos" className="text-slate-500 hover:text-primary transition-all font-bold text-[10px] uppercase tracking-[0.2em]">
                            Termos de Uso
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
