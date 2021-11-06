const express = require("express");
const router = express.Router();
const student = require("../controllers/student");
const {auth} = require("../utility/auth");

// add auth middleware

// get all classrooms of a student
router.get("/classrooms/list", auth, student.getAllClassroom);

// get classrooms of a student based on the status
router.get("/classrooms/list/:status", auth, student.getClassroomByStatus);

// get a particular classroom of a student by id
router.get("/classrooms/:classroom_id", auth, student.getClassroom);

//get posts of a particular classroom of a student
router.get("/classrooms/:classroom_id/posts", auth, student.getPostsOfClassroom);

//post a comment on a classroom post of a student 
router.post("/classrooms/:classroom_id/posts/:post_id/comment", auth, student.postComment);

module.exports = router;
