import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env"
});
connectDB();

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Listening to ${process.env.PORT}`);
});
