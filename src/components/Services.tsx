"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/ui/card";

const services = [
  {
    image: "/img-01.jpg",
    title: "Custom pool renovation",
    description:
      "Transform your existing pool with modern finishes, new features, and expert craftsmanship.",
  },
  {
    image: "/img-02.jpg",
    title: "Pool maintenance",
    description:
      "Keep your pool in pristine condition with our comprehensive maintenance and care programs.",
  },
  {
    image: "/img-03.jpg",
    title: "Outdoor living spaces",
    description:
      "Patios, fire pits, outdoor kitchens, and more — designed to extend your living space.",
  },
  {
    image: "/img-04.jpg",
    title: "Pool installation",
    description:
      "From design to the first splash, we build custom pools tailored to your vision.",
  },
  {
    image: "/img-05.jpg",
    title: "Lighting & water features",
    description:
      "Ambient lighting, fountains, and water features that elevate your outdoor experience.",
  },
  {
    image: "/img-06.jpg",
    title: "Landscape integration",
    description:
      "Seamless blend of pool, hardscape, and greenery for a cohesive backyard oasis.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-[#B28C4E] mb-2">
            Services
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neway-navy mb-3">
            Our Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From concept to completion, we bring your outdoor vision to life.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map(({ image, title, description }) => (
            <motion.div key={title} variants={card}>
              <Link href="#contact" className="group block">
                <Card className="h-full border-0 bg-[#F8F7F4] rounded-xl overflow-hidden">
                  <div className="relative aspect-[4/3] rounded-t-xl overflow-hidden bg-neway-navy">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-neway-navy mb-2 group-hover:text-neway-orange transition-colors">
                      {title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
