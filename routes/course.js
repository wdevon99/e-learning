//loading express module
const express= require('express');
//initializing express Router to handdle the routes
const router= express.Router();
//loading the user scema model module
const Course= require('../models/content/course');
//to create a random id
const uuidv4 = require('uuid/v4');


//=========  ADD NEW COURSE : ROUTE  ========= 

//defining the "/course/add" route
router.post('/add',(req,res)=>{
    //creating a new course object using the defined scemea
    const newCourse=new Course({
        title : req.body.title,
        price : req.body.price,
        activities :{
            activityId : uuidv4() ,
            title : req.body.activities.title,
            steps : req.body.activities.steps
        }
    });

    //passing the newCourse object and a callback funtion to the addCourse()
    Course.addCourse(newCourse,function(err,course){
        if(err){
            //if not inserted
            res.json({state:false,message:"Add Course failed"});
        }
        if(course){
            //if inserted
            res.json({ state:true,message:"Add Course successful"});
        }
    }); 
});


//=========  GET ALL COURSES : ROUTE  ========= 

//defining the "/course/all" route
router.get('/all',(req,res)=>{
    //calling the getAllCourses() function and passing the callback funtion
    Course.getAllCourses(function(err,courses){
        if(err){
            //if not succesful
            res.json({state:false,message:"Getting all courses failed"});
        }
        if(courses){
            //if successful - sending the courses as the response
            res.json(courses);
        }
    }); 
});



//exporting the router to be able to use it in the app.js or any other file
module.exports = router;