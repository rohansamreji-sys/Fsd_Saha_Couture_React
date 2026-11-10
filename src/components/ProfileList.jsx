import React, { useMemo, useState } from 'react';

/* =========================================================================
   COMPONENT: ProfileList
   Handles READ and DELETE operations with Dynamic Live Search (Bonus Requirement).
   Displays saved customer style records in an editorial cards grid with
   edit, delete, search filtering, and storage badges.
   ========================================================================= */
export default function ProfileList({
  profiles = [],
  loading = false,
  storageSource = '',
  onEditProfile,
  onDeleteProfile,
  onResetDemoData,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');

  // Dynamic search and filter
  const filteredProfiles = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return profiles.filter((p) => {
      const matchesCategory =
        filterCategory === 'ALL' || p.category?.toUpperCase() === filterCategory;

      if (!term) return matchesCategory;

      const matchesTerm =
        p.customerName?.toLowerCase().includes(term) ||
        p.category?.toLowerCase().includes(term) ||
        p.occasion?.toLowerCase().includes(term) ||
        p.preferredStyle?.toLowerCase().includes(term) ||
        (p.contactPhone && p.contactPhone.toLowerCase().includes(term)) ||
        (p.preferences && p.preferences.toLowerCase().includes(term));

      return matchesCategory && matchesTerm;
    });
  }, [profiles, searchTerm, filterCategory]);

  return (
    <div className="profile-list-wrap">
      {/* Header with Stats and Source */}
      <div className="profile-list-header">
        <div>
          <span className="section-kicker">DATABASE RECORDS (READ & DELETE)</span>
          <h3 className="profile-list-title">Saved Customer Style Profiles</h3>
          <p className="profile-list-subtitle">
            Manage client measurements, festive edits, and tailored notes stored in{' '}
            <strong>{storageSource}</strong>.
          </p>
        </div>

        {onResetDemoData && (
          <button
            type="button"
            className="minimal-action reset-demo-btn"
            onClick={onResetDemoData}
            title="Reload initial demo profiles"
          >
            ↻ Restore Demo Records
          </button>
        )}
      </div>

      {/* Bonus: Search and Filter Control Bar */}
      <div className="profile-filter-bar">
        <div className="search-box profile-search-box">
          <label htmlFor="profileSearchInput" className="sr-only">
            Search customer records
          </label>
          <div className="search-input-wrap">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              id="profileSearchInput"
              type="search"
              placeholder="Search by customer name, style, occasion or notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoComplete="off"
            />
            {searchTerm && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchTerm('')}
                aria-label="Clear profile search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="category-pills">
          <button
            type="button"
            className={`cat-pill ${filterCategory === 'ALL' ? 'is-active' : ''}`}
            onClick={() => setFilterCategory('ALL')}
          >
            All ({profiles.length})
          </button>
          <button
            type="button"
            className={`cat-pill ${filterCategory === 'WOMEN' ? 'is-active' : ''}`}
            onClick={() => setFilterCategory('WOMEN')}
          >
            Women ({profiles.filter((p) => p.category === 'Women').length})
          </button>
          <button
            type="button"
            className={`cat-pill ${filterCategory === 'KIDS' ? 'is-active' : ''}`}
            onClick={() => setFilterCategory('KIDS')}
          >
            Kids ({profiles.filter((p) => p.category === 'Kids').length})
          </button>
        </div>
      </div>

      {/* Results Count Summary */}
      <div className="profile-count-strip">
        <span>
          Showing <strong>{filteredProfiles.length}</strong> of{' '}
          <strong>{profiles.length}</strong> profile{profiles.length === 1 ? '' : 's'}
        </span>
        {searchTerm && (
          <span className="search-active-tag">
            Filter: "{searchTerm}"{' '}
            <button type="button" onClick={() => setSearchTerm('')}>✕</button>
          </span>
        )}
      </div>

      {/* Card Grid or Empty State */}
      {loading ? (
        <div className="profiles-loading">
          <div className="spinner"></div>
          <p>Connecting to database...</p>
        </div>
      ) : filteredProfiles.length === 0 ? (
        <div className="empty-profiles-state">
          <div className="empty-icon">📂</div>
          <h4>No Style Profiles Found</h4>
          <p>
            {profiles.length === 0
              ? 'No customer records yet. Use the form above to add your first profile!'
              : 'No records matched your search query. Try another keyword or clear the search filter.'}
          </p>
          {searchTerm && (
            <button
              type="button"
              className="button button--outline"
              onClick={() => {
                setSearchTerm('');
                setFilterCategory('ALL');
              }}
            >
              Clear Search Filter
            </button>
          )}
        </div>
      ) : (
        <div className="profile-grid">
          {filteredProfiles.map((profile) => (
            <article className="profile-card" key={profile.id}>
              {/* Card Top: Name & Badges */}
              <div className="profile-card__top">
                <div>
                  <h4 className="profile-card__name">{profile.customerName}</h4>
                  {profile.contactPhone && (
                    <p className="profile-card__phone">{profile.contactPhone}</p>
                  )}
                </div>
                <div className="profile-card__tags">
                  <span className={`badge-pill badge-pill--${profile.category?.toLowerCase()}`}>
                    {profile.category}
                  </span>
                  <span className="badge-pill badge-pill--style">
                    {profile.preferredStyle}
                  </span>
                </div>
              </div>

              {/* Card Body: Occasion & Budget */}
              <div className="profile-card__details">
                <div className="detail-item">
                  <span className="detail-label">Occasion:</span>
                  <strong className="detail-value">{profile.occasion}</strong>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Budget Range:</span>
                  <strong className="detail-value detail-value--budget">
                    ₹{Number(profile.budget).toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>

              {/* Notes / Preferences */}
              {profile.preferences && (
                <div className="profile-card__notes">
                  <span className="notes-label">Atelier Notes:</span>
                  <p className="notes-body">"{profile.preferences}"</p>
                </div>
              )}

              {/* Timestamp */}
              {profile.createdAt && (
                <div className="profile-card__date">
                  Recorded: {new Date(profile.createdAt).toLocaleDateString('en-IN', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
              )}

              {/* Card Actions: EDIT & DELETE */}
              <div className="profile-card__actions">
                <button
                  type="button"
                  className="profile-btn profile-btn--edit"
                  onClick={() => onEditProfile(profile)}
                  aria-label={`Edit profile for ${profile.customerName}`}
                >
                  ✎ Edit Profile
                </button>

                <button
                  type="button"
                  className="profile-btn profile-btn--delete"
                  onClick={() => onDeleteProfile(profile.id, profile.customerName)}
                  aria-label={`Delete profile for ${profile.customerName}`}
                >
                  🗑 Delete
                </button>

                <a
                  href={`https://wa.me/919964447242?text=Hello%20${encodeURIComponent(
                    profile.customerName
                  )},%20we%20reviewed%20your%20Saha%20Couture%20style%20profile%20for%20${encodeURIComponent(
                    profile.occasion
                  )}%20(${profile.preferredStyle})%20with%20budget%20₹${profile.budget}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="profile-btn profile-btn--whatsapp"
                  title="Contact customer on WhatsApp"
                >
                  💬 WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
