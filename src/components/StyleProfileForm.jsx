import React, { useEffect, useId, useState } from 'react';

/* =========================================================================
   COMPONENT: StyleProfileForm
   Handles CREATE and UPDATE operations for the customer style profile.
   Fulfills all Lab 5 & 6 requirements:
   - Functional Component with JSX
   - useState() Hook for form state management
   - Event Handling (onChange, onSubmit, onReset)
   - Multiple Input Fields (Name, Phone, Category, Occasion, Budget, Style, Notes)
   - Radio Buttons (Traditional, Contemporary, Minimal, Fusion)
   - Select Dropdowns (Category, Occasion)
   - Validation & dynamic recommendation feedback
   ========================================================================= */

const INITIAL_FORM_STATE = {
  customerName: '',
  contactPhone: '',
  category: 'Women',
  occasion: 'Everyday',
  budget: '',
  preferredStyle: 'Traditional',
  preferences: '',
};

export default function StyleProfileForm({
  editingProfile = null,
  onSaveProfile,
  onCancelEdit,
}) {
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameInputId = useId();
  const phoneInputId = useId();
  const categorySelectId = useId();
  const occasionSelectId = useId();
  const budgetInputId = useId();
  const notesTextareaId = useId();

  // Populate form when editing an existing profile
  useEffect(() => {
    if (editingProfile) {
      setForm({
        customerName: editingProfile.customerName || '',
        contactPhone: editingProfile.contactPhone || '',
        category: editingProfile.category || 'Women',
        occasion: editingProfile.occasion || 'Everyday',
        budget: editingProfile.budget ? String(editingProfile.budget) : '',
        preferredStyle: editingProfile.preferredStyle || 'Traditional',
        preferences: editingProfile.preferences || '',
      });
      setErrors({});
    } else {
      setForm(INITIAL_FORM_STATE);
      setErrors({});
    }
  }, [editingProfile]);

  // Form input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Form validation
  const validate = () => {
    const newErrors = {};
    if (!form.customerName.trim()) {
      newErrors.customerName = 'Please enter your customer name.';
    } else if (form.customerName.trim().length < 2) {
      newErrors.customerName = 'Name must be at least 2 characters.';
    }

    if (!form.budget) {
      newErrors.budget = 'Please enter your approximate budget.';
    } else if (Number(form.budget) <= 0 || isNaN(Number(form.budget))) {
      newErrors.budget = 'Please enter a valid positive budget amount in ₹.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSaveProfile({
        customerName: form.customerName.trim(),
        contactPhone: form.contactPhone.trim() || '+91 99644 47242',
        category: form.category,
        occasion: form.occasion,
        budget: Number(form.budget),
        preferredStyle: form.preferredStyle,
        preferences: form.preferences.trim(),
      });

      if (!editingProfile) {
        setForm(INITIAL_FORM_STATE);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form handler
  const handleReset = () => {
    setForm(INITIAL_FORM_STATE);
    setErrors({});
    if (editingProfile && onCancelEdit) {
      onCancelEdit();
    }
  };

  // Dynamic boutique recommendation engine based on current form inputs
  const getDynamicRecommendation = () => {
    const b = Number(form.budget) || 0;
    if (form.category === 'Kids') {
      return 'For little ones, we recommend comfortable cotton-lined festive dhoti-kurta or twirl dresses made to move freely without skin irritation.';
    }
    if (form.occasion === 'Festive' || form.occasion === 'Wedding') {
      if (b >= 3000) {
        return 'We recommend our Festive Handloom Banarasi Saree with antique gold zari border and custom blouse tailoring.';
      }
      return 'We recommend our Handcrafted Chanderi Kurta set with delicate neckline threadwork and matching dupatta.';
    }
    if (form.preferredStyle === 'Minimal') {
      return 'We recommend our Everyday Structured Dress in breathable earthy linen with discreet in-seam pockets.';
    }
    return 'We recommend our Hand-Embroidered Cotton Kurti in terracotta rose, cut for soft structure and effortless daily elegance.';
  };

  return (
    <div className="style-profile-form-wrap" id="style-finder">
      <div className="style-profile-form-card">
        {/* Card Header */}
        <div className="form-card-header">
          <span className="form-badge">
            {editingProfile ? 'MODIFICATION MODE (UPDATE)' : 'PERSONALISATION MODULE (CREATE)'}
          </span>
          <h3 className="form-card-title">
            {editingProfile ? `Update Style Profile: ${editingProfile.customerName}` : 'Find Your Saha Edit'}
          </h3>
          <p className="form-card-subtitle">
            Share your preferences and create a bespoke style profile for a tailored boutique consultation.
          </p>
        </div>

        {/* The Form */}
        <form className="style-form" onSubmit={handleSubmit} noValidate>
          {/* Row 1: Customer Name & Contact Phone */}
          <div className="form-grid-2">
            <div className="field-group">
              <label htmlFor={nameInputId} className="field-label">
                Customer Name <span className="required-star">*</span>
              </label>
              <input
                id={nameInputId}
                name="customerName"
                type="text"
                placeholder="e.g. Ananya Sharma"
                value={form.customerName}
                onChange={handleChange}
                className={`field-input ${errors.customerName ? 'is-invalid' : ''}`}
                maxLength={45}
                required
              />
              {errors.customerName && <p className="field-error">{errors.customerName}</p>}
            </div>

            <div className="field-group">
              <label htmlFor={phoneInputId} className="field-label">
                Contact Phone / WhatsApp <span className="optional-tag">(Optional)</span>
              </label>
              <input
                id={phoneInputId}
                name="contactPhone"
                type="tel"
                placeholder="e.g. +91 98450 12345"
                value={form.contactPhone}
                onChange={handleChange}
                className="field-input"
                maxLength={20}
              />
              <span className="field-hint">Used for WhatsApp tailoring updates</span>
            </div>
          </div>

          {/* Row 2: Select Dropdowns (Category & Occasion) */}
          <div className="form-grid-2">
            <div className="field-group">
              <label htmlFor={categorySelectId} className="field-label">
                Shopping Category <span className="required-star">*</span>
              </label>
              <select
                id={categorySelectId}
                name="category"
                value={form.category}
                onChange={handleChange}
                className="field-select"
              >
                <option value="Women">Women's Couture</option>
                <option value="Kids">Kids (Ages 2–12)</option>
              </select>
            </div>

            <div className="field-group">
              <label htmlFor={occasionSelectId} className="field-label">
                Occasion / Dressing Mood <span className="required-star">*</span>
              </label>
              <select
                id={occasionSelectId}
                name="occasion"
                value={form.occasion}
                onChange={handleChange}
                className="field-select"
              >
                <option value="Everyday">Everyday Dressing</option>
                <option value="Festive">Festive Celebration</option>
                <option value="Wedding">Wedding & Bridal</option>
                <option value="Party">Party & Evening</option>
                <option value="Office">Office & Workwear</option>
              </select>
            </div>
          </div>

          {/* Row 3: Budget Input */}
          <div className="field-group">
            <label htmlFor={budgetInputId} className="field-label">
              Approximate Budget (₹ INR) <span className="required-star">*</span>
            </label>
            <div className="currency-input-wrap">
              <span className="currency-symbol">₹</span>
              <input
                id={budgetInputId}
                name="budget"
                type="number"
                min="100"
                step="50"
                placeholder="e.g. 3500"
                value={form.budget}
                onChange={handleChange}
                className={`field-input field-input--currency ${errors.budget ? 'is-invalid' : ''}`}
                required
              />
            </div>
            {errors.budget && <p className="field-error">{errors.budget}</p>}
          </div>

          {/* Row 4: Radio Buttons for Preferred Style */}
          <div className="field-group">
            <span className="field-label">
              Preferred Style Aesthetic <span className="required-star">*</span>
            </span>
            <div className="radio-group" role="radiogroup" aria-label="Preferred style aesthetic">
              {[
                { val: 'Traditional', label: 'Traditional & Heritage' },
                { val: 'Contemporary', label: 'Contemporary' },
                { val: 'Minimal', label: 'Quiet Minimal' },
                { val: 'Fusion', label: 'Indo-Western Fusion' },
              ].map(({ val, label }) => (
                <label key={val} className={`radio-pill ${form.preferredStyle === val ? 'is-selected' : ''}`}>
                  <input
                    type="radio"
                    name="preferredStyle"
                    value={val}
                    checked={form.preferredStyle === val}
                    onChange={handleChange}
                    className="radio-input"
                  />
                  <span className="radio-dot"></span>
                  <span className="radio-text">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Row 5: Textarea for Additional Preferences */}
          <div className="field-group">
            <div className="field-label-row">
              <label htmlFor={notesTextareaId} className="field-label">
                Additional Preferences & Notes <span className="optional-tag">(Optional)</span>
              </label>
              <span className="char-count">{form.preferences.length}/150</span>
            </div>
            <textarea
              id={notesTextareaId}
              name="preferences"
              rows={3}
              maxLength={150}
              placeholder="Colours, fabrics, custom sleeve lengths, neckline preferences, or tailoring notes..."
              value={form.preferences}
              onChange={handleChange}
              className="field-textarea"
            />
          </div>

          {/* Dynamic Recommendation Box */}
          <div className="recommendation-box" role="status" aria-live="polite">
            <div className="recommendation-header">
              <span className="recommendation-sparkle">✦</span>
              <strong>Saha Atelier Suggestion:</strong>
            </div>
            <p className="recommendation-text">{getDynamicRecommendation()}</p>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button
              type="submit"
              className="button button--dark form-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? 'Saving...'
                : editingProfile
                ? 'Update Style Profile ↗'
                : 'Save Style Profile ↗'}
            </button>

            <button
              type="button"
              className="button button--outline"
              onClick={handleReset}
            >
              {editingProfile ? 'Cancel Edit' : 'Clear Form'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
