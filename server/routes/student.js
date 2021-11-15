const express = require("express");
const multer = require("multer");
const router = express.Router();
const student = require("../controllers/student");
const { auth } = require("../utility/auth");

// get all classrooms of a student
router.get("/classrooms/list", auth, student.getAllClassroom);

// get classrooms of a student based on the status
router.get("/classrooms/list/:status", auth, student.getClassroomByStatus);

// get a particular classroom of a student by id
router.get("/classrooms/:classroom_id", auth, student.getClassroom);

//get posts of a particular classroom of a student
router.get("/classrooms/:classroom_id/posts", auth, student.getPostsOfClassroom);

//post and get comment on a classroom post of a student 
router.route("/classrooms/:classroom_id/posts/:post_id/comments").post(auth, multer().none(), student.postComment);

module.exports = router;
