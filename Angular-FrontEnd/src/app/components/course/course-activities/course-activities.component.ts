import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-activities',
  templateUrl: './course-activities.component.html',
  styleUrls: ['./course-activities.component.css'],
  inputs:['course']
})
export class CourseActivitiesComponent implements OnInit {

  //to store the coure passed in from the parent object
  private course;

  constructor() {
      
  }

  ngOnInit() {
   
  }

}
