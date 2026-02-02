"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";

const actions = [
  {
    icon: Phone,
    title: "Get a Free Quote",
    description: "Tell us about your project and receive a personalized estimate.",
  },
  {
    icon: MessageCircle,
    title: "Schedule Consultation",
    description: "Book a no-obligation call with our design team.",
  },
  {
    icon: Calendar,
    title: "Contact Us",
    description: "Reach out anytime — we're here to help bring your vision to life.",
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

export function CTA() {
  return (
    <section className="py-20 md:py-28 bg-neway-cream">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neway-navy mb-3">
            Ready to Transform Your Space?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Start your journey to the backyard of your dreams.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {actions.map(({ icon: Icon, title, description }) => (
            <motion.div key={title} variants={item}>
              <Card className="h-full border-0 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl overflow-hidden">
                <CardContent className="p-6 md:p-8 text-center">
                  <div className="w-12 h-12 rounded-lg bg-neway-orange flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-6 h-6 text-white" aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold text-neway-navy mb-2">
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {description}
                  </p>
                  <Button asChild size="sm" variant="outline" className="rounded-lg">
                    <Link href="#contact">Learn more</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
