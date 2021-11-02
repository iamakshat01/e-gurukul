const parseCSVBuffer = require('../utility/parseCSVData');
const User = require('../models/user');
const Faculty = require('../models/faculty');

exports.registerFaculty = async (req, res, next) => {

    try {
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