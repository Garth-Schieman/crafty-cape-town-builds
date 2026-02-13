import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 gold-gradient opacity-95" />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
          Let's Build Something Great Together
        </h2>
        <p className="text-primary-foreground/80 text-lg mb-10 max-w-xl mx-auto font-body">
          Ready to start your project? Get in touch with our team today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="tel:+27601133986">
            <Button variant="hero-outline" size="lg" className="px-8 py-6 text-base gap-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              <Phone className="h-5 w-5" />
              Call Now
            </Button>
          </a>
          <a
            href="https://wa.me/27601133986"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="whatsapp" size="lg" className="px-8 py-6 text-base gap-2">
              <MessageCircle className="h-5 w-5" />
              WhatsApp Us
            </Button>
          </a>
          <a href="#contact">
            <Button variant="hero-outline" size="lg" className="px-8 py-6 text-base border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              Request a Quote
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
