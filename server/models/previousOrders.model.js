import mongoose from "mongoose";

const previousOrdersSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'User',
    },
    order_id:{
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Order',
    }
});

export const PreviousOrders = mongoose.model("PreviousOrders", previousOrdersSchema);