/** 
 * @summary : This file containes the Teacher Schema definition and the methods related the the Teacher Schema
 * 
 * @method registerTeacher() 
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

//defining the 'teacher' schema
const teacherSchema= new Schema({
    firstName : {type:String ,required :true},
    lastName : {type:String ,required :true},
    email : {type:String ,required :true},
    password : {type:String ,required :true},
    //array of course id's
    courses :  {type:Array} ,
    //array of group id's
    groups : {type:Array} 
});

//exporting the schema model to be able to use it in other files
const Teacher= module.exports=mongoose.model("Teacher" , teacherSchema);


// ====== ====== ====== ====== METHODS ====== ====== ====== ======

//registerTeacher() method will incrypt the password and save the teacher to the database
module.exports.registerTeacher = ( newTeacher , callback )=> {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newTeacher.password, salt, function(err, hash) {
            //updating the teacher password to the hash value
            newTeacher.password=hash;
            //checking for error
            if(err) throw err;
            //save to database
            newTeacher.save(callback);
        });
    }); 
}


//findByEmail() will execute a query to find if a match email is in the database
module.exports.findByEmail = (email,callback) => {
    //this query is to check if the current email matches any one of the emails in the db
    const query={email:email};
    //executing the query and also passing in the callback
    Teacher.findOne(query,callback);    
}

//passwordCheck() method will check if the password provided by the student matches the hashed password in the database
module.exports.passwordCheck = (plainPassword,hashPassword,callback) => {
    bcrypt.compare(plainPassword,hashPassword,function(err,res){
        if(err) throw err;
        //passing the result (TRUE ot FALSE) to the callback function
        callback(null,res)    
    })
}

//findeUserById() 
module.exports.findeUserById = ( idQuery, callback) => {
    //executing the query with the Ids  and also passing in the callback
    Teacher.findOne(idQuery,callback); 
}

