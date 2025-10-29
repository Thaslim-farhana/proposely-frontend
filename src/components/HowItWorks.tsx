import { FileEdit, Download, Send } from "lucide-react";

const steps = [
  {
    icon: FileEdit,
    number: "01",
    title: "Create",
    description: "Choose a template and fill in project details. Add line items, pricing, and terms.",
  },
  {
    icon: Download,
    number: "02",
    title: "Export",
    description: "Generate a beautiful PDF or create a secure shareable link with tracking.",
  },
  {
    icon: Send,
    number: "03",
    title: "Send",
    description: "Share the link or attach the PDF. Track views and close the deal with confidence.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">How it works</h2>
          <p className="text-xl text-muted-foreground">
            Three simple steps to professional proposals
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
              )}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg">
                  <step.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                <div className="text-sm font-bold text-primary">{step.number}</div>
                <h3 className="text-2xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;