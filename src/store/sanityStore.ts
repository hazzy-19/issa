import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
    images: { url: string; mimeType?: string; color?: string }[];
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

export const useSanityStore = create<SanityState>()(
  persist(
    (set) => ({
      products: [],
      categories: [],
      homePage: null,
      siteSettings: null,
      announcementBar: null,
      loading: true,
      fetchData: async () => {
    try {
      const [productsData, categoriesData, homePageData, siteSettingsData, announcementBarData] = await Promise.all([
        client.fetch(`*[_type == "product"] | order(_createdAt desc){
          _id,
          name,
          "slug": slug.current,
          "primaryCategoryId": primaryCategory->\_id,
          "alsoShowInIds": alsoShowIn[]->\_id,
          price,
          oldPrice,
          "tag": badge,
          "description": shortDescription,
          fullDescription,
          details,
          sizeType,
          clothingSizes,
          shoeSizes,
          manualSoldOut,
          colourVariants[]{
            colourName,
            "images": images[]{
              "url": coalesce(image.asset->url, videoFile.asset->url, asset->url),
              "mimeType": coalesce(image.asset->mimeType, videoFile.asset->mimeType, asset->mimeType),
              color
            }
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
          "imageDesktop": heroImageDesktop.asset->url,
          "imageMobile": heroImageMobile.asset->url,
          heroHeading,
          heroSubheading,
          primaryButton,
          secondaryButton,
          featuredCategories,
          featuredProducts,
          newArrivalsTitle,
          extraBanners,
          shopByCategoryTitle,
          trustStrip,
          brandStory
        }`),
        client.fetch(`*[_type == "siteSettings"][0]`),
        client.fetch(`*[_type == "announcementBar"][0]`)
      ]);

      const tones = ['sage', 'rose', 'sand', 'charcoal', 'pearl', 'wine', 'lilac', 'blue'];
      let toneIndex = 0;
      const getNextTone = () => tones[(toneIndex++) % tones.length];

      const mappedProducts = productsData.map((p: any) => {
        // Build sizes from product-level size fields
        let sizes: { name: string; inStock: boolean }[] = [];
        if (p.sizeType === 'clothing' && p.clothingSizes) {
          sizes = p.clothingSizes.map((s: string) => ({ name: s, inStock: true }));
        } else if (p.sizeType === 'shoes' && p.shoeSizes) {
          sizes = p.shoeSizes.map((s: string) => ({ name: s, inStock: true }));
        } else if (p.sizeType === 'oneSize') {
          sizes = [{ name: 'One Size', inStock: true }];
        }

        return {
          id: p._id || '',
          name: p.name || '',
          slug: p.slug || '',
          primaryCategoryId: p.primaryCategoryId || '',
          alsoShowInIds: p.alsoShowInIds || [],
          price: p.price || 0,
          oldPrice: p.oldPrice || 0,
          tag: p.manualSoldOut ? 'Sold out' : (p.tag || ''),
          description: p.description || '',
          fullDescription: p.fullDescription || [],
          details: p.details || {},
          tone: getNextTone(),
          colourVariants: p.colourVariants?.filter(Boolean).map((cv: any) => ({
            colourName: cv?.colourName || '',
            images: cv?.images?.filter(Boolean).map((img: any) => typeof img === 'string' ? { url: img } : { url: img?.url || '', mimeType: img?.mimeType || '', color: img?.color || '' }) || [],
            sizes,
          })) || []
        };
      });

      const mappedCategories = categoriesData.map((c: any) => ({
        id: c._id || '',
        name: c.name || '',
        parentId: c.parentId || null,
        slug: c.slug || '',
        tileImage: c.tileImage || '',
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
    }),
    {
      name: 'sanity-storage'
    }
  )
);

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
