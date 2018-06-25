//to use mongo db
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//these imports should be ABOVE the module export or wont work
//the abstract parent
const Person = require("./person.model");

//defining the 'student' schema
const studentSchema= new Schema({
    courses : [{
        //referece id's to 
        courseId : { type: Schema.Types.ObjectId , ref : 'Course'} ,
        //array of completed activity id's 
        completedActivities : [{ type:String }]
    }],
    //array of group id's
    groups : [{ type: Schema.Types.ObjectId , ref : 'Group'} ]
});

//Inheriting attributes from the Person Scema using discriminator
const Student = Person.discriminator('Student', studentSchema);

module.exports = mongoose.model('Student');

//these imports should be BELOW the module export or wont work
const Course = require("./course.model");
const Group = require("./group.model");


// ====== ====== ====== ====== METHODS ====== ====== ====== ======

//getAllCourses method will get all the courses of a specific student
module.exports.getAllCourses = (studentId , callback )=>{
    //getting the student object
    Student.findById(studentId , (err , student )=>{
        if (err) {
            throw err;
        }
        if(student){
            //getting the array of course ids from the teacher schema object
            const courseIdArray = student.courses.map((course)=>{
                return course.courseId;
            }); 
            //query to select all objects with the ids
            const query = { "_id": { "$in": courseIdArray }};
            Course.find( query , callback );
        }
    });
}


//assignCoursesInGroupToStudent() will get the course ids of the group and add it to thestudents courses array
module.exports.assignCoursesInGroupToStudent = ( studentId , groupId )=>{
    Group.getGroupById(groupId , (err , group)=>{
        if(err){
            throw err;
        }
        if(group){
            //getting the array of course ids from the group schema object
            const courseIdArray = group.courses.map((course=>{
                return {
                    courseId : course._id,
                    completedActivities : []
                }
            }));;

            //query
            const query = { "_id": studentId };
            Student.findOneAndUpdate(query ,{ "$push": { "courses": courseIdArray }} , (err, student)=>{
                if (err) console.log(err);
                if (student) console.log("Student Update Successful");
            } );
        }
    });

}

//getAllGroups method will get all the groups of a specific student
module.exports.getAllGroups = (studentId , callback )=>{
    //getting the student object
    Student.findById(studentId , (err , student )=>{
        if (err) {
            throw err;
        }
        if(student){
            //getting the array of course ids from the student schema object
            const groupsIdArray = student.groups ; 
            //query to select all objects with the ids
            const query = { "_id": { "$in": groupsIdArray }};
            Group.find(query , callback );
        }
    });
}



//addCompletedActivityId()
// module.exports.addCompletedActivityId() = ( activityId , studentId)=>{
//       //query
//       const query = { "_id": studentId };
//       Student.findOneAndUpdate(query ,{ "$push": { "courses": courseIdArray }} , (err, student)=>{
//           if (err) console.log(err);
//           if (student) console.log("Student Update Successful");
//       } );

// }
