import { useState } from 'react';
import { Icon, ImagePlaceholder, formatPrice } from './UI';
import { useCartStore } from '../store/cartStore';
import { siteConfig } from '../config/site';

export function CartDrawer({ isOpen, setOpen }: { isOpen: boolean; setOpen: (open: boolean) => void }) {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  
  const [checkoutMode, setCheckoutMode] = useState<"whatsapp" | "mpesa">("whatsapp");
  const [checkout, setCheckout] = useState(false);
  const [payment, setPayment] = useState<"form" | "waiting" | "success" | "failed">("form");

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const hasUnavailable = cart.some((item) => item.product.tag === "Sold out");

  function getWhatsAppLink() {
    if (!cart.length) return "#";

    const itemLines = cart.map((item, index) => {
      const parts = [item.product.name];
      if (item.colour && item.colour.trim()) {
        parts.push(`Color: ${item.colour.trim()}`);
      }
      if (item.size && item.size.trim()) {
        parts.push(`Size: ${item.size.trim()}`);
      }
      if (item.quantity) {
        parts.push(`Qty: ${item.quantity}`);
      }
      const itemTotal = item.product.price * (item.quantity || 1);
      parts.push(`Price: KES ${itemTotal.toLocaleString('en-KE')}`);

      return `${index + 1}. ${parts.join(' | ')}`;
    });

    const message = [
      "Hi! I'd like to order the following:",
      "",
      ...itemLines,
      "",
      `Total: KES ${subtotal.toLocaleString('en-KE')}`
    ].join('\n');

    const cleanNumber = (siteConfig.whatsappNumber || '254700000000').replace(/\D/g, '');
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  }

  function submitCheckout(e: React.FormEvent) {
    e.preventDefault();
    setPayment("waiting");
    setTimeout(() => setPayment("success"), 2600);
  }

  if (!isOpen && !checkout) return null;

  return (
    <>
      {isOpen && (
        <div className="overlay" onMouseDown={() => setOpen(false)}>
          <aside aria-label="Shopping bag" className="bag-drawer" onMouseDown={(event) => event.stopPropagation()}>
            <div className="drawer-head bag-head">
              <div><span className="eyebrow">YOUR SELECTION</span><h2>Shopping bag <small>{cartCount}</small></h2></div>
              <button aria-label="Close bag" className="bare icon-button" onClick={() => setOpen(false)}><Icon name="close" /></button>
            </div>
            {!cart.length ? (
              <div className="empty-bag">
                <span className="empty-icon"><Icon name="bag" size={30} /></span>
                <h3>Your bag is empty</h3>
                <p>Your next favourite piece could be waiting in our new arrivals.</p>
                <button className="button button-primary" onClick={() => setOpen(false)}>START SHOPPING</button>
              </div>
            ) : (
              <>
                <div className="bag-items">
                  {cart.map((item, index) => (
                    <article className="bag-item" key={`${item.product.id}-${item.size}-${index}`}>
                      {(() => {
                        const variant = item.product.colourVariants?.find(cv => cv?.colourName === item.colour) || item.product.colourVariants?.[0];
                        const img = variant?.images?.[0]?.url;
                        return img ? (
                          <img src={img} alt={item.product.name} style={{ width: '80px', height: '100%', minHeight: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                        ) : (
                          <ImagePlaceholder tone={item.product.tone} />
                        );
                      })()}
                      <div>
                        <h3>{item.product.name}</h3>
                        <p>{item.colour} · Size {item.size}</p>
                        {item.product.tag === "Sold out" && <strong className="unavailable-note">This item has sold out. Remove it to checkout.</strong>}
                        <div className="bag-item-foot">
                          <span>Qty {item.quantity}</span>
                          <button className="remove-link" onClick={() => removeFromCart(index)}>Remove</button>
                        </div>
                      </div>
                      <strong>{formatPrice(item.product.price * item.quantity)}</strong>
                    </article>
                  ))}
                </div>
                <div className="bag-summary">
                  <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
                  <div><span>Delivery</span><span>Confirmed on WhatsApp</span></div>
                  {hasUnavailable && <p className="checkout-warning">Remove sold-out items before checking out.</p>}
                  {checkoutMode === "mpesa" ? (
                    <button className="button button-primary checkout-button" disabled={hasUnavailable} onClick={() => { setOpen(false); setCheckout(true); setPayment("form"); }}>
                      CHECKOUT WITH M-PESA
                    </button>
                  ) : (
                    <a
                      href={hasUnavailable ? "#" : getWhatsAppLink()}
                      target={hasUnavailable ? undefined : "_blank"}
                      rel="noreferrer"
                      className="button button-primary checkout-button"
                      style={{ textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      ORDER ON WHATSAPP
                    </a>
                  )}
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {checkout && (
        <div className="overlay checkout-overlay">
          <section aria-label="Checkout" aria-modal="true" className="checkout-modal" role="dialog">
            <button aria-label="Close checkout" className="bare icon-button modal-close" onClick={() => setCheckout(false)}><Icon name="close" /></button>
            {payment === "form" && (
              <>
                <span className="eyebrow">SECURE CHECKOUT</span>
                <h2>Complete your order</h2>
                <p className="checkout-intro">We’ll send an M-Pesa prompt to your phone.</p>
                <form noValidate onSubmit={submitCheckout}>
                  <label>Full name<input name="name" placeholder="Your full name" /></label>
                  <label>M-Pesa number<input inputMode="tel" name="phone" placeholder="07XX XXX XXX" /><small>This number receives the PIN prompt</small></label>
                  <label>Delivery address<textarea name="address" placeholder="Estate, street, building and town" rows={3} /></label>
                  <button className="button button-primary pay-button" type="submit">PAY {formatPrice(subtotal)}</button>
                </form>
              </>
            )}
            {payment === "waiting" && (
              <div className="payment-state">
                <span className="spinner" />
                <span className="eyebrow">ORDER HD1048</span>
                <h2>Check your phone</h2>
                <p>Enter your M-Pesa PIN to approve the payment.</p>
              </div>
            )}
            {payment === "success" && (
              <div className="payment-state">
                <span className="success-icon"><Icon name="check" size={30} /></span>
                <span className="eyebrow">ORDER HD1048</span>
                <h2>Payment received</h2>
                <p>We've received your order and will contact you shortly.</p>
                <button className="button button-primary" onClick={() => { setCheckout(false); useCartStore.getState().clearCart(); }}>CONTINUE SHOPPING</button>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}
