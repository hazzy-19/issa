import React, { createContext, useContext, useState } from "react";
import { sampleCafe } from "../../schema/sampleCafe";
import { normalizeCafe, migrateLegacySaved } from "../../schema/cafeSchema";

const CAFE_STORAGE_KEY = "cafe_custom_data";
const CAFE_HAS_SAVED_KEY = "cafe_has_saved";

const CafeContext = createContext(null);

function mergeSectionBySection(base, saved) {
  if (!saved || typeof saved !== "object") return base;
  const merged = { ...base };
  for (const [key, val] of Object.entries(saved)) {
    if (val === undefined || val === null) continue;
    if (
      typeof val === "object" &&
      !Array.isArray(val) &&
      typeof base[key] === "object" &&
      !Array.isArray(base[key])
    ) {
      merged[key] = { ...base[key], ...val };
    } else {
      merged[key] = val;
    }
  }
  return merged;
}

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
        const savedData =
          parsed && typeof parsed === "object" && !("schemaVersion" in parsed)
            ? migrateLegacySaved(parsed)
            : parsed;
        const merged = mergeSectionBySection(sampleCafe, savedData);
        return normalizeCafe(merged);
      }
    } catch {
      // Fallback to initial cafe data if parsing fails
    }
    return sampleCafe;
  });

  const saveCafeData = (payload) => {
    try {
      const savedData =
        payload && typeof payload === "object" && !("schemaVersion" in payload)
          ? migrateLegacySaved(payload)
          : payload;

      const merged = mergeSectionBySection(cafe, savedData);
      const normalized = normalizeCafe(merged);

      localStorage.setItem(CAFE_STORAGE_KEY, JSON.stringify(normalized));
      localStorage.setItem(CAFE_HAS_SAVED_KEY, "true");
      setCafe(normalized);
      setHasSaved(true);
      return normalized;
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
