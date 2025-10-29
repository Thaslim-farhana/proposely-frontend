import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    subtitle: "Free",
    price: "₹0",
    period: "forever",
    description: "Solo freelancers starting out",
    features: [
      "Create up to 20 proposals",
      "PDF export",
      "Share links",
      "3 templates included",
      "Email support",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    subtitle: "Most Popular",
    price: "₹999",
    period: "month",
    description: "Growing freelancers",
    features: [
      "Unlimited proposals",
      "Custom branding & logo",
      "Proposal analytics",
      "All templates included",
      "Priority email support",
      "14-day free trial",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Agency",
    subtitle: "For Teams",
    price: "₹1,999",
    period: "month",
    description: "Teams & agencies",
    features: [
      "Everything in Pro",
      "Multi-seat access",
      "White-label PDFs",
      "Team templates",
      "Dedicated onboarding",
      "Priority support",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">Pick what fits you</h2>
          <p className="text-xl text-muted-foreground">
            Start free, upgrade when you're ready. All paid plans include a 14-day free trial.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border ${
                plan.popular
                  ? "border-primary bg-card shadow-xl scale-105"
                  : "border-border bg-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold">
                  {plan.subtitle}
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                {!plan.popular && (
                  <p className="text-sm text-muted-foreground mb-4">{plan.subtitle}</p>
                )}
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/ {plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;