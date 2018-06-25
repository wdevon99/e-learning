import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/authentication/auth.service"

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authService.getUserProfile().subscribe(res=>{
      this.user=res.person;
    });
  }
  

}
