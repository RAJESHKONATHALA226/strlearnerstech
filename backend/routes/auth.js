import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router=express.Router();

router.post("/register",async(req,res)=>{
 const user=await User.create(req.body);
 res.json(user);
});

router.post("/login",async(req,res)=>{
 const user=await User.findOne({email:req.body.email,password:req.body.password});
 if(!user) return res.sendStatus(401);

 const token=jwt.sign(
  {_id:user._id,role:user.role},
  "secret123"
 );

 const {password,...otherDetails}=user._doc;

 res.json({user:otherDetails,token:token});
});

export default router;
