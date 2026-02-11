"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/ui/card";
import { Button } from "@/ui/button";

const locations = [
  {
    city: "Gulf Breeze",
    state: "Florida",
    abbr: "FL",
    visitUrl: "#",
  },
  {
    city: "Cumming",
    state: "Georgia",
    abbr: "GA",
    visitUrl: "#",
  },
  {
    city: "Wilmington",
    state: "North Carolina",
    abbr: "NC",
    visitUrl: "#",
  },
];

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
          <p className="text-sm font-medium uppercase tracking-wider text-[#B28C4E] mb-2">
            Locations
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neway-navy mb-3">
            Choose one of our locations closest to you
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Florida, Georgia & North Carolina — we serve and surround these areas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
          {locations.map(({ city, state, abbr, visitUrl }) => (
            <Card
              key={abbr}
              className="h-full border-0 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl overflow-hidden flex flex-col"
            >
              <CardContent className="p-6 md:p-8 flex flex-col flex-1 items-center text-center">
                <div className="flex justify-center mb-5">
                  <div className="relative w-24 h-24 rounded-xl bg-neway-orange/15 flex items-center justify-center">
                    <MapPin
                      className="w-10 h-10 text-neway-orange-hover"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-neway-navy mb-1 uppercase tracking-wide">
                  {city}
                </h3>
                <p className="text-neway-orange font-medium text-sm uppercase tracking-wide mb-6">
                  {state}
                </p>
                <Link href={visitUrl} className="mt-auto w-full">
                  <Button
                    variant="default"
                    className="w-full bg-neway-navy hover:bg-neway-navy/90 text-white rounded-lg"
                  >
                    Visit Neway {abbr}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
