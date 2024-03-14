import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Cart } from "../models/cart.model.js";


//add the item into the DB
const addCoffeeToCart = asyncHandler(async(req,res)=>{
    const {userId,productId,quantity,mlQuantity,packing,title,image,price,type} = req.body;

    const item = await Cart.create({
        userId,
        coffeeItem: productId,
        title,
        image,
        price,
        type,
        quantity: Number(quantity),
        mlQuantity,
        packing,  
    });

    if(!item) throw new ApiError(500, "Error adding item to cart");
    res.status(201).json(new ApiResponse(201, "Item added to cart", { item }));    
})
const addTeaToCart = asyncHandler(async(req,res)=>{
    const {userId,productId,quantity,mlQuantity,packing,title,image,price,type} = req.body;

    const item = await Cart.create({
        userId,
        teaItem: productId,
        title,
        image,
        price,
        type,
        quantity: Number(quantity),
        mlQuantity,
        packing,  
    });

    if(!item) throw new ApiError(500, "Error adding item to cart");
    res.status(201).json(new ApiResponse(201, "Item added to cart", { item }));    
})
const addBeverageToCart = asyncHandler(async(req,res)=>{
    const {userId,productId,quantity,mlQuantity,packing,title,image,price,type} = req.body;

    const item = await Cart.create({
        userId,
        beverageItem: productId,
        title,
        image,
        price,
        type,
        quantity: Number(quantity),
        mlQuantity,
        packing,  
    });

    if(!item) throw new ApiError(500, "Error adding item to cart");
    res.status(201).json(new ApiResponse(201, "Item added to cart", { item }));    
})

// Get all items in the user's cart
const getCartItems = async (req, res) => {
    try {
        const cart = await Cart.find({ userId: req.user._id });
        if (!cart) throw new ApiError(404, "Cart not found");

        res.status(200).json({ success: true, data: cart, message: "Cart checked" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
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

export { addCoffeeToCart, getCartItems, removeFromCart, addTeaToCart, addBeverageToCart};