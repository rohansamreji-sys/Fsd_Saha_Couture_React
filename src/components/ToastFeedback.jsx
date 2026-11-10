import React from 'react';

/* =========================================================================
   COMPONENT: ToastFeedback
   Transient toast notification banner for CRUD actions and interactions.
   ========================================================================= */
export default function ToastFeedback({ toast, onClose }) {
  if (!toast || !toast.message) return null;

  return (
    <div
      className={`site-toast is-visible ${toast.type ? `site-toast--${toast.type}` : ''}`}
      role="status"
      aria-live="polite"
    >
      <div className="toast-content">
        <span className="toast-icon">
          {toast.type === 'success' ? '✓' : toast.type === 'error' ? '⚠' : '✦'}
        </span>
        <span className="toast-msg">{toast.message}</span>
      </div>
      <button
        type="button"
        className="toast-close"
        onClick={onClose}
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  );
}
