import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
    return (
        <div className="min-h-screen bg-background text-foreground pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-6xl font-display font-black mb-4 uppercase tracking-tight text-foreground">
                        Privacidade
                    </h1>
                    <div className="h-1.5 w-24 bg-primary mx-auto rounded-full shadow-sm" />
                </div>

                <div className="card-premium shadow-2xl">
                    <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-headings:uppercase prose-headings:tracking-tight prose-p:text-muted-foreground prose-li:text-muted-foreground">
                        <p className="lead text-xl text-foreground font-bold mb-10 leading-relaxed uppercase tracking-tight">
                            Sua privacidade é inegociável. Esta política detalha como o ecossistema KarCash protege sua integridade digital.
                        </p>

                        <div className="space-y-8">
                            <section>
                                <h3 className="text-xl font-black mb-4">1. Informações que Coletamos</h3>
                                <p>Solicitamos informações pessoais, como nome, e-mail e telefone, apenas quando realmente precisamos delas para lhe fornecer um serviço (como o acesso à lista VIP). Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento.</p>
                            </section>

                            <section>
                                <h3 className="text-xl font-black mb-4">2. Uso de Dados</h3>
                                <p>Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</p>
                            </section>

                            <section>
                                <h3 className="text-xl font-black mb-4">3. Compartilhamento de Dados</h3>
                                <p>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</p>
                            </section>

                            <section>
                                <h3 className="text-xl font-black mb-4">4. Cookies</h3>
                                <p>O KarCash utiliza cookies para melhorar a experiência do usuário. Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.</p>
                            </section>

                            <section>
                                <h3 className="text-xl font-black mb-4">5. Compromisso do Usuário</h3>
                                <p>O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o KarCash oferece no site e com caráter enunciativo, mas não limitativo:</p>
                                <ul className="list-disc pl-5 mt-4 space-y-2">
                                    <li>Não se envolver em atividades que sejam ilegais ou contrárias à boa fé e à ordem pública;</li>
                                    <li>Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, ou apostas online, pornografia, de apologia ao terrorismo ou contra os direitos humanos.</li>
                                </ul>
                            </section>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-border">
                        <Link
                            to="/"
                            className="text-muted-foreground hover:text-primary transition-all font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Voltar ao Início
                        </Link>

                        <div className="flex gap-8">
                            <Link to="/termos" className="text-muted-foreground hover:text-primary transition-all font-black text-[10px] uppercase tracking-[0.2em]">
                                Termos de Uso
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
