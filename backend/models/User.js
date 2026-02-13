import mongoose from "mongoose";

export default mongoose.model("User",new mongoose.Schema({
 name:String,
 email:String,
 image:{type:String,default:"https://cdn-icons-png.flaticon.com/512/149/149071.png"},
 description:{type:String,default:"Hey there! I'm using StrLearnersTech."},
 password:String,
 role:{type:String,default:"user"}
}));
