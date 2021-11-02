const Student = require("../models/student");
const Classroom = require("../models/classroom");

studentActiveClassrooms = async (req, res, next) => {
  try {
    // req.user._id
    // req.user.role
    if (req.user.role !== "student") {
      throw new Error("Unauthorized");
    }

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

module.exports = studentActiveClassrooms;
