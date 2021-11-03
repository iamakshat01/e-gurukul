var express = require('express');
var router = express.Router();
const {auth} = require('../utility/auth')

/* GET users listing. */
router.get('/',auth, function(req, res, next) {
  console.log(req.user);
  res.send('respond with a resource');
});

module.exports = router;
