const API_URL = "http://localhost:3000/api/events";

// ✅ Fetch All Events
export const fetchEvents = async () => {
    const response = await fetch(API_URL);
    return response.ok ? response.json() : [];
};

// ✅ Create Event (Admin Only)
export const createEvent = async (eventData: any) => {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
    });
    return response.ok ? response.json() : null;
};

// ✅ Update Event (Admin Only)
export const updateEvent = async (id: string, eventData: any) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
    });
    return response.ok ? response.json() : null;
};

// ✅ Delete Event (Admin Only)
export const deleteEvent = async (id: string) => {
    const token = localStorage.getItem("token");
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
};
