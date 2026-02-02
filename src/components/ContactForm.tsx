"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/contact-schema";

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      message: "",
    },
  });

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
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">
            Get a free quote
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neway-navy mb-3">
            Let&apos;s Start Your Project!
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Tell us about your vision and we&apos;ll get back to you within 24
            hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto rounded-2xl bg-neway-navy p-6 md:p-10 shadow-xl"
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
                Your Name
              </Label>
              <Input
                id="name"
                placeholder="Your name"
                className="bg-neway-navy-light border-white/20 text-white placeholder:text-white/50 focus-visible:ring-neway-orange"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-300">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/90">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="bg-neway-navy-light border-white/20 text-white placeholder:text-white/50 focus-visible:ring-neway-orange"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-300">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white/90">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(000) 000-0000"
                className="bg-neway-navy-light border-white/20 text-white placeholder:text-white/50 focus-visible:ring-neway-orange"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-sm text-red-300">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-white/90">
                Full Address
              </Label>
              <Input
                id="address"
                placeholder="Street address"
                className="bg-neway-navy-light border-white/20 text-white placeholder:text-white/50 focus-visible:ring-neway-orange"
                {...register("address")}
              />
              {errors.address && (
                <p className="text-sm text-red-300">{errors.address.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-white/90">
                  City
                </Label>
                <Input
                  id="city"
                  placeholder="City"
                  className="bg-neway-navy-light border-white/20 text-white placeholder:text-white/50 focus-visible:ring-neway-orange"
                  {...register("city")}
                />
                {errors.city && (
                  <p className="text-sm text-red-300">{errors.city.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state" className="text-white/90">
                  State
                </Label>
                <Input
                  id="state"
                  placeholder="State"
                  className="bg-neway-navy-light border-white/20 text-white placeholder:text-white/50 focus-visible:ring-neway-orange"
                  {...register("state")}
                />
                {errors.state && (
                  <p className="text-sm text-red-300">{errors.state.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode" className="text-white/90">
                  Zip Code
                </Label>
                <Input
                  id="zipCode"
                  placeholder="Zip"
                  className="bg-neway-navy-light border-white/20 text-white placeholder:text-white/50 focus-visible:ring-neway-orange"
                  {...register("zipCode")}
                />
                {errors.zipCode && (
                  <p className="text-sm text-red-300">{errors.zipCode.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-white/90">
                Tell us about your project
              </Label>
              <Textarea
                id="message"
                placeholder="Describe your project..."
                rows={4}
                className="bg-neway-navy-light border-white/20 text-white placeholder:text-white/50 focus-visible:ring-neway-orange resize-none"
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
              className="w-full h-12 bg-neway-orange hover:bg-neway-orange-hover text-white font-semibold uppercase tracking-wide rounded-xl shadow-lg"
            >
              {submitStatus === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden />
                  Sending...
                </>
              ) : (
                "Get a free quote"
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
