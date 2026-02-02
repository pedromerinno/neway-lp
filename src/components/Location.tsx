"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/ui/card";

const locations = [
  {
    city: "Miami",
    description: "Covering all the surrounding cities and neighborhoods.",
  },
  {
    city: "Orlando",
    description: "Covering all the surrounding cities and neighborhoods.",
  },
  {
    city: "Tampa",
    description: "Covering all the surrounding cities and neighborhoods.",
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

export function Location() {
  return (
    <section id="location" className="py-20 md:py-28 bg-neway-cream">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">
            Where We Operate
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neway-navy mb-3">
            Location & Service Areas
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            We serve Miami, Orlando, Tampa and surrounding areas.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {locations.map(({ city, description }) => (
            <motion.div key={city} variants={item}>
              <Card className="h-full border-0 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 h-12 rounded-lg bg-neway-orange flex items-center justify-center mb-5">
                    <MapPin className="w-6 h-6 text-white" aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold text-neway-navy mb-2">
                    {city}
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
