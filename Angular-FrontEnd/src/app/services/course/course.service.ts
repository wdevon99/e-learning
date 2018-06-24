import { Injectable } from '@angular/core';
import { Http ,Headers } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class CourseService {

  constructor(private http:Http) { }

  /**
   * getAllCourses()
   */
  getAllCourses(){
    const getUrl:string = "http://localhost:3000/course/all";
    const headers= new Headers();
    headers.append('content-Type' ,'application/json');

    //this will return the response of the get request in json format
    return this.http.get(getUrl, { headers : headers})
    .map(res=>res.json());;
  }

  /**
   * getCourseById()
   */
  getCourseById(courseId){
    let getUrl:string = "http://localhost:3000/course/one";
    const headers= new Headers();
    headers.append('content-Type' ,'application/json');
    
    //appending the courseId to the url
    getUrl+="/?courseId="+courseId;
    //this will return the response of the get request in json format
    return this.http.get(getUrl, { headers : headers})
    .map(res=>res.json());;
  }

}
