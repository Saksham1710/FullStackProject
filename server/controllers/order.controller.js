import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";

const getOrderHistory = asyncHandler(async (req,res)=> {
    try {
        const orders = await Order.find({userId: req.user._id});
        if(!orders) throw new ApiError(404, "No orders found");

        res.status(200).json({ success: true, data: orders, message: "Cart checked" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
})

export {getOrderHistory};