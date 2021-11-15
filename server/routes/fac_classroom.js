const express = require('express');
const multer = require('multer');

const classroomController = require('../controllers/fac_class');

const fileUploader = require('../utility/handleFileUploads');

const router = express.Router();

// for creating new classroom for the user

router.route('/')
.post(multer().none(), classroomController.createClassroom);

// to fetch the list of all the user's classrooms

router.route('/list')
.get(classroomController.getAllClassrooms);

// to fetch the list of the user's classrooms based on the current status

router.route('/list/:status')
.get(classroomController.getClassroomsByStatus);

// for retrieving, updating or deleting user's classroom

router.route('/:class_id').
get(classroomController.getClassroomInfoById)
.delete(classroomController.deleteClassroomById)
.put(multer().none(), classroomController.updateClassroomInfoById);

// for activating user's classroom

router.route('/:class_id/activate').
post(classroomController.activateClassroomById);

// for deactivating user's classroom

router.route('/:class_id/deactivate').
post(classroomController.deactivateClassroomById);

// for creating or fetching posts of of the user's classroom

router.route('/:class_id/posts').
get(classroomController.getClassroomPosts)
.post(fileUploader('attachments', 4), classroomController.createClassroomPost);

// for updating or deleting a post of the user's classroom

router.route('/:class_id/posts/:post_id')
.get(classroomController.getPostById)
.put(multer().none(), classroomController.updatePostById)
.delete(classroomController.deletePostById);

// for fetching and creating comments on a post in user's classroom

router.route('/:class_id/posts/:post_id/comments')
.get(classroomController.getComments)
.post(multer().none(), classroomController.postComment);
module.exports = router;