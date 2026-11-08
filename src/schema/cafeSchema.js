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

  // 1. Brand & hero images (tolerates missing sections or alternative key names)
  const brandSource =
    old.brand && typeof old.brand === "object" ? old.brand : {};
  const rawHeroSlides = brandSource.heroImages || brandSource.heroSlides;
  const heroImages = Array.isArray(rawHeroSlides)
    ? rawHeroSlides.map((slide) => toImage(slide, slide?.alt || ""))
    : [];

  const brand = {
    name: typeof brandSource.name === "string" ? brandSource.name : "",
    tagline: typeof brandSource.tagline === "string" ? brandSource.tagline : "",
    heroBlurb:
      typeof brandSource.heroBlurb === "string" ? brandSource.heroBlurb : "",
    heroBlurbShort:
      typeof brandSource.heroBlurbShort === "string"
        ? brandSource.heroBlurbShort
        : "",
    blurb: typeof brandSource.blurb === "string" ? brandSource.blurb : "",
    heroImages,
  };

  // 2. Hours (lines kept, display dropped)
  const hoursSource =
    old.hours && typeof old.hours === "object" ? old.hours : {};
  const hours = {
    lines: Array.isArray(hoursSource.lines)
      ? hoursSource.lines.map((line) => ({
          days: typeof line?.days === "string" ? line.days : "",
          hours: typeof line?.hours === "string" ? line.hours : "",
        }))
      : [],
    kitchenNotice:
      typeof hoursSource.kitchenNotice === "string"
        ? hoursSource.kitchenNotice
        : "",
    allergyNotice:
      typeof hoursSource.allergyNotice === "string"
        ? hoursSource.allergyNotice
        : "",
  };

  // 3. Contact (phone normalized, phoneRaw/mapsUrl/whatsappUrl dropped)
  const contactSource =
    old.contact && typeof old.contact === "object" ? old.contact : {};
  const contact = {
    address:
      typeof contactSource.address === "string" ? contactSource.address : "",
    email: typeof contactSource.email === "string" ? contactSource.email : "",
    phone: normalizePhone(contactSource.phone || ""),
    mapEmbedUrl:
      typeof contactSource.mapEmbedUrl === "string"
        ? contactSource.mapEmbedUrl
        : "",
  };

  // 4. Socials [{ name, href }] -> [{ platform, url }]
  const rawSocials = Array.isArray(old.socials) ? old.socials : [];
  const socials = rawSocials.map((s) => ({
    platform:
      typeof s?.platform === "string"
        ? s.platform.toLowerCase()
        : typeof s?.name === "string"
        ? s.name.toLowerCase()
        : "",
    url:
      typeof s?.url === "string"
        ? s.url
        : typeof s?.href === "string"
        ? s.href
        : "",
  }));

  // 5. About
  const aboutSource =
    old.about && typeof old.about === "object" ? old.about : {};
  const about = {
    historyTitle:
      typeof aboutSource.historyTitle === "string"
        ? aboutSource.historyTitle
        : "",
    historyText:
      typeof aboutSource.historyText === "string" ? aboutSource.historyText : "",
    principles: Array.isArray(aboutSource.principles)
      ? aboutSource.principles.map((p) => ({
          title: typeof p?.title === "string" ? p.title : "",
          description: typeof p?.description === "string" ? p.description : "",
        }))
      : [],
  };

  // 6. Menu categories & items (tolerates top-level or nested sections)
  const rawMenuCats = Array.isArray(old.menuCategories)
    ? old.menuCategories
    : Array.isArray(old.menu?.categories)
    ? old.menu.categories
    : [];

  const menuCategories = rawMenuCats.map((cat) => {
    if (cat && typeof cat === "object") {
      return {
        id:
          typeof cat.id === "string" && cat.id
            ? cat.id
            : slugifyId(cat.name, "cat"),
        name: String(cat.name || "").trim(),
      };
    }
    return {
      id: slugifyId(cat, "cat"),
      name: String(cat).trim(),
    };
  });

  const categoryLookup = new Map(
    menuCategories.map((c) => [c.name.toLowerCase(), c.id])
  );

  const rawMenuItems = Array.isArray(old.menuItems)
    ? old.menuItems
    : Array.isArray(old.menu?.items)
    ? old.menu.items
    : [];

  const menuItems = rawMenuItems.map((item) => {
    const catKey = String(item?.category || "").trim().toLowerCase();
    const categoryId = item?.categoryId || categoryLookup.get(catKey) || "";
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
  });

  // 7. Highlights (chefsPicks by menuItemId, menuHighlights by id)
  const validMenuItemIds = new Set(menuItems.map((item) => item.id));

  const rawChefsPicks = Array.isArray(old.chefsPicks)
    ? old.chefsPicks
    : Array.isArray(old.highlights?.chefsPicks)
    ? old.highlights.chefsPicks
    : [];

  const chefsPicks = [];
  for (const pick of rawChefsPicks) {
    const targetId =
      pick && typeof pick === "object" ? pick.menuItemId || pick.id : pick;
    if (typeof targetId === "string" && validMenuItemIds.has(targetId)) {
      chefsPicks.push(targetId);
    }
  }

  const rawHighlights = Array.isArray(old.menuHighlights)
    ? old.menuHighlights
    : Array.isArray(old.highlights?.menuHighlights)
    ? old.highlights.menuHighlights
    : [];

  const menuHighlights = [];
  for (const h of rawHighlights) {
    const targetId = h && typeof h === "object" ? h.id : h;
    if (typeof targetId === "string" && validMenuItemIds.has(targetId)) {
      menuHighlights.push(targetId);
    }
  }

  // 8. Gallery categories & items
  const rawGalleryCats = Array.isArray(old.galleryCategories)
    ? old.galleryCategories
    : Array.isArray(old.gallery?.categories)
    ? old.gallery.categories
    : [];

  const galleryCategories = rawGalleryCats.map((cat) => {
    if (cat && typeof cat === "object") {
      return {
        id:
          typeof cat.id === "string" && cat.id
            ? cat.id
            : slugifyId(cat.name, "gal"),
        name: String(cat.name || "").trim(),
      };
    }
    return {
      id: slugifyId(cat, "gal"),
      name: String(cat).trim(),
    };
  });

  const galleryCategoryLookup = new Map(
    galleryCategories.map((c) => [c.name.toLowerCase(), c.id])
  );

  const rawGalleryItems = Array.isArray(old.gallery)
    ? old.gallery
    : Array.isArray(old.gallery?.items)
    ? old.gallery.items
    : [];

  const galleryItems = rawGalleryItems.map((item) => {
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
  });

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

export function migrateLegacySaved(saved) {
  if (!saved || typeof saved !== "object" || Array.isArray(saved)) {
    return {};
  }

  const result = {};

  if (
    saved.brand &&
    typeof saved.brand === "object" &&
    !Array.isArray(saved.brand)
  ) {
    const brand = {};
    if ("name" in saved.brand && saved.brand.name !== undefined) {
      brand.name = saved.brand.name;
    }
    if ("tagline" in saved.brand && saved.brand.tagline !== undefined) {
      brand.tagline = saved.brand.tagline;
    }
    if ("heroBlurb" in saved.brand && saved.brand.heroBlurb !== undefined) {
      brand.heroBlurb = saved.brand.heroBlurb;
    }
    if ("blurb" in saved.brand && saved.brand.blurb !== undefined) {
      brand.blurb = saved.brand.blurb;
    }
    if (Object.keys(brand).length > 0) {
      result.brand = brand;
    }
  }

  if (
    saved.hours &&
    typeof saved.hours === "object" &&
    !Array.isArray(saved.hours)
  ) {
    const hours = {};
    if ("lines" in saved.hours && Array.isArray(saved.hours.lines)) {
      hours.lines = saved.hours.lines.map((l) => ({
        days: l?.days !== undefined ? String(l.days) : "",
        hours: l?.hours !== undefined ? String(l.hours) : "",
      }));
    }
    if (
      "kitchenNotice" in saved.hours &&
      saved.hours.kitchenNotice !== undefined
    ) {
      hours.kitchenNotice = saved.hours.kitchenNotice;
    }
    if (
      "allergyNotice" in saved.hours &&
      saved.hours.allergyNotice !== undefined
    ) {
      hours.allergyNotice = saved.hours.allergyNotice;
    }
    // Drop display
    if (Object.keys(hours).length > 0) {
      result.hours = hours;
    }
  }

  if (
    saved.contact &&
    typeof saved.contact === "object" &&
    !Array.isArray(saved.contact)
  ) {
    const contact = {};
    if ("address" in saved.contact && saved.contact.address !== undefined) {
      contact.address = saved.contact.address;
    }
    if ("email" in saved.contact && saved.contact.email !== undefined) {
      contact.email = saved.contact.email;
    }
    if ("phone" in saved.contact && saved.contact.phone !== undefined) {
      contact.phone = normalizePhone(saved.contact.phone);
    }
    // Drop phoneRaw, mapsUrl, whatsappUrl, mapEmbedUrl
    if (Object.keys(contact).length > 0) {
      result.contact = contact;
    }
  }

  if (Array.isArray(saved.socials)) {
    result.socials = saved.socials.map((s) => {
      const platform = String(s?.platform || s?.name || "").toLowerCase();
      const url =
        typeof s?.url === "string"
          ? s.url
          : typeof s?.href === "string"
          ? s.href
          : "";
      return { platform, url };
    });
  }

  return result;
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

