import express from "express";
import Comment from "../models/Comment.js";
import Lesson from "../models/Lesson.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();
// GET SINGLE LESSON + COMMENTS
router.get("/lesson/:id", auth, async (req, res) => {
  try {

    const lesson = await Lesson.findById(req.params.id);

    const comments = await Comment.find({
      lessonId: req.params.id
    }).populate("userId", "name");

    res.json({
      lesson,
      comments,
      totalComments: comments.length
    });

  } catch (err) {
    res.status(500).json(err.message);
  }
});

// ADD COMMENT (Protected)
router.post("/", auth, async (req, res) => {
  try {

    const comment = new Comment({
      lessonId: req.body.lessonId,
      text: req.body.text,
      userId: req.user.id
    });

    await comment.save();

    res.json("Comment added");

  } catch (err) {
    res.status(500).json(err.message);
  }
});

export default router;