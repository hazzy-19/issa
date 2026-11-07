import React, { createContext, useContext, useState, useEffect } from "react";
import { sampleCafe } from "../../schema/sampleCafe";

const CAFE_STORAGE_KEY = "cafe_custom_data";
const CAFE_HAS_SAVED_KEY = "cafe_has_saved";

const CafeContext = createContext(null);

export function CafeProvider({ children }) {
  const [hasSaved, setHasSaved] = useState(() => {
    try {
      return localStorage.getItem(CAFE_HAS_SAVED_KEY) === "true";
    } catch {
      return false;
    }
  });

  const [cafe, setCafe] = useState(() => {
    try {
      const saved = localStorage.getItem(CAFE_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...sampleCafe,
          ...parsed,
          brand: { ...sampleCafe.brand, ...(parsed.brand || {}) },
          hours: { ...sampleCafe.hours, ...(parsed.hours || {}) },
          contact: { ...sampleCafe.contact, ...(parsed.contact || {}) },
          socials: parsed.socials || sampleCafe.socials,
        };
      }
    } catch {
      // Fallback to initial cafe data if parsing fails
    }
    return sampleCafe;
  });

  const saveCafeData = (newData) => {
    try {
      // Clean phone digits for raw phone and WhatsApp link
      const phoneRaw = (newData.contact?.phone || cafe.contact.phone || "").replace(/[^0-9]/g, "");
      const address = newData.contact?.address || cafe.contact.address || "";
      const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
      const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
      const whatsappUrl = `https://wa.me/${phoneRaw}`;

      // Format display hours line
      const lines = newData.hours?.lines || cafe.hours.lines;
      const displayHours = lines.map((l) => `${l.days} ${l.hours}`).join(", ");

      const mergedData = {
        ...cafe,
        brand: {
          ...cafe.brand,
          ...(newData.brand || {}),
        },
        hours: {
          ...cafe.hours,
          ...(newData.hours || {}),
          display: displayHours || cafe.hours.display,
          lines,
        },
        contact: {
          ...cafe.contact,
          ...(newData.contact || {}),
          phoneRaw,
          mapsUrl,
          mapEmbedUrl,
          whatsappUrl,
        },
        socials: newData.socials || cafe.socials,
      };

      localStorage.setItem(CAFE_STORAGE_KEY, JSON.stringify(mergedData));
      localStorage.setItem(CAFE_HAS_SAVED_KEY, "true");
      setCafe(mergedData);
      setHasSaved(true);
      return mergedData;
    } catch (err) {
      console.error("Error saving cafe data to localStorage", err);
      return cafe;
    }
  };

  const resetCafeData = () => {
    try {
      localStorage.removeItem(CAFE_STORAGE_KEY);
      localStorage.removeItem(CAFE_HAS_SAVED_KEY);
      setCafe(sampleCafe);
      setHasSaved(false);
    } catch (err) {
      console.error("Error resetting cafe data", err);
    }
  };

  return (
    <CafeContext.Provider
      value={{
        cafe,
        hasSaved,
        saveCafeData,
        resetCafeData,
      }}
    >
      {children}
    </CafeContext.Provider>
  );
}

export function useCafe() {
  const context = useContext(CafeContext);
  if (!context) {
    throw new Error("useCafe must be used within a CafeProvider");
  }
  return context;
}
