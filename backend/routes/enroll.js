import express from "express";
import Enrollment from "../models/Enrollment.js";
import auth from "../middleware/auth.js";

const router=express.Router();

router.post("/",auth,async(req,res)=>{
 const e=await Enrollment.create({
  user:req.user.id,
  course:req.body.courseId
 });

 res.json(e);
});

export default router;
