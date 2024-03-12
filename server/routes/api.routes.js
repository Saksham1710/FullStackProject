import { Router } from "express";
import { CoffeeData } from "../models/coffeeData.model.js";
import { TeaData } from "../models/teaData.model.js";
import { BeveragesData } from "../models/beveragesData.model.js";


const api_router = Router();

api_router.get("/coffees", async (req, res) => {
    try {
        const data = await CoffeeData.find({});
        res.json(data);
    } catch (error) {
        console.error('Error retrieving coffee data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

api_router.get("/teas", async (req, res) => {
    try {
        const data = await TeaData.find({});
        res.json(data);
    } catch (error) {
        console.error('Error retrieving tea data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

api_router.get("/beverages", async (req, res) => {
    try {
        const data = await BeveragesData.find({});
        res.json(data);
    } catch (error) {
        console.error('Error retrieving beverage data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

api_router.get("/beverages/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        console.log("Requested Product ID:", productId);

        const data = await BeveragesData.findOne({ _id: productId });
        console.log("Retrieved Data:", data);

        if (!data) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(data);
    } catch (error) {
        console.error('Error retrieving beverage data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
api_router.get("/coffees/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        console.log("Requested Product ID:", productId);

        const data = await CoffeeData.findOne({ _id: productId });
        console.log("Retrieved Data:", data);

        if (!data) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(data);
    } catch (error) {
        console.error('Error retrieving beverage data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
api_router.get("/teas/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        console.log("Requested Product ID:", productId);

        const data = await TeaData.findOne({ _id: productId });
        console.log("Retrieved Data:", data);

        if (!data) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(data);
    } catch (error) {
        console.error('Error retrieving beverage data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

export default api_router;
