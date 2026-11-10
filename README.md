# Saha Couture — Domain-Based React CRUD Application
**Lab Exercise 5 & 6: Full Stack Web Development**  
*Fashion Boutique for Women & Kids · Bengaluru*

---

## 🌟 Overview

**Saha Couture** is a production-grade, domain-based React application designed according to the specifications in **Lab Exercise 5 & 6**. Building upon the HTML/CSS/JavaScript foundation from Part 1, this React application introduces:
- **Component-Based Architecture**: Modular, reusable functional components with clear separations of concerns.
- **State Management using React Hooks**: `useState`, `useEffect`, `useCallback`, `useMemo`, and `useRef`.
- **Form Handling with Multiple Controls**: Text inputs, currency-validated numeric fields, select dropdowns, radio button groups, and auto-expanding textareas.
- **Complete CRUD Lifecycle**:
  - **Create**: Add client style profiles with instant validation and dynamic boutique suggestions.
  - **Read**: Display all persistent records in an editorial cards grid with formatted INR currency, category tags, and date stamps.
  - **Update**: Edit existing client records with automatic form pre-population, smooth auto-scroll, and storage synchronization.
  - **Delete**: Safely remove profiles with user confirmation safeguards and real-time toast feedback.
  - **Bonus Search & Dynamic Filtering**: Instant search across customer name, category, occasion, aesthetic style, and notes.
- **Dual-Mode Data Storage**:
  - **Option 1: Local Storage (Active Default)**: Works out of the box with zero configuration and zero crashes, retaining records across reloads.
  - **Option 2: JSON Server (REST API)**: Fully compatible with `db.json` on port 3001 supporting standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`).
- **Interactive 3D Realistic Fashion Atelier**: A custom WebGL Three.js interactive showcase rendering realistic Indian garments (Banarasi Silk Saree, Royal Raw Silk Kurta, Heritage Bridal Lehenga, Contemporary Anarkali) with 360-degree rotation and mouse/touch drag orbit controls.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### 1. Development Server
Clone or unzip the project, navigate into the folder, and run:
```bash
# If node_modules is already bundled, you can directly run:
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Running JSON Server (Option 2 - REST API)
To run the simulated REST API on port 3001:
```bash
npm run server
```
This runs `json-server --watch db.json --port 3001`. The application will automatically detect the server and sync all CRUD operations through HTTP requests!

### 3. Production Build
```bash
npm run build
npm run preview
```
The optimized production bundle is generated in the `dist/` directory.

---

## 🖼️ How to Insert and Replace Media (Images & Videos)

All assets are managed in a **single centralized configuration file** for effortless customization:

### Central Configuration File:
📂 `src/config/assets.js`

```javascript
export const ASSETS = {
  // Brand Logo
  logo: '/assets/SahaLogo.png',

  // Products in Women's Edit
  products: {
    kurti: { image: '/assets/kurta.jpg', ... },
    dress: { image: '/assets/everyday.jpg', ... },
    saree: { image: '/assets/saree.jpg', ... },
  },

  // Atelier Video & Poster
  atelier: {
    video: '/assets/craftsmanship.mp4',
    poster: '/assets/storefront.png',
  },

  // Kids Collection
  kids: {
    image: '/assets/image1.jpg',
  },

  // Ambient Boutique Audio
  audio: {
    backgroundMusic: '/assets/audio1.mp3',
  },
};
```

### Steps to Add a New Image or Video:
1. Copy your new image (`.jpg`, `.png`, `.webp`) or video (`.mp4`) into the `public/assets/` directory.
2. Open `src/config/assets.js`.
3. Update the corresponding file path (e.g., change `'/assets/saree.jpg'` to `'/assets/my-new-saree.jpg'`).
4. Save the file. Vite hot module reloading (HMR) will instantly update the page!

### In-Code Location Markers:
Every component contains clear comments marking media locations:
- `Header.jsx`: `/* ===== LOGO ASSET LOCATION ===== */`
- `ProductCard.jsx`: `/* ===== IMAGE ASSET LOCATION: REPLACE PRODUCT IMAGE HERE ===== */`
- `AtelierSection.jsx`: `/* ===== VIDEO ASSET LOCATION: REPLACE CRAFTSMANSHIP VIDEO HERE ===== */`
- `KidsSection.jsx`: `/* ===== IMAGE ASSET LOCATION: REPLACE KIDS IMAGE HERE ===== */`
- `Footer.jsx`: `/* ===== FOOTER LOGO ASSET LOCATION ===== */`

---

## 👗 3D Realistic Fashion Atelier (Hero Section)

Unlike generic 3D geometries, the 3D model in `Hero3D.jsx` features **realistic Indian clothing silhouettes**:
1. **Banarasi Silk Saree**:
   - Mannequin wearing a tailored silk blouse
   - Fluted pleated skirt cascading to the floor with sinusoidal accordion folds
   - Woven gold Zari metallic border hem
   - Fluid diagonal cross-body Pallu draped across the bust and over the shoulder
   - Crimson terracotta silk specular sheen
2. **Royal Raw Silk Kurta & Sherwani**:
   - Tailored straight-cut silhouette with crisp Mandarin bandhgala collar
   - Center front button placket with metallic gold buttons
   - Side vents / slits with stitch detailing
   - Draped antique gold royal stole over the left shoulder
3. **Heritage Bridal Lehenga & Choli**:
   - Sweeping 16-panel circular flared kalis skirt
   - Heavy scalloped gold Zardozi border embroidery
   - Fitted choli bodice with gold threadwork
   - Translucent sheer floating dupatta veil
4. **Contemporary Anarkali Gown**:
   - Multi-tiered umbrella flare with empire waist tailoring
   - Sage emerald and rose gold shimmer

### 3D Controls:
- **360° Smooth Rotation**: Auto-rotates slowly to showcase fabric drape from all angles.
- **Drag to Orbit**: Click/touch and drag to rotate manually horizontally and vertically.
- **Morph Tabs**: Click "Saree", "Kurta", "Lehenga", or "Anarkali" to switch looks.
- **Controls**: Pause/Rotate toggle, Reset View button, and look highlight badges.

---

## 📂 Project Directory Structure

```text
saha-couture-react/
├── db.json                      # JSON Server database file (Pre-seeded records)
├── index.html                   # HTML entry point with Cormorant Garamond & DM Sans
├── package.json                 # Project dependencies and npm scripts
├── vite.config.js               # Vite build and server configuration
├── README.md                    # Project documentation
├── LAB_REPORT.md                # 2-Page Academic Lab Exercise Report
├── public/                      # Static assets folder
│   ├── assets/
│   │   ├── SahaLogo.png         # Boutique logo
│   │   ├── saree.jpg            # Saree image
│   │   ├── kurta.jpg            # Kurta image
│   │   ├── everyday.jpg         # Everyday dress image
│   │   ├── image1.jpg           # Kids collection image
│   │   ├── storefront.png       # Atelier video poster
│   │   ├── craftsmanship.mp4    # Atelier video
│   │   └── audio1.mp3           # Ambient audio
│   └── vendor/
│       └── three.min.js         # Three.js offline bundle
└── src/
    ├── App.jsx                  # Main application state and section assembly
    ├── main.jsx                 # React root renderer
    ├── config/
    │   └── assets.js            # Central asset path management
    ├── services/
    │   └── storageService.js    # CRUD service (LocalStorage + JSON Server REST API)
    ├── styles/
    │   ├── index.css            # Global CSS variables, fonts, reset
    │   └── App.css              # Section styles, responsive design, animations
    └── components/
        ├── BrandBar.jsx         # Top announcement strip with live DB indicator
        ├── Header.jsx           # Sticky navigation, logo, audio toggle, bag badge
        ├── Hero3D.jsx           # 3D WebGL realistic clothing showcase
        ├── IntroSection.jsx     # Brand philosophy and pillars
        ├── CollectionSection.jsx# Women's edit with live search and filter pills
        ├── ProductCard.jsx      # Reusable product card with wishlist and bag actions
        ├── StyleProfileCRUD.jsx # Parent CRUD module
        ├── StyleProfileForm.jsx # Create & Update form handling
        ├── ProfileList.jsx      # Read & Delete list with dynamic search
        ├── SessionStrip.jsx     # Session storage dressing mood selector
        ├── AtelierSection.jsx   # Craftsmanship video and fullscreen API
        ├── KidsSection.jsx      # Children's collection showcase
        ├── DailyFashionNote.jsx # Editorial quote strip
        ├── OurStorySection.jsx  # Founder journey from banking to fashion
        ├── VisitSection.jsx     # Address, hours, Clipboard API, Geolocation API, Maps
        ├── Footer.jsx           # Site footer with channels and copyright
        ├── CartModal.jsx        # Shopping bag drawer with WhatsApp order link
        └── ToastFeedback.jsx    # Real-time feedback notification toasts
```

---

## 📋 Evaluation Checklist (Lab 5 & 6)

| Requirement | Implementation | Status |
| :--- | :--- | :---: |
| **Functional Components** | All 18 UI elements built as modern React functional components | ✅ Passed |
| **JSX** | Clean, accessible JSX with semantic HTML5 elements | ✅ Passed |
| **useState() Hook** | Used across form controls, profiles, wishlist, cart, 3D looks, and audio | ✅ Passed |
| **Event Handling** | `onSubmit`, `onChange`, `onClick`, `onToggle`, drag orbit listeners | ✅ Passed |
| **Form Handling** | Controlled inputs, validation, custom errors, resets, pre-population | ✅ Passed |
| **Multiple Input Fields** | Name, Phone, Category, Occasion, Budget, Style, Notes | ✅ Passed |
| **Radio Buttons** | Preferred Style: Traditional, Contemporary, Minimal, Fusion | ✅ Passed |
| **Select Dropdowns** | Shopping Category (Women/Kids) and Occasion (Everyday/Festive/etc.) | ✅ Passed |
| **Reusable Components** | `ProductCard`, `BrandBar`, `Header`, `ToastFeedback`, etc. | ✅ Passed |
| **CSS Styling** | Luxury palette (`#f7f1ea`, `#a76459`, `#352a26`) + Cormorant Garamond & DM Sans | ✅ Passed |
| **CRUD: Create** | Add new customer style profile with auto ID & date | ✅ Passed |
| **CRUD: Read** | Display all client records in an editorial responsive cards grid | ✅ Passed |
| **CRUD: Update** | Pre-populate form, smooth scroll to editor, update storage and state | ✅ Passed |
| **CRUD: Delete** | Delete record with user confirmation dialog and toast notification | ✅ Passed |
| **Bonus: Search** | Real-time dynamic search filtering profiles across multiple fields | ✅ Passed |
| **Database Options** | Local Storage (Offline Default) + JSON Server REST API (`db.json`) | ✅ Passed |
| **3D Realistic Model** | Three.js WebGL model with realistic draped Saree, Kurta, Lehenga, Anarkali | ✅ Passed |
| **Responsive Design** | Fluid layouts for mobile (360px+), tablet, and desktop | ✅ Passed |

---

## 📄 License & Attribution
Designed thoughtfully for **Christ University Full Stack Web Development Lab Exercise 5 & 6**.  
*Domain*: Saha Couture Designer Boutique, Bengaluru.
