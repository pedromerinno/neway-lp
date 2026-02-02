"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Quote } from "lucide-react";
import { Card, CardContent } from "@/ui/card";
import { Button } from "@/ui/button";

const testimonials = [
  {
    quote:
      "Neway Pools transformed our backyard into a paradise. The pool design was exactly what we dreamed of, and the team was professional from start to finish.",
    author: "Maria & João Silva",
    role: "Residential Project",
    rating: 5,
  },
  {
    quote:
      "From the first consultation to the final splash, everything was seamless. We couldn't be happier with our new outdoor living space.",
    author: "Carlos Mendes",
    role: "Pool & Landscape",
    rating: 5,
  },
  {
    quote:
      "Quality craftsmanship and personalized design. They listened to our ideas and delivered beyond our expectations. Highly recommend.",
    author: "Ana Costa",
    role: "Full Backyard Renovation",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-4" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-neway-orange" aria-hidden>
          ★
        </span>
      ))}
    </div>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % testimonials.length);
  }, []);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const t = setInterval(goNext, 6000);
    return () => clearInterval(t);
  }, [goNext]);

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">
            Our Customers
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neway-navy mb-3">
            What Clients Say About Neway Pools
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Real stories from homeowners who trusted us with their outdoor
            spaces.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto relative"
        >
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="shrink-0 rounded-full border-neway-navy/20 hover:bg-neway-cream"
              onClick={goPrev}
              aria-label="Previous testimonial"
            >
              <ChevronRight className="h-5 w-5 rotate-180" />
            </Button>

            <div className="flex-1 min-h-[260px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 1, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 1, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <Card className="border-0 bg-neway-navy text-white shadow-lg rounded-2xl overflow-hidden relative">
                    <CardContent className="p-8 md:p-10 relative">
                      <Quote
                        className="absolute top-6 left-6 w-12 h-12 text-white/20 -rotate-12"
                        aria-hidden
                      />
                      <Quote
                        className="absolute bottom-6 right-6 w-10 h-10 text-white/20 rotate-12 scale-[-1]"
                        aria-hidden
                      />
                      <blockquote className="text-xl md:text-2xl font-medium leading-relaxed text-white/95 mb-4 relative z-10 pl-2">
                        {testimonials[index].quote}
                      </blockquote>
                      <StarRating count={testimonials[index].rating} />
                      <footer className="relative z-10">
                        <cite className="not-italic font-semibold text-white">
                          {testimonials[index].author}
                        </cite>
                        <p className="text-white/70 text-sm mt-1">
                          {testimonials[index].role}
                        </p>
                      </footer>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="shrink-0 rounded-full border-neway-navy/20 hover:bg-neway-cream bg-neway-navy text-white border-neway-navy-light hover:bg-neway-navy-light"
              onClick={goNext}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div
            className="flex justify-center gap-2 mt-6"
            role="tablist"
            aria-label="Testimonial navigation"
          >
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-8 bg-neway-orange"
                    : "w-2 bg-neway-navy/30 hover:bg-neway-navy/50"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
