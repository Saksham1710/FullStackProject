import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const coffeeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    pricePer10lb: {
        type: Number,
        required: true
    },
    overallStars: {
        type: Number,
        required: true
    },
    roastType: {
        type: String,
        required: true
    },
    nutritionalValues: {
        calories: Number,
        protein: Number,
        fat: Number,
        carbohydrates: Number,
        fiber: Number,
        sugars: Number,
        sodium: Number,
        cholesterol: Number,
        caffeine: Number,
        vitamins: {
            vitaminA: Number,
            vitaminC: Number,
            calcium: Number,
            iron: Number
        }
    }
},{
    timestamps: true
});

coffeeSchema.plugin(mongooseAggregatePaginate);

export const CoffeeData = mongoose.model("CoffeeData", coffeeSchema,"coffee");