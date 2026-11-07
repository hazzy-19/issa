import React from "react";
import { useCafe } from "../../../features/storefront/CafeContext";

export default function FindUs() {
  const { cafe } = useCafe();
  return (
    <section id="contact" className="scroll-mt-20 pt-4 pb-8 md:py-8">
      {/* Section Header */}
      <div className="text-center mb-6">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1E100A]">
          Find us
        </h2>
      </div>

      {/* Grid: 2 cols on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 items-stretch">
        {/* Contact Card */}
        <div className="bg-[#FAF5EE] rounded-3xl border border-[#DFCCAA] p-5 sm:p-8 lg:p-10 shadow-lg flex flex-col justify-between text-left relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#1E100A] mb-3">
              Contact Details
            </h3>

            {/* Address & Contact Info */}
            <div className="space-y-2.5 mb-5 bg-white/80 rounded-2xl p-4 sm:p-5 border border-[#DFCCAA]/60">
              <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-[#1E100A]">
                <div className="w-8 h-8 rounded-full bg-[#C07A46]/10 flex items-center justify-center text-[#C07A46] flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span>{cafe.contact.address}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#542F1E] pl-11">
                <a
                  href={`mailto:${cafe.contact.email}`}
                  className="hover:text-[#C07A46] font-medium transition-colors"
                >
                  {cafe.contact.email}
                </a>
                <span>-</span>
                <a
                  href={`tel:${cafe.contact.phoneRaw}`}
                  className="hover:text-[#C07A46] font-medium transition-colors"
                >
                  {cafe.contact.phone}
                </a>
              </div>

              <div className="pt-2 pl-11 border-t border-[#DFCCAA]/40 flex items-center gap-2 text-xs text-[#7A4B29]">
                <svg className="w-3.5 h-3.5 text-[#C07A46]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{cafe.hours.display}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons: 2 columns on mobile for WhatsApp & Directions, Call Us full-width */}
          <div className="grid grid-cols-2 gap-2.5 relative z-10 pt-1">
            {/* WhatsApp */}
            <a
              href={cafe.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-[#1E100A] hover:bg-[#321B11] text-[#FAF5EE] text-xs font-semibold rounded-full shadow-sm hover:shadow transition-all text-center"
            >
              <svg className="w-3.5 h-3.5 fill-current text-[#4ADE80]" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.073.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
              </svg>
              <span>WhatsApp</span>
            </a>

            {/* Get directions */}
            <a
              href={cafe.contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-[#C07A46] hover:bg-[#A96434] text-white text-xs font-semibold rounded-full shadow-sm hover:shadow transition-all text-center"
            >
              <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <span>Get Directions</span>
            </a>

            {/* Call us */}
            <a
              href={`tel:${cafe.contact.phoneRaw}`}
              className="col-span-2 flex items-center justify-center gap-2 py-2.5 px-4 border border-[#1E100A] bg-transparent hover:bg-[#1E100A] text-[#1E100A] hover:text-[#FAF5EE] text-xs font-semibold rounded-full transition-all text-center"
            >
              <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call Us: {cafe.contact.phone}</span>
            </a>
          </div>
        </div>

        {/* Map Container */}
        <div
          className="relative min-h-[260px] sm:min-h-[340px] rounded-3xl overflow-hidden border border-[#DFCCAA] shadow-lg bg-[#FAF5EE]"
          aria-label="Location map"
        >
          <iframe
            title="The Corner Café Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.818379646453!2d36.7909!3d-1.2828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTYnNTguMSJTIDM2wrA0Nyc0Ny4yIkU!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske"
            className="w-full h-full min-h-[260px] border-0"
            loading="lazy"
            allowFullScreen=""
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
