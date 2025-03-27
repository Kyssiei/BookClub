import { ObjectId } from "mongoose";
// import mongoose from "mongoose";
import mongoose from "mongoose"

const API_URL = "http://localhost:3000/api"; // Update this based on your backend

// Define TypeScript Interfaces Matching Your Models
export interface Event {
    _id: string;
    title: string;
    description: string;
    date: Date;
    isVirtual: boolean;
    virtualLink?: string;
    location?: string;
    createdBy: ObjectId;
    attendees: ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Book {
    _id: string;
    title: string;
    author: string;
    description?: string;
    coverImage?: string;
    genre?: string;
    pageCount: number;
    publishedYear?: number;
    ratings?: number[];
    addedBy?: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    profilePic?: string;
    bio?: string;
    bookshelves: {
        currentlyReading: ObjectId[];
        wantToRead: ObjectId[];
        finished: ObjectId[];
    };
    isAdmin?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Discussion {
    _id: string;
    topic: string;
    content: string;
    createdBy:string | ObjectId;
    bookId: string;
    comments: { user: ObjectId; comment: string; createdAt: Date }[];
    createdAt: Date;
}


// const userId = new mongoose.Types.ObjectId(req.user?.id); // ✅ Ensure valid ObjectId

// await updateDiscussion(discussionId, {
//     $push: {
//         comments: {
//             user: new mongoose.Types.ObjectId(userId), // ✅ Correct format
//             comment: Comment,
//             createdAt: new Date() // ✅ Ensure timestamp is included
//         }
//     }
// });


// Helper function for API requests
const request = async <T>(url: string, method: string = "GET", body?: any): Promise<T> => {
    const headers = { "Content-Type": "application/json" };
    const options: RequestInit = { method, headers };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(url, options);
    if (!response.ok) throw new Error("API request failed");
    return response.json();
};

// Events API
export const fetchEvents = (): Promise<Event[]> => request<Event[]>(`${API_URL}/events`);
export const createEvent = (data: Partial<Event>): Promise<Event> => request<Event>(`${API_URL}/events`, "POST", data);
export const updateEvent = async (id: string, updatedEvent: Partial<Event>) => {
    const token = localStorage.getItem("token"); // Get stored token

    const response = await fetch(`${API_URL}/events/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedEvent)
    });
    if (!response.ok) throw new Error("Failed to update event");
    return response.json();
};
export const deleteEvent = (id: string): Promise<void> => request<void>(`${API_URL}/events/${id}`, "DELETE");

// Books API
export const fetchBooks = (): Promise<Book[]> => request<Book[]>(`${API_URL}/books`);
export const createBook = (data: Partial<Book>): Promise<Book> => request<Book>(`${API_URL}/books`, "POST", data);
export const updateBook = (id: string, data: Partial<Book>): Promise<Book> => request<Book>(`${API_URL}/books/${id}`, "PUT", data);
export const deleteBook = (id: string): Promise<void> => request<void>(`${API_URL}/books/${id}`, "DELETE");

// Users API
export const fetchUsers = async (): Promise<User[]> => {
    const token = localStorage.getItem("token"); // Retrieve token from storage

    const response = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Send token
        }
    });

    if (!response.ok) throw new Error("Failed to fetch users");
    return response.json();
};

export const deleteUser = (id: string): Promise<void> => request<void>(`${API_URL}/users/${id}`, "DELETE");



// Discussions API
export const fetchDiscussions = (): Promise<Discussion[]> => request<Discussion[]>(`${API_URL}/discussions`);
export const createDiscussion = async (data: Partial<Discussion>): Promise<void> => {
    await request<Discussion>(`${API_URL}/discussions`, "POST", data);
}

// Ensure updateDiscussion is defined before using it
export const updateDiscussion = async (id: string, data: Partial<Discussion>): Promise<Discussion> => {
    return request<Discussion>(`${API_URL}/${id}`, "PUT", data);
};

// Now call updateDiscussion AFTER declaration


export const deleteDiscussion = (id: string): Promise<void> => request<void>(`${API_URL}/discussions/${id}`, "DELETE");
