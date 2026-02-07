import mongoose from "mongoose";

export default mongoose.model("Lesson",new mongoose.Schema({
 title:String,
 videoUrl:String,
 course:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Course"
 }
}));
