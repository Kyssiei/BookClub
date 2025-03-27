import React from "react";
// import { useState } from "react";
import { Link } from "react-router-dom";
import image from "../assets/books.jpg"
import "../styles/Homepage.css"
import "../styles/index.css"
import NavBar from "../components/NavBar";
import JoinPage from "../components/JoinPage";
import JoinButton from "../components/JoinButton";
import BookSearch from "../components/BookSearch";
import "../styles/BookSearch.css"


const Homepage = () => {
  return (
    <div>
      <NavBar />
        <div className="homepage">
          <div className="title">
            <h1 id="Header">Books <br/> that <br/>Inspire!</h1>
            <p id="HeaderP">Join Our Book Club</p>
            <JoinButton onClick={() => console.log("Button Clicked")}/>
              <br />
      
          </div>
          <div>
            <img style={{height:"auto", width:"50vw"}} src={image} alt="" />
          </div>
        </div>
        <JoinPage />
        <br />
        <br />
        <BookSearch />
        
      </div>
  );
};

export default Homepage;
