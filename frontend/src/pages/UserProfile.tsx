import React, { useState } from "react";
import Calendar from "react-calendar"; // Install: npm install react-calendar
import "react-calendar/dist/Calendar.css";
import "../styles/UserProfile.css"; // Custom styles
import NavBar from "../components/NavBar";
import img from "../assets/aura wallpaper.jpg"
import profile from "../assets/Untitled design.jpg"

const UserProfile = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [notes, setNotes] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("");

  // ✅ Fixed Calendar onChange type issue
  const handleDateChange = (value: Date | Date[] | null) => {
    if (Array.isArray(value)) {
      setDate(value[0] || null); // Ensure it’s a single date
    } else {
      setDate(value);
    }
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="user-profile">
      <NavBar />
      <h1 className="profile-title">User Profile</h1>
      <div className="profile-container">
        
        {/* LEFT: Weekly Calendar */}
        <div className="weekly-calendar">
          <h2>Weekly Calendar</h2>
          <Calendar onChange={(value) => handleDateChange(value as Date | Date[] | null) } value={date} />
        </div>

        {/* MIDDLE: Notes & To-Do */}
        <div className="notes-todo">
          <h2>Notes</h2>
          <textarea
            className="notes-box"
            placeholder="Write quick notes here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <h2>To-Do List</h2>
          <div className="todo-container">
            <input
              type="text"
              placeholder="Add a goal..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button className="add-btn" onClick={handleAddTask}>Add</button>
          </div>

          <ul className="todo-list">
            {tasks.map((task, index) => (
              <li key={index}>
                {task} <button className="delete-btn" onClick={() => handleDeleteTask(index)}>❌</button>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: Profile & Bookshelf */}
        <div className="profile-section">
          <div className="profile-header">
            <img className="banner" src={img} alt="" />
            {/* <img className="banner"></div> */}
            <img className="profile-pic" src={profile} alt="" />
            {/* <div className="profile-pic"></div> */}
            <h3>Kayla Gentry</h3>
            <p className="bio">Just a girl who likes to read</p>
          </div>

          <h2>Bookshelves</h2>
          <h3>Currently Reading</h3>
          <div className="bookshelf">
            <div className="book"></div>
            <div className="book"></div>
            <div className="book"></div>
          </div>

          <h3>Want to Read</h3>
          <div className="bookshelf small">
            <div className="book"></div>
            <div className="book"></div>
            <div className="book"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;
