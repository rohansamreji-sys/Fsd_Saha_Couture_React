import React from 'react';

/* =========================================================================
   COMPONENT: OurStorySection
   Presents the founder's journey from corporate banking to independent boutique.
   ========================================================================= */
export default function OurStorySection() {
  return (
    <section className="section section--clay story-section" id="story" aria-labelledby="storyHeading">
      <div className="section-inner story-grid">
        <p className="section-kicker">06 / OUR STORY</p>

        <div className="story-content">
          <h2 className="editorial-heading" id="storyHeading">
            From banking to <em>fashion.</em>
          </h2>

          <p className="story-lead">
            A boutique with a human beginning. Our founder left banking, studied fashion
            design, and started Saha Couture with a simple ambition: to build something
            independent around the work she genuinely loves.
          </p>

          <p>
            What began as a personal journey grew into a neighbourhood boutique in Bengaluru
            where conversations are unhurried, garments are shaped slowly, and every client
            is treated with warmth and care. Today, we bring together ready-to-wear, custom
            tailoring, festive collections, and children's edits under one roof.
          </p>

          <blockquote className="story-quote">
            “We don't need to be the biggest. We want to be worth discovering.”
          </blockquote>

          <div className="story-stats">
            <div className="stat">
              <strong>100%</strong>
              <span>Considered Fabrics</span>
            </div>
            <div className="stat">
              <strong>Bespoke</strong>
              <span>Custom Fittings</span>
            </div>
            <div className="stat">
              <strong>Bengaluru</strong>
              <span>Local Atelier</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
