# LAB EXERCISE 5 & 6: DOMAIN-BASED REACT APPLICATION
**Department of Computer Science & Engineering · Christ University**  
**Course**: Full Stack Development (FSD)  
**Domain**: Saha Couture — Fashion Boutique for Women & Kids (Bengaluru)  
**Student**: Rohan Sam Reji  
**Date**: November 2026  

---

## 1. Problem Statement & Objectives
In Part 1 (Exercises 1, 2, 3, and 4), a frontend boutique module was developed using vanilla HTML5, CSS3, and JavaScript. In Part 2 (Lab Exercise 5 & 6), the module was refactored and extended into a robust, single-page **React application**. 

The key objectives were to:
1. Transition from imperative DOM manipulation to a **declarative, component-based architecture**.
2. Manage local and shared application states using modern **React Hooks** (`useState`, `useEffect`, `useCallback`, `useRef`, `useMemo`).
3. Build comprehensive **form handling** with multiple controlled inputs (text, numbers, dropdown selects, radio buttons, and textareas).
4. Implement full **CRUD operations** (Create, Read, Update, Delete) with persistent data storage.
5. Provide dynamic real-time **search and filtering** (Bonus requirement).
6. Elevate user experience through an **interactive 3D WebGL realistic garment showcase** (Three.js) in the opening Hero section.
7. Maintain domain brand identity, typography (Cormorant Garamond, DM Sans), and warm luxury color aesthetics (`#f7f1ea`, `#a76459`, `#352a26`).

---

## 2. Component Hierarchy & Architectural Design
The application follows a clean modular structure where concerns are separated into dedicated functional components:

```text
App (Root Coordinator & State Manager)
├── BrandBar (Status indicator for active database engine)
├── Header (Navigation, Brand Logo, Wishlist/Cart counters, Audio toggle)
├── Hero3D (Three.js WebGL realistic 3D garment showcase & morph controls)
├── IntroSection (Editorial boutique approach & 3 service pillars)
├── CollectionSection (Product gallery with search & category filtering)
│   └── ProductCard (Reusable product card with favorite & bag actions)
├── StyleProfileCRUD (Main CRUD Module)
│   ├── StyleProfileForm (Create & Update operations with dynamic recommendations)
│   └── ProfileList (Read & Delete operations with real-time search & filter pills)
├── SessionStrip (SessionStorage mood preference recorder)
├── AtelierSection (Craftsmanship video player with HTML5 Fullscreen API)
├── KidsSection (Children's boutique collection highlight)
├── DailyFashionNote (Dynamic editorial styling note)
├── OurStorySection (Founder journey from corporate banking to fashion)
├── VisitSection (Studio location, operating hours, Clipboard API, Geolocation API, Google Maps)
├── Footer (Brand tagline, directory links, social channels, copyright)
├── CartModal (Slide-out shopping bag drawer with WhatsApp order link)
└── ToastFeedback (Animated status alerts for user actions)
```

---

## 3. React State Management & Hooks Implementation

| Hook | Purpose in Application |
| :--- | :--- |
| `useState(profiles)` | Stores the array of customer style profile records retrieved from storage. |
| `useState(editingProfile)` | Tracks the record currently selected for modification (`null` when in Create mode). |
| `useState(form)` | Manages controlled inputs in `StyleProfileForm` (customerName, phone, category, occasion, budget, style, notes). |
| `useState(searchTerm)` | Powers instant dynamic search filtering in `ProfileList` and `CollectionSection`. |
| `useState(activeLookIndex)` | Dictates which 3D clothing piece (Saree, Kurta, Lehenga, Anarkali) is rendered in the Three.js viewport. |
| `useState(wishlist / cart)` | Manages interactive customer bag items and favorited pieces. |
| `useEffect()` | Handles Three.js WebGL rendering loop, initial database hydration, and resize listeners. |
| `useCallback()` | Memoizes asynchronous fetch routines (`fetchProfiles`) to prevent unnecessary child re-renders. |
| `useRef()` | References the Three.js canvas container, audio element, and toast dismiss timers. |

---

## 4. CRUD Operations & Database Storage Implementation

### A. Dual Storage Architecture (`storageService.js`)
The application implements both database options specified in the rubric:
- **Option 1: Local Storage (Active Default)**: Completely client-side and offline-ready. It initializes with 4 realistic boutique records so the UI is immediately populated without requiring separate backend processes.
- **Option 2: JSON Server (REST API)**: Fully compatible with standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) on port 3001 using the provided `db.json` file. The service automatically probes for JSON Server; if active, requests synchronize through REST endpoints. If inactive, it gracefully falls back to Local Storage.

### B. CRUD Operation Walkthrough
1. **Create (POST)**:
   - User enters details in `StyleProfileForm` (Customer Name, Contact Phone, Shopping Category, Occasion, Budget, Preferred Style Aesthetic, and Notes).
   - Form validates for non-empty name and positive numerical budget.
   - Upon submit, `handleSaveProfile` assigns a unique ID and ISO timestamp, prepends the record to state, and updates persistent storage.
2. **Read (GET)**:
   - `ProfileList` renders all profiles inside an editorial cards grid.
   - Displays customer name, phone, category badge, occasion tag, style pill, formatted budget (`₹4,500`), timestamp, and notes.
3. **Update (PUT)**:
   - Clicking **"Edit Profile"** on any card triggers `handleEditProfile`.
   - The form switches into *Modification Mode*, pre-populates all inputs with existing values, and smoothly auto-scrolls to the editor.
   - The button label updates to *"Update Profile"*, and a *"Cancel Edit"* option appears.
   - Submitting commits the modified values back to storage and re-renders the list.
4. **Delete (DELETE)**:
   - Clicking **"Delete"** prompts a safety confirmation dialog to prevent accidental data loss.
   - Upon confirmation, `deleteProfile(id)` purges the item from storage and state.
   - A toast notification confirms deletion.
5. **Bonus: Real-Time Dynamic Search**:
   - As the user types in the search bar, `filteredProfiles` immediately filters across customer names, occasion, category, style aesthetic, and notes in real time.

---

## 5. 3D Realistic Fashion Atelier Integration (Opening Hero)
Rather than displaying a generic abstract cylinder or wireframe, the opening Hero section integrates a **Three.js WebGL 3D Garment Model** designed to reflect realistic Indian traditional clothing:
- **Banarasi Silk Saree**: Draped fluted skirt pleats with sinusoidal cloth folds, woven metallic gold Zari hem border, cross-body diagonal Pallu draped over the left shoulder with silk specular luster.
- **Royal Raw Silk Kurta**: Tailored straight-cut silhouette with crisp Mandarin bandhgala collar, gold button placket, side vents, and draped brocade stole.
- **Heritage Bridal Lehenga**: Sweeping 16-panel circular flared kalis skirt with scalloped Zardozi border, fitted choli blouse, and translucent floating dupatta.
- **Contemporary Anarkali Gown**: Multi-tiered umbrella flare with empire waist tailoring.
- **User Controls**: 360-degree continuous auto-rotation, interactive mouse/touch drag orbit, garment switcher tabs, reset view, and auto-cycling.

---

## 6. Verification & Test Cases

| Test Case | Steps Taken | Expected Result | Actual Result |
| :--- | :--- | :--- | :--- |
| **TC-01: Form Validation** | Submit empty form | Displays red validation error on name & budget | PASSED |
| **TC-02: Create Record** | Fill valid inputs and click "Save Style Profile" | New card appears at top of list with success toast | PASSED |
| **TC-03: Read Records** | Load page or reload browser | Saved records persist and render with correct badges | PASSED |
| **TC-04: Update Record** | Click "Edit Profile", change budget, submit | Profile updates in-place and exits edit mode | PASSED |
| **TC-05: Delete Record** | Click "Delete", confirm dialog | Profile is removed from list and storage | PASSED |
| **TC-06: Bonus Search** | Type "Traditional" in search bar | Only matching Traditional profiles are displayed | PASSED |
| **TC-07: 3D Garment Morph** | Click "Kurta" tab in 3D Hero | 3D canvas smoothly switches to the tailored kurta model | PASSED |
| **TC-08: Responsive Layout** | Resize browser window to 375px mobile | Grid stacks smoothly without horizontal overflow | PASSED |

---

## 7. Conclusion
The React-based Saha Couture application successfully fulfills all mandatory and bonus requirements outlined in the Lab Exercise 5 & 6 rubric. The application combines clean functional architecture, robust state management, resilient dual-mode data persistence, and high-fashion visual aesthetics, providing an exceptional foundation for future conversion into a Progressive Web App (PWA) or hybrid mobile application using Capacitor.
