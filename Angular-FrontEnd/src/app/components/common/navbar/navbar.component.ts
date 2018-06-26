import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {AuthService} from "../../../services/authentication/auth.service"
import { FlashMessagesService } from 'angular2-flash-messages'; 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //sotre a little info about th user
  private user;

  constructor(private router:Router ,private authService:AuthService,private flashMessagesService:FlashMessagesService) {}

  ngOnInit() {
    this.loadUserData();
    //subscribing to watch chages to the local storage
    this.authService.watchStorage().subscribe(res=>{
      this.loadUserData();
    });
  }

  /** 
   * loadUserData() method loads the user object
  */
  loadUserData(){
    if(this.authService.loggedIn()){
      this.user=this.authService.getCurrentUserObect();
    }
  }
  
  /** 
   * logoutUser() method logs out the current user with the help of the authService.logoutUser method 
  */
  logoutUser(){
    const isConfirmed = confirm("Are you sure you want to logout?");
    if(isConfirmed){
      this.authService.logoutUser();
      //redirecting to login page
      this.router.navigate(['/login']);
      //showing success message
      this.flashMessagesService.show( "Successfully Logged Out!", { cssClass: 'alert-success', timeout: 3000 });
      return false; 
    }
  }
}
