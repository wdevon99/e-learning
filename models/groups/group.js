/** 
 * @summary : This file containes the Group Schema definition and the methods related the the Group Schema
 * 
 * @method createGroup() 
 * @method getGroupById() 
 * @method addStudent()
 * @method addCourse()
 * 
*/

//imports to communicate with mongo db
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//defining the 'group' schema
const groupSchema= new Schema({
    groupName : {type:String ,required :true},
    courses : [String] , //array of course id's
    students : [String] , // array of student id's
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
    Group.getGroupById(groupId , (err,group)=>{
        if(group){
            Group.findByIdAndUpdate(group._id,
                { "$push": { "students": studentId } },
                callback
            ); 
        }
    });
}

//addCourse method will add a course to the group
module.exports.addCourse = (courseId , groupId , callback) =>{
    Group.getGroupById(groupId , (err,group)=>{
        if(group){
            Group.findByIdAndUpdate(group._id,
                { "$push": { "courses": courseId } },
                callback
            ); 
        }
    });  
}
