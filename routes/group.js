//loading express module
const express= require('express');
//initializing express Router to handdle the routes
const router= express.Router();
//loading the user scema model module
const Group= require('../models/groups/group');
//need when logging in a user
const jwt = require('jsonwebtoken')
//to use config data
const config=require("../config/database");

//=========  CREATE GROUP : ROUTE  ========= 

//defining the "/group/create" route
router.post('/create',(req,res)=>{
    //creating a new Group object using the defined scemea
    const newGroup=new Group({
        groupName : req.body.groupName ,
        courses : [] , 
        students : []
    });
    //passing the newGroup object and a callback funtion to the createGroup() method to add the group to the Database
    Group.createGroup(newGroup,(err,group) =>{
        if(err){
            //if not inserted
            res.json({state:false,message:"Create group failed"});
        }
        if(group){
            //if inserted
            res.json({ state:true,message:"Create group successful"});
        }
    }); 
});

//=========  ADD STUDENT TO GROUP : ROUTE  ========= 

//defining the "/group/addstudent" route
router.post('/addstudent',(req,res)=>{
   const studentId = req.body.studentId;
   const groupId = req.body.groupId;

   Group.addStudent(studentId,groupId,(err,group)=>{
        if(err){
            console.log(err);
            //if not inserted
            res.json({state:false,message:"Adding student to the group failed"});
        }
        if(group){
            //if inserted
           res.json({ state:true,message:"Adding student to the group successful"});
        }
   });
});


//=========  ADD COURSE TO GROUP : ROUTE  ========= 

//defining the "/group/addcourse" route
router.post('/addcourse',(req,res)=>{
    const courseId = req.body.courseId;
    const groupId = req.body.groupId;
 
    Group.addCourse(courseId,groupId,(err,group)=>{
         if(err){
            console.log(err);
            //if not inserted
            res.json({state:false,message:"Adding course to the group failed"});
         }
         if(group){
            //if inserted
            res.json({ state:true,message:"Adding course to the group successful"});
         }
    });
 });

//exporting the router to be able to use it in the app.js or any other file
module.exports = router;