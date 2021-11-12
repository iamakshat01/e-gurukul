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
    })
      .populate("batch")
      .populate("faculty");

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

    const classroom = await Classroom.findById(classroom_id)
      .populate("batch")
      .populate("faculty");

    // whether the classroom exists?
    if (!classroom) {
      let error = new Error("Classroom does not exist.");
      error.status = 404;
      throw error;
    }

    // The class is of the the same batch as student?
    // as they both are objects, so we can't compare them directly.

    if (classroom.batch._id.toString() !== batch.toString()) {
      let error = new Error("Unauthorized access.");
      error.status = 401;
      throw error;
    }

    const posts = await Post.aggregate([
      {
        $match: {
          classroom: classroom._id,
        },
      },
      {
        $addFields: {
          totalComments: {
            $size: "$comments",
          },
        },
      },
      {
        $project: {
          classroom: 0,
        },
      },
    ]);

    // processing the res according to the needs
    const processedPost = {
      classroom,
      posts,
    };

    res.send(processedPost);
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

    const student = await Student.findOne({
      user_id,
    });

    const { batch } = student;

    const comment = {
      comment: req.body.comment,
      author:
        student.personal_info.first_name +
        " " +
        student.personal_info.last_name,
    };

    const classroom = await Classroom.findById(classroom_id)
      .populate("batch")
      .populate("faculty");

    // whether the classroom exists?
    if (!classroom) {
      let error = new Error("Classroom does not exist.");
      error.status = 404;
      throw error;
    }

    // The class is of the the same batch as student?
    // as they both are objects, so we can't compare them directly.

    if (classroom.batch._id.toString() !== batch.toString()) {
      let error = new Error("Unauthorized access.");
      error.status = 401;
      throw error;
    }

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
