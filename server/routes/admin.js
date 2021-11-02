const express = require('express');
const router = express.Router();
const parseFile = require('../utility/parseFile')
const {registerFaculty, registerStudent} = require('../controllers/admin')


// for registering faculty
router.post('/register/faculty',parseFile('faculty'),registerFaculty);

// for registering student
router.post('/register/student',parseFile('student'),registerStudent);

module.exports = router;
