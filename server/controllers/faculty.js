const Faculty = require('../models/faculty');
const Batch = require('../models/batch');

const mongoose = require('mongoose');

exports.verifyFacultyAccount = (req, res, next) => {
    let role = req.user.role;
    let user_id = req.user.id;
    if (role === 'student') {
        let error = new Error('Unauthorized Access!')
        error.status(401);
        next(error);
    }
    else {
        Faculty.find({ user_id: mongoose.Types.ObjectId(user_id) }).then(fac => {
            req.fac = fac[0];
            next();
        }).catch(err => {
            let error = new Error('Could not process request!')
            error.status(500);
            next(error);
        });
    }
};

exports.findActiveBatches = (req, res, next) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    if (month >= 6) {
        Batch.find({
            end_year: {
                $gt: year
            }
        }, {_id:1, batch_code: 1}).then(batches => {
            res.status(200).json(batches);
        }).catch(err => {
            const error = new Error('Could not find batches!');
            error.status = 500;
            return next (err);
        });
    }
    else {
        Batch.find({
            end_year: {
                $gte: year
            }
        }, {_id:1, batch_code: 1}).then(batches => {
            res.status(200).json(batches);
        }).catch(err => {
            const error = new Error('Could not find batches!');
            error.status = 500;
            return next (err);
        });
    }
}