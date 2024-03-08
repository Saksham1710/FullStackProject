import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
    },
    coverImage:{
        type: String,
    },
    phone:{
        type: Number
    }
},{timestamps: true});


export const User = mongoose.model('User', userSchema);