import React, { useState } from 'react';

/* =========================================================================
   COMPONENT: VisitSection
   Physical studio location, operating hours, directions, Clipboard API,
   Geolocation API distance finder, and interactive Google Maps embed.
   ========================================================================= */
export default function VisitSection() {
  const [copyFeedback, setCopyFeedback] = useState('');
  const [locationFeedback, setLocationFeedback] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  const addressText =
    'Saha Couture, Banjara Main Rd, Banjara Layout, Kalkere, Bengaluru, Karnataka 560113';

  // Copy Address to Clipboard using modern Clipboard API
  const handleCopyAddress = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(addressText);
        setCopyFeedback('✓ Address copied to clipboard!');
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = addressText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopyFeedback('✓ Address copied to clipboard!');
      }
    } catch {
      setCopyFeedback('Address: Banjara Layout, Kalkere, Bengaluru 560113');
    }

    setTimeout(() => setCopyFeedback(''), 4000);
  };

  // Browser Geolocation API
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationFeedback('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setLocationFeedback('Detecting your location...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const lat = position.coords.latitude.toFixed(4);
        const lon = position.coords.longitude.toFixed(4);

        // Approximate distance calculation from Saha Couture coordinates
        // Saha Couture approx coordinates: 13.0382° N, 77.6744° E
        const studioLat = 13.0382;
        const studioLon = 77.6744;
        const dLat = (position.coords.latitude - studioLat) * 111;
        const dLon = (position.coords.longitude - studioLon) * 105;
        const distanceKm = Math.sqrt(dLat * dLat + dLon * dLon).toFixed(1);

        setLocationFeedback(
          `✓ Located: (${lat}°, ${lon}°). You are approx. ${distanceKm} km from the boutique!`
        );
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationFeedback('Location access was declined in browser.');
        } else {
          setLocationFeedback('Unable to determine location at this time.');
        }
      },
      { timeout: 8000 }
    );
  };

  return (
    <section className="section section--cream visit-section" id="visit" aria-labelledby="visitHeading">
      <div className="section-inner">
        <div className="section-heading">
          <div>
            <p className="section-kicker">07 / VISIT</p>
            <h2 className="editorial-heading" id="visitHeading">
              Come <em>by.</em>
            </h2>
          </div>
          <p className="section-description">
            See the pieces in person, talk through customisation, or simply spend some
            unhurried time with the collection in our Bengaluru boutique.
          </p>
        </div>

        <div className="visit-grid">
          {/* Studio Contact Card */}
          <div className="visit-card">
            <p className="overline">SAHA COUTURE BOUTIQUE</p>
            <address className="visit-address">
              <strong>Saha Couture</strong><br />
              Banjara Main Rd, Banjara Layout,<br />
              Kalkere, Bengaluru,<br />
              Karnataka 560113, India
            </address>

            <div className="hours-block">
              <div className="hours-row">
                <span>Monday – Saturday:</span>
                <strong>10:30 AM – 7:30 PM</strong>
              </div>
              <div className="hours-row">
                <span>Sunday:</span>
                <strong>By Appointment Only</strong>
              </div>
            </div>

            <div className="visit-actions">
              <a
                className="button button--dark"
                href="https://www.google.com/maps/search/?api=1&query=Saha+Couture+Banjara+Layout+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions <span>↗</span>
              </a>

              <button
                type="button"
                className="button button--outline"
                onClick={handleCopyAddress}
              >
                Copy address
              </button>
            </div>

            {copyFeedback && (
              <p className="micro-feedback is-success" role="status" aria-live="polite">
                {copyFeedback}
              </p>
            )}

            {/* Geolocation Tool */}
            <div className="location-tool">
              <strong>Near the boutique?</strong>
              <p>
                Use your browser location to check your approximate distance context.
                Your coordinates are never stored.
              </p>
              <button
                type="button"
                className="minimal-action location-btn"
                onClick={handleGetLocation}
                disabled={isLocating}
              >
                {isLocating ? 'Locating...' : 'Check my location 📍'}
              </button>
              {locationFeedback && (
                <p className="micro-feedback" role="status" aria-live="polite">
                  {locationFeedback}
                </p>
              )}
            </div>

            {/* Direct Channels */}
            <div className="social-actions">
              <a
                href="https://wa.me/919964447242"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp (+91 99644 47242) ↗
              </a>
              <a
                href="https://www.instagram.com/sahacouturedesigner/"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram (@sahacouturedesigner) ↗
              </a>
            </div>
          </div>

          {/* Interactive Google Map Card */}
          <div className="map-card">
            {/* ===== GOOGLE MAPS EMBED URL ===== */}
            <iframe
              title="Saha Couture Location Map"
              src="https://www.google.com/maps?q=Saha%20Couture%20Banjara%20Layout%20Bengaluru&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="map-iframe"
            />
            {/* ================================== */}
            <div className="map-caption">
              <span>Banjara Layout, Bengaluru</span>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Saha+Couture+Banjara+Layout+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Maps ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
