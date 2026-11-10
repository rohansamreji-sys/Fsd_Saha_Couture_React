import React from 'react';
import { ASSETS } from '../config/assets';

/* =========================================================================
   COMPONENT: Footer
   Site footer with brand logo, quick navigation links, social channels,
   and copyright attribution. (Our Story removed)
   ========================================================================= */
export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__main">
        {/* Brand Information */}
        <div className="footer-brand">
          <img
            src={ASSETS.logo}
            alt="Saha Couture"
            className="footer-logo"
            onError={(e) => { e.currentTarget.src = ASSETS.logoCard; }}
          />
          <p className="footer-tagline">
            Beautifully made.<br />
            Quietly discovered.
          </p>
          <p className="footer-meta">
            Designer fashion boutique for women and children in Bengaluru.
          </p>
        </div>

        {/* Navigation Links (Our Story removed) */}
        <div className="footer-nav-col">
          <h4 className="footer-col-title">Navigation</h4>
          <div className="footer-links">
            <a href="#hero">Hero &amp; 3D Atelier</a>
            <a href="#women">Women's Edit</a>
            <a href="#kids">Kids Collection</a>
            <a href="#style-finder">Style Finder (CRUD)</a>
            <a href="#atelier">The Atelier</a>
            <a href="#visit">Visit the Studio</a>
          </div>
        </div>

        {/* Contact & Studio Channels */}
        <div className="footer-nav-col">
          <h4 className="footer-col-title">Studio &amp; Hours</h4>
          <address className="footer-address">
            Banjara Main Rd, Kalkere,<br />
            Bengaluru, Karnataka 560113
          </address>
          <div className="footer-contact-links">
            <a
              href="https://wa.me/919964447242"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-channel-link"
            >
              WhatsApp (+91 99644 47242) ↗
            </a>
            <a
              href="https://www.instagram.com/sahacouturedesigner/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-channel-link"
            >
              Instagram (@sahacouturedesigner) ↗
            </a>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>© 2026 Saha Couture. Designed slowly, worn often.</span>
        <span>Lab Exercise 5 &amp; 6: Domain-Based React CRUD Application · Bengaluru</span>
      </div>
    </footer>
  );
}
