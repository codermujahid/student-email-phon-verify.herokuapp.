
const express = require('express');
const { getAllStudent, creteStudent, getsingleStudent, editStudents, studentDataStore, deleteStudent, updateStudents, getUnverifyedStudent, verifyAccount} = require('../controllers/studentController');
const multer = require('multer');
const path = require('path');




// init router
const router =  express.Router();



// multer config 
const storage = multer.diskStorage({
    destination : ( req, file, cb ) => {

        cb(null, path.join(__dirname, '../public/images/students'));
    },
    filename : (req, file, cb) => {

        cb(null, file.originalname);
    }
});

const studentPhotoMulter = multer({
    storage : storage
}).single('sudent-photo');





// routes
router.get('/', getAllStudent);
router.get('/unverifyed', getUnverifyedStudent);
router.post('/create',studentPhotoMulter,  studentDataStore); 
router.get('/create', creteStudent);


router.get('/verify/:token', verifyAccount);
router.get('/delete/:id', deleteStudent);

router.get('/edit/:id', editStudents);
router.post('/update/:id',studentPhotoMulter, updateStudents);

router.get('/:id', getsingleStudent);
 



// export router
module.exports = router;


