import { Clock, Target, Lock, DollarSign } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Save time",
    description: "Create a complete proposal in under 10 minutes.",
  },
  {
    icon: Target,
    title: "Look professional",
    description: "Templates designed for freelancers & agencies.",
  },
  {
    icon: Lock,
    title: "Share securely",
    description: "Send view-only links with expiry and track views.",
  },
  {
    icon: DollarSign,
    title: "Get paid faster",
    description: "Send clear pricing and close deals with confidence.",
  },
];

const Benefits = () => {
  return (
    <section className="py-16 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why ProposalGenie?</h2>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;