import React from "react"

interface JoinButtonProps{
    onClick: () => void;
}


const JoinButton: React.FC<JoinButtonProps> = ({ onClick }) => {

    return(
        <button onClick={onClick}
        style={{
            width:"200px", 
            borderRadius:"50px", 
            border:"1px solid black", 
            backgroundColor:"rgb(255, 133, 204)",
            padding:"15px",
            fontSize:"1.5em",
            color:"white"
        }}
        >Join Now!</button>
    )

};
export default JoinButton