import { Injectable } from '@angular/core';
import { Http ,Headers } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class TeacherService {

  constructor(private http:Http) { }


  /**
   * addCourse() will add a specific course id to a specific teacher
   */
  addCourse(courseId , teacherId ){

    let postUrl:string = "http://localhost:3000/teacher/addcourse";
    const requestBody={
      "courseId":courseId,
      "teacherId":teacherId
    }
    const headers= new Headers();
    headers.append('content-Type' ,'application/json');

    //this will return the response of the post request in json format
    return this.http.post(postUrl, requestBody , { headers : headers})
    .map(res=>res.json());;

  }

  /**
   * getAllCourses() will get all the courses of the specific teacher
   */
  getAllCourses(teacherId){
    let getUrl:string = "http://localhost:3000/teacher/getallcourses";
    const headers= new Headers();
    headers.append('content-Type' ,'application/json');
    //appendin the teacher id param to the get Url
    getUrl+="/?teacherId="+teacherId;
    //this will return the response of the get request in json format
    return this.http.get(getUrl, { headers : headers})
    .map(res=>res.json());;
  }




}
