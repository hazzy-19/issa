import { create } from 'zustand';
import { client } from '../sanity/client';

export interface Category {
  id: string;
  name: string;
  parentId: string | null;
  slug: string;
  tileImage?: string;
  manualHide: boolean;
  tone?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  primaryCategoryId: string;
  alsoShowInIds?: string[];
  price: number;
  oldPrice?: number;
  tag: string;
  description: string;
  fullDescription?: any;
  tone?: string;
  details?: {
    fabric?: string;
    care?: string;
    fitNotes?: string;
    modelHeight?: string;
    sizeWorn?: string;
  };
  colourVariants: {
    colourName: string;
    swatchColour: string;
    images: string[];
    sizes: { name: string; inStock: boolean }[];
  }[];
}

interface SanityState {
  products: Product[];
  categories: Category[];
  homePage: any;
  siteSettings: any;
  announcementBar: any;
  loading: boolean;
  fetchData: () => Promise<void>;
}

export const useSanityStore = create<SanityState>((set) => ({
  products: [],
  categories: [],
  homePage: null,
  siteSettings: null,
  announcementBar: null,
  loading: true,
  fetchData: async () => {
    try {
      const [productsData, categoriesData, homePageData, siteSettingsData, announcementBarData] = await Promise.all([
        client.fetch(`*[_type == "product"]{
          _id,
          name,
          "slug": slug.current,
          "primaryCategoryId": primaryCategory->_id,
          "alsoShowInIds": alsoShowIn[]->_id,
          price,
          oldPrice,
          "tag": badge,
          "description": shortDescription,
          fullDescription,
          details,
          colourVariants[]{
            colourName,
            swatchColour,
            "images": images[].asset->url,
            sizes
          }
        }`),
        client.fetch(`*[_type == "category"]{
          _id,
          name,
          "parentId": parent->_id,
          "slug": slug.current,
          "tileImage": tileImage.asset->url,
          manualHide
        }`),
        client.fetch(`*[_type == "homePage"][0]{
          hero {
            slides[]{
              "image": image.asset->url,
              "mobileImage": mobileImage.asset->url,
              alt
            },
            headline,
            copy,
            buttonLabel,
            buttonLink
          },
          sectionTitles,
          trustStrip
        }`),
        client.fetch(`*[_type == "siteSettings"][0]`),
        client.fetch(`*[_type == "announcementBar"][0]`)
      ]);

      const tones = ['sage', 'rose', 'sand', 'charcoal', 'pearl', 'wine', 'lilac', 'blue'];
      let toneIndex = 0;
      const getNextTone = () => tones[(toneIndex++) % tones.length];

      const mappedProducts = productsData.map((p: any) => ({
        id: p._id,
        name: p.name,
        slug: p.slug,
        primaryCategoryId: p.primaryCategoryId,
        alsoShowInIds: p.alsoShowInIds || [],
        price: p.price,
        oldPrice: p.oldPrice,
        tag: p.tag || '',
        description: p.description || '',
        fullDescription: p.fullDescription,
        details: p.details || {},
        tone: getNextTone(),
        colourVariants: p.colourVariants?.map((cv: any) => ({
          colourName: cv.colourName,
          swatchColour: cv.swatchColour,
          images: cv.images || [],
          sizes: cv.sizes?.map((s: any) => ({ name: s.sizeName, inStock: s.inStock })) || []
        })) || []
      }));

      const mappedCategories = categoriesData.map((c: any) => ({
        id: c._id,
        name: c.name,
        parentId: c.parentId || null,
        slug: c.slug,
        tileImage: c.tileImage,
        manualHide: c.manualHide || false,
        tone: getNextTone()
      }));

      set({
        products: mappedProducts,
        categories: mappedCategories,
        homePage: homePageData,
        siteSettings: siteSettingsData,
        announcementBar: announcementBarData,
        loading: false
      });
    } catch (err) {
      console.error("Failed to fetch from Sanity", err);
      set({ loading: false });
    }
  }
}));

export function computeVisibleCategories(allCats: Category[], allProds: Product[], countSoldOut: boolean) {
  const visibleIds = new Set<string>();

  allProds.forEach(product => {
    // Check if product is completely sold out when counting is disabled
    let allSizesOutOfStock = true;
    product.colourVariants?.forEach(cv => {
      cv.sizes?.forEach(s => {
        if (s.inStock) allSizesOutOfStock = false;
      });
    });

    const isSoldOut = product.tag === "Sold out" || allSizesOutOfStock;
    if (!countSoldOut && isSoldOut) return;

    // Collect all category IDs this product belongs to
    const catsToMark = [product.primaryCategoryId, ...(product.alsoShowInIds || [])].filter(Boolean);

    catsToMark.forEach(catId => {
      let currentId: string | null = catId;
      while (currentId) {
        visibleIds.add(currentId);
        const cat = allCats.find(c => c.id === currentId);
        currentId = cat ? cat.parentId : null;
      }
    });
  });

  return allCats.filter(cat => visibleIds.has(cat.id) && !cat.manualHide);
}
