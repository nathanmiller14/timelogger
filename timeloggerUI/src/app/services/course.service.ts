import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private url = "Course/GetCourses";

  constructor(private http: HttpClient) { }

  public getCourses() : Observable<Course[]>
  {
    return this.http.get<Course[]>(`${environment.apiUrl}/${this.url}`);
  }
}