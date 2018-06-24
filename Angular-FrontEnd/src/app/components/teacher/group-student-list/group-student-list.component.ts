import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { GroupService} from "../../../services/group/group.service";

@Component({
  selector: 'app-group-student-list',
  templateUrl: './group-student-list.component.html',
  styleUrls: ['./group-student-list.component.css'],
  inputs:['group']
})
export class GroupStudentListComponent implements OnInit {

  //store the group which is comming from the parent component
  private group;
  //stores the students array
  private students;

  //store the email of the student to add
  private studentEmail;

  constructor(private groupService: GroupService) { }

  //this is the method that is called when add student button is pressed
  onSubmitAddStudent(){
    this.groupService.addStudentToGroup( this.studentEmail , this.group._id ).subscribe(res=>{
      if(res.state){
        this.loadStudentsList();
        this.studentEmail="";
      }
      if(!res.state){
        alert(res.message);
      }
    });
  }

  ngOnInit() {
    this.loadStudentsList();
  }

  //this method poplulates the students array from data from the db
  loadStudentsList(){
    //getting the students
    this.groupService.getAllStudents(this.group._id).subscribe(res=>{
      this.students=res.students;
    });
  }
  
}
