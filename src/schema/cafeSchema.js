/**
 * Cafe Record Schema and Normalization Utilities
 *
 * Canonical Record Shape:
 * {
 *   schemaVersion: 1,
 *   slug: "",
 *   templateId: "classic",
 *   ownerUid: null,
 *   createdAt: null,
 *   updatedAt: null,
 *   brand: {
 *     name: "",
 *     tagline: "",
 *     heroBlurb: "",
 *     heroBlurbShort: "",
 *     blurb: "",
 *     heroImages: [Image]
 *   },
 *   hours: {
 *     lines: [{ days, hours }],
 *     kitchenNotice: "",
 *     allergyNotice: ""
 *   },
 *   contact: {
 *     address: "",
 *     email: "",
 *     phone: "",
 *     mapEmbedUrl: ""
 *   },
 *   socials: [{ platform, url }],
 *   about: {
 *     historyTitle: "",
 *     historyText: "",
 *     principles: [{ title, description }]
 *   },
 *   menu: {
 *     categories: [{ id, name }],
 *     items: [{ id, categoryId, name, price, description, dietaryTag, image }]
 *   },
 *   highlights: {
 *     chefsPicks: [menuItemId],
 *     menuHighlights: [menuItemId]
 *   },
 *   gallery: {
 *     categories: [{ id, name }],
 *     items: [{ id, title, categoryId, aspect, image }]
 *   }
 * }
 *
 * Image = { url, alt, focalX, focalY } (focalX and focalY default to 0.5)
 * Navigation is not part of the cafe record.
 */

export const RESERVED_SLUGS = Object.freeze([
  "onboard",
  "dashboard",
  "login",
  "admin",
  "api",
  "welcome",
  "setup",
  "menu",
  "gallery",
]);

export const DEFAULT_IMAGE = Object.freeze({
  url: "",
  alt: "",
  focalX: 0.5,
  focalY: 0.5,
});

export const DEFAULT_CAFE = Object.freeze({
  schemaVersion: 1,
  slug: "",
  templateId: "classic",
  ownerUid: null,
  createdAt: null,
  updatedAt: null,
  brand: Object.freeze({
    name: "",
    tagline: "",
    heroBlurb: "",
    heroBlurbShort: "",
    blurb: "",
    heroImages: Object.freeze([]),
  }),
  hours: Object.freeze({
    lines: Object.freeze([]),
    kitchenNotice: "",
    allergyNotice: "",
  }),
  contact: Object.freeze({
    address: "",
    email: "",
    phone: "",
    mapEmbedUrl: "",
  }),
  socials: Object.freeze([]),
  about: Object.freeze({
    historyTitle: "",
    historyText: "",
    principles: Object.freeze([]),
  }),
  menu: Object.freeze({
    categories: Object.freeze([]),
    items: Object.freeze([]),
  }),
  highlights: Object.freeze({
    chefsPicks: Object.freeze([]),
    menuHighlights: Object.freeze([]),
  }),
  gallery: Object.freeze({
    categories: Object.freeze([]),
    items: Object.freeze([]),
  }),
});

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function slugifyId(text, prefix = "cat") {
  const clean = String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return clean ? `${prefix}-${clean}` : `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

export function toImage(img, fallbackAlt = "") {
  if (!img) {
    return { url: "", alt: fallbackAlt, focalX: 0.5, focalY: 0.5 };
  }
  if (typeof img === "string") {
    return { url: img, alt: fallbackAlt, focalX: 0.5, focalY: 0.5 };
  }
  return {
    url: typeof img.url === "string" ? img.url : "",
    alt: typeof img.alt === "string" ? img.alt : fallbackAlt,
    focalX:
      typeof img.focalX === "number" && !Number.isNaN(img.focalX) ? img.focalX : 0.5,
    focalY:
      typeof img.focalY === "number" && !Number.isNaN(img.focalY) ? img.focalY : 0.5,
  };
}

export function normalizePhone(raw) {
  if (!raw || typeof raw !== "string") return "";
  let digits = raw.replace(/\D/g, "");
  if (!digits) return "";

  // Strip leading trunk zero after international country code (e.g. 2540 -> 254)
  if (digits.startsWith("2540")) {
    digits = "254" + digits.slice(4);
  } else if (/^(\d{1,4})0(\d{6,})$/.test(digits) && raw.includes("0")) {
    const match = raw.match(/\(?(\d{1,4})\)?\s*0(\d+)/);
    if (match) {
      digits = match[1] + match[2].replace(/\D/g, "");
    }
  }

  return "+" + digits;
}

export function getLegacyUnmatched(old) {
  if (!old || typeof old !== "object") {
    return { chefsPicks: [], menuHighlights: [] };
  }
  const validIds = new Set(
    Array.isArray(old.menuItems)
      ? old.menuItems.map((m) => m?.id).filter(Boolean)
      : []
  );

  const chefsPicks = [];
  if (Array.isArray(old.chefsPicks)) {
    for (const p of old.chefsPicks) {
      const id = p?.menuItemId || p?.id;
      if (!id || !validIds.has(id)) {
        chefsPicks.push(p);
      }
    }
  }

  const menuHighlights = [];
  if (Array.isArray(old.menuHighlights)) {
    for (const h of old.menuHighlights) {
      const id = h?.id;
      if (!id || !validIds.has(id)) {
        menuHighlights.push(h);
      }
    }
  }

  return { chefsPicks, menuHighlights };
}

export function fromLegacy(old) {
  if (!old || typeof old !== "object") {
    return deepClone(DEFAULT_CAFE);
  }

  // 1. Brand & hero images
  const heroImages = Array.isArray(old.brand?.heroSlides)
    ? old.brand.heroSlides.map((slide) => toImage(slide, slide?.alt || ""))
    : [];

  const brand = {
    name: typeof old.brand?.name === "string" ? old.brand.name : "",
    tagline: typeof old.brand?.tagline === "string" ? old.brand.tagline : "",
    heroBlurb: typeof old.brand?.heroBlurb === "string" ? old.brand.heroBlurb : "",
    heroBlurbShort:
      typeof old.brand?.heroBlurbShort === "string" ? old.brand.heroBlurbShort : "",
    blurb: typeof old.brand?.blurb === "string" ? old.brand.blurb : "",
    heroImages,
  };

  // 2. Hours (lines kept, display dropped)
  const hours = {
    lines: Array.isArray(old.hours?.lines)
      ? old.hours.lines.map((line) => ({
          days: typeof line?.days === "string" ? line.days : "",
          hours: typeof line?.hours === "string" ? line.hours : "",
        }))
      : [],
    kitchenNotice:
      typeof old.hours?.kitchenNotice === "string" ? old.hours.kitchenNotice : "",
    allergyNotice:
      typeof old.hours?.allergyNotice === "string" ? old.hours.allergyNotice : "",
  };

  // 3. Contact (phone normalized, phoneRaw/mapsUrl/whatsappUrl dropped)
  const contact = {
    address: typeof old.contact?.address === "string" ? old.contact.address : "",
    email: typeof old.contact?.email === "string" ? old.contact.email : "",
    phone: normalizePhone(old.contact?.phone || ""),
    mapEmbedUrl:
      typeof old.contact?.mapEmbedUrl === "string" ? old.contact.mapEmbedUrl : "",
  };

  // 4. Socials [{ name, href }] -> [{ platform, url }]
  const socials = Array.isArray(old.socials)
    ? old.socials.map((s) => ({
        platform:
          typeof s?.platform === "string"
            ? s.platform
            : typeof s?.name === "string"
            ? s.name
            : "",
        url:
          typeof s?.url === "string"
            ? s.url
            : typeof s?.href === "string"
            ? s.href
            : "",
      }))
    : [];

  // 5. About
  const about = {
    historyTitle:
      typeof old.about?.historyTitle === "string" ? old.about.historyTitle : "",
    historyText:
      typeof old.about?.historyText === "string" ? old.about.historyText : "",
    principles: Array.isArray(old.about?.principles)
      ? old.about.principles.map((p) => ({
          title: typeof p?.title === "string" ? p.title : "",
          description: typeof p?.description === "string" ? p.description : "",
        }))
      : [],
  };

  // 6. Menu categories & items
  const menuCategories = Array.isArray(old.menuCategories)
    ? old.menuCategories.map((name) => ({
        id: slugifyId(name, "cat"),
        name: String(name).trim(),
      }))
    : [];

  const categoryLookup = new Map(
    menuCategories.map((c) => [c.name.toLowerCase(), c.id])
  );

  const menuItems = Array.isArray(old.menuItems)
    ? old.menuItems.map((item) => {
        const catKey = String(item?.category || "").trim().toLowerCase();
        const categoryId =
          item?.categoryId || categoryLookup.get(catKey) || "";
        return {
          id: typeof item?.id === "string" ? item.id : "",
          categoryId,
          name: typeof item?.name === "string" ? item.name : "",
          price: item?.price !== undefined ? item.price : "",
          description:
            typeof item?.description === "string" ? item.description : "",
          dietaryTag:
            typeof item?.dietaryTag === "string" ? item.dietaryTag : "",
          image: toImage(item?.image, item?.name || ""),
        };
      })
    : [];

  // 7. Highlights (chefsPicks by menuItemId, menuHighlights by id)
  const validMenuItemIds = new Set(menuItems.map((item) => item.id));

  const chefsPicks = [];
  if (Array.isArray(old.chefsPicks)) {
    for (const pick of old.chefsPicks) {
      const targetId =
        pick && typeof pick === "object" ? pick.menuItemId || pick.id : pick;
      if (typeof targetId === "string" && validMenuItemIds.has(targetId)) {
        chefsPicks.push(targetId);
      }
    }
  }

  const menuHighlights = [];
  if (Array.isArray(old.menuHighlights)) {
    for (const h of old.menuHighlights) {
      const targetId = h && typeof h === "object" ? h.id : h;
      if (typeof targetId === "string" && validMenuItemIds.has(targetId)) {
        menuHighlights.push(targetId);
      }
    }
  }

  // 8. Gallery categories & items
  const galleryCategories = Array.isArray(old.galleryCategories)
    ? old.galleryCategories.map((name) => ({
        id: slugifyId(name, "gal"),
        name: String(name).trim(),
      }))
    : [];

  const galleryCategoryLookup = new Map(
    galleryCategories.map((c) => [c.name.toLowerCase(), c.id])
  );

  const galleryItems = Array.isArray(old.gallery)
    ? old.gallery.map((item) => {
        const catKey = String(item?.category || "").trim().toLowerCase();
        const categoryId =
          item?.categoryId || galleryCategoryLookup.get(catKey) || "";
        return {
          id: typeof item?.id === "string" ? item.id : "",
          title: typeof item?.title === "string" ? item.title : "",
          categoryId,
          aspect: typeof item?.aspect === "string" ? item.aspect : "",
          image: toImage(item?.image, item?.title || ""),
        };
      })
    : [];

  return {
    schemaVersion: 1,
    slug: typeof old.slug === "string" ? old.slug : "",
    templateId:
      typeof old.templateId === "string" && old.templateId
        ? old.templateId
        : "classic",
    ownerUid: typeof old.ownerUid === "string" ? old.ownerUid : null,
    createdAt: typeof old.createdAt === "string" ? old.createdAt : null,
    updatedAt: typeof old.updatedAt === "string" ? old.updatedAt : null,
    brand,
    hours,
    contact,
    socials,
    about,
    menu: {
      categories: menuCategories,
      items: menuItems,
    },
    highlights: {
      chefsPicks,
      menuHighlights,
    },
    gallery: {
      categories: galleryCategories,
      items: galleryItems,
    },
  };
}

export function normalizeCafe(input) {
  try {
    if (!input || typeof input !== "object") {
      return deepClone(DEFAULT_CAFE);
    }

    let source = input;
    if (!("schemaVersion" in source) && Array.isArray(source.menuItems)) {
      source = fromLegacy(source);
    }

    const brand =
      source.brand && typeof source.brand === "object" ? source.brand : {};
    const hours =
      source.hours && typeof source.hours === "object" ? source.hours : {};
    const contact =
      source.contact && typeof source.contact === "object" ? source.contact : {};
    const about =
      source.about && typeof source.about === "object" ? source.about : {};
    const menu =
      source.menu && typeof source.menu === "object" ? source.menu : {};
    const highlights =
      source.highlights && typeof source.highlights === "object"
        ? source.highlights
        : {};
    const gallery =
      source.gallery && typeof source.gallery === "object" ? source.gallery : {};

    return {
      schemaVersion: 1,
      slug: typeof source.slug === "string" ? source.slug : DEFAULT_CAFE.slug,
      templateId:
        typeof source.templateId === "string" && source.templateId
          ? source.templateId
          : DEFAULT_CAFE.templateId,
      ownerUid:
        typeof source.ownerUid === "string"
          ? source.ownerUid
          : DEFAULT_CAFE.ownerUid,
      createdAt:
        typeof source.createdAt === "string"
          ? source.createdAt
          : DEFAULT_CAFE.createdAt,
      updatedAt:
        typeof source.updatedAt === "string"
          ? source.updatedAt
          : DEFAULT_CAFE.updatedAt,
      brand: {
        name: typeof brand.name === "string" ? brand.name : "",
        tagline: typeof brand.tagline === "string" ? brand.tagline : "",
        heroBlurb: typeof brand.heroBlurb === "string" ? brand.heroBlurb : "",
        heroBlurbShort:
          typeof brand.heroBlurbShort === "string" ? brand.heroBlurbShort : "",
        blurb: typeof brand.blurb === "string" ? brand.blurb : "",
        heroImages: Array.isArray(brand.heroImages)
          ? brand.heroImages.map((img) => toImage(img))
          : [],
      },
      hours: {
        lines: Array.isArray(hours.lines)
          ? hours.lines.map((line) => ({
              days: typeof line?.days === "string" ? line.days : "",
              hours: typeof line?.hours === "string" ? line.hours : "",
            }))
          : [],
        kitchenNotice:
          typeof hours.kitchenNotice === "string" ? hours.kitchenNotice : "",
        allergyNotice:
          typeof hours.allergyNotice === "string" ? hours.allergyNotice : "",
      },
      contact: {
        address: typeof contact.address === "string" ? contact.address : "",
        email: typeof contact.email === "string" ? contact.email : "",
        phone: typeof contact.phone === "string" ? contact.phone : "",
        mapEmbedUrl:
          typeof contact.mapEmbedUrl === "string" ? contact.mapEmbedUrl : "",
      },
      socials: Array.isArray(source.socials)
        ? source.socials.map((s) => ({
            platform:
              typeof s?.platform === "string"
                ? s.platform
                : typeof s?.name === "string"
                ? s.name
                : "",
            url:
              typeof s?.url === "string"
                ? s.url
                : typeof s?.href === "string"
                ? s.href
                : "",
          }))
        : [],
      about: {
        historyTitle:
          typeof about.historyTitle === "string" ? about.historyTitle : "",
        historyText:
          typeof about.historyText === "string" ? about.historyText : "",
        principles: Array.isArray(about.principles)
          ? about.principles.map((p) => ({
              title: typeof p?.title === "string" ? p.title : "",
              description:
                typeof p?.description === "string" ? p.description : "",
            }))
          : [],
      },
      menu: {
        categories: Array.isArray(menu.categories)
          ? menu.categories.map((c) => ({
              id: typeof c?.id === "string" ? c.id : "",
              name: typeof c?.name === "string" ? c.name : "",
            }))
          : [],
        items: Array.isArray(menu.items)
          ? menu.items.map((i) => ({
              id: typeof i?.id === "string" ? i.id : "",
              categoryId: typeof i?.categoryId === "string" ? i.categoryId : "",
              name: typeof i?.name === "string" ? i.name : "",
              price: i?.price !== undefined ? i.price : "",
              description:
                typeof i?.description === "string" ? i.description : "",
              dietaryTag:
                typeof i?.dietaryTag === "string" ? i.dietaryTag : "",
              image: toImage(i?.image, i?.name || ""),
            }))
          : [],
      },
      highlights: {
        chefsPicks: Array.isArray(highlights.chefsPicks)
          ? highlights.chefsPicks.filter((id) => typeof id === "string")
          : [],
        menuHighlights: Array.isArray(highlights.menuHighlights)
          ? highlights.menuHighlights.filter((id) => typeof id === "string")
          : [],
      },
      gallery: {
        categories: Array.isArray(gallery.categories)
          ? gallery.categories.map((c) => ({
              id: typeof c?.id === "string" ? c.id : "",
              name: typeof c?.name === "string" ? c.name : "",
            }))
          : [],
        items: Array.isArray(gallery.items)
          ? gallery.items.map((g) => ({
              id: typeof g?.id === "string" ? g.id : "",
              title: typeof g?.title === "string" ? g.title : "",
              categoryId: typeof g?.categoryId === "string" ? g.categoryId : "",
              aspect: typeof g?.aspect === "string" ? g.aspect : "",
              image: toImage(g?.image, g?.title || ""),
            }))
          : [],
      },
    };
  } catch (err) {
    return deepClone(DEFAULT_CAFE);
  }
}

// Derived helpers (pure functions, nothing stored)

export function getHoursDisplay(hours) {
  if (!hours || !Array.isArray(hours.lines) || hours.lines.length === 0) {
    return "";
  }
  return hours.lines
    .filter((line) => line && (line.days || line.hours))
    .map((line) => `${line.days || ""} ${line.hours || ""}`.trim())
    .join(", ");
}

export function getPhoneDigits(phone) {
  return typeof phone === "string" ? phone.replace(/\D/g, "") : "";
}

export function getTelUrl(phone) {
  return phone ? `tel:${phone}` : "";
}

export function getWhatsappUrl(phone) {
  const digits = getPhoneDigits(phone);
  return digits ? `https://wa.me/${digits}` : "";
}

export function getMapsUrl(address) {
  return address ? `https://maps.google.com/?q=${encodeURIComponent(address)}` : "";
}

export function getCopyrightYear() {
  return new Date().getFullYear();
}

// Validators

export function isValidPhone(phone) {
  return typeof phone === "string" && /^\+[0-9]{8,15}$/.test(phone);
}

export function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidSlug(slug) {
  return (
    typeof slug === "string" &&
    /^[a-z0-9-]{3,40}$/.test(slug) &&
    !RESERVED_SLUGS.includes(slug.toLowerCase())
  );
}

