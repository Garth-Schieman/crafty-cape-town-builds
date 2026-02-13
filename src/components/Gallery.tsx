import { motion } from "framer-motion";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const images = [
  { src: gallery1, label: "Modern Residential" },
  { src: gallery2, label: "Interior Renovation" },
  { src: gallery3, label: "Wall Rendering" },
  { src: gallery4, label: "Maintenance Work" },
  { src: gallery5, label: "Completed Project" },
  { src: gallery6, label: "Construction Progress" },
];

const Gallery = () => {
  return (
    <section id="gallery" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-3">Our Work</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Project Gallery
          </h2>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-xl break-inside-avoid"
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/60 transition-colors duration-300 flex items-end">
                <p className="text-primary-foreground font-display text-lg font-semibold p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  {img.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
