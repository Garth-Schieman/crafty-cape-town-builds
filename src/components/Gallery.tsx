import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper function to resolve image/video paths
const getAssetUrl = (folder: string, name: string) => {
  return new URL(`../assets/${folder}/${name}`, import.meta.url).href;
};

// ----------------- Types -----------------

interface GalleryItem {
  src: string;
  label: string;
}

interface VideoItem {
  src: string;
  label: string;
}

type ViewState =
  | "categories"
  | "blueprints"
  | "exterior"
  | "interior"
  | "liveFootage"
  | "aluminium";

// ----------------- Images -----------------

const blueprintImages: GalleryItem[] = Array.from({ length: 11 }, (_, i) => ({
  src: getAssetUrl("Blueprints", `bp${i + 1}.jpg`),
  label: `Blueprint ${i + 1}`,
}));

const exteriorImages: GalleryItem[] = Array.from({ length: 16 }, (_, i) => ({
  src: getAssetUrl("Exterior", `ew${i + 1}.jpg`),
  label: `Exterior ${i + 1}`,
}));

const interiorImages: GalleryItem[] = Array.from({ length: 26 }, (_, i) => ({
  src: getAssetUrl("Interior", `iw${i + 1}.jpg`),
  label: `Interior ${i + 1}`,
}));

const aluminiumImages: GalleryItem[] = Array.from({ length: 7 }, (_, i) => ({
  src: getAssetUrl("Aluminium", `al${i + 1}.jpg`),
  label: `Aluminium ${i + 1}`,
}));

// ----------------- Videos -----------------

const liveFootageVideos: VideoItem[] = [
  {
    src: getAssetUrl("LiveFootage", "video1.mp4"),
    label: "Live Footage 1",
  },
  {
    src: getAssetUrl("LiveFootage", "video2.mp4"),
    label: "Live Footage 2",
  },
];

// ----------------- Titles -----------------

const titles: Record<ViewState, string> = {
  categories: "Our Work",
  blueprints: "Blueprint Designs",
  exterior: "Exterior Work",
  interior: "Interior Work",
  liveFootage: "Live Project Footage",
  aluminium: "Aluminium Work",
};

// ----------------- Component -----------------

const Gallery = () => {
  const [view, setView] = useState<ViewState>("categories");

  // -------- IMAGE GRID --------
  const RenderGrid = ({ images }: { images: GalleryItem[] }) => (
    <motion.div
      key="grid"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full"
    >
      <button
        onClick={() => setView("categories")}
        className="mb-8 text-primary font-semibold hover:underline"
      >
        ← Back to Categories
      </button>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.02 }}
            className="overflow-hidden rounded-xl break-inside-avoid shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              src={img.src}
              alt={img.label}
              className="w-full h-auto object-cover rounded-xl"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  // -------- VIDEO GRID --------
  const RenderVideoGrid = ({ videos }: { videos: VideoItem[] }) => (
    <motion.div
      key="videos"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full"
    >
      <button
        onClick={() => setView("categories")}
        className="mb-8 text-primary font-semibold hover:underline"
      >
        ← Back to Categories
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="overflow-hidden rounded-xl shadow-md"
          >
            <video
              src={video.src}
              controls
              preload="metadata"
              playsInline
              className="w-full rounded-xl"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <section
      id="gallery"
      className="section-padding bg-background min-h-screen py-20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary uppercase tracking-widest text-sm mb-3">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl font-bold capitalize">
            {titles[view]}
          </h2>
        </div>

        <AnimatePresence mode="wait">
          {view === "categories" ? (
            <motion.div
              key="cats"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-5 gap-6"
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
              <CategoryCard
                title="Aluminium Work"
                img={aluminiumImages[0].src}
                count={aluminiumImages.length}
                onClick={() => setView("aluminium")}
              />
              <CategoryCard
                title="Live Footage"
                img={getAssetUrl("LiveFootage", "thumb.png")}
                count={liveFootageVideos.length}
                onClick={() => setView("liveFootage")}
              />
            </motion.div>
          ) : (
            <>
              {view === "blueprints" && <RenderGrid images={blueprintImages} />}
              {view === "exterior" && <RenderGrid images={exteriorImages} />}
              {view === "interior" && <RenderGrid images={interiorImages} />}
              {view === "aluminium" && <RenderGrid images={aluminiumImages} />}
              {view === "liveFootage" && (
                <RenderVideoGrid videos={liveFootageVideos} />
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// ----------------- Category Card -----------------

const CategoryCard = ({
  title,
  img,
  count,
  onClick,
}: {
  title: string;
  img: string;
  count: number;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="group relative h-[400px] overflow-hidden rounded-2xl cursor-pointer shadow-xl"
  >
    <img
      src={img}
      alt={title}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8">
      <h3 className="text-white text-2xl font-bold">{title}</h3>
      <p className="text-white/70 text-sm uppercase tracking-wider">
        {count} Projects
      </p>
    </div>
  </div>
);

export default Gallery;