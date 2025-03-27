import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import DiscussionComponent from "../components/DiscussionComponent";
import {
    fetchEvents, createEvent, updateEvent, deleteEvent,
    fetchBooks, createBook, updateBook, deleteBook,
    fetchUsers, deleteUser,
    fetchDiscussions, createDiscussion, updateDiscussion, deleteDiscussion,
    Event, Book, User, Discussion
} from "../services/adminServices";
import "../styles/AdminDashboard.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const AdminDashboard: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [discussions, setDiscussions] = useState<Discussion[]>([]);
    const [activeTab, setActiveTab] = useState<string>("events");
    const [editMode, setEditMode] = useState<boolean>(false);
    const [currentId, setCurrentId] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const [eventForm, setEventForm] = useState<Partial<Event>>({ title: "", description: "", date: new Date(), isVirtual: false });
    const [bookForm, setBookForm] = useState<Partial<Book>>({ title: "", author: "", genre: "" });
    const [discussionForm, setDiscussionForm] = useState<Partial<Discussion>>({ createdBy: "", topic: "" });

    // Fetch Data when the component loads or when the activeTab changes
    useEffect(() => {
        if (activeTab === "events") fetchEvents().then(setEvents);
        if (activeTab === "books") fetchBooks().then(setBooks);
        if (activeTab === "users") {
            fetchUsers().then(users => {
                console.log("Fetched Users:", users); // Debugging Log
                setUsers(users);
            }).catch(error => console.error("Error fetching users:", error));
        };
        if (activeTab === "discussions") fetchDiscussions().then(setDiscussions);
    }, [activeTab]);

    const handleEventSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editMode && currentId) {
            await updateEvent(currentId, eventForm);
            setEditMode(false);
            setCurrentId(null);
        } else {
            await createEvent(eventForm);
        }
        fetchEvents().then(setEvents);
        setEventForm({ title: "", description: "", date: new Date(), isVirtual: false, location: "", virtualLink: "" });
    };

    const handleEventEdit = (event: Event) => {
        setEventForm({
            title: event.title,
            description: event.description,
            date: event.date ? new Date(event.date) : new Date(),
            isVirtual: event.isVirtual,
            location: event.location || "",
            virtualLink: event.virtualLink || "",
        });
        setEditMode(true);
        setCurrentId(event._id);
    };

    const handleEventDelete = async (id: string) => {
        await deleteEvent(id);
        fetchEvents().then(setEvents);
    };

    const handleUserDelete = async (id: string) => {
        await deleteUser(id);
        fetchUsers().then(setUsers);
    };

    return (
    <div>
        <NavBar />
        <div className="admin-dashboard">
            <div className="sidebar">
                <h2>Admin Dashboard</h2>
                <button onClick={() => setActiveTab("events")}>Manage Events</button>
                <button onClick={() => setActiveTab("books")}>Manage Books</button>
                <button onClick={() => setActiveTab("users")}>Manage Users</button>
                <button onClick={() => setActiveTab("discussions")}>Manage Discussions</button>
            </div>

            <div className="main-content">
                {activeTab === "events" && (
                    <div>
                        <h3>Manage Events</h3>
                        <Calendar onChange={(date) => setSelectedDate(date as Date)} value={selectedDate} />

                        <form onSubmit={handleEventSubmit}>
                            <input type="text" name="title" value={eventForm.title || ""} 
                                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} 
                                placeholder="Event Title" required />

                            <textarea name="description" value={eventForm.description || ""} 
                                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} 
                                placeholder="Event Description" required />

                            <input type="datetime-local" name="date" 
                                value={eventForm.date ? eventForm.date.toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16)} 
                                onChange={(e) => setEventForm({ ...eventForm, date: new Date(e.target.value) })} required />

                            <label>
                                <input type="checkbox" name="isVirtual" checked={eventForm.isVirtual || false} 
                                    onChange={() => setEventForm({ ...eventForm, isVirtual: !eventForm.isVirtual })} />
                                Virtual Event
                            </label>

                            {!eventForm.isVirtual ? (
                                <input type="text" name="location" value={eventForm.location || ""} 
                                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} 
                                    placeholder="Location" />
                            ) : (
                                <input type="text" name="virtualLink" value={eventForm.virtualLink || ""} 
                                    onChange={(e) => setEventForm({ ...eventForm, virtualLink: e.target.value })} 
                                    placeholder="Virtual Link" />
                            )}

                            <button type="submit">{editMode ? "Update" : "Add"} Event</button>
                        </form>
                        <DiscussionComponent
                            books={books} 
                            discussions={discussions} 
                            createDiscussion={createDiscussion} 
                            updateDiscussion={updateDiscussion}
                         />

                        <ul>
                            {events.length > 0 ? (
                                events.map(event => (
                                    <li key={event._id}>
                                        {event.title} - {new Date(event.date).toLocaleDateString()}
                                        <button onClick={() => handleEventEdit(event)}>Edit</button>
                                        <button onClick={() => handleEventDelete(event._id)}>Delete</button>
                                    </li>
                                ))
                            ) : (
                                <p>No events found.</p>
                            )}
                        </ul>
                    </div>
                )}

                {activeTab === "users" && (
                    <div>
                        <h3>Manage Users</h3>
                        <ul className="user-list">
                            {users.length > 0 ? (
                                users.map(user => (
                                    <li key={user._id} className="user-item">
                                        <div>
                                            <strong>{user.name}</strong> - {user.email}
                                        </div>
                                        <button onClick={() => handleUserDelete(user._id)}>Delete</button>
                                    </li>
                                ))
                            ) : (
                                <p>No users found.</p>
                            )}
                        </ul>
                    </div>
                )}

                {activeTab === "books" && (
                    <div>
                        <h3>Manage Books</h3>
                        <ul className="book-list">
                            {books.length > 0 ? (
                                books.map(book => (
                                    <li key={book._id} className="book-item">
                                        <div>
                                            <strong>{book.title}</strong> by {book.author}
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p>No books found.</p>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    </div>
    );
};

export default AdminDashboard;
