import React from 'react';

/* =========================================================================
   COMPONENT: CartModal
   Shopping bag drawer/modal allowing customers to review selected pieces,
   adjust quantities, calculate total in INR, and send an order inquiry to WhatsApp.
   ========================================================================= */
export default function CartModal({
  isOpen = false,
  cart = [],
  onClose,
  onRemoveItem,
  onClearCart,
}) {
  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const generateWhatsAppOrderLink = () => {
    if (cart.length === 0) return '#';
    const itemsText = cart
      .map((item, idx) => `${idx + 1}. ${item.title} (₹${item.price.toLocaleString('en-IN')})`)
      .join('%0A');
    const message = `Hello Saha Couture,%0AI would like to inquire about purchasing the following pieces from your edit:%0A%0A${itemsText}%0A%0ATotal: ₹${totalAmount.toLocaleString(
      'en-IN'
    )}%0A%0APlease let me know sizing and tailoring availability.`;
    return `https://wa.me/919964447242?text=${message}`;
  };

  return (
    <div className="cart-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="cart-modal-panel" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="cart-modal-header">
          <div>
            <h3>Your Saha Edit Bag</h3>
            <span className="cart-count-sub">
              {cart.length} item{cart.length === 1 ? '' : 's'} selected
            </span>
          </div>
          <button
            type="button"
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Close shopping bag"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        {cart.length === 0 ? (
          <div className="cart-empty-body">
            <span className="empty-bag-icon">🛍</span>
            <h4>Your bag is currently empty</h4>
            <p>Explore our Women's Edit and add pieces that catch your eye.</p>
            <a href="#women" className="button button--dark" onClick={onClose}>
              Browse Collection <span>↓</span>
            </a>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cart.map((item, idx) => (
                <div className="cart-item-row" key={`${item.id}-${idx}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-item-thumb"
                  />
                  <div className="cart-item-info">
                    <h4>{item.title}</h4>
                    <p className="cart-item-sub">{item.subtitle}</p>
                    <strong className="cart-item-price">
                      ₹{item.price.toLocaleString('en-IN')}
                    </strong>
                  </div>
                  <button
                    type="button"
                    className="cart-remove-btn"
                    onClick={() => onRemoveItem(item.id)}
                    title="Remove item"
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="cart-modal-footer">
              <div className="cart-total-row">
                <span>Subtotal (INR):</span>
                <strong>₹{totalAmount.toLocaleString('en-IN')}</strong>
              </div>
              <p className="cart-tax-note">
                Complimentary boutique alterations &amp; studio consultation included.
              </p>

              <div className="cart-footer-actions">
                <a
                  href={generateWhatsAppOrderLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button--dark w-full text-center"
                >
                  Order via WhatsApp ↗
                </a>
                <button
                  type="button"
                  className="minimal-action text-danger mt-2"
                  onClick={onClearCart}
                >
                  Clear Bag
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
