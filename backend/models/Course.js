import mongoose from "mongoose";

export default mongoose.model("Course",new mongoose.Schema({
 title:String,
 description:String,
 image:String
}));
