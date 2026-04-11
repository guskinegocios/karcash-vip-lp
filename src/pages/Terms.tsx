import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
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
                        Termos de Uso
                    </h1>
                    <p className="text-[11px] text-slate-500 uppercase tracking-[0.2em] font-bold">
                        Vigência: {new Date().getFullYear()} • KarCash VIP Technology
                    </p>
                </div>

                {/* Content */}
                <div className="bg-white p-8 md:p-16 rounded-2xl shadow-sm border border-slate-100">
                    <div className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-headings:uppercase prose-headings:tracking-tight prose-p:text-slate-600 prose-li:text-slate-600">
                        
                        <div className="space-y-12">
                            <section>
                                <h3 className="text-2xl mb-4 border-l-4 border-primary pl-4">1. Definições e Aceitação</h3>
                                <p className="leading-relaxed">
                                    Estes Termos de Uso ("Termos") regem a relação entre você ("Usuário") e a plataforma <strong className="text-slate-900">KarCash</strong>. Ao acessar, adquirir membros VIP ou utilizar nossos serviços ("Serviços"), o Usuário declara ter lido, compreendido e aceito integralmente as cláusulas aqui dispostas.
                                </p>
                                <p className="mt-4 leading-relaxed">
                                    Caso não concorde com qualquer parte destes termos, o Usuário deve abster-se de utilizar a plataforma imediatamente.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-2xl mb-4 border-l-4 border-primary pl-4">2. Natureza dos Serviços (Curadoria)</h3>
                                <p className="leading-relaxed">
                                    O KarCash atua exclusivamente como uma <strong className="text-slate-900">plataforma de inteligência e curadoria de informações automotivas</strong>.
                                </p>
                                <ul className="list-disc pl-6 mt-4 mb-4 space-y-3">
                                    <li>Não somos proprietários dos veículos exibidos (salvo indicação expressa);</li>
                                    <li>Não atuamos como concessionária ou loja de revenda direta;</li>
                                    <li>Nosso serviço consiste em <strong className="text-slate-900">identificar, filtrar e apresentar</strong> oportunidades de mercado ("Lotes Invisíveis") para nossos membros.</li>
                                </ul>
                                <p className="leading-relaxed">
                                    A transação final de compra e venda do veículo ocorre diretamente entre o Usuário e o proprietário/vendedor do ativo, sem interferência financeira da KarCash sobre o valor do bem.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-2xl mb-4 border-l-4 border-primary pl-4">3. Acesso e Propriedade Intelectual</h3>
                                <p className="leading-relaxed">
                                    O acesso à área de membros ("VIP") é pessoal, intransferível e licenciado temporariamente.
                                </p>
                                <div className="mt-6">
                                    <strong className="text-slate-900">Proibições expressas:</strong>
                                    <ul className="list-disc pl-6 mt-4 space-y-3">
                                        <li>Compartilhar login e senha com terceiros (rateio);</li>
                                        <li>Reproduzir, distribuir ou comercializar os dados e relatórios fornecidos;</li>
                                        <li>Utilizar robôs, <em>scrapers</em> ou qualquer meio automatizado para extrair dados da plataforma.</li>
                                    </ul>
                                </div>
                                <p className="mt-6 text-sm text-slate-500 font-medium">
                                    A violação de direitos autorais sujeitará o infrator às sanções da Lei nº 9.610/98 e bloqueio imediato sem reembolso.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-2xl mb-4 border-l-4 border-primary pl-4">4. Isenção de Responsabilidade</h3>
                                <p className="leading-relaxed">
                                    Embora o KarCash utilize rigorosos critérios de seleção, a decisão final de compra é de responsabilidade exclusiva do Usuário.
                                </p>
                                <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 mt-6">
                                    <p className="font-black text-slate-900 uppercase tracking-widest mb-4 text-sm">A KarCash não se responsabiliza por:</p>
                                    <ul className="list-disc pl-4 space-y-3 text-slate-600 text-base">
                                        <li>Vícios ocultos mecânicos não detectáveis em análise documental;</li>
                                        <li>Alterações no estado do veículo após a data da nossa curadoria;</li>
                                        <li>Inadimplência ou desistência por parte do vendedor original.</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-2xl mb-4 border-l-4 border-primary pl-4">5. Política de Cancelamento</h3>
                                <p className="leading-relaxed">
                                    Em conformidade com o Art. 49 do CDC, o Usuário possui o prazo de 7 (sete) dias corridos para exercer o direito de arrependimento.
                                </p>

                                <div className="bg-red-50 border border-red-100 rounded-xl p-8 mt-6">
                                    <strong className="text-red-700 uppercase tracking-widest font-black text-sm flex items-center gap-2">
                                        ⚠️ Cláusula Anti-Abuso
                                    </strong>
                                    <p className="mt-3 text-red-900/80 font-medium leading-relaxed text-base">
                                        O download massivo ou consumo integral da base de dados no período de 7 dias, seguido de pedido de cancelamento, será interpretado como Abuso de Direito (Art. 187 CC). Nestas situações, reservamos o direito de contestar o reembolso.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-2xl mb-4 border-l-4 border-primary pl-4">6. Alterações e Foro</h3>
                                <p className="leading-relaxed">
                                    Fica eleito o foro da Comarca de São Paulo/SP para dirimir quaisquer dúvidas oriundas deste contrato.
                                </p>
                            </section>
                        </div>
                    </div>

                    {/* Footer Nav */}
                    <div className="mt-20 pt-8 border-t border-slate-200 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
                        <Link to="/privacidade" className="text-slate-500 hover:text-primary transition-all font-bold text-[10px] uppercase tracking-[0.2em]">
                            Política de Privacidade
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
