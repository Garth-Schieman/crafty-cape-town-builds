import { motion } from "framer-motion";
import { Shield, Award, Heart } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-warm">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-3">About Us</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              About Crafty Construction and Technical Services
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6 font-body">
              Crafty Construction and Technical Services is a Cape Town-based construction and maintenance company dedicated to delivering quality workmanship, reliable service, and long-lasting results. We pride ourselves on precision, professionalism, and building strong relationships with our clients.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed font-body">
              Even as a growing company, we approach every project with excellence, attention to detail, and passion for craftsmanship.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {[
              { icon: Shield, title: "Trusted", desc: "Professional, transparent, and reliable at every stage" },
              { icon: Award, title: "Quality", desc: "Uncompromising standards in every detail of our work" },
              { icon: Heart, title: "Passionate", desc: "We truly love what we do and it shows in results" },
            ].map((item, i) => (
              <div key={i} className="bg-card rounded-xl p-6 text-center shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm font-body">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
