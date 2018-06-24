import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { GroupService} from "../../../services/group/group.service";
import { TeacherService } from "../../../services/teacher/teacher.service";
import { AuthService } from "../../../services/authentication/auth.service"


@Component({
  selector: 'app-group-course-list',
  templateUrl: './group-course-list.component.html',
  styleUrls: ['./group-course-list.component.css'],
  inputs:['group']
})
export class GroupCourseListComponent implements OnInit {
   //store the group which is comming from the parent component
   private group;
   //stores the array of courses in the group
   private groupCourses;
   //store all the purchased courses of the teacher
   private teachersCourses;
   //this holds the value of the course select
   private courseSelectValue;

  constructor(private groupService:GroupService ,private teacherService:TeacherService , private authService:AuthService) { }

  //this is the method that is called when add couse button is pressed
  onSubmitAddCourse(){
    this.groupService.addCourseToGroup( this.courseSelectValue , this.group._id ).subscribe(res=>{
      if(res){
        this.loadGroupCoursesList();
      }  
    });

  }

  ngOnInit() {
    this.loadGroupCoursesList();
    this.loadTeachersCoursesList();
  }

  //this method poplulates the groupCourses array from data from the db
  loadGroupCoursesList(){
    //getting the group courses
    this.groupService.getAllCourses(this.group._id).subscribe(res=>{
      this.groupCourses=res.courses;
    });
  }

  //this method poplulates the teacher courses array from data from the db
  loadTeachersCoursesList(){
    //getting the teachers all courses
    this.teacherService.getAllCourses(this.authService.getCurrentUserId()).subscribe(res=>{
      this.teachersCourses=res.courses;
    });
  }



}
