import mongoose,{Schema} from "mongoose";

const wishlistSchema = new mongoose.Schema({
    user_id:{
        type: Schema.Types.ObjectId,  
        ref: 'User',
    },
    product_id:{
        type: Schema.Types.ObjectId,  
        ref: 'Product',
    }
},
{timestamps: true}
);

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);