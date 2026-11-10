import React, { useState } from 'react';
import StyleProfileForm from './StyleProfileForm';
import ProfileList from './ProfileList';

/* =========================================================================
   COMPONENT: StyleProfileCRUD
   Compact, space-efficient CRUD module.
   Provides tabbed navigation between the consultation form (Create / Update)
   and the saved profiles list (Read / Delete & Search), significantly reducing
   excessive page scrolling while preserving 100% of the lab requirements!
   ========================================================================= */
export default function StyleProfileCRUD({
  profiles = [],
  editingProfile = null,
  loading = false,
  storageSource = '',
  onSaveProfile,
  onEditProfile,
  onDeleteProfile,
  onCancelEdit,
  onResetDemoData,
}) {
  const [activeTab, setActiveTab] = useState('form'); // 'form' | 'list'

  // When an edit is triggered, switch tab to the form automatically
  const handleEdit = (profile) => {
    setActiveTab('form');
    onEditProfile(profile);
  };

  const handleSave = async (profileData) => {
    await onSaveProfile(profileData);
    // After saving or updating, switch to list view to see the result
    setActiveTab('list');
  };

  return (
    <section
      className="section section--rose style-crud-section"
      id="style-finder"
      aria-labelledby="styleFinderHeading"
    >
      <div className="section-inner style-crud-inner">
        {/* Module Header */}
        <div className="section-heading text-center">
          <p className="section-kicker">03 / BESPOKE CONSULTATION &amp; CRUD MODULE</p>
          <h2 className="editorial-heading" id="styleFinderHeading">
            Find Your <em>Saha Edit.</em>
          </h2>
          <p className="section-description mx-auto">
            Manage your bespoke style profiles with full React CRUD operations, dynamic
            storage synchronization, and dynamic search filtering.
          </p>
        </div>

        {/* Compact Mode Switcher Tabs */}
        <div className="crud-mode-tabs" role="tablist" aria-label="CRUD View Mode">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'form'}
            className={`crud-mode-tab ${activeTab === 'form' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('form')}
          >
            {editingProfile ? '✎ Edit Profile (Update)' : '✦ Create Style Profile'}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'list'}
            className={`crud-mode-tab ${activeTab === 'list' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            📋 Saved Profiles ({profiles.length})
          </button>
        </div>

        {/* Tab 1: Form View (Create & Update) */}
        {activeTab === 'form' && (
          <StyleProfileForm
            editingProfile={editingProfile}
            onSaveProfile={handleSave}
            onCancelEdit={() => {
              if (onCancelEdit) onCancelEdit();
              setActiveTab('list');
            }}
          />
        )}

        {/* Tab 2: List View (Read & Delete + Dynamic Search) */}
        {activeTab === 'list' && (
          <ProfileList
            profiles={profiles}
            loading={loading}
            storageSource={storageSource}
            onEditProfile={handleEdit}
            onDeleteProfile={onDeleteProfile}
            onResetDemoData={onResetDemoData}
          />
        )}
      </div>
    </section>
  );
}
