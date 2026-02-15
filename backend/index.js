import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import mongooose from "mongoose";
import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/course.js";
import lessonRoutes from "./routes/lesson.js";
import userRoutes from "./routes/user.js";
import commentRoutes from "./routes/comment.js";




connectDB();

const app=express();

app.use(cors({
  origin: "https://strlearners.site",
    credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/courses",courseRoutes);
app.use("/api/lessons",lessonRoutes);
app.use("/api/user",userRoutes);
app.use("/api/comments",commentRoutes);


app.listen(5000,()=>{
 console.log("Server Running on 5000");
});
