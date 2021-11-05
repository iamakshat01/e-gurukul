const express = require('express');
const router = express.Router();
const parseFile = require('../utility/parseFile')
const {registerFaculty, registerStudent, createBatch, getbatchDetails, updateBatch,deleteBatch,deleteUser} = require('../controllers/admin')
const { auth } = require('../utility/auth');

// for registering faculty
router.post('/register/faculty',parseFile('faculty'),registerFaculty);

// for registering student
router.post('/register/student',parseFile('student'),registerStudent);

// for creating a batch
router.post('/batch/register',createBatch);

// for getting a batch details
router.get('/batch/:batch_id',getbatchDetails);

// for updating batch details
router.put('/batch/:batch_id',auth,updateBatch);

// for deleting a user
router.delete('/:user_id',auth,deleteUser);

// for deleting a batch
router.delete('/batch/:batch_id',auth,deleteBatch);

module.exports = router;
