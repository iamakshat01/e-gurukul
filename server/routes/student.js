const express = require("express");
const router = express.Router();
const student = require("../controllers/student");

const dummyAuth = (req, res, next) => {
  const user = {
    _id: "6182240fc391cdaa470c0082",
    role: "student",
  };
  req.user = user;
  next();
};
// add auth middleware
router.get("/activeClassrooms", dummyAuth, student.activeClassrooms);
router.get("/classrooms/:classroom_id", dummyAuth, student.classroom);

module.exports = router;
