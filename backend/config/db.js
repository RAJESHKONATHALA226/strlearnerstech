import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.set("strictQuery", true);
 const connectDB=async()=>{
    try {
        const DB_OPTIONS={
            dbNAME:process.env.DBNAME,
           // user:process.env.DBUSERNAME,
          // pass:process.env.DBPASSWORD,
          // authSource:process.env.DBAUTHSOURCE
        }
        await mongoose.connect(process.env.MONGO_URI,DB_OPTIONS);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB",error);
    }
}
export default connectDB;

