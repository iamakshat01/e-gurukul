const express = require('express');
const usersController = require('../controllers/users')
const router = express.Router();

/* GET users listing. */
router.route('/info')
.all((req,res,next) => {
  req.user = {
    _id: '6180f51baf166c44044c24cd',
    role: 'admin'
  }
  next();
})
.get(usersController.getUserInfo)
.put(usersController.updateUserInfo);

router.route('/update_pwd')
.all((req,res,next) => {
  req.user = {
    _id: '6180f51baf166c44044c24cd',
    role: 'faculty'
  }
  next();
})
.put(usersController.updateUserPassword);

module.exports = router;
