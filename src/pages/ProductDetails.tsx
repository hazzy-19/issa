import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Icon, ImagePlaceholder, formatPrice } from '../components/UI';
import { useSanityStore } from '../store/sanityStore';
import { useCartStore } from '../store/cartStore';

export function ProductDetails({ setBagOpen }: { setBagOpen: (open: boolean) => void }) {
  const { id } = useParams<{ id: string }>();
  const { products, categories } = useSanityStore();
  const product = products.find(p => p.id === id) || products[0];
  const category = categories.find(c => c.id === product?.primaryCategoryId);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const currentVariant = product?.colourVariants?.[selectedVariantIndex];
  const currentImages = currentVariant?.images || [];
  const [detailsOpen, setDetailsOpen] = useState("details");

  const saved = useCartStore((state) => state.saved);
  const toggleSaved = useCartStore((state) => state.toggleSaved);
  const addToCart = useCartStore((state) => state.addToCart);

  function handleAdd() {
    if (!selectedSize || product?.tag === "Sold out" || !currentVariant) return;
    addToCart({ product, size: selectedSize, colour: currentVariant.colourName, quantity });
    setBagOpen(true);
  }

  if (!product) return <div>Product not found.</div>;

  return (
    <main className="product-page">
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link to="/" className="bare">Home</Link>
        <span>/</span>
        {category?.parentId && (
          <>
            <Link to={`/?filter=${category.parentId}`} className="bare">
              {categories.find(c => c.id === category.parentId)?.name}
            </Link>
            <span>/</span>
          </>
        )}
        <Link to={`/?filter=${category?.id}`} className="bare">{category?.name}</Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>
      <div className="product-layout">
        <div className="product-gallery">
          <div className="thumbnail-column">
            {currentImages.slice(0, 3).map((img, idx) => (
              <button aria-label={`View image ${idx + 1}`} className={idx === activeImageIndex ? "thumbnail active" : "thumbnail"} key={idx} onClick={() => setActiveImageIndex(idx)}>
                <img src={img} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
            {currentImages.length === 0 && (
              <button className="thumbnail active">
                <ImagePlaceholder tone={product.tone} />
              </button>
            )}
          </div>
          <div className="main-product-image">
            {currentImages[activeImageIndex] ? (
              <img src={currentImages[activeImageIndex]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <ImagePlaceholder tone={product.tone} label={`${product.name} main image placeholder`} />
            )}
            {currentImages.length > 1 && (
              <>
                <button aria-label="Previous image" className="gallery-arrow previous" onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : currentImages.length - 1))}><Icon name="arrow-left" /></button>
                <button aria-label="Next image" className="gallery-arrow next" onClick={() => setActiveImageIndex((prev) => (prev < currentImages.length - 1 ? prev + 1 : 0))}><Icon name="chevron" /></button>
              </>
            )}
          </div>
        </div>

        <div className="product-panel">
          <span className="eyebrow">{category?.name}</span>
          <div className="title-save">
            <h1>{product.name}</h1>
            <button aria-label="Save product" className={`bare icon-button ${saved.includes(product.id) ? "saved" : ""}`} onClick={() => toggleSaved(product.id)}>
              <Icon name="heart" />
            </button>
          </div>
          <div className="detail-price">
            <span className={product.oldPrice ? "sale-price" : ""}>{formatPrice(product.price)}</span>
            {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
          </div>
          <p className="tax-note">Tax included. Delivery confirmed after your order.</p>

          <div className="option-heading">
            <strong>Select size</strong>
            {selectedSize && <span>{selectedSize}</span>}
          </div>
          <div className="size-grid">
            {currentVariant?.sizes?.map((size) => (
              <button
                className={`${selectedSize === size.name ? "selected " : ""}${!size.inStock ? "unavailable" : ""}`}
                disabled={!size.inStock}
                key={size.name}
                onClick={() => setSelectedSize(size.name)}
              >
                {size.name}
              </button>
            ))}
          </div>
          <button className="size-guide">SEE SIZING GUIDE <Icon name="chevron" size={16} /></button>

          <div className="option-heading colour-heading">
            <strong>Colour</strong><span>{currentVariant?.colourName}</span>
          </div>
          <div className="swatch-row">
            {product.colourVariants?.map((variant, index) => (
              <button
                aria-label={variant.colourName}
                className={selectedVariantIndex === index ? "swatch selected" : "swatch"}
                key={variant.colourName}
                onClick={() => { setSelectedVariantIndex(index); setSelectedSize(""); setActiveImageIndex(0); }}
                style={{ backgroundColor: variant.swatchColour }}
              />
            ))}
          </div>

          <div className="purchase-row">
            <div className="quantity-stepper">
              <button aria-label="Decrease quantity" disabled={quantity === 1} onClick={() => setQuantity(Math.max(1, quantity - 1))}><Icon name="minus" size={16} /></button>
              <span>{quantity}</span>
              <button aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)}><Icon name="plus" size={16} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                className="button button-primary add-button"
                disabled={!selectedSize || product.tag === "Sold out"}
                onClick={handleAdd}
              >
                {product.tag === "Sold out" ? "SOLD OUT" : selectedSize ? "ADD TO BAG" : "SELECT A SIZE"}
              </button>
              <a
                href={`https://wa.me/254700000000?text=${encodeURIComponent(`Hi, I'm interested in the ${product.name}.\nColor: ${currentVariant?.colourName}\nSize: ${selectedSize || 'Not selected'}\nPrice: KSh ${product.price}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="button whatsapp-btn"
                style={{ width: '100%', backgroundColor: '#25D366', color: 'white', border: 'none' }}
              >
                ASK ON WHATSAPP
              </a>
            </div>
          </div>

          <div className="accordions">
            <div className={detailsOpen === "details" ? "accordion open" : "accordion"}>
              <button onClick={() => setDetailsOpen(detailsOpen === "details" ? "" : "details")}>
                <span>Product details</span><Icon name={detailsOpen === "details" ? "minus" : "plus"} size={18} />
              </button>
              {detailsOpen === "details" && <p>{product.description} Hand wash cold and hang to dry.</p>}
            </div>
            <div className={detailsOpen === "delivery" ? "accordion open" : "accordion"}>
              <button onClick={() => setDetailsOpen(detailsOpen === "delivery" ? "" : "delivery")}>
                <span>Delivery and returns</span><Icon name={detailsOpen === "delivery" ? "minus" : "plus"} size={18} />
              </button>
              {detailsOpen === "delivery" && <p>Delivery is available across Kenya. Size swaps are accepted within 7 days on unworn pieces.</p>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
