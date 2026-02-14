import express from "express";
import User from "../models/User.js";
import {auth} from "../middleware/auth.js";

const router=express.Router();

router.get("/profile",auth,async(req,res)=>{
    
 res.json(await User.findById(req.user._id));
});
router.get("/all-users", auth, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});


export default router;
