const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['faculty','admin','student'],
        required: true
    }
}, {timestamps: true});

UserSchema.pre('save', async function(next) {
    try {
      if (!this.isModified('password')) {
        return next();
      }
      const hashed = await bcrypt.hash(this.password, 10);
      this.password = hashed;
      return next();
    } catch (err) {
      return next(err);
    }
  });
  
UserSchema.methods.comparePassword = async function(attempt, next) {
    try {
      return await bcrypt.compare(attempt, this.password);
    } catch (err) {
      return next(err);
    }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;