import mongoose from "mongoose";
import dns from "dns";
import { DB_NAME } from "./constants.js"; // Import the database name

// Use Google DNS to bypass ISP/Network issues with resolving MongoDB SRV records
dns.setServers(['8.8.8.8', '8.8.4.4']);

export const connectDB = async () => {
    try {
        // Append the database name to the URI
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`);
        console.log(`Connected to MongoDB !!! ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
