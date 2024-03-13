import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      coffeeItem: {
          type: mongoose.Schema.Types.ObjectId,  
          ref: 'CoffeeData' 
      },
      teaItem: {
          type: mongoose.Schema.Types.ObjectId,  
          ref: 'TeaData' 
      },
      beverageItem: {
          type: mongoose.Schema.Types.ObjectId,  
          ref: 'BeveragesData' 
      },
      quantity: {
          type: Number,
          required:true,
          default:1
      },
    }
);

export const Cart = mongoose.model("Cart", cartSchema);