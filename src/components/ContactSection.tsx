import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, MessageCircle, Send, CheckCircle } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const [builderItems, setBuilderItems] = useState<
    { name: string; size: number; rate: number }[]
  >([]);

  const services = [
  { name: "Excavations", rate: 220, unit: "m³" },
  { name: "Concrete – Footings", rate: 1650, unit: "m³" },
  { name: "Concrete – Slab", rate: 1650, unit: "m³" },
  { name: "Reinforcement Steel", rate: 18500, unit: "t" },
  { name: "Brickwork (230mm)", rate: 2400, unit: "m³" },
  { name: "Plaster (Internal)", rate: 85, unit: "m²" },
  { name: "Plaster (External)", rate: 95, unit: "m²" },
  { name: "Boundary Wall Brickwork", rate: 2400, unit: "m³" },
];
  const updateBuilder = (serviceName: string, value: number, rate: number) => {
    const exists = builderItems.find((item) => item.name === serviceName);

    if (exists) {
      setBuilderItems(
        builderItems.map((item) =>
          item.name === serviceName ? { ...item, size: value } : item
        )
      );
    } else {
      setBuilderItems([
        ...builderItems,
        { name: serviceName, size: value, rate },
      ]);
    }
  };

  const totalEstimate = builderItems.reduce(
    (acc, item) => acc + item.size * item.rate,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const breakdown = builderItems
      .filter((item) => item.size > 0)
      .map(
        (item) =>
          `${item.name}: ${item.size}m² × R${item.rate.toLocaleString()} = R${(
            item.size * item.rate
          ).toLocaleString()}`
      )
      .join("%0A");

    const text =
      `Hi Crafty Construction and Technical Services,%0A%0A` +
      `*PROJECT BUILDER REQUEST*%0A` +
      `Client Name: ${encodeURIComponent(formData.name)}%0A` +
      `Phone: ${encodeURIComponent(formData.phone)}%0A` +
      `Email: ${encodeURIComponent(formData.email)}%0A%0A` +
      `${breakdown}%0A%0A` +
      `Estimated Total: R${totalEstimate.toLocaleString()}%0A%0A` +
      `Additional Notes: ${encodeURIComponent(formData.message)}`;

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
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-3">
            Build Your Project
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Construction Cost Builder
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* BUILDER FORM */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <CheckCircle className="h-16 w-16 text-primary mb-4" />
                <h3 className="font-display text-2xl font-bold mb-2">
                  Thank You!
                </h3>
                <p className="text-muted-foreground">
                  Redirecting you to WhatsApp...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* SERVICES */}
                <div className="space-y-4">
                  {services.map((service) => (
                    <div
                      key={service.name}
                      className="flex items-center justify-between gap-4 border p-4 rounded-xl"
                    >
                      <div>
                        <p className="font-semibold text-foreground">
                          {service.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          R{service.rate.toLocaleString()} per m²
                        </p>
                      </div>

                      <input
                        type="number"
                        min="0"
                        placeholder="m²"
                        className="w-24 px-3 py-2 border rounded-md"
                        onChange={(e) =>
                          updateBuilder(
                            service.name,
                            Number(e.target.value),
                            service.rate
                          )
                        }
                      />
                    </div>
                  ))}
                </div>

                {/* TOTAL */}
                <div className="p-4 bg-primary/10 rounded-xl">
                  <p className="text-lg font-bold">
                    Estimated Total: R{totalEstimate.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    *Final price subject to site inspection.
                  </p>
                </div>

                {/* CLIENT DETAILS */}
                <div className="space-y-4 pt-6">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    className={inputClass}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    className={inputClass}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    className={inputClass}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />

                  <textarea
                    placeholder="Additional Notes"
                    rows={4}
                    className={inputClass}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full py-6 text-base gap-2"
                >
                  <Send className="h-5 w-5" />
                  Submit Builder Request
                </Button>
              </form>
            )}
          </motion.div>

          {/* CONTACT INFO */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-muted-foreground">
                    Cape Town, South Africa
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <a
                    href="tel:+27601133986"
                    className="text-primary hover:underline"
                  >
                    060 113 3986
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MessageCircle className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">WhatsApp</h3>
                  <a
                    href="https://wa.me/27601133986"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-md border h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423830.37557812646!2d18.37610565!3d-33.914651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc500f8826eed7%3A0x687fe1fc2828aa87!2sCape%20Town%2C%20South%20Africa!5e0!3m2!1sen!2s!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
