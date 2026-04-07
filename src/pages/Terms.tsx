import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
    return (
        <div className="min-h-screen bg-background text-foreground pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-6xl font-display font-black mb-4 uppercase tracking-tight text-foreground">
                        Termos de Uso
                    </h1>
                    <div className="h-1.5 w-24 bg-primary mx-auto rounded-full shadow-sm" />
                </div>

                <div className="card-premium shadow-2xl">
                    <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-headings:uppercase prose-headings:tracking-tight prose-p:text-muted-foreground prose-li:text-muted-foreground">
                        <p className="text-[10px] text-muted-foreground/60 mb-10 uppercase tracking-[0.3em] font-black border-b border-border pb-6">
                            Última atualização: {new Date().getFullYear()} • KarCash VIP Technology
                        </p>

                        <div className="space-y-8">
                            <section>
                                <h3 className="text-xl font-black mb-4">1. Definições e Aceitação</h3>
                                <p>
                                    Estes Termos de Uso ("Termos") regem a relação entre você ("Usuário") e a plataforma **KarCash**. Ao acessar, adquirir membros VIP ou utilizar nossos serviços ("Serviços"), o Usuário declara ter lido, compreendido e aceito integralmente as cláusulas aqui dispostas.
                                </p>
                                <p className="mt-2">
                                    Caso não concorde com qualquer parte destes termos, o Usuário deve abster-se de utilizar a plataforma imediatamente.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-black mb-4">2. Natureza dos Serviços (Curadoria)</h3>
                                <p>
                                    O KarCash atua exclusivamente como uma **plataforma de inteligência e curadoria de informações automotivas**.
                                </p>
                                <ul className="list-disc pl-4 mt-2 mb-2 space-y-1 text-base">
                                    <li>Não somos proprietários dos veículos exibidos (salvo indicação expressa);</li>
                                    <li>Não atuamos como concessionária ou loja de revenda direta;</li>
                                    <li>Nosso serviço consiste em **identificar, filtrar e apresentar** oportunidades de mercado ("Lotes Invisíveis") para nossos membros.</li>
                                </ul>
                                <p>
                                    A transação final de compra e venda do veículo ocorre diretamente entre o Usuário e o proprietário/vendedor do ativo, sem interferência financeira da KarCash sobre o valor do bem.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-black mb-4">3. Acesso e Propriedade Intelectual</h3>
                                <p>
                                    O acesso à área de membros ("VIP") é pessoal, intransferível e licenciado temporariamente.
                                </p>
                                <p className="mt-2 text-sm">
                                    <strong>Proibições expressas:</strong>
                                    <ul className="list-disc pl-4 mt-2 space-y-1 text-base">
                                        <li>Compartilhar login e senha com terceiros (rateio);</li>
                                        <li>Reproduzir, distribuir ou comercializar os dados e relatórios fornecidos;</li>
                                        <li>Utilizar robôs, <em>scrapers</em> ou qualquer meio automatizado para extrair dados da plataforma.</li>
                                    </ul>
                                </p>
                                <p className="mt-2">
                                    A violação de direitos autorais sujeitará o infrator às sanções da Lei nº 9.610/98 e bloqueio imediato sem reembolso.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-black mb-4">4. Isenção de Responsabilidade</h3>
                                <p>
                                    Embora o KarCash utilize rigorosos critérios de seleção, a decisão final de compra é de responsabilidade exclusiva do Usuário.
                                </p>
                                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 mt-4 text-sm">
                                    <p className="font-black text-primary uppercase tracking-widest mb-3">A KarCash não se responsabiliza por:</p>
                                    <ul className="list-disc pl-4 space-y-2 text-muted-foreground font-medium">
                                        <li>Vícios ocultos mecânicos não detectáveis em análise documental;</li>
                                        <li>Alterações no estado do veículo após a data da nossa curadoria;</li>
                                        <li>Inadimplência ou desistência por parte do vendedor original.</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-xl font-black mb-4">5. Política de Cancelamento</h3>
                                <p>
                                    Em conformidade com o Art. 49 do CDC, o Usuário possui o prazo de 7 (sete) dias corridos para exercer o direito de arrependimento.
                                </p>

                                <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6 mt-6 text-sm text-foreground">
                                    <strong className="text-red-600 uppercase tracking-widest font-black">⚠️ Cláusula Anti-Abuso:</strong>
                                    <p className="mt-3 text-muted-foreground font-medium">
                                        O download massivo ou consumo integral da base de dados no período de 7 dias, seguido de pedido de cancelamento, será interpretado como Abuso de Direito (Art. 187 CC). Nestas situações, reservamos o direito de contestar o reembolso.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-xl font-black mb-4">6. Alterações e Foro</h3>
                                <p>
                                    Fica eleito o foro da Comarca de São Paulo/SP para dirimir quaisquer dúvidas oriundas deste contrato.
                                </p>
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
                            <Link to="/privacidade" className="text-muted-foreground hover:text-primary transition-all font-black text-[10px] uppercase tracking-[0.2em]">
                                Política de Privacidade
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
