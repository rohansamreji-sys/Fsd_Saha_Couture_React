import React from 'react';
import { ASSETS } from '../config/assets';

/* =========================================================================
   COMPONENT: KidsSection
   Children's boutique collection showcase (Ages 2–12).
   -------------------------------------------------------------------------
   NOTE FOR FUTURE CUSTOMIZATION:
   Kids collection photo is defined in `ASSETS.kids.image` in 'src/config/assets.js'.
   ========================================================================= */
export default function KidsSection() {
  return (
    <section className="section section--cream kids-section" id="kids" aria-labelledby="kidsHeading">
      <div className="section-inner kids-grid">
        <div className="kids-image-wrap">
          {/* ===== IMAGE ASSET LOCATION: REPLACE KIDS IMAGE HERE =====
              Current path: {ASSETS.kids.image} */}
          <img
            src={ASSETS.kids.image}
            alt="Saha Couture Children's Collection"
            className="kids-image"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src =
                'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="600" viewBox="0 0 500 600"><rect width="500" height="600" fill="%23f0e5da"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-size="22" fill="%23a76459">Saha Kids Edit</text></svg>';
            }}
          />
          {/* ========================================================= */}
          <div className="kids-image-badge">Ages 2–12</div>
        </div>

        <div className="kids-copy">
          <p className="section-kicker">05 / KIDS</p>
          <h2 className="editorial-heading" id="kidsHeading">
            Little clothes.<br />
            <em>Lovely details.</em>
          </h2>
          <p>
            Comfortable enough for growing days and special enough for family photographs,
            festival celebrations, birthdays, and little moments worth remembering.
          </p>
          <p className="kids-subcopy">
            Crafted with soft breathable cotton linings, natural dyes, and itch-free inner seams
            so kids stay happy and comfortable all celebration long.
          </p>
          <div className="kids-actions">
            <a
              className="button button--dark"
              href="https://wa.me/919964447242?text=Hello%20Saha%20Couture,%20I%20would%20like%20to%20know%20more%20about%20the%20kids%20collection."
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask about the kids edit <span>↗</span>
            </a>
            <a href="#style-finder" className="text-link">
              Create a kids style profile <span>↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
