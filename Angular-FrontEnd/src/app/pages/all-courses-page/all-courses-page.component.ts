import { Component, OnInit } from '@angular/core';
import { CourseService } from "../../services/course/course.service";

@Component({
  selector: 'app-all-courses-page',
  templateUrl: './all-courses-page.component.html',
  styleUrls: ['./all-courses-page.component.css']
})
export class AllCoursesPageComponent implements OnInit {

  private courses:any;

  constructor(private courseService:CourseService) { }

  ngOnInit() {
   this.loadAllCourses();
  }

  loadAllCourses(){
    this.courseService.getAllCourses().subscribe((res)=>{
      this.courses=res;
   });
  }

}
