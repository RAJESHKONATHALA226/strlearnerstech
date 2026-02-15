import express from "express";
import Lesson from "../models/Lesson.js";
import {auth,admin} from "../middleware/auth.js";


const router=express.Router();

router.get(
 "/:courseId",
 auth,
 async(req,res)=>{
  res.json(
   await Lesson.find({
    course:req.params.courseId
   })
  );
 }
);

router.post("/",auth,admin,async(req,res)=>{
    const lesson=await Lesson.create(req.body);
    lesson.save();
 res.json("successfully added lesson");
});

router.put("/:id",auth,admin,async(req,res)=>{
 res.json(await Lesson.findByIdAndUpdate(
  req.params.id,
  req.body,
  {new:true}
 ));
});

router.delete("/:id",auth,admin,async(req,res)=>{
 await Lesson.findByIdAndDelete(req.params.id);
 res.json({msg:"lesson deleted"});
});

export default router;
