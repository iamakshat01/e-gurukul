const express = require('express');
const router = express.Router();
const parseFile = require('../utility/parseFile')
const {registerFaculty} = require('../controllers/admin')
/* GET users listing. */

router.post('/register/faculty',parseFile('faculty'),registerFaculty);

module.exports = router;
