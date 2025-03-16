import React from "react"

interface JoinButtonProps{
    onClick: () => void;
}


const JoinButton: React.FC<JoinButtonProps> = ({ onClick }) => {

    return(
        <button onClick={onClick}>Join Now!</button>
    )

};
export default JoinButton