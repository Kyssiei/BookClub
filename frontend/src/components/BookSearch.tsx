import { useState } from "react";
import "../styles/BookSearch.css";

interface Book {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        imageLinks?: {thumbnail: string};
    };
}


const BookSearch = () => {
    //State for search input and the results

    const [query, setQuery] = useState<string>("");
    const [books, setBooks] = useState<Book[]>([]);

    //function to handle input change from users
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    //function to fetch books
    const fetchBooks = async (query: string):Promise<Book[]> => {
        if (!query.trim()) return []; //prevents empty searches

        const apiKey = import.meta.env.VITE_API_KEY;
        const url =`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`; //&key=${apiKey}`;

        console.log("Fetching books from:", url);//logging api request 
        

        try {
            const response = await fetch(url);
            const data = await response.json();

            console.log("API Response:", data);// log api response
            
            return Array.isArray(data.items) ? data.items : [];
        } catch (error) {
            console.error("Error fetching books", error);
            return [];
        }
    };

    //function to handle search button click
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async() => {
        setHasSearched(true);// mark that the user has searched
        const results = await fetchBooks(query);
        setBooks(results); //store books in state 
    }


    return(
        <div className="book-search-container">
            <h1 id="Header" >Find Your Next Favorite Book</h1>
            <div>
                <input 
                type="text" 
                placeholder="Search for a book"
                value={query}
                onChange={handleInputChange}
                className="book-search-input"
                />
                <button 
                onClick={handleSearch}
                className="book-search-button"
                >Search
                </button>

            </div>
            <div id="card-container">
                {Array.isArray(books) && books.length > 0 ? (
                    <div className="results-grid">
                        {books.map((book) =>{
                            const { title, authors, imageLinks } = book.volumeInfo;
                            const thumbnail = imageLinks?.thumbnail || "https://via.placeholder.com/150";

                            return (
                                <div key={book.id} className="book-card">
                                    <img src={thumbnail} alt={title || "Untitled"} className="book-image"/>
                                    <h3>{title || "Untitled"}</h3>
                                    <p>{authors ? authors.join(",") : "Unknown Author"}</p>
                                </div>
                            );
                        })}
                    </div>
                ) : (hasSearched && books.length === 0 && <p>No book found. try another search</p>)}
            </div>
        </div>
    );
    
}

export default BookSearch