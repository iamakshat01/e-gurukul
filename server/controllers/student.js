const Student = require("../models/student");
const Classroom = require("../models/classroom");
const Post = require("../models/post");

//{ id, username, role }

const checkRole = (req) => {
  if (req.user.role !== "student") throw new Error("Unauthorized");
};

exports.getAllClassroom = async (req, res, next) => {
  try {
    checkRole(req);

    const user_id = req.user.id;
    const student = await Student.findOne({
      user_id,
    });

    const classrooms = await Classroom.find({
      batch: student.batch,
    });

    res.send(classrooms);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.getClassroomByStatus = async (req, res, next) => {
  try {
    // req.user.id
    // req.user.role
    checkRole(req);

    const user_id = req.user.id;
    const student = await Student.findOne({
      user_id,
    });
    const { status } = req.params;

    const classrooms = await Classroom.find({
      batch: student.batch,
      status,
    });

    res.send(classrooms);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.getClassroom = async (req, res, next) => {
  try {
    checkRole(req);
    const user_id = req.user.id;
    const { classroom_id } = req.params;
    console.log(user_id);
    const { batch } = await Student.findOne({
      user_id,
    });

    const classroom = await Classroom.findOne({
      _id: classroom_id,
      batch,
    }).populate('batch').populate('faculty');

    res.send(classroom);
  } catch (error) {
    return next({
      status: 400,
      message: error.message,
    });
  }
};

exports.getPostsOfClassroom = async (req, res, next) => {
  try {
    checkRole(req);
    const user_id = req.user.id;
    const { classroom_id } = req.params;

    const { batch } = await Student.findOne({
      user_id,
    });

    const posts = await Post.find({
      classroom_id,
    });

    res.send(posts);
  } catch (error) {
    return next({
      status: 400,
      message: error.message,
    });
  }
};

exports.postComment = async (req, res, next) => {
  // we will be receiving comment
  try {
    checkRole(req);
    const user_id = req.user.id;
    const { classroom_id, post_id } = req.params;

    const comment = {
      comment: req.body.comment,
      author: req.user.username,
    };

    const { batch } = await Student.findOne({
      user_id,
    });

    const post = await Post.findOne({
      post_id,
      classroom_id,
    });

    post.comments.push(comment);

    post.save();

    res.send(post);
  } catch (error) {
    return next({
      status: 400,
      message: error.message,
    });
  }
};
