import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {CoffeeData} from "./models/coffeeData.model.js";
import BeveragesData from "./models/beveragesData.model.js";
import TeaData from "./models/teaData.model.js";


dotenv.config({
    path: "./.env" 
   });
connectDB();


const app=express();
app.use(cors());


app.get("/api/coffees",async(req,res)=>{
    try {
        const data = await CoffeeData.find({});
        //console.log("DATA: "+data);
        res.json(data);

    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Server error' });
    }
})
app.get("/api/teas",async(req,res)=>{
    try {
        const data = await TeaData.find({});
        //console.log("DATA: "+data);
        res.json(data);

    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Server error' });
    }
})
app.get("/api/beverages",async(req,res)=>{
    try {
        const data = await BeveragesData.find({});
        res.json(data);


    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Server error' });
    }
})

app.get("/api/beverages/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        console.log("Requested Product ID:", productId);

        const data = await BeveragesData.findOne({_id: productId});
        console.log("Retrieved Data:", data);

        if (!data) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(data);
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


app.listen(5000,()=>{
    console.log("Listening to 5000");
})

