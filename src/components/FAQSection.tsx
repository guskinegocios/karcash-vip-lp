import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Posso cancelar?",
    answer:
      "Sim! Sem burocracia. Você pode cancelar a qualquer momento. Não existe fidelidade ou multa.",
  },
  {
    question: "Preciso de CNPJ?",
    answer:
      "Não! Você pode adquirir os veículos como pessoa física. Nosso grupo é aberto tanto para investidores individuais quanto para revendedores.",
  },
  {
    question: "Como recebo o acesso?",
    answer:
      "Após a confirmação do pagamento, você receberá automaticamente o link de acesso ao nosso grupo exclusivo no WhatsApp.",
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
