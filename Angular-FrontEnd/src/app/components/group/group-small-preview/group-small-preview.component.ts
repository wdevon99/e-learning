import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/authentication/auth.service';

@Component({
  selector: 'app-group-small-preview',
  templateUrl: './group-small-preview.component.html',
  styleUrls: ['./group-small-preview.component.css'],
  inputs : ['group']
})
export class GroupSmallPreviewComponent implements OnInit {

  constructor( private authService :AuthService) { }

  ngOnInit() {
  }

}
