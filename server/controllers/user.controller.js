import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId);
        const accessToken= user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken};

    } catch (error) {
        throw new ApiError(500, "Error generating tokens");
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // Get user details from the frontend
    const { firstName, lastName, email, password, phone } = req.body;

    // Validation - check for empty fields
    if ([firstName, lastName, email, password].some(field => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if user already exists with email
    const existedUser = await User.findOne({ email: { $regex: new RegExp('^' + email.toLowerCase(), 'i') } });
    console.log("User found!!: "+existedUser);

    // Check if the user already exists
    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    // Create user object and save it to the database
    const user = await User.create({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password,
        phone: "",
        avatar: "",
        coverImage: "",
    });

    // Remove sensitive fields from the response
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    // Check for user creation
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user");
    }

    // Return response
    return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser }