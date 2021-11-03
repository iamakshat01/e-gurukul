const jwt = require('jsonwebtoken');
const config = require('../bin/config')

exports.auth = (req, res, next) => {
  if (req.headers['authorization']) {
    const token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        next(Error('Please Sign In'));
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    next(Error('Please SignIn or Register'));
  }
};