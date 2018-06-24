const Student ={
    studentId : "studentId",
    firstName : "firstName",
    lastName : "lastName",
    email : "email",
    password : "password",
    courses : [{
        courseId : "courseId",
        completedActivities : [] // array of completed activity id's 
    }],
    groups : [] // array of group id's
}

const Teacher = {
    id : "id",
    firstName : "firstName",
    lastName : "lastName",
    email : "email",
    password : "password",
    courses : [], //array of course id's
    groups : [] //array of group id's
}


const Course = {
    courseId : "courseId",
    title : "title",
    price : 0.00 ,
    activities : [ {} ]  //array of Activity objects
}

const Activity = {
    activityId : "activityId",
    title : "title", 
    steps : [{ //array of objects which contain the content of each step 
        texts : [], 
        imageUrls : [],
        videoUrls : []
    }]
}

const Group ={
    groupId : "groupId" ,
    groupName : "groupName" ,
    courses : [] , //array of course id's
    students : [] , // array of student id's
}


//  =========== Template to add a new course ===========

const NewCourse = {
    courseId : "1",
    title : "Robotics Basics",
    price : 4.50 ,
    activities : [ {
        activityId : "1",
        title : "Building a plastic robot", 
        steps : [
        { //step 1 content 
            texts : [ "SentenceOne" , "SentenceTwo" ,"SentenceThree" ], 
            imageUrls : [ "urlOne" , "urlTwo" , "urlThree" ],
            videoUrls : [ "urlOne" , "urlTwo"  ]
        },
        { //step 2 content 
            texts : [ "SentenceOne" , "SentenceTwo" ,"SentenceThree" ], 
            imageUrls : [ "urlOne" , "urlTwo" , "urlThree" ],
            videoUrls : [ "urlOne" , "urlTwo"  ]
        },
        { //step 3 content 
            texts : [ "SentenceOne" , "SentenceTwo" ,"SentenceThree" ], 
            imageUrls : [ "urlOne" , "urlTwo" , "urlThree" ],
            videoUrls : [ "urlOne" , "urlTwo"  ]
        }]
    } ,
    {
        activityId : "2",
        title : "Building a flying robot", 
        steps : [
        { //step 1 content 
            texts : [ "SentenceOne" , "SentenceTwo" ,"SentenceThree" ], 
            imageUrls : [ "urlOne" , "urlTwo" , "urlThree" ],
            videoUrls : [ "urlOne" , "urlTwo"  ]
        },
        { //step 2 content 
            texts : [ "SentenceOne" , "SentenceTwo" ,"SentenceThree" ], 
            imageUrls : [ "urlOne" , "urlTwo" , "urlThree" ],
            videoUrls : [ "urlOne" , "urlTwo"  ]
        },
        { //step 3 content 
            texts : [ "SentenceOne" , "SentenceTwo" ,"SentenceThree" ], 
            imageUrls : [ "urlOne" , "urlTwo" , "urlThree" ],
            videoUrls : [ "urlOne" , "urlTwo"  ]
        }]
    } ]
}