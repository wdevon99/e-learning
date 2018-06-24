import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService} from '../../../services/authentication/auth.service';

@Component({
  selector: 'app-course-tiny-preview',
  templateUrl: './course-tiny-preview.component.html',
  styleUrls: ['./course-tiny-preview.component.css'],
  inputs:[ 'course' ]
})
export class CourseTinyPreviewComponent implements OnInit {

  private course;

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

}
