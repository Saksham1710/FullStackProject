import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("Connected to mongo, \nDB HOST: ", connectionInstance.connection.host);
    } catch (error) {
        console.log("Error connecting to mongo: ", error)
        process.exit(1);
    }
}

export default connectDB;

// import { MongoClient } from "mongodb";

// let dbConnection

// export const connectToDb = (cb) => {
//     MongoClient.connect("mongodb+srv://saksham:Saksham%40123@cluster0.j5qv4li.mongodb.net/BrewBox")
//     .then((client)=>{
//         dbConnection = client.db();
//         return cb();
//     })
//     .catch((err)=>{
//         console.log(err);
//         return cb(err);
//     });
// };

// export const getDb = () => dbConnection;