const Faculty = require('../models/faculty');
const Classroom = require('../models/classroom');

const mongoose = require('mongoose');

exports.verifyFacultyAccount = (req, res, next) => {
    let role = req.user.role;
    let user_id = req.user.id;
    if(role === 'student'){
        let error = new Error('Unauthorized Access!')
        error.status(401);
        next(error);
    }
    else{
        Faculty.find({user_id: mongoose.Types.ObjectId(user_id)}).then(fac => {
            req.fac = fac[0];
            next();
        }).catch(err => {
            let error = new Error('Could not process request!')
            error.status(500);
            next(error);
        });
    }
}