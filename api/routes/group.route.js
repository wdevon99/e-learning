//loading express module
const express= require('express');

//initializing express Router to handdle the routes
const router= express.Router();

//importing the course controller - for group
const controller = require('../controllers/group.controller');


/**
 * 
 * POST : /group/create
 * 
*/
router.post('/create', controller.createGroupTrigger);


/**
 * 
 * POST : /group/addstudent
 * 
*/
router.post('/addstudent', controller.addStudentToGroupTrigger);


/**
 * 
 * POST : /group/addcourse
 * 
*/
router.post('/addcourse', controller.addCourseToGroupTrigger);

/**
 * 
 * GET : /group/one
 * 
*/
router.get('/one', controller.getGroupByIdTrigger);


/**
 * 
 * GET : /group/getallstudents
 * 
*/
router.get('/getallstudents', controller.getAllStudentsTrigger);

/**
 * 
 * GET : /group/getallcourses
 * 
*/
router.get('/getallcourses', controller.getAllCoursesTrigger);



//exporting the router to be able to use it in the app.js or any other file
module.exports = router;
