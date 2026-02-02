"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/ui/card";

const steps = [
  {
    number: "01",
    title: "Contact our team for a free estimate",
    description:
      "Reach out and we'll schedule a no-obligation consultation to discuss your vision and budget.",
  },
  {
    number: "02",
    title: "Initial consultation",
    description:
      "We meet with you to understand your needs, preferences, and how you want to use your outdoor space.",
  },
  {
    number: "03",
    title: "Design & construction",
    description:
      "Our team creates a custom plan and brings it to life with clear communication and minimal disruption.",
  },
  {
    number: "04",
    title: "Enjoy your oasis",
    description:
      "Final walkthrough, care tips, and ongoing support. Time to relax and enjoy your new backyard.",
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

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-neway-cream">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">
            Process
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neway-navy mb-3">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A clear, stress-free process from first call to first splash.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {steps.map(({ number, title, description }) => (
            <motion.div key={number} variants={item}>
              <Card className="h-full border-0 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <div className="w-14 h-14 rounded-lg bg-neway-navy flex items-center justify-center mb-5">
                    <span className="text-xl font-bold text-white">{number}</span>
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
