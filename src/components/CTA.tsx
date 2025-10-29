import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-background"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container relative mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Ready to get started?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create your first professional proposal in minutes. Join 2,500+ freelancers who trust ProposalGenie.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="group">
              Start Free — Create Account
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              See Pricing
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            No credit card required • 20 free proposals • Upgrade anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;