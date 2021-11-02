const express = require("express");
const router = express.Router();
const studentActiveClassrooms = require("../controllers/studentActiveClassrooms");

const dummyAuth = (req, res, next) => {
  const user = {
    _id: "61810842dfaf5357a7ebc8c4",
    role: "student",
  };
  req.user = user;
  next();
};
// add auth middleware
router.get("/activeClassrooms", dummyAuth, studentActiveClassrooms);

module.exports = router;
