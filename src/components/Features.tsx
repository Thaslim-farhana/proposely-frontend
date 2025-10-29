import { Zap, FileText, Link2, Palette, BarChart3, Shield } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast proposal builder",
    description: "Fill fields, add line items, choose a template. Create complete proposals in under 10 minutes.",
  },
  {
    icon: FileText,
    title: "PDF export & download",
    description: "Print-ready PDFs that look great on every device. Professional formatting guaranteed.",
  },
  {
    icon: Link2,
    title: "Shareable public links",
    description: "Send a single link; clients can view without logging in. Track views and engagement.",
  },
  {
    icon: Palette,
    title: "Company branding",
    description: "Add your logo, colors, and contact info. Make every proposal uniquely yours.",
  },
  {
    icon: BarChart3,
    title: "Proposal analytics",
    description: "See who opened your proposal and when. Know exactly where deals stand.",
  },
  {
    icon: Shield,
    title: "Safe & reliable",
    description: "Automatic backups and secure storage. Your proposals are always protected.",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything freelancers <span className="text-primary">actually use</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            No fluff, no complexity. Just the features that help you close deals faster.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-card border border-border hover:shadow-lg hover:border-primary/50 transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;