const express = require('express');
const facultyController = require('../controllers/faculty');

const router = express.Router();

router.route('/info');

module.exports = router;