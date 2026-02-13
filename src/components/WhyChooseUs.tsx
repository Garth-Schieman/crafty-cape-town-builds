import { motion } from "framer-motion";
import { CheckCircle, Clock, DollarSign, Users, Heart, MapPin } from "lucide-react";

const reasons = [
  { icon: CheckCircle, title: "Quality Workmanship", desc: "Meticulous attention to detail on every project" },
  { icon: Clock, title: "Reliable & On-Time", desc: "We respect your time and deliver as promised" },
  { icon: DollarSign, title: "Affordable & Transparent", desc: "Honest pricing with no hidden costs" },
  { icon: Users, title: "Skilled & Dedicated Team", desc: "Experienced professionals who take pride in their craft" },
  { icon: Heart, title: "Customer-Focused", desc: "Your satisfaction is our top priority" },
  { icon: MapPin, title: "Cape Town Local", desc: "Proudly serving the Cape Town community" },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="section-padding bg-warm-alt">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-3">Why Us</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Why Choose Crafty Construction
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <reason.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">{reason.title}</h3>
                <p className="text-muted-foreground text-sm font-body">{reason.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
