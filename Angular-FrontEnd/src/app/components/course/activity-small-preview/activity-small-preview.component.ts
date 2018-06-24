import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-activity-small-preview',
  templateUrl: './activity-small-preview.component.html',
  styleUrls: ['./activity-small-preview.component.css'],
  inputs:['activity','courseId']
})
export class ActivitySmallPreviewComponent implements OnInit {

  //store the activity object passed down from the parent
  private activity;

  //store the id of the course
  private courseId;

  //to store if the activity is : locked , unlocked or completed
  private activityCompleteState:String='unlocked';

  constructor() { }

  ngOnInit() {
  }

}
