import { motion } from "framer-motion";
import { Building2, Wrench, PaintBucket, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Building2,
    title: "Construction Services",
    items: ["Residential construction", "Small commercial builds", "Renovations & alterations", "Structural improvements"],
  },
  {
    icon: Wrench,
    title: "Maintenance Services",
    items: ["General property maintenance", "Repairs & upgrades", "Preventative maintenance", "On-site technical services"],
  },
  {
    icon: PaintBucket,
    title: "Rendering Services",
    items: ["Wall rendering", "Plaster finishes", "Smooth & textured coatings", "Exterior finishing solutions"],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-3">What We Do</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Our Services
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group bg-card rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 gold-gradient rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-4">{service.title}</h3>
              <ul className="space-y-3 mb-8">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground font-body">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/27601133986?text=Hi%20Crafty%20Construction%20and%20Technical%20Services%2C%20I%20would%20like%20a%20quote"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  Request Quote
                </Button>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
