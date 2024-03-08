import mongoose,{Schema} from "mongoose";

const reviewSchema = new mongoose.Schema({
    user_id:{
        type: Schema.Types.ObjectId,  
        ref: 'User',
    },
    product_id:{
        type: Schema.Types.ObjectId,  
        ref: 'Product',
    },
    review:{
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
    },
},{timestamps: true
});

export const Review = mongoose.model("Review", reviewSchema);