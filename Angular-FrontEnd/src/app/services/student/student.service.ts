import { Injectable } from '@angular/core';
import { Http ,Headers } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class StudentService {

  constructor(private http:Http) { }


  /** 
   * getAllCourses() will get all the courses of the specific student
   */
  getAllCourses(studentId){
    let getUrl:string = "http://localhost:3000/student/getallcourses";
    const headers= new Headers();
    headers.append('content-Type' ,'application/json');
    //appendin the student Id param to the get Url
    getUrl+="/?studentId="+studentId;
    //this will return the response of the get request in json format
    return this.http.get(getUrl, { headers : headers})
    .map(res=>res.json());;
  }




}
