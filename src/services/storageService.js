/* =========================================================================
   SAHA COUTURE — STORAGE & CRUD SERVICE LAYER
   -------------------------------------------------------------------------
   Meets all Lab Exercise 5 & 6 requirements:
   - Option 1: Local Storage (Default, works offline with zero installation)
   - Option 2: JSON Server REST API (Supports GET, POST, PUT, DELETE on port 3001)
   - Resilient Fallback: If JSON Server is offline, Local Storage ensures the
     React CRUD operations work seamlessly with zero crash or blocked UI!
   ========================================================================= */

const LOCAL_STORAGE_KEY = 'saha_couture_style_profiles';
const API_URL = 'http://localhost:3001/styleProfiles';

// Initial pre-seeded demo records for the boutique
const INITIAL_DEMO_PROFILES = [
  {
    id: 'saha-101',
    customerName: 'Ananya Sharma',
    contactPhone: '+91 98450 12345',
    category: 'Women',
    occasion: 'Festive',
    budget: 4500,
    preferredStyle: 'Traditional',
    preferences: 'Raw silk saree with copper gold zari borders, jewel neck blouse with elbow-length sleeves in bottle green.',
    createdAt: '2026-11-08T10:30:00.000Z',
  },
  {
    id: 'saha-102',
    customerName: 'Meera Krishnan',
    contactPhone: '+91 97312 88491',
    category: 'Women',
    occasion: 'Everyday',
    budget: 2200,
    preferredStyle: 'Minimal',
    preferences: 'Breathable handloom cotton kurtis with pockets, pastel earthy tones like terracotta and sage green.',
    createdAt: '2026-11-09T14:15:00.000Z',
  },
  {
    id: 'saha-103',
    customerName: 'Rohan & Priya',
    contactPhone: '+91 99644 47242',
    category: 'Kids',
    occasion: 'Wedding',
    budget: 3200,
    preferredStyle: 'Fusion',
    preferences: 'Comfortable festive dhoti kurta set for 5-year-old boy, soft cotton lining inside so fabric does not itch.',
    createdAt: '2026-11-09T16:45:00.000Z',
  },
  {
    id: 'saha-104',
    customerName: 'Sunita Rao',
    contactPhone: '+91 98860 33120',
    category: 'Women',
    occasion: 'Party',
    budget: 5800,
    preferredStyle: 'Contemporary',
    preferences: 'Indo-western cape jacket with flared palazzo pants, delicate cutdana work on collar.',
    createdAt: '2026-11-10T09:20:00.000Z',
  },
];

// Helper: Read from LocalStorage with seed fallback
function readLocalProfiles() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_PROFILES));
      return INITIAL_DEMO_PROFILES;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_PROFILES));
      return INITIAL_DEMO_PROFILES;
    }
    return parsed;
  } catch (err) {
    console.warn('LocalStorage read error, returning in-memory demo data:', err);
    return INITIAL_DEMO_PROFILES;
  }
}

// Helper: Write to LocalStorage
function writeLocalProfiles(profiles) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profiles));
  } catch (err) {
    console.error('LocalStorage write error:', err);
  }
}

// Helper: Check if JSON Server is responding
export async function checkJsonServerStatus() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);
    const res = await fetch(API_URL, { signal: controller.signal });
    clearTimeout(timeoutId);
    return res.ok;
  } catch {
    return false;
  }
}

// =========================================================================
// CRUD OPERATION 1: READ (Fetch all customer profiles)
// =========================================================================
export async function getProfiles() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);
    const response = await fetch(API_URL, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      // Mirror to local storage for offline redundancy
      writeLocalProfiles(data);
      return { data, source: 'JSON Server (REST API)' };
    }
  } catch {
    // Graceful fallback to LocalStorage
  }

  const localData = readLocalProfiles();
  return { data: localData, source: 'Local Storage (Browser Database)' };
}

// =========================================================================
// CRUD OPERATION 2: CREATE (Add a new style profile record)
// =========================================================================
export async function addProfile(newProfile) {
  const profileWithMeta = {
    ...newProfile,
    id: newProfile.id || `saha-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: newProfile.createdAt || new Date().toISOString(),
  };

  // Always update local storage first
  const current = readLocalProfiles();
  const updated = [profileWithMeta, ...current];
  writeLocalProfiles(updated);

  // Try saving to JSON Server if available
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileWithMeta),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (response.ok) {
      const saved = await response.json();
      return { profile: saved, source: 'JSON Server' };
    }
  } catch {
    // Saved in Local Storage
  }

  return { profile: profileWithMeta, source: 'Local Storage' };
}

// =========================================================================
// CRUD OPERATION 3: UPDATE (Modify an existing style profile record)
// =========================================================================
export async function updateProfile(id, updatedFields) {
  const current = readLocalProfiles();
  const index = current.findIndex((p) => String(p.id) === String(id));

  let updatedProfile = null;
  if (index !== -1) {
    updatedProfile = {
      ...current[index],
      ...updatedFields,
      updatedAt: new Date().toISOString(),
    };
    current[index] = updatedProfile;
    writeLocalProfiles(current);
  }

  // Try updating JSON Server
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProfile || updatedFields),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (response.ok) {
      const serverUpdated = await response.json();
      return { profile: serverUpdated, source: 'JSON Server' };
    }
  } catch {
    // Saved in Local Storage
  }

  return { profile: updatedProfile, source: 'Local Storage' };
}

// =========================================================================
// CRUD OPERATION 4: DELETE (Remove a customer profile record)
// =========================================================================
export async function deleteProfile(id) {
  const current = readLocalProfiles();
  const filtered = current.filter((p) => String(p.id) !== String(id));
  writeLocalProfiles(filtered);

  // Try deleting from JSON Server
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
  } catch {
    // Removed from Local Storage
  }

  return true;
}

// Helper: Reset database to initial demo state
export function resetToDemoData() {
  writeLocalProfiles(INITIAL_DEMO_PROFILES);
  return INITIAL_DEMO_PROFILES;
}
