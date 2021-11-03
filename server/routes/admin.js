const express = require('express');
const router = express.Router();
const parseFile = require('../utility/parseFile')
const {registerFaculty, registerStudent, createBatch} = require('../controllers/admin')


// for registering faculty
router.post('/register/faculty',parseFile('faculty'),registerFaculty);

// for registering student
router.post('/register/student',parseFile('student'),registerStudent);

// for creating a batch
router.post('/batch/register',createBatch);

module.exports = router;
