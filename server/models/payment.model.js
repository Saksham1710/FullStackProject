import mongoose, {Schema} from "mongoose";

const paymentSchema = new mongoose.Schema({
    user_id:{
        type: Schema.Types.ObjectId,  
        ref: 'User',
    },
    cardNumber:{
        type: Number,
        required: true
    },
    cardName: {
        type: String,
        required: true,
    },
    expiry: {
        type: String,
        required: true,
    },
    cvv: {
        type: Number,
        required: true,
    },
});

export const Payment = mongoose.model("Payment", paymentSchema);