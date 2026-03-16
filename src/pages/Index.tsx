import { HeroSection } from "@/components/HeroSection";
import { TrustBar } from "@/components/TrustBar";
import { ShowcaseSection } from "@/components/ShowcaseSection";
import { Journey } from "@/components/Journey";
import { SocialProofSection } from "@/components/SocialProofSection";
import { CheckoutOfferSection } from "@/components/CheckoutOfferSection";
import { SellerLead } from "@/components/SellerLead";
import { SellerLeadModal } from "@/components/SellerLeadModal";
import { FAQSection } from "@/components/FAQSection";
import { ScrollReveal } from "@/components/ScrollReveal";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SellerLeadModal />

      {/* 1. Hero Section (O Gatilho) */}
      <HeroSection />

      {/* 2. Trust Bar (Quebra de Objeção) */}
      <TrustBar />

      {/* 3. Vitrine de Desejo (Showcase) */}
      <ShowcaseSection />

      {/* 4. How It Works (Educação) */}
      <Journey />

      {/* 5. Prova Social & Autoridade */}
      <SocialProofSection />

      {/* 6. Checkout / Oferta Irresistível */}
      <CheckoutOfferSection />

      {/* Meta Secundária: Seller Lead */}
      <SellerLead />

      {/* 7. FAQ (O Fechamento) */}
      <section className="py-20 bg-background" id="faq">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4 uppercase">
                AINDA TEM DÚVIDAS? <span className="text-primary">A GENTE RESPONDE!</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <FAQSection />
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
};

export default Index;
