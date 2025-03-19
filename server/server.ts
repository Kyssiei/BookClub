import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv"


dotenv.config();

const app = express();

//Enables CORS for react front end 
//Cors allows comunication between frontend and backend
app.use(cors());

//Set EJS as a view engine
app.set("view engine", "ejs");

//Set views folder
app.set("views", path.join(__dirname, "views"));

//Serve static files 
app.use(express.static(path.join(__dirname, "../public")));

//Test route to render an EJS page
// app.get("/", (req,res) => {
    // res.render("index", { title: "Welcome to the Book Club"})
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log(`Server running on http://localhost:${PORT}`);
    
})

