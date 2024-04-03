import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import cors from "cors";
import Stripe from "stripe";

dotenv.config({
    path: "./.env"
});
connectDB();

  app.get("/",(req,res)=>{
    res.send("Welcome to the server")
})

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Listening to ${process.env.PORT}`);
});
