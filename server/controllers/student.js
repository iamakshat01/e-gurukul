const Student = require("../models/student");
const Classroom = require("../models/classroom");

const checkRole = (req) => {
  if (req.user.role !== "student") throw new Error("Unauthorized");
};

exports.activeClassrooms = async (req, res, next) => {
  try {
    // req.user._id
    // req.user.role
    checkRole(req);

    const id = req.user._id;
    const student = await Student.findById(id);

    const classrooms = await Classroom.find({
      batch: student.batch,
      status: "active",
    });

    res.send(classrooms);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.classroom = async (req, res, next) => {
  try {
    checkRole(req);
    const id = req.user._id;
    const { classroom_id } = req.params;
    const { batch } = await Student.findById(id);

    const classroom = await Classroom.findOne({
      _id: classroom_id,
      batch,
    });

    res.send(classroom);
  } catch (error) {
    return next({
      status: 400,
      message: error.message,
    });
  }
};
