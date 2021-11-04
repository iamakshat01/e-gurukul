const Faculty = require('../models/faculty');
const Student = require('../models/student');
const User = require('../models/user');
const mongoose = require('mongoose');

// fetch the user information

exports.getUserInfo = (req, res, next) => {
    
    // extract relevant information from req object

    const user_role = req.user.role;
    const user_id = req.user.id;

    // check for the role granted to the user

    switch(user_role){

        // for role : 'student' fetch detail from Student model

        case 'student':
            Student.find({user_id: mongoose.Types.ObjectId(user_id)}).then(student => {
                res.status(200).json(student[0]);
            }).catch(err => {
                next(err);
            });
            break;

        // for any other role fetch details from Faculty model

        default:
            Faculty.find({user_id: mongoose.Types.ObjectId(user_id)}).then(fac => {
                res.status(200).json(fac[0]);
            }).catch(err => {
                next(err);
            });
    }
};

// update the user information

exports.updateUserInfo = (req, res, next) => {
    try{

        // extract relevant information from req object

        const user_info = req.body;
        const user_role = req.user.role;
        const user_id = req.user.id;

        // parse the user information data into an object

        const info = ['first_name','last_name', 'dob', 'mobile','email'];
        const updated_info = {};
        for(let k of info){
            updated_info[k] = user_info[k];
        }

        // check for the role granted to the user
        switch(user_role){
            
            // for role : 'student' update detail using Student model

            case 'student':
                Student.find({user_id: mongoose.Types.ObjectId(user_id)}).then(student => {
                    student = student[0];
                    for(let k in updated_info){
                        student.personal_info[k] = updated_info[k] || student.personal_info[k];
                    }
                    student.save();
                }).then(result => {
                        res.status(200).json({message: 'Information updated successfully!'});
                    }).catch(err => {
                        throw err;
                    });
                break;
                
            // for any other role update detail usig Faculty model

            default:
                Faculty.find({user_id: mongoose.Types.ObjectId(user_id)}).then(faculty => {
                        faculty = faculty[0];
                        for(let k in updated_info){
                            faculty.personal_info[k] = updated_info[k] || faculty.personal_info[k];
                        }
                        return faculty.save();
                    }).then(result => {
                        res.status(200).json({message: 'Information updated successfully!'});
                    }).catch(err => {
                        throw err;
                    });
        }
    }
    catch(err){
        if(!err.status){
            let error = new Error('Could not process the request!');
            error.status = 500;
            return next(error);
        }
        next(err);
    }
};

// update the password for the user

exports.updateUserPassword = (req, res, next) => {

    // extract relevant information from req object

    const user_id = req.user.id;

    // update password using User model

    User.findById(mongoose.Types.ObjectId(user_id)).then(user => {
        let updatedPassword = req.body.password;

        // set new password

        user.password = updatedPassword;

        // save the updated user

        user.save().then(result => {

            // send response for the request

            res.status(200).json({message: 'Password updated successfully!'});
        }).catch(err => {
            throw err;
        });
    }).catch(err => {
        var error = new Error('Could not update password.');
        error.status = 500;
        next(error);
    });
}