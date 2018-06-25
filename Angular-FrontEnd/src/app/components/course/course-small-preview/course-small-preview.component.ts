import { Component, OnInit ,Input , OnDestroy }  from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-course-small-preview',
  templateUrl: './course-small-preview.component.html',
  styleUrls: ['./course-small-preview.component.scss'],
  inputs:['course']
})
export class CourseSmallPreviewComponent implements OnInit , OnDestroy{
  constructor(private router:Router) { 

  }

  ngOnInit() {
  }

  ngOnDestroy(){

  }

}
