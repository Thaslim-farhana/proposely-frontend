import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "I cut proposal time from 4 hours to 30 minutes. Clients love the clean PDFs.",
    author: "Priya S.",
    role: "Freelance WordPress Designer",
    rating: 5,
  },
  {
    quote: "The share link feature closed more deals than the PDFs ever did. Highly recommend.",
    author: "Ravi K.",
    role: "Digital Marketer",
    rating: 5,
  },
  {
    quote: "Finally a proposal tool that doesn't overcomplicate things. Worth every rupee.",
    author: "Amit P.",
    role: "SEO Consultant",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">Loved by freelancers</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of professionals who trust Proposely
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-lg mb-6 leading-relaxed">"{testimonial.quote}"</p>
              <div>
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;