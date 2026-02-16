import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper function to resolve image paths from src/assets/subfolders
const getAssetUrl = (folder: string, name: string) => {
  return new URL(`../assets/${folder}/${name}`, import.meta.url).href;
};

interface GalleryItem {
  src: string;
  label: string;
}

// 1. Updated Data Structures with your specific counts
const blueprintImages: GalleryItem[] = Array.from({ length: 11 }, (_, i) => ({
  src: getAssetUrl("Blueprints", `bp${i + 1}.jpg`),
  label: `Blueprint ${i + 1}`
}));

const exteriorImages: GalleryItem[] = Array.from({ length: 16 }, (_, i) => ({
  src: getAssetUrl("Exterior", `ew${i + 1}.jpg`),
  label: `Exterior ${i + 1}`
}));

const interiorImages: GalleryItem[] = Array.from({ length: 26 }, (_, i) => ({
  src: getAssetUrl("Interior", `iw${i + 1}.jpg`),
  label: `Interior ${i + 1}`
}));

type ViewState = "categories" | "blueprints" | "exterior" | "interior";

const Gallery = () => {
  const [view, setView] = useState<ViewState>("categories");

  // Reusable Grid Component
  const RenderGrid = ({ images, title }: { images: GalleryItem[], title: string }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full"
    >
      <button 
        onClick={() => setView("categories")}
        className="group mb-8 flex items-center gap-2 text-primary font-semibold hover:underline"
      >
        <span className="transition-transform group-hover:-translate-x-1">←</span> Back to Categories
      </button>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.02 }}
            className="relative overflow-hidden rounded-xl break-inside-avoid shadow-sm hover:shadow-md transition-shadow"
          >
            <img 
              src={img.src} 
              alt={img.label} 
              className="w-full h-auto object-cover rounded-xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/400x300?text=Image+Missing";
              }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <section id="gallery" className="section-padding bg-background min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-3">Portfolio</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground capitalize">
            {view === "categories" ? "Our Work" : view.replace("-", " ")}
          </h2>
        </div>

        <AnimatePresence mode="wait">
          {view === "categories" ? (
            <motion.div 
              key="cats"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <CategoryCard 
                title="Blueprints" 
                img={blueprintImages[0].src} 
                count={blueprintImages.length}
                onClick={() => setView("blueprints")} 
              />
              <CategoryCard 
                title="Exterior Work" 
                img={exteriorImages[0].src} 
                count={exteriorImages.length}
                onClick={() => setView("exterior")} 
              />
              <CategoryCard 
                title="Interior Work" 
                img={interiorImages[0].src} 
                count={interiorImages.length}
                onClick={() => setView("interior")} 
              />
            </motion.div>
          ) : (
            <div key="details">
              {view === "blueprints" && <RenderGrid images={blueprintImages} title="Blueprints" />}
              {view === "exterior" && <RenderGrid images={exteriorImages} title="Exterior Work" />}
              {view === "interior" && <RenderGrid images={interiorImages} title="Interior Work" />}
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// Reusable Category Card Component
const CategoryCard = ({ title, img, count, onClick }: { title: string, img: string, count: number, onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="group relative h-[400px] overflow-hidden rounded-2xl cursor-pointer shadow-xl border border-white/10"
  >
    <img 
      src={img} 
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
      alt={title}
      onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/600x800?text=No+Preview")}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
      <h3 className="text-white text-3xl font-bold mb-1">{title}</h3>
      <p className="text-white/60 text-sm font-medium uppercase tracking-wider">{count} Projects</p>
    </div>
  </div>
);

export default Gallery;