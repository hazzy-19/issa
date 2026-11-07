import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCafe } from "../context/CafeContext";

const STEPS = [
  { id: 1, name: "Brand", label: "Café Brand" },
  { id: 2, name: "Hours", label: "Opening Hours" },
  { id: 3, name: "Contact", label: "Contact & Location" },
  { id: 4, name: "Socials", label: "Social Media" },
  { id: 5, name: "Summary", label: "Review & Save" },
];

export default function SetupPage() {
  const { cafe, saveCafeData } = useCafe();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  // Initialize form state from existing cafe
  const [formData, setFormData] = useState({
    name: cafe.brand.name || "",
    tagline: cafe.brand.tagline || "",
    heroBlurb: cafe.brand.heroBlurb || "",
    blurb: cafe.brand.blurb || "",

    weekdayDays: cafe.hours.lines[0]?.days || "Mon-Fri",
    weekdayHours: cafe.hours.lines[0]?.hours || "8:00 am - 8:00 pm",
    weekendDays: cafe.hours.lines[1]?.days || "Sat-Sun",
    weekendHours: cafe.hours.lines[1]?.hours || "9:00 am - 8:00 pm",
    kitchenNotice: cafe.hours.kitchenNotice || "Kitchen serves 11:00 am to 8:00 pm",
    allergyNotice:
      cafe.hours.allergyNotice ||
      "Please tell our team about any allergies. Plant-based options are available on request.",

    address: cafe.contact.address || "",
    email: cafe.contact.email || "",
    phone: cafe.contact.phone || "+254 700 000 000",

    instagram:
      cafe.socials.find((s) => s.name.toLowerCase() === "instagram")?.href ||
      "https://instagram.com",
    facebook:
      cafe.socials.find((s) => s.name.toLowerCase() === "facebook")?.href ||
      "https://facebook.com",
    twitter:
      cafe.socials.find((s) => s.name.toLowerCase() === "twitter")?.href ||
      "https://twitter.com",
    tiktok:
      cafe.socials.find((s) => s.name.toLowerCase() === "tiktok")?.href ||
      "https://tiktok.com",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = "Please enter your café name.";
      }
    }

    if (step === 3) {
      if (!formData.address.trim()) {
        newErrors.address = "Please enter your street address.";
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim()) {
        newErrors.email = "Please enter your email address.";
      } else if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address (e.g. hello@yourcafe.com).";
      }

      // Phone validation with required country code starting with +
      const phoneClean = formData.phone.trim();
      const phoneRegex = /^\+[0-9\s\-().]{7,20}$/;
      if (!phoneClean) {
        newErrors.phone = "Please enter your phone number with country code.";
      } else if (!phoneClean.startsWith("+")) {
        newErrors.phone = "Please include your country code starting with +, for example +254 700 000 000.";
      } else if (!phoneRegex.test(phoneClean)) {
        newErrors.phone = "Please enter a valid phone number (at least 7 digits).";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveAndView = () => {
    // Validate all required steps first
    if (!validateStep(1)) {
      setCurrentStep(1);
      return;
    }
    if (!validateStep(3)) {
      setCurrentStep(3);
      return;
    }

    // Assemble new data adhering to cafe shape
    const updatedData = {
      brand: {
        name: formData.name.trim(),
        tagline: formData.tagline.trim() || cafe.brand.tagline,
        heroBlurb: formData.heroBlurb.trim() || cafe.brand.heroBlurb,
        blurb: formData.blurb.trim() || cafe.brand.blurb,
      },
      hours: {
        lines: [
          { days: formData.weekdayDays.trim(), hours: formData.weekdayHours.trim() },
          { days: formData.weekendDays.trim(), hours: formData.weekendHours.trim() },
        ],
        kitchenNotice: formData.kitchenNotice.trim(),
        allergyNotice: formData.allergyNotice.trim(),
      },
      contact: {
        address: formData.address.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
      },
      socials: [
        { name: "Instagram", href: formData.instagram.trim() || "https://instagram.com" },
        { name: "Facebook", href: formData.facebook.trim() || "https://facebook.com" },
        { name: "Twitter", href: formData.twitter.trim() || "https://twitter.com" },
        { name: "TikTok", href: formData.tiktok.trim() || "https://tiktok.com" },
      ],
    };

    saveCafeData(updatedData);

    // Navigate to homepage to view the live personalized website
    navigate("/");
  };

  return (
    <div className="py-6 sm:py-10 max-w-3xl mx-auto px-4 sm:px-6">
      {/* Top Breadcrumb & Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/welcome"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1E100A] hover:text-[#C07A46] bg-white px-4 py-2 rounded-full border border-[#DFCCAA] shadow-xs hover:shadow transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Welcome page</span>
        </Link>

        <span className="text-xs font-semibold text-[#7A4B29] bg-[#C07A46]/10 px-3 py-1 rounded-full">
          Step {currentStep} of {STEPS.length}
        </span>
      </div>

      {/* Page Title */}
      <div className="text-center mb-6">
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1E100A] mb-1">
          Set up your café
        </h1>
        <p className="text-xs sm:text-sm text-[#542F1E]">
          Fill in your details below. You can return and update them anytime.
        </p>
      </div>

      {/* ============================================================ */}
      {/* PROGRESS BAR                                                 */}
      {/* ============================================================ */}
      <div className="mb-8">
        {/* Progress track */}
        <div className="w-full bg-[#DFCCAA]/50 h-2 rounded-full overflow-hidden mb-3">
          <div
            className="bg-[#C07A46] h-full transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Step labels */}
        <div className="grid grid-cols-5 gap-1 text-center">
          {STEPS.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  if (step.id < currentStep) {
                    setCurrentStep(step.id);
                  }
                }}
                disabled={step.id > currentStep}
                className={`text-[10px] sm:text-xs font-semibold truncate transition-colors py-1 ${
                  isCurrent
                    ? "text-[#C07A46]"
                    : isCompleted
                    ? "text-[#1E100A] hover:text-[#C07A46] cursor-pointer"
                    : "text-[#A8917A] cursor-not-allowed"
                }`}
              >
                {step.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* STEP FORM CARD                                               */}
      {/* ============================================================ */}
      <div className="bg-white rounded-3xl border border-[#DFCCAA] p-5 sm:p-8 shadow-md mb-6 text-left">
        {/* STEP 1: BRAND */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="border-b border-[#DFCCAA] pb-3 mb-4">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1E100A]">
                1. Café Brand & Story
              </h2>
              <p className="text-xs text-[#542F1E]">
                What should customers see when they first arrive at your site?
              </p>
            </div>

            <div>
              <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-[#1E100A] mb-1">
                Café name <span className="text-rose-600">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. The Corner Café"
                value={formData.name}
                onChange={handleChange}
                className={`w-full bg-[#FAF5EE] border rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-[#1E100A] focus:outline-none focus:ring-1 focus:ring-[#C07A46] ${
                  errors.name ? "border-rose-500 focus:border-rose-500" : "border-[#DFCCAA] focus:border-[#C07A46]"
                }`}
              />
              {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="tagline" className="block text-xs sm:text-sm font-semibold text-[#1E100A] mb-1">
                Tagline
              </label>
              <input
                id="tagline"
                name="tagline"
                type="text"
                placeholder="e.g. Good food. Great coffee. Your everyday café."
                value={formData.tagline}
                onChange={handleChange}
                className="w-full bg-[#FAF5EE] border border-[#DFCCAA] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-[#1E100A] focus:outline-none focus:border-[#C07A46] focus:ring-1 focus:ring-[#C07A46]"
              />
            </div>

            <div>
              <label htmlFor="heroBlurb" className="block text-xs sm:text-sm font-semibold text-[#1E100A] mb-1">
                Hero welcome message
              </label>
              <textarea
                id="heroBlurb"
                name="heroBlurb"
                rows={3}
                placeholder="Freshly brewed coffee, comforting plates and a welcoming space to slow down..."
                value={formData.heroBlurb}
                onChange={handleChange}
                className="w-full bg-[#FAF5EE] border border-[#DFCCAA] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-[#1E100A] focus:outline-none focus:border-[#C07A46] focus:ring-1 focus:ring-[#C07A46]"
              />
            </div>

            <div>
              <label htmlFor="blurb" className="block text-xs sm:text-sm font-semibold text-[#1E100A] mb-1">
                Short footer summary
              </label>
              <input
                id="blurb"
                name="blurb"
                type="text"
                placeholder="Your neighbourhood spot for fresh food and good coffee."
                value={formData.blurb}
                onChange={handleChange}
                className="w-full bg-[#FAF5EE] border border-[#DFCCAA] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-[#1E100A] focus:outline-none focus:border-[#C07A46] focus:ring-1 focus:ring-[#C07A46]"
              />
            </div>
          </div>
        )}

        {/* STEP 2: HOURS */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="border-b border-[#DFCCAA] pb-3 mb-4">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1E100A]">
                2. Opening Hours & Kitchen Notice
              </h2>
              <p className="text-xs text-[#542F1E]">
                Let guests know when your doors and kitchen are open.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="weekdayDays" className="block text-xs sm:text-sm font-semibold text-[#1E100A] mb-1">
                  Weekday days
                </label>
                <input
                  id="weekdayDays"
                  name="weekdayDays"
                  type="text"
                  placeholder="Mon-Fri"
                  value={formData.weekdayDays}
                  onChange={handleChange}
                  className="w-full bg-[#FAF5EE] border border-[#DFCCAA] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-[#1E100A] focus:outline-none focus:border-[#C07A46] focus:ring-1 focus:ring-[#C07A46]"
                />
              </div>

              <div>
                <label htmlFor="weekdayHours" className="block text-xs sm:text-sm font-semibold text-[#1E100A] mb-1">
                  Weekday hours
                </label>
                <input
                  id="weekdayHours"
                  name="weekdayHours"
                  type="text"
                  placeholder="8:00 am - 8:00 pm"
                  value={formData.weekdayHours}
                  onChange={handleChange}
                  className="w-full bg-[#FAF5EE] border border-[#DFCCAA] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-[#1E100A] focus:outline-none focus:border-[#C07A46] focus:ring-1 focus:ring-[#C07A46]"
                />
              </div>

              <div>
                <label htmlFor="weekendDays" className="block text-xs sm:text-sm font-semibold text-[#1E100A] mb-1">
                  Weekend days
                </label>
                <input
                  id="weekendDays"
                  name="weekendDays"
                  type="text"
                  placeholder="Sat-Sun"
                  value={formData.weekendDays}
                  onChange={handleChange}
                  className="w-full bg-[#FAF5EE] border border-[#DFCCAA] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-[#1E100A] focus:outline-none focus:border-[#C07A46] focus:ring-1 focus:ring-[#C07A46]"
                />
              </div>

              <div>
                <label htmlFor="weekendHours" className="block text-xs sm:text-sm font-semibold text-[#1E100A] mb-1">
                  Weekend hours
                </label>
                <input
                  id="weekendHours"
                  name="weekendHours"
                  type="text"
                  placeholder="9:00 am - 8:00 pm"
                  value={formData.weekendHours}
                  onChange={handleChange}
                  className="w-full bg-[#FAF5EE] border border-[#DFCCAA] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-[#1E100A] focus:outline-none focus:border-[#C07A46] focus:ring-1 focus:ring-[#C07A46]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="kitchenNotice" className="block text-xs sm:text-sm font-semibold text-[#1E100A] mb-1">
                Kitchen schedule notice
              </label>
              <input
                id="kitchenNotice"
                name="kitchenNotice"
                type="text"
                placeholder="Kitchen serves 11:00 am to 8:00 pm"
                value={formData.kitchenNotice}
                onChange={handleChange}
                className="w-full bg-[#FAF5EE] border border-[#DFCCAA] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-[#1E100A] focus:outline-none focus:border-[#C07A46] focus:ring-1 focus:ring-[#C07A46]"
              />
            </div>

            <div>
              <label htmlFor="allergyNotice" className="block text-xs sm:text-sm font-semibold text-[#1E100A] mb-1">
                Allergy & dietary notice
              </label>
              <textarea
                id="allergyNotice"
                name="allergyNotice"
                rows={2}
                placeholder="Please tell our team about any allergies. Plant-based options are available on request."
                value={formData.allergyNotice}
                onChange={handleChange}
                className="w-full bg-[#FAF5EE] border border-[#DFCCAA] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-[#1E100A] focus:outline-none focus:border-[#C07A46] focus:ring-1 focus:ring-[#C07A46]"
              />
            </div>
          </div>
        )}

        {/* STEP 3: CONTACT */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="border-b border-[#DFCCAA] pb-3 mb-4">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1E100A]">
                3. Contact & Location
              </h2>
              <p className="text-xs text-[#542F1E]">
                We use this to build your Google Maps directions and WhatsApp ordering links.
              </p>
            </div>

            <div>
              <label htmlFor="address" className="block text-xs sm:text-sm font-semibold text-[#1E100A] mb-1">
                Physical street address <span className="text-rose-600">*</span>
              </label>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="e.g. 123 Market Street, Brookside"
                value={formData.address}
                onChange={handleChange}
                className={`w-full bg-[#FAF5EE] border rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-[#1E100A] focus:outline-none focus:ring-1 focus:ring-[#C07A46] ${
                  errors.address ? "border-rose-500 focus:border-rose-500" : "border-[#DFCCAA] focus:border-[#C07A46]"
                }`}
              />
              {errors.address && <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-[#1E100A] mb-1">
                Email address <span className="text-rose-600">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="e.g. hello@cornercafe.example"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-[#FAF5EE] border rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-[#1E100A] focus:outline-none focus:ring-1 focus:ring-[#C07A46] ${
                  errors.email ? "border-rose-500 focus:border-rose-500" : "border-[#DFCCAA] focus:border-[#C07A46]"
                }`}
              />
              {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-[#1E100A] mb-1">
                Phone with country code (used for calls & WhatsApp) <span className="text-rose-600">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="e.g. +254 700 000 000 or +1 (555) 012-3456"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full bg-[#FAF5EE] border rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-[#1E100A] focus:outline-none focus:ring-1 focus:ring-[#C07A46] ${
                  errors.phone ? "border-rose-500 focus:border-rose-500" : "border-[#DFCCAA] focus:border-[#C07A46]"
                }`}
              />
              <p className="text-[11px] text-[#7A4B29] mt-1">
                Must start with + and include country code so WhatsApp chat links connect properly.
              </p>
              {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
            </div>
          </div>
        )}

        {/* STEP 4: SOCIALS */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <div className="border-b border-[#DFCCAA] pb-3 mb-4">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1E100A]">
                4. Social Media Links
              </h2>
              <p className="text-xs text-[#542F1E]">
                Connect your social accounts so visitors can explore your daily photos.
              </p>
            </div>

            <div>
              <label htmlFor="instagram" className="block text-xs sm:text-sm font-semibold text-[#1E100A] mb-1">
                Instagram URL
              </label>
              <input
                id="instagram"
                name="instagram"
                type="url"
                placeholder="https://instagram.com/yourcafe"
                value={formData.instagram}
                onChange={handleChange}
                className="w-full bg-[#FAF5EE] border border-[#DFCCAA] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-[#1E100A] focus:outline-none focus:border-[#C07A46] focus:ring-1 focus:ring-[#C07A46]"
              />
            </div>

            <div>
              <label htmlFor="facebook" className="block text-xs sm:text-sm font-semibold text-[#1E100A] mb-1">
                Facebook URL
              </label>
              <input
                id="facebook"
                name="facebook"
                type="url"
                placeholder="https://facebook.com/yourcafe"
                value={formData.facebook}
                onChange={handleChange}
                className="w-full bg-[#FAF5EE] border border-[#DFCCAA] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-[#1E100A] focus:outline-none focus:border-[#C07A46] focus:ring-1 focus:ring-[#C07A46]"
              />
            </div>

            <div>
              <label htmlFor="tiktok" className="block text-xs sm:text-sm font-semibold text-[#1E100A] mb-1">
                TikTok URL
              </label>
              <input
                id="tiktok"
                name="tiktok"
                type="url"
                placeholder="https://tiktok.com/@yourcafe"
                value={formData.tiktok}
                onChange={handleChange}
                className="w-full bg-[#FAF5EE] border border-[#DFCCAA] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-[#1E100A] focus:outline-none focus:border-[#C07A46] focus:ring-1 focus:ring-[#C07A46]"
              />
            </div>

            <div>
              <label htmlFor="twitter" className="block text-xs sm:text-sm font-semibold text-[#1E100A] mb-1">
                Twitter / X URL
              </label>
              <input
                id="twitter"
                name="twitter"
                type="url"
                placeholder="https://twitter.com/yourcafe"
                value={formData.twitter}
                onChange={handleChange}
                className="w-full bg-[#FAF5EE] border border-[#DFCCAA] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-[#1E100A] focus:outline-none focus:border-[#C07A46] focus:ring-1 focus:ring-[#C07A46]"
              />
            </div>
          </div>
        )}

        {/* STEP 5: SUMMARY */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="border-b border-[#DFCCAA] pb-3 mb-4">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1E100A]">
                5. Review Your Setup Summary
              </h2>
              <p className="text-xs text-[#542F1E]">
                Check your details before publishing. You can click any step to make quick edits.
              </p>
            </div>

            {/* Brand Summary */}
            <div className="bg-[#FAF5EE] rounded-2xl p-4 border border-[#DFCCAA]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif text-sm font-bold text-[#1E100A]">
                  Brand Information
                </h3>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-[#C07A46] hover:underline font-semibold"
                >
                  Edit
                </button>
              </div>
              <p className="text-sm font-semibold text-[#1E100A]">{formData.name}</p>
              <p className="text-xs text-[#542F1E] italic">{formData.tagline}</p>
              <p className="text-xs text-[#7A4B29] mt-1">{formData.heroBlurb}</p>
            </div>

            {/* Hours Summary */}
            <div className="bg-[#FAF5EE] rounded-2xl p-4 border border-[#DFCCAA]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif text-sm font-bold text-[#1E100A]">
                  Opening Schedule
                </h3>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-xs text-[#C07A46] hover:underline font-semibold"
                >
                  Edit
                </button>
              </div>
              <p className="text-xs text-[#1E100A]">
                <span className="font-semibold">{formData.weekdayDays}:</span> {formData.weekdayHours}
              </p>
              <p className="text-xs text-[#1E100A]">
                <span className="font-semibold">{formData.weekendDays}:</span> {formData.weekendHours}
              </p>
              <p className="text-xs text-[#7A4B29] mt-1">{formData.kitchenNotice}</p>
            </div>

            {/* Contact Summary */}
            <div className="bg-[#FAF5EE] rounded-2xl p-4 border border-[#DFCCAA]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif text-sm font-bold text-[#1E100A]">
                  Contact & Location
                </h3>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="text-xs text-[#C07A46] hover:underline font-semibold"
                >
                  Edit
                </button>
              </div>
              <p className="text-xs text-[#1E100A]">
                <span className="font-semibold">Address:</span> {formData.address}
              </p>
              <p className="text-xs text-[#1E100A]">
                <span className="font-semibold">Email:</span> {formData.email}
              </p>
              <p className="text-xs text-[#1E100A]">
                <span className="font-semibold">Phone:</span> {formData.phone}
              </p>
            </div>

            {/* Socials Summary */}
            <div className="bg-[#FAF5EE] rounded-2xl p-4 border border-[#DFCCAA]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif text-sm font-bold text-[#1E100A]">
                  Social Media Links
                </h3>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="text-xs text-[#C07A46] hover:underline font-semibold"
                >
                  Edit
                </button>
              </div>
              <p className="text-xs text-[#542F1E] truncate">
                <span className="font-semibold text-[#1E100A]">Instagram:</span> {formData.instagram}
              </p>
              <p className="text-xs text-[#542F1E] truncate">
                <span className="font-semibold text-[#1E100A]">Facebook:</span> {formData.facebook}
              </p>
              <p className="text-xs text-[#542F1E] truncate">
                <span className="font-semibold text-[#1E100A]">TikTok:</span> {formData.tiktok}
              </p>
            </div>
          </div>
        )}

        {/* Buttons Row */}
        <div className="flex items-center justify-between pt-6 border-t border-[#DFCCAA] mt-6">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-5 py-2.5 bg-[#FAF5EE] hover:bg-[#DFCCAA]/60 text-[#1E100A] text-xs sm:text-sm font-semibold rounded-full border border-[#DFCCAA] transition-colors"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 bg-[#C07A46] hover:bg-[#A96434] text-white text-xs sm:text-sm font-semibold rounded-full shadow-sm hover:shadow transition-all"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSaveAndView}
              className="px-7 py-3 bg-[#1E100A] hover:bg-[#C07A46] text-[#FAF5EE] text-xs sm:text-sm font-semibold rounded-full shadow-md hover:shadow-xl transition-all"
            >
              Save and view site
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
