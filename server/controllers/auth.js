const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../bin/config')

exports.login = async (req, res, next) => {
    try {
      const user = await User.findOne({
        username: req.body.username,
      });
      const { id, username, role } = user;
      const valid = await user.comparePassword(req.body.password);
  
      if (valid) {
        const token = jwt.sign({ id, username, role }, config.secret);
        return res.status(200).json({
          id,
          username,
          token,
        });
      } else {
        throw new Error();
      }
    } catch (err) {
      return next({ status: 404, message: 'Invalid Username/Password' });
    }
};