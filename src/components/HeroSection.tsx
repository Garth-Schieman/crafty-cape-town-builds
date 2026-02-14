import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-construction.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with blur */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[4px] scale-105" // Added blur and scale
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 hero-gradient opacity-90" />

      <div className="relative z-10 container mx-auto px-4 text-center py-32">
        <p className="text-gold-light font-medium tracking-[0.25em] uppercase text-sm md:text-base mb-6 animate-fade-up opacity-0" style={{ animationDelay: "0.2s" }}>
          Cape Town's Trusted Builders
        </p>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-up opacity-0" style={{ animationDelay: "0.4s" }}>
          Building Your Vision with
          <br />
          <span className="text-gold">Precision & Passion</span>
        </h1>
        <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-body animate-fade-up opacity-0" style={{ animationDelay: "0.6s" }}>
          Reliable Construction, Maintenance & Rendering Services in Cape Town
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up opacity-0" style={{ animationDelay: "0.8s" }}>
          <a href="#contact">
            <Button variant="hero" size="lg" className="px-8 py-6 text-base">
              Get a Free Quote
            </Button>
          </a>
          <a
            href="https://wa.me/27601133986?text=Hi%20Crafty%20Construction%20and%20Technical%20Services%2C%20I%20would%20like%20a%20quote"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="whatsapp" size="lg" className="px-8 py-6 text-base gap-2">
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </Button>
          </a>
          <a href="tel:+27601133986" className="sm:hidden">
            <Button variant="hero-outline" size="lg" className="px-8 py-6 text-base gap-2">
              <Phone className="h-5 w-5" />
              Call Us
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-primary-foreground/60 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;