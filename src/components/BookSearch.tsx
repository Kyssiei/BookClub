import { useState } from "react";


const BookSearch = () => {
    //State for search input and the results

    const [query, setQuery] = useState<string>("");
    const [books, setBooks] = useState<any[]>([]);

    //function to handle input change from users
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }


    return(
        <div style={{
            display:"flex", 
            flexDirection:"column", 
            justifyContent:"center", 
            alignContent:"center", 
            alignItems:"center"
            }}>
            <div>
                <h1 id="Header" >Find Your Next Favorite Book</h1>
            </div>
            <div>
                <input 
                type="text" 
                placeholder="Search for a book"
                value={query}
                onChange={handleInputChange}
                style={{
                padding: "10px",
                border:"1px solid black",
                borderRadius: "50px",
                width:"600px",
                fontSize:"1.5em",
                }}
                />
                <button 
                style={{
                width:"200px", 
                borderRadius:"50px", 
                border:"1px solid black", 
                backgroundColor:"rgb(255, 133, 204)",
                padding:"10px",
                fontSize:"1.5em",
                color:"white"
                }}>Search</button>
            </div>
        </div>
    );
    
}

export default BookSearch