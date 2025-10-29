import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 w-full border-b border-border bg-background/80 backdrop-blur-lg z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">ProposalGenie</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">
              FAQ
            </a>
            <a href="#demo" className="text-sm font-medium hover:text-primary transition-colors">
              Demo
            </a>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Button>Start Free</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;