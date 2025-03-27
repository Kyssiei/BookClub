import React from "react";
import "../styles/AboutUsPage.css"; // Ensure you have the CSS file
import NavBar from "../components/NavBar";
import pic1 from "../assets/Bookstore aesthetic.jpg"; // Replace with actual image paths
import pic2 from "../assets/books.jpg"; // Replace with actual image paths
import pic3 from "../assets/starface.jpg"
// import bg from "../assets/photo-collage.png.jpg"

const About: React.FC = () => {
  return (
    <div className="about-container">
      <NavBar />
      <h1>📚 About Our Book Club 📚</h1>

      <div className="about-section">
        <img src={pic1} alt="Reading a Book" className="about-img left" />
        <p className="about-text">
          Welcome to our Book Club! We are a passionate community of book lovers who gather to explore different genres, discuss thought-provoking stories, and share our favorite reads.
        </p>
      </div>

      <div className="about-section reverse">
        <p className="about-text">
          Every month, we choose a new book, engage in thoughtful discussions, and share insights with our community. From themed reading challenges to interactive events, there's always something exciting to explore!
        </p>
        <img src={pic2} alt="Book Discussion" className="about-img right" />
      </div>

      <div className="about-section">
        <img src={pic3} alt="Reading a Book" className="about-img left" />
        <p className="about-text">
          Meet Kayla, the founder of our Book Club! With a passion for storytelling and community building, she created this space to bring book lovers together and inspire meaningful conversations.
        </p>
      </div>

    </div>
  );
};

export default About;
