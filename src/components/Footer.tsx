import { Phone, MessageCircle, MapPin } from "lucide-react";

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

        <div className="border-t border-secondary-foreground/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-secondary-foreground/50 text-sm font-body">
            © {new Date().getFullYear()} Crafty Construction and Technical Services. All rights reserved.
          </p>
          <p className="text-secondary-foreground/50 text-sm font-body">
            Proudly Serving Cape Town 🇿🇦
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
