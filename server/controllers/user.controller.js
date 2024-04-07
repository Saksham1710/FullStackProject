import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Address } from "../models/address.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error generating tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // Get user details from the frontend
  const { firstName, lastName, email, password, confirmPassword, phone } =
    req.body;

  // Validation - check for empty fields
  if (
    [firstName, lastName, email, password].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if password and confirm password match
  if (password !== confirmPassword) {
    throw new ApiError(400, "Passwords do not match");
  }

  // Check if user already exists with email
  const existedUser = await User.findOne({
    email: { $regex: new RegExp("^" + email.toLowerCase(), "i") },
  });

  // Check if the user already exists
  if (existedUser) {
    console.log("User found!!: " + existedUser);
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
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  console.log("User created: " + createdUser);

  // Check for user creation
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  // // Generate access and refresh tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    createdUser._id
  );

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  };

  // Return response
  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // req body -> data
  // username or email
  //find the user
  //password check
  //access and referesh token
  //send cookie

  const { email, password } = req.body;
  console.log("Email: " + email);
  console.log("Password: " + password);

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({
    email: { $regex: new RegExp("^" + email.toLowerCase(), "i") },
  });

  if (!user) {
    console.log("API RESPONSE",new ApiResponse(404, null, "User does not exist"));
    throw new ApiResponse(404, null, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully",
        true
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: false,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(400, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Refresh token is expired");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };
    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken: newRefreshToken,
          },
          "Access Token Refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user;
  console.log(userId); // Assuming you have middleware to extract user information from JWT token
  if (!userId) {
    throw new ApiError(401, "Unauthorized request");
  }

  const user = await User.findById(userId._id).select(
    "-password -refreshToken"
  );
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        JSON.stringify(user),
        "User details fetched successfully",
        true
      )
    );
});

const getAddress = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const addresses = await Address.find({ userId: userId });

  // If no existing address for the user, return an error
  if (!addresses.length) {
    throw new ApiError(404, "No address found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, addresses, "Addresses fetched successfully"));
});

const addAddress = asyncHandler(async (req, res) => {
  const { houseNumber, street, city, state, country, zip } = req.body;
  const userId = req.user._id;

  let address = await Address.findOne({ userId: userId });
  let addressData;

  // If no existing address for the user, create a new one
  if (address) {
    addressData = await Address.create({
      userId,
      houseNumber,
      street,
      city,
      state,
      country,
      zip,
    });
    res
      .status(201)
      .json(
        new ApiResponse(201, addressData, "New Address saved successfully")
      );
  } else if (!address) {
    addressData = await Address.create({
      userId,
      houseNumber,
      street,
      city,
      state,
      country,
      zip,
    });
    res
      .status(201)
      .json(
        new ApiResponse(201, addressData, "First Address saved successfully")
      );
  } else {
    throw new ApiError(400, "Address already exists");
  }
});

const updateProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, phone } = req.body;
  //let avatarLocalPath = req.file;
//     console.log("Avatar Local Path", avatarLocalPath);
//   if(!avatarLocalPath){
//     throw new ApiError(400, "Avatar image is required");
// }

//const avatar = await uploadOnCloudinary(avatarLocalPath);
// if(!avatar){
//     throw new ApiError(500, "Error uploading avatar image");
// }

  const updatedUser = await User.findByIdAndUpdate(
    req.user?._id,
    { $set: { firstName:firstName,
                lastName:lastName,
                phone:phone,
                // avatar:avatar.url
            } },
    { new: true }
  ).select("-password -refreshToken");

  console.log("Updated User", updatedUser);
  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
});

const updateUserAvatar = asyncHandler(async (req,res)=> {
    const avatarLocalPath = req.file?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar image is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if(!avatar){
        throw new ApiError(500, "Error uploading avatar image");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                avatar: avatar.url
            }
        },
        {new: true}
    ).select("-password -refreshToken");

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar updated successfully"));
});

const updateUserCoverImage = asyncHandler(async (req,res)=> {
    const coverImageLocalPath = req.file?.path;

    if(!coverImageLocalPath){
        throw new ApiError(400, "cover image is required");
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if(!coverImage){
        throw new ApiError(500, "Error uploading avatar image");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                coverImage: coverImage.url
            }
        },
        {new: true}
    ).select("-password -refreshToken");

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Cover Image updated successfully"));
});


export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  getAddress,
  addAddress,
  updateProfile,
  updateUserAvatar,
  updateUserCoverImage,
};
