//this file is where you will handle making the request, using fetch or axios logic

import { ApiResponse } from "../types/apiTypes";

export async function fetchData(): Promise<ApiResponse | null> {
    const apiKey = import.meta.env.VITE_API_KEY;

    if(!apiKey){
        console.error('API is missing');
        return null;
    }

    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=${apiKey}`);

        if(!response.ok) {
            console.error("failed to fetch data");
            return null;
        }
        const data: ApiResponse = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data", error);
        return null;
    }

}