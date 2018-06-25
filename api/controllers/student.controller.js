const Student= require('../models/student.model');


module.exports.getAllCoursesTrigger = (req ,res )=>{
    //getting the id of the teacher from the GET Params
    const studentId=req.query.studentId;

    Student.getAllCourses(studentId ,(err , courses)=>{
        if(err){
            res.json( { state:false,message:"getting teachers courses failed" } );
        }
        if(courses){
            res.json( { courses } );
        }
       
    });

}

module.exports.getAllGroupsTrigger = (req ,res )=>{
    //getting the id of the teacher from the GET Params
    const studentId=req.query.studentId;

    Student.getAllGroups(studentId ,(err , groups)=>{
        if(err){
            res.json( { state:false,message:"getting student groups failed" } );
        }
        if(groups){
            res.json( { groups } );
        }
       
    });

}