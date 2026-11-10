import React from 'react';

/* =========================================================================
   COMPONENT: ProductCard
   Reusable product card component for the boutique collection.
   -------------------------------------------------------------------------
   NOTE FOR FUTURE CUSTOMIZATION:
   Image paths are passed via `product.image` which points to `src/config/assets.js`.
   To swap a product's photo, simply replace the file in 'public/assets/'
   or update 'src/config/assets.js'.
   ========================================================================= */
export default function ProductCard({
  product,
  isFavorite = false,
  isInCart = false,
  onToggleFavorite,
  onAddToCart,
}) {
  const { id, title, subtitle, price, tag, image, description } = product;

  return (
    <article className="product-card" data-product-id={id}>
      <div className="product-image-wrap">
        {/* ===== IMAGE ASSET LOCATION: REPLACE PRODUCT IMAGE HERE =====
            Current path: {image} (configured in src/config/assets.js) */}
        <img
          src={image}
          alt={`${title} from Saha Couture`}
          className="product-image"
          loading="lazy"
          onError={(e) => {
            // Elegant placeholder fallback if image path is not found
            e.currentTarget.src =
              'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"><rect width="400" height="500" fill="%23f0e5da"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-size="20" fill="%23a76459">Saha Couture Edit</text></svg>';
          }}
        />
        {/* ============================================================ */}

        {/* Product Tag Badge */}
        {tag && (
          <span className={`product-tag ${tag.toLowerCase().includes('festive') ? 'product-tag--rose' : ''}`}>
            {tag}
          </span>
        )}

        {/* Favorite / Wishlist Heart Button */}
        <button
          type="button"
          className={`favourite-button ${isFavorite ? 'is-favorited' : ''}`}
          onClick={() => onToggleFavorite(id)}
          aria-label={isFavorite ? `Remove ${title} from saved favourites` : `Save ${title} as favourite`}
          title={isFavorite ? 'Saved to favourites' : 'Save as favourite'}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>

      <div className="product-meta">
        <div>
          <h3 className="product-title">{title}</h3>
          <p className="product-subtitle">{subtitle}</p>
        </div>
        <strong className="product-price">₹{Number(price).toLocaleString('en-IN')}</strong>
      </div>

      {description && <p className="product-description">{description}</p>}

      <div className="product-actions">
        <button
          type="button"
          className={`minimal-action add-bag ${isInCart ? 'is-added' : ''}`}
          onClick={() => onAddToCart(product)}
        >
          {isInCart ? '✓ In your bag' : 'Add to bag'}
        </button>

        <a
          href={`https://wa.me/919964447242?text=Hello%20Saha%20Couture,%20I%20am%20interested%20in%20customising%20the%20${encodeURIComponent(title)}%20(₹${price}).`}
          target="_blank"
          rel="noopener noreferrer"
          className="product-customise-link"
          title="Inquire about custom sizing or colors"
        >
          Customise ↗
        </a>
      </div>
    </article>
  );
}
