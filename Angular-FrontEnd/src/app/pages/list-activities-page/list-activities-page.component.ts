import { Component, OnInit ,OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { CourseService } from '../../services/course/course.service';

@Component({
  selector: 'app-list-activities-page',
  templateUrl: './list-activities-page.component.html',
  styleUrls: ['./list-activities-page.component.css']
})
export class ListActivitiesPageComponent implements OnInit ,OnDestroy {
  //the id of the selected course will be stored for later use 
  private selectCourseId: String;
  //this stores the substription to the router param
  private routerSubscription: any;

  //this object is used to store the course JSON object retrived from the db 
  private course:any;

  constructor(private activatedRoute:ActivatedRoute ,private courseService:CourseService) { }

  ngOnInit() {
     //getting the params from the route 
     this.routerSubscription = this.activatedRoute.params.subscribe(params => {
      this.selectCourseId = params['courseId']; 
      // dispatch action to load the details
      this.courseService.getCourseById(this.selectCourseId).subscribe(res=>{
        this.course=res;
      });   
    });
  }

  /** 
   * ngOnDestroy() method is called when the component is no longer used
  */
 ngOnDestroy() {
  this.routerSubscription.unsubscribe();
}

}
