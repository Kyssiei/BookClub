import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUsPage from "./pages/AboutUsPage";
import AdminDashboard from "./pages/AdminDashboard";
import BookClubPage from "./pages/BookClubPage";
import Homepage from "./pages/Homepage";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/LoginPage";
import "./styles/index.css"
import "../src/"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/login/admin" element={<AdminDashboard />} />
        <Route path="/bookclub" element={<BookClubPage />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App 
