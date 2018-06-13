/** 
 * @summary : This file containes the Course Schema definition and the methods related the the Course Schema
 * 
 * @method addCourse() 
 * @method getAllCourses() 
 * 
*/

//to use mongo db
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//defining the 'course' schema
const courseSchema= new Schema({
    title : {type:String ,required :true},
    price : {type:Number ,required :true},
    activities : {
        activityId : {type:String ,required :true},
        title : {type:String},
        //array of objects which contain the content of each step 
        steps : [{ 
            texts : [String] , 
            imageUrls : [String],
            videoUrls : [String]
        }]
    }
});

//exporting the schema model to be able to use it in other files
const Course = module.exports= mongoose.model("Course" , courseSchema);

//addCourse() method will add a new course to the database
module.exports.addCourse = ( newCourse , callback ) => {
    //save course to database
    newCourse.save(callback);
}

//getAllCourses() method will return all the courses in the database
module.exports.getAllCourses =  (callback) => {
    //getting all the courses in the database
    Course.find({}, function(err, courses) {
        //creating a array will all the courses from the database
        let coursesArray = [];
        courses.forEach(function(course) {
            coursesArray.push(course);
        });
        callback(null,coursesArray);
    });
}