import React, { useState } from "react";
import img from "../assets/20.png"
import JoinButton from "./JoinButton";
import JoinForm from "./JoinForm";



const JoinPage: React.FC = () => {
    const [showForm, setShowForm] = useState(false);

    const handleJoinButtonClick = () => {
        setShowForm(true)
    }

    return(
        <div style={{display:"flex", backgroundColor:"white"}}>
            <div style={{justifyContent:"center", alignItems:"center", marginLeft:"100px"}}>
                <img style={{height:"auto", width:"50vw" }} src={img} />
            </div>
            <div style={{display:"flex", flexDirection:"column",alignItems:"center"}}>
                <h1 style={{fontSize:"6em", textAlign:"center"}}  >Join Our Book Club!</h1>

                <p style={{fontSize:"1.5em", textAlign:"center"}}>
                    Joining this book club is the perfect way for young women to explore inspiring stories, connect with like-minded readers, and spark meaningful conversations. It’s a cozy, empowering space where your voice matters, friendships form, and every book opens the door to new perspectives. Curl up with a great read and join a community that celebrates the joy of reading together!
                </p>

                <JoinButton onClick={handleJoinButtonClick} />
                {showForm && <JoinForm />}
            </div>
        </div>
    )
}
export default JoinPage