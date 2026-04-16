import { HeroSection } from "@/components/HeroSection";
import { AuthorityBar } from "@/components/AuthorityBar";
import { ManifestoSection } from "@/components/ManifestoSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { PainSection } from "@/components/PainSection";
import { SolutionSection } from "@/components/SolutionSection";
import { ScarcitySection } from "@/components/ScarcitySection";
import { SellerSection } from "@/components/SellerSection";
import { FAQSection } from "@/components/FAQSection";
import { FinalCTA } from "@/components/FinalCTA";
import { VIPOpportunityModal } from "@/components/VIPOpportunityModal";
import { VIPSidebarWidget } from "@/components/VIPSidebarWidget";
import { useState, useEffect } from "react";
import { trackMetaEvent } from "@/utils/track";
import { AdsShowcaseSection } from "@/components/AdsShowcaseSection";
import { ScrollReveal } from "@/components/ScrollReveal";

const Index = () => {
  const [isVIPModalOpen, setIsVIPModalOpen] = useState(false);

  useEffect(() => {
    // Alvo focado na Landing Page principal
    trackMetaEvent({ eventName: 'ViewContent' });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-background font-inter">
      <VIPSidebarWidget isOpen={isVIPModalOpen} onClick={() => setIsVIPModalOpen(true)} />
      <VIPOpportunityModal isOpen={isVIPModalOpen} setIsOpen={setIsVIPModalOpen} />

      {/* 1. HERO SECTION (High Impact) */}
      <HeroSection />

      {/* 2. BARRA DE AUTORIDADE */}
      <AuthorityBar />

      {/* 2.2 MANIFESTO DE AUTORIDADE */}
      <ManifestoSection />

      {/* 2.1 SHOWCASE DE ANÚNCIOS (Margens Reais) - Desktop */}
      <div className="hidden lg:block">
        <AdsShowcaseSection />
      </div>

      {/* 2.5 PROVA SOCIAL / NÚMEROS (Social Proof) */}
      <SocialProofSection />

      {/* 3. SEÇÃO DE DOR (O Problema) */}
      <PainSection />

      {/* 4. SEÇÃO DE SOLUÇÃO (Oceano Azul) */}
      <SolutionSection />

      {/* 5. SEÇÃO DE ESCASSEZ (Bloco de Destaque) */}
      <ScarcitySection />

      {/* 5.1 SEÇÃO DE COMPRA DE VEÍCULOS (Público Vendedor) */}
      <SellerSection />

      {/* 6. FAQ ESTRATÉGICO */}
      <section className="py-[120px] bg-background" id="faq">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-foreground mb-4">
                AINDA TEM DÚVIDAS? <span className="text-primary italic">A GENTE RESPONDE.</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <FAQSection />
          </ScrollReveal>
        </div>
      </section>

      {/* 7. FECHAMENTO (CTA FINAL) */}
      <FinalCTA />

    </div>
  );
};

export default Index;
