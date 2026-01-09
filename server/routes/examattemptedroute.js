const express = require("express");
const router = express.Router();
const ExamAttempted = require("../models/ExamAttempted");

// GET all exams attempted by a user
router.get("/user/:id", async (req, res) => {
  try {
    const exams = await ExamAttempted.find({ examineeId: req.params.id })
      .populate("examId", "title totalMarks passingMarks") // get exam title, marks
      .populate("examineeId", "name email"); // get user name and email

    res.json(exams);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
