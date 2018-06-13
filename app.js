//loading express module
const express= require('express');
//initializing express
const app= express();

// ===================== TO AVOID CORS ERROR ====================================
const cors=require('cors');
app.use(cors());

// ========================= USER AUTHENTICATION ================================

const User= require("./models/user");
const Student = require("./models/users/student");
const Teacher = require("./models/users/teacher");

const passport=require('passport');
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport,User);
//require("./config/passport")(passport,Student);
// require("./config/passport")(passport,Teacher);

// ========================= BODY PARSER ==================================
//loading the body parser module
const bodyparser= require('body-parser');
//making the request body in the JSON format
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

// ========================= MONGO DB ==================================

const databaseConnection = require("./database/db.common");
//checking if connection is successful
(databaseConnection)?console.log("Db Connection Successful!"):console.log("Db Connection Failed!");

// ========================= PATH ==================================

//loading files system module
const path= require('path');
//defining the path to the static html files
app.use(express.static(path.join(__dirname,"public")));

// ======================= ROUTE HANDLING ===========================
//setting the user routes
const userRoute=  require('./routes/users');
app.use('/user',userRoute);

//setting the student routes
const studentRoute =  require('./routes/student');
app.use('/student', studentRoute);

//setting the teacher routes
const teacherRoute =  require('./routes/teacher');
app.use('/teacher', teacherRoute);

//setting the course routes
const courseRoute =  require('./routes/course');
app.use('/course', courseRoute);

//setting the group routes
const groupRoute =  require('./routes/group');
app.use('/group', groupRoute);


//defining a route for TESTING
app.get('/',(req,res)=>{
    res.send("NOTE : This will be replaced by the static html in the public folder");
});

// =========================== PORT ===============================

//defining the PORT and making the server listen to that port
const PORT= process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("Listening to port " + PORT);
    
});

