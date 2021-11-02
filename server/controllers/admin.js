const parseCSVBuffer = require('../utility/parseCSVData');
const User = require('../models/user');
const Faculty = require('../models/faculty');
const Student = require('../models/student');
const Batch = require('../models/batch');

// registering faculty
exports.registerFaculty = async (req, res, next) => {

    try {

        // parsing the file obtained from multer using csv-parser
        const facultyData = await parseCSVBuffer(req.file.buffer);
        
        facultyData.forEach(async function (faculty) {
            
            const user = await User.create({
                username: faculty.username,
                password: faculty.dob,
                role: 'faculty'
            });

            const instructor = await Faculty.create({
                user_id: user._id,
                faculty_code: faculty.faculty_code,
                personal_info: faculty,
            })
        });

        return res.status(201).json('Faculty list succesfully added');

    } catch(err) {
        return next({
            status: 400,
            message: err.message
        })
    }
}

exports.registerStudent = async (req, res, next) => {

    try {
        const studentData = await parseCSVBuffer(req.file.buffer);
        
        const batch = await Batch.findOne({
            batch_code: req.body.batch
        })

        studentData.forEach(async function (student) {
            
            const user = await User.create({
                username: student.username,
                password: student.dob,
                role: 'student'
            });

            const newStudent = await Student.create({
                user_id: user._id,
                roll_no: student.roll_no,
                batch: batch._id,
                personal_info: student,
            })

            // console.log(batch, newStudent);
        });

        return res.status(201).json('Student list succesfully added');

    } catch(err) {
        return next({
            status: 400,
            message: err.message
        })
    }
}


exports.createBatch = async (req,res,next) => {
    try {
        const batch = await Batch.create(req.body);
        return res.status(201).json('Batch Created Successfully');
    } catch(err) {
        return next({
            status: 400,
            message: err.message
        })
    }
}