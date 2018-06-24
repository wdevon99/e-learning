//imports to communicate with mongo db
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const Person=require('./person.model');
const Course=require('./course.model');
const Student=require('./student.model');

//defining the 'group' schema
const groupSchema= new Schema({
    groupName : {type:String ,required :true},
    courses : [ { type: Schema.Types.ObjectId , ref : 'Course'} ] ,  //array of course object id's
    students :[ { type: Schema.Types.ObjectId , ref : 'Student'} ]   // array of student object id's
});

//exporting the schema model to be able to use it in other files
const Group = module.exports= mongoose.model("Group" , groupSchema);


// ====== ====== ====== ====== METHODS ====== ====== ====== ======

//createGroup() method will create a new group 
module.exports.createGroup = ( newGroup , callback ) => {
    //save group to database
    newGroup.save(callback);

}

//getGroupById() method get group with a specific group id
module.exports.getGroupById =(groupId , callback ) => {
    const query={_id:groupId};
    //executing the query with the Ids  and also passing in the callback
    Group.findOne(query,callback); 
}

//addStudent method will add a specific student to a specific group
module.exports.addStudent = ( studentId , groupId , callback ) =>{
    //converting string student id to an objectId
    const studentObjectId = new ObjectId(studentId);
    Group.findByIdAndUpdate(groupId, { "$push": { "students": studentObjectId } },(err, group )=>{
        if(err){
            throw err;
        }
        if(group){
            //this method will automatically asign all the courses in the group to the newly added student
            Student.assignCoursesInGroupToStudent(studentId,groupId);
            //converting string group id to an objectId
            const groupObjectId = new ObjectId(groupId);
            Student.findByIdAndUpdate( studentId ,{ "$push": { "groups": groupObjectId }} , callback);
        }     
    });
}

//getStudents() method will get all the students in a specific group
module.exports.getAllStudents=(groupId , callback)=>{
     //getting the Group object
     Group.getGroupById(groupId , (err , group )=>{
        if (err) {
            throw err;
        }
        if(group){
            //getting the array of student ids from the group schema object
            const studentIdArray = group.students ; 
            //query to select all objects with the ids
            const query = { "_id": { "$in": studentIdArray }};
            Student.find(query , callback );
        }
    });


}

//addCourse method will add a course to the group
module.exports.addCourse = (courseId , groupId , callback) =>{
    //converting string course id to an objectId
    var courseObjectId = new ObjectId(courseId);
    Group.findByIdAndUpdate(groupId,
        { "$push": { "courses": courseObjectId } },
        callback
    );   
}



//getStudents() method will get all the students in a specific group
module.exports.getAllCourses=(groupId , callback)=>{
    //getting the Group object
    Group.getGroupById(groupId , (err , group )=>{
       if (err) {
           throw err;
       }
       if(group){
           //getting the array of student ids from the group schema object
           const courseIdArray = group.courses ; 
           console.log(courseIdArray);
           //query to select all objects with the ids
           const query = { "_id": { "$in": courseIdArray }};
           Course.find(query , callback );
       }
   });
}