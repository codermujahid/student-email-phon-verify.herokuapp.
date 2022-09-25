const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const path = require('path');  
const expressLayouts = require('express-ejs-layouts'); 
const studentroute  = require('./routes/student'); 


// environment variable
dotenv.config();
const PORT = process.env.port || 4000 ;



// express init
const app = express();


// data manege
app.use(express.json());
app.use(express.urlencoded( { extended : false}));

 



// EJS init
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set('layout', 'layouts/app')

 
//static folder 
app.use(express.static('public'));

 

//routs
app.use('/student', studentroute  );



// server listen
app.listen(PORT, () => {
    console.log(`server is runing on port ${PORT} `.bgWhite.black);
});
 
 
