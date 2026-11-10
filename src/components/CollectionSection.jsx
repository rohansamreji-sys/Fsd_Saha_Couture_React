import React, { useMemo, useState } from 'react';
import { ASSETS } from '../config/assets';
import ProductCard from './ProductCard';

/* =========================================================================
   COMPONENT: CollectionSection
   Women's Collection Edit with dynamic search, filter tags, and wishlist state.
   ========================================================================= */
export default function CollectionSection({
  wishlist = new Set(),
  cart = [],
  onToggleFavorite,
  onAddToCart,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'casual' | 'festive'

  // Master product list
  const productsList = useMemo(() => {
    return Object.values(ASSETS.products);
  }, []);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return productsList.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesFilter =
        activeFilter === 'all' || product.occasion === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [productsList, searchQuery, activeFilter]);

  return (
    <section className="section section--paper collection-section" id="women" aria-labelledby="womenHeading">
      <div className="section-inner">
        {/* Section Header */}
        <div className="section-heading">
          <div>
            <p className="section-kicker">02 / Women</p>
            <h2 className="editorial-heading" id="womenHeading">
              The <em>Women's</em> Edit
            </h2>
          </div>
          <p className="section-description">
            Pieces for ordinary days, festive evenings, and the occasions that deserve
            something a little more considered.
          </p>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="collection-tools">
          <div className="search-box">
            <label htmlFor="productSearch" className="search-label">
              Find a piece
            </label>
            <div className="search-input-wrap">
              <span className="search-icon" aria-hidden="true">⌕</span>
              <input
                id="productSearch"
                type="search"
                placeholder="Try kurti, dress or saree..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Filter Pills */}
          <div className="collection-filters" role="group" aria-label="Filter collection by mood">
            <button
              type="button"
              className={`filter-pill ${activeFilter === 'all' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Pieces
            </button>
            <button
              type="button"
              className={`filter-pill ${activeFilter === 'casual' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('casual')}
            >
              Everyday Wear
            </button>
            <button
              type="button"
              className={`filter-pill ${activeFilter === 'festive' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('festive')}
            >
              Festive Edit
            </button>
          </div>

          <p className="tool-feedback" aria-live="polite">
            {filteredProducts.length === productsList.length
              ? `Showing the full edit (${productsList.length} pieces)`
              : `Showing ${filteredProducts.length} of ${productsList.length} pieces`}
          </p>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <h3>No pieces match "{searchQuery}"</h3>
            <p>Try searching with another word or browse our customisation options.</p>
            <button
              type="button"
              className="button button--outline"
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
            >
              Reset Search Filter
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={wishlist.has(product.id)}
                isInCart={cart.some((item) => item.id === product.id)}
                onToggleFavorite={onToggleFavorite}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}

        {/* Collection Footer Callout */}
        <div className="collection-footer">
          <div className="collection-note">
            <h4>Looking for a different size, colour or customisation?</h4>
            <p>
              Every Saha piece can be tailored to your measurements or rendered in
              alternative handloom textiles.
            </p>
          </div>
          <a
            href="https://wa.me/919964447242?text=Hello%20Saha%20Couture,%20I%20would%20like%20to%20discuss%20a%20custom%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Ask Saha on WhatsApp <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
