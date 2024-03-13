import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Cart } from "../models/cart.model.js";
import { CoffeeData } from "../models/coffeeData.model.js";
import { TeaData } from "../models/teaData.model.js";
import { BeveragesData } from "../models/beveragesData.model.js";

//Coffee Tea BottledBeverages

const getProductTypeFromImageUrl = (imageUrl) => {
    if (imageUrl.includes("Coffee")) return CoffeeData;
    if (imageUrl.includes("Tea")) return TeaData;
    if (imageUrl.includes("BottledBeverages")) return BeveragesData;
    return "other";
}

const addToCart = asyncHandler(async (req, res) => {
    const { _id, quantity, image } = req.body;
    
    // Determine the product type from the image URL
    const productType = getProductTypeFromImageUrl(image);
    console.log("productType: ", productType);

    // Find the product by ID
     const product = await productType.findById(_id);
    console.log("Cart Product: ", product);

    // // Check if the product exists
    // if (!product) {
    //     throw new ApiError(404, "Product not found");
    // }

    // // Check if the user has a cart
    // let cart = req.user ? await Cart.findOne({ userId: req.user._id }) : null;

    // // If no cart exists for the user, create a new cart and set it to the user's cart
    // if (!cart) { 
    //     cart = await Cart.create({ userId: req.user._id });
    //     req.user.cart = cart._id;
    //     await req.user.save({ validateBeforeSave: false });
    // }

    // // Check if the product is already in the cart
    // const itemInCartIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    // // If the product is already in the cart, update the quantity of that item instead of adding another one
    // if (itemInCartIndex !== -1) {
    //     cart.items[itemInCartIndex].quantity += quantity;
    // } else {
    //     // Otherwise, add the product to the cart
    //     cart.items.push({ productId, quantity, productType });
    // }

    // // Save the cart
    // await cart.save();

    // // Return a success response
    // res.status(200)
    // .json(new ApiResponse(200, "Item added to cart", { cart }));
});

// Get all items in the user's cart
const getCartItems = async (req, res) => {
    const cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId");

    return new ApiResponse(200, "Cart items retrieved", { cart });
};

// Remove an item from the user's cart by its index in the array of items
const removeFromCart = async (req, res) => {
    const { index } = req.params;

    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) throw new ApiError(404, "Cart not found");

    cart.items.splice(index, 1);

    await cart.save();

    return new ApiResponse(200, "Item removed from cart", { cart });
};

export { addToCart, getCartItems, removeFromCart };