import React from 'react';

/* =========================================================================
   COMPONENT: BrandBar
   Displays top announcement strip with domain tagline and live database status.
   ========================================================================= */
export default function BrandBar({ storageSource }) {
  return (
    <div className="brand-bar" role="region" aria-label="Brand Announcement">
      <div className="brand-bar__inner">
        <p className="brand-bar__tagline">
          Thoughtful clothing · Tailoring · Customisation · Bengaluru
        </p>
        <div className="brand-bar__status" title={`Current Storage: ${storageSource}`}>
          <span className="brand-bar__status-dot"></span>
          <span className="brand-bar__status-text">
            {storageSource.includes('JSON Server') ? 'REST API (JSON Server)' : 'Local Storage (Active)'}
          </span>
        </div>
      </div>
    </div>
  );
}
