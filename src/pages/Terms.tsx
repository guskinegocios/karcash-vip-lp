import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
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
                        Termos de <span className="text-primary">Uso</span>
                    </h1>
                    <p className="text-[11px] text-white/20 uppercase tracking-[0.2em] font-black">
                        Vigência: {new Date().getFullYear()} • KarCash VIP Technology
                    </p>
                </div>

                {/* Content */}
                <div className="bg-card p-8 md:p-16 rounded-[2.5rem] shadow-2xl border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-full bg-primary/2 blur-[120px] pointer-events-none opacity-20" />
                    
                    <div className="relative z-10 max-w-none">
                        
                        <div className="space-y-12">
                            <section>
                                <h3 className="text-2xl font-black mb-6 border-l-4 border-primary pl-4 text-white uppercase italic tracking-tight">1. Definições e Aceitação</h3>
                                <p className="leading-relaxed text-white/60 font-medium text-lg">
                                    Estes Termos de Uso ("Termos") regem a relação entre você ("Usuário") e a plataforma <strong className="text-white font-black">KarCash</strong>. Ao acessar, adquirir membros VIP ou utilizar nossos serviços ("Serviços"), o Usuário declara ter lido, compreendido e aceito integralmente as cláusulas aqui dispostas.
                                </p>
                                <p className="mt-4 leading-relaxed text-white/60 font-medium text-lg">
                                    Caso não concorde com qualquer parte destes termos, o Usuário deve abster-se de utilizar a plataforma imediatamente.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-black mb-6 border-l-4 border-primary pl-4 text-white uppercase italic tracking-tight">2. Natureza dos Serviços (Curadoria)</h3>
                                <p className="leading-relaxed text-white/60 font-medium text-lg">
                                    O KarCash atua exclusivamente como uma <strong className="text-white font-black">plataforma de inteligência e curadoria de informações automotivas</strong>.
                                </p>
                                <ul className="list-disc pl-6 mt-6 mb-6 space-y-4 text-white/60 font-medium text-lg">
                                    <li>Não somos proprietários dos veículos exibidos (salvo indicação expressa);</li>
                                    <li>Não atuamos como concessionária ou loja de revenda direta;</li>
                                    <li>Nosso serviço consiste em <strong className="text-white font-black uppercase tracking-tight">identificar, filtrar e apresentar</strong> oportunidades de mercado ("Lotes Invisíveis") para nossos membros.</li>
                                </ul>
                                <p className="leading-relaxed text-white/60 font-medium text-lg">
                                    A transação final de compra e venda do veículo ocorre diretamente entre o Usuário e o proprietário/vendedor do ativo, sem interferência financeira da KarCash sobre o valor do bem.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-black mb-6 border-l-4 border-primary pl-4 text-white uppercase italic tracking-tight">3. Acesso e Propriedade Intelectual</h3>
                                <p className="leading-relaxed text-white/60 font-medium text-lg">
                                    O acesso à área de membros ("VIP") é pessoal, intransferível e licenciado temporariamente.
                                </p>
                                <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl">
                                    <strong className="text-white font-black uppercase tracking-widest text-sm block mb-4">Proibições expressas:</strong>
                                    <ul className="list-disc pl-6 space-y-3 text-white/60 font-medium">
                                        <li>Compartilhar login e senha com terceiros (rateio);</li>
                                        <li>Reproduzir, distribuir ou comercializar os dados e relatórios fornecidos;</li>
                                        <li>Utilizar robôs, <em>scrapers</em> ou qualquer meio automatizado para extrair dados da plataforma.</li>
                                    </ul>
                                </div>
                                <p className="mt-6 text-xs text-white/20 font-black uppercase tracking-widest leading-relaxed">
                                    A violação de direitos autorais sujeitará o infrator às sanções da Lei nº 9.610/98 e bloqueio imediato sem reembolso.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-black mb-6 border-l-4 border-primary pl-4 text-white uppercase italic tracking-tight">4. Isenção de Responsabilidade</h3>
                                <p className="leading-relaxed text-white/60 font-medium text-lg">
                                    Embora o KarCash utilize rigorosos critérios de seleção, a decisão final de compra é de responsabilidade exclusiva do Usuário.
                                </p>
                                <div className="bg-white/5 p-8 rounded-2xl border border-white/10 mt-8">
                                    <p className="font-black text-white uppercase tracking-widest mb-6 text-xs">A KarCash não se responsabiliza por:</p>
                                    <ul className="list-disc pl-6 space-y-4 text-white/60 font-medium">
                                        <li>Vícios ocultos mecânicos não detectáveis em análise documental;</li>
                                        <li>Alterações no estado do veículo após a data da nossa curadoria;</li>
                                        <li>Inadimplência ou desistência por parte do vendedor original.</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-2xl font-black mb-6 border-l-4 border-primary pl-4 text-white uppercase italic tracking-tight">5. Política de Cancelamento</h3>
                                <p className="leading-relaxed text-white/60 font-medium text-lg">
                                    Em conformidade com o Art. 49 do CDC, o Usuário possui o prazo de 7 (sete) dias corridos para exercer o direito de arrependimento.
                                </p>

                                <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-8 mt-8">
                                    <strong className="text-destructive uppercase tracking-widest font-black text-xs flex items-center gap-2 mb-4">
                                        ⚠️ Cláusula Anti-Abuso
                                    </strong>
                                    <p className="text-white/70 font-medium leading-relaxed">
                                        O download massivo ou consumo integral da base de dados no período de 7 dias, seguido de pedido de cancelamento, será interpretado como Abuso de Direito (Art. 187 CC). Nestas situações, reservamos o direito de contestar o reembolso.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-2xl font-black mb-6 border-l-4 border-primary pl-4 text-white uppercase italic tracking-tight">6. Alterações e Foro</h3>
                                <p className="leading-relaxed text-white/60 font-medium text-lg">
                                    Fica eleito o foro da Comarca de São Paulo/SP para dirimir quaisquer dúvidas oriundas deste contrato.
                                </p>
                            </section>
                        </div>
                    </div>

                    {/* Footer Nav */}
                    <div className="mt-20 pt-10 border-t border-white/5 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                        <Link to="/privacidade" className="text-white/30 hover:text-primary transition-all font-black text-[10px] uppercase tracking-[0.2em]">
                            Política de Privacidade
                        </Link>
                        <p className="text-[9px] text-white/10 font-black uppercase tracking-widest">© {new Date().getFullYear()} KarCash VIP • Todos os direitos reservados</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
