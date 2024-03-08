import mongoose, {Schema} from "mongoose";

const orderSchema = new mongoose.Schema({
    user_id:{
        type: Schema.Types.ObjectId,  
        ref: 'User',
    },
    address_id:{
        type: Schema.Types.ObjectId,  
        ref: 'Address',
    },
    orderItems: [
        {
            product_id:{
                type: Schema.Types.ObjectId,  
                ref: 'Product',
            },
            quantity:{
                type: Number,
                required: true
            },
            price:{
                type: Number,
                required: true
            },
        }
    ],
    paymentMethod:{
        type: String,
        required: true
    },
    paymentResult:{
        id: String,
        status: String,
        update_time: String,
        email_address: String
    },
    taxPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid:{
        type: Boolean,
        required: true,
        default: false
    },
    paidAt:{
        type: Date,
    },
    isDelivered:{
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt:{
        type: Date,
    }
},{timestamps: true
});

export const Order = mongoose.model("Order", orderSchema);