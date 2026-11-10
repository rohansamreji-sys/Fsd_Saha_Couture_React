import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ASSETS } from './config/assets';
import {
  getProfiles,
  addProfile,
  updateProfile,
  deleteProfile,
  resetToDemoData,
} from './services/storageService';

// Component Imports (OurStorySection removed as requested)
import BrandBar from './components/BrandBar';
import Header from './components/Header';
import Hero3D from './components/Hero3D';
import IntroSection from './components/IntroSection';
import CollectionSection from './components/CollectionSection';
import StyleProfileCRUD from './components/StyleProfileCRUD';
import SessionStrip from './components/SessionStrip';
import AtelierSection from './components/AtelierSection';
import KidsSection from './components/KidsSection';
import DailyFashionNote from './components/DailyFashionNote';
import VisitSection from './components/VisitSection';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import ToastFeedback from './components/ToastFeedback';

/* =========================================================================
   APPLICATION ROOT: Saha Couture React
   -------------------------------------------------------------------------
   Updated according to feedback:
   - "Our Story" section completely removed
   - 3D Realistic rotating clothes showcase (Saree, Kurta, Lehenga, Everyday Dress)
   - Saha Couture logo card cleanly embedded
   - Compact, reduced-scroll layout with tabbed CRUD module
   ========================================================================= */
export default function App() {
  // 1. Database & CRUD State
  const [profiles, setProfiles] = useState([]);
  const [editingProfile, setEditingProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [storageSource, setStorageSource] = useState('Local Storage');

  // 2. Boutique Interaction State (Wishlist & Cart)
  const [wishlist, setWishlist] = useState(new Set());
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 3. Ambient Boutique Audio State
  const audioRef = useRef(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // 4. Feedback Toast State
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);

  const showToast = (message, type = 'success') => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ message, type });
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // -----------------------------------------------------------------------
  // CRUD OPERATION: READ (Fetch profiles on initial load)
  // -----------------------------------------------------------------------
  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getProfiles();
      setProfiles(result.data || []);
      setStorageSource(result.source || 'Local Storage');
    } catch (err) {
      console.error('Failed to load profiles:', err);
      showToast('Could not load profiles from server, using local store', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  // -----------------------------------------------------------------------
  // CRUD OPERATION: CREATE & UPDATE
  // -----------------------------------------------------------------------
  const handleSaveProfile = async (profileData) => {
    try {
      if (editingProfile) {
        // UPDATE Operation
        const result = await updateProfile(editingProfile.id, profileData);
        setEditingProfile(null);
        await fetchProfiles();
        showToast(
          `✓ Updated profile for "${result.profile?.customerName || profileData.customerName}"!`,
          'success'
        );
      } else {
        // CREATE Operation
        const result = await addProfile(profileData);
        await fetchProfiles();
        showToast(
          `✓ Style profile for "${result.profile?.customerName || profileData.customerName}" saved successfully!`,
          'success'
        );
      }
    } catch (err) {
      console.error('Error saving profile:', err);
      showToast('Unable to save profile. Please check inputs and try again.', 'error');
    }
  };

  // -----------------------------------------------------------------------
  // CRUD OPERATION: UPDATE (Trigger edit mode)
  // -----------------------------------------------------------------------
  const handleEditProfile = (profile) => {
    setEditingProfile(profile);
    const element = document.getElementById('style-finder');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Editing profile for ${profile.customerName}`, 'info');
  };

  const handleCancelEdit = () => {
    setEditingProfile(null);
    showToast('Editing cancelled', 'info');
  };

  // -----------------------------------------------------------------------
  // CRUD OPERATION: DELETE
  // -----------------------------------------------------------------------
  const handleDeleteProfile = async (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the style profile for "${name}"?\nThis action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      await deleteProfile(id);
      if (editingProfile && editingProfile.id === id) {
        setEditingProfile(null);
      }
      await fetchProfiles();
      showToast(`✓ Removed profile for "${name}"`, 'success');
    } catch (err) {
      console.error('Error deleting profile:', err);
      showToast('Could not delete profile. Please try again.', 'error');
    }
  };

  // Restore initial demo records
  const handleResetDemoData = async () => {
    const confirmed = window.confirm('Restore initial Saha Couture demo profiles?');
    if (!confirmed) return;
    resetToDemoData();
    await fetchProfiles();
    showToast('✓ Restored 4 demo customer profiles', 'success');
  };

  // -----------------------------------------------------------------------
  // WISHLIST & CART HANDLERS
  // -----------------------------------------------------------------------
  const handleToggleFavorite = (productId) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
        showToast('Removed from saved favourites', 'info');
      } else {
        next.add(productId);
        showToast('♥ Saved piece to your favourites', 'success');
      }
      return next;
    });
  };

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast(`"${product.title}" is already in your bag`, 'info');
        return prev;
      }
      showToast(`✓ Added "${product.title}" to your shopping bag!`, 'success');
      return [...prev, product];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    showToast('Removed item from bag', 'info');
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Shopping bag cleared', 'info');
  };

  // -----------------------------------------------------------------------
  // AMBIENT BACKGROUND AUDIO CONTROLLER
  // -----------------------------------------------------------------------
  const handleToggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlayingAudio) {
      audio.pause();
      setIsPlayingAudio(false);
      showToast('Ambient boutique music paused', 'info');
    } else {
      audio
        .play()
        .then(() => {
          setIsPlayingAudio(true);
          showToast('♫ Playing ambient boutique audio', 'success');
        })
        .catch((err) => {
          console.warn('Audio autoplay blocked by browser policy:', err);
          showToast('Click anywhere on the page to enable audio playback', 'info');
        });
    }
  };

  return (
    <div className="saha-app" id="top">
      {/* 1. Small Brand Bar */}
      <BrandBar storageSource={storageSource} />

      {/* 2. Header & Navigation (Our Story removed) */}
      <Header
        cartCount={cart.length}
        wishlistCount={wishlist.size}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={handleToggleAudio}
        onOpenCartModal={() => setIsCartOpen(true)}
      />

      {/* 3. Main Content Flow (Streamlined, compact scrolling) */}
      <main>
        {/* Hero Section with 3D Realistic Garment Atelier + Saha Logo */}
        <Hero3D />

        {/* Editorial Introduction (Compact) */}
        <IntroSection />

        {/* Women's Product Edit & Wishlist */}
        <CollectionSection
          wishlist={wishlist}
          cart={cart}
          onToggleFavorite={handleToggleFavorite}
          onAddToCart={handleAddToCart}
        />

        {/* Style Profile CRUD Module (Compact Tabbed View) */}
        <StyleProfileCRUD
          profiles={profiles}
          editingProfile={editingProfile}
          loading={loading}
          storageSource={storageSource}
          onSaveProfile={handleSaveProfile}
          onEditProfile={handleEditProfile}
          onDeleteProfile={handleDeleteProfile}
          onCancelEdit={handleCancelEdit}
          onResetDemoData={handleResetDemoData}
        />

        {/* Session Mood Strip */}
        <SessionStrip
          onMoodChange={(mood) => showToast(`Visit mood set to: "${mood}"`, 'info')}
        />

        {/* Atelier Craftsmanship & Video Section */}
        <AtelierSection />

        {/* Kids Collection Showcase */}
        <KidsSection />

        {/* Daily Fashion Note */}
        <DailyFashionNote />

        {/* Studio Visit & Google Maps Embed */}
        <VisitSection />
      </main>

      {/* 4. Site Footer */}
      <Footer />

      {/* 5. Shopping Bag Drawer Modal */}
      <CartModal
        isOpen={isCartOpen}
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* 6. Toast Notification Banner */}
      <ToastFeedback toast={toast} onClose={() => setToast(null)} />

      {/* 7. Hidden Ambient Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="metadata"
        src={ASSETS.audio.backgroundMusic}
      />
    </div>
  );
}
