import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { GroupService} from "../../services/group/group.service";

@Component({
  selector: 'app-teacher-edit-group-page',
  templateUrl: './teacher-edit-group-page.component.html',
  styleUrls: ['./teacher-edit-group-page.component.css']
})
export class TeacherEditGroupPageComponent implements OnInit {
  //the id of the selected group will be stored for later use 
  private selectedGroupId: String;
  //this stores the substription to the router param
  private routerSubscription: any;
  //to store the current group object
  private group :any;


  constructor(private activatedRoute:ActivatedRoute ,private groupService:GroupService) { }

  ngOnInit() {
     //getting the params from the route 
     this.routerSubscription = this.activatedRoute.params.subscribe(params => {
      this.selectedGroupId = params['groupId']; 

      // dispatch action to load the details
      this.groupService.getGroupById(this.selectedGroupId).subscribe(res=>{
        this.group=res.group;
      });   
    });
  }

}
