import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Icon, ImagePlaceholder, formatPrice } from '../components/UI';
import { useSanityStore } from '../store/sanityStore';
import { useCartStore } from '../store/cartStore';
import { siteConfig } from '../config/site';

function BlockContentRenderer({ value }: { value: any }) {
  if (!value) return null;
  if (typeof value === 'string') {
    return <p className="details-text">{value}</p>;
  }
  if (!Array.isArray(value)) return null;

  return (
    <div className="rich-description">
      {value.map((block: any, i: number) => {
        if (block._type !== 'block' || !block.children) {
          return null;
        }

        const renderChildren = () => {
          return block.children.map((child: any, j: number) => {
            let text = child.text || '';
            let content: React.ReactNode = text;
            if (child.marks && Array.isArray(child.marks)) {
              if (child.marks.includes('strong')) content = <strong>{content}</strong>;
              if (child.marks.includes('em')) content = <em>{content}</em>;
              if (child.marks.includes('underline')) content = <u>{content}</u>;
              const linkDef = block.markDefs?.find((m: any) => child.marks.includes(m._key));
              if (linkDef && linkDef.href) {
                content = (
                  <a href={linkDef.href} target="_blank" rel="noopener noreferrer">
                    {content}
                  </a>
                );
              }
            }
            return <span key={j}>{content}</span>;
          });
        };

        if (block.listItem === 'bullet') {
          return (
            <ul key={i} className="details-list">
              <li>{renderChildren()}</li>
            </ul>
          );
        }

        if (block.style === 'h3' || block.style === 'h4') {
          return <h4 key={i} className="details-heading">{renderChildren()}</h4>;
        }

        return <p key={i} className="details-paragraph">{renderChildren()}</p>;
      })}
    </div>
  );
}

export function ProductDetails({ setBagOpen }: { setBagOpen: (open: boolean) => void }) {
  const { id } = useParams<{ id: string }>();
  const { products, categories } = useSanityStore();
  const product = products.find(p => p.id === id) || products[0];
  const category = categories.find(c => c.id === product?.primaryCategoryId);

  // Flatten all images across colour variants and preserve color tags
  const allImages = (product?.colourVariants || [])
    .filter(Boolean)
    .flatMap((cv) =>
      (cv.images || [])
        .filter(Boolean)
        .map((img) => ({
          url: img.url,
          mimeType: img.mimeType,
          color: (img.color || cv.colourName || '').trim(),
        }))
    )
    .filter((img) => Boolean(img.url));

  const uniqueColors = Array.from(
    new Set(allImages.map((img) => img.color).filter(Boolean))
  );

  const allImagesHaveColor = allImages.length > 0 && allImages.every((img) => Boolean(img.color));
  const defaultColor = uniqueColors.length > 0 ? (allImagesHaveColor ? uniqueColors[0] : 'All') : '';

  const [selectedColor, setSelectedColor] = useState<string>(defaultColor);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const displayedImages = selectedColor && selectedColor !== 'All'
    ? allImages.filter((img) => img.color.toLowerCase() === selectedColor.toLowerCase())
    : allImages;

  const currentImages = displayedImages.length > 0 ? displayedImages : allImages;
  const currentVariant = product?.colourVariants?.[0];
  const [detailsOpen, setDetailsOpen] = useState("details");

  const saved = useCartStore((state) => state.saved);
  const toggleSaved = useCartStore((state) => state.toggleSaved);
  const addToCart = useCartStore((state) => state.addToCart);

  function handleAdd() {
    if (!selectedSize || product?.tag === "Sold out") return;
    const resolvedColor = (selectedColor && selectedColor !== 'All') ? selectedColor : (currentVariant?.colourName || '');
    addToCart({ product, size: selectedSize, colour: resolvedColor, quantity });
    setBagOpen(true);
  }

  if (!product) return <div>Product not found.</div>;

  const hasDetailsContent = Boolean(
    product.fullDescription ||
    product.description ||
    product.details?.fabric ||
    product.details?.care ||
    product.details?.fitNotes ||
    (product.details as any)?.modelInfo ||
    product.details?.modelHeight ||
    product.details?.sizeWorn
  );

  const activeColorForWhatsApp = (selectedColor && selectedColor !== 'All') ? selectedColor : (currentVariant?.colourName || 'Default');

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
        <div className="product-gallery-container">
          {uniqueColors.length > 0 && (
            <div className="color-selector">
              <span className="color-selector-label">
                Color: <strong>{selectedColor || 'All'}</strong>
              </span>
              <div className="color-chips" role="group" aria-label="Filter photos by color">
                {!allImagesHaveColor && (
                  <button
                    type="button"
                    className={`color-chip ${selectedColor === 'All' ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedColor('All');
                      setActiveImageIndex(0);
                    }}
                  >
                    All
                  </button>
                )}
                {uniqueColors.map((colorName) => (
                  <button
                    type="button"
                    key={colorName}
                    className={`color-chip ${selectedColor === colorName ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedColor(colorName);
                      setActiveImageIndex(0);
                    }}
                  >
                    {colorName}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="product-gallery">
            <div className="thumbnail-column">
              {currentImages.slice(0, 5).map((img, idx) => (
                <button
                  aria-label={`View image ${idx + 1}`}
                  className={idx === activeImageIndex ? "thumbnail active" : "thumbnail"}
                  key={`${img.url}-${idx}`}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  {img.mimeType?.startsWith('video/') ? (
                    <video src={img.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted />
                  ) : (
                    <img src={img.url} alt={`${product.name} thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
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
                currentImages[activeImageIndex].mimeType?.startsWith('video/') ? (
                  <video
                    src={currentImages[activeImageIndex].url}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                  />
                ) : (
                  <img
                    src={currentImages[activeImageIndex].url}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                )
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
            {currentVariant?.sizes?.filter(Boolean).map((size) => (
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
                href={`https://wa.me/${(siteConfig.whatsappNumber || '254700000000').replace(/\D/g, '')}?text=${encodeURIComponent(`Hi, I'm interested in the ${product.name}.\nColor: ${activeColorForWhatsApp}\nSize: ${selectedSize || 'Not selected'}\nPrice: KSh ${product.price}`)}`}
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
            {hasDetailsContent && (
              <div className={detailsOpen === "details" ? "accordion open" : "accordion"}>
                <button onClick={() => setDetailsOpen(detailsOpen === "details" ? "" : "details")}>
                  <span>Product details</span><Icon name={detailsOpen === "details" ? "minus" : "plus"} size={18} />
                </button>
                {detailsOpen === "details" && (
                  <div className="accordion-content">
                    {product.fullDescription ? (
                      <BlockContentRenderer value={product.fullDescription} />
                    ) : product.description ? (
                      <p className="details-text">{product.description}</p>
                    ) : null}

                    {product.details && Object.values(product.details).some(Boolean) && (
                      <dl className="product-spec-list">
                        {product.details.fabric && (
                          <div className="spec-row">
                            <dt>Fabric:</dt>
                            <dd>{product.details.fabric}</dd>
                          </div>
                        )}
                        {product.details.care && (
                          <div className="spec-row">
                            <dt>Care:</dt>
                            <dd>{product.details.care}</dd>
                          </div>
                        )}
                        {product.details.fitNotes && (
                          <div className="spec-row">
                            <dt>Fit:</dt>
                            <dd>{product.details.fitNotes}</dd>
                          </div>
                        )}
                        {(product.details as any).modelInfo && (
                          <div className="spec-row">
                            <dt>Model:</dt>
                            <dd>{(product.details as any).modelInfo}</dd>
                          </div>
                        )}
                        {product.details.modelHeight && (
                          <div className="spec-row">
                            <dt>Model Height:</dt>
                            <dd>{product.details.modelHeight}</dd>
                          </div>
                        )}
                        {product.details.sizeWorn && (
                          <div className="spec-row">
                            <dt>Size Worn:</dt>
                            <dd>{product.details.sizeWorn}</dd>
                          </div>
                        )}
                      </dl>
                    )}
                  </div>
                )}
              </div>
            )}
            <div className={detailsOpen === "delivery" ? "accordion open" : "accordion"}>
              <button onClick={() => setDetailsOpen(detailsOpen === "delivery" ? "" : "delivery")}>
                <span>Delivery and returns</span><Icon name={detailsOpen === "delivery" ? "minus" : "plus"} size={18} />
              </button>
              {detailsOpen === "delivery" && <p className="details-text">Delivery is available across Kenya. Size swaps are accepted within 7 days on unworn pieces.</p>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
