import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper function to resolve image paths from src/assets
const getAssetUrl = (name: string) => {
  return new URL(`../assets/${name}`, import.meta.url).href;
};

interface GalleryItem {
  src: string;
  label: string;
}

// Data structures for the images
const blueprintImages: GalleryItem[] = Array.from({ length: 11 }, (_, i) => ({
  src: getAssetUrl(`bp${i + 1}.jpg`),
  label: `Blueprint ${i + 1}`
}));

const projectImages: GalleryItem[] = Array.from({ length: 7 }, (_, i) => ({
  src: getAssetUrl(`project${i + 1}.jpg`),
  label: `Project ${i + 1}`
}));

const Gallery = () => {
  const [view, setView] = useState<"categories" | "blueprints" | "projects">("categories");

  // Component for the individual photo grids
  const RenderGrid = ({ images }: { images: GalleryItem[] }) => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full"
    >
      <button 
        onClick={() => setView("categories")}
        className="group mb-8 flex items-center gap-2 text-primary font-semibold hover:underline"
      >
        <span className="transition-transform group-hover:-translate-x-1">←</span> Back to Portfolio
      </button>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="relative overflow-hidden rounded-xl break-inside-avoid shadow-sm hover:shadow-md transition-shadow"
          >
            <img 
              src={img.src} 
              alt={img.label} 
              className="w-full h-auto object-cover rounded-xl"
              onError={(e) => {
                // Type casting to fix the 'Property src does not exist on type EventTarget' error
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                console.error(`Failed to load: ${img.src}`);
              }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <section id="gallery" className="section-padding bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-3">Our Work</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground capitalize">
            {view === "categories" ? "Project Gallery" : view}
          </h2>
        </div>

        <AnimatePresence mode="wait">
          {view === "categories" ? (
            <motion.div 
              key="cats"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Blueprints Card */}
              <div 
                onClick={() => setView("blueprints")}
                className="group relative h-[300px] md:h-[450px] overflow-hidden rounded-2xl cursor-pointer shadow-lg"
              >
                <img 
                  src={blueprintImages[0].src} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt="Blueprints Category"
                  onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/600x400?text=Blueprints")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-white text-3xl font-bold">Blueprints</h3>
                  <p className="text-white/70">Architectural & Technical Drawings</p>
                </div>
              </div>

              {/* Projects Card */}
              <div 
                onClick={() => setView("projects")}
                className="group relative h-[300px] md:h-[450px] overflow-hidden rounded-2xl cursor-pointer shadow-lg"
              >
                <img 
                  src={projectImages[0].src} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt="Projects Category"
                  onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/600x400?text=Projects")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-white text-3xl font-bold">Projects</h3>
                  <p className="text-white/70">Completed On-Site Work</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div key="details">
              {view === "blueprints" ? (
                <RenderGrid images={blueprintImages} />
              ) : (
                <RenderGrid images={projectImages} />
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;