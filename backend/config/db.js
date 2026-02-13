import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.set("strictQuery", true);
 const connectDB=async()=>{
    try {
      await mongoose.connect("mongodb://localhost:27017/lms");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB",error);
    }
}
export default connectDB;

