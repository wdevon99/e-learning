//loading express module
const express= require('express');
//initializing express Router to handdle the routes
const router= express.Router();
//to make authenticated routes
const passport=require("passport");
//importing the person controller
const controller = require('../controllers/person.controller');


/**
 * 
 * POST : /person/registerstudent
 * 
*/
router.post('/registerstudent', controller.registerNewStudentTrigger);


/**
 * 
 * POST : /person/registerteacher
 * 
*/
router.post('/registerteacher', controller.registerNewTeacherTrigger);


/**
 * 
 * POST : /person/login
 * 
*/
router.post('/login', controller.loginPersonTrigger);


/**
 * 
 * GET : /person/profile
 * 
*/
router.get('/profile', passport.authenticate('jwt', { session: false }), controller.getPersonProfileTrigger );





//exporting the router to be able to use it in the app.js or any other file
module.exports = router;