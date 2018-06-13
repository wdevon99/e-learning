/** 
 * @summary : This file containes the Student Schema definition and the methods related the the Student Schema
 * 
 * @method registerStudent() 
 * @method findByEmail() 
 * @method passwordCheck()
 * @method findeUserById()
 * 
*/


//to use mongo db
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//use to hash the passwords
var bcrypt = require('bcryptjs');

//defining the 'student' schema
const studentSchema= new Schema({
    firstName : {type:String ,required :true},
    lastName : {type:String ,required :true},
    email : {type:String ,required :true , unique :true},
    password : {type:String ,required :true},
    courses : [{
        //referece id's to 
        courseId : {type:String},
        //array of completed activity id's 
        completedActivities : {type:Array} 
    }],
    //array of group id's
    groups : {type:Array} //[Schema.Types.ObjectId]
});

//exporting the schema model to be able to use it in other files
const Student= module.exports=mongoose.model("Student" , studentSchema);


// ====== ====== ====== ====== METHODS ====== ====== ====== ======


//registerStudent() method will incrypt the password and save the student to the database
module.exports.registerStudent = ( newStudent , callback ) => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newStudent.password, salt, function(err, hash) {
            //updating the student password to the hash value
            newStudent.password=hash;
            //checking for error
            if(err) throw err;
            //save STUDENTto database
            newStudent.save(callback);
        });
    }); 
}

//findByEmail() will execute a query to find if a match email is in the database
module.exports.findByEmail = (email,callback)=> {
    //this query is to check if the current email matches any one of the emails in the db
    const query={email:email};
    //executing the query and also passing in the callback
    Student.findOne(query,callback);    
}

//passwordCheck() method will check if the password provided by the student matches the hashed password in the database
module.exports.passwordCheck = (plainPassword,hashPassword,callback) => {
    bcrypt.compare(plainPassword,hashPassword,function(err,res){
        if(err) throw err;
        //passing the result (TRUE ot FALSE) to the callback function
        callback(null,res)    
    })
}

//findeUserById() method will get student with a id
module.exports.findeUserById = ( id, callback) => {
    const query={_id:id};
    //executing the query with the Ids  and also passing in the callback
    Student.findOne(query,callback); 
}