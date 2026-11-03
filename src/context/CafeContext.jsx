import React, { createContext, useContext, useState, useEffect } from "react";
import { cafeData as initialCafeData } from "../data/cafe";

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

  const [cafeData, setCafeData] = useState(() => {
    try {
      const saved = localStorage.getItem(CAFE_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialCafeData,
          ...parsed,
          brand: { ...initialCafeData.brand, ...(parsed.brand || {}) },
          hours: { ...initialCafeData.hours, ...(parsed.hours || {}) },
          contact: { ...initialCafeData.contact, ...(parsed.contact || {}) },
          socials: parsed.socials || initialCafeData.socials,
        };
      }
    } catch {
      // Fallback to initial cafe data if parsing fails
    }
    return initialCafeData;
  });

  const saveCafeData = (newData) => {
    try {
      // Clean phone digits for raw phone and WhatsApp link
      const phoneRaw = (newData.contact?.phone || cafeData.contact.phone || "").replace(/[^0-9]/g, "");
      const address = newData.contact?.address || cafeData.contact.address || "";
      const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
      const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
      const whatsappUrl = `https://wa.me/${phoneRaw}`;

      // Format display hours line
      const lines = newData.hours?.lines || cafeData.hours.lines;
      const displayHours = lines.map((l) => `${l.days} ${l.hours}`).join(", ");

      const mergedData = {
        ...cafeData,
        brand: {
          ...cafeData.brand,
          ...(newData.brand || {}),
        },
        hours: {
          ...cafeData.hours,
          ...(newData.hours || {}),
          display: displayHours || cafeData.hours.display,
          lines,
        },
        contact: {
          ...cafeData.contact,
          ...(newData.contact || {}),
          phoneRaw,
          mapsUrl,
          mapEmbedUrl,
          whatsappUrl,
        },
        socials: newData.socials || cafeData.socials,
      };

      localStorage.setItem(CAFE_STORAGE_KEY, JSON.stringify(mergedData));
      localStorage.setItem(CAFE_HAS_SAVED_KEY, "true");
      setCafeData(mergedData);
      setHasSaved(true);
      return mergedData;
    } catch (err) {
      console.error("Error saving cafe data to localStorage", err);
      return cafeData;
    }
  };

  const resetCafeData = () => {
    try {
      localStorage.removeItem(CAFE_STORAGE_KEY);
      localStorage.removeItem(CAFE_HAS_SAVED_KEY);
      setCafeData(initialCafeData);
      setHasSaved(false);
    } catch (err) {
      console.error("Error resetting cafe data", err);
    }
  };

  return (
    <CafeContext.Provider
      value={{
        cafeData,
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
