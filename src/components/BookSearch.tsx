import { useState } from "react";
// import BookCard from "./BookCard.tsx";
// import {apiKey} from "../services/apiService.ts"


const BookSearch = () => {
    //State for search input and the results

    const [query, setQuery] = useState<string>("");
    const [books, setBooks] = useState<any[]>([]);

    //function to handle input change from users
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    //function to fetch books
    const fetchBooks = async (query: string) => {
        if (!query.trim()) return; //prevents empty searches

        const apiKey = import.meta.env.VITE_API_KEY;
        const url =`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.items || [];
        } catch (error) {
            console.error("Error fetching books, error");
            return [];
        }
    };

    //function to handle search button click
    const handleSearch = async() => {
        const results = await fetchBooks(query);
        setBooks(results); //store books in state 
    }

    //function to render books or display no results
    const renderBooks = () => {
        if(books.length === 0) {
            return <p>No book found. Try another </p>;
        }

        return books.map((book, index) => {
            const { title, authors, imageLinks } = book.volumeInfo;
            const thumbnail = imageLinks?.thumbnail || "https://via.placeholder.com/150";

            return (
                <div key={index} id="cardbody">
                <img
                    src={thumbnail}
                    alt={title}
                    style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                />
                <h3>{title}</h3>
                <p>{authors ? authors.join(", ") : "Unknown Author"}</p>
            </div>
            )
        })
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
                onClick={handleSearch}
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
            <div 
                style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "20px"
            }}>
                {renderBooks()}
            </div>
        </div>
    );
    
}

export default BookSearch