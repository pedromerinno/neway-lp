"use client";

import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#why-choose" },
  { label: "Blog", href: "/blog" },
  { label: "Pool Services", href: "#services" },
  { label: "Warranty Form", href: "/warranty" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Contact Us", href: "#contact" },
];

const locations = [
  { city: "Gulf Breeze", state: "FL" },
  { city: "Cumming", state: "GA" },
  { city: "Wilmington", state: "NC" },
];

export function Footer() {
  return (
    <footer className="bg-neway-navy text-white py-14 md:py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Logo + Licensed & Insured */}
          <div className="lg:col-span-1">
            <Link href="#" className="inline-flex flex-col gap-0.5" aria-label="Neway Pools - início">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt="Neway"
                width={160}
                height={96}
                className="h-10 w-auto md:h-12 invert"
              />
              <span className="text-xs font-medium tracking-[0.2em] text-white uppercase">
                POOLS
              </span>
            </Link>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/90">
              Licensed & Insured
            </p>
            <p className="mt-1 text-sm font-medium text-neway-orange">
              #CPC1460590
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/90 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Our Locations */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/90 mb-4">
              Our Locations
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              {locations.map(({ city, state }) => (
                <li key={`${city}-${state}`}>
                  {city}, {state}
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us + Financing */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/90 mb-4">
                Follow Us
              </h3>
              <div className="flex gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded bg-neway-orange text-white hover:bg-neway-orange-hover transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded bg-neway-orange text-white hover:bg-neway-orange-hover transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/90 mb-3">
                Financing
              </h3>
              <div className="rounded-lg border border-white/20 bg-white/5 p-4 space-y-3">
                <p className="text-sm font-semibold text-white">
                  Home Improvement Loans (HFS)
                </p>
                <p className="text-sm text-white/90 italic">
                  You Dream It. We Finance It!
                </p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>• No Stage Funding</li>
                  <li>• No Equity Needed</li>
                  <li>• Low-Fixed Rates</li>
                </ul>
                <Link
                  href="https://www.hfsfinancial.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full rounded-lg bg-neway-orange px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-neway-orange-hover transition-colors"
                >
                  Apply Now
                </Link>
                <p className="text-xs text-white/60">*No Affect On Credit</p>
                <p className="text-xs text-white/80 pt-2 border-t border-white/10">
                  Lyon Financial
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/60">
          <span>Neway Pools</span>
        </div>
      </div>
    </footer>
  );
}
