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
        title: {
            type: String,
            required:true
        },
        image: {
            type: String,
            required:true
        },
        pricePerPiece: {
            type: Number,
            required:true
        },
        price: {
            type: Number,
            required:true
        },
        quantity: {
          type: Number,
          required:true,
          default:1
      },
        mlQuantity: {
            type: String,
        },
        packing: {
            type: Number,
            required:true
        },
        type: {
            type: String,
            required:true
        }
    },{
        timestamps: true
    }
);

export const Cart = mongoose.model("Cart", cartSchema);