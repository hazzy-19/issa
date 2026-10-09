import { useMemo, useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Icon, ImagePlaceholder, formatPrice } from '../components/UI';
import { useSanityStore, computeVisibleCategories } from '../store/sanityStore';
import { useCartStore } from '../store/cartStore';
import { siteConfig } from '../config/site';

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('q') || '';
  const filterId = searchParams.get('filter') || '';
  
  const saved = useCartStore((state) => state.saved);
  const toggleSaved = useCartStore((state) => state.toggleSaved);

  const { categories, products, homePage } = useSanityStore();

  const visibleCats = useMemo(() => computeVisibleCategories(categories, products, true), [categories, products]);

  const activeCategory = filterId ? visibleCats.find(c => c.id === filterId) : null;

  // Filter products based on search and selected category
  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    
    // Find all descendant category IDs for the current filter
    let descendantIds = new Set<string>();
    if (filterId) {
      descendantIds.add(filterId);
      let added = true;
      while (added) {
        added = false;
        visibleCats.forEach(cat => {
          if (cat.parentId && descendantIds.has(cat.parentId) && !descendantIds.has(cat.id)) {
            descendantIds.add(cat.id);
            added = true;
          }
        });
      }
    }

    const matched = products.filter((product) => {
      // Is it matching the category?
      const inCategory = filterId === '' || 
        descendantIds.has(product.primaryCategoryId) || 
        (product.alsoShowInIds?.some(id => descendantIds.has(id)));
      
      // Is it matching the search?
      const inSearch = !term || `${product.name} ${product.description}`.toLowerCase().includes(term);

      return inCategory && inSearch;
    });

    // If viewing unfiltered New Arrivals, limit to 20 newest items
    if (!filterId && !term) {
      return matched.slice(0, 20);
    }

    return matched;
  }, [filterId, search, visibleCats, products]);

  // Determine subcategories to show as chips
  const chips = useMemo(() => {
    if (filterId) {
      return visibleCats.filter(c => c.parentId === filterId);
    } else {
      const topLevelIds = new Set(visibleCats.filter(c => !c.parentId && (c.name.toLowerCase() === 'women' || c.name.toLowerCase() === 'men')).map(c => c.id));
      return visibleCats.filter(c => c.parentId && topLevelIds.has(c.parentId));
    }
  }, [filterId, visibleCats]);

  // Featured categories for the "Shop by category" grid (limit to 4)
  const featuredCategories = useMemo(() => {
    const topLevelIds = new Set(visibleCats.filter(c => !c.parentId && (c.name.toLowerCase() === 'women' || c.name.toLowerCase() === 'men')).map(c => c.id));
    const level2 = visibleCats.filter(c => c.parentId && topLevelIds.has(c.parentId));
    const shoes = level2.find(c => c.name.toLowerCase().includes('shoe'));
    const others = level2.filter(c => c.id !== shoes?.id);
    const selection = shoes ? [shoes, ...others] : others;
    return selection.slice(0, 4);
  }, [visibleCats]);

  const hero = homePage || {};

  // Determine if we show the hero and top-level categories
  const showHero = !search && !filterId;

  const handleNewArrivalsClick = () => {
    setSearchParams({});
    setTimeout(() => {
      document.getElementById("product-grid-start")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const cleanWhatsApp = (siteConfig.whatsappNumber || '254700000000').replace(/\D/g, '');
  const reachOutMessage = "Hi! I'd like to reach out regarding your collection.";

  return (
    <main>
      {showHero && (
        <>
          <section className="full-bleed-hero">
            <picture className="hero-bg">
              {hero.imageMobile && <source media="(max-width: 760px)" srcSet={hero.imageMobile} />}
              {hero.imageDesktop && <img src={hero.imageDesktop} alt="Hero" className="hero-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
            </picture>
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <h1>{hero.heroHeading || "Modest wear for every day"}</h1>
              <p>{hero.heroSubheading || "Abayas, hijabs and sets in soft fabrics. Delivered countrywide."}</p>
              <div className="hero-buttons">
                {(hero.primaryButton?.label || "New arrivals") && (
                  <button className="button button-outline-white" onClick={handleNewArrivalsClick}>
                    {hero.primaryButton?.label || "New arrivals"}
                  </button>
                )}
                {(hero.secondaryButton?.label || "Reach out") && (
                  <a
                    href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(reachOutMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-outline-white"
                    style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {hero.secondaryButton?.label || "Reach out"}
                  </a>
                )}
              </div>
            </div>
          </section>

          <section className="section category-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">FIND YOUR EVERYDAY</span>
                <h2>Shop by category</h2>
              </div>
              <p>Refined essentials, chosen to move with you.</p>
            </div>
            <div className="category-grid">
              {featuredCategories.map((category, index) => (
                <button className={`category-tile category-${index + 1}`} key={category.id} onClick={() => setSearchParams({ filter: category.id })}>
                  {category.tileImage ? (
                    <img src={category.tileImage} alt={category.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <ImagePlaceholder tone={category.tone} label={`${category.name} category image placeholder`} />
                  )}
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </section>
        </>
      )}

      <section className="section products-section" id="product-grid-start">
        <div className="section-heading product-heading">
          <div>
            <span className="eyebrow">{search ? "SEARCH" : activeCategory ? activeCategory.name.toUpperCase() : "JUST IN"}</span>
            <h2>{search ? `Results for “${search}”` : activeCategory ? activeCategory.name : "New arrivals"}</h2>
          </div>
          {!search && !activeCategory && <p>Fresh silhouettes in an easy, modest palette.</p>}
        </div>

        {/* Dynamic Category Chips */}
        {!search && (
          <div aria-label="Filter products" className="filter-row" role="group">
            <button className={!filterId ? "filter-chip active" : "filter-chip"} onClick={() => setSearchParams({})}>
              All
            </button>
            {chips.map((item) => (
              <button className="filter-chip" key={item.id} onClick={() => setSearchParams({ filter: item.id })}>
                {item.name}
              </button>
            ))}
          </div>
        )}

        {filteredProducts.length ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className={product.tag === "Sold out" ? "product-card sold-out" : "product-card"} key={product.id}>
                <div className="product-image-wrap">
                  <Link to={`/product/${product.id}`} className="image-link" style={{ display: 'block' }}>
                    {product.colourVariants?.[0]?.images?.[0] ? (
                      <img src={product.colourVariants[0].images[0].url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : (
                      <ImagePlaceholder tone={product.tone} label={`${product.name} product image placeholder`} />
                    )}
                  </Link>
                  <span className={`product-tag ${product.tag === "Sale" ? "sale" : ""}`}>{product.tag}</span>
                  <button
                    aria-label={saved.includes(product.id) ? `Remove ${product.name} from saved items` : `Save ${product.name}`}
                    className={`save-button ${saved.includes(product.id) ? "saved" : ""}`}
                    onClick={() => toggleSaved(product.id)}
                  >
                    <Icon name="heart" />
                  </button>
                </div>
                <Link to={`/product/${product.id}`} className="product-info bare" style={{ textDecoration: 'none' }}>
                  <h3>{product.name}</h3>
                  <div className="price-row">
                    <span className={product.oldPrice ? "current-price sale-price" : "current-price"}>{formatPrice(product.price)}</span>
                    {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-search">
            <Icon name="search" size={28} />
            <h3>We couldn’t find a match</h3>
            <p>Check the spelling or try a simple search like “abaya” or “hijab”.</p>
            <button className="button button-outline" onClick={() => setSearchParams({})}>CLEAR FILTERS</button>
          </div>
        )}
      </section>

      {showHero && (
        <section className="trust-strip">
          <div><span>01</span><strong>Order on WhatsApp</strong><small>Personalised service</small></div>
          <div><span>02</span><strong>Delivery countrywide</strong><small>Anywhere in Kenya</small></div>
          <div><span>03</span><strong>Easy size swaps</strong><small>Simple exchanges</small></div>
        </section>
      )}
    </main>
  );
}
