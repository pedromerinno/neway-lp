"use client";

import { motion } from "framer-motion";
import { Ruler, Award, Lightbulb, Handshake } from "lucide-react";
import { Card, CardContent } from "@/ui/card";

const items = [
  {
    icon: Ruler,
    title: "15+ Years of Experience in exquisite pools",
    description:
      "We bring decades of expertise to every project, ensuring quality and craftsmanship that stands the test of time.",
  },
  {
    icon: Award,
    title: "Exclusive design and premium materials",
    description:
      "From concept to completion, we use only the finest materials and create designs tailored to your vision.",
  },
  {
    icon: Lightbulb,
    title: "Innovation in every detail",
    description:
      "We combine creativity with technical excellence to deliver outdoor spaces that exceed expectations.",
  },
  {
    icon: Handshake,
    title: "Trusted partnership from start to finish",
    description:
      "Clear communication, transparent pricing, and dedicated support throughout your project journey.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function WhyChoose() {
  return (
    <section id="why-choose" className="py-20 md:py-28 bg-neway-cream">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">
            Our Promise
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neway-navy mb-3">
            Why Choose Neway Pools
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Excellence in every detail, from design to delivery.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {items.map(({ icon: Icon, title, description }) => (
            <motion.div key={title} variants={item}>
              <Card className="h-full border-0 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 h-12 rounded-lg bg-neway-orange flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-white" aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold text-neway-navy mb-2">
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
