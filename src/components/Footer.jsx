import React from "react";
import { cafeData } from "../data/cafe";

export default function Footer() {
  return (
    <footer className="bg-warmstone-900 text-warmstone-300 py-16 text-sm border-t border-warmstone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Footer Info: Stacked on mobile, 3 columns on desktop */}
        <div className="flex flex-col space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-12 mb-12">
          {/* Brand Blurb */}
          <div>
            <h3 className="font-serif text-xl font-bold text-white mb-3">
              {cafeData.brand.name}
            </h3>
            <p className="text-warmstone-400 max-w-xs leading-relaxed">
              {cafeData.brand.blurb}
            </p>
          </div>

          {/* Visit Us */}
          <div>
            <h3 className="font-serif text-base font-bold text-white mb-3">
              Visit us
            </h3>
            <p className="text-warmstone-300">{cafeData.contact.address}</p>
            <p className="text-warmstone-400 mt-2 text-xs sm:text-sm">
              <a
                href={`mailto:${cafeData.contact.email}`}
                className="hover:text-terracotta-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta-500"
              >
                {cafeData.contact.email}
              </a>
              {" - "}
              <a
                href={`tel:${cafeData.contact.phoneRaw}`}
                className="hover:text-terracotta-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta-500"
              >
                {cafeData.contact.phone}
              </a>
            </p>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-serif text-base font-bold text-white mb-3">
              Opening hours
            </h3>
            <div className="space-y-1 text-warmstone-300">
              {cafeData.hours.lines.map((line) => (
                <p key={line.days}>
                  <span className="font-medium text-white">{line.days}:</span> {line.hours}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Social Media Pages */}
        <div className="text-center pt-8 border-t border-warmstone-800">
          <h4 className="font-serif text-sm font-semibold text-warmstone-200 mb-4">
            Social media pages
          </h4>
          <div className="flex flex-wrap justify-center items-center gap-6 text-warmstone-400 text-xs sm:text-sm">
            {cafeData.socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${social.name}`}
                className="hover:text-white hover:underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta-500"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-xs text-warmstone-500">
          <p>© {cafeData.copyrightYear} {cafeData.brand.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
