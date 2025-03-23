import React, { useState } from "react"

interface FormData {
   name: string, 
   email: string,
   phone: string,
   birthday: string,
   username: string,
   favbookgenere: string ,
}


const JoinForm: React.FC = () =>{
    const [formData, setFormData] = useState<FormData>({
        name:"",
        email:"",
        phone:"",
        birthday:"",
        username:"",
        favbookgenere:""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({...prevData, [name]: value }));
    }

    

    return(
        <div>
            <form action="">

                <input 
                name="name"
                type="text" 
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                />

                <input 
                name="email"
                type="text" 
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                />

                <input 
                name="phone"
                type="text" 
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                />

                <input 
                name="birthday"
                type="text" 
                placeholder="Birthday"
                value={formData.birthday}
                onChange={handleChange}
                />

                <input 
                name="username"
                type="text" 
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                />

                <select 
                name="favbookgenere"
                // placeholder="Favorite Book Genre"
                value={formData.favbookgenere}
                onChange={handleChange}
                >
                    <option value="">Select Favorite Genere</option>
                    <option value="fiction"></option>
                    <option value="non-fiction"></option>
                    <option value="mystery"></option>
                    <option value="fantasy"></option>
                    <option value="romance"></option>
                    <option value="science-fiction"></option>
                    <option value="self-help"></option>
                    <option value="other"></option>
                </select>
            </form>
        </div>
    )
}

export default JoinForm