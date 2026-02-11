"use client";

import { motion } from "framer-motion";

const images = [
  "/img-01.jpg",
  "/img-02.jpg",
  "/img-03.jpg",
  "/img-04.jpg",
  "/img-05.jpg",
  "/img-06.jpg",
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
    <section id="gallery" className="px-4 md:px-6 lg:px-8 py-12 md:py-16">
      <div className="w-full py-20 md:py-28 px-6 md:px-10 bg-[#0E1E2C] rounded-2xl md:rounded-3xl overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-[#B28C4E] mb-2">
            Our Services
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
          className="grid grid-cols-2 gap-4 md:gap-6 max-w-7xl mx-auto"
        >
          {images.map((src, i) => (
            <motion.div
              key={`${src}-${i}`}
              variants={item}
              className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neway-navy-light group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Project ${i + 1}`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
