import React, { useState } from "react"

interface JoinFormProps {
   onSubmit: (name: string, email: string) => void;
}


const JoinForm: React.FC<JoinFormProps> = ({onSubmit}) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(name, email);
    };

    return(
       <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name" 
            required/>
       </form>
    )
    
}
export default JoinForm