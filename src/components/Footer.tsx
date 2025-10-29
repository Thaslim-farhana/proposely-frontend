import { FileText } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">ProposalGenie</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built for freelancers who want to look professional — faster.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#templates" className="hover:text-primary transition-colors">Templates</a></li>
              <li><a href="#demo" className="hover:text-primary transition-colors">Demo</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#blog" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#careers" className="hover:text-primary transition-colors">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#help" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#privacy" className="hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#terms" className="hover:text-primary transition-colors">Terms</a></li>
              <li><a href="mailto:partnerships@proposalgenie.com" className="hover:text-primary transition-colors">Enterprise</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 ProposalGenie. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;