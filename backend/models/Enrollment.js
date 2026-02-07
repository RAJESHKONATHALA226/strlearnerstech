import mongoose from "mongoose";

export default mongoose.model("Enrollment",new mongoose.Schema({
 user:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
 },
 course:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Course"
 }
}));
