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

const registerUser = asyncHandler( async (req, res) => {
    //get user details from the frontend
    const {firstName, lastName, email, password, phone} = req.body;
    console.log("email: ",email);


    // validation - not empty
        if(
            [firstName, lastName, email, password].some((field) => field?.trim() === "")
        ){
            throw new ApiError(400, "All fields are required");
        };


    // check if user already exists: with username or email
    const existedUser = await User.findOne({
        $or: [ { email } ]
    })
    if(existedUser){
        throw new ApiError(409, "User already exists");
    }

    // // check for images, check for avatar
    // const avatarLocalPath = req.files?.avatar[0]?.path;
    // //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    // let coverImageLocalPath;
    // if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
    //     coverImageLocalPath = req.files.coverImage[0].path;
    // }

    // if(!avatarLocalPath){
    //     throw new ApiError(400, "Avatar is required");
    // }


    // // upload them to cloudinary
    // const avatar = await uploadOnCloudinary(avatarLocalPath);
    // const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    // if(!avatar){
    //     throw new ApiError(500, "Error uploading avatar");
    // }

    // create user object - create entry in db
    const user = await User.create({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password,
        phone: "",
        avatar: "",
        coverImage: "",

    })

    // remove password and refresh token field from the response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )


    // check for user creation
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering user");
    }


    // return response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )


})

export { registerUser }