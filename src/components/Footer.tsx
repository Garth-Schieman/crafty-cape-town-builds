import { Phone, MessageCircle, MapPin } from "lucide-react";
import krayonIcon from "../assets/favicon.ico"; 

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-display text-xl font-bold mb-4">
              Crafty<span className="text-primary"> Construction</span>
            </h3>
            <p className="text-secondary-foreground/70 text-sm font-body leading-relaxed">
              Passionate, precise, and people-focused construction services in Cape Town.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About", "Services", "Gallery", "Contact"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm font-body">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {["Construction", "Maintenance", "Rendering", "Renovations"].map((s) => (
                <li key={s}>
                  <a href="#services" className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm font-body">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-secondary-foreground/70 text-sm font-body">Cape Town, South Africa</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="tel:+27601133986" className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm font-body">060 113 3986</a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="https://wa.me/27601133986" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm font-body">
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-foreground/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left space-y-1">
            <p className="text-secondary-foreground/50 text-sm font-body">
              © {new Date().getFullYear()} Crafty Construction and Technical Services.
            </p>
            <p className="text-secondary-foreground/50 text-xs font-body">
              Proudly Serving Cape Town 🇿🇦
            </p>
            {/* TERMS & CONDITIONS LINK */}
            <p>
              <a 
                href="/terms-and-conditions" 
                className="text-secondary-foreground/50 hover:text-primary text-xs font-body underline"
              >
                Terms & Conditions
              </a>
            </p>
          </div>

          {/* Krayon Digital Credit */}
          <a 
            href="https://krayon.co.za" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/5 hover:bg-black/10 transition-all border border-transparent hover:border-primary/20"
          >
            <span className="text-secondary-foreground/40 text-[10px] uppercase tracking-widest font-bold">
              Powered by
            </span>
            <div className="flex items-center gap-2">
              <img 
                src={krayonIcon} 
                alt="Krayon Digital" 
                className="h-5 w-5 rounded-sm opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" 
              />
              <span className="text-secondary-foreground/80 font-display font-bold text-sm tracking-tight group-hover:text-primary transition-colors">
                Krayon Digital
              </span>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
