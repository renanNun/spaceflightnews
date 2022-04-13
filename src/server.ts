import cors from "cors";
import express from "express";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3333, () => {
    console.log("Server started on port 3333");
});