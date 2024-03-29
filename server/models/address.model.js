import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    user_id:{
        type: Schema.Types.ObjectId,  
        ref: 'User',
    },
    houseNumber:{
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    });

    export const Address = mongoose.model('Address', addressSchema);