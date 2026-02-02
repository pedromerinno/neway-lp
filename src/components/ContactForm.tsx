"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, ChevronRight } from "lucide-react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/contact-schema";

const TYPE_OF_INTEREST = [
  "New pool construction",
  "Pool renovation",
  "Pool maintenance",
  "Outdoor living space",
  "Landscaping",
  "Other",
];

const BUDGET_RANGES = [
  "Under $50k",
  "$50k – $100k",
  "$100k – $200k",
  "$200k – $500k",
  "Over $500k",
];

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      cityState: "",
      typeOfInterest: "",
      approximateBudget: "",
      message: "",
    },
  });

  const typeOfInterest = watch("typeOfInterest");
  const approximateBudget = watch("approximateBudget");

  async function onSubmit(data: ContactFormValues) {
    setSubmitStatus("loading");

    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");

      setSubmitStatus("success");
      reset();
    } catch {
      setSubmitStatus("error");
    }
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-neway-cream">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-[#8b7355] mb-2">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neway-navy mb-3">
            Let&apos;s Start Your Project!
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto rounded-2xl md:rounded-3xl bg-neway-navy p-6 md:p-10 shadow-xl overflow-hidden"
        >
          {submitStatus === "success" && (
            <div
              className="mb-6 p-4 rounded-lg bg-green-500/20 text-green-200 text-sm"
              role="alert"
            >
              Message sent successfully. We&apos;ll be in touch soon.
            </div>
          )}
          {submitStatus === "error" && (
            <div
              className="mb-6 p-4 rounded-lg bg-red-500/20 text-red-200 text-sm"
              role="alert"
            >
              Something went wrong. Please try again or email us directly.
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/90">
                Full Name <span className="text-neway-orange">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Your name"
                className="bg-neway-navy-light/80 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-neway-orange rounded-lg"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-300">{errors.name.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/90">
                  Email <span className="text-neway-orange">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="bg-neway-navy-light/80 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-neway-orange rounded-lg"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-300">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white/90">
                  Phone <span className="text-neway-orange">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  className="bg-neway-navy-light/80 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-neway-orange rounded-lg"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-sm text-red-300">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cityState" className="text-white/90">
                City/State <span className="text-neway-orange">*</span>
              </Label>
              <Input
                id="cityState"
                placeholder="Your city, State"
                className="bg-neway-navy-light/80 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-neway-orange rounded-lg"
                {...register("cityState")}
              />
              {errors.cityState && (
                <p className="text-sm text-red-300">{errors.cityState.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-white/90">
                Type of Interest <span className="text-neway-orange">*</span>
              </Label>
              <Select
                value={typeOfInterest}
                onValueChange={(v) => setValue("typeOfInterest", v)}
              >
                <SelectTrigger className="bg-neway-navy-light/80 border-white/20 text-white placeholder:text-white/50 focus:ring-neway-orange rounded-lg [&>span]:text-white [&>span]:placeholder:text-white/50">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {TYPE_OF_INTEREST.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.typeOfInterest && (
                <p className="text-sm text-red-300">
                  {errors.typeOfInterest.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-white/90">Approximate Budget</Label>
              <Select
                value={approximateBudget}
                onValueChange={(v) => setValue("approximateBudget", v)}
              >
                <SelectTrigger className="bg-neway-navy-light/80 border-white/20 text-white placeholder:text-white/50 focus:ring-neway-orange rounded-lg [&>span]:text-white [&>span]:placeholder:text-white/50">
                  <SelectValue placeholder="Select a range" />
                </SelectTrigger>
                <SelectContent>
                  {BUDGET_RANGES.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-white/90">
                Message <span className="text-white/60">(Optional)</span>
              </Label>
              <Textarea
                id="message"
                placeholder="Tell us more about your dream project..."
                rows={4}
                className="bg-neway-navy-light/80 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-neway-orange rounded-lg resize-none"
                {...register("message")}
              />
              {errors.message && (
                <p className="text-sm text-red-300">{errors.message.message}</p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={submitStatus === "loading"}
              className="w-full h-12 md:h-14 bg-neway-orange hover:bg-neway-orange-hover text-white font-semibold uppercase tracking-wide rounded-xl shadow-lg gap-2"
            >
              {submitStatus === "loading" ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                  Sending...
                </>
              ) : (
                <>
                  Get a free quote
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
