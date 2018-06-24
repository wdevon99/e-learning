//loading express module
const express= require('express');
//initializing express Router to handdle the routes
const router= express.Router();
//to make authenticated routes
const passport=require("passport");
//importing the teacher controller
const controller = require('../controllers/teacher.controller');


/**
 * 
 * POST : /teacher/addcourse
 * 
*/
router.post('/addcourse', controller.addCourseTrigger);


/**
 * 
 * GET : /teacher/getallcourses
 * 
*/
router.get('/getallcourses', controller.getAllCoursesTrigger);


/**
 * 
 * GET : /teacher/getallgroups
 * 
*/
router.get('/getallgroups', controller.getAllGroupsTrigger);



//exporting the router to be able to use it in the app.js or any other file
module.exports = router;