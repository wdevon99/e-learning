import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-goals',
  templateUrl: './activity-goals.component.html',
  styleUrls: ['./activity-goals.component.scss'],
  inputs:['activity']
})
export class ActivityGoalsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
