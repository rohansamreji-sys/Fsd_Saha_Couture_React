import React from 'react';

/* =========================================================================
   COMPONENT: DailyFashionNote
   Editorial quote strip with daily styling inspiration.
   ========================================================================= */
export default function DailyFashionNote() {
  return (
    <section className="fashion-note" aria-label="Daily Fashion Note">
      <div className="fashion-note__inner">
        <span className="fashion-note__label">Today's Note</span>
        <p className="fashion-note__text">
          "Good style usually starts with feeling comfortable in what you wear.
          When a piece fits with intention, you never have to shout to be remembered."
        </p>
        <span className="fashion-note__mark">SAHA COUTURE · BENGALURU</span>
      </div>
    </section>
  );
}
