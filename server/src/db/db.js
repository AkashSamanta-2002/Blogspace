import mongoose from "mongoose";
import { DB_NAME } from '../../constants.js'

const connectDB = async () => {
    try {
        const connectioninstance = await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`);
        console.log(`MongoDB Connected\nHost: ${connectioninstance.connection.host}`)
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
        throw error;
    }
}

export {connectDB}