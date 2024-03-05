import mongoose from "mongoose";
import connectDB from "../db/index.js"; // Assuming your connection function is defined in a file called connection.js
import {CoffeeData} from "../models/coffeeData.model.js"; // Assuming your coffee schema/model is defined in a file called coffeeModel.js

export const fetchAndLogData = async () => {
    try {
        await connectDB(); // Connect to MongoDB
        const coffees = await CoffeeData.find(); // Retrieve all documents from the Coffee collection
        console.log(coffees);
    } catch (error) {
        console.error('Error retrieving data:', error);
    } finally {
        mongoose.disconnect(); // Disconnect from MongoDB
    }
};

 fetchAndLogData();// Call the function to fetch and log data
