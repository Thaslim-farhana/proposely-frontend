import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is Basic really free?",
    answer: "Yes — Basic is free forever for up to 20 proposals. No credit card required. Start creating professional proposals today at zero cost.",
  },
  {
    question: "Can I upgrade later?",
    answer: "Absolutely. You can upgrade to Pro or Agency anytime — your proposals and settings stay intact. Downgrading is just as easy.",
  },
  {
    question: "Do you support custom branding and team accounts?",
    answer: "Yes — Pro includes custom branding (logo, colors, contact info). Agency adds multi-seat team access and white-label PDFs for client-facing work.",
  },
  {
    question: "How do share links work?",
    answer: "Each shared proposal gets a secure, unique URL. You can set an expiry date, track when clients view it, and control access. No login required for clients.",
  },
  {
    question: "What payment methods do you support?",
    answer: "We support all major payment methods via Razorpay including credit/debit cards, UPI, net banking, and popular wallets for paid plans.",
  },
  {
    question: "Can I export proposals to PDF?",
    answer: "Yes! All plans include unlimited PDF exports. Your PDFs are professionally formatted, print-ready, and look great on any device.",
  },
];

const FAQ = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">Frequently asked questions</h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about Proposely
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;