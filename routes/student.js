//loading express module
const express= require('express');
//initializing express Router to handdle the routes
const router= express.Router();
//loading the user scema model module
const Student= require('../models/users/student');
//need when logging in a user
const jwt = require('jsonwebtoken')
//to use config data
const config=require("../config/database");
//to make authenticated routes
const passport=require("passport");


//=========  STUDENT REGISTER ROUTE  ========= 
//defining the "/student/register" route
router.post('/register',(req,res)=>{
    //creating a new Student object using the defined scemea
    const newStudent=new Student({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password,
        courses:[],
        groups:[]
    });

    //passing the newUser object and a callback funtion to the registerStudent() method to add the student to the Database
    Student.registerStudent(newStudent,function(err,user){
        if(err){
            //if not inserted
            res.json({state:false,message:"Student registration failed"});
        }
        if(user){
            //if inserted
            res.json({ state:true,message:"Student registration successful"});
        }
    }); 
});


//=========  LOGIN ROUTE  =========

//defining the "/student/login" route
router.post('/login',(req,res)=>{
    //getting the student's username and password from the student
    const email= req.body.email;
    const password= req.body.password;

    //passing the email and a callback fuction to the findByEmail() function
    Student.findByEmail(email,function (err,student){
        if(err) throw err;
        if(!student){
            res.send({state:false,message:"No matching email found"});
            return false;
        }else{
           //check if passwords are matching
           Student.passwordCheck(password,student.password, function (err,match){
               if(err) throw err; 
               //checking if match is a success
                if(match){
                   //creating a JSON web toke (JWT)
                   const token = jwt.sign(student.toJSON(), config.secret , {expiresIn:86400} );
                   res.json({
                       state:true,
                       message:"Login Successful",
                       token:"JWT "+token,
                       student:{
                           "_id":student._id,
                           "firstName" : student.firstName,
                           "lastName" : student.lastName
                       }
                   });
               }
               //checking if match is fail
               if(!match){
                   res.send({state:false,message:"Inncorrect Password , Try Again!"});
               }
           });
        }
    });
});


//=========  STUDENT PROFILE ROUTE  =========

//this route can be access by a autenticated student :  "/student/profile" route
router.get('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.json({
            student :req.user
        });
    }
);




//exporting the router to be able to use it in the app.js or any other file
module.exports = router;