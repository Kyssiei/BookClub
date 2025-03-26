import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUsers();
        fetchBooks();
    }, []);

    // Fetch Users (Admin Only)
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token"); // Ensure token is stored
    
            if (!token) {
                throw new Error("No token found, please login");
            }
    
            const response = await fetch("http://localhost:3000/api/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // 🔥 Include token
                }
            });
    
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
    
            const data = await response.json();
            console.log("Fetched Users:", data);
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
    

    // Fetch Books
    const fetchBooks = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/books", {
                method: "GET",
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Error fetching books");
            setBooks(data);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="admin-container">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <h2>Admin Panel</h2>
                <nav>
                    <ul>
                        <li><a href="#">Dashboard</a></li>
                        <li><a href="#">Users</a></li>
                        <li><a href="#">Books</a></li>
                        <li><a href="#">Events</a></li>
                        <li><a href="#">Logout</a></li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-header">
                    <h1>Welcome, Admin</h1>
                    <p>Manage users and books effectively.</p>
                </header>

                {error && <p className="admin-error">{error}</p>}

                {/* Stats Section */}
                <section className="admin-stats">
                    <div className="stat-card">
                        <h3>Total Users</h3>
                        <p>{users.length}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Total Books</h3>
                        <p>{books.length}</p>
                    </div>
                </section>

                {/* User Management */}
                <section className="admin-table">
                    <h2>Manage Users</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user: any) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? "Admin" : "User"}</td>
                                    <td>
                                        <button className="admin-btn">Edit</button>
                                        <button className="admin-btn delete">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                {/* Book Management */}
                <section className="admin-table">
                    <h2>Manage Books</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Genre</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book: any) => (
                                <tr key={book._id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.genre}</td>
                                    <td>
                                        <button className="admin-btn">Edit</button>
                                        <button className="admin-btn delete">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;
