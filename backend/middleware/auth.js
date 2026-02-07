import jwt from "jsonwebtoken";

export const auth=(req,res,next)=>{
 const token=req.headers.authorization;
 if(!token) return res.sendStatus(401);

 try{
  req.user=jwt.verify(token,"secret123");
  next();
 }catch{
  res.sendStatus(403);
 }
};

export const admin=(req,res,next)=>{
 if(req.user.role!=="admin")
 return res.sendStatus(403);

 next();
};
