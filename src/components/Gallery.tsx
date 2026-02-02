"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6e3?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?q=80&w=1170&auto=format&fit=crop",
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Gallery() {
  return (
    <section id="gallery" className="py-20 md:py-28 bg-neway-navy">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-white/70 mb-2">
            Our Work
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            See What We&apos;ve Built
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            A selection of our completed pool and outdoor projects.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {images.map((src, i) => (
            <motion.div
              key={src}
              variants={item}
              className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neway-navy-light group"
            >
              <Image
                src={src}
                alt={`Project ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
