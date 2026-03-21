import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "De onde vêm esses carros?",
    answer:
      "São mercadorias raras captadas diretamente, que não passaram por leilões públicos, garantindo exclusividade total e margem de revenda superior.",
  },
  {
    question: "O carro é fácil de vender?",
    answer:
      "Sim. Sem apontamentos na cautelar (leilão, sinistro ou média monta), a aceitação em lojistas e para clientes particulares é imediata e pelo valor cheio de mercado.",
  },
  {
    question: "Como garanto meu acesso?",
    answer:
      "Nossa oferta é limitada por dia para garantir a qualidade das oportunidades. O acesso é destinado a investidores e empreendedores que buscam escala no retorno sobre o capital.",
  },
];

export const FAQSection = () => {
  return (
    <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="border-border"
        >
          <AccordionTrigger className="text-left font-display font-bold text-foreground hover:text-primary transition-colors py-5">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
