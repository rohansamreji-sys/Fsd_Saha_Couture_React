import React, { useEffect, useState } from 'react';

/* =========================================================================
   COMPONENT: SessionStrip
   Persists current visit dressing mood using the Session Storage API.
   ========================================================================= */
export default function SessionStrip({ onMoodChange }) {
  const [selectedMood, setSelectedMood] = useState('');
  const [savedFeedback, setSavedFeedback] = useState('');

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('saha_session_mood');
      if (saved) {
        setSelectedMood(saved);
        setSavedFeedback(`Current session mood: "${saved}"`);
      }
    } catch {
      // SessionStorage disabled or unavailable
    }
  }, []);

  const handleSaveMood = () => {
    if (!selectedMood) {
      setSavedFeedback('Please select a dressing mood first.');
      return;
    }
    try {
      sessionStorage.setItem('saha_session_mood', selectedMood);
      setSavedFeedback(`Saved for this visit: "${selectedMood}"`);
      if (onMoodChange) onMoodChange(selectedMood);
    } catch {
      setSavedFeedback(`Session mood active: "${selectedMood}"`);
    }
  };

  return (
    <section className="session-strip" aria-label="Session Dressing Mood Preference">
      <div className="session-strip__inner">
        <div className="session-strip__intro">
          <p className="section-kicker">For This Visit</p>
          <h3 className="session-strip__title">Remember the mood you're shopping for.</h3>
        </div>

        <div className="session-strip__controls">
          <label htmlFor="sessionMoodSelect" className="sr-only">
            Select visit mood
          </label>
          <select
            id="sessionMoodSelect"
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
            className="session-select"
          >
            <option value="">Choose your mood...</option>
            <option value="Quiet & Minimal">Quiet &amp; Minimal</option>
            <option value="Festive & Expressive">Festive &amp; Expressive</option>
            <option value="Easy & Everyday">Easy &amp; Everyday</option>
            <option value="Celebration & Bridal">Celebration &amp; Bridal</option>
          </select>

          <button
            type="button"
            className="minimal-action session-btn"
            onClick={handleSaveMood}
          >
            Save for this visit
          </button>

          {savedFeedback && (
            <span className="session-feedback" role="status" aria-live="polite">
              {savedFeedback}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
