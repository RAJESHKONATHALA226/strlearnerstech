import Enrollment from "../models/Enrollment.js";

export const courseAccess=async(req,res,next)=>{

 if(req.user.role==="admin")
 return next();

 const enroll=await Enrollment.findOne({
  user:req.user._id,
  course:req.params.courseId
 });

 if(!enroll)
 return res.status(403).json({
  msg:"Admin has not granted course access"
 });

 next();
};
