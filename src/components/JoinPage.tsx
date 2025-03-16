import React, { useState } from "react";
import img from "../assets/20.png"





const JoinPage: React.FC = () => {


    return(
        <div style={{display:"flex", backgroundColor:"white"}}>
            <div style={{justifyContent:"center", alignItems:"center", marginLeft:"100px"}}>
                <img style={{height:"700px" }} src={img} />
            </div>
            <div>
                <h1 style={{fontSize:"6em", textAlign:"center"}}  >Join Our Book Club!</h1>
                <p style={{fontSize:"1.5em", textAlign:"center"}}>Joining this book club is the perfect way for young women to explore inspiring stories, connect with like-minded readers, and spark meaningful conversations. It’s a cozy, empowering space where your voice matters, friendships form, and every book opens the door to new perspectives. Curl up with a great read and join a community that celebrates the joy of reading together!</p>
                <button>Join Now</button>
            </div>
        </div>
    )
}
export default JoinPage