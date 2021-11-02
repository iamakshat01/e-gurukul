const Faculty = require('../models/faculty');
const Student = require('../models/student');
const User = require('../models/user');
const mongoose = require('mongoose');

exports.getUserInfo = (req, res, next) => {
    switch(req.user.role){
        case 'student':
            Student.find({user_id: mongoose.Types.ObjectId(req.user._id)}).then(student => {
                res.status(200).json(student[0]);
            }).catch(err => {
                next(err);
            });
            break;
        default:
            Faculty.find({user_id: mongoose.Types.ObjectId(req.user._id)}).then(fac => {
                res.status(200).json(fac[0]);
            }).catch(err => {
                next(err);
            });
    }
};

exports.updateUserInfo = (req, res, next) => {
    switch(req.user.role){
        case 'student':
            Student.find({user_id: mongoose.Types.ObjectId(req.user._id)}).then(student => {
                student = student[0];
                user_info = req.body;
                for(var k in user_info){
                    student.personal_info[k] = user_info[k];
                }
                student.save().then(result => {
                    res.status(200).json({message: 'Information updated successfully!'});
                }).catch(err => {
                    var error = new Error('Could not update the record!');
                    error.status = 500;
                    throw error;
                })
            }).catch(err => {
                next(err);
            });
            break;
        default:
            Faculty.find({user_id: mongoose.Types.ObjectId(req.user._id)}).then(fac => {
                fac = fac[0];
                user_info = req.body;
                for(var k in user_info){
                    fac.personal_info[k] = user_info[k];
                }
                fac.save().then(result => {
                    res.status(200).json({message: 'Information updated successfully!'});
                }).catch(err => {
                    var error = new Error('Could not update the record!');
                    error.status = 500;
                    throw error;
                });
            }).catch(err => {
                next(err);
            });
    }
};

exports.updateUserPassword = (req, res, next) => {
    User.findById(mongoose.Types.ObjectId(req.user._id)).then(user => {
        let updatedPassword = req.body.password;
        user.password = updatedPassword;
        user.save().then(result => {
            res.status(200).json({message: 'Password updated successfully!'});
        }).catch(err => {
            var error = new Error('Could not update password.');
            error.status = 500;
            throw error;
        });
    }).catch(err => {
        next(err);
    });
}