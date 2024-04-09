import { CoffeeData } from "../models/coffeeData.model.js";
import { TeaData } from "../models/teaData.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { BeveragesData } from "../models/beveragesData.model.js";
import { ApiError } from "../utils/ApiError.js";

const searchProduct = asyncHandler(async (req, res) => {
    const { searchQuery } = req.query; // Retrieve search query from request query parameters
    console.log("Search Query", (searchQuery));

    // Use RegExp to perform case-insensitive search
    const regex = new RegExp(searchQuery, 'i');

    // Perform search in each collection
    const coffeeData = await CoffeeData.find({ title: regex });
    const teaData = await TeaData.find({ title: regex });
    const beveragesData = await BeveragesData.find({ title: regex });

    // Check if any products found
    if (!coffeeData.length && !teaData.length && !beveragesData.length) {
        throw new ApiError(404, "No products found");
    }

    // Respond with search results
    res.status(200).json({ success: true, data: { coffeeData, teaData, beveragesData }, message: "Products found" });
});

export { searchProduct };
