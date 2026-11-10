import React from 'react';

/* =========================================================================
   COMPONENT: IntroSection
   Editorial introduction presenting the boutique's core philosophy.
   ========================================================================= */
export default function IntroSection() {
  return (
    <section className="section section--cream intro-section" aria-labelledby="introHeading">
      <div className="section-inner intro">
        <p className="section-kicker">The Saha Approach</p>

        <div className="intro__content">
          <h2 className="editorial-heading" id="introHeading">
            Clothes with a little more <em>intention.</em>
          </h2>

          <p className="intro__copy">
            Saha Couture is a small fashion boutique built around the belief that
            <strong> personal style does not have to be loud to be memorable.</strong> We
            bring together considered silhouettes, thoughtful tailoring, and fabrics chosen
            for real life — pieces that feel easy on ordinary mornings and special when
            the occasion calls for it.
          </p>

          <div className="intro__pillars">
            <div className="pillar">
              <span className="pillar__num">01</span>
              <h4>Ready-to-Wear</h4>
              <p>Considered seasonal edits for women and little ones.</p>
            </div>
            <div className="pillar">
              <span className="pillar__num">02</span>
              <h4>Bespoke Tailoring</h4>
              <p>Custom fittings, necklines, cuts, and custom fabrics.</p>
            </div>
            <div className="pillar">
              <span className="pillar__num">03</span>
              <h4>Alterations</h4>
              <p>Meticulous adjustments so pieces fall just right on you.</p>
            </div>
          </div>

          <div className="intro__line">
            <span></span>
            <p>Women · Kids · Customisation · Alterations · Bengaluru</p>
          </div>
        </div>
      </div>
    </section>
  );
}
