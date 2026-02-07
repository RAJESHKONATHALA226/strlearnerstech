import express from "express";
import Course from "../models/Course.js";
import {auth,admin} from "../middleware/auth.js";

const router=express.Router();

router.get("/",async(req,res)=>{
 res.json(await Course.find());
});

router.post("/",auth,admin,async(req,res)=>{
 res.json(await Course.create(req.body));
});

router.put("/:id",auth,admin,async(req,res)=>{
 res.json(await Course.findByIdAndUpdate(
  req.params.id,
  req.body,
  {new:true}
 ));
});

router.delete("/:id",auth,admin,async(req,res)=>{
 await Course.findByIdAndDelete(req.params.id);
 res.json({msg:"course deleted"});
});

export default router;
