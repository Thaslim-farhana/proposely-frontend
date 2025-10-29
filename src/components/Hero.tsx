import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-background pt-20 pb-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container relative mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Start free — no credit card required</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Professional Client Proposals,{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Fast
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg">
              Create beautiful, on-brand proposals in minutes. Export clean PDFs, share secure links, and close more deals — without the design stress.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="group">
                Start Free
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background"></div>
                  <div className="w-8 h-8 rounded-full bg-accent/20 border-2 border-background"></div>
                  <div className="w-8 h-8 rounded-full bg-primary/30 border-2 border-background"></div>
                </div>
                <span>2,500+ freelancers</span>
              </div>
              <div>⚡ 10 min avg. creation time</div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
            <img 
              src={heroImage} 
              alt="ProposalGenie workspace showing professional proposal creation" 
              className="relative rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;