
const path = require('path');
const {readFileSync, writeFileSync} = require('fs');
const { verifyAccountMail } = require('../utility/sendMail');





// get all student //=================================//
const getAllStudent = (req, res ) => {

// student data
const student = JSON.parse(readFileSync(path.join(__dirname, '../db/students.json')))

const verifyed = student.filter(data => data.isVerifyed == true)

    res.render('student/index', {
        student : verifyed
    });
}
 

// get all Unverifyed Student//=================================//
const getUnverifyedStudent = (req, res ) => {

// student data
const student = JSON.parse(readFileSync(path.join(__dirname, '../db/students.json')))

const unverifyed = student.filter(data => data.isVerifyed == false)


    res.render('student/unverifyed', {
        student : unverifyed
    });


}


 
// get all student //=================================//
const creteStudent = (req, res ) => {
    res.render('student/create');
}

// get all student //=================================//
const getsingleStudent = (req, res ) => {

    // student data
    const student = JSON.parse(readFileSync(path.join(__dirname, '../db/students.json')))


    const { id } = req.params;
   
    const students = student.find(data => data.id == id );

     

    res.render('student/show', { students});


}

 
 
// get edit All student//=================================//
const editStudents = (req, res ) => {

    // student data
    const student = JSON.parse(readFileSync(path.join(__dirname, '../db/students.json')))

    // get edit id
    const {id} = req.params;

    // find edit student data
    const edit_data = student.find(data => data.id == id );

    res.render('student/edit', {

        students : edit_data
    });


}

// update Students data //=================================//


const updateStudents =  (req, res) => {

    // student data
     const student = JSON.parse(readFileSync(path.join(__dirname, '../db/students.json')))

    // get update id
    const {id} = req.params

    student[student.findIndex(data => data.id == id)] = {
        ...student[student.findIndex(data => data.id == id)],
        name : req.body.name,
        email : req.body.email,
        cell : req.body.cell,
        location : req.body.location, 

    }

        // now  write dat to json
        writeFileSync(path.join(__dirname, '../db/students.json'), JSON.stringify(student));


    res.redirect('/student');


}



 
//  get all student //=================================//
const studentDataStore = async (req, res ) => {
    // student data
    const student = JSON.parse(readFileSync(path.join(__dirname, '../db/students.json')))

    // get all data
    const  { name, email, cell, location } = req.body

    // get last id
    let last_id = 1; 

    if (student.length > 0 ) {
        last_id =  student[student.length -1].id + 1;
    }
     


    // check file
    let student_filename = 'avatar.png';
    if (req.file) {
        student_filename = req.file.filename;
    }
   
    //creat a token 
    const token = Date.now() +'_'+ Math.floor(Math.random() * 1000000);

     // send mail 
     await verifyAccountMail( email,  'Verify Account', {
        name, email, token, cell
    });
  
    
   student.push({

        id : last_id,
        name : name,
        email : email, 
        cell : cell,
        location : location,
        photo  : student_filename,
        isVerifyed : false,
        token : token
    
    });

 
    // now  write dat to json
    writeFileSync(path.join(__dirname, '../db/students.json'), JSON.stringify(student));

    // redirect
    res.redirect('/student'); 

}
 

//delete Student//=================================//
const deleteStudent = (req, res) => {

        // student data
        const student = JSON.parse(readFileSync(path.join(__dirname, '../db/students.json')))

    const {id} = req.params;


    const newStudents = student.filter(data => data.id != id );


    
    writeFileSync(path.join(__dirname, '../db/students.json'), JSON.stringify(newStudents));

    res.redirect('/student')

     
}
  
// verify Account
const verifyAccount = ( req, res) => {

    // student data
        const student = JSON.parse(readFileSync(path.join(__dirname, '../db/students.json')))

    //token token
    const token = req.params.token
   

    student[student.findIndex(data => data.token == token)] = {
        ...student[student.findIndex(data => data.token == token)],
        isVerifyed : true,
        token : ''

    }

        // now  write dat to json
        writeFileSync(path.join(__dirname, '../db/students.json'), JSON.stringify(student));


    res.redirect('/student');

}

// exports
module.exports = {
    getAllStudent,
    creteStudent,
    getsingleStudent,
    editStudents, 
    studentDataStore,
    deleteStudent,
    updateStudents,
    getUnverifyedStudent,
    verifyAccount
  
}
 