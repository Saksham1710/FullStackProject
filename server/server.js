import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import cors from "cors";

dotenv.config({
    path: "./.env"
});
connectDB();

app.use(cors({
    origin: 'https://deploybackendbrewbox.vercel.app',
}));

app.get("/", (req, res) => {
    res.send("Hello World");
});
// Start server
app.listen(process.env.PORT, () => {
    console.log(`Listening to ${process.env.PORT}`);
});
