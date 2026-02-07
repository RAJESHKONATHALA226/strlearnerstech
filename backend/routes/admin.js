import express from "express";
import {auth,admin} from "../middleware/auth.js";
import Enrollment from "../models/Enrollment.js";
import User from "../models/User.js";

const router=express.Router();

router.post("/grant-access",auth,admin,async(req,res)=>{

 const {userId,courseId}=req.body;

 const exist=await Enrollment.findOne({
  user:userId,
  course:courseId
 });

 if(exist)
 return res.json({msg:"Already has access"});

 const enroll=await Enrollment.create({
  user:userId,
  course:courseId
 });

 res.json(enroll);
});

router.post("/remove-access",auth,admin,async(req,res)=>{

 const {userId,courseId}=req.body;

 await Enrollment.deleteOne({
  user:userId,
  course:courseId
 });

 res.json({msg:"Access removed"});
});

router.get("/users",auth,admin,async(req,res)=>{
 res.json(await User.find());
});

export default router;
