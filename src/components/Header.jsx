import React, { useState } from 'react';
import { ASSETS } from '../config/assets';

/* =========================================================================
   COMPONENT: Header
   Top navigation bar with logo, navigation links, audio toggle, bag badge,
   and mobile drawer navigation.
   ========================================================================= */
export default function Header({
  cartCount = 0,
  wishlistCount = 0,
  isPlayingAudio = false,
  onToggleAudio,
  onOpenCartModal,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header" id="siteHeader">
      <div className="site-header__inner">
        {/* ===== BRAND LOGO ===== */}
        <a href="#top" className="brand" aria-label="Saha Couture Home" onClick={closeMenu}>
          <img
            src={ASSETS.logo}
            alt="Saha Couture — Fashion for Women & Kids"
            className="brand__logo"
            onError={(e) => {
              // Fallback to card logo if clean version is unavailable
              e.currentTarget.src = ASSETS.logoCard;
            }}
          />
        </a>

        {/* Desktop Navigation (Our Story removed) */}
        <nav className="site-nav" aria-label="Main Navigation">
          <a href="#women" className="site-nav__link">Women</a>
          <a href="#kids" className="site-nav__link">Kids</a>
          <a href="#style-finder" className="site-nav__link site-nav__link--highlight">
            Style Finder <span className="nav-badge">CRUD</span>
          </a>
          <a href="#atelier" className="site-nav__link">Atelier</a>
          <a href="#visit" className="site-nav__link">Visit</a>
        </nav>

        {/* Header Right Actions */}
        <div className="header-actions">
          {/* Audio Music Toggle Button */}
          <button
            type="button"
            className={`header-tool-btn ${isPlayingAudio ? 'is-playing' : ''}`}
            onClick={onToggleAudio}
            aria-label={isPlayingAudio ? 'Pause background music' : 'Play background music'}
            title={isPlayingAudio ? 'Pause ambient boutique music' : 'Play ambient boutique music'}
          >
            <span className="music-note">{isPlayingAudio ? '♫ Playing' : '♪ Music'}</span>
          </button>

          {/* Wishlist Indicator */}
          {wishlistCount > 0 && (
            <a href="#women" className="header-tool-btn header-tool-btn--wishlist" title={`${wishlistCount} saved pieces`}>
              ♡ <span className="count-pill">{wishlistCount}</span>
            </a>
          )}

          {/* Shopping Bag Counter */}
          <button
            type="button"
            className="header-tool-btn header-tool-btn--bag"
            onClick={onOpenCartModal}
            aria-label={`Shopping bag with ${cartCount} items`}
            title="View Shopping Bag"
          >
            <span>Bag</span>
            <span className="count-pill">{cartCount}</span>
          </button>

          {/* Studio WhatsApp Link */}
          <a
            href="https://wa.me/919964447242"
            target="_blank"
            rel="noopener noreferrer"
            className="header-cta"
          >
            Book <span>↗</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className={`mobile-menu-btn ${mobileMenuOpen ? 'is-active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-label="Mobile Navigation">
          <nav className="mobile-drawer__nav">
            <a href="#women" onClick={closeMenu}>Women's Edit</a>
            <a href="#kids" onClick={closeMenu}>Kids Collection</a>
            <a href="#style-finder" onClick={closeMenu} className="highlight">
              Find Your Saha Edit (CRUD)
            </a>
            <a href="#atelier" onClick={closeMenu}>The Atelier & Craft</a>
            <a href="#visit" onClick={closeMenu}>Visit the Studio</a>
            <div className="mobile-drawer__footer">
              <a
                href="https://wa.me/919964447242"
                target="_blank"
                rel="noopener noreferrer"
                className="button button--dark"
                onClick={closeMenu}
              >
                Chat on WhatsApp ↗
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
