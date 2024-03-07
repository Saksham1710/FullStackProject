import mongoose from "mongoose";
import {CoffeeData} from "../models/coffeeData.model.js";
export const fetchAndLogData = async () => {
    try {
         // Connect to MongoDB
        const coffees = await CoffeeData.find(); // Retrieve all documents from the Coffee collection
         // Log the data
    } catch (error) {
        console.error('Error retrieving data:', error);
    }
};

// Call the function to fetch and log data
fetchAndLogData();