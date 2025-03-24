import express from "express";
import exampleRoute from "./routes/exampleRoute";

const app = express();

app.use(express.json());
app.use("/api", exampleRoute);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
