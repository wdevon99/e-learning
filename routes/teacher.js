//loading express module
const express= require('express');
//initializing express Router to handdle the routes
const router= express.Router();
//loading the user scema model module
const Teacher= require('../models/users/teacher');
//need when logging in a user
const jwt = require('jsonwebtoken')
//to use config data
const config=require("../config/database");
//to make authenticated routes
const passport=require("passport");



//=========  TEACHER REGISTER ROUTE  ========= 

//defining the "/teacher/register" route
router.post('/register',(req,res)=>{
    //creating a new Teacher object using the defined scemea
    const newTeacher = new Teacher({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password,
        courses:[],
        groups:[]
    });

    //passing the newTeacher object and a callback funtion to the registerTeacher() method to add the Teacher to the Database
    Teacher.registerTeacher(newTeacher,function(err,teacher){
        if(err){
            //if not inserted
            res.json({state:false,message:"Teacher registration failed"});
        }
        if(teacher){
            //if inserted
            res.json({ state:true,message:"Teacher registration successful"});
        }
    }); 
});


//=========  TEACHER LOGIN ROUTE  =========

//defining the "/teacher/login" route
router.post('/login',(req,res)=>{
    //getting the teacher's username and password from the teacher
    const email= req.body.email;
    const password= req.body.password;

    //passing the email and a callback fuction to the findByEmail() function
    Teacher.findByEmail(email,function (err,teacher){
        if(err) throw err;
        if(!teacher){
            res.send({state:false,message:"No matching email found"});
            return false;
        }else{
           //check if passwords are matching
           Teacher.passwordCheck(password,teacher.password, function (err,match){
               if(err) throw err; 
               //checking if match is a success
                if(match){
                   //creating a JSON web toke (JWT)
                   const token = jwt.sign(teacher.toJSON(), config.secret , {expiresIn:86400} );
                   res.json({
                       state:true,
                       message:"Login Successful",
                       token:"JWT "+token,
                       teacher:{
                           "_id" : teacher._id,
                           "firstName" : teacher.firstName,
                           "lastName" : teacher.lastName
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


//exporting the router to be able to use it in the app.js or any other file
module.exports = router;