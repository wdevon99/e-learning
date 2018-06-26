import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-introduction',
  templateUrl: './activity-introduction.component.html',
  styleUrls: ['./activity-introduction.component.scss'],
  inputs : ['activity']
})
export class ActivityIntroductionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
