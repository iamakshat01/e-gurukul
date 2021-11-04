const express = require('express');
const multer = require('multer');

const usersController = require('../controllers/users');
const auth = require('../utility/auth');

const router = express.Router();

// for handling authentication

router.use('/', auth.auth);

// for fetching and updating the user information

router.route('/info')
.get(usersController.getUserInfo)
.put(multer().none(), usersController.updateUserInfo);

// for updating the user password

router.route('/update_pwd')
.put(multer().none(), usersController.updateUserPassword);

module.exports = router;
