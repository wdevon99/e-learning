import { Injectable } from '@angular/core';
import { Http ,Headers } from '@angular/http';
import { AuthService } from '../../services/authentication/auth.service';
import 'rxjs/add/operator/map'

@Injectable()
export class GroupService {

  constructor(private http:Http ,private authService :AuthService) { }

   /**
   * createGroup() will create a group and assign it to a specific teacher
   */
  createGroup(teacherId , groupName){
    let postUrl:string = "http://localhost:3000/group/create";

    const requestBody={
      "groupName":groupName,
      "teacherId":teacherId
    }
    const headers= new Headers();
    headers.append('content-Type' ,'application/json');

    //this will return the response of the post request in json format
    return this.http.post(postUrl, requestBody , { headers : headers})
    .map(res=>res.json());;

  }

  /**
   * getAllGroups() will get all the groups of the specific teacher
   */
  getAllGroups(personId){
    let getUrl:string 
    if(this.authService.getUserType() === 'Student'){
      getUrl = "http://localhost:3000/student/getallgroups/?studentId="+personId;
    }
    if(this.authService.getUserType() === 'Teacher'){
      getUrl = "http://localhost:3000/teacher/getallgroups/?teacherId="+personId;
    }

    const headers= new Headers();
    headers.append('content-Type' ,'application/json');
    //appending the teacher id param to the get Url
  
    //this will return the response of the get request in json format
    return this.http.get(getUrl, { headers : headers})
    .map(res=>res.json());;
  }

  /**
   * getGroupById() will get the group with a specific id
   */
  getGroupById(groupId){
    let getUrl:string = "http://localhost:3000/group/one";
    const headers= new Headers();
    headers.append('content-Type' ,'application/json');
    //appending the group id param to the get Url
    getUrl+="/?groupId="+groupId;
    //this will return the response of the get request in json format
    return this.http.get(getUrl, { headers : headers})
    .map(res=>res.json());;
  }

   /**
   * getAllStudents() will get the all the students in a group
   */
  getAllStudents(groupId){
    let getUrl:string = "http://localhost:3000/group/getallstudents";
    const headers= new Headers();
    headers.append('content-Type' ,'application/json');
    //appending the group id param to the get Url
    getUrl+="/?groupId="+groupId;
    //this will return the response of the get request in json format
    return this.http.get(getUrl, { headers : headers})
    .map(res=>res.json());;
  }
  
  /**
   * getAllCourses() will get the all the courses in a group
   */
  getAllCourses(groupId){
      let getUrl:string = "http://localhost:3000/group/getallcourses";
      const headers= new Headers();
      headers.append('content-Type' ,'application/json');
      //appending the group id param to the get Url
      getUrl+="/?groupId="+groupId;
      //this will return the response of the get request in json format
      return this.http.get(getUrl, { headers : headers})
      .map(res=>res.json());;
  }


  /**
   * addCourseToGroup() will add a specific course to a specific group
   */
  addCourseToGroup( courseId , groupId ){
  
    let postUrl:string = "http://localhost:3000/group/addCourse";
  
    const requestBody={
      "courseId":courseId,
      "groupId":groupId
    }
  
    const headers= new Headers();
    headers.append('content-Type' ,'application/json');
  
    //this will return the response of the post request in json format
    return this.http.post(postUrl, requestBody , { headers : headers})
    .map(res=>res.json());
  }

  /**
   * addStudentToGroup() will add a specific student to a specific group
   */
  addStudentToGroup( studentEmail , groupId ){
    let postUrl:string = "http://localhost:3000/group/addStudent";
    const requestBody={
      "studentEmail":studentEmail,
      "groupId":groupId
    }
    const headers= new Headers();
    headers.append('content-Type' ,'application/json');
  
    //this will return the response of the post request in json format
    return this.http.post(postUrl, requestBody , { headers : headers})
    .map(res=>res.json());
  }

}

