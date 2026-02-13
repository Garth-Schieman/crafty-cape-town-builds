import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, MessageCircle, Send, CheckCircle } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const text = `Hi Crafty Construction and Technical Services,%0A%0AMy name is ${encodeURIComponent(formData.name)}.%0APhone: ${encodeURIComponent(formData.phone)}%0AEmail: ${encodeURIComponent(formData.email)}%0AService: ${encodeURIComponent(formData.service)}%0ADetails: ${encodeURIComponent(formData.message)}`;

    setTimeout(() => {
      window.open(`https://wa.me/27601133986?text=${text}`, "_blank");
    }, 1500);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors";

  return (
    <section id="contact" className="section-padding bg-warm">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-3">Get In Touch</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Contact Us
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <CheckCircle className="h-16 w-16 text-primary mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Thank You!</h3>
                <p className="text-muted-foreground font-body">Your message has been received. Redirecting to WhatsApp...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className={inputClass}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className={inputClass}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className={inputClass}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <select
                  required
                  className={inputClass}
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option value="">Type of Service</option>
                  <option value="Construction">Construction Services</option>
                  <option value="Maintenance">Maintenance Services</option>
                  <option value="Rendering">Rendering Services</option>
                  <option value="Other">Other</option>
                </select>
                <textarea
                  placeholder="Project Details"
                  required
                  rows={4}
                  className={inputClass}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                <Button variant="hero" size="lg" className="w-full py-6 text-base gap-2">
                  <Send className="h-5 w-5" />
                  Send Message
                </Button>
              </form>
            )}
          </motion.div>

          {/* Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">Location</h3>
                  <p className="text-muted-foreground font-body">Cape Town, South Africa</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">Phone</h3>
                  <a href="tel:+27601133986" className="text-primary hover:underline font-body">060 113 3986</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">WhatsApp</h3>
                  <a
                    href="https://wa.me/27601133986"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-body"
                  >
                    060 113 3986
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden shadow-md border border-border h-64 lg:h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423830.37557812646!2d18.37610565!3d-33.914651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc500f8826eed7%3A0x687fe1fc2828aa87!2sCape%20Town%2C%20South%20Africa!5e0!3m2!1sen!2s!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Crafty Construction Location - Cape Town"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
