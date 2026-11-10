/* =========================================================================
   SAHA COUTURE — CENTRAL ASSETS CONFIGURATION
   =========================================================================
   IMPORTANT FOR FUTURE CUSTOMIZATION:
   To insert new images, videos, or audio into this website:
   1. Place your new media files inside the 'public/assets/' folder.
   2. Change the corresponding file path in this dictionary below.
   3. The entire website will automatically use your new images/videos!
   ========================================================================= */

export const ASSETS = {
  // Brand Logo (Header, Hero, Footer)
  // Transparent butterfly emblem & typography
  logo: './assets/SahaLogo-clean.png',
  logoCard: './assets/SahaLogo-card.png',
  logoOriginal: './assets/SahaLogo.png',

  // Hero Section Media
  hero: {
    saree: './assets/saree.jpg',
    kurta: './assets/kurta.jpg',
    everyday: './assets/everyday.jpg',
    storefront: './assets/storefront.png',
  },

  // Women's Collection Products
  // REPLACE PRODUCT IMAGES HERE:
  products: {
    kurti: {
      id: 'prod-1',
      title: 'Embroidered Kurti',
      subtitle: 'Hand-finished · Easy occasion',
      price: 1899,
      tag: 'Everyday favourite',
      category: 'women',
      occasion: 'casual',
      image: './assets/kurta.jpg',
      description: 'Soft structure and graceful lines tailored from pure cotton silk with intricate neck embroidery.',
    },
    dress: {
      id: 'prod-2',
      title: 'Everyday Dress',
      subtitle: 'Soft structure · Easy movement',
      price: 2190,
      tag: 'New in',
      category: 'women',
      occasion: 'casual',
      image: './assets/everyday.jpg',
      description: 'Airy, relaxed silhouette designed for comfort throughout sunny Bangalore days and easy evenings.',
    },
    saree: {
      id: 'prod-3',
      title: 'Festive Saree',
      subtitle: 'Celebration · Thoughtful detail',
      price: 2990,
      tag: 'Festive edit',
      category: 'women',
      occasion: 'festive',
      image: './assets/saree.jpg',
      description: 'Rich handloom weave featuring authentic zari border accents and timeless drape for festive celebrations.',
    },
  },

  // Atelier & Craftsmanship Video
  atelier: {
    video: './assets/craftsmanship.mp4',
    poster: './assets/storefront.png',
  },

  // Kids Collection
  kids: {
    image: './assets/image1.jpg',
  },

  // Background Ambient Music
  audio: {
    backgroundMusic: './assets/audio1.mp3',
  },
};

export default ASSETS;
