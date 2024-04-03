import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";


//add the item into the DB
const addCoffeeToCart = asyncHandler(async(req,res)=>{
    const {userId,productId,quantity,mlQuantity,packing,title,image,price,type, pricePerPiece} = req.body;
    console.log("Request body", req.body);

    //check if the item is already in the cart
    const itemInCart = await Cart.findOne({ coffeeItem: productId});
    console.log("Item in cart", itemInCart);



     // if item in cart lets check if the all the details are the same then increase the quantity of the item
    if(itemInCart){
        if(itemInCart.userId == userId && itemInCart.coffeeItem == productId){
            console.log("everything is same");
             itemInCart.quantity = itemInCart.quantity + Number(quantity);
             itemInCart.price = itemInCart.price + parseFloat(price);
             await itemInCart.save();
             return res.status(200).json(new ApiResponse(200, "Item added to cart", { itemInCart }));
            }else{
                const item = await Cart.create({
                    userId,
                    coffeeItem: productId,
                    title,
                    image,
                    pricePerPiece,
                    price,
                    type,
                    quantity: Number(quantity),
                    mlQuantity,
                    packing,  
                });
                console.log("everything is not same");
            
                if(!item) throw new ApiError(500, "Error adding item to cart");
                res.status(201).json(new ApiResponse(201, "Item added to cart", { item }));
        }}
        else{
            const item = await Cart.create({
                userId,
                coffeeItem: productId,
                title,
                image,
                pricePerPiece,
                price,
                type,
                quantity: Number(quantity),
                mlQuantity,
                packing,  
            });
        
            if(!item) throw new ApiError(500, "Error adding item to cart");
            res.status(201).json(new ApiResponse(201, "Item added to cart", { item }));    
        }
})
const addTeaToCart = asyncHandler(async(req,res)=>{
    const {userId,productId,quantity,mlQuantity,packing,title,image,price,type, pricePerPiece} = req.body;
    console.log("Request body", req.body);

    //check if the item is already in the cart
    const itemInCart = await Cart.findOne({ teaItem: productId});
    console.log("Item in cart", itemInCart);



     // if item in cart lets check if the all the details are the same then increase the quantity of the item
    if(itemInCart){
        if(itemInCart.userId == userId && itemInCart.teaItem == productId){
            console.log("everything is same");
             itemInCart.quantity = itemInCart.quantity + Number(quantity);
             itemInCart.price = itemInCart.price + parseFloat(price);
             await itemInCart.save();
             return res.status(200).json(new ApiResponse(200, "Item added to cart", { itemInCart }));
            }else{
                const item = await Cart.create({
                    userId,
                    teaItem: productId,
                    title,
                    image,
                    pricePerPiece,
                    price,
                    type,
                    quantity: Number(quantity),
                    mlQuantity,
                    packing,  
                });
                console.log("everything is not same");
            
                if(!item) throw new ApiError(500, "Error adding item to cart");
                res.status(201).json(new ApiResponse(201, "Item added to cart", { item }));
        }}
        else{
            const item = await Cart.create({
                userId,
                teaItem: productId,
                title,
                image,
                pricePerPiece,
                price,
                type,
                quantity: Number(quantity),
                mlQuantity,
                packing,  
            });
        
            if(!item) throw new ApiError(500, "Error adding item to cart");
            res.status(201).json(new ApiResponse(201, "Item added to cart", { item }));    
        }

})
const addBeverageToCart = asyncHandler(async(req,res)=>{
    const {userId,productId,quantity,mlQuantity,packing,title,image,price,type, pricePerPiece} = req.body;
    console.log("Request body", req.body);

    //check if the item is already in the cart
    const itemInCart = await Cart.findOne({ beverageItem: productId});
    console.log("Item in cart", itemInCart);



     // if item in cart lets check if the all the details are the same then increase the quantity of the item
    if(itemInCart){
        if(itemInCart.userId == userId && itemInCart.beverageItem == productId && itemInCart.mlQuantity == mlQuantity && itemInCart.packing == packing){
            console.log("everything is same");
             itemInCart.quantity = itemInCart.quantity + Number(quantity);
             itemInCart.price = itemInCart.price + parseFloat(price);
             await itemInCart.save();
             return res.status(200).json(new ApiResponse(200, "Item added to cart", { itemInCart }));
            }else{
                const item = await Cart.create({
                    userId,
                    coffeeItem: productId,
                    title,
                    image,
                    pricePerPiece,
                    price,
                    type,
                    quantity: Number(quantity),
                    mlQuantity,
                    packing,  
                });
                console.log("everything is not same");
            
                if(!item) throw new ApiError(500, "Error adding item to cart");
                res.status(201).json(new ApiResponse(201, "Item added to cart", { item }));
        }}
        else{
            const item = await Cart.create({
                userId,
                beverageItem: productId,
                title,
                image,
                pricePerPiece,
                price,
                type,
                quantity: Number(quantity),
                mlQuantity,
                packing,  
            });
        
            if(!item) throw new ApiError(500, "Error adding item to cart");
            res.status(201).json(new ApiResponse(201, "Item added to cart", { item }));    
        }
  
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
    const { itemId } = req.params;

    try {
        // Find the cart by its ID and delete it
        const deletedCart = await Cart.findOneAndDelete({ _id: itemId });

        // Check if the cart exists
        if (!deletedCart) {
            throw new ApiError(404, "Cart not found");
        }

        return new ApiResponse(200, "Cart deleted successfully", { cart: deletedCart });
    } catch (error) {
        console.error("Error removing cart: ", error);
        throw new ApiError(500, "Internal server error");
    }
};

// update the quantity of the item in the cart
const updateCartQty = async (req, res) => {
    const { itemId, quantity } = req.params;
    console.log("Request params", req.params);


    // Find the cart
    const cart = await Cart.findOne({ _id: itemId });
    //console.log("cart",JSON.stringify(cart));
    console.log("cart",cart);
    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }



    // Update the quantity of the item
    //if item type is beverage then quantity will packing*quantity and price will pricePerPiece*packing*quantity
    if(cart.type == "bottled"){
        cart.quantity = parseInt(quantity);
        cart.price = cart.pricePerPiece * parseInt(quantity) * cart.packing;
        await cart.save();
    }else{
    cart.quantity = parseInt(quantity);
    cart.price = cart.pricePerPiece * parseInt(quantity);
    await cart.save();
    }


     return new ApiResponse(200, "Cart updated", { cart });
};

const addItemToOrderHistory = asyncHandler(async(req,res)=> {
    const {userId, addressId, orderItems, paymentMethod, paymentResult, taxPrice, shippingPrice, totalPrice, isPaid, paidAt, isDelivered, deliveredAt} = req.body;
    console.log("Request body", req.body);
    let orderhistory=await Order.create({
        userId,
        addressId,
        orderItems,
        paymentMethod,
        paymentResult,
        taxPrice,
        shippingPrice ,
        totalPrice,
        isPaid,
        paidAt,
        isDelivered,
        deliveredAt
    });
   res.json(orderhistory);
});

export { addCoffeeToCart, getCartItems, removeFromCart, addTeaToCart, addBeverageToCart, updateCartQty, addItemToOrderHistory};