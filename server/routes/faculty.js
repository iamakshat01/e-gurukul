const express = require('express');

const auth = require('../utility/auth');

const facultyController = require('../controllers/faculty');

const classroomRouter = require('./fac_classroom');

const router = express.Router();

// for handling authentication and user detail retrieval

router.use('/',auth.auth, facultyController.verifyFacultyAccount);

// for handling the different classroom related actions

router.use('/classrooms', classroomRouter);

module.exports = router;