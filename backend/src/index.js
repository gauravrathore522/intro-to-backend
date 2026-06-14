import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/database.js";

dotenv.config({
    path: "./.env"
});

const startServer =  async () => {
    try{
        console.log(process.env.MONGODB_URI);
        await connectDB();

        app.on("error", (error) => {
            console.log("ERROR", error);
            throw error;
        });

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT || 8000}`);
        });
    } catch(error) {
        console.error("MongoDB connection error: ", error);
    }
} 

startServer();