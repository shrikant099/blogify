
import { config } from "dotenv"
import mongoose from "mongoose"
config();

export const databaseConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI! as string)
        console.log(`Mongodb connection succesfull`)
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}