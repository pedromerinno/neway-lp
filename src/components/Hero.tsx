"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/img-01.jpg"
          alt="Piscina e área externa de luxo"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-neway-navy/70 z-10" aria-hidden />
      </div>

      <header className="relative z-20 container mx-auto px-6 pt-8 md:pt-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-1"
        >
          <Link href="#" className="inline-block w-fit" aria-label="Neway Pools - início">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="NeWay"
              width={280}
              height={168}
              className="h-20 w-auto md:h-24 lg:h-28 invert"
              fetchPriority="high"
            />
          </Link>
          <span className="text-sm md:text-base font-medium tracking-[0.2em] text-white uppercase">
            POOLS
          </span>
        </motion.div>
      </header>

      <div className="relative z-20 container mx-auto px-6 flex-1 flex flex-col items-center justify-center text-center py-16">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl mx-auto leading-tight mb-4"
        >
          BUILD THE POOL OF YOUR DREAMS — TURN YOUR BACKYARD INTO A PARADISE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto"
        >
          Our commitment is to create custom experiences for every client.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <Button
            asChild
            size="xl"
            className="bg-neway-orange hover:bg-neway-orange-hover text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-xl uppercase tracking-wide font-semibold"
          >
            <Link href="#contact">Get a free quote</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
