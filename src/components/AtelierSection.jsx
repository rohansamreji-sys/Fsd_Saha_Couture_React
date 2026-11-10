import React, { useRef, useState } from 'react';
import { ASSETS } from '../config/assets';

/* =========================================================================
   COMPONENT: AtelierSection
   Showcases studio craftsmanship with HTML5 video and Fullscreen API.
   -------------------------------------------------------------------------
   NOTE FOR FUTURE CUSTOMIZATION:
   Video path is defined in `ASSETS.atelier.video` in 'src/config/assets.js'.
   Poster image is defined in `ASSETS.atelier.poster`.
   ========================================================================= */
export default function AtelierSection() {
  const videoRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoStatus, setVideoStatus] = useState('');

  const handleToggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!document.fullscreenElement) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      }
      setIsFullscreen(true);
      setVideoStatus('Video in fullscreen mode');
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
      setVideoStatus('');
    }
  };

  return (
    <section className="section section--dark atelier-section" id="atelier" aria-labelledby="atelierHeading">
      <div className="section-inner">
        <div className="section-heading section-heading--light">
          <div>
            <p className="section-kicker">04 / THE ATELIER</p>
            <h2 className="editorial-heading" id="atelierHeading">
              Made by <em>hand.</em>
            </h2>
          </div>
          <p className="section-description">
            Design is only part of the story. The rest is fitting, finishing,
            adjusting and making sure a piece falls and feels right on you.
          </p>
        </div>

        <div className="atelier-grid">
          {/* Atelier Video Wrap */}
          <div className="atelier-video-wrap">
            {/* ===== VIDEO ASSET LOCATION: REPLACE CRAFTSMANSHIP VIDEO HERE =====
                To update the video file, edit `ASSETS.atelier.video` in `src/config/assets.js` */}
            <video
              ref={videoRef}
              className="atelier-video"
              controls
              playsInline
              preload="metadata"
              poster={ASSETS.atelier.poster}
              onError={(e) => {
                console.warn('Video failed to load, keeping poster thumbnail:', e);
              }}
            >
              <source src={ASSETS.atelier.video} type="video/mp4" />
              Your browser does not support HTML5 video playback.
            </video>
            {/* ================================================================= */}

            <button
              type="button"
              className="video-control fullscreen-btn"
              onClick={handleToggleFullscreen}
              aria-label="Toggle fullscreen view for craftsmanship video"
              title="View craftsmanship video fullscreen"
            >
              ⛶ Fullscreen
            </button>

            {videoStatus && (
              <span className="video-feedback" role="status" aria-live="polite">
                {videoStatus}
              </span>
            )}
          </div>

          {/* Atelier Editorial Copy */}
          <div className="atelier-copy">
            <p className="atelier-number">04 / 06</p>
            <h3>Good clothes are often about the things you notice only when they are right.</h3>
            <p>
              A cleaner shoulder. A better fall. A sleeve that sits where it should.
              Our Bangalore atelier brings together tailoring, alterations and customisation
              so the final garment feels considered rather than simply finished.
            </p>
            <p className="atelier-quote">
              "We work with handloom cottons, tussar silks, banarasi brocades and natural
              linens — fabrics that age gracefully and move with you."
            </p>
            <div className="atelier-actions">
              <a href="#visit" className="text-link text-link--light">
                Book a studio fitting <span>↗</span>
              </a>
              <a
                href="https://wa.me/919964447242?text=Hello%20Saha%20Couture,%20I%20would%20like%20to%20book%20a%20tailoring%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="button button--outline button--light"
              >
                Inquire on WhatsApp ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
