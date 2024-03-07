import mongoose from "mongoose";

const teaSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
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
    nutritionalValues: {
        calories: {
            type: Number,
            required: true
        },
        protein: {
            type: Number,
            required: true
        },
        fat: {
            type: Number,
            required: true
        },
        carbohydrates: {
            type: Number,
            required: true
        },
        fiber: {
            type: Number,
            required: true
        },
        sugars: {
            type: Number,
            required: true
        },
        sodium: {
            type: Number,
            required: true
        },
        cholesterol: {
            type: Number,
            required: true
        },
        caffeine: {
            type: Number,
            required: true
        },
        vitamins: {
            vitaminA: {
                type: Number,
                required: true
            },
            vitaminC: {
                type: Number,
                required: true
            },
            calcium: {
                type: Number,
                required: true
            },
            iron: {
                type: Number,
                required: true
            }
        }
    }
});

const TeaData = mongoose.model('TeaData', teaSchema,"tea");

export default TeaData;
