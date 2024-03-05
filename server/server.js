import express from "express";
import cors from "cors";
import {fetchAndLogData} from "../server/service/fetchCoffeeData.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env" 
   });
connectDB();


const app=express();
app.use(cors());


app.get("/api",(req,res)=>{
    console.log(fetchAndLogData)
    //res.json({"users":["userOne","userTwo","userThree"]});
})

app.listen(5000,()=>{
    console.log("Listening to 5000");
})