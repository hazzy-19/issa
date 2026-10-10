import { Link } from 'react-router-dom';
import { Icon, ImagePlaceholder, formatPrice } from '../components/UI';
import { useSanityStore } from '../store/sanityStore';
import { useCartStore } from '../store/cartStore';

export function Saved() {
  const saved = useCartStore((state) => state.saved);
  const toggleSaved = useCartStore((state) => state.toggleSaved);
  const products = useSanityStore((state) => state.products);

  const savedProducts = products.filter(p => saved.includes(p.id));

  return (
    <main className="product-page">
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link to="/" className="bare">Home</Link>
        <span>/</span><span>Saved items</span>
      </nav>

      <div className="section-heading" style={{ marginTop: '20px' }}>
        <h2>Saved items</h2>
        <p>{savedProducts.length} items</p>
      </div>

      {savedProducts.length > 0 ? (
        <div className="product-grid">
          {savedProducts.map((product) => (
            <article className={product.tag === "Sold out" ? "product-card sold-out" : "product-card"} key={product.id}>
              <div className="product-image-wrap">
                <Link to={`/product/${product.id}`} className="image-link" style={{ display: 'block' }}>
                  {product.colourVariants?.[0]?.images?.[0]?.url ? (
                    product.colourVariants[0].images[0].mimeType?.startsWith('video/') ? (
                      <video src={product.colourVariants[0].images[0].url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} autoPlay loop muted playsInline />
                    ) : (
                      <img src={product.colourVariants[0].images[0].url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    )
                  ) : (
                    <ImagePlaceholder tone={product.tone} label={`${product.name} product image placeholder`} />
                  )}
                </Link>
                <span className={`product-tag ${product.tag === "Sale" ? "sale" : ""}`}>{product.tag}</span>
                <button
                  aria-label={`Remove ${product.name} from saved items`}
                  className="save-button saved"
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
          <Icon name="heart" size={28} />
          <h3>No saved items yet</h3>
          <p>Tap the heart icon on any product to save it for later.</p>
          <Link to="/" className="button button-primary" style={{ display: 'inline-flex', marginTop: '20px' }}>
            START SHOPPING
          </Link>
        </div>
      )}
    </main>
  );
}
