
const API_URL = "http://localhost:3001/styleProfiles";

// Get all customer style profiles
export const getProfiles = async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Unable to fetch customer profiles");
    }

    return await response.json();
};

// Add a new customer style profile
export const addProfile = async (profile) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
    });

    if (!response.ok) {
        throw new Error("Unable to add customer profile");
    }

    return await response.json();
};

// Update an existing customer style profile
export const updateProfile = async (id, profile) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
    });

    if (!response.ok) {
        throw new Error("Unable to update customer profile");
    }

    return await response.json();
};

// Delete a customer style profile
export const deleteProfile = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Unable to delete customer profile");
    }

    return true;
};
