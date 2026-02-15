const router = require("express").Router();
const Comment = require("../models/Comment");
const Lesson = require("../models/Lesson");
const auth = require("../middleware/auth");

// GET SINGLE LESSON + COMMENTS
router.get("/lesson/:id", async (req, res) => {
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

module.exports = router;
