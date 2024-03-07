import mongoose from "mongoose";

const beveragesSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
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
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    overallStars: {
        type: Number,
        required: true
    },
    nutritionalValues: {
        calories: {
            type: Number,
            required: true
        },
        sugar: {
            type: Number,
            required: true
        },
        carbohydrates: {
            type: Number,
            required: true
        },
        fat: {
            type: Number,
            required: true
        },
        protein: {
            type: Number,
            required: true
        }
    }
});

const BeveragesData = mongoose.model('BeveragesData', beveragesSchema,"bottled_beverages");

export default BeveragesData;
