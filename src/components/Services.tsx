"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/ui/card";

const services = [
  {
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6e3?q=80&w=1170&auto=format&fit=crop",
    title: "Custom pool renovation",
    description:
      "Transform your existing pool with modern finishes, new features, and expert craftsmanship.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1170&auto=format&fit=crop",
    title: "Pool maintenance",
    description:
      "Keep your pool in pristine condition with our comprehensive maintenance and care programs.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1170&auto=format&fit=crop",
    title: "Outdoor living spaces",
    description:
      "Patios, fire pits, outdoor kitchens, and more — designed to extend your living space.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?q=80&w=1170&auto=format&fit=crop",
    title: "New pool construction",
    description:
      "From design to the first splash, we build custom pools tailored to your vision.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1170&auto=format&fit=crop",
    title: "Lighting & water features",
    description:
      "Ambient lighting, fountains, and water features that elevate your outdoor experience.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1170&auto=format&fit=crop",
    title: "Landscape integration",
    description:
      "Seamless blend of pool, hardscape, and greenery for a cohesive backyard oasis.",
  },
];

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const card = {
  hidden: { opacity: 1, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">
            Our Offerings
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neway-navy mb-3">
            Our services
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
                <Card className="h-full border-0 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden">
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
